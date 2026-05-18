'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Service {
  num: string
  name: string
  tagline: string
  chips: string[]
  description: string
}

export function ServicesAccordion({ services }: { services: Service[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <ul className="border-t border-foreground/10">
      {services.map((s, i) => {
        const isOpen = openIndex === i

        return (
          <li key={s.num} className="border-b border-foreground/10">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`service-panel-${i}`}
              data-cursor={isOpen ? '→ Collapse' : '→ Expand'}
              className="group w-full grid grid-cols-12 gap-6 md:gap-8 py-10 md:py-14 px-4 md:px-8 text-left transition-colors hover:bg-foreground/[0.025]"
            >
              <div className="col-span-2 md:col-span-1 flex items-center md:justify-center">
                <span
                  className={`overline inline-block origin-center transition-all duration-300 ease-out ${
                    isOpen
                      ? 'scale-[1.15] accent-orange'
                      : 'text-muted-foreground group-hover:scale-[1.15] group-hover:accent-orange'
                  }`}
                  style={s.num === '+' ? { fontSize: '1rem', lineHeight: 1 } : undefined}
                >
                  {s.num}
                </span>
              </div>

              <div className="col-span-10 md:col-span-5 lg:col-span-4">
                <h3
                  className={`display-md transition-colors ${
                    isOpen ? 'italic accent-orange' : 'text-foreground'
                  }`}
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
                >
                  {s.name}
                </h3>
                <p className="overline text-muted-foreground mt-3">{s.tagline}</p>
              </div>

              <div className="col-span-12 md:col-span-5 lg:col-span-6 flex items-start md:items-center">
                <div className="flex flex-wrap gap-2">
                  {s.chips.map((chip) => (
                    <span
                      key={chip}
                      className="overline border border-foreground/15 px-2.5 py-1 text-foreground/70 text-[0.65rem]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden md:col-span-1 md:flex md:justify-self-end md:items-center md:justify-center">
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-flex transition-colors ${
                    isOpen ? 'accent-orange' : 'text-muted-foreground'
                  }`}
                >
                  <ChevronDown size={20} />
                </motion.span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`service-panel-${i}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-12 gap-6 md:gap-8 pb-12 md:pb-16">
                    <div className="col-span-12 md:col-start-2 md:col-span-9 lg:col-start-2 lg:col-span-7">
                      <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
