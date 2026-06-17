'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionNumber } from '@/components/SectionNumber'

export interface SanityService {
  _id: string
  name: string
  displayNumber: string
  tagline: string
  shortDescription: string
  fullDescription: string
  chips: string[]
  order: number
}

export function HomeServices({ services }: { services: SanityService[] }) {
  if (services.length === 0) return null

  return (
    <section id="home-services" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-40">
      <SectionNumber n={3} position="right" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-20 grid grid-cols-12 gap-6">
          <p className="overline col-span-12 text-muted-foreground md:col-span-3">
            [ What we do ]
          </p>
          <h2 className="display-lg col-span-12 md:col-span-9">
            Strategy first. Identity second.{' '}
            <em className="italic accent-orange">Everything else flows from there.</em>
          </h2>
        </div>

        <ul className="border-t border-foreground/10">
          {services.map((s, i) => (
            <motion.li
              key={s._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-12 gap-6 border-b border-foreground/10 py-12 md:gap-8 md:py-16"
            >
              <div className="col-span-2 md:col-span-1">
                <span className="overline text-muted-foreground">{s.displayNumber}</span>
              </div>

              <div className="col-span-10 md:col-span-6">
                <h3
                  className="display-md transition-all duration-300 group-hover:italic group-hover:accent-orange"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
                >
                  {s.name}
                </h3>
                <p className="mt-3 text-base accent-orange md:text-lg">
                  {s.tagline}
                </p>
              </div>

              <div className="col-span-12 md:col-span-4">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {s.shortDescription}
                </p>
                {s.chips?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.chips.map((chip) => (
                      <span
                        key={chip}
                        className="overline border border-foreground/15 px-2.5 py-1 text-foreground/70 text-[0.65rem]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <ArrowUpRight
                size={20}
                className="hidden transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:col-span-1 md:block md:justify-self-end"
              />
            </motion.li>
          ))}
        </ul>

        <div className="mt-12">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-sm border border-foreground/25 px-5 py-3 text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/60"
          >
            <span className="overline">All services</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
