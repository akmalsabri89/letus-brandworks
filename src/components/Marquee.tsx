'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

interface MarqueeProps {
  /** Children to scroll horizontally. Pass them once — the component handles duplication. */
  children: ReactNode
  /** Total animation duration for one full loop. Default 40s. */
  duration?: string
  /** Pause animation on hover. Default true. */
  pauseOnHover?: boolean
  className?: string
}

/**
 * Auto-looping horizontal marquee. Like Framer's ticker:
 * write content once, the component duplicates internally to create a seamless loop.
 *
 * Measures the original content's width, then renders enough copies to fill viewport
 * plus one extra copy for the seamless snap-back.
 */
export function Marquee({
  children,
  duration = '40s',
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(2)
  const animId = useId().replace(/[:]/g, '')

  useEffect(() => {
    function recalc() {
      if (!measureRef.current) return
      const contentWidth = measureRef.current.scrollWidth
      if (contentWidth === 0) return
      const viewportWidth = window.innerWidth
      // Need at least 2 copies for seamless snap; ensure one copy spans more than viewport
      const minCopies = Math.max(2, Math.ceil((viewportWidth * 2) / contentWidth))
      setCopies(minCopies)
    }
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [children])

  return (
    <div className={`overflow-hidden ${className ?? ''}`} aria-label="Marquee">
      <style>{`
        @keyframes ${animId} {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(calc(-100% / ${copies}), 0, 0); }
        }
        .${animId}-track {
          display: flex;
          width: max-content;
          animation: ${animId} ${duration} linear infinite;
          will-change: transform;
        }
        ${pauseOnHover ? `.${animId}-track:hover { animation-play-state: paused; }` : ''}
        @media (prefers-reduced-motion: reduce) {
          .${animId}-track { animation: none; }
        }
      `}</style>

      {/* Hidden first render to measure children width */}
      <div ref={measureRef} style={{ position: 'absolute', visibility: 'hidden', display: 'flex', pointerEvents: 'none' }} aria-hidden>
        {children}
      </div>

      <div className={`${animId}-track`} role="list">
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} className="flex" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
