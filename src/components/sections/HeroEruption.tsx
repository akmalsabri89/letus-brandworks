'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { motion, useAnimation, useReducedMotion } from 'framer-motion'
import { EruptionGlow } from '@/components/ui/eruption-glow'
import { EnergyStreaks } from '@/components/ui/energy-streaks'
import { easing } from '@/lib/tokens'

export function HeroEruption() {
  const glowControls = useAnimation()
  const textControls = useAnimation()
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const awaken = async () => {
      if (shouldReduce) {
        // Skip the dramatic pause — show everything immediately
        glowControls.set({ opacity: 1 })
        textControls.set({ opacity: 1, y: 0 })
        return
      }

      // Phase 1: 0.8s silence (pure black — already black from body bg)
      await new Promise<void>((r) => setTimeout(r, 800))

      // Phase 2: Glow fades in
      await glowControls.start({
        opacity: 1,
        transition: { duration: 1.0, ease: easing.out },
      })

      // Phase 3: Text rises (handled by textControls variants + stagger)
      textControls.start('visible')
    }

    glowControls.set({ opacity: 0 })
    textControls.set('hidden')
    awaken()
  }, [glowControls, textControls, shouldReduce])

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easing.out },
    },
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.14 },
    },
  }

  return (
    <section
      data-nav-ghost
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Parallax layers — static for now, scroll wired in Task 4 */}
      <div className="absolute inset-0">
        <EruptionGlow intensity={1} />
        <EnergyStreaks />
      </div>

      {/* Text content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-24">
        <motion.div
          className="flex flex-col gap-5 max-w-[640px]"
          variants={containerVariants}
          initial="hidden"
          animate={textControls}
        >
          {/* Label */}
          <motion.p
            variants={itemVariants}
            className="text-[11px] font-medium tracking-[3px] uppercase text-[#f05a28]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Letus Brandworks · Kedah, Malaysia
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-[length:var(--text-hero)] font-[900] leading-[0.92] tracking-[var(--letter-hero)]"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            <span className="text-white block">Where Brands</span>
            <span className="text-[#f05a28] block">Erupt.</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={itemVariants}
            className="text-[16px] leading-relaxed text-[#777777] max-w-[380px]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Boutique brand strategy and identity design for ambitious businesses
            ready to define their category.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/contact"
              className="bg-[#f05a28] text-white text-[13px] font-semibold px-7 py-3.5 rounded-full hover:bg-[#d94e20] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Start a Project →
            </Link>
            <Link
              href="/works"
              className="border border-white/15 text-white text-[13px] font-medium px-7 py-3.5 rounded-full hover:border-white/30 transition-colors duration-200"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              See Our Work
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={shouldReduce ? {} : {
            opacity: [0, 1, 1, 0],
            y: [0, 0, 6, 6],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 3.5, ease: 'easeInOut' }}
        >
          <span className="text-[10px] tracking-[2px] uppercase text-[#444]"
            style={{ fontFamily: 'var(--font-inter)' }}>
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#444] to-transparent" />
        </motion.div>
      </div>

      {/* Glow fade-in wrapper */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={glowControls}
      >
        {/* Additional soft overlay that fades with the glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-60" />
      </motion.div>
    </section>
  )
}
