import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: "you're in ✦ — Lazy Girl AI",
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-cream flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="max-w-md w-full text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-4">
            order confirmed ✦
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4 leading-[1.05]">
            you&apos;re all set.
          </h1>
          <p className="font-script text-2xl text-blush mb-8">
            lazy girl era officially unlocked ♡
          </p>
          <p className="font-sans text-taupe text-sm leading-relaxed mb-10 max-w-xs mx-auto">
            check your inbox — your system is on its way. if you don&apos;t see it in a few minutes, check spam.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_16px_rgba(242,167,179,0.35)]"
            >
              shop more systems ✦
            </Link>
            <Link
              href="/prompts"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white/60 text-charcoal font-sans font-medium text-sm rounded-full border border-blush-light/40 hover:bg-white active:scale-[0.97] transition-all duration-150"
            >
              explore free prompts
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
