'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PromptCard from '@/components/PromptCard'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { prompts, categories } from '@/lib/data'

export default function PromptsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? prompts
      : prompts.filter((p) => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-blush-light/30 to-cream relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blush/8 blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative">
          <FadeIn>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
              start here ✦ free prompt library
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mt-3 mb-4 leading-tight">
              copy. paste.
              <br />
              <span className="font-script text-blush">done. ♡</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans text-taupe text-sm leading-relaxed max-w-sm mx-auto">
              never used AI before? these are your first step. copy a prompt, paste it into ChatGPT or Claude, and see what it actually does for you. no setup. no learning curve. just go.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-sans text-[11px] text-taupe/60 mt-3 max-w-xs mx-auto leading-relaxed">
              when you&apos;re ready for the full system — we built it for you. it&apos;s in the shop. ✦
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-6 pb-8 sticky top-16 z-40 bg-cream/90 backdrop-blur-md border-b border-blush-light/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center py-4">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.1 }}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium font-sans transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blush text-white shadow-[0_4px_16px_rgba(242,167,179,0.35)]'
                    : 'bg-white/60 text-taupe border border-blush-light/30 hover:border-blush-light hover:text-charcoal'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt grid */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((prompt, i) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
            >
              <PromptCard
                title={prompt.title}
                description={prompt.description}
                prompt={prompt.prompt}
                category={prompt.category}
              />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-script text-3xl text-blush/50 mb-2">nothing here yet ♡</p>
            <p className="font-sans text-sm text-taupe">more prompts coming soon</p>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 text-center bg-gradient-to-t from-blush-light/20 to-cream">
        <FadeIn>
          <p className="font-sans text-sm text-taupe mb-2">want more prompts for a specific situation?</p>
          <p className="font-script text-2xl text-blush">we're adding new ones every week ♡</p>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
