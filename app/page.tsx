import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getPayload } from 'payload'
import config from '@payload-config'

// Force dynamic rendering since we need database access
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let heroData = null
  let siteSettings = null

  try {
    const payload = await getPayload({ config })

    // Fetch hero section data
    heroData = await payload.findGlobal({
      slug: 'hero-section',
    })

    // Fetch site settings
    siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })
  } catch (error) {
    console.error('Failed to fetch CMS data:', error)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="container-custom section-padding min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {heroData?.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <span className="text-cyan-accent">✨</span>
              <span className="text-sm font-medium">{heroData.badge.text}</span>
            </div>
          )}

          {/* Headline */}
          <h1 className="text-fluid-5xl md:text-fluid-7xl font-heading font-bold text-gradient-full mb-6 animate-fade-up leading-tight">
            {heroData?.headline || 'Welcome to FlowState IT'}
          </h1>

          {/* Subheadline */}
          <p className="text-fluid-lg md:text-fluid-xl text-foreground/80 mb-12 max-w-3xl mx-auto animate-fade-up animation-delay-200">
            {heroData?.subheadline || 'AI Website Factory - A self-deploying, keyword-adaptive website platform that merges enterprise-grade headless architecture with cinematic design'}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up animation-delay-400">
            {heroData?.primaryCta && (
              <Button asChild variant="gradient" size="xl" className="min-w-[200px]">
                <Link href={heroData.primaryCta.target || '#'}>
                  {heroData.primaryCta.text}
                </Link>
              </Button>
            )}

            {heroData?.secondaryCta && (
              <Button asChild variant="outline" size="xl" className="min-w-[200px]">
                <Link href={heroData.secondaryCta.target || '#'}>
                  {heroData.secondaryCta.text}
                </Link>
              </Button>
            )}

            {!heroData && (
              <>
                <Button asChild variant="gradient" size="xl">
                  <Link href="/admin">Configure CMS</Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link href="/admin">Admin Panel</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CMS Status Section */}
      <section className="container-custom py-16 border-t border-border/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-fluid-2xl font-heading font-semibold mb-4 text-gradient-violet">
            Payload CMS Ready
          </h2>
          <p className="text-foreground/70 mb-6">
            This website is powered by Payload CMS v3. Configure your content through the admin panel.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Button asChild variant="glass" size="lg" className="w-full">
              <Link href="/admin">
                <span className="mr-2">⚙️</span>
                Admin Panel
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="w-full">
              <Link href="/api/health">
                <span className="mr-2">💚</span>
                Health Check
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container-custom py-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>
          {siteSettings?.siteName || 'FlowState IT'} &copy; {new Date().getFullYear()}
        </p>
        {siteSettings?.contactEmail && (
          <p className="mt-2">
            <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-primary transition-colors">
              {siteSettings.contactEmail}
            </a>
          </p>
        )}
      </footer>
    </main>
  )
}
