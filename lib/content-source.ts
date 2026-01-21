import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Content source types
type ContentSource = 'local' | 'directus'

// Configuration
const isDirectusEnabled = process.env.NEXT_PUBLIC_ENABLE_DIRECTUS === 'true'

// Content directories
const LOCAL_CONTENT_DIR = path.join(process.cwd(), 'content')

/**
 * Get content source priority order
 * Local MDX > Directus (for reviews)
 */
export function getContentPriority(): ContentSource[] {
  const sources: ContentSource[] = []

  sources.push('local')

  if (isDirectusEnabled) {
    sources.push('directus')
  }

  return sources
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
 * Check if Directus is enabled
 */
export function isDirectusActive(): boolean {
  return isDirectusEnabled
}
