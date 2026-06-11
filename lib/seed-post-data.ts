import type { BlogPost } from './blog-types'
import { blocksToLexical, categoryToPayload } from './blog-lexical'

export function postToPayloadData(post: BlogPost) {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: categoryToPayload(post.category),
    tags: post.tags.map((tag) => ({ tag })),
    readingTime: post.readingTime,
    publishedAt: post.publishedAt,
    featured: post.featured ?? false,
    coverImageUrl: post.coverImage,
    status: 'published' as const,
    content: blocksToLexical(post.content),
    meta: {
      title: `${post.title} — lazy girl ai`,
      description: post.excerpt,
    },
  }
}