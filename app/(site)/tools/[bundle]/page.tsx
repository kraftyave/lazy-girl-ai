import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import BundlePageClient from '@/components/tools/BundlePageClient'
import { bundles, getBundleBySlug } from '@/lib/tools-data'

export async function generateStaticParams() {
  return bundles.map((b) => ({ bundle: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ bundle: string }> }) {
  const { bundle: bundleSlug } = await params
  const bundle = getBundleBySlug(bundleSlug)
  if (!bundle) return {}
  return {
    title: `${bundle.name} — Free AI Tools — Lazy Girl AI`,
    description: bundle.desc,
  }
}

export default async function BundlePage({ params }: { params: Promise<{ bundle: string }> }) {
  const { bundle: bundleSlug } = await params
  const bundle = getBundleBySlug(bundleSlug)
  if (!bundle) notFound()

  return (
    <>
      <BundlePageClient bundleSlug={bundle.slug} />
      <Footer />
    </>
  )
}
