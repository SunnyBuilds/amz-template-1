import { DirectusProduct, DirectusProductsResponse } from './types/directus'

/**
 * Directus API Client
 * Handles all communication with Directus CMS
 */
export class DirectusClient {
  private baseUrl: string
  private token: string

  constructor(url?: string, token?: string) {
    this.baseUrl = url || process.env.DIRECTUS_API_URL || 'https://data.beginos.org'
    this.token = token || process.env.DIRECTUS_API_TOKEN || ''
  }

  private resolveSiteId(): string | null {
    const raw =
      process.env.NEXT_PUBLIC_SITE_ID ||
      process.env.DIRECTUS_SITE_ID ||
      process.env.SITE_ID ||
      ''
    const trimmed = String(raw).trim()
    return trimmed ? trimmed : null
  }

  /**
   * Internal fetch wrapper with authentication
   */
  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Important for SSG: no caching during build
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Directus API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get products with optional filters
   */
  async getProducts(filters?: {
    status?: string
    limit?: number
    offset?: number
    siteId?: number | string | null
  }): Promise<DirectusProduct[]> {
    const params = new URLSearchParams()

    // Default: only fetch successfully fetched products
    params.append('filter[status][_eq]', filters?.status || 'fetched')

    const siteId = filters?.siteId ?? this.resolveSiteId()
    if (siteId) {
      params.append('filter[site_id][_eq]', String(siteId))
    }

    if (filters?.limit) {
      params.append('limit', filters.limit.toString())
    }

    if (filters?.offset) {
      params.append('offset', filters.offset.toString())
    }

    // Sort by creation date descending (newest first)
    params.append('sort', '-date_created')

    const response = await this.fetch<DirectusProductsResponse>(
      `/items/products?${params.toString()}`
    )

    return response.data
  }

  /**
   * Get a single product by ASIN
   */
  async getProductByAsin(
    asin: string,
    siteId?: number | string | null
  ): Promise<DirectusProduct | null> {
    try {
      const resolvedSiteId = siteId ?? this.resolveSiteId()
      const params = new URLSearchParams()
      params.append('filter[asin][_eq]', asin)
      if (resolvedSiteId) {
        params.append('filter[site_id][_eq]', String(resolvedSiteId))
      }
      params.append('limit', '1')
      const response = await this.fetch<DirectusProductsResponse>(
        `/items/products?${params.toString()}`
      )
      return response.data[0] || null
    } catch (error) {
      console.error(`Failed to fetch product ${asin}:`, error)
      return null
    }
  }
}

// Singleton instance
export const directusClient = new DirectusClient()
