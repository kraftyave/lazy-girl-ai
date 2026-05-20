'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, TrendingUp, MessageCircle, LayoutGrid, LucideProps } from 'lucide-react'
import { moodCards, type MoodCard } from '@/lib/data'

const moodIcons: Record<string, React.ComponentType<LucideProps>> = {
  'layers': Layers,
  'trending-up': TrendingUp,
  'message-circle': MessageCircle,
  'layout-grid': LayoutGrid,
}

function MoodIcon({ name, className }: { name: string; className?: string }) {
  const Icon = moodIcons[name]
  if (!Icon) return null
  return <Icon className={className} strokeWidth={1.5} />
}

function MoodModal({ mood, onClose }: { mood: MoodCard; onClose: () => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm" />

        {/* Modal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 bg-cream rounded-4xl p-7 max-w-lg w-full shadow-[0_24px_80px_rgba(0,0,0,0.15)] max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="mb-2 text-blush">
                <MoodIcon name={mood.emoji} className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal leading-tight">
                prompts for when
                <br />
                <span className="text-blush italic">{mood.title}</span>
              </h3>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-blush-light/40 flex items-center justify-center hover:bg-blush-light transition-colors duration-150 active:scale-[0.95] ml-4 mt-1"
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="#8B7A6B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Prompts */}
          <div className="flex flex-col gap-4">
            {mood.modalPrompts.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 rounded-3xl p-5 border border-blush-light/30"
              >
                <h4 className="font-sans font-semibold text-sm text-charcoal mb-2">{p.title}</h4>
                <p className="font-mono text-[11px] text-taupe leading-relaxed line-clamp-3">
                  {p.prompt}
                </p>
                <button
                  onClick={() => handleCopy(p.prompt, p.title)}
                  className={`mt-3 w-full py-2.5 rounded-full text-sm font-medium font-sans transition-all duration-150 active:scale-[0.97] ${
                    copiedId === p.title
                      ? 'bg-sage/30 text-taupe'
                      : 'bg-blush/12 text-blush hover:bg-blush hover:text-white'
                  }`}
                >
                  {copiedId === p.title ? 'copied ✦' : 'copy prompt'}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="mt-5 text-center font-sans text-xs text-taupe/60">
            paste into ChatGPT, Claude, or any AI ✦
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function MoodCard({ mood, onClick, index }: { mood: MoodCard; onClick: () => void; index: number }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="relative rounded-4xl overflow-hidden aspect-square text-left group cursor-pointer"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient}`} />

      {/* IMAGE: /public/images/{mood.imageSrc} */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mood.imageSrc}
        alt={mood.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="mb-2 text-white drop-shadow-sm">
          <MoodIcon name={mood.emoji} className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-xl text-white drop-shadow-sm leading-tight">
          {mood.title}
        </h3>
        <p className="font-sans text-xs text-white/75 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          tap for prompts →
        </p>
      </div>

      {/* Corner badge */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100">
        <span className="text-white text-xs">✦</span>
      </div>
    </motion.button>
  )
}

export default function MoodSelector() {
  const [activeMood, setActiveMood] = useState<MoodCard | null>(null)

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
            pick your mood
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-3 leading-tight">
            what do you need
            <br />
            <span className="font-script text-blush">right now?</span>
          </h2>
          <p className="font-sans text-taupe text-sm mt-4 max-w-sm mx-auto leading-relaxed">
            tap a card and get ai prompts made for exactly how you're feeling
          </p>
        </motion.div>

        {/* Mood grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {moodCards.map((mood, i) => (
            <MoodCard key={mood.id} mood={mood} index={i} onClick={() => setActiveMood(mood)} />
          ))}
        </div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 font-script text-xl text-blush/70"
        >
          choose a vibe, get a prompt ♡
        </motion.p>
      </div>

      {/* Modal */}
      {activeMood && (
        <MoodModal mood={activeMood} onClose={() => setActiveMood(null)} />
      )}
    </section>
  )
}
