'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[110] h-[2px] bg-eruption"
      aria-hidden="true"
    />
  )
}
