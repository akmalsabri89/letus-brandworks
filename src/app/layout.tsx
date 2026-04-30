import type { Metadata } from 'next'
import { Unbounded, Inter } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
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
      <body className="antialiased bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  )
}
