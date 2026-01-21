import { Product } from '../products-data'

/**
 * Directus Product API Response Types
 */
export interface DirectusProduct {
  id: number
  asin: string
  title: string
  category?: string | null
  features: string[] | null
  images: {
    small: string
    medium: string
    large: string
  } | null
  marketplace: string
  site?: string | null
  site_id?: number | null
  parent_asin: string | null
  browse_nodes: any[] | null
  status: 'new' | 'fetched' | 'failed'
  availability: string | null
  date_created: string
  date_updated: string
  raw_paapi: any
}

export interface DirectusProductsResponse {
  data: DirectusProduct[]
}

/**
 * Extract data from raw PA-API response
 * Helper function to get data from the raw_paapi field
 */
export function extractFromRawPaapi(raw: any) {
  return {
    brand: raw?.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || '',
    price: raw?.Offers?.Listings?.[0]?.Price?.Amount || null,
    currency: raw?.Offers?.Listings?.[0]?.Price?.Currency || 'USD',
    review_rating: raw?.CustomerReviews?.StarRating?.Value || null,
    review_count: raw?.CustomerReviews?.Count || null,
    description: raw?.ItemInfo?.Features?.DisplayValues?.join(' ') || '',
  }
}

/**
 * Infer product category based on title keywords
 * Maps to existing MDX review categories
 * @param title - Product title for keyword matching
 * @param directusCategory - Optional category from Directus (takes priority)
 */
export function inferProductCategory(title: string, directusCategory?: string | null): string {
  // Priority 1: Use Directus category if provided
  if (directusCategory) {
    return directusCategory
  }

  // Priority 2: Infer from title keywords
  const titleLower = title.toLowerCase()

  // DSLR Cameras
  if (titleLower.includes('dslr') ||
      titleLower.includes('d850') ||
      titleLower.includes('d750') ||
      titleLower.includes('canon eos') ||
      titleLower.includes('nikon d')) {
    return 'DSLR Cameras'
  }

  // Mirrorless Cameras
  if (titleLower.includes('mirrorless') ||
      titleLower.includes('sony a7') ||
      titleLower.includes('fujifilm x') ||
      titleLower.includes('olympus om-d')) {
    return 'Mirrorless Cameras'
  }

  // Camera Lenses
  if (titleLower.includes('lens') ||
      titleLower.includes('mm f/') ||
      titleLower.includes('telephoto') ||
      titleLower.includes('wide angle') ||
      titleLower.includes('prime')) {
    return 'Camera Lenses'
  }

  // Accessories (default)
  return 'Accessories'
}

/**
 * Transform Directus product to internal Product format
 * Uses adapter pattern to maintain backward compatibility
 */
export function transformDirectusProduct(
  directusProduct: DirectusProduct,
  category: string = 'Camp Essentials'
): Product {
  // Extract data from raw_paapi field
  const extracted = extractFromRawPaapi(directusProduct.raw_paapi)

  return {
    asin: directusProduct.asin,
    title: directusProduct.title,
    brand: extracted.brand,
    features: directusProduct.features || [],
    amazonUrl: `https://www.amazon.com/dp/${directusProduct.asin}?tag=smartymode-20`,
    imageUrl: directusProduct.images?.large || directusProduct.images?.medium || '',
    rating: extracted.review_rating || 4.5,
    category: category,
    shortTitle: directusProduct.title.substring(0, 50),
    summary: extracted.description?.substring(0, 150) || '',
    slug: directusProduct.asin.toLowerCase()
  }
}
