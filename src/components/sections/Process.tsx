'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Step {
  number: string
  name: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    name: 'Discover',
    description:
      'Deep dive into your brand, market, and audience. We ask the uncomfortable questions that surface the real opportunity.',
  },
  {
    number: '02',
    name: 'Strategize',
    description:
      'We build your brand platform — positioning, voice, and visual direction — before a single pixel is designed.',
  },
  {
    number: '03',
    name: 'Design',
    description:
      'Craft phase. Every element designed with purpose: logo, identity system, collateral, and digital touchpoints.',
  },
  {
    number: '04',
    name: 'Launch',
    description:
      'Rollout support, brand guidelines, and assets delivered. Your brand, ready for the world.',
  },
]

export function Process() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="bg-[#141414] py-24 lg:py-32 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2
            className="text-4xl lg:text-5xl font-[500] text-white tracking-tight"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Our Process
          </h2>
          <p
            className="text-base text-white/50 mt-3"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Four focused moves from insight to launch.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? undefined : undefined}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                      delay: index * 0.1,
                    }
              }
              viewport={{ once: true, margin: '-60px' }}
              className="border-t border-white/10 pt-8"
            >
              <span
                className="text-7xl lg:text-8xl font-[500] text-white/[0.06] leading-none select-none block"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                {step.number}
              </span>
              <h3
                className="text-lg font-[500] text-white mt-3"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                {step.name}
              </h3>
              <p
                className="text-sm text-white/45 leading-relaxed mt-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
