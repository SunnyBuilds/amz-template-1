import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPageBySlug } from "@/lib/api"
import { siteConfig } from "@/lib/site.config"

const pageSlug = "privacy"

export function generateMetadata(): Metadata {
  const page = getPageBySlug(pageSlug)
  const title = page?.frontmatter.title || "Privacy Policy"
  return {
    title: `${title} - ${siteConfig.brand.name}`,
    description: page?.frontmatter.description || siteConfig.seo.description,
  }
}

export default function PrivacyPage() {
  const page = getPageBySlug(pageSlug)

  if (!page) {
    notFound()
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {page.frontmatter.title || "Privacy Policy"}
          </h1>
          {page.frontmatter.description && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {page.frontmatter.description}
            </p>
          )}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <MDXRemote source={page.content} />
          </div>
        </div>
      </div>
    </main>
  )
}
