'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionNumber } from '@/components/SectionNumber'
import { Parallax } from '@/components/Parallax'

interface Project {
  id: string
  name: string
  category: string
  cover: string | null
  href: string
}

const PROJECTS: Project[] = [
  { id: 'geliga', name: 'Geliga', category: 'Brand Strategy & Identity', cover: '/covers/geliga.png', href: '/works/geliga' },
  { id: 'gullate', name: 'Gullate', category: 'Logo Design', cover: null, href: '/works/gullate' },
  { id: 'vkl-media', name: 'VKL Media', category: 'Brand Identity', cover: '/covers/vkl-media.png', href: '/works/vkl-media' },
  { id: 'clean-traces', name: 'Clean Traces', category: 'Brand Identity', cover: '/covers/clean-traces.png', href: '/works/clean-traces' },
  { id: 'perintis', name: 'Perintis', category: 'Brand Identity', cover: null, href: '/works/perintis' },
]

function Card({ project, index, shouldReduceMotion, aspectClass, covers }: {
  project: Project
  index: number
  shouldReduceMotion: boolean | null
  aspectClass: string
  covers: Record<string, string>
}) {
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: index * 0.08 },
      }

  const coverSrc = covers[project.id] ?? project.cover

  return (
    <motion.div className="group" {...motionProps}>
      <Link href={project.href} className="block">
        <div className={`relative overflow-hidden rounded-sm ${aspectClass} bg-muted`}>
          {coverSrc ? (
            <Parallax intensity={40}>
              <Image
                src={coverSrc}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={95}
              />
            </Parallax>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              <span className="font-display text-4xl font-medium text-foreground/10 select-none">{project.name}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <h3 className="font-display text-base font-medium text-foreground">{project.name}</h3>
          <span className="text-foreground text-sm opacity-0 translate-x-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-3">→</span>
        </div>
        <p className="overline text-muted-foreground mt-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {project.category}
        </p>
      </Link>
    </motion.div>
  )
}

export function SelectedWork({ covers = {} }: { covers?: Record<string, string> }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <SectionNumber n={2} />

      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="overline text-muted-foreground mb-3">Portfolio</p>
            <h2 className="display-md">Selected Work</h2>
          </div>
          <Link href="/works" className="group hidden items-center gap-3 rounded-sm border border-foreground/25 px-5 py-3 text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/60 md:inline-flex">
            <span className="overline">All works</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Row 1 — landscape hero + portrait offset */}
        <div className="grid grid-cols-12 gap-5 mb-5 md:mb-10">
          <div className="col-span-12 md:col-span-7">
            <Card project={PROJECTS[0]} index={0} shouldReduceMotion={shouldReduceMotion} aspectClass="aspect-[4/3]" covers={covers} />
          </div>
          <div className="col-span-12 md:col-span-5 md:mt-16">
            <Card project={PROJECTS[1]} index={1} shouldReduceMotion={shouldReduceMotion} aspectClass="aspect-[3/4]" covers={covers} />
          </div>
        </div>

        {/* Row 2 — square + wide landscape */}
        <div className="grid grid-cols-12 gap-5 mb-5 md:mb-10">
          <div className="col-span-12 md:col-span-5 md:-mt-16">
            <Card project={PROJECTS[2]} index={2} shouldReduceMotion={shouldReduceMotion} aspectClass="aspect-square" covers={covers} />
          </div>
          <div className="col-span-12 md:col-span-7">
            <Card project={PROJECTS[3]} index={3} shouldReduceMotion={shouldReduceMotion} aspectClass="aspect-[16/10]" covers={covers} />
          </div>
        </div>

        {/* Row 3 — centered panoramic close */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <Card project={PROJECTS[4]} index={4} shouldReduceMotion={shouldReduceMotion} aspectClass="aspect-[2/1]" covers={covers} />
          </div>
        </div>
      </div>
    </section>
  )
}
