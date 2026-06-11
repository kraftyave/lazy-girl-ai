import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { getPublishedPosts, getPostCoverUrl, type PayloadPost } from '@/lib/payload'

export const dynamic = 'force-dynamic'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const CATEGORY_GRADIENT: Record<string, string> = {
  tools: 'from-blush-light/60 to-[#FFD7D1]/40',
  'ai-updates': 'from-[#EDE0F5]/50 to-blush/15',
  productivity: 'from-sage/20 to-[#C7D1C2]/30',
  content: 'from-[#FFF0E8]/70 to-blush/15',
  career: 'from-sage/20 to-[#C7D1C2]/30',
  money: 'from-[#FFF0E8]/80 to-blush-light/30',
  opinion: 'from-charcoal/5 to-blush/10',
}

function gradientFor(post: PayloadPost) {
  return CATEGORY_GRADIENT[post.category] ?? 'from-blush-light/50 to-cream'
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  const featured = posts.find((p) => p.featured) ?? posts[0] ?? null
  const rest = posts.filter((p) => p !== featured)

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-cream via-[#FFF0E8] to-blush-light/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-blush/8 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-sage/12 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <FadeIn>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
              The Blog ✦
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mt-3 leading-[1.05]">
              AI, Simplified.
              <br />
              <span className="font-script text-blush">For Your Actual Life ♡</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans text-taupe text-sm mt-5 max-w-md mx-auto leading-relaxed">
              No jargon. No hype. Just tools, updates, and honest takes on what AI can and can&apos;t do for you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="px-6 pt-16 pb-8">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium mb-5">
                latest ✦
              </p>
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className={`rounded-4xl bg-gradient-to-br ${gradientFor(featured)} border border-white/60 overflow-hidden hover:shadow-[0_8px_48px_rgba(242,167,179,0.18)] hover:-translate-y-1 transition-all duration-300`}>
                  <div className="relative w-full h-56 md:h-72 overflow-hidden">
                    <Image
                      src={getPostCoverUrl(featured)}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 1000px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-4 left-6 font-sans text-[10px] uppercase tracking-[0.18em] text-white font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {featured.category}
                    </span>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="flex-1 max-w-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-sans text-[11px] text-taupe/70">
                          {featured.readingTime} min read
                        </span>
                      </div>
                      <h2 className="font-serif text-3xl md:text-4xl text-charcoal leading-snug mb-4 group-hover:text-blush transition-colors duration-200">
                        {featured.title}
                      </h2>
                      <p className="font-sans text-sm text-taupe leading-relaxed max-w-lg">
                        {featured.excerpt}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      {featured.publishedAt && (
                        <p className="font-sans text-[11px] text-taupe/60 mb-3">
                          {formatDate(featured.publishedAt)}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-blush group-hover:gap-2.5 transition-all duration-200">
                        read it ✦
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Rest of posts */}
      {rest.length > 0 && (
        <section className="px-6 py-8 pb-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium mb-5">
                more reads ✦
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {rest.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.07}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className={`rounded-4xl bg-gradient-to-br ${gradientFor(post)} border border-white/60 h-full flex flex-col overflow-hidden hover:shadow-[0_8px_40px_rgba(242,167,179,0.15)] hover:-translate-y-1 transition-all duration-300`}>
                      <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
                        <Image
                          src={getPostCoverUrl(post)}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                        <span className="absolute bottom-3 left-5 font-sans text-[10px] uppercase tracking-[0.18em] text-white font-medium bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <span className="font-sans text-[11px] text-taupe/70 mb-3">
                          {post.readingTime} min read
                        </span>
                        <h2 className="font-serif text-xl text-charcoal leading-snug mb-3 flex-1 group-hover:text-blush transition-colors duration-200">
                          {post.title}
                        </h2>
                        <p className="font-sans text-xs text-taupe leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/50">
                          {post.publishedAt && (
                            <span className="font-sans text-[11px] text-taupe/60">
                              {formatDate(post.publishedAt)}
                            </span>
                          )}
                          <span className="font-sans text-xs font-medium text-blush group-hover:translate-x-0.5 transition-transform duration-200">
                            read →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <section className="px-6 py-24 text-center">
          <p className="font-script text-3xl text-blush mb-3">coming soon ♡</p>
          <p className="font-sans text-sm text-taupe">posts are on their way.</p>
        </section>
      )}

      <Footer />
    </main>
  )
}
