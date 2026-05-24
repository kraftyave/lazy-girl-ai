import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lazygirlai.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lazy Girl's Guide to AI",
  description:
    'AI made simple. Life made easier. For girls who are tired of doing everything the hard way.',
  keywords: ['AI', 'productivity', 'lazy girl', 'prompts', 'life hacks', 'AI shortcuts'],
  openGraph: {
    title: "Lazy Girl's Guide to AI",
    description: 'AI made simple. Life made easier.',
    type: 'website',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lazy Girl's Guide to AI",
    description: 'AI made simple. Life made easier.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
