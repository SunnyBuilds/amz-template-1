import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { directusClient } from './directus-client'
import { transformDirectusProduct, inferProductCategory } from './types/directus'
import {
  getLocalDocuments,
  isDirectusActive,
} from './content-source'

const reviewsDirectory = path.join(process.cwd(), "content/reviews")
const guidesDirectory = path.join(process.cwd(), "content/guides")
const pagesDirectory = path.join(process.cwd(), "content/pages")

// Reviews API
export interface ReviewFrontmatter {
  title: string
  date: string
  description: string
  updatedDate?: string
  asin?: string
  brand?: string
  category?: string
  rating?: number
  image?: string
  amazonUrl?: string
  pros?: string[]
  cons?: string[]
  [key: string]: any
}

export interface Review {
  slug: string
  frontmatter: ReviewFrontmatter
  content: string
}

export function getReviewSlugs(): string[] {
  if (!fs.existsSync(reviewsDirectory)) {
    return []
  }
  return fs
    .readdirSync(reviewsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getReviewBySlug(slug: string): Review | null {
  const fullPath = path.join(reviewsDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data as ReviewFrontmatter,
    content,
  }
}

export function getAllReviews(): Review[] {
  const slugs = getReviewSlugs()
  const reviews = slugs
    .map((slug) => getReviewBySlug(slug))
    .filter((review): review is Review => review !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime()
      const dateB = new Date(b.frontmatter.date).getTime()
      return dateB - dateA
    })

  return reviews
}

// Guides API (formerly Tips)
export interface GuideFrontmatter {
  title: string
  date: string
  description: string
  category: string
  tags?: string[]
  image?: string
  readTime?: string
  updatedDate?: string
  [key: string]: any
}

export interface Guide {
  slug: string
  frontmatter: GuideFrontmatter
  content: string
}

export interface PageFrontmatter {
  title: string
  description?: string
  layout?: string
  [key: string]: any
}

export interface PageContent {
  slug: string
  frontmatter: PageFrontmatter
  content: string
}

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDirectory)) {
    return []
  }
  return fs
    .readdirSync(guidesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getGuideBySlug(slug: string): Guide | null {
  const fullPath = path.join(guidesDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data as GuideFrontmatter,
    content,
  }
}

export function getAllGuides(): Guide[] {
  const slugs = getGuideSlugs()
  const guides = slugs
    .map((slug) => getGuideBySlug(slug))
    .filter((guide): guide is Guide => guide !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime()
      const dateB = new Date(b.frontmatter.date).getTime()
      return dateB - dateA
    })

  return guides
}

export function getGuidesByCategory(category: string): Guide[] {
  const allGuides = getAllGuides()
  if (category === "all") {
    return allGuides
  }
  return allGuides.filter((guide) => guide.frontmatter.category === category)
}

export function getGuideCategories(): string[] {
  const guides = getAllGuides()
  const categories = new Set<string>()
  guides.forEach((guide) => {
    if (guide.frontmatter.category) {
      categories.add(guide.frontmatter.category)
    }
  })
  return Array.from(categories).sort()
}

// Pages API
export function getPageSlugs(): string[] {
  if (!fs.existsSync(pagesDirectory)) {
    return []
  }
  return fs
    .readdirSync(pagesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getPageBySlug(slug: string): PageContent | null {
  const fullPath = path.join(pagesDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data as PageFrontmatter,
    content,
  }
}

export function getAllPages(): PageContent[] {
  const slugs = getPageSlugs()
  return slugs
    .map((slug) => getPageBySlug(slug))
    .filter((page): page is PageContent => page !== null)
}

/**
 * Get all reviews from both MDX files and Directus
 * Deduplicates by ASIN (MDX takes priority)
 * Sorts by date (newest first)
 */
export async function getAllReviewsWithDirectus(): Promise<Review[]> {
  // 1. Get MDX reviews
  const mdxReviews = getAllReviews()

  // Check if Directus is enabled
  const isDirectusEnabled = process.env.NEXT_PUBLIC_ENABLE_DIRECTUS === 'true'
  if (!isDirectusEnabled) {
    return mdxReviews
  }

  // 2. Get Directus products
  let directusProducts: Review[] = []
  try {
    const products = await directusClient.getProducts({ limit: 100 })

    // Transform Directus products to Review format
    directusProducts = products.map(product => {
      const category = inferProductCategory(product.title, product.category)
      const transformed = transformDirectusProduct(product, category)

      return {
        slug: product.asin.toLowerCase(),
        frontmatter: {
          title: transformed.title,
          date: product.date_created,
          description: transformed.summary || `Expert review of ${transformed.title}`,
          asin: product.asin,
          brand: transformed.brand,
          category: category,
          rating: transformed.rating,
          image: transformed.imageUrl,
          amazonUrl: transformed.amazonUrl,
        },
        content: '', // Directus products don't have detailed content
      }
    })
  } catch (error) {
    console.error('Failed to fetch Directus products for reviews:', error)
    // Continue with MDX only if Directus fails
  }

  // 3. Deduplicate by ASIN (MDX takes priority)
  const mdxAsins = new Set(
    mdxReviews
      .map(r => r.frontmatter.asin)
      .filter(Boolean)
  )

  const uniqueDirectusProducts = directusProducts.filter(
    product => !mdxAsins.has(product.frontmatter.asin)
  )

  // 4. Combine and sort by date (newest first)
  const allReviews = [...mdxReviews, ...uniqueDirectusProducts]

  allReviews.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return dateB - dateA
  })

  return allReviews
}

/**
 * Get all guides from local MDX
 * Deduplicates by slug
 */
export async function getAllGuidesUnified(): Promise<Guide[]> {
  const allGuides: Guide[] = []
  const seenSlugs = new Set<string>()

  // 1. Get local MDX guides
  const localGuides = getLocalDocuments('guides')
  for (const guide of localGuides) {
    if (!seenSlugs.has(guide.slug)) {
      seenSlugs.add(guide.slug)
      allGuides.push({
        slug: guide.slug,
        frontmatter: {
          title: guide.title,
          date: guide.date,
          description: guide.description,
          category: guide.category,
          tags: guide.tags || [],
          image: guide.image,
          readTime: guide.readTime,
          updatedDate: guide.updatedDate,
        },
        content: guide.content || '',
      })
    }
  }

  // Sort by date (newest first)
  allGuides.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return dateB - dateA
  })

  return allGuides
}

/**
 * Get all reviews from multiple sources (Local MDX > Directus)
 * Deduplicates by slug and ASIN
 */
export async function getAllReviewsUnified(): Promise<Review[]> {
  const allReviews: Review[] = []
  const seenSlugs = new Set<string>()
  const seenAsins = new Set<string>()

  // 1. Get local MDX reviews
  const localReviews = getLocalDocuments('reviews')
  for (const review of localReviews) {
    const asin = review.asin
    if (!seenSlugs.has(review.slug) && (!asin || !seenAsins.has(asin))) {
      seenSlugs.add(review.slug)
      if (asin) seenAsins.add(asin)
      allReviews.push({
        slug: review.slug,
        frontmatter: {
          title: review.title,
          date: review.date,
          description: review.description,
          updatedDate: review.updatedDate,
          asin: review.asin,
          brand: review.brand,
          category: review.category,
          rating: review.rating,
          image: review.image,
          amazonUrl: review.amazonUrl,
          pros: review.pros || [],
          cons: review.cons || [],
        },
        content: review.content || '',
      })
    }
  }

  // 2. Get Directus products (lowest priority)
  if (isDirectusActive()) {
    try {
      const products = await directusClient.getProducts({ limit: 100 })
      for (const product of products) {
        if (!seenAsins.has(product.asin)) {
          seenAsins.add(product.asin)
          const category = inferProductCategory(product.title, product.category)
          const transformed = transformDirectusProduct(product, category)
          allReviews.push({
            slug: product.asin.toLowerCase(),
            frontmatter: {
              title: transformed.title,
              date: product.date_created,
              description: transformed.summary || `Review of ${transformed.title}`,
              asin: product.asin,
              brand: transformed.brand,
              category: category,
              rating: transformed.rating,
              image: transformed.imageUrl,
              amazonUrl: transformed.amazonUrl,
            },
            content: '',
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch Directus products:', error)
    }
  }

  // Sort by date (newest first)
  allReviews.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return dateB - dateA
  })

  return allReviews
}

/**
 * Get a single guide by slug from multiple sources
 */
export function getGuideBySlugUnified(slug: string): Guide | null {
  // Fall back to local MDX
  return getGuideBySlug(slug)
}

/**
 * Get a single review by slug from multiple sources
 */
export function getReviewBySlugUnified(slug: string): Review | null {
  // Fall back to local MDX
  return getReviewBySlug(slug)
}
