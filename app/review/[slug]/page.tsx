import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ProsCons } from "@/components/pros-cons"
import { AmazonButton } from "@/components/amazon-button"
import { ProductCard } from "@/components/product-card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getReviewBySlugUnified, getAllReviewsUnified } from "@/lib/api"
import { ReviewSidebar } from "@/components/review-sidebar"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { TableOfContents } from "@/components/table-of-contents"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const review = getReviewBySlugUnified(slug)

  if (!review) {
    return {
      title: "Review Not Found - Wild Nature Journey",
    }
  }

  const { frontmatter } = review
  const publishedDate = new Date(frontmatter.date).toISOString()
  const modifiedDate = frontmatter.updatedDate 
    ? new Date(frontmatter.updatedDate).toISOString()
    : publishedDate

  return {
    title: `${frontmatter.title} - Expert Review 2025 | Wild Nature Journey`,
    description: `${frontmatter.description} Read our in-depth expert review with ratings, pros & cons. Updated ${new Date(modifiedDate).getFullYear()}.`,
    keywords: [
      frontmatter.title,
      frontmatter.brand || '',
      frontmatter.category || '',
      'camping gear',
      'outdoor equipment',
      'review',
      'expert review',
      'buying guide',
    ].filter(Boolean),
    authors: [{ name: 'Wild Nature Journey' }],
    creator: 'Wild Nature Journey',
    publisher: 'Wild Nature Journey',
    openGraph: {
      title: `${frontmatter.title} - Expert Review`,
      description: frontmatter.description,
      url: `http://localhost:3000/review/${slug}`,
      siteName: 'Wild Nature Journey',
      images: frontmatter.image ? [
        {
          url: frontmatter.image,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ] : [],
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: ['Wild Nature Journey'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${frontmatter.title} - Expert Review`,
      description: frontmatter.description,
      images: frontmatter.image ? [frontmatter.image] : [],
      creator: '@wildnaturejourney',
    },
    alternates: {
      canonical: `http://localhost:3000/review/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export async function generateStaticParams() {
  const reviews = await getAllReviewsUnified()

  if (!reviews || !Array.isArray(reviews)) {
    return []
  }

  return reviews.map((review) => ({
    slug: review.slug,
  }))
}

export default async function ReviewArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const review = getReviewBySlugUnified(slug)

  if (!review) {
    notFound()
  }

  const { frontmatter, content } = review
  const image = frontmatter.image || "/placeholder.svg"
  
  // Get related products from MDX reviews (same category, excluding current)
  const allReviews = await getAllReviewsUnified()
  const relatedProducts = allReviews
    .filter((reviewItem) =>
      reviewItem.frontmatter.category === frontmatter.category &&
      reviewItem.slug !== slug
    )
    .slice(0, 3)

  // Schema.org structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: frontmatter.title,
    image: frontmatter.image,
    description: frontmatter.description,
    brand: {
      '@type': 'Brand',
      name: frontmatter.brand || 'Unknown',
    },
    review: {
      '@type': 'Review',
      author: {
      '@type': 'Organization',
      name: 'Wild Nature Journey',
      url: 'http://localhost:3000',
      },
      datePublished: frontmatter.date,
      ...(frontmatter.updatedDate && { dateModified: frontmatter.updatedDate }),
    },
    offers: frontmatter.amazonUrl ? {
      '@type': 'Offer',
      url: frontmatter.amazonUrl,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Amazon',
      },
    } : undefined,
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
                <TableOfContents />
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-6 order-1 lg:order-2">
          {/* Breadcrumbs */}
          <BreadcrumbNav
            items={[
              { label: "Reviews", href: "/reviews" },
              { label: frontmatter.title },
            ]}
          />

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {frontmatter.category && (
                <span className="px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full uppercase">
                  {frontmatter.category}
                </span>
              )}
              <span className="px-3 py-1 text-xs font-semibold text-foreground bg-muted rounded-full">
                Expert Review
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              {frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By Wild Nature Journey</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {frontmatter.updatedDate 
                    ? `Published: ${new Date(frontmatter.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
                    : new Date(frontmatter.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                  }
                </span>
              </div>
              {frontmatter.updatedDate && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Updated: {new Date(frontmatter.updatedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                </div>
              )}
              {!frontmatter.updatedDate && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>8 min read</span>
                </div>
              )}
            </div>

            {image && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${frontmatter.title} - Detailed Review Photo${frontmatter.brand ? ` | ${frontmatter.brand}` : ''}`}
                  width={800}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}

            <p className="text-lg text-muted-foreground leading-relaxed">{frontmatter.description}</p>
          </header>

          {/* Pros and Cons */}
          {frontmatter.pros && frontmatter.cons && (
            <div className="my-8">
              <ProsCons pros={frontmatter.pros} cons={frontmatter.cons} />
            </div>
          )}

          {/* MDX Content */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={content} />
          </div>

          {/* Product Info Card */}
          {frontmatter.asin && (
            <div className="my-12">
              <div className="bg-primary rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Buy?</h2>
                <p className="text-lg text-primary-foreground/90 mb-6">
                  Check the latest pricing and availability on Amazon
                </p>
                {frontmatter.amazonUrl && (
                  <AmazonButton url={frontmatter.amazonUrl} text="Check Current Price on Amazon" size="lg" />
                )}
              </div>
            </div>
          )}

            </div>
            
            {/* Right Sidebar */}
            <aside className="lg:col-span-3 order-3">
              <ReviewSidebar category={frontmatter.category} currentSlug={slug} />
            </aside>
          </div>

          {/* Related Products - Full Width Below Main Content */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <span className="h-1 w-12 bg-primary rounded-full"></span>
                Related Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.slug}
                    title={relatedProduct.frontmatter.title}
                    image={relatedProduct.frontmatter.image || "/placeholder.svg"}
                    summary={relatedProduct.frontmatter.description}
                    amazonUrl={relatedProduct.frontmatter.amazonUrl || "#"}
                    asin={relatedProduct.frontmatter.asin}
                    slug={relatedProduct.slug}
                    linkType="review"
                  />
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
