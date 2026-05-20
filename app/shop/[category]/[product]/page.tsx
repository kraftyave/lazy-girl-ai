import { notFound } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import BuyButton from '@/components/BuyButton'
import { shopCategories, getCategoryBySlug, getProductById } from '@/lib/shop-data'
import { ArrowLeft, Check, Clock } from 'lucide-react'

export async function generateStaticParams() {
  return shopCategories.flatMap((cat) =>
    cat.products.map((product) => ({
      category: cat.slug,
      product: product.id,
    }))
  )
}

export function generateMetadata({
  params,
}: {
  params: { category: string; product: string }
}) {
  const product = getProductById(params.category, params.product)
  if (!product) return {}
  return {
    title: `${product.name} — Lazy Girl AI`,
    description: product.desc,
  }
}

export default function ProductPage({
  params,
}: {
  params: { category: string; product: string }
}) {
  const category = getCategoryBySlug(params.category)
  const product = getProductById(params.category, params.product)
  if (!category || !product) notFound()

  const isAvailable = product.status === 'available'

  // Find other products in this category (excluding current)
  const related = category.products
    .filter((p) => p.id !== product.id && p.status === 'available')
    .slice(0, 3)

  // Check if this product is in any bundle
  const bundleCategory = shopCategories.find((c) => c.slug === 'bundles')
  const includedInBundles = bundleCategory?.products.filter(
    (b) => b.status === 'available' && b.whatYouGet?.some((line) => line.includes(product.name))
  ) ?? []

  return (
    <main className="min-h-screen bg-cream">
      {/* Breadcrumb + back */}
      <section className={`pt-28 pb-14 px-6 bg-gradient-to-br ${category.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 right-0 w-96 h-96 rounded-full bg-blush/6 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <FadeIn>
            <div className="flex items-center gap-2 font-sans text-xs text-taupe mb-8">
              <Link href="/shop" className="hover:text-charcoal transition-colors duration-150">shop</Link>
              <span>/</span>
              <Link href={`/shop/${category.slug}`} className="hover:text-charcoal transition-colors duration-150">{category.shortName}</Link>
              <span>/</span>
              <span className="text-charcoal">{product.name}</span>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div>
              {product.popular && (
                <FadeIn>
                  <span className="inline-block font-sans text-[10px] uppercase tracking-wider text-white bg-blush px-3 py-1 rounded-full mb-4">
                    popular
                  </span>
                </FadeIn>
              )}
              <FadeIn delay={0.05}>
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
                  {category.shortName}
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-2 mb-3 leading-[1.05]">
                  {product.name}
                </h1>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="font-sans text-sm text-blush font-medium mb-4">{product.tagline}</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-sans text-taupe text-sm leading-relaxed max-w-lg">
                  {product.desc}
                </p>
              </FadeIn>
            </div>

            {/* Price + CTA card */}
            <FadeIn delay={0.25}>
              <div className="bg-white/70 backdrop-blur-sm rounded-4xl p-6 border border-blush-light/30 shadow-soft min-w-[200px]">
                {isAvailable ? (
                  <>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-taupe font-medium mb-1">price</p>
                    <p className="font-serif text-4xl text-charcoal mb-5">${product.price}</p>
                    <p className="font-sans text-[10px] text-taupe/60 mb-4">instant delivery • no subscription</p>
                    {product.dodoProductId ? (
                      <BuyButton productId={product.dodoProductId} label="get this ✦" />
                    ) : product.kofiUrl ? (
                      <a
                        href={product.kofiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-5 py-3 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_16px_rgba(242,167,179,0.35)]"
                      >
                        get this ✦
                      </a>
                    ) : (
                      <span className="font-sans text-xs text-taupe/50">link coming soon</span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-3.5 h-3.5 text-taupe/50" strokeWidth={1.5} />
                      <span className="font-sans text-xs text-taupe/60 uppercase tracking-wider">coming soon</span>
                    </div>
                    <p className="font-serif text-3xl text-charcoal/50 mb-4">${product.price}</p>
                    <span className="font-sans text-xs text-taupe/40">notify me when ready</span>
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What you get */}
      {product.whatYouGet && product.whatYouGet.length > 0 && (
        <section className="py-14 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium mb-6">
                what you get
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 gap-3">
              {product.whatYouGet.map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 bg-white/60 rounded-2xl px-5 py-4 border border-blush-light/25">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blush/15 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-blush" strokeWidth={2.5} />
                    </div>
                    <p className="font-sans text-sm text-charcoal/80 leading-snug">{item}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Included in bundles */}
      {includedInBundles.length > 0 && (
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="bg-gradient-to-br from-blush-light/25 to-cream rounded-4xl p-6 border border-blush-light/25">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-blush font-medium mb-3">
                  also included in
                </p>
                <div className="flex flex-wrap gap-3">
                  {includedInBundles.map((bundle) => (
                    <Link
                      key={bundle.id}
                      href={`/shop/bundles/${bundle.id}`}
                      className="flex items-center justify-between gap-6 bg-white/70 rounded-2xl px-5 py-3.5 border border-blush-light/30 hover:border-blush/25 hover:bg-white transition-all duration-200 group"
                    >
                      <div>
                        <p className="font-sans text-sm font-medium text-charcoal">{bundle.name}</p>
                        <p className="font-sans text-[10px] text-taupe">{bundle.tagline}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg text-charcoal">${bundle.price}</span>
                        <span className="font-sans text-xs text-blush group-hover:translate-x-0.5 transition-transform duration-150">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* More from this category */}
      {related.length > 0 && (
        <section className="py-12 px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium mb-6">
                more {category.shortName.toLowerCase()}
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.06}>
                  <Link
                    href={`/shop/${category.slug}/${p.id}`}
                    className="flex flex-col bg-white/70 rounded-3xl p-5 border border-blush-light/25 hover:border-blush/25 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-250 h-full group"
                  >
                    <h3 className="font-sans text-sm font-medium text-charcoal mb-1">{p.name}</h3>
                    <p className="font-sans text-[11px] text-blush mb-2">{p.tagline}</p>
                    <p className="font-sans text-xs text-taupe leading-relaxed flex-1 line-clamp-2">{p.desc}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-blush-light/20">
                      <span className="font-serif text-lg text-charcoal">${p.price}</span>
                      <span className="font-sans text-xs text-blush group-hover:translate-x-0.5 transition-transform duration-150">view →</span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.2}>
              <div className="mt-8 text-center">
                <Link
                  href={`/shop/${category.slug}`}
                  className="font-sans text-xs text-taupe hover:text-charcoal transition-colors duration-150"
                >
                  ← back to {category.shortName.toLowerCase()}
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
