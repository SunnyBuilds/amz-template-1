"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, Search } from "lucide-react"
import type { Guide } from "@/lib/api"

interface GuidesFilterProps {
  guides: Guide[]
  categories: string[]
}

export function GuidesFilter({ guides, categories }: GuidesFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Read initial category and search from URL
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")

    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    } else {
      setSelectedCategory("all")
    }

    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParams, categories])

  // Filter guides based on category and search
  let filteredGuides = guides

  // Category filter
  if (selectedCategory !== "all") {
    filteredGuides = filteredGuides.filter((guide) => guide.frontmatter.category === selectedCategory)
  }

  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filteredGuides = filteredGuides.filter(
      (guide) =>
        guide.frontmatter.title.toLowerCase().includes(query) ||
        guide.frontmatter.description.toLowerCase().includes(query) ||
        guide.frontmatter.category.toLowerCase().includes(query) ||
        (guide.frontmatter.tags && guide.frontmatter.tags.some((tag) => tag.toLowerCase().includes(query)))
    )
  }

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", encodeURIComponent(category))
    }
    const newUrl = params.toString() ? `/guides?${params.toString()}` : "/guides"
    router.push(newUrl, { scroll: false })
  }

  // Update URL when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value.trim()) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    const newUrl = params.toString() ? `/guides?${params.toString()}` : "/guides"
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => handleCategoryChange("all")}
            size="sm"
            className="whitespace-nowrap"
          >
            All Guides ({guides.length})
          </Button>
          {categories.map((category) => {
            const count = guides.filter((guide) => guide.frontmatter.category === category).length
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                size="sm"
                className="whitespace-nowrap"
              >
                {category} ({count})
              </Button>
            )
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredGuides.length} {filteredGuides.length === 1 ? "article" : "articles"}
      </div>

      {/* Guides Grid */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.slug} className="flex flex-col hover:shadow-lg transition-shadow">
              {guide.frontmatter.image && (
                <div
                  className="h-48 bg-cover bg-center rounded-t-lg"
                  style={{ backgroundImage: `url(${guide.frontmatter.image})` }}
                />
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{guide.frontmatter.category}</Badge>
                  {guide.frontmatter.readTime && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {guide.frontmatter.readTime}
                    </div>
                  )}
                </div>
                <CardTitle className="line-clamp-2">{guide.frontmatter.title}</CardTitle>
                <CardDescription className="line-clamp-3">{guide.frontmatter.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(guide.frontmatter.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/guides/${guide.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No guides found matching your criteria.</p>
          <Button onClick={() => {
            handleSearchChange("");
            handleCategoryChange("all");
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}



