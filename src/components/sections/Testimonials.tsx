'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionNumber } from '@/components/SectionNumber'

const DURATION = 5000

const TESTIMONIALS = [
  {
    quote: "Letus didn't soften us. They sharpened us. We finally look like the data we ship.",
    emphasis: 'sharpened',
    name: 'Anika Rao',
    role: 'CEO, Verdant Forge',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    quote: "Every brand we've seen from Letus walks into a room and owns it. Ours is no different.",
    emphasis: 'owns it',
    name: 'Marcus Tan',
    role: 'Founder, Orbit Supply',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    quote: "We briefed them on a Monday. By Friday we had a positioning that our whole board could defend.",
    emphasis: 'whole board could defend',
    name: 'Priya Menon',
    role: 'CMO, Atlas Carbon',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face&q=80',
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const elapsedRef = useRef<number>(0)

  const goTo = useCallback((index: number) => {
    setActive(index)
    setProgress(0)
    elapsedRef.current = 0
    startTimeRef.current = Date.now()
  }, [])

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length)
    setProgress(0)
    elapsedRef.current = 0
    startTimeRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    startTimeRef.current = Date.now() - elapsedRef.current

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      elapsedRef.current = elapsed

      if (elapsed >= DURATION) {
        advance()
      } else {
        setProgress(elapsed / DURATION)
      }
    }, 30)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused, active, advance])

  const t = TESTIMONIALS[active]

  const parts = t.quote.split(t.emphasis)

  return (
    <section
      id="home-testimonial"
      className="relative overflow-hidden border-t border-foreground/10 py-24 md:py-40"
    >
      <SectionNumber n={5} />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">

        <p className="overline text-muted-foreground mb-10">[ Word from the room ]</p>

        {/* Quote area — pause on hover */}
        <div
          className="relative"
          style={{ minHeight: 'clamp(12rem, 30vw, 22rem)' }}
          onMouseEnter={() => {
            elapsedRef.current = Date.now() - startTimeRef.current
            setPaused(true)
          }}
          onMouseLeave={() => {
            startTimeRef.current = Date.now() - elapsedRef.current
            setPaused(false)
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="display-lg">
                <span aria-hidden className="accent-orange">&ldquo;</span>
                {parts[0]}
                <em className="italic accent-orange">{t.emphasis}</em>
                {parts[1]}
                <span aria-hidden className="accent-orange">&rdquo;</span>
              </blockquote>

              {/* Attribution */}
              <div className="mt-10 flex items-center gap-4">
                <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-sm border border-foreground/20">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                    quality={95}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="overline text-muted-foreground mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Horizontal progress indicators */}
        <div className="mt-10 flex gap-1.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="relative h-[2px] w-10 rounded-full bg-foreground/15 overflow-hidden cursor-pointer"
            >
              {i === active ? (
                <motion.span
                  className="absolute top-0 left-0 h-full bg-eruption rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              ) : i < active ? (
                <span className="absolute inset-0 bg-foreground/40 rounded-full" />
              ) : null}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
