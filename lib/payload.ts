import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@payload-config'
import { blogPosts, type Block } from './blog-data'

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

type LexicalNode = Record<string, unknown>

function textNode(text: string): LexicalNode {
  return { type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 }
}

function paragraphNode(text: string): LexicalNode {
  return {
    type: 'paragraph',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: [textNode(text)],
  }
}

function headingNode(text: string, tag: 'h2' | 'h3'): LexicalNode {
  return {
    type: 'heading',
    tag,
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: [textNode(text)],
  }
}

function listNode(items: string[]): LexicalNode {
  return {
    type: 'list',
    listType: 'bullet',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    start: 1,
    tag: 'ul',
    children: items.map((item) => ({
      type: 'listitem',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      value: 1,
      checked: undefined,
      children: [textNode(item)],
    })),
  }
}

function blockNode(blockType: string, fields: Record<string, unknown>): LexicalNode {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: { blockType, id: `${blockType}-${String(fields.text ?? '').slice(0, 24)}`, ...fields },
  }
}

function blocksToLexical(blocks: Block[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: blocks.map((block) => {
        switch (block.type) {
          case 'p': return paragraphNode(block.text)
          case 'h2': return headingNode(block.text, 'h2')
          case 'h3': return headingNode(block.text, 'h3')
          case 'ul': return listNode(block.items)
          case 'tip': return blockNode('tip', { text: block.text })
          case 'callout': return blockNode('callout', { text: block.text })
          default: return paragraphNode('')
        }
      }),
    },
  }
}

function localPosts(): PayloadPost[] {
  return blogPosts
    .map((post) => ({
      id: post.slug,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category === 'AI updates' ? 'ai-updates' : post.category,
      tags: post.tags.map((tag) => ({ tag })),
      readingTime: post.readingTime,
      publishedAt: post.publishedAt,
      featured: post.featured ?? false,
      coverImageUrl: post.coverImage,
      content: blocksToLexical(post.content),
      meta: {
        title: `${post.title} — lazy girl ai`,
        description: post.excerpt,
        image: { url: post.coverImage },
      },
      status: 'published' as const,
    }))
    .sort((a, b) => {
      const left = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const right = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return right - left
    })
}

export async function getPublishedPosts(): Promise<PayloadPost[]> {
  if (process.env.NEXT_PUBLIC_USE_PAYLOAD_BLOG !== 'true') {
    return localPosts()
  }

  const payload = await getPayloadClient()
  if (!payload) return localPosts()
  try {
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 100,
      depth: 2,
    })
    return result.docs as PayloadPost[]
  } catch {
    return localPosts()
  }
}

export async function getPostBySlug(slug: string): Promise<PayloadPost | null> {
  if (process.env.NEXT_PUBLIC_USE_PAYLOAD_BLOG !== 'true') {
    return localPosts().find((post) => post.slug === slug) ?? null
  }

  const payload = await getPayloadClient()
  if (!payload) return localPosts().find((post) => post.slug === slug) ?? null
  try {
    const result = await payload.find({
      collection: 'posts',
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
      },
      limit: 1,
      depth: 2,
    })
    return (result.docs[0] as PayloadPost) ?? null
  } catch {
    return localPosts().find((post) => post.slug === slug) ?? null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (process.env.NEXT_PUBLIC_USE_PAYLOAD_BLOG !== 'true') {
    return localPosts().map((post) => post.slug)
  }

  const payload = await getPayloadClient()
  if (!payload) return localPosts().map((post) => post.slug)
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
    return localPosts().map((post) => post.slug)
  }
}

export function getPostCoverUrl(post: PayloadPost): string {
  if (post.coverImage?.url) return post.coverImage.url
  if (post.coverImageUrl) return post.coverImageUrl
  return 'https://images.unsplash.com/photo-1545239351-c77e88f1c3c8?w=1200&auto=format&fit=crop&q=80'
}
