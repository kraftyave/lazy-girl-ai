import type { Metadata } from 'next'
import { Playfair_Display, Poppins, Dancing_Script } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import DodoInit from '@/components/DodoInit'

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

export const metadata: Metadata = {
  title: "Lazy Girl's Guide to AI",
  description:
    'AI made simple. Life made easier. For girls who are tired of doing everything the hard way.',
  keywords: ['AI', 'productivity', 'lazy girl', 'prompts', 'life hacks', 'AI shortcuts'],
  openGraph: {
    title: "Lazy Girl's Guide to AI",
    description: 'AI made simple. Life made easier.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} ${dancing.variable} font-sans antialiased`}
      >
        <Navigation />
        {children}
        <DodoInit />
      </body>
    </html>
  )
}
