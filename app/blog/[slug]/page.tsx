import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { blogPosts, getPostBySlug, getNonFeaturedPosts, type Block } from '@/lib/blog-data'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case 'p':
      return (
        <p key={index} className="font-sans text-[15px] text-charcoal/80 leading-[1.85] mb-5">
          {block.text}
        </p>
      )
    case 'h2':
      return (
        <h2 key={index} className="font-serif text-2xl text-charcoal mt-10 mb-4 leading-snug">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={index} className="font-sans text-[13px] uppercase tracking-[0.18em] text-blush font-semibold mt-7 mb-3">
          {block.text}
        </h3>
      )
    case 'ul':
      return (
        <ul key={index} className="mb-5 flex flex-col gap-2.5">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="text-blush text-xs mt-1.5 flex-shrink-0">✦</span>
              <span className="font-sans text-[15px] text-charcoal/80 leading-[1.75]">{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'tip':
      return (
        <div key={index} className="my-8 rounded-3xl bg-blush-light/40 border border-blush-light/60 px-6 py-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-blush font-semibold mb-2">lazy girl tip ✦</p>
          <p className="font-sans text-sm text-charcoal/80 leading-relaxed">{block.text}</p>
        </div>
      )
    case 'callout':
      return (
        <div key={index} className="my-8 rounded-3xl bg-sage/15 border border-sage/30 px-6 py-5">
          <p className="font-sans text-sm text-charcoal/80 leading-relaxed">{block.text}</p>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getNonFeaturedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero image */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-cream" />
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-10 pb-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-sans text-xs text-taupe hover:text-charcoal transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" strokeWidth={1.5} />
          all posts
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-blush font-medium bg-blush/10 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="font-sans text-[11px] text-taupe/70">
            {post.readingTime} min read
          </span>
          <span className="font-sans text-[11px] text-taupe/50">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.1] mb-10">
          {post.title}
        </h1>

        {/* Divider */}
        <div className="w-12 h-px bg-blush/40 mb-10" />

        {/* Content */}
        <article>
          {post.content.map((block, i) => renderBlock(block, i))}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-blush-light/30">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-taupe/60 bg-cream border border-blush-light/40 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-4xl bg-gradient-to-br from-blush/10 via-blush-light/15 to-cream p-7 border border-blush-light/30">
          <p className="font-script text-2xl text-blush mb-2">want more of this? ♡</p>
          <p className="font-sans text-sm text-taupe leading-relaxed mb-5">
            the monthly drop: one curated AI tool, filtered updates, and honest takes on what is actually worth your time.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://ko-fi.com/lazygirlai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.35)]"
            >
              join the drop ✦
            </a>
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
                      src={p.coverImage}
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
