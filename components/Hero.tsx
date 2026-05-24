'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import LottiePlayer from './LottiePlayer'
import sparkleData from '@/public/animations/sparkle-ambient.json'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cream via-[#FFF0E8] to-blush-light/60"
    >
      {/* Ambient background blobs — kept small on mobile to avoid white-wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 md:w-80 md:h-80 rounded-full bg-blush/8 blur-2xl md:blur-3xl" />
        <div className="absolute bottom-10 -right-10 w-48 h-48 md:w-[360px] md:h-[360px] rounded-full bg-blush-light/15 blur-2xl md:blur-3xl" />
        <div className="absolute top-1/3 right-1/3 hidden md:block w-64 h-64 rounded-full bg-sage/10 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">

          {/* LEFT: Text content — text first on mobile, left on desktop */}
          <motion.div
            style={{ y: textY }}
            className="flex flex-col gap-6 order-1"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2.5 w-fit"
            >
              <span className="w-8 h-px bg-blush" />
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium">
                because you&apos;ve got better things to do ✦
              </span>
            </motion.div>

            {/* Heading */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="font-serif text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[1.02] text-charcoal tracking-tight"
              >
                AI for
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="font-script text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] text-blush leading-[1.1]"
              >
                Lazy Girls ♡
              </motion.h1>
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="font-sans text-[11px] uppercase tracking-[0.22em] font-medium text-taupe"
            >
              Prompts. Systems. Guides. Actually for Your Life.
            </motion.p>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="font-sans text-taupe text-[15px] leading-relaxed max-w-[320px]"
            >
              Never touched AI before? Start here. It&apos;s easier than you think. Already using it and want your life to just run? We built the systems. Pick your vibe and go.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <Link
                href="/tools"
                className="px-7 py-3.5 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.4)]"
              >
                Try the Free Tools ✦
              </Link>
              <Link
                href="/shop"
                className="px-7 py-3.5 bg-white/70 text-charcoal font-sans font-medium text-sm rounded-full border border-blush-light/50 hover:bg-white active:scale-[0.97] transition-all duration-150"
              >
                Shop Systems
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex items-center gap-3 pt-1"
            >
              <div className="flex -space-x-1.5">
                {['#F2A7B3', '#C7D1C2', '#8B7A6B', '#FFD7D1', '#F2A7B3'].map((color, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-cream"
                    style={{ backgroundColor: color, opacity: 0.85 + i * 0.03 }}
                  />
                ))}
              </div>
              <p className="font-sans text-[11px] text-taupe">
                <span className="font-semibold text-charcoal">12k+ Lazy Girls</span> Already Running on Autopilot
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT: Video / visual card — video second on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[400px] animate-float-slow">
              {/* Main video card */}
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-gradient-to-br from-blush-light via-blush/25 to-sage/20 shadow-[0_30px_80px_rgba(0,0,0,0.1),0_0_0_1px_rgba(242,167,179,0.15)]">
                {/* VIDEO: /public/images/hero-reel.mp4 */}
                {/* GENERATION PROMPT: "Cinematic looping lifestyle reel, young woman smiling and working on a laptop in a golden hour cozy bedroom, warm cream and blush pink tones, soft bokeh, aspirational yet relatable, slow motion, 4K quality" */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/images/hero-poster.jpg"
                >
                  <source src="/images/hero-reel.mp4" type="video/mp4" />
                </video>

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFD7D1]/50 via-transparent to-transparent" />

                {/* Lottie sparkle overlay — plays over placeholder and video */}
                <div className="absolute inset-0 pointer-events-none">
                  <LottiePlayer
                    src={sparkleData}
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                {/* Bottom status pill */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/40">
                    <p className="font-sans text-[10px] text-taupe uppercase tracking-wider mb-0.5">ai is currently handling</p>
                    <p className="font-serif text-sm text-charcoal italic">literally everything ✦</p>
                  </div>
                </div>
              </div>

              {/* Floating card 1 — top left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -top-5 -left-5 bg-white rounded-2xl px-4 py-3 shadow-card border border-blush-light/30"
              >
                <p className="font-sans text-[10px] text-taupe uppercase tracking-wider">this week</p>
                <p className="font-sans text-sm font-semibold text-charcoal">planned in 10 min ✓</p>
              </motion.div>

              {/* Floating card 2 — bottom right */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                className="absolute -bottom-4 -right-5 bg-blush rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(242,167,179,0.35)]"
              >
                <p className="font-sans text-[10px] text-white/70 uppercase tracking-wider">time saved</p>
                <p className="font-sans text-sm font-semibold text-white">3 hrs saved this week ✦</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-blush/50 to-transparent"
        />
        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-taupe/50">scroll</span>
      </motion.div>
    </section>
  )
}
