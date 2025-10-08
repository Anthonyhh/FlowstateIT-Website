import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeatureGrid from '@/components/FeatureGrid'
import CaseStudyCarousel from '@/components/CaseStudyCarousel'
import AIBackground from '@/components/AIBackground'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      {/* Animated particle background */}
      <AIBackground />

      {/* Navigation */}
      <Header />

      {/* Main content */}
      <main>
        {/* Hero section with gradient and CTA */}
        <HeroSection id="hero" />

        {/* Features section */}
        <section id="features" className="scroll-mt-20">
          <FeatureGrid />
        </section>

        {/* Case studies / testimonials */}
        <section id="cases" className="scroll-mt-20">
          <CaseStudyCarousel />
        </section>

        {/* Contact form */}
        <ContactCTA id="contact" />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
