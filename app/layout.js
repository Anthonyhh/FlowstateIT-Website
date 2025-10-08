import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'FlowState IT | Enterprise AI Solutions & Prompt Engineering',
  description: 'Automate your business operations with custom AI solutions. Get your AI Readiness Audit in 24 hours. Expert prompt engineering for enterprise scale.',
  keywords: 'AI automation, prompt engineering, enterprise AI, business automation, AI consulting, fractional CAIO',
  openGraph: {
    title: 'FlowState IT | Enterprise AI Solutions',
    description: 'Transform your workflows with custom AI automation',
    type: 'website',
    locale: 'en_GB',
    url: 'https://flowstateit.co.uk',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}