import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/payload'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lazygirlai.vercel.app'

const staticRoutes = [
  { url: siteUrl, priority: 1.0, changeFrequency: 'weekly' as const },
  { url: `${siteUrl}/blog`, priority: 0.9, changeFrequency: 'daily' as const },
  { url: `${siteUrl}/shop`, priority: 0.8, changeFrequency: 'weekly' as const },
  { url: `${siteUrl}/tools`, priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${siteUrl}/about`, priority: 0.6, changeFrequency: 'monthly' as const },
  { url: `${siteUrl}/lazy-girl-os`, priority: 0.7, changeFrequency: 'monthly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPostSlugs()
  const postRoutes = slugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...postRoutes]
}
