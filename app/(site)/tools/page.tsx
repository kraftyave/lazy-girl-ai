import Link from 'next/link'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { bundles } from '@/lib/tools-data'

export const metadata = {
  title: 'Free AI Tools — Lazy Girl AI',
  description: 'Free AI tools for every type of woman. Pick your vibe, try the tools, get better results from AI.',
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-blush-light/25 to-cream relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 right-0 w-[500px] h-[400px] rounded-full bg-blush/6 blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative">
          <FadeIn>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
              free tools ✦
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mt-3 mb-4 leading-[1.05]">
              pick your vibe.
              <br />
              <span className="font-script text-blush">use AI better. ♡</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans text-taupe text-sm leading-relaxed max-w-sm mx-auto">
              free tools built for your actual life. no sign-up, no AI API, no cost. just pick who you are and go.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Bundle grid */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium text-center mb-10">
              who are you right now?
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bundles.map((bundle, i) => {
              const activeTools = bundle.freeTools.filter((t) => !t.comingSoon).length
              const totalTools = bundle.freeTools.length

              return (
                <FadeIn key={bundle.slug} delay={i * 0.05}>
                  <Link
                    href={`/tools/${bundle.slug}`}
                    className={`group relative flex flex-col rounded-4xl p-6 bg-gradient-to-br ${bundle.gradient} border border-white/50 hover:shadow-[0_8px_40px_rgba(242,167,179,0.15)] hover:-translate-y-1 transition-all duration-300 h-full`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-2xl leading-none">{bundle.emoji}</span>
                      <span className="font-sans text-[10px] text-taupe/60">
                        {activeTools} free tools
                      </span>
                    </div>

                    <h2 className="font-serif text-xl text-charcoal leading-snug mb-1.5">
                      {bundle.name}
                    </h2>
                    <p className="font-sans text-xs text-taupe leading-relaxed flex-1">
                      {bundle.tagline}
                    </p>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/50">
                      <div className="flex gap-1">
                        {bundle.freeTools.map((t, j) => (
                          <div
                            key={j}
                            className={`w-1.5 h-1.5 rounded-full ${t.comingSoon ? 'bg-blush-light/40' : 'bg-blush/50'}`}
                          />
                        ))}
                      </div>
                      <span className="font-sans text-xs font-medium text-blush group-hover:translate-x-0.5 transition-transform duration-200">
                        try it free →
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 px-6 pb-20 text-center bg-gradient-to-t from-blush-light/15 to-cream">
        <FadeIn>
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-3">
            ready for the full system?
          </p>
          <p className="font-serif text-2xl text-charcoal mb-2">
            done-for-you beats do-it-yourself.
          </p>
          <p className="font-sans text-sm text-taupe mb-8 max-w-xs mx-auto leading-relaxed">
            the tools help you use AI better. the systems make AI run things for you.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-4 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.4)]"
          >
            shop the systems ✦
          </Link>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
