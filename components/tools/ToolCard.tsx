'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BundleTool } from '@/lib/tools-data'
import PromptBuilderTool from './PromptBuilderTool'
import ChecklistToolComponent from './ChecklistTool'
import TimeSavedCalculator from './TimeSavedCalculator'

export default function ToolCard({ tool }: { tool: BundleTool }) {
  const [open, setOpen] = useState(false)

  const isComingSoon = tool.comingSoon === true

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
        open
          ? 'bg-white/80 border-blush/20 shadow-[0_4px_32px_rgba(242,167,179,0.12)]'
          : 'bg-white/50 border-blush-light/30 hover:border-blush-light/60'
      }`}
    >
      <button
        onClick={() => !isComingSoon && setOpen((o) => !o)}
        className={`w-full flex items-start justify-between gap-4 p-5 text-left ${
          isComingSoon ? 'cursor-default opacity-60' : 'cursor-pointer'
        }`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-sans text-sm font-medium text-charcoal">{tool.name}</h3>
            {isComingSoon && (
              <span className="font-sans text-[9px] uppercase tracking-wider text-taupe/60 bg-blush-light/30 px-2 py-0.5 rounded-full flex-shrink-0">
                soon
              </span>
            )}
          </div>
          <p className="font-sans text-xs text-taupe">{tool.tagline}</p>
        </div>

        {!isComingSoon && (
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-blush/10 flex items-center justify-center mt-0.5"
          >
            <span className="text-blush text-sm leading-none">+</span>
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {open && !isComingSoon && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-blush-light/20 pt-4">
              {tool.type === 'prompt-builder' && (
                <PromptBuilderTool tool={tool} />
              )}
              {tool.type === 'checklist' && (
                <ChecklistToolComponent tool={tool} />
              )}
              {tool.type === 'calculator' && (
                <TimeSavedCalculator tool={tool} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
