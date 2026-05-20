import { NextResponse } from 'next/server'
import { getPostsWithoutContent } from '@/lib/blog-data'

export async function GET() {
  const posts = getPostsWithoutContent()
  return NextResponse.json({ posts })
}
