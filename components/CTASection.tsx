'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import LottiePlayer from './LottiePlayer'
import ctaData from '@/public/animations/cta-float.json'

export default function CTASection() {
  return (
    <section className="py-28 px-6 bg-gradient-to-br from-[#FFD7D1]/40 via-cream to-blush-light/30 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blush/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-20 w-72 h-72 rounded-full bg-sage/15 blur-3xl" />
      </div>

      {/* Lottie floating sparkles — bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none opacity-60">
        <LottiePlayer
          src={ctaData}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="max-w-2xl mx-auto text-center relative">
        <FadeIn>
          <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-6">
            <span className="w-8 h-px bg-blush/40" />
            what&apos;s next ✦
            <span className="w-8 h-px bg-blush/40" />
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-4">
            your life OS.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="font-script text-3xl md:text-4xl text-blush mb-6 leading-snug">
            for girls with too many tabs open ♡
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="font-sans text-taupe text-sm leading-relaxed max-w-sm mx-auto mb-10">
            plan your week. track your money. stop overthinking.
            one dashboard, one OS — all of it handled.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/lazy-girl-os"
              className="inline-flex items-center justify-center px-8 py-4 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_8px_30px_rgba(242,167,179,0.4)]"
            >
              join the waitlist ✦
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/60 text-charcoal font-sans font-medium text-sm rounded-full border border-blush-light/50 hover:bg-white/90 active:scale-[0.97] transition-all duration-150 backdrop-blur-sm"
            >
              shop what&apos;s ready now
            </Link>
          </div>
        </FadeIn>

        {/* Feature pills */}
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {['plan your week ✦', 'money clarity', 'daily dashboard', 'stop overthinking', 'built for lazy girls ♡'].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                className="bg-white/60 backdrop-blur-sm text-taupe font-sans text-xs px-4 py-2 rounded-full border border-blush-light/30"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
