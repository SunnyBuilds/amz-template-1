"use client"

import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Search, BookOpen } from "lucide-react"

interface Review {
  slug: string
  frontmatter: {
    title: string
    description: string
    category?: string
    brand?: string
    image?: string
    rating?: number
    amazonUrl?: string
    asin?: string
  }
}

interface Guide {
  slug: string
  frontmatter: {
    title: string
    description: string
    image?: string
  }
  content: string
}

interface SearchResultsProps {
  allReviews: Review[]
  allGuides: Guide[]
}

export function SearchResults({ allReviews, allGuides }: SearchResultsProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  // Search in reviews
  const reviewResults = query
    ? allReviews.filter((review) => {
        const searchLower = query.toLowerCase()
        return (
          review.frontmatter.title.toLowerCase().includes(searchLower) ||
          review.frontmatter.description.toLowerCase().includes(searchLower) ||
          review.frontmatter.category?.toLowerCase().includes(searchLower) ||
          review.frontmatter.brand?.toLowerCase().includes(searchLower)
        )
      })
    : []

  // Search in guides
  const guideResults = query
    ? allGuides.filter((guide) => {
        const searchLower = query.toLowerCase()
        return (
          guide.frontmatter.title.toLowerCase().includes(searchLower) ||
          guide.frontmatter.description.toLowerCase().includes(searchLower) ||
          guide.content.toLowerCase().includes(searchLower)
        )
      })
    : []

  const totalResults = reviewResults.length + guideResults.length

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Search Results</h1>
            </div>
            {query && (
              <p className="text-lg text-muted-foreground">
                {totalResults > 0 ? (
                  <>
                    Found <span className="font-semibold text-foreground">{totalResults}</span> result
                    {totalResults !== 1 ? "s" : ""} for "
                    <span className="font-semibold text-foreground">{query}</span>"
                    <span className="text-sm ml-2">
                      ({reviewResults.length} review{reviewResults.length !== 1 ? "s" : ""}, {guideResults.length} guide{guideResults.length !== 1 ? "s" : ""})
                    </span>
                  </>
                ) : (
                  <>
                    No results found for "<span className="font-semibold text-foreground">{query}</span>"
                  </>
                )}
              </p>
            )}
            {!query && (
              <p className="text-lg text-muted-foreground">
                Please enter a search term to find camping and outdoor gear reviews.
              </p>
            )}
          </div>

          {/* Search Results */}
          {totalResults > 0 && (
            <div className="space-y-12">
              {/* Review Results */}
              {reviewResults.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Search className="h-6 w-6 text-primary" />
                    Product Reviews ({reviewResults.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviewResults.map((review) => (
                      <ProductCard
                        key={review.slug}
                        title={review.frontmatter.title}
                        image={review.frontmatter.image || "/placeholder.svg"}
                        rating={review.frontmatter.rating || 4.5}
                        reviewCount={0}
                        price=""
                        summary={review.frontmatter.description}
                        amazonUrl={review.frontmatter.amazonUrl || "#"}
                        asin={review.frontmatter.asin}
                        slug={review.slug}
                        linkType="review"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Guides Results */}
              {guideResults.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    Buying Guides ({guideResults.length})
                  </h2>
                  <div className="grid gap-6 mb-8">
                    {guideResults.map((guide) => (
                      <Card key={guide.slug} className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-6">
                            {guide.frontmatter.image && (
                              <img
                                src={guide.frontmatter.image}
                                alt={guide.frontmatter.title}
                                className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-foreground mb-2">{guide.frontmatter.title}</h3>
                              <p className="text-muted-foreground mb-4 leading-relaxed">{guide.frontmatter.description}</p>
                              <Button asChild variant="outline">
                                <Link href={`/guides/${guide.slug}`}>Read Guide</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {query && totalResults === 0 && (
            <div className="text-center py-12">
              <div className="mb-6">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">No Results Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any reviews matching your search. Try different keywords or browse our categories.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <Link href="/reviews">Browse All Reviews</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/guides">View Buying Guides</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!query && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Start Your Search</h2>
              <p className="text-muted-foreground mb-6">
                Search for camping gear, outdoor equipment, or specific brands to find detailed reviews.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <Link href="/reviews">Browse All Reviews</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/guides">View Buying Guides</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
