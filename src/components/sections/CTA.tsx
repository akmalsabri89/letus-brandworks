'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { WhiteConstellation } from '@/components/ui/white-constellation'
import { CTAForm } from '@/components/sections/CTAForm'

export function CTA() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="bg-[#0f0f0f] py-24 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
      <WhiteConstellation />

      <motion.div
        className="relative z-10 max-w-[640px] mx-auto text-center"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
        viewport={{ once: true, margin: '-60px' }}
      >
        <h2
          className="text-4xl lg:text-5xl font-[500] text-white leading-tight tracking-tight mb-3"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          Ready to Ignite?
        </h2>
        <p
          className="text-white/70 mb-10 max-w-[400px] mx-auto text-base"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          You&apos;ve seen how we work. Now let&apos;s start with your story.
        </p>

        <CTAForm />
      </motion.div>
    </section>
  )
}
