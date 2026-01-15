import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const SOURCE_DIR = path.join(process.cwd(), 'content')
const TARGET_DIR = path.join(process.cwd(), 'outstatic/content')

const collections = ['guides', 'reviews']

async function migrate() {
  console.log('Starting migration from /content to /outstatic/content...\n')

  let totalMigrated = 0

  for (const collection of collections) {
    const sourceDir = path.join(SOURCE_DIR, collection)
    const targetDir = path.join(TARGET_DIR, collection)

    if (!fs.existsSync(sourceDir)) {
      console.log(`Skipping ${collection}: source directory not found`)
      continue
    }

    // Ensure target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.mdx'))
    console.log(`Migrating ${files.length} ${collection}...`)

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file)
      const targetPath = path.join(targetDir, file.replace('.mdx', '.md'))

      // Read source file
      const content = fs.readFileSync(sourcePath, 'utf8')
      const { data, content: body } = matter(content)

      // Add Outstatic required fields
      const oustaticData = {
        ...data,
        author: 'content/authors/admin',
        status: 'published',
      }

      // Reassemble with frontmatter
      const newContent = matter.stringify(body, oustaticData)

      // Write to target
      fs.writeFileSync(targetPath, newContent)
      console.log(`  ✓ ${file} -> ${file.replace('.mdx', '.md')}`)
      totalMigrated++
    }

    console.log('')
  }

  console.log(`Migration complete! ${totalMigrated} files migrated.`)
  console.log('\nNext steps:')
  console.log('1. Verify content in /outstatic/content/')
  console.log('2. Run "pnpm dev:cms" to test Outstatic editor')
  console.log('3. Configure GitHub OAuth for production use')
}

migrate().catch(console.error)
