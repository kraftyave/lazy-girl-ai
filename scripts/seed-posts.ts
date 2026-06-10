/**
 * Seed script — syncs blog seed data into Payload CMS.
 * Run: npm run seed
 *
 * Requires DATABASE_URL and PAYLOAD_SECRET in .env.local
 */
import { configDotenv } from 'dotenv'
// Prefer injected env (Vercel build / vercel env run). Only load .env.local for local dev.
if (!process.env.DATABASE_URL) {
  configDotenv({ path: '.env.local' })
}
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is missing. Add it to .env.local or run via `vercel env run -e production`')
  process.exit(1)
}
import { getPayload } from 'payload'
import config from '../payload.config'
import { blogPosts } from './seed-data/blog-data'
import { blocksToLexical, categoryToPayload } from '../lib/blog-lexical'

async function seed() {
  const payload = await getPayload({ config })

  console.log(`Seeding ${blogPosts.length} posts into Payload CMS...`)

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

    if (existing.docs.length > 0) {
      if (process.env.SEED_FORCE_UPDATE !== 'true') {
        console.log(`  skip (exists): ${post.slug}`)
        continue
      }
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

  console.log('Done. Blog is now served from Payload CMS.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})