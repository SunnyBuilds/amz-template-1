import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Content source types
type ContentSource = 'outstatic' | 'local' | 'directus'

// Configuration
const isOutstaticEnabled = process.env.NEXT_PUBLIC_ENABLE_OUTSTATIC === 'true'
const isDirectusEnabled = process.env.NEXT_PUBLIC_ENABLE_DIRECTUS === 'true'

// Content directories
const LOCAL_CONTENT_DIR = path.join(process.cwd(), 'content')
const OUTSTATIC_CONTENT_DIR = path.join(process.cwd(), 'outstatic/content')

/**
 * Get content source priority order
 * Outstatic > Local MDX > Directus (for reviews)
 */
export function getContentPriority(): ContentSource[] {
  const sources: ContentSource[] = []

  if (isOutstaticEnabled) {
    sources.push('outstatic')
  }

  sources.push('local')

  if (isDirectusEnabled) {
    sources.push('directus')
  }

  return sources
}

/**
 * Get documents from Outstatic content directory
 */
export function getOutstaticDocuments(collection: string): any[] {
  if (!isOutstaticEnabled) return []

  const directory = path.join(OUTSTATIC_CONTENT_DIR, collection)

  if (!fs.existsSync(directory)) {
    return []
  }

  try {
    const files = fs.readdirSync(directory).filter(f =>
      f.endsWith('.md') || f.endsWith('.mdx')
    )

    return files.map(file => {
      const slug = file.replace(/\.(md|mdx)$/, '')
      const fullPath = path.join(directory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        ...data,
        content,
        _source: 'outstatic' as const,
      }
    })
  } catch (error) {
    console.error(`Failed to read Outstatic ${collection}:`, error)
    return []
  }
}

/**
 * Get documents from local MDX content directory
 */
export function getLocalDocuments(collection: string): any[] {
  const directory = path.join(LOCAL_CONTENT_DIR, collection)

  if (!fs.existsSync(directory)) {
    return []
  }

  try {
    const files = fs.readdirSync(directory).filter(f => f.endsWith('.mdx'))

    return files.map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const fullPath = path.join(directory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        ...data,
        content,
        _source: 'local' as const,
      }
    })
  } catch (error) {
    console.error(`Failed to read local ${collection}:`, error)
    return []
  }
}

/**
 * Get a single document by slug from Outstatic
 */
export function getOutstaticDocumentBySlug(
  collection: string,
  slug: string
): any | null {
  if (!isOutstaticEnabled) return null

  const directory = path.join(OUTSTATIC_CONTENT_DIR, collection)

  // Try both .md and .mdx extensions
  for (const ext of ['.md', '.mdx']) {
    const fullPath = path.join(directory, `${slug}${ext}`)
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return {
        slug,
        ...data,
        content,
        _source: 'outstatic' as const,
      }
    }
  }

  return null
}

/**
 * Check if Outstatic is enabled
 */
export function isOutstaticActive(): boolean {
  return isOutstaticEnabled
}

/**
 * Check if Directus is enabled
 */
export function isDirectusActive(): boolean {
  return isDirectusEnabled
}
