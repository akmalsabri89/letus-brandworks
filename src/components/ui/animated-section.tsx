'use client'

import type { Variants } from 'framer-motion'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  const reducedVariants: Variants = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
  const motionVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
    },
  }
  const resolvedFadeUp = shouldReduceMotion ? reducedVariants : motionVariants

  return (
    <motion.div
      className={className}
      variants={resolvedFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedGroupProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function AnimatedGroup({ children, className, staggerDelay = 0.08 }: AnimatedGroupProps) {
  const shouldReduceMotion = useReducedMotion()

  const resolvedStagger = shouldReduceMotion ? { hidden: {}, visible: {} } : stagger(staggerDelay)

  return (
    <motion.div
      className={className}
      variants={resolvedStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}
