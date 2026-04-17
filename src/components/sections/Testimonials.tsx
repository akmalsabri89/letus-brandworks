'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/section-wrapper'

interface Testimonial {
  quote: string
  name: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Letus gave our brand the identity it deserved — sharp, confident, and unmistakably ours.',
    name: 'Shahril Azman',
    role: 'Founder, Tanahku',
  },
  {
    quote:
      'Working with Akmal was effortless. The strategy was clear and the visuals exceeded what we imagined.',
    name: 'Ili Suraya',
    role: 'Founder, Pandan & Co.',
  },
  {
    quote:
      "Three months in and we're still getting compliments on the rebrand. Worth every ringgit.",
    name: 'Farouk Hairi',
    role: 'CEO, Volta Digital',
  },
]

function Attribution({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-px bg-[#f05a28] flex-shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-[#1a1a1a] font-[family-name:var(--font-inter)]">
          {name}
        </p>
        <p className="text-xs text-[#999] font-[family-name:var(--font-inter)] mt-0.5">
          {role}
        </p>
      </div>
    </div>
  )
}

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion()

  const motionProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
        }

  return (
    <SectionWrapper className="bg-white">

      <h2
        className="text-4xl lg:text-5xl text-[#1a1a1a] font-[family-name:var(--font-unbounded)] font-medium leading-tight tracking-tight mb-16"
      >
        Client Stories
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* Featured testimonial — editorial, no card */}
        <motion.div
          className="lg:col-span-7 border-t border-[#1a1a1a]/10 pt-8 flex flex-col justify-between"
          {...motionProps(0)}
        >
          <p
            className="text-2xl lg:text-[1.75rem] font-[400] text-[#1a1a1a] leading-relaxed"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {testimonials[0].quote}
          </p>
          <div className="mt-10">
            <Attribution name={testimonials[0].name} role={testimonials[0].role} />
          </div>
        </motion.div>

        {/* Supporting testimonials — stacked cards */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-[#faf9f6] rounded-xl p-6 flex flex-col gap-5"
              {...motionProps((index + 1) * 0.1)}
            >
              <p className="text-[15px] text-[#1a1a1a]/70 leading-relaxed font-[family-name:var(--font-inter)]">
                {testimonial.quote}
              </p>
              <Attribution name={testimonial.name} role={testimonial.role} />
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  )
}
