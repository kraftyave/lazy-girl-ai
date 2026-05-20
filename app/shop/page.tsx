import Link from 'next/link'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { shopCategories } from '@/lib/shop-data'
import { Zap, Layout, Package, Shirt, LucideProps } from 'lucide-react'

const categoryIcons: Record<string, React.ComponentType<LucideProps>> = {
  'automations': Zap,
  'notion-systems': Layout,
  'bundles': Package,
  'merch': Shirt,
}

export default function ShopPage() {
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
              the lazy girl's guide to AI ✦
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mt-3 leading-[1.05]">
              everything built.
              <br />
              <span className="font-script text-blush">nothing left to figure out ♡</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans text-taupe text-sm mt-5 max-w-md mx-auto leading-relaxed">
              custom GPTs, automation templates, Notion systems, and bundles — all ready to run the moment you get them. pick a category and go.
            </p>
          </FadeIn>

          {/* How it works */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 text-left">
              {[
                { n: '01', label: 'pick your system' },
                { n: '02', label: 'get it instantly' },
                { n: '03', label: 'plug in and run' },
              ].map(({ n, label }, i) => (
                <div key={n} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[10px] font-semibold text-blush uppercase tracking-widest">{n}</span>
                    <span className="font-sans text-sm text-charcoal">{label}</span>
                  </div>
                  {i < 2 && <span className="hidden sm:block w-8 h-px bg-blush-light/60" />}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Category grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shopCategories.map((cat, i) => {
              const Icon = categoryIcons[cat.slug]
              const available = cat.products.filter((p) => p.status === 'available').length
              const total = cat.products.length

              return (
                <FadeIn key={cat.slug} delay={i * 0.07}>
                  <Link
                    href={`/shop/${cat.slug}`}
                    className={`group relative flex flex-col rounded-4xl p-7 bg-gradient-to-br ${cat.gradient} border border-white/60 hover:shadow-[0_8px_40px_rgba(242,167,179,0.18)] hover:-translate-y-1 transition-all duration-300 h-full`}
                  >
                    {/* Icon + price */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center border border-white/60">
                        {Icon && <Icon className="w-4.5 h-4.5 text-blush" strokeWidth={1.5} />}
                      </div>
                      <span className="font-serif text-sm text-taupe">{cat.priceRange}</span>
                    </div>

                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-taupe font-medium mb-1">{cat.shortName}</p>
                    <h2 className="font-serif text-xl text-charcoal leading-snug mb-3">{cat.tagline}</h2>
                    <p className="font-sans text-xs text-taupe leading-relaxed flex-1">{cat.desc}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/50">
                      <span className="font-sans text-[11px] text-taupe/70">
                        {available} available · {total - available} coming soon
                      </span>
                      <span className="font-sans text-xs font-medium text-blush group-hover:translate-x-0.5 transition-transform duration-200">
                        browse →
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Monthly drop */}
      <section className="py-10 px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="rounded-4xl bg-gradient-to-br from-blush/15 via-blush-light/20 to-cream p-8 md:p-10 border border-blush-light/30">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                {/* Left — copy */}
                <div className="flex-1">
                  <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">every month ✦</span>
                  <h2 className="font-serif text-3xl text-charcoal mt-2 mb-3">
                    the monthly drop ♡
                  </h2>
                  <p className="font-sans text-taupe text-sm leading-relaxed mb-6 max-w-sm">
                    you don&apos;t have to keep up with AI. we do it for you.
                    every month: one curated tool you can use immediately,
                    filtered AI updates that actually matter, and the lazy girl
                    verdict on what&apos;s worth your time — and what to skip.
                  </p>
                  <p className="font-serif text-2xl text-blush mb-6">$7/mo</p>
                  <a
                    href="https://ko-fi.com/lazygirlai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-7 py-3.5 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.4)]"
                  >
                    join the drop ✦
                  </a>
                </div>

                {/* Right — what's inside */}
                <div className="md:w-52 flex-shrink-0">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-taupe font-medium mb-3">each issue</p>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      { mark: '✦', text: 'one ready-to-use tool or prompt pack' },
                      { mark: '✦', text: 'AI updates filtered to what actually matters' },
                      { mark: '✦', text: 'lazy girl approved — what\'s worth trying' },
                      { mark: '♡', text: 'what to ignore this month (just as valuable)' },
                    ].map(({ mark, text }) => (
                      <li key={text} className="flex items-start gap-2">
                        <span className="text-blush text-xs mt-0.5 flex-shrink-0">{mark}</span>
                        <span className="font-sans text-xs text-taupe leading-snug">{text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-sans text-[10px] text-taupe/50 mt-4 leading-relaxed">
                    the tool varies — sometimes brand new, sometimes a best-of, always immediately usable.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Free prompts */}
      <section className="py-10 px-6 pb-20 text-center">
        <FadeIn>
          <p className="font-script text-2xl text-blush mb-3">not ready to buy?</p>
          <p className="font-sans text-taupe text-sm mb-6 max-w-xs mx-auto leading-relaxed">
            start with the free tools — they&apos;re the taste of what we do.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center px-7 py-3.5 bg-white text-charcoal font-sans font-medium text-sm rounded-full border border-blush-light/50 hover:bg-blush-light/20 active:scale-[0.97] transition-all duration-150"
          >
            try the free tools first
          </Link>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
