'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface ParallaxProps {
  /** Pixels of vertical travel each way (default 40). Use ~80-120 for full-viewport heroes, ~30-50 for cards. */
  intensity?: number
  className?: string
  children: ReactNode
}

/**
 * Wraps an image (or any visual) in a subtle scroll-driven parallax.
 * Parent must be `relative overflow-hidden` with a fixed aspect ratio.
 * Pass a `fill` Image (or any absolute-positioned child) as children.
 */
export function Parallax({ intensity = 40, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [intensity, -intensity]
  )

  // Overhang must exceed |intensity| so the inner div always covers the visible parent frame.
  const overhang = Math.ceil(intensity * 1.5)

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className ?? ''}`}>
      <motion.div
        style={{
          y,
          top: `-${overhang}px`,
          bottom: `-${overhang}px`,
        }}
        className="absolute left-0 right-0"
      >
        {children}
      </motion.div>
    </div>
  )
}
