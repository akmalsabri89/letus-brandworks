'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import {
  motion,
  useAnimation,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { EruptionGlow } from '@/components/ui/eruption-glow'
import { EnergyStreaks } from '@/components/ui/energy-streaks'
import { easing } from '@/lib/tokens'

export function HeroEruption() {
  const glowControls = useAnimation()
  const textControls = useAnimation()
  const shouldReduce = useReducedMotion()

  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Layers rise upward (negative y) as user scrolls down
  // Each layer at different speed for depth
  const glowY    = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const streakY  = useTransform(scrollYProgress, [0, 1], ['0%', '-70%'])
  const smokeY   = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const glowFade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

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
      ref={heroRef}
      data-nav-ghost
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Parallax background layers */}
      {shouldReduce ? (
        // No parallax for reduced-motion users
        <div className="absolute inset-0">
          <EruptionGlow intensity={1} />
          <EnergyStreaks />
        </div>
      ) : (
        <div className="absolute inset-0">
          {/* Atmospheric haze — slowest */}
          <motion.div
            className="absolute inset-0 eruption-layer"
            style={{ y: smokeY }}
          >
            <EruptionGlow intensity={0.6} />
          </motion.div>

          {/* Main glow — medium speed */}
          <motion.div
            className="absolute inset-0 eruption-layer"
            style={{ y: glowY, opacity: glowFade }}
            animate={glowControls}
          >
            <EruptionGlow intensity={1} />
          </motion.div>

          {/* Energy streaks — fastest, most aggressive */}
          <motion.div
            className="absolute inset-0 eruption-layer"
            style={{ y: streakY }}
          >
            <EnergyStreaks />
          </motion.div>
        </div>
      )}

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


    </section>
  )
}
