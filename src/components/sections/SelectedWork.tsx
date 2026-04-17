'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

interface Project {
  id: string
  name: string
  category: string
  cover: string | null
  placeholderColor?: string
  href: string
}

const PROJECTS: Project[] = [
  {
    id: 'geliga',
    name: 'Geliga',
    category: 'Brand Strategy & Identity',
    cover: '/covers/geliga.png',
    href: '/works/geliga',
  },
  {
    id: 'gullate',
    name: 'Gullate',
    category: 'Logo Design',
    cover: null,
    placeholderColor: '#1a1a1a',
    href: '/works/gullate',
  },
  {
    id: 'vkl-media',
    name: 'VKL Media',
    category: 'Brand Identity',
    cover: '/covers/vkl-media.png',
    href: '/works/vkl-media',
  },
  {
    id: 'clean-traces',
    name: 'Clean Traces',
    category: 'Brand Identity',
    cover: '/covers/clean-traces.png',
    href: '/works/clean-traces',
  },
  {
    id: 'perintis',
    name: 'Perintis',
    category: 'Brand Identity',
    cover: null,
    placeholderColor: '#2a2a2a',
    href: '/works/perintis',
  },
]

interface WorkCardProps {
  project: Project
  index: number
  shouldReduceMotion: boolean | null
  aspectClass: string
}

function WorkCard({ project, index, shouldReduceMotion, aspectClass }: WorkCardProps) {
  const motionProps = shouldReduceMotion
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          delay: index * 0.08,
        },
      }

  return (
    <motion.div className="group" {...motionProps}>
      <Link href={project.href} className="block">
        {/* Image block */}
        <div className={`relative overflow-hidden rounded-xl ${aspectClass}`}>
          {project.cover ? (
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{
                backgroundImage: `url(${project.cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ backgroundColor: project.placeholderColor }}
            >
              <span
                className="font-[family-name:var(--font-unbounded)] text-5xl font-[500] select-none"
                style={{ color: 'white', opacity: 0.1 }}
              >
                {project.name}
              </span>
            </div>
          )}
        </div>

        {/* Text below image */}
        <div className="mt-4 px-1">
          <div className="flex items-center justify-between">
            <h3
              className="font-[family-name:var(--font-unbounded)] text-[15px] font-[500] text-[#1a1a1a] leading-snug"
            >
              {project.name}
            </h3>
            <span
              className="text-[#1a1a1a] text-sm translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
            >
              →
            </span>
          </div>
          <p
            className="font-[family-name:var(--font-inter)] text-[13px] text-[#999] mt-0.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            {project.category}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export function SelectedWork() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="bg-white py-24 lg:py-32 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-unbounded)] text-4xl lg:text-5xl font-[500] text-[#1a1a1a] leading-tight tracking-tight">
            Featured Works
          </h2>
        </div>

        {/* Row 1 — large left, smaller right */}
        <div className="grid grid-cols-12 gap-5 mb-5">
          <div className="col-span-12 md:col-span-7">
            <WorkCard
              project={PROJECTS[0]}
              index={0}
              shouldReduceMotion={shouldReduceMotion}
              aspectClass="aspect-[4/3]"
            />
          </div>
          <div className="col-span-12 md:col-span-5">
            <WorkCard
              project={PROJECTS[1]}
              index={1}
              shouldReduceMotion={shouldReduceMotion}
              aspectClass="aspect-[4/3]"
            />
          </div>
        </div>

        {/* Row 2 — smaller left, larger right */}
        <div className="grid grid-cols-12 gap-5 mb-5">
          <div className="col-span-12 md:col-span-5">
            <WorkCard
              project={PROJECTS[2]}
              index={2}
              shouldReduceMotion={shouldReduceMotion}
              aspectClass="aspect-[4/3]"
            />
          </div>
          <div className="col-span-12 md:col-span-7">
            <WorkCard
              project={PROJECTS[3]}
              index={3}
              shouldReduceMotion={shouldReduceMotion}
              aspectClass="aspect-[4/3]"
            />
          </div>
        </div>

        {/* Row 3 — centred wide card */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <WorkCard
              project={PROJECTS[4]}
              index={4}
              shouldReduceMotion={shouldReduceMotion}
              aspectClass="aspect-video"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
