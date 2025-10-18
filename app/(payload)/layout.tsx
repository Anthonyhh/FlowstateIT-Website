import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FlowState IT',
  description: 'Content Management System',
}

export default function PayloadRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
