import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { getPostBySlug, getPublishedPosts, getPostCoverUrl } from '@/lib/payload'
import LexicalRenderer from '@/components/LexicalRenderer'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.meta?.title ?? `${post.title} — lazy girl ai`,
    description: post.meta?.description ?? post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.meta?.image?.url ? [post.meta.image.url] : [],
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lazygirlai.vercel.app'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = await getPublishedPosts()
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2)
  const tags = post.tags?.map((t) => t.tag) ?? []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta?.description ?? post.excerpt,
    datePublished: post.publishedAt ?? undefined,
    author: { '@type': 'Organization', name: "Lazy Girl's Guide to AI", url: siteUrl },
    publisher: { '@type': 'Organization', name: "Lazy Girl's Guide to AI", url: siteUrl },
    url: `${siteUrl}/blog/${post.slug}`,
    image: getPostCoverUrl(post),
    keywords: tags.join(', '),
  }

  return (
    <main className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero image */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src={getPostCoverUrl(post)}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-cream" />
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-10 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-sans text-xs text-taupe hover:text-charcoal transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" strokeWidth={1.5} />
          all posts
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-blush font-medium bg-blush/10 px-3 py-1 rounded-full">
            {post.category}
          </span>
          {post.readingTime && (
            <span className="font-sans text-[11px] text-taupe/70">{post.readingTime} min read</span>
          )}
          {post.publishedAt && (
            <span className="font-sans text-[11px] text-taupe/50">{formatDate(post.publishedAt)}</span>
          )}
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.1] mb-10">
          {post.title}
        </h1>

        <div className="w-12 h-px bg-blush/40 mb-10" />

        <article className="blog-content">
          <LexicalRenderer data={post.content} />
        </article>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-blush-light/30">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] uppercase tracking-[0.15em] text-taupe/60 bg-cream border border-blush-light/40 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-4xl bg-gradient-to-br from-blush/10 via-blush-light/15 to-cream p-7 border border-blush-light/30">
          <p className="font-script text-2xl text-blush mb-2">want more of this? ♡</p>
          <p className="font-sans text-sm text-taupe leading-relaxed mb-4">
            free prompts, honest AI takes, and the lazy girl way to use all of it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/lazy-girl-os"
              className="inline-flex items-center px-6 py-3 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.35)]"
            >
              The OS Waitlist ✦
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center px-6 py-3 bg-white text-charcoal font-sans font-medium text-sm rounded-full border border-blush-light/50 hover:bg-blush-light/20 active:scale-[0.97] transition-all duration-150"
            >
              try the free tools
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium mb-5">
              more reads ✦
            </p>
            <div className="flex flex-col gap-4">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex items-start gap-4">
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={getPostCoverUrl(p)}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-base text-charcoal group-hover:text-blush transition-colors duration-200 leading-snug mb-1">
                      {p.title}
                    </p>
                    <p className="font-sans text-[11px] text-taupe/60">{p.readingTime} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
