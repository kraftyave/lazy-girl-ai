'use client'
import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  productId: string
  label?: string
}

type Phase = 'idle' | 'collecting' | 'loading' | 'error'

export default function BuyButton({ productId, label = 'get this ✦' }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleOpen() {
    setPhase('collecting')
    setTimeout(() => inputRef.current?.focus(), 120)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setPhase('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, email }),
      })

      const data = await res.json()

      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? 'Something went wrong')
      }

      if (window.DodoPaymentsCheckout) {
        window.DodoPaymentsCheckout.DodoPayments.Checkout.open({
          checkoutUrl: data.checkoutUrl,
        })
        setPhase('idle')
        setEmail('')
      } else {
        window.open(data.checkoutUrl, '_blank')
        setPhase('idle')
        setEmail('')
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not open checkout')
      setPhase('error')
    }
  }

  function handleCancel() {
    setPhase('idle')
    setEmail('')
    setErrorMsg('')
  }

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.button
            key="open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleOpen}
            className="px-5 py-2.5 bg-blush text-white font-sans font-medium text-xs rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_16px_rgba(242,167,179,0.35)]"
          >
            {label}
          </motion.button>
        )}

        {(phase === 'collecting' || phase === 'error') && (
          <motion.form
            key="collect"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email"
              required
              className="w-full px-4 py-2.5 text-xs font-sans text-charcoal bg-white/80 border border-blush-light/50 rounded-full focus:outline-none focus:border-blush/60 placeholder:text-taupe/50 transition-colors duration-150"
            />
            {phase === 'error' && (
              <p className="font-sans text-[10px] text-red-400 px-1">{errorMsg}</p>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-blush text-white font-sans font-medium text-xs rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_16px_rgba(242,167,179,0.35)]"
              >
                continue ✦
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2.5 bg-white/60 text-taupe font-sans font-medium text-xs rounded-full border border-blush-light/30 hover:bg-white active:scale-[0.97] transition-all duration-150"
              >
                cancel
              </button>
            </div>
          </motion.form>
        )}

        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-5 py-2.5"
          >
            <div className="w-3.5 h-3.5 rounded-full border-2 border-blush/30 border-t-blush animate-spin" />
            <span className="font-sans text-xs text-taupe">opening checkout…</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
