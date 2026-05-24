import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import Link from 'next/link'
import { Sparkles, Bot, Zap, Layout, Star } from 'lucide-react'

const journey = [
  {
    step: '01',
    title: 'Start Here',
    desc: 'Grab a free prompt. Paste it into ChatGPT or Claude and see what AI actually does. Takes five minutes. No setup, no tech knowledge, no learning curve.',
    cta: 'Free Prompts →',
    href: '/prompts',
  },
  {
    step: '02',
    title: 'Get the System',
    desc: 'When you\'re ready to stop doing it manually, we built the systems for you. Automations, Notion workspaces, AI systems. Done. You just plug in and run.',
    cta: 'Browse the Shop →',
    href: '/shop',
  },
  {
    step: '03',
    title: 'Let It Run',
    desc: 'LazyGirlOS: your full AI life operating system. Morning briefings, AI companion, daily reset, one-click automations. Your life on autopilot. You just show up.',
    cta: 'Join the Waitlist →',
    href: '/lazy-girl-os',
  },
]

const contentPillars = [
  {
    icon: Star,
    title: 'LazyGirlOS',
    desc: 'The flagship: cinematic AI life OS with morning briefing, AI companion, daily reset, and 12 aesthetic themes. Romanticize your life, automate the admin.',
    highlight: true,
  },
  {
    icon: Bot,
    title: 'System Bundles',
    desc: 'The full stack for one life area: automation + Notion + AI system, bundled. Pick your goal, get everything built for it.',
    highlight: false,
  },
  {
    icon: Zap,
    title: 'Automation Templates',
    desc: 'One-click Zapier & Make workflows. Import, fill in your name, watch it run.',
    highlight: false,
  },
  {
    icon: Layout,
    title: 'Notion AI Systems',
    desc: 'Pre-built workspaces with AI already wired in. Your second brain, set up for you.',
    highlight: false,
  },
  {
    icon: Sparkles,
    title: 'Free Prompts',
    desc: 'Your starting point. Real prompts for real life. Copy, paste, done. Start here if you\'ve never used AI before. No signup, no fluff.',
    highlight: false,
  },
]

const values = [
  'Start where you are. Total beginner or ready to hand it all off, there\'s a path for you.',
  'We teach by doing, not explaining. The prompts show you, the systems handle it.',
  'Honest, like a smart friend who figured it out and is just telling you.',
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
                  Lazy, Not
                  <br />
                  <span className="font-script text-blush">Clueless ♡</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-sans text-taupe text-sm leading-[1.9] mb-4">
                  Lazy Girl AI is for women who want AI to actually work in their life.
                  Whether you&apos;ve never opened ChatGPT or you&apos;re ready to hand everything
                  off to a system that runs itself, you&apos;re in the right place.
                </p>
                <p className="font-sans text-taupe text-sm leading-[1.9]">
                  We&apos;ll catch you up in five minutes with the free prompts. We&apos;ll build
                  the done-for-you systems when you&apos;re ready. And when you want the whole
                  thing running on autopilot? That&apos;s LazyGirlOS.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="font-script text-xl text-blush mt-6">
                  We&apos;ll Catch You Up. Then We&apos;ll Build It for You. ✦
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

      {/* Your path — 3-step journey */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="mb-14 text-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
              your path ✦
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-3 leading-tight">
              Start Where You Are.
              <br />
              <span className="font-script text-blush">End Where You Want. ♡</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {journey.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="relative bg-[#FFF8F4] rounded-3xl p-7 border border-blush-light/20 hover:border-blush/30 hover:shadow-soft transition-all duration-200 flex flex-col h-full">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-blush/50 font-medium mb-4">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-2xl text-charcoal mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-taupe leading-relaxed flex-1 mb-5">
                    {step.desc}
                  </p>
                  <Link
                    href={step.href}
                    className="font-sans text-xs font-medium text-blush hover:text-charcoal transition-colors duration-150"
                  >
                    {step.cta}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-20 px-6 bg-gradient-to-b from-cream to-[#FFF0E8]">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="mb-12 text-center">
            <h2 className="font-serif text-4xl text-charcoal">
              What We Build
            </h2>
            <p className="font-sans text-taupe text-sm mt-3 max-w-sm mx-auto leading-relaxed">
              everything from a single free prompt to a full AI life operating system.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentPillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.07}>
                <div className={`rounded-3xl p-6 border transition-all duration-200 h-full ${
                  pillar.highlight
                    ? 'bg-gradient-to-br from-blush/10 to-blush-light/20 border-blush/25 hover:border-blush/40 hover:shadow-[0_8px_32px_rgba(242,167,179,0.15)]'
                    : 'bg-[#FFF8F4] border-blush-light/20 hover:border-blush-light/50 hover:shadow-soft'
                }`}>
                  <pillar.icon
                    className={`w-5 h-5 mb-3 ${pillar.highlight ? 'text-blush' : 'text-blush/70'}`}
                    strokeWidth={1.5}
                  />
                  <h3 className="font-sans font-semibold text-sm text-charcoal mb-2">
                    {pillar.title}
                    {pillar.highlight && (
                      <span className="ml-2 text-[9px] uppercase tracking-wider text-blush/70 font-medium">flagship</span>
                    )}
                  </h3>
                  <p className="font-sans text-xs text-taupe leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Our vibe */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl text-charcoal mb-10">
              Our Vibe
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

      {/* CTA — three paths */}
      <section className="py-24 px-6 bg-gradient-to-br from-blush-light/20 via-cream to-sage/10">
        <div className="max-w-xl mx-auto text-center">
          <FadeIn>
            <p className="font-script text-3xl text-blush mb-3">Where Do You Want to Start?</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 leading-tight">
              There&apos;s a Path for Where You Are Right Now.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans text-taupe text-sm mb-10 max-w-sm mx-auto leading-relaxed">
              never used AI? start with the free prompts — you&apos;ll get it in five minutes.
              ready for the full thing? the shop and the OS are waiting.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col gap-3">
              <Link
                href="/lazy-girl-os"
                className="inline-flex items-center justify-center px-8 py-4 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.4)]"
              >
                join the lazygirlOS waitlist ✦
              </Link>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/prompts"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3.5 bg-white/60 text-charcoal font-sans font-medium text-sm rounded-full border border-blush-light/50 hover:bg-white active:scale-[0.97] transition-all duration-150"
                >
                  start with free prompts
                </Link>
                <Link
                  href="/shop"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3.5 bg-white/60 text-charcoal font-sans font-medium text-sm rounded-full border border-blush-light/50 hover:bg-white active:scale-[0.97] transition-all duration-150"
                >
                  browse the shop
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
