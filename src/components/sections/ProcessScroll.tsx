'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionNumber } from '@/components/SectionNumber'

const STEPS = [
  {
    num: '01',
    title: 'Listen',
    body: 'We sit in your meetings before we draw a line. Workshops, interviews, document archaeology. The brief gets shorter, sharper, harder to argue with.',
    visual: 'https://images.unsplash.com/photo-1681949103006-70066fb25dfe?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  },
  {
    num: '02',
    title: 'Locate',
    body: 'We map the white space competitors are too polite to claim. Then we test it against your audience until the position only one brand can credibly hold. Yours.',
    visual: 'https://images.unsplash.com/photo-1568359415314-7ddb3bd0c828?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  },
  {
    num: '03',
    title: 'Erupt',
    body: 'Now the noise. Identity, voice, system. We design the version of your brand that walks into the room and stops the conversation.',
    visual: '/process/erupt.png',
  },
  {
    num: '04',
    title: 'Land',
    body: "Guidelines, training, launch. We hand-off so cleanly your team forgets we ever ran the show. Then we stay on speed-dial for the next eruption.",
    visual: 'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  },
]

export function ProcessScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={sectionRef}
      id="home-process"
      className="relative bg-foreground text-background"
      style={{ minHeight: `${100 + STEPS.length * 70}vh` }}
    >
      <SectionNumber n={4} className="!text-background/[0.06]" />

      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-6 md:px-10">

        {/* Sticky left */}
        <div className="col-span-12 md:col-span-5">
          <div className="sticky top-32 py-24">
            <p className="overline opacity-60">[ Our Process ]</p>
            <h2 className="display-lg mt-6">
              Four moves.<br />
              <em className="italic accent-orange">One eruption.</em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed opacity-70">
              We don&apos;t do logo sprints. We run a method tuned to make
              brands credible, distinctive, and impossible to scroll past.
            </p>

            {/* Scroll progress bar */}
            <div className="mt-10 h-[3px] w-full bg-background/15">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
                className="h-full bg-eruption"
              />
            </div>
          </div>
        </div>

        {/* Scrolling right column */}
        <div className="col-span-12 md:col-span-7">
          <div className="flex flex-col gap-24 py-24 md:gap-48 md:py-32">
            {STEPS.map((step) => (
              <ProcessCard key={step.num} step={step} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function ProcessCard({ step }: { step: typeof STEPS[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="grid grid-cols-12 gap-4"
    >
      <div className="col-span-2">
        <span className="overline opacity-60">{step.num}</span>
      </div>
      <div className="col-span-10">
        <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
          <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
            <Image
              src={step.visual}
              alt={step.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 90vw"
              quality={95}
            />
          </motion.div>
          <div className="absolute inset-0 bg-foreground/20" />
        </div>
        <h3 className="display-lg mt-6">
          {step.title}<span className="accent-orange">.</span>
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed opacity-80">
          {step.body}
        </p>
      </div>
    </motion.div>
  )
}
