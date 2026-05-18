'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { RevealText } from '@/components/RevealText'
import { FigCaption } from '@/components/FigCaption'

const HERO_IMAGE = '/hero/akmal-hero-v2.png'

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  return (
    <section
      ref={heroRef}
      id="home-hero"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Full-bleed background image */}
      <motion.div
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={HERO_IMAGE}
          alt="A figure standing in the light of an eruption"
          fill
          className="object-cover object-[75%_30%] md:object-right"
          priority
          sizes="100vw"
          quality={95}
        />
        {/* Mobile: gradient flipped — clear at top so figure breathes, dark at bottom where text now lives */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-background from-0% via-background/85 via-35% to-transparent to-70%" />

        {/* Desktop: horizontal gradient — dark concentrated on left third, image fully clean from midpoint right */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-background from-0% via-background/40 via-30% to-transparent to-50%" />
      </motion.div>

      {/* Content overlay — pushed to bottom on mobile, anchored top on desktop */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col justify-end px-6 pb-40 md:justify-start md:px-10 md:pb-48 md:pt-40">
        <motion.div style={{ y: textY }} className="max-w-3xl">
          <motion.p
            className="overline text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            [ A boutique Brand Design Studio ]
          </motion.p>

          <h1 className="display-xl mt-8">
            <RevealText text="Erupt" as="span" />
            <br />
            <span className="inline-block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block italic accent-orange"
              >
                with clarity.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            We build brands that don&apos;t ask permission to be noticed.
            Strategy-led design, every system built to hold.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
          >
            <Link
              href="/contact"
              data-cursor="→ Brief us"
              className="group inline-flex items-center gap-3 rounded-sm bg-eruption px-6 py-3.5 text-white transition-transform hover:-translate-y-0.5"
            >
              <span className="overline">Start a Project</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link
              href="/works"
              data-cursor="→ Open archive"
              className="group inline-flex items-center gap-3 rounded-sm border border-foreground/25 px-6 py-3.5 text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/60"
            >
              <span className="overline">See selected works</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Image labels — over the visible image edges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-16 left-0 right-0 z-20 px-6 md:bottom-20 md:px-10"
      >
        <div className="mx-auto flex max-w-[1600px] items-end justify-between">
          <span className="overline text-white/80">[ 01 / Eruption ]</span>
          <span className="overline text-white/80">SOL · III</span>
        </div>
      </motion.div>

      {/* FigCaption — below the labels, right-aligned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-0 right-0 z-20 px-6 md:px-10"
      >
        <div className="mx-auto flex max-w-[1600px] justify-end">
          <FigCaption n={1}>Letus.001 / Eruption study, 2026.</FigCaption>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-2 left-0 right-0 z-20 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-muted-foreground"
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  )
}
