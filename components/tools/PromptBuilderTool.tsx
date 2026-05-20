'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PromptTool } from '@/lib/tools-data'

export default function PromptBuilderTool({ tool }: { tool: PromptTool }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const steps = tool.steps
  const currentStep = steps[step]
  const isLast = step === steps.length - 1
  const currentAnswer = answers[currentStep?.id ?? ''] ?? ''

  function handleNext() {
    if (!currentAnswer.trim()) return
    if (isLast) {
      setResult(tool.buildPrompt(answers))
    } else {
      setStep((s) => s + 1)
    }
  }

  function handleReset() {
    setStep(0)
    setAnswers({})
    setResult(null)
    setCopied(false)
  }

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col gap-4"
      >
        <div className="bg-white/70 rounded-3xl p-5 border border-blush-light/30">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-blush font-medium mb-3">
            your prompt ✦
          </p>
          <pre className="font-sans text-xs text-charcoal leading-relaxed whitespace-pre-wrap">
            {result}
          </pre>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 bg-blush text-white font-sans font-medium text-xs rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_16px_rgba(242,167,179,0.35)]"
          >
            {copied ? 'copied ✓' : 'copy prompt ✦'}
          </button>
          <a
            href="https://chat.openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white/60 text-charcoal font-sans font-medium text-xs rounded-full border border-blush-light/40 hover:bg-white active:scale-[0.97] transition-all duration-150"
          >
            open chatgpt →
          </a>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 text-taupe font-sans text-xs rounded-full hover:text-charcoal transition-colors duration-150"
          >
            start over
          </button>
        </div>
        <p className="font-sans text-[10px] text-taupe/60">
          copy → paste into ChatGPT → hit enter ♡
        </p>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Progress */}
      <div className="flex gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
              i <= step ? 'bg-blush' : 'bg-blush-light/40'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-3"
        >
          <label className="font-sans text-sm text-charcoal font-medium leading-snug">
            {currentStep.label}
          </label>

          {currentStep.hint && (
            <p className="font-sans text-[11px] text-taupe/70">{currentStep.hint}</p>
          )}

          {currentStep.type === 'select' ? (
            <select
              value={currentAnswer}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [currentStep.id]: e.target.value }))
              }
              className="w-full px-4 py-3 text-sm font-sans text-charcoal bg-white/80 border border-blush-light/40 rounded-2xl focus:outline-none focus:border-blush/50 transition-colors duration-150 appearance-none"
            >
              <option value="">select one…</option>
              {currentStep.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : currentStep.type === 'textarea' ? (
            <textarea
              rows={4}
              value={currentAnswer}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [currentStep.id]: e.target.value }))
              }
              placeholder={currentStep.placeholder}
              className="w-full px-4 py-3 text-sm font-sans text-charcoal bg-white/80 border border-blush-light/40 rounded-2xl focus:outline-none focus:border-blush/50 placeholder:text-taupe/40 resize-none transition-colors duration-150"
            />
          ) : (
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [currentStep.id]: e.target.value }))
              }
              placeholder={currentStep.placeholder}
              onKeyDown={(e) => { if (e.key === 'Enter') handleNext() }}
              className="w-full px-4 py-3 text-sm font-sans text-charcoal bg-white/80 border border-blush-light/40 rounded-2xl focus:outline-none focus:border-blush/50 placeholder:text-taupe/40 transition-colors duration-150"
            />
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
              className="px-6 py-2.5 bg-blush text-white font-sans font-medium text-xs rounded-full hover:bg-[#e8899a] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all duration-150 shadow-[0_4px_16px_rgba(242,167,179,0.3)]"
            >
              {isLast ? 'build my prompt ✦' : 'next →'}
            </button>
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="font-sans text-xs text-taupe hover:text-charcoal transition-colors duration-150"
              >
                ← back
              </button>
            )}
            <span className="font-sans text-[10px] text-taupe/50 ml-auto">
              {step + 1} / {steps.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
