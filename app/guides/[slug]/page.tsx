import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getGuideBySlugUnified, getAllGuidesUnified } from "@/lib/api"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User } from "lucide-react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { TableOfContents } from "@/components/table-of-contents"
import { GuidesSidebar } from "@/components/guides-sidebar"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const guides = await getAllGuidesUnified()
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlugUnified(slug)

  if (!guide) {
    return {
      title: "Guide Not Found - Wild Nature Journey",
    }
  }

  const publishedDate = new Date(guide.frontmatter.date).toISOString()
  const modifiedDate = guide.frontmatter.updatedDate
    ? new Date(guide.frontmatter.updatedDate).toISOString()
    : publishedDate

  return {
    title: `${guide.frontmatter.title} - Camping Guide 2025 | Wild Nature Journey`,
    description: `${guide.frontmatter.description} Expert camping and outdoor guide. Updated ${new Date(modifiedDate).getFullYear()}.`,
    keywords: [
      guide.frontmatter.title,
      "camping guides",
      "outdoor advice",
      ...(guide.frontmatter.tags || []),
      guide.frontmatter.category,
    ],
    authors: [{ name: "Wild Nature Journey" }],
    creator: "Wild Nature Journey",
    publisher: "Wild Nature Journey",
    openGraph: {
      title: `${guide.frontmatter.title} - Camping Guide`,
      description: guide.frontmatter.description,
      url: `http://localhost:3000/guides/${slug}`,
      siteName: "Wild Nature Journey",
      images: guide.frontmatter.image
        ? [
            {
              url: guide.frontmatter.image,
              width: 1200,
              height: 630,
              alt: guide.frontmatter.title,
            },
          ]
        : [],
      locale: "en_US",
      type: "article",
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: ["Wild Nature Journey"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.frontmatter.title} - Camping Guide`,
      description: guide.frontmatter.description,
      images: guide.frontmatter.image ? [guide.frontmatter.image] : [],
      creator: "@wildnaturejourney",
    },
    alternates: {
      canonical: `http://localhost:3000/guides/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = getGuideBySlugUnified(slug)

  if (!guide) {
    notFound()
  }

  // Get related guides from the same category for bottom section
  const allGuides = await getAllGuidesUnified()
  const relatedGuides = allGuides
    .filter((g) => g.frontmatter.category === guide.frontmatter.category && g.slug !== slug)
    .slice(0, 3)

  // Schema.org structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.frontmatter.title,
    description: guide.frontmatter.description,
    image: guide.frontmatter.image,
    datePublished: guide.frontmatter.date,
    dateModified: guide.frontmatter.updatedDate || guide.frontmatter.date,
    author: {
      "@type": "Organization",
      name: "Wild Nature Journey",
      url: "http://localhost:3000",
    },
    publisher: {
      "@type": "Organization",
      name: "Wild Nature Journey",
      logo: {
        "@type": "ImageObject",
        url: "http://localhost:3000/logo.png",
      },
    },
    articleSection: guide.frontmatter.category,
    keywords: guide.frontmatter.tags?.join(", ") || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `http://localhost:3000/guides/${slug}`,
    },
  }

  return (
    <>
      {/* JSON-LD structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
              {/* Left Sidebar - TOC */}
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="lg:sticky lg:top-24">
                  <TableOfContents source={guide.content} maxLevel={2} />
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                {/* Breadcrumbs */}
                <BreadcrumbNav
                  items={[{ label: "Guides", href: "/guides" }, { label: guide.frontmatter.title }]}
                />

                {/* Article Header */}
                <header className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    {guide.frontmatter.category && (
                      <span className="px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full uppercase">
                        {guide.frontmatter.category}
                      </span>
                    )}
                    <span className="px-3 py-1 text-xs font-semibold text-foreground bg-muted rounded-full">
                      Expert Guide
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
                    {guide.frontmatter.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>By Wild Nature Journey</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {guide.frontmatter.updatedDate
                          ? `Published: ${new Date(guide.frontmatter.date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}`
                          : new Date(guide.frontmatter.date).toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                      </span>
                    </div>
                    {guide.frontmatter.updatedDate && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          Updated:{" "}
                          {new Date(guide.frontmatter.updatedDate).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    {!guide.frontmatter.updatedDate && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{guide.frontmatter.readTime || "5 min read"}</span>
                      </div>
                    )}
                  </div>

                  {guide.frontmatter.image && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={guide.frontmatter.image}
                        alt={`${guide.frontmatter.title} - Expert Camping Guide${guide.frontmatter.category ? ` | ${guide.frontmatter.category}` : ""}`}
                        width={800}
                        height={400}
                        className="w-full h-[400px] object-cover"
                        priority
                      />
                    </div>
                  )}

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {guide.frontmatter.description}
                  </p>
                </header>

                {/* MDX Content */}
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <MDXRemote source={guide.content} />
                </div>

                {/* Tags */}
                {guide.frontmatter.tags && guide.frontmatter.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
                      {guide.frontmatter.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <aside className="lg:col-span-3 order-3">
                <GuidesSidebar category={guide.frontmatter.category} currentSlug={slug} />
              </aside>
            </div>

            {/* Related Guides - Full Width Below Main Content */}
            {relatedGuides.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border max-w-7xl mx-auto">
                <div className="relative mb-8">
                  <h2 className="text-3xl font-bold text-foreground relative z-10 inline-block pr-4 bg-background">
                    Related Guides
                  </h2>
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedGuides.map((relatedGuide) => (
                    <Link
                      key={relatedGuide.slug}
                      href={`/guides/${relatedGuide.slug}`}
                      className="group block"
                    >
                      <Card className="h-full flex flex-col hover:shadow-lg transition-all">
                        {relatedGuide.frontmatter.image && (
                          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                            <Image
                              src={relatedGuide.frontmatter.image}
                              alt={relatedGuide.frontmatter.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <Badge variant="secondary" className="w-fit mb-3">
                            {relatedGuide.frontmatter.category}
                          </Badge>
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-snug">
                            {relatedGuide.frontmatter.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1">
                            {relatedGuide.frontmatter.description}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{relatedGuide.frontmatter.readTime || "5 min read"}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      </main>
    </>
  )
}
