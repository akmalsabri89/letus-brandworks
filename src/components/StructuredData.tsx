import { SITE_URL } from '@/lib/constants'

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE_URL}#organization`,
  name: 'Letus Brandworks',
  description:
    'Boutique Brand Design Studio. We work with founders and businesses ready to lead their category. Brand strategy, visual identity, and ongoing creative partnership.',
  url: SITE_URL,
  logo: `${SITE_URL}/letus-mark.svg`,
  image: `${SITE_URL}/letus-mark.svg`,
  email: 'hello@letusbrandworks.com',
  telephone: '+60143693225',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Kedah',
    addressCountry: 'MY',
  },
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  knowsAbout: [
    'Brand Strategy',
    'Brand Identity',
    'Visual Identity Design',
    'Logo Design',
    'Web Design',
    'Digital Marketing',
    'Social Media Branding',
    'Graphic Design',
  ],
  founder: {
    '@type': 'Person',
    name: 'Akmal Sabri',
  },
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: 'Letus Brandworks',
  description: 'Erupt with clarity.',
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: 'en-MY',
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />
    </>
  )
}
