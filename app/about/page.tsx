import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import Link from 'next/link'
import { Sparkles, Bot, Zap, Layout, Package } from 'lucide-react'

const contentPillars = [
  {
    icon: Sparkles,
    title: 'free prompts',
    desc: 'Your starting point. Real prompts for real life — copy, paste, done. No signup, no fluff.',
  },
  {
    icon: Bot,
    title: 'custom GPTs',
    desc: 'Pre-loaded AI assistants for your brand voice, job search, life admin — ready the moment you get them.',
  },
  {
    icon: Zap,
    title: 'automation templates',
    desc: 'One-click Zapier & Make workflows. Import, fill in your name, watch it run.',
  },
  {
    icon: Layout,
    title: 'notion AI systems',
    desc: 'Pre-built workspaces with AI already wired in. Your second brain, set up for you.',
  },
  {
    icon: Package,
    title: 'system bundles',
    desc: 'The full stack for one life area — GPT + automation + Notion. Everything, done.',
  },
]

const values = [
  'Relatable, not overwhelming — AI made for real life, not tech people',
  'Honest, like a smart friend who figured it out and is telling you',
  'Done-for-you when you want it, free resources when you don\'t',
  'Soft aesthetic. Serious outcomes.',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-cream via-[#FFF0E8] to-blush-light/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-blush/8 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-sage/12 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
                  about
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="font-serif text-5xl md:text-6xl text-charcoal mt-3 mb-6 leading-[1.05]">
                  lazy, not
                  <br />
                  <span className="font-script text-blush">clueless ♡</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-sans text-taupe text-sm leading-[1.9] mb-4">
                  Lazy Girl AI is for women who want AI to actually work in their life — whether you&apos;ve
                  never opened ChatGPT or you&apos;re ready to hand the whole thing off to a system that runs itself.
                </p>
                <p className="font-sans text-taupe text-sm leading-[1.9]">
                  Start with the free prompts — they&apos;ll catch you up in five minutes and show you
                  what AI can actually do. When you&apos;re ready to stop setting things up and just
                  run? The shop has done-for-you systems — custom GPTs, automations, Notion workspaces
                  — built and waiting.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="font-script text-xl text-blush mt-6">
                  we&apos;ll catch you up. then we&apos;ll take it from there.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} direction="right">
              <div className="relative rounded-4xl overflow-hidden aspect-square bg-gradient-to-br from-blush-light via-blush/20 to-sage/20 shadow-soft-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-hero.jpg"
                  alt="lazy girl ai"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Corner pill */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/60 backdrop-blur-sm text-taupe font-sans text-xs px-3 py-1.5 rounded-full border border-white/40">
                    plug in. it runs. ✦
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Content pillars */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="mb-12">
            <h2 className="font-serif text-4xl text-charcoal text-center">
              what we do
            </h2>
            <p className="font-sans text-taupe text-sm text-center mt-3 max-w-sm mx-auto leading-relaxed">
              start free. go deeper when you're ready.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentPillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.07}>
                <div className="bg-[#FFF8F4] rounded-3xl p-6 border border-blush-light/20 hover:border-blush-light/50 hover:shadow-soft transition-all duration-200">
                  <pillar.icon className="w-5 h-5 text-blush mb-3" strokeWidth={1.5} />
                  <h3 className="font-sans font-semibold text-sm text-charcoal mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-taupe leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Brand voice */}
      <section className="py-20 px-6 bg-gradient-to-br from-blush-light/20 to-cream">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl text-charcoal mb-10">
              our vibe
            </h2>
          </FadeIn>
          <div className="flex flex-col gap-4">
            {values.map((v, i) => (
              <FadeIn key={v} delay={i * 0.08}>
                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-blush-light/25">
                  <span className="text-blush flex-shrink-0">♡</span>
                  <p className="font-sans text-sm text-charcoal text-left">{v}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <FadeIn>
          <p className="font-script text-3xl text-blush mb-4">ready to start?</p>
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            try the free prompts first
          </h2>
          <p className="font-sans text-taupe text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            not sure where to start? grab some free prompts. when you're ready for the full done-for-you system, it's in the shop.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/prompts"
              className="inline-flex items-center justify-center px-8 py-4 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.4)]"
            >
              get the free prompts ✦
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/60 text-charcoal font-sans font-medium text-sm rounded-full border border-blush-light/50 hover:bg-white active:scale-[0.97] transition-all duration-150"
            >
              browse the shop
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
