import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@payload-config'

export const getPayloadClient = cache(async () => {
  if (!process.env.DATABASE_URL) return null
  try {
    return await getPayload({ config })
  } catch {
    return null
  }
})

export type PayloadPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags?: { tag: string }[]
  readingTime?: number
  publishedAt?: string
  featured?: boolean
  coverImage?: { url: string; alt: string } | null
  coverImageUrl?: string
  content: unknown
  meta?: { title?: string; description?: string; image?: { url: string } | null }
  status: 'draft' | 'published'
}

export async function getPublishedPosts(): Promise<PayloadPost[]> {
  const payload = await getPayloadClient()
  if (!payload) return []
  try {
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 100,
      depth: 2,
      draft: false,
    })
    if (result.docs.length > 0) {
      return result.docs as PayloadPost[]
    }
    // Fallback: legacy posts may have status=published but _status=draft until republished
    const legacy = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 100,
      depth: 2,
    })
    return legacy.docs as PayloadPost[]
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<PayloadPost | null> {
  const payload = await getPayloadClient()
  if (!payload) return null
  const where = {
    and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
  }
  try {
    const published = await payload.find({
      collection: 'posts',
      where,
      limit: 1,
      depth: 2,
      draft: false,
    })
    if (published.docs[0]) return published.docs[0] as PayloadPost

    const legacy = await payload.find({
      collection: 'posts',
      where,
      limit: 1,
      depth: 2,
    })
    return (legacy.docs[0] as PayloadPost) ?? null
  } catch {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  if (!payload) return []
  try {
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 1000,
      select: { slug: true },
      depth: 0,
    })
    return result.docs.map((p) => String(p.slug))
  } catch {
    return []
  }
}

export function getPostCoverUrl(post: PayloadPost): string {
  if (post.coverImage?.url) return post.coverImage.url
  if (post.coverImageUrl) return post.coverImageUrl
  return 'https://images.unsplash.com/photo-1545239351-c77e88f1c3c8?w=1200&auto=format&fit=crop&q=80'
}