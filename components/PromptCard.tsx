'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LottieRefCurrentProps } from 'lottie-react'
import LottiePlayer from './LottiePlayer'
import burstData from '@/public/animations/copy-burst.json'

interface PromptCardProps {
  title: string
  description: string
  prompt: string
  category: string
}

export default function PromptCard({ title, description, prompt, category }: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    // Trigger burst animation
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0, true)
    }
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
      className="bg-[#FFF8F4] rounded-3xl p-6 flex flex-col gap-4 border border-blush-light/25 hover:border-blush-light/60 hover:shadow-soft transition-all duration-200 group"
    >
      {/* Category */}
      <span className="inline-block text-[10px] font-medium text-blush bg-blush/10 rounded-full px-3 py-1 w-fit font-sans uppercase tracking-widest">
        {category}
      </span>

      {/* Title */}
      <h3 className="font-serif text-lg text-charcoal leading-snug">{title}</h3>

      {/* Description */}
      <p className="font-sans text-[13px] text-taupe leading-relaxed -mt-1">{description}</p>

      {/* Prompt preview */}
      <div
        className="bg-white/70 border border-blush-light/20 rounded-2xl p-4 cursor-pointer hover:border-blush-light/50 transition-colors duration-150"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <p
          className={`font-mono text-[11px] text-taupe/80 leading-[1.7] ${
            !expanded ? 'line-clamp-3' : ''
          }`}
        >
          {prompt}
        </p>
        <button className="mt-2.5 flex items-center gap-1 text-[11px] font-sans font-medium text-blush/80 hover:text-blush transition-colors duration-150">
          <span>{expanded ? 'show less ↑' : 'read full prompt →'}</span>
        </button>
      </div>

      {/* Copy button with Lottie burst */}
      <div className="relative mt-auto">
        {/* Burst animation — centered over button, pointer-events-none */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <LottiePlayer
            src={burstData}
            lottieRef={lottieRef}
            loop={false}
            autoplay={false}
            style={{ width: 100, height: 100 }}
          />
        </div>

        <button
          onClick={handleCopy}
          className={`relative w-full py-3 rounded-full text-sm font-medium font-sans transition-all duration-150 active:scale-[0.97] ${
            copied
              ? 'bg-sage/25 text-taupe cursor-default'
              : 'bg-blush/10 text-blush hover:bg-blush hover:text-white'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(2px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.85, filter: 'blur(2px)' }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                copied ✦
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(2px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.85, filter: 'blur(2px)' }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                copy prompt
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}
