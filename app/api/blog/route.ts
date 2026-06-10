import { NextResponse } from 'next/server'
import { getPublishedPosts } from '@/lib/payload'

export async function GET() {
  const posts = await getPublishedPosts()
  const summaries = posts.map(({ content: _, ...post }) => post)
  return NextResponse.json({ posts: summaries })
}