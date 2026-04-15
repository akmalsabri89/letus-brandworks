'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { slideFromLeft, fadeUp, stagger } from '@/lib/animations'

interface Service {
  number: string
  name: string
}

const services: Service[] = [
  { number: '01', name: 'Brand Strategy & Positioning' },
  { number: '02', name: 'Brand Identity Design' },
  { number: '03', name: 'Website Design' },
  { number: '04', name: 'Marketing Strategy' },
]

function ServiceRow({ service, isLast }: { service: Service; isLast: boolean }) {
  const [hovered, setHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const rowVariants = shouldReduceMotion
    ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
    : fadeUp

  return (
    <motion.div
      variants={rowVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between py-6 px-3 border-t border-[rgba(26,26,26,0.1)] transition-all duration-200 cursor-pointer"
      style={{
        borderBottom: isLast ? '1px solid rgba(26,26,26,0.1)' : undefined,
        backgroundColor: hovered ? 'rgba(240,90,40,0.04)' : 'transparent',
      }}
    >
      <div className="flex items-center gap-6">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#f05a28]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {service.number}
        </span>
        <span
          className="text-lg font-[500] text-[#1a1a1a]"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {service.name}
        </span>
      </div>
      <span
        className="text-sm text-[#1a1a1a] transition-opacity duration-200"
        style={{ opacity: hovered ? 1 : 0.3 }}
      >
        ↗
      </span>
    </motion.div>
  )
}

export function Services() {
  const shouldReduceMotion = useReducedMotion()

  const headingVariants = shouldReduceMotion
    ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
    : slideFromLeft

  const staggerVariants = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : stagger(0.1)

  return (
    <SectionWrapper className="bg-[#faf9f6]" id="services">
      <div className="flex flex-col lg:flex-row lg:gap-[5%] gap-12">
        {/* Left column */}
        <motion.div
          className="lg:w-[40%]"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2
            className="text-4xl lg:text-5xl font-[500] leading-tight text-[#1a1a1a]"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Our Services
          </h2>
          <p
            className="text-base text-[#777777] mt-4 leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)', maxWidth: '320px' }}
          >
            We combine strategy with craft to build brands that command attention and drive growth.
          </p>
        </motion.div>

        {/* Right column */}
        <motion.div
          className="lg:w-[55%]"
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {services.map((service, index) => (
            <ServiceRow
              key={service.number}
              service={service}
              isLast={index === services.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
