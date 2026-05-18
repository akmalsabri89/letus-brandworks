'use client'

import { useEffect, useState } from 'react'

interface Chapter {
  id: string
  label: string
}

export function ChapterIndex({ chapters = [] }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id)

  useEffect(() => {
    let raf = 0
    let ticking = false

    const compute = () => {
      const targetY = window.innerHeight * 0.4
      let bestId = chapters[0]?.id
      for (const c of chapters) {
        const el = document.getElementById(c.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top - targetY <= 0) bestId = c.id
        else break
      }
      setActive(bestId)
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [chapters])

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
      style={{ mixBlendMode: 'difference', color: '#ffffff' }}
    >
      <ul className="flex flex-col gap-3">
        {chapters.map((c, i) => {
          const isActive = c.id === active
          return (
            <li
              key={c.id}
              className="flex items-center gap-3 transition-opacity"
              style={{ opacity: isActive ? 1 : 0.4 }}
            >
              <span
                className={`block h-px transition-all ${isActive ? 'w-8' : 'w-3'}`}
                style={{ background: isActive ? '#f05a28' : 'currentColor' }}
              />
              <span className="overline tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="overline">{c.label}</span>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
