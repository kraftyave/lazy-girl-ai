import { getPublishedPosts } from '@/lib/payload'
import { NextResponse } from 'next/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lazygirlai.vercel.app'

export const revalidate = 3600

export async function GET() {
  const posts = await getPublishedPosts()

  const postLines = posts
    .map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.excerpt}`)
    .join('\n')

  const text = `# Lazy Girl's Guide to AI

> AI made simple. Life made easier. For girls who are tired of doing everything the hard way.

${siteUrl}

## What this site is

A practical, no-BS guide to using AI in everyday life — productivity, content creation, money, career, and tools. Written for people who want results, not jargon.

## Pages

- [Home](${siteUrl}): Overview, free tools, OS waitlist
- [Blog](${siteUrl}/blog): Practical AI tips, tool reviews, and honest takes
- [Shop](${siteUrl}/shop): Prompt packs and AI productivity bundles
- [Free Tools](${siteUrl}/tools): AI prompt builder and other free utilities
- [About](${siteUrl}/about): Who we are and what Lazy Girl AI is about
- [LazyGirl OS Waitlist](${siteUrl}/lazy-girl-os): Upcoming AI productivity system

## Blog posts

${postLines}

## Topics covered

AI tools, ChatGPT, Claude, Gemini, prompt engineering, AI for content creators, AI for productivity, AI for side hustles, making money with AI, AI career tips, honest AI reviews.
`

  return new NextResponse(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
