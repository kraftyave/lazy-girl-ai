import Link from 'next/link'

export default function Footer() {
  const links = [
    { href: '/tools', label: 'free tools' },
    { href: '/shop', label: 'shop' },
    { href: '/blog', label: 'blog' },
    { href: '/lazy-girl-os', label: 'LazyGirlOS' },
    { href: '/about', label: 'about' },
  ]

  return (
    <footer className="bg-charcoal py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1.5">
            <span className="font-script text-2xl text-white/90 group-hover:text-blush-light transition-colors duration-200">
              lazy girl ai
            </span>
            <span className="text-blush text-base">♡</span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Tagline */}
          <p className="font-script text-xl text-blush/60">
            less overthinking. more automating. ♡
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[11px] text-white/20">
            © 2025 lazy girl's guide to ai. all rights reserved.
          </p>
          <p className="font-sans text-[11px] text-white/20">
            made for the girls doing it all ✦
          </p>
        </div>
      </div>
    </footer>
  )
}
