import { notFound } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { shopCategories, getCategoryBySlug } from '@/lib/shop-data'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'

export async function generateStaticParams() {
  return shopCategories.map((cat) => ({ category: cat.slug }))
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params
  const category = getCategoryBySlug(categorySlug)
  if (!category) notFound()

  const available = category.products.filter((p) => p.status === 'available')
  const comingSoon = category.products.filter((p) => p.status === 'coming-soon')

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className={`pt-32 pb-16 px-6 bg-gradient-to-br ${category.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-blush/6 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <FadeIn>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-sans text-xs text-taupe hover:text-charcoal transition-colors duration-150 mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" strokeWidth={1.5} />
              back to shop
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
              {category.name}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-2 mb-4 leading-[1.05]">
              {category.tagline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-sans text-taupe text-sm leading-relaxed max-w-lg">
              {category.desc}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Available products */}
      {available.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium mb-6">
                available now
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {available.map((product, i) => (
                <FadeIn key={product.id} delay={i * 0.07}>
                  <div className="relative flex flex-col bg-white/80 rounded-4xl p-6 border border-blush-light/30 hover:border-blush/30 hover:shadow-[0_8px_32px_rgba(242,167,179,0.12)] transition-all duration-300 h-full">
                    {product.popular && (
                      <span className="absolute top-5 right-5 text-[10px] font-medium font-sans uppercase tracking-wider px-3 py-1 rounded-full bg-blush text-white">
                        popular
                      </span>
                    )}

                    <h3 className="font-serif text-lg text-charcoal leading-snug mb-1 pr-14">{product.name}</h3>
                    <p className="font-sans text-[11px] text-blush font-medium mb-3">{product.tagline}</p>
                    <p className="font-sans text-xs text-taupe leading-relaxed flex-1">{product.desc}</p>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-blush-light/20">
                      <span className="font-serif text-xl text-charcoal">${product.price}</span>
                      <Link
                        href={`/shop/${category.slug}/${product.id}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blush text-white font-sans font-medium text-xs rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_16px_rgba(242,167,179,0.35)] group"
                      >
                        view
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-150" strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Coming soon */}
      {comingSoon.length > 0 && (
        <section className="py-10 px-6 pb-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium mb-6">
                coming soon
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {comingSoon.map((product, i) => (
                <FadeIn key={product.id} delay={i * 0.06}>
                  <div className="flex flex-col bg-white/40 rounded-4xl p-6 border border-blush-light/20 opacity-75 h-full">
                    <div className="flex items-start gap-2 mb-2">
                      <Clock className="w-3.5 h-3.5 text-taupe/50 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-sans text-[10px] uppercase tracking-wider text-taupe/50">coming soon</span>
                    </div>
                    <h3 className="font-serif text-lg text-charcoal/70 leading-snug mb-1">{product.name}</h3>
                    <p className="font-sans text-[11px] text-taupe/60 font-medium mb-3">{product.tagline}</p>
                    <p className="font-sans text-xs text-taupe/50 leading-relaxed flex-1">{product.desc}</p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-blush-light/15">
                      <span className="font-serif text-xl text-charcoal/50">${product.price}</span>
                      <span className="font-sans text-xs text-taupe/40">notify me</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-sell */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="bg-gradient-to-br from-blush-light/30 to-cream rounded-4xl p-8 border border-blush-light/30">
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-2">
                want everything?
              </p>
              <h2 className="font-serif text-2xl text-charcoal mb-3">
                Check Out the Bundles
              </h2>
              <p className="font-sans text-taupe text-sm mb-6 leading-relaxed max-w-xs mx-auto">
                automation + Notion + AI system, bundled for one life area. better together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/shop/bundles"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_16px_rgba(242,167,179,0.35)]"
                >
                  see bundles ✦
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white/60 text-charcoal font-sans font-medium text-sm rounded-full border border-blush-light/40 hover:bg-white active:scale-[0.97] transition-all duration-150"
                >
                  back to shop
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
