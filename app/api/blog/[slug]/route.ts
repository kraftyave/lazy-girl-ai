import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/blog-data'

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ post })
}
