import type { Metadata } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Body font - Inter
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Heading font - Outfit (geometric, similar to Satoshi)
// TODO: Replace with Satoshi Variable when purchased: https://www.fontshare.com/fonts/satoshi
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// Monospace font - JetBrains Mono (similar to Geist Mono)
// TODO: Add Geist Mono from https://vercel.com/font if desired
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FlowState IT | Enterprise AI Solutions & Prompt Engineering',
  description: 'Automate your business operations with custom AI solutions. Get your AI Readiness Audit in 24 hours. Expert prompt engineering for enterprise scale.',
  keywords: ['AI automation', 'prompt engineering', 'enterprise AI', 'business automation', 'AI consulting', 'fractional CAIO'],
  openGraph: {
    title: 'FlowState IT | Enterprise AI Solutions',
    description: 'Transform your workflows with custom AI automation',
    type: 'website',
    locale: 'en_GB',
    url: 'https://flowstateit.co.uk',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
