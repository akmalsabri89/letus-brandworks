'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/animated-section'

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Deep-dive into your business, category, competitors, and customers. We ask the uncomfortable questions other agencies skip.',
  },
  {
    number: '02',
    title: 'Define',
    description:
      'Positioning, personality, voice, and visual direction — locked before a single pixel is drawn. Strategy first, always.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      "Identity systems crafted with precision. Every element justified by the strategy. Nothing decorative for decoration's sake.",
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'Full brand guidelines, production-ready files, and a handover that actually makes sense. You leave ready to use your brand.',
  },
] as const

export function ProcessScroll() {
  const shouldReduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Glow intensity increases as you scroll through the section
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a0000] py-24 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Ambient glow that intensifies with scroll */}
      {!shouldReduce && (
        <motion.div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px]"
          style={{ opacity: glowOpacity }}
          aria-hidden
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(ellipse, rgba(240,90,40,0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
      )}

      <div className="max-w-[1200px] mx-auto relative z-10">

        <AnimatedSection>
          <p
            className="text-[10px] tracking-[3px] uppercase text-[#f05a28] mb-3"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            How It Works
          </p>
          <h2
            className="text-[length:var(--text-section)] font-[800] text-white leading-tight tracking-[var(--letter-section)] mb-16"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            The Process.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.1}>
              <div className="relative pl-5 border-l border-[#1f1f1f] group hover:border-[#f05a28] transition-colors duration-300">
                <span
                  className="block text-[11px] tracking-[2px] text-[#f05a28] mb-3"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {step.number}
                </span>
                <h3
                  className="text-[20px] font-[800] text-white mb-3 tracking-tight"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed text-[#555]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
