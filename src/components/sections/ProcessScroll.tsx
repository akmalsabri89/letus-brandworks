'use client'

import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion'
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

  // Vertical scroll drives horizontal panel movement
  // 4 panels × 100vw — translate from 0 to -300vw as user scrolls through
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // 4 steps, 3 transitions — snap to nearest third
    setActiveStep(Math.min(3, Math.max(0, Math.round(v * 3))))
  })

  // Snap to nearest panel after scroll settles
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (!containerRef.current) return
        const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY
        const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight
        const relativeScroll = window.scrollY - containerTop

        if (relativeScroll < 0 || relativeScroll > scrollableDistance) return

        const progress = relativeScroll / scrollableDistance
        // 4 panels → snap points at 0, 1/3, 2/3, 1
        const nearestStep = Math.min(3, Math.max(0, Math.round(progress * 3)))
        const targetScroll = containerTop + (nearestStep / 3) * scrollableDistance

        if (Math.abs(window.scrollY - targetScroll) > 10) {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' })
        }
      }, 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="bg-[#0f0f0f]">
      {/* Section heading — scrolls away before sticky section locks */}
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

      {/* Scroll driver — 350vh gives ~87.5vh per step */}
      <div ref={containerRef} data-nav-dark style={{ height: '350vh' }}>
        <div className="sticky top-0 h-dvh overflow-hidden bg-[#0f0f0f]">

          {/* Constellation — static, no scale transform, stays crisp */}
          <div className="absolute inset-0 pointer-events-none">
            <BrandConstellation />
          </div>

          {/* Vignettes */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(15,15,15,0.25) 100%)',
            }}
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0f0f0f]/20 via-transparent to-[#0f0f0f]/25" />

          {/* Horizontal sliding strip — GPU composited */}
          <motion.div
            style={{ x, willChange: 'transform' }}
            className="absolute inset-y-0 left-0 flex"
          >
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative h-full flex-shrink-0"
                style={{ width: '100vw' }}
              >
                <div className="absolute top-[22%] left-[10%] lg:left-[18%] max-w-[750px]">
                  <span className="text-[11px] font-semibold text-[#f05a28] font-[family-name:var(--font-inter)] block mb-4 tracking-[0.2em]">
                    {step.number}
                  </span>
                  <h3
                    className="text-5xl lg:text-7xl font-[500] text-white leading-[0.95] tracking-tight mb-6"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    {step.label}
                  </h3>
                  <p className="text-base text-white/50 max-w-[400px] leading-relaxed font-[family-name:var(--font-inter)]">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Step indicators — pill expands on active */}
          <div className="absolute bottom-10 right-5 sm:right-8 lg:right-12 flex items-center gap-1.5 z-20">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`rounded-full bg-white transition-all duration-300 ${
                  i === activeStep ? 'w-5 h-[3px] opacity-75' : 'w-[3px] h-[3px] opacity-20'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
