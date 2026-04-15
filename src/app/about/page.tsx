'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

const STATS = [
  { value: '15+', label: 'Years in the industry' },
  { value: '30+', label: 'Brand projects' },
  { value: '100+', label: 'Clients served' },
  { value: '1', label: 'Year as Letus' },
]

const VALUES = [
  {
    name: 'Artisanal',
    description:
      'Every brand we touch is treated as a unique craft. No templates, no shortcuts. We obsess over the details most agencies overlook because that is where the real difference lives.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f05a28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>
      </svg>
    ),
  },
  {
    name: 'Bold',
    description:
      'Safe is forgettable. We push ideas until they ignite. Our work is designed to stop people mid-scroll, earn second glances, and start conversations that matter.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f05a28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    name: 'Clarity',
    description:
      'Strategy without clarity is just noise. We cut through the confusion and build brands with a singular, undeniable point of view. One your audience feels from the first touchpoint.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f05a28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
]

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#faf9f6]">

        {/* ── Hero + Story ─────────────────────────────── */}
        <section className="pt-36 pb-20 px-5 sm:px-8 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left — copy */}
              <div>
                <FadeUp>
                  <h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-[500] text-[#1a1a1a] leading-tight tracking-tight mb-6"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    About Us
                  </h1>
                </FadeUp>
                <FadeUp delay={0.08}>
                  <p
                    className="text-base text-[#555] leading-relaxed mb-5"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Letus is derived from the Malay word for eruption. A burst of soul in the constellation of branding. Because the brands that change industries never asked for permission to be noticed.
                  </p>
                </FadeUp>
                <FadeUp delay={0.12}>
                  <p
                    className="text-base text-[#555] leading-relaxed"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    We are a boutique brand strategy and identity studio based in Kedah, Malaysia. Working with founders and business owners who are ready to stop blending in and start owning their category.
                  </p>
                </FadeUp>
              </div>

              {/* Right — photo */}
              <FadeUp delay={0.1}>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto">
                  <Image
                    src="/about/akmal.jpg"
                    alt="Akmal — Founder of Letus Brandworks"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </FadeUp>

            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────── */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-y border-[#1a1a1a]/8">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <FadeUp key={stat.label} delay={i * 0.06}>
                  <div className="text-center lg:text-left">
                    <p
                      className="text-4xl lg:text-5xl font-[500] text-[#1a1a1a] leading-none mb-2"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-sm text-[#999]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── About Me ─────────────────────────────────── */}
        <section className="py-24 px-5 sm:px-8 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <FadeUp>
                <h2
                  className="text-3xl lg:text-4xl font-[500] text-[#1a1a1a] leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  The Person Behind the Brand
                </h2>
              </FadeUp>

              <div className="space-y-4">
                <FadeUp delay={0.06}>
                  <p className="text-base text-[#555] leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                    Akmal is a Brand Strategist and Creative Director with over 15 years across the creative industry. His background spans graphic design, digital arts, production, and performance art, giving him a rare perspective on how brands communicate, move, and leave a lasting impression.
                  </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <p className="text-base text-[#555] leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                    That breadth is what makes Letus different. Where most brand studios think in visuals, Akmal thinks in experiences. Every identity he builds is rooted in strategy, shaped by craft, and designed to perform.
                  </p>
                </FadeUp>
                <FadeUp delay={0.14}>
                  <p className="text-base text-[#555] leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                    Letus collaborates with a curated network of specialists when projects call for it. The vision stays sharp. The quality stays consistent.
                  </p>
                </FadeUp>
              </div>

            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────── */}
        <section className="py-24 px-5 sm:px-8 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto">

            <FadeUp>
              <div className="mb-14">
                <h2
                  className="text-3xl lg:text-4xl font-[500] text-[#1a1a1a] leading-tight tracking-tight mb-4"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  What We Stand For
                </h2>
                <p className="text-base text-[#777] max-w-[440px]" style={{ fontFamily: 'var(--font-inter)' }}>
                  Three principles that shape every project we take on.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUES.map((value, i) => (
                <FadeUp key={value.name} delay={i * 0.08}>
                  <div className="bg-[#faf9f6] rounded-2xl p-8 h-full">
                    <div className="w-10 h-10 rounded-xl bg-[#f05a28]/10 flex items-center justify-center mb-6">
                      {value.icon}
                    </div>
                    <h3
                      className="text-lg font-[500] text-[#1a1a1a] mb-3"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      {value.name}
                    </h3>
                    <p
                      className="text-sm text-[#777] leading-relaxed"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {value.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="py-24 px-5 sm:px-8 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <FadeUp>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t border-[#1a1a1a]/8 pt-16">
                <div>
                  <h2
                    className="text-3xl lg:text-4xl font-[500] text-[#1a1a1a] leading-tight tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    Ready to Build<br />Something Real?
                  </h2>
                  <p className="text-base text-[#777]" style={{ fontFamily: 'var(--font-inter)' }}>
                    Let&apos;s find out if we are the right fit for each other.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-[#f05a28] text-white font-semibold text-[14px] px-8 py-4 rounded-full hover:bg-[#d94e20] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Let&apos;s Talk →
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
