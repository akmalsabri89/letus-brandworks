'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll } from 'framer-motion'
import { SectionNumber } from '@/components/SectionNumber'
import { Parallax } from '@/components/Parallax'

const STEPS = [
  {
    num: '01',
    title: 'Audit',
    body: 'We review the brand as it stands: positioning, visuals, messaging, competitors, and every touchpoint your audience already sees.',
    visual: 'https://images.unsplash.com/photo-1681949103006-70066fb25dfe?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  },
  {
    num: '02',
    title: 'Discovery',
    body: 'We define the opportunity. Audience, market, goals, voice, and direction are sharpened before design begins.',
    visual: 'https://images.unsplash.com/photo-1568359415314-7ddb3bd0c828?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  },
  {
    num: '03',
    title: 'Design',
    body: 'We turn the strategy into a working brand system: identity, typography, colour, layouts, assets, and key applications.',
    visual: '/process/erupt.png',
  },
  {
    num: '04',
    title: 'Launch',
    body: 'We prepare the files, guidelines, and rollout support your team needs to use the brand with confidence.',
    visual: '/covers/clean-traces.png',
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
      className="relative overflow-hidden bg-[#141414] text-[#faf9f6]"
    >
      <SectionNumber n={4} className="!text-[#faf9f6]/[0.06]" />

      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-6 md:px-10">

        {/* Sticky left */}
        <div className="col-span-12 md:col-span-5">
          <div className="py-16 md:sticky md:top-32 md:py-24">
            <p className="overline text-[#faf9f6]/60">[ Our Process ]</p>
            <h2 className="display-lg mt-6">
              Four moves.<br />
              <em className="italic accent-orange">One eruption.</em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[#faf9f6]/70">
              A clear path from what the brand is today to the system it needs
              to become. Direct enough to understand. Deep enough to hold up.
            </p>

            {/* Scroll progress bar */}
            <div className="mt-10 h-[3px] w-full bg-[#faf9f6]/15">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
                className="h-full bg-eruption"
              />
            </div>
          </div>
        </div>

        {/* Scrolling right column */}
        <div className="col-span-12 md:col-span-7">
          <div className="flex flex-col gap-14 pb-16 md:gap-48 md:py-32">
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
  return (
    <div className="grid grid-cols-12 gap-4 border-t border-[#faf9f6]/10 pt-8">
      <div className="col-span-2">
        <span className="overline opacity-60">{step.num}</span>
      </div>
      <div className="col-span-10">
        <div className="relative aspect-[5/4] overflow-hidden rounded-sm bg-[#faf9f6]/5">
          <Parallax intensity={40}>
            <Image
              src={step.visual}
              alt={step.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 90vw"
              quality={95}
            />
          </Parallax>
        </div>
        <h3 className="display-lg mt-6 text-[#faf9f6]">
          {step.title}<span className="accent-orange">.</span>
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#faf9f6]/75">
          {step.body}
        </p>
      </div>
    </div>
  )
}
