import { Playfair_Display, Poppins, Dancing_Script } from 'next/font/google'
import '../globals.css'
import Navigation from '@/components/Navigation'
import DodoInit from '@/components/DodoInit'
import { Analytics } from '@vercel/analytics/next'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} ${dancing.variable} font-sans antialiased`}>
        <Navigation />
        {children}
        <DodoInit />
        <Analytics />
      </body>
    </html>
  )
}
