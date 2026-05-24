import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import { getPayload } from 'payload'
import config from '@payload-config'
import { blogPosts, type Block } from '@/lib/blog-data'

export const maxDuration = 60

const INIT_SQL = `
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_preferences" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer
  );

  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "global_slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer,
    "posts_id" integer,
    "media_id" integer
  );

  CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "email" varchar NOT NULL,
    "reset_password_token" varchar,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" varchar,
    "hash" varchar,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
  );

  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");

  DROP TABLE IF EXISTS "users_sessions";
  CREATE TABLE "users_sessions" (
    "id" varchar PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now(),
    "expires_at" timestamp(3) with time zone,
    "token" varchar
  );

  CREATE INDEX IF NOT EXISTS "users_sessions_order_parent_id_idx" ON "users_sessions" USING btree ("_order","_parent_id");

  CREATE TABLE IF NOT EXISTS "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "alt" varchar NOT NULL,
    "caption" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric,
    "sizes_thumbnail_url" varchar,
    "sizes_thumbnail_width" numeric,
    "sizes_thumbnail_height" numeric,
    "sizes_thumbnail_mime_type" varchar,
    "sizes_thumbnail_filesize" numeric,
    "sizes_thumbnail_filename" varchar,
    "sizes_card_url" varchar,
    "sizes_card_width" numeric,
    "sizes_card_height" numeric,
    "sizes_card_mime_type" varchar,
    "sizes_card_filesize" numeric,
    "sizes_card_filename" varchar,
    "sizes_feature_url" varchar,
    "sizes_feature_width" numeric,
    "sizes_feature_height" numeric,
    "sizes_feature_mime_type" varchar,
    "sizes_feature_filesize" numeric,
    "sizes_feature_filename" varchar
  );

  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");

  CREATE TABLE IF NOT EXISTS "posts" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "excerpt" varchar NOT NULL,
    "content" jsonb,
    "slug" varchar NOT NULL,
    "status" varchar DEFAULT 'draft',
    "category" varchar NOT NULL,
    "featured" boolean DEFAULT false,
    "published_at" timestamp(3) with time zone,
    "reading_time" numeric,
    "cover_image_url" varchar,
    "cover_image_id" integer,
    "meta_title" varchar,
    "meta_description" varchar,
    "meta_image_id" integer,
    "_status" varchar DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");

  DROP TABLE IF EXISTS "posts_tags";
  CREATE TABLE "posts_tags" (
    "id" varchar PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "tag" varchar
  );

  CREATE INDEX IF NOT EXISTS "posts_tags_order_parent_id_idx" ON "posts_tags" USING btree ("_order","_parent_id");

  CREATE TABLE IF NOT EXISTS "_posts_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_title" varchar,
    "version_excerpt" varchar,
    "version_content" jsonb,
    "version_slug" varchar,
    "version_status" varchar DEFAULT 'draft',
    "version_category" varchar,
    "version_featured" boolean DEFAULT false,
    "version_published_at" timestamp(3) with time zone,
    "version_reading_time" numeric,
    "version_cover_image_url" varchar,
    "version_cover_image_id" integer,
    "version_meta_title" varchar,
    "version_meta_description" varchar,
    "version_meta_image_id" integer,
    "version__status" varchar DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE INDEX IF NOT EXISTS "_posts_v_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");

  DROP TABLE IF EXISTS "_posts_v_version_tags";
  CREATE TABLE "_posts_v_version_tags" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "tag" varchar,
    "_uuid" varchar
  );

  CREATE INDEX IF NOT EXISTS "_posts_v_version_tags_order_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_order","_parent_id");
`

// --- Lexical helpers (same as seed-posts.ts) ---
type LexicalNode = Record<string, unknown>

function textNode(text: string): LexicalNode {
  return { type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 }
}
function paragraphNode(text: string): LexicalNode {
  return { type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(text)] }
}
function headingNode(text: string, tag: 'h2' | 'h3'): LexicalNode {
  return { type: 'heading', tag, version: 1, direction: 'ltr', format: '', indent: 0, children: [textNode(text)] }
}
function listNode(items: string[]): LexicalNode {
  return {
    type: 'list', listType: 'bullet', version: 1, direction: 'ltr', format: '', indent: 0, start: 1, tag: 'ul',
    children: items.map((item) => ({ type: 'listitem', version: 1, direction: 'ltr', format: '', indent: 0, value: 1, checked: undefined, children: [textNode(item)] })),
  }
}
function blockNode(blockType: string, fields: Record<string, unknown>): LexicalNode {
  return { type: 'block', version: 2, format: '', fields: { blockType, id: crypto.randomUUID(), ...fields } }
}
function blocksToLexical(blocks: Block[]) {
  return {
    root: {
      type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
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

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const steps: string[] = []

  // Step 1: Create schema via raw SQL
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    await pool.query(INIT_SQL)
    await pool.end()
    steps.push('schema: created all tables')
  } catch (e) {
    steps.push(`schema error: ${String(e)}`)
    return NextResponse.json({ ok: false, steps }, { status: 500 })
  }

  // Step 2: Seed posts via Payload
  try {
    const payload = await getPayload({ config })

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
        steps.push(`updated: ${post.slug}`)
        continue
      }

      await payload.create({
        collection: 'posts',
        data,
      })
      steps.push(`seeded: ${post.slug}`)
    }
  } catch (e) {
    steps.push(`seed error: ${String(e)}`)
    return NextResponse.json({ ok: false, steps }, { status: 500 })
  }

  return NextResponse.json({ ok: true, steps })
}
