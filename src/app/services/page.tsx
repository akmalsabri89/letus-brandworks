import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { CTA } from '@/components/sections/CTA'
import { ProcessScroll } from '@/components/sections/ProcessScroll'

const brandServices = [
  {
    number: '01',
    name: 'Brand Strategy',
    description:
      'Before the logo, before the colours — we define who you are, who you serve, and why you matter. Strategy is the invisible architecture everything else is built on.',
    deliverables: ['Brand Positioning', 'Naming', 'Brand Voice & Tone'],
  },
  {
    number: '02',
    name: 'Brand Identity',
    description:
      'A visual system that communicates your strategy without saying a word. Every mark, typeface, and colour choice carries intent — built to scale from a business card to a billboard.',
    deliverables: ['Logo System', 'Visual Language', 'Brand Guidelines'],
  },
  {
    number: '03',
    name: 'Web Design & Development',
    description:
      'Your website is your brand in motion. We design and build high-performance sites that convert visitors into clients — clean, fast, and unmistakably you.',
    deliverables: ['UI Design', 'Next.js Development', 'CMS Integration'],
  },
]

const growthServices = [
  {
    number: '04',
    name: 'Digital Marketing',
    description:
      'Visibility without strategy is noise. We run performance campaigns that put your brand in front of the right people at the right moment — and measure everything that matters.',
    deliverables: ['Google Ads', 'Meta Ads', 'SEO'],
  },
  {
    number: '05',
    name: 'Social Media',
    description:
      'Consistent, on-brand presence across the channels your audience actually uses. From content strategy to visual templates — built for your team to execute with ease.',
    deliverables: ['Content Strategy', 'Visual Templates', 'Profile Optimisation'],
  },
  {
    number: '06',
    name: 'Graphic Design',
    description:
      'Print, digital, and everything in between. When you need materials that look as good as your brand deserves — done right, on time.',
    deliverables: ['Print Collateral', 'Packaging', 'Pitch Decks'],
  },
]


interface Service {
  number: string
  name: string
  description: string
  deliverables: string[]
}

function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="group py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 border-b border-[#1a1a1a]/6 transition-colors duration-300 hover:bg-[#faf9f6] -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12">
      {/* Number + Name */}
      <div className="lg:col-span-5 flex items-start gap-6">
        <span className="text-[11px] font-semibold text-[#1a1a1a]/20 mt-1.5 tabular-nums flex-shrink-0 font-[family-name:var(--font-inter)] group-hover:text-[#f05a28] transition-colors duration-300">
          {service.number}
        </span>
        <h2
          className="text-2xl lg:text-3xl font-[500] text-[#1a1a1a] leading-tight tracking-tight"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {service.name}
        </h2>
      </div>
      {/* Description + Deliverables */}
      <div className="lg:col-span-7 lg:border-l lg:border-[#1a1a1a]/6 lg:pl-12">
        <p className="text-[15px] text-[#555] leading-relaxed mb-6 font-[family-name:var(--font-inter)]">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.deliverables.map((item) => (
            <span
              key={item}
              className="text-[11px] font-medium text-[#1a1a1a]/50 border border-[#1a1a1a]/10 px-3 py-1 rounded-full font-[family-name:var(--font-inter)] group-hover:border-[#f05a28]/30 group-hover:text-[#f05a28] transition-colors duration-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-white">

        {/* Hero */}
        <div className="pt-36 pb-20 px-5 sm:px-8 lg:px-12 border-b border-[#1a1a1a]/6">
          <div className="max-w-[1200px] mx-auto">
            <h1
              className="text-4xl lg:text-5xl font-[500] text-[#1a1a1a] leading-tight tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              What We Do
            </h1>
            <p className="text-base text-[#777] max-w-[440px]" style={{ fontFamily: 'var(--font-inter)' }}>
              Your brand shouldn&apos;t apologise for being itself. We build the strategy, identity, and presence to make sure it never has to.
            </p>
          </div>
        </div>

        {/* Services list */}
        <div className="px-5 sm:px-8 lg:px-12">
          <div className="max-w-[1200px] mx-auto">

            {/* Brand group */}
            <div className="pt-10 pb-2 flex items-center gap-3">
              <div className="w-4 h-px bg-[#f05a28]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f05a28] font-[family-name:var(--font-inter)]">
                Brand
              </span>
            </div>
            {brandServices.map((service) => (
              <ServiceRow key={service.number} service={service} />
            ))}

            {/* Growth group */}
            <div className="pt-14 pb-2 flex items-center gap-3">
              <div className="w-4 h-px bg-[#f05a28]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f05a28] font-[family-name:var(--font-inter)]">
                Growth
              </span>
            </div>
            {growthServices.map((service) => (
              <ServiceRow key={service.number} service={service} />
            ))}

          </div>
        </div>

        {/* Process */}
        <ProcessScroll />

        {/* CTA */}
        <CTA />

      </main>
      <Footer />
    </>
  )
}
