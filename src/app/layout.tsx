import type { Metadata } from 'next'
import { Unbounded, Inter } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-unbounded',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Letus Brandworks — Boutique Brand Design Agency',
  description:
    'Premium branding for businesses ready to define their category, disrupt the market, and build something that lasts.',
  openGraph: {
    title: 'Letus Brandworks',
    description: 'Premium branding for businesses ready to define their category.',
    siteName: 'Letus Brandworks',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#faf9f6] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  )
}
