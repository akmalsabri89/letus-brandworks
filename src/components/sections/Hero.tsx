'use client'

import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { AnimatedGroup } from '@/components/ui/animated-section'
import { AnimatedSection } from '@/components/ui/animated-section'
import { BrandConstellation } from '@/components/ui/brand-constellation'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative min-h-dvh bg-[#faf9f6] flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8 lg:px-12 pt-24 pb-20">

      {/* Canvas background — fills entire section */}
      <BrandConstellation />

      {/* Text content — sits above canvas */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto text-center">
        <AnimatedGroup className="flex flex-col items-center gap-6" staggerDelay={0.12}>

          {/* H1 */}
          <AnimatedSection>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-[500] leading-tight tracking-tight text-[#1a1a1a] max-w-[740px] mx-auto"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Boutique Brand Design Agency
            </h1>
          </AnimatedSection>

          {/* Subheading */}
          <AnimatedSection>
            <p
              className="text-base sm:text-lg text-[#777777] max-w-[480px] mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Premium branding for businesses ready to define their category, disrupt the market, and build something that lasts.
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <Link
                href="/contact"
                className="bg-[#f05a28] text-white text-[13px] font-semibold px-6 py-3 rounded-full hover:bg-[#d94e20] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Get Started →
              </Link>
              <Link
                href="/works"
                className="border border-[#1a1a1a]/20 text-[#1a1a1a] text-[13px] font-medium px-6 py-3 rounded-full hover:border-[#1a1a1a]/40 transition-colors duration-200"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                See Our Work
              </Link>
            </div>
          </AnimatedSection>

        </AnimatedGroup>
      </div>

    </section>
  )
}
