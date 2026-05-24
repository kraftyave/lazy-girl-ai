'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function JoinPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, chaosArea: 'newsletter' }),
      })
      const data = await res.json()
      if (res.ok) {
        setState('success')
      } else {
        setState('error')
        setErrorMsg(data.error ?? 'something went wrong')
      }
    } catch {
      setState('error')
      setErrorMsg('something went wrong. try again.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream via-[#FFF0E8] to-blush-light/30 flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-blush/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-sage/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <Link href="/" className="font-script text-2xl text-charcoal hover:text-blush transition-colors duration-200">
            lazy girl ai ♡
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          {state === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="text-center py-10"
            >
              <p className="font-script text-4xl text-blush mb-3">you&apos;re in ♡</p>
              <p className="font-sans text-sm text-taupe mb-1">you&apos;ll hear from me soon — check your inbox.</p>
              <p className="font-sans text-xs text-taupe/60 mb-8">first issue from Elaine lands this week.</p>
              <Link
                href="/tools"
                className="inline-flex items-center px-6 py-3 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.4)]"
              >
                try the free tools while you wait ✦
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Eyebrow */}
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium text-center mb-4">
                from Elaine · free · every week ✦
              </p>

              {/* Headline */}
              <h1 className="font-serif text-4xl md:text-5xl text-charcoal text-center leading-[1.05] mb-1">
                AI for Lazy Girls,
              </h1>
              <p className="font-script text-3xl md:text-4xl text-blush text-center mb-6 leading-snug">
                straight to your inbox ♡
              </p>

              {/* Subhead */}
              <p className="font-sans text-taupe text-sm leading-relaxed text-center mb-8">
                every week I send one AI tool you can actually use, the news that matters filtered down to what affects your real life, and my honest take on what&apos;s worth it — and what to skip.
              </p>

              {/* What you get */}
              <div className="flex flex-col gap-2.5 mb-8">
                {[
                  'one ready-to-use AI tool or prompt, picked by me',
                  'AI news filtered to what actually matters for your life',
                  'my honest verdict — what to try, what to ignore',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="text-blush text-xs mt-0.5 flex-shrink-0">✦</span>
                    <p className="font-sans text-sm text-charcoal/80">{item}</p>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="your name (optional)"
                  className="w-full px-4 py-3.5 text-sm font-sans text-charcoal bg-white/80 border border-blush-light/40 rounded-2xl focus:outline-none focus:border-blush/50 placeholder:text-taupe/40 transition-colors duration-150"
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your email address ✦"
                  required
                  className="w-full px-4 py-3.5 text-sm font-sans text-charcoal bg-white/80 border border-blush-light/40 rounded-2xl focus:outline-none focus:border-blush/50 placeholder:text-taupe/40 transition-colors duration-150"
                />
                {state === 'error' && (
                  <p className="font-sans text-xs text-red-400 px-1">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="w-full py-4 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] disabled:opacity-60 active:scale-[0.98] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.4)]"
                >
                  {state === 'loading' ? 'joining…' : 'join for free ✦'}
                </button>
              </form>

              <p className="font-sans text-[10px] text-taupe/50 text-center mt-4">
                no spam. unsubscribe anytime.
              </p>

              {/* Back link */}
              <p className="text-center mt-8">
                <Link href="/" className="font-sans text-xs text-taupe/50 hover:text-taupe transition-colors duration-200">
                  ← back to lazy girl ai
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
