'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { scaleIn, stagger } from '@/lib/animations'

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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const shouldReduceMotion = useReducedMotion()

  const resolvedVariant = shouldReduceMotion
    ? { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } }
    : scaleIn

  return (
    <motion.div
      variants={resolvedVariant}
      className="flex flex-col bg-[#faf9f6] rounded-2xl p-8 shadow-sm"
    >
      <div
        className="text-6xl text-[#f05a28] opacity-60 leading-none mb-4 font-[family-name:var(--font-unbounded)]"
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <p className="font-[family-name:var(--font-inter)] text-base text-[#1a1a1a]/80 leading-relaxed italic flex-1">
        {testimonial.quote}
      </p>
      <div className="mt-6 pt-6 border-t border-[#1a1a1a]/[0.08]">
        <p className="font-[family-name:var(--font-unbounded)] font-medium text-sm text-[#1a1a1a]">
          {testimonial.name}
        </p>
        <p className="font-[family-name:var(--font-inter)] text-xs text-[#777777] mt-0.5">
          {testimonial.role}
        </p>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion()

  const resolvedStagger = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : stagger(0.08)

  return (
    <SectionWrapper className="bg-white">
      <div className="text-center mb-16">
        <h2
          className="text-4xl lg:text-5xl text-[#1a1a1a] font-[family-name:var(--font-unbounded)] font-medium leading-tight tracking-tight"
        >
          Client Stories
        </h2>
        <p
          className="mt-4 text-base text-[#777] font-[family-name:var(--font-inter)] max-w-[440px] mx-auto leading-relaxed"
        >
          Hear From Our Clients
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={resolvedStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
