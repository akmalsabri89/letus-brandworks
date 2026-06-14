'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function MetaPixelPageView() {
  const pathname = usePathname()
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    window.fbq?.('track', 'PageView')
  }, [pathname])

  return null
}
