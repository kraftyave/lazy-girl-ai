/**
 * Seed script — imports all hardcoded blog posts into Payload CMS.
 * Run once after setting up the database:
 *   npx tsx scripts/seed-posts.ts
 *
 * Requires DATABASE_URL in .env.local
 */
import { configDotenv } from 'dotenv'
configDotenv({ path: '.env.local' })
import { getPayload } from 'payload'
import config from '../payload.config'
import { blogPosts, type Block } from '../lib/blog-data'

type LexicalNode = Record<string, unknown>

function textNode(text: string): LexicalNode {
  return { type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 }
}

function paragraphNode(text: string): LexicalNode {
  return {
    type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
    children: [textNode(text)],
  }
}

function headingNode(text: string, tag: 'h2' | 'h3'): LexicalNode {
  return {
    type: 'heading', tag, version: 1, direction: 'ltr', format: '', indent: 0,
    children: [textNode(text)],
  }
}

function listNode(items: string[]): LexicalNode {
  return {
    type: 'list', listType: 'bullet', version: 1, direction: 'ltr', format: '', indent: 0,
    start: 1, tag: 'ul',
    children: items.map((item) => ({
      type: 'listitem', version: 1, direction: 'ltr', format: '', indent: 0,
      value: 1, checked: undefined,
      children: [textNode(item)],
    })),
  }
}

function blockNode(blockType: string, fields: Record<string, unknown>): LexicalNode {
  return {
    type: 'block', version: 2, format: '',
    fields: { blockType, id: crypto.randomUUID(), ...fields },
  }
}

function blocksToLexical(blocks: Block[]) {
  const children: LexicalNode[] = blocks.map((block) => {
    switch (block.type) {
      case 'p': return paragraphNode(block.text)
      case 'h2': return headingNode(block.text, 'h2')
      case 'h3': return headingNode(block.text, 'h3')
      case 'ul': return listNode(block.items)
      case 'tip': return blockNode('tip', { text: block.text })
      case 'callout': return blockNode('callout', { text: block.text })
      default: return paragraphNode('')
    }
  })

  return {
    root: {
      type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
      children,
    },
  }
}

async function seed() {
  const payload = await getPayload({ config })

  console.log(`Seeding ${blogPosts.length} posts...`)

  for (const post of blogPosts) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })

    const data = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category === 'AI updates' ? 'ai-updates' : post.category,
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

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'posts',
        id: existing.docs[0].id,
        data,
      })
      console.log(`  updated: ${post.slug}`)
      continue
    }

    await payload.create({
      collection: 'posts',
      data,
    })

    console.log(`  seeded: ${post.slug}`)
  }

  console.log('Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
