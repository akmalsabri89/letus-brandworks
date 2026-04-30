'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/animated-section'
import { easing } from '@/lib/tokens'

const SERVICES = [
  {
    id: 'strategy',
    title: 'Brand Strategy',
    description:
      'Research-driven positioning, audience mapping, competitive analysis, and brand platform development. We define who you are before we show who you are.',
  },
  {
    id: 'identity',
    title: 'Identity Design',
    description:
      'Logo systems, colour palettes, typography, visual language, and full brand guidelines. Every mark designed to be both distinctive and durable.',
  },
  {
    id: 'web',
    title: 'Web Design',
    description:
      'Strategy-led websites that convert. Built on Next.js, designed in Framer, or custom-coded — always performance-first and brand-coherent.',
  },
  {
    id: 'digital',
    title: 'Digital Marketing',
    description:
      'Google Ads, Meta Ads, SEO, and social media — unified under your brand strategy so every channel pulls in the same direction.',
  },
] as const

export function Services() {
  const [open, setOpen] = useState<string | null>(null)
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-[#0f0f0f] py-24 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">

        <AnimatedSection>
          <p
            className="text-[10px] tracking-[3px] uppercase text-[#f05a28] mb-3"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            What We Do
          </p>
          <h2
            className="text-[length:var(--text-section)] font-[800] text-white leading-tight tracking-[var(--letter-section)] mb-12"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Services.
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex flex-col divide-y divide-[#1a1a1a]">
            {SERVICES.map((service) => {
              const isOpen = open === service.id
              return (
                <div key={service.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : service.id)}
                    className="group w-full flex items-center justify-between py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    {/* Left accent + title */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-[3px] h-5 rounded-full flex-shrink-0 transition-colors duration-300"
                        style={{ background: isOpen ? '#f05a28' : '#2a2a2a' }}
                      />
                      <span
                        className="text-[18px] sm:text-[22px] font-[700] transition-colors duration-200"
                        style={{
                          fontFamily: 'var(--font-unbounded)',
                          color: isOpen ? '#ffffff' : '#666666',
                        }}
                      >
                        {service.title}
                      </span>
                    </div>

                    {/* Arrow */}
                    <motion.span
                      className="text-[#f05a28] text-[18px] flex-shrink-0"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: shouldReduce ? 0 : 0.2, ease: easing.out }}
                    >
                      →
                    </motion.span>
                  </button>

                  {/* Expandable body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: shouldReduce ? 0 : 0.35, ease: easing.out },
                          opacity: { duration: shouldReduce ? 0 : 0.25 },
                        }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          className="pb-6 pl-7 text-[15px] leading-relaxed text-[#777]"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {service.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
