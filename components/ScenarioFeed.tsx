'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { scenarios } from '@/lib/data'
import FadeIn from './FadeIn'

function ScenarioCard({ scenario, index }: { scenario: typeof scenarios[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
      className="flex-shrink-0 w-[260px] md:w-[280px] group cursor-default"
    >
      {/* Image area */}
      <div className="relative rounded-3xl overflow-hidden aspect-[3/4] mb-4 shadow-card">
        <div className={`absolute inset-0 bg-gradient-to-br ${scenario.gradient}`} />

        {/* IMAGE: /public/images/{scenario.imageSrc} */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={scenario.imageSrc}
          alt={scenario.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />

        {/* Bottom tag */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/60 backdrop-blur-sm text-charcoal font-sans text-[10px] font-medium px-2.5 py-1 rounded-full">
            real girl story ✦
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="px-1">
        <h3 className="font-serif text-[17px] text-charcoal leading-snug mb-1.5">
          {scenario.title}
        </h3>
        <p className="font-sans text-xs text-taupe leading-relaxed">{scenario.caption}</p>
      </div>
    </motion.div>
  )
}

export default function ScenarioFeed() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-gradient-to-b from-cream to-[#FFF0E8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="px-6 flex items-end justify-between mb-10">
          <FadeIn>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium block mb-3">
              real stories
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
              real ways lazy girls
              <br />
              <span className="font-script text-blush">use ai</span>
            </h2>
          </FadeIn>

          {/* Scroll arrows — desktop only */}
          <FadeIn direction="right" className="hidden md:flex items-center gap-2 pb-1">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-blush-light bg-white flex items-center justify-center hover:bg-blush hover:border-blush hover:text-white text-taupe transition-all duration-200 active:scale-[0.95]"
              aria-label="Scroll left"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M8.5 3L4.5 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-blush-light bg-white flex items-center justify-center hover:bg-blush hover:border-blush hover:text-white text-taupe transition-all duration-200 active:scale-[0.95]"
              aria-label="Scroll right"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 3L9.5 7l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </FadeIn>
        </div>

        {/* Horizontal scroll feed */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-hide scroll-smooth px-6 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {scenarios.map((scenario, i) => (
            <div key={scenario.id} style={{ scrollSnapAlign: 'start' }}>
              <ScenarioCard scenario={scenario} index={i} />
            </div>
          ))}

          {/* Fade-out end cap */}
          <div className="flex-shrink-0 w-4" />
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-1.5 mt-6 px-6">
          {scenarios.map((s, i) => (
            <div
              key={s.id}
              className={`h-1 rounded-full bg-blush transition-all duration-200 ${i === 0 ? 'w-6' : 'w-1.5 opacity-30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
