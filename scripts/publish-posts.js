const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
const SITE_ID = process.env.SITE_ID;
const DEFAULT_CATEGORY = process.env.DEFAULT_CATEGORY || "Buying Guides";

const CONTENT_DIR = path.join(process.cwd(), "content", "guides");
const PUBLISH_LIMIT = 10;

function requireEnv(name, value) {
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
}

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function yamlValue(value) {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) {
    return `[${value.map((v) => JSON.stringify(String(v))).join(", ")}]`;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(String(value));
}

function buildFrontmatter(post) {
  const date = new Date(
    post.published_at || post.date_created || Date.now()
  ).toISOString().slice(0, 10);

  const tags =
    Array.isArray(post.tags) ? post.tags : post.tags ? [post.tags] : undefined;

  const frontmatter = {
    title: post.title,
    date,
    description: post.description,
    category: post.category || DEFAULT_CATEGORY,
    tags,
    readTime: post.read_time,
  };

  const lines = ["---"];
  Object.entries(frontmatter).forEach(([key, value]) => {
    const rendered = yamlValue(value);
    if (rendered !== null) {
      lines.push(`${key}: ${rendered}`);
    }
  });
  lines.push("---");

  return lines.join("\n");
}

async function directusRequest(pathname, options = {}) {
  const url = `${DIRECTUS_URL.replace(/\/+$/, "")}${pathname}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Directus request failed: ${res.status} ${text}`);
  }

  return res.json();
}

async function fetchPosts() {
  const params = new URLSearchParams();
  params.append("limit", String(PUBLISH_LIMIT));
  params.append("sort[]", "date_created");
  params.append("filter[status][_eq]", "draft");
  params.append("filter[site_id][_eq]", String(SITE_ID));
  params.append("filter[content_mdx][_nnull]", "true");
  params.append("filter[github_path][_null]", "true");

  [
    "id",
    "title",
    "slug",
    "description",
    "category",
    "tags",
    "read_time",
    "content_mdx",
    "published_at",
    "date_created",
    "product.review_slug",
  ].forEach((field) => params.append("fields[]", field));

  const response = await directusRequest(`/items/posts?${params.toString()}`);
  return response.data || [];
}

async function updatePost(id, data) {
  await directusRequest(`/items/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
}

function runGit(command) {
  return execSync(command, { stdio: "inherit" });
}

async function main() {
  requireEnv("DIRECTUS_URL", DIRECTUS_URL);
  requireEnv("DIRECTUS_TOKEN", DIRECTUS_TOKEN);
  requireEnv("SITE_ID", SITE_ID);

  ensureContentDir();
  const posts = await fetchPosts();

  if (!posts.length) {
    console.log("No draft posts to publish.");
    return;
  }

  const publishedAt = new Date().toISOString();
  const updates = [];

  for (const post of posts) {
    const slug = post.slug || slugify(post.title || post.id);
    if (!slug) {
      console.warn(`Skipping post without slug or title: ${post.id}`);
      continue;
    }

    const frontmatter = buildFrontmatter(post);
    let body = post.content_mdx || "";
    const reviewSlug = post.product?.review_slug;

    if (reviewSlug) {
      body += `\n\n## Related Review\n\nRead the full review: [/review/${reviewSlug}](/review/${reviewSlug})\n`;
    }

    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    fs.writeFileSync(filePath, `${frontmatter}\n\n${body}\n`, "utf8");

    updates.push({
      id: post.id,
      github_path: `content/guides/${slug}.mdx`,
    });
  }

  const status = execSync("git status --porcelain").toString().trim();
  if (!status) {
    console.log("No file changes to commit.");
    return;
  }

  runGit("git add content/guides");
  runGit(`git commit -m "chore: publish ${updates.length} guides" --no-gpg-sign`);
  runGit("git push origin draft");

  for (const update of updates) {
    await updatePost(update.id, {
      status: "published",
      published_at: publishedAt,
      date_published: publishedAt,
      github_path: update.github_path,
      publish_error: null,
    });
  }

  console.log(`Published ${updates.length} guide(s).`);
}

main().catch(async (error) => {
  console.error(error);
});
