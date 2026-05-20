import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import BundlePageClient from '@/components/tools/BundlePageClient'
import { bundles, getBundleBySlug } from '@/lib/tools-data'

export async function generateStaticParams() {
  return bundles.map((b) => ({ bundle: b.slug }))
}

export function generateMetadata({ params }: { params: { bundle: string } }) {
  const bundle = getBundleBySlug(params.bundle)
  if (!bundle) return {}
  return {
    title: `${bundle.name} — Free AI Tools — Lazy Girl AI`,
    description: bundle.desc,
  }
}

export default function BundlePage({ params }: { params: { bundle: string } }) {
  const bundle = getBundleBySlug(params.bundle)
  if (!bundle) notFound()

  return (
    <>
      <BundlePageClient bundleSlug={bundle.slug} />
      <Footer />
    </>
  )
}
