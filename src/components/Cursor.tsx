'use client'

import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ringInnerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEnabled(true)
    document.body.classList.add('has-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    const move = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px,${my}px,0)`
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      const interactive = t.closest('a,button,[role="button"],.cursor-hover,input,textarea')
      if (interactive) {
        ringInnerRef.current?.classList.add('cursor-active')
        dotRef.current?.classList.add('cursor-dot-hidden')
        const labelEl = t.closest('[data-cursor]')
        if (labelEl) setLabel(labelEl.getAttribute('data-cursor') || '')
      }
    }

    const onOut = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest?.('a,button,[role="button"],.cursor-hover,input,textarea')) {
        ringInnerRef.current?.classList.remove('cursor-active')
        dotRef.current?.classList.remove('cursor-dot-hidden')
        setLabel('')
      }
    }

    let rafId: number
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (wrapRef.current) wrapRef.current.style.transform = `translate3d(${rx}px,${ry}px,0)`
      if (labelRef.current) labelRef.current.style.transform = `translate3d(${rx + 24}px,${ry + 8}px,0)`
      rafId = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[10000] h-[6px] w-[6px] rounded-full"
        style={{ willChange: 'transform', marginLeft: -3, marginTop: -3 }}
      />
      <div
        ref={wrapRef}
        className="cursor-ring-wrap pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ willChange: 'transform' }}
      >
        <div ref={ringInnerRef} className="cursor-ring rounded-full" style={{ width: 32, height: 32, marginLeft: -16, marginTop: -16 }} />
      </div>
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] whitespace-nowrap px-2 py-1 text-xs"
        style={{
          willChange: 'transform, opacity',
          opacity: label ? 1 : 0,
          transition: 'opacity 0.2s',
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          letterSpacing: '0.05em',
          color: '#fff',
          background: '#f05a28',
        }}
      >
        {label}
      </div>
      <style>{`
        .cursor-dot { background:#ffffff; mix-blend-mode:difference; }
        .cursor-ring-wrap { mix-blend-mode:difference; }
        .cursor-ring {
          border:1px solid #ffffff; background-color:transparent;
          transform-origin:center center; transform:scale(1);
          transition:transform .3s cubic-bezier(.22,1,.36,1),background-color .3s;
        }
        .cursor-ring.cursor-active {
          background-color:#ffffff; transform:scale(0.5);
        }
        .cursor-dot-hidden { opacity:0 !important; }
      `}</style>
    </>
  )
}
