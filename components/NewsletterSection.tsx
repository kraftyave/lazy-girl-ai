'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, chaosArea: 'newsletter' }),
    })
    setSubmitted(true)
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-[#FFF0E8] via-cream to-blush-light/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-blush/8 blur-3xl" />
      </div>

      <div className="max-w-xl mx-auto text-center relative">
        <FadeIn>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
            from Elaine · free · every week ✦
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-3 mb-2 leading-tight">
            the lazy girl newsletter
            <br />
            <span className="font-script text-blush">straight to your inbox ♡</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="font-sans text-taupe text-sm leading-relaxed max-w-sm mx-auto mb-8">
            every week I send one AI tool you can actually use, the news filtered down to what matters,
            and my honest take on what&apos;s worth your time. no spam. just the good stuff.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl px-8 py-6 border border-blush-light/30"
            >
              <p className="font-serif text-xl text-charcoal mb-1">you&apos;re in ♡</p>
              <p className="font-sans text-sm text-taupe">you&apos;ll hear from me this week. check your inbox.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your email address"
                required
                className="flex-1 px-5 py-3.5 bg-white/70 backdrop-blur-sm rounded-full border border-blush-light/40 font-sans text-sm text-charcoal placeholder:text-taupe/50 focus:outline-none focus:border-blush/50 transition-colors duration-150"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_20px_rgba(242,167,179,0.4)] whitespace-nowrap"
              >
                get the freebies ✦
              </button>
            </form>
          )}
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="font-sans text-[11px] text-taupe/50 mt-5">
            unsubscribe anytime. we're lazy too, we won't spam you.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
