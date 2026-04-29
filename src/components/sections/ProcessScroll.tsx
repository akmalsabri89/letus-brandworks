'use client'

import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'
import { BrandConstellation } from '@/components/ui/brand-constellation'

const steps = [
  {
    number: '01',
    label: 'Discover',
    detail: 'We get into your business — your goals, market, and what sets you apart.',
  },
  {
    number: '02',
    label: 'Strategise',
    detail: 'We map the positioning and creative direction before a single pixel is placed.',
  },
  {
    number: '03',
    label: 'Create',
    detail: 'Design and build with precision, presenting work that earns its place.',
  },
  {
    number: '04',
    label: 'Launch',
    detail: 'We hand over a brand ready for the world — and stay close as you grow.',
  },
]

export function ProcessScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveStep(Math.min(3, Math.max(0, Math.floor(v * 4))))
  })

  // Snap to nearest step boundary after user stops scrolling.
  // Prevents fast-scrollers from missing steps with invisible text.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const STEP_COUNT = 4

    const handleScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const containerTop = rect.top + window.scrollY
        const containerHeight = containerRef.current.offsetHeight
        const viewportHeight = window.innerHeight
        const scrollableDistance = containerHeight - viewportHeight
        const relativeScroll = window.scrollY - containerTop

        if (relativeScroll < 0 || relativeScroll > scrollableDistance) return

        const progress = relativeScroll / scrollableDistance
        const nearestStep = Math.min(STEP_COUNT - 1, Math.round(progress * STEP_COUNT))
        const targetScroll = containerTop + ((nearestStep + 0.5) / STEP_COUNT) * scrollableDistance

        if (Math.abs(window.scrollY - targetScroll) > 8) {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' })
        }
      }, 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  // Constellation zoom + rotation
  const zoom = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1.0],
    [1.0, 1.3, 2.8, 4.4, 1.0]
  )
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 22])

  // Progress bar fills — each bar covers its 25% zone exactly
  const bar0 = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const bar1 = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const bar2 = useTransform(scrollYProgress, [0.5, 0.75], [0, 1])
  const bar3 = useTransform(scrollYProgress, [0.75, 1.0], [0, 1])
  const barFills = [bar0, bar1, bar2, bar3]

  return (
    <div className="bg-[#0f0f0f]">

      {/* Section heading — scrolls away before sticky locks */}
      <div className="px-5 sm:px-8 lg:px-12 pt-20 pb-10">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f05a28] font-[family-name:var(--font-inter)] block mb-3">
            How We Work
          </span>
          <h2
            className="text-3xl lg:text-4xl font-[500] text-white leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            From Brief to Brand
          </h2>
        </div>
      </div>

      {/* Scroll driver — data-nav-dark placed here so nav only goes ghost once sticky section is active */}
      <div data-nav-dark ref={containerRef} style={{ height: '350vh' }}>
        <div className="sticky top-0 h-dvh overflow-hidden bg-[#0f0f0f]">

          {/* Constellation zoom/rotate */}
          <motion.div
            style={{ scale: zoom, rotate, transformOrigin: 'center center' }}
            className="absolute inset-0"
          >
            <BrandConstellation />
          </motion.div>

          {/* Vignette — kept light so constellation remains the hero */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(15,15,15,0.25) 100%)',
            }}
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0f0f0f]/20 via-transparent to-[#0f0f0f]/25" />

          {/* Step text — driven by discrete step state, AnimatePresence for clean transitions */}
          <div className="absolute top-[22%] left-[10%] lg:left-[18%] max-w-[750px] z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[11px] font-semibold text-[#f05a28] font-[family-name:var(--font-inter)] block mb-4 tracking-[0.2em]">
                  {steps[activeStep].number}
                </span>
                <h3
                  className="text-5xl lg:text-7xl font-[500] text-white leading-[0.95] tracking-tight mb-6"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  {steps[activeStep].label}
                </h3>
                <p className="text-base text-white/50 max-w-[400px] leading-relaxed font-[family-name:var(--font-inter)]">
                  {steps[activeStep].detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress ticks — bottom right, small Instagram-story bars */}
          <div className="absolute bottom-10 right-5 sm:right-8 lg:right-12 flex gap-1.5 z-20">
            {barFills.map((fill, i) => (
              <div
                key={i}
                className="w-7 h-[3px] rounded-full overflow-hidden bg-white/20"
              >
                <motion.div
                  style={{ scaleX: fill, transformOrigin: 'left' }}
                  className="h-full w-full bg-white/75 rounded-full"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
