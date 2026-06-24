'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionNumber } from '@/components/SectionNumber'

const DURATION = 5000

export interface SanityTestimonial {
  _id: string
  quote: string
  emphasis: string
  name: string
  role: string
  photo?: { asset?: { url?: string } }
}

export function Testimonials({ testimonials }: { testimonials: SanityTestimonial[] }) {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const elapsedRef = useRef<number>(0)

  const count = testimonials.length

  const goTo = useCallback((index: number) => {
    setActive(index)
    setProgress(0)
    elapsedRef.current = 0
    startTimeRef.current = Date.now()
  }, [])

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % count)
    setProgress(0)
    elapsedRef.current = 0
    startTimeRef.current = Date.now()
  }, [count])

  useEffect(() => {
    if (paused || count < 2) {
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
  }, [paused, active, advance, count])

  if (count === 0) return null

  const safeActive = Math.min(active, count - 1)
  const t = testimonials[safeActive]
  const photoUrl = t.photo?.asset?.url ?? null

  // Split on emphasis to highlight it — fall back to plain quote if not found
  const parts = t.emphasis ? t.quote.split(t.emphasis) : null
  const hasEmphasis = parts !== null && parts.length === 2

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
          style={{ minHeight: 'clamp(9rem, 18vw, 14rem)' }}
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
              key={safeActive}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="quote-lg">
                <span aria-hidden className="accent-orange">&ldquo;</span>
                {hasEmphasis ? (
                  <>
                    {parts![0]}
                    <em className="italic accent-orange">{t.emphasis}</em>
                    {parts![1]}
                  </>
                ) : (
                  t.quote
                )}
                <span aria-hidden className="accent-orange">&rdquo;</span>
              </blockquote>

              {/* Attribution */}
              <div className="mt-10 flex items-center gap-4">
                <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-sm border border-foreground/20">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                      quality={95}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="overline text-muted-foreground mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators — only show if more than one testimonial */}
        {count > 1 && (
          <div className="mt-10 flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="relative h-[2px] w-10 rounded-full bg-foreground/15 overflow-hidden cursor-pointer"
              >
                {i === safeActive ? (
                  <motion.span
                    className="absolute top-0 left-0 h-full bg-eruption rounded-full"
                    style={{ width: `${progress * 100}%` }}
                  />
                ) : i < safeActive ? (
                  <span className="absolute inset-0 bg-foreground/40 rounded-full" />
                ) : null}
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
