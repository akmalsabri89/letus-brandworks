'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const PAGE_INDEX: Record<string, string> = {
  '/': '01',
  '/works': '02',
  '/services': '03',
  '/about': '04',
  '/blogs': '05',
  '/contact': '06',
}

function getLocalTime() {
  const d = new Date()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')

  const offsetMin = -d.getTimezoneOffset()
  const sign = offsetMin >= 0 ? '+' : '-'
  const absMin = Math.abs(offsetMin)
  const oh = Math.floor(absMin / 60)
  const om = absMin % 60
  const offset = om === 0 ? `UTC${sign}${oh}` : `UTC${sign}${oh}:${String(om).padStart(2, '0')}`

  return { time: `${hh}:${mm}`, offset }
}

export function FooterTicker() {
  const pathname = usePathname()
  const [clock, setClock] = useState<{ time: string; offset: string }>({ time: '--:--', offset: 'UTC' })

  useEffect(() => {
    setClock(getLocalTime())
    const i = setInterval(() => setClock(getLocalTime()), 30000)
    return () => clearInterval(i)
  }, [])

  const idx =
    PAGE_INDEX[pathname] ||
    (pathname.startsWith('/works') ? '02' : pathname.startsWith('/blogs') ? '05' : '00')

  return (
    <div className="border-y border-foreground/10 py-3">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-6 gap-y-1 px-6 text-muted-foreground md:px-10">
        <span className="overline"><span className="accent-orange">●</span> Live</span>
        <span className="overline">Loc: SOL · III</span>
        <span className="overline">Time: {clock.time} · {clock.offset}</span>
        <span className="overline">Index: {idx}/06</span>
        <span className="overline ml-auto hidden md:inline">v2 · Letus.002</span>
      </div>
    </div>
  )
}
