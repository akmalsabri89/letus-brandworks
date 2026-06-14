import type { Metadata } from 'next'
import { Unbounded, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { StructuredData } from '@/components/StructuredData'
import { MetaPixel } from '@/components/MetaPixel'
import './globals.css'

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-unbounded',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Letus Brandworks · Erupt with Clarity', template: '%s · Letus Brandworks' },
  description:
    'Letus is a Boutique Brand Design Studio. We work with founders and businesses ready to lead their category. Originating in Kedah, Malaysia. Available worldwide.',
  metadataBase: new URL('https://letusbrandworks.com'),
  openGraph: {
    title: 'Letus Brandworks',
    description: 'Boutique Brand Design Studio. Erupt with clarity.',
    siteName: 'Letus Brandworks',
    locale: 'en_MY',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${unbounded.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <StructuredData />
        <MetaPixel />
        {children}
      </body>
    </html>
  )
}
