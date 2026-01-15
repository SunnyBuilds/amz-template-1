/** @type {import('next').NextConfig} */

const isStaticExport = process.env.NODE_ENV === "production" && process.env.OUTSTATIC_CMS_MODE !== "true"
const isCmsMode = process.env.OUTSTATIC_CMS_MODE === "true"

const nextConfig = {
  // Dual mode configuration:
  // - CMS mode (OUTSTATIC_CMS_MODE=true): Enable API routes for Outstatic editor
  // - Production mode: Static export for deployment
  ...(isStaticExport && { output: "export" }),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Transpile Outstatic and its dependencies for webpack compatibility
  transpilePackages: ['outstatic', 'transliteration'],
  // In CMS mode, include .cms.tsx files as pages
  ...(isCmsMode && {
    pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'cms.tsx'],
  }),
}

export default nextConfig
