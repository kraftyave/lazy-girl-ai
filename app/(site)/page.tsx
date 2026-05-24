import Hero from '@/components/Hero'
import MoodSelector from '@/components/MoodSelector'
import ScenarioFeed from '@/components/ScenarioFeed'
import NewsletterSection from '@/components/NewsletterSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MoodSelector />
      <ScenarioFeed />
      <NewsletterSection />
      <CTASection />
      <Footer />
    </main>
  )
}
