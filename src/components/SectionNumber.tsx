'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionNumberProps {
  n: number
  className?: string
  position?: 'left' | 'right'
}

export function SectionNumber({ n, className = '', position = 'left' }: SectionNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])

  const pos = position === 'right'
    ? 'right-0 translate-x-2 md:translate-x-4'
    : 'left-0 -translate-x-2 md:-translate-x-4'

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={{ y, fontSize: 'clamp(7rem, 18vw, 18rem)', fontWeight: 500, willChange: 'transform' }}
      className={`pointer-events-none absolute -top-8 ${pos} select-none font-mono leading-none tracking-[-0.02em] text-foreground/[0.06] dark:text-foreground/[0.08] ${className}`}
    >
      {String(n).padStart(2, '0')}
    </motion.span>
  )
}
