'use client'

import { useReducedMotion } from 'framer-motion'

// Replace with actual client SVG logos when available
const CLIENTS = [
  'Client One', 'Client Two', 'Client Three',
  'Client Four', 'Client Five', 'Client Six',
]

export function LogoStrip() {
  const shouldReduce = useReducedMotion()
  const items = [...CLIENTS, ...CLIENTS] // duplicate for seamless loop

  return (
    <section className="bg-[#0f0f0f] border-t border-b border-[#1a1a1a] py-5 overflow-hidden">
      <div className="flex items-center gap-6">
        <p
          className="text-[10px] tracking-[3px] uppercase text-[#333] whitespace-nowrap pl-8 flex-shrink-0"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Trusted by
        </p>

        <div className="overflow-hidden flex-1 relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-12 items-center"
            style={{
              animation: shouldReduce ? 'none' : 'marquee 30s linear infinite',
              width: 'max-content',
            }}
          >
            {items.map((name, i) => (
              <span
                key={i}
                className="text-[13px] font-medium text-white/25 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
