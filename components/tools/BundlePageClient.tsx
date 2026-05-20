'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ToolCard from './ToolCard'
import { getBundleBySlug } from '@/lib/tools-data'

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function BundlePageClient({ bundleSlug }: { bundleSlug: string }) {
  const bundle = getBundleBySlug(bundleSlug)
  if (!bundle) return null

  const activeTools = bundle.freeTools.filter((t) => !t.comingSoon)
  const comingSoon = bundle.freeTools.filter((t) => t.comingSoon)

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className={`pt-32 pb-14 px-6 bg-gradient-to-br ${bundle.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-blush/5 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <FadeUp>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 font-sans text-xs text-taupe hover:text-charcoal transition-colors duration-150 mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" strokeWidth={1.5} />
              all tools
            </Link>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl leading-none">{bundle.emoji}</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium">
                free tools
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.05] mb-3">
              {bundle.name}
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-sans text-taupe text-sm leading-relaxed max-w-lg">
              {bundle.desc}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Free tools */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium mb-6">
              free tools — use them now
            </p>
          </FadeUp>
          <div className="flex flex-col gap-3">
            {activeTools.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
            {comingSoon.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + (activeTools.length + i) * 0.07, ease: [0.23, 1, 0.32, 1] }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Paid products */}
      {bundle.paidProducts.length > 0 && (
        <section className="py-12 px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <FadeUp>
              <div className="bg-gradient-to-br from-blush-light/30 to-cream rounded-4xl p-7 md:p-10 border border-blush-light/30">
                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-1">
                  want it done for you?
                </p>
                <h2 className="font-serif text-2xl text-charcoal mb-2 leading-snug">
                  the full system for {bundle.name.replace('The ', '').toLowerCase()}s
                </h2>
                <p className="font-sans text-taupe text-sm leading-relaxed mb-7 max-w-md">
                  the tools help you use AI better. the systems below make AI do it for you — automatically.
                </p>
                <div className="flex flex-col gap-3">
                  {bundle.paidProducts.map((product) => (
                    <Link
                      key={product.href + product.name}
                      href={product.href}
                      className="flex items-center justify-between px-5 py-4 bg-white/70 rounded-2xl border border-blush-light/30 hover:border-blush/25 hover:bg-white active:scale-[0.98] transition-all duration-200 group"
                    >
                      <div>
                        <p className="font-sans text-sm font-medium text-charcoal">{product.name}</p>
                        {product.tag && (
                          <p className="font-sans text-[10px] text-blush">{product.tag}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg text-charcoal">${product.price}</span>
                        <span className="font-sans text-xs text-blush group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <section className="pb-16 px-6 text-center">
        <Link
          href="/tools"
          className="font-sans text-xs text-taupe hover:text-charcoal transition-colors duration-150"
        >
          ← explore all tool bundles
        </Link>
      </section>
    </main>
  )
}
