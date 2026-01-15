// Required for static export - generates no pages for this route
// The Outstatic editor is only accessible in CMS mode (pnpm dev:cms)
export async function generateStaticParams(): Promise<{ ost?: string[] }[]> {
  // Return empty array for static export - no pages will be generated
  return []
}

// Disable dynamic params for static export
export const dynamicParams = false

export default async function OutstaticPage({
  params,
}: {
  params: Promise<{ ost?: string[] }>
}) {
  // Only import and render Outstatic in CMS mode
  if (process.env.OUTSTATIC_CMS_MODE !== 'true') {
    return <div>Outstatic CMS is only available in CMS mode.</div>
  }

  const { Outstatic } = await import('outstatic')
  const { OstClient } = await import('outstatic/client')
  await import('outstatic/outstatic.css')

  const resolvedParams = await params
  const ostData = await Outstatic()
  return <OstClient ostData={ostData} params={resolvedParams} />
}
