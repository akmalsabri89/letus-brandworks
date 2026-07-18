'use client'

import { useEffect } from 'react'

type Fbq = (...args: unknown[]) => void

declare global {
  interface Window {
    fbq?: Fbq
  }
}

const campaignDefaults = {
  utm_source: 'letus_site',
  utm_medium: 'landing_page',
  utm_campaign: 'no_fluff_brand_audit',
}

function trackedCheckoutUrl(checkoutUrl: string) {
  const url = new URL(checkoutUrl)
  const current = new URL(window.location.href)

  Object.entries(campaignDefaults).forEach(([key, value]) => {
    url.searchParams.set(key, current.searchParams.get(key) || value)
  })

  const content = current.searchParams.get('utm_content')
  const term = current.searchParams.get('utm_term')
  if (content) url.searchParams.set('utm_content', content)
  if (term) url.searchParams.set('utm_term', term)

  return url.toString()
}

function track(event: string, data?: Record<string, string>) {
  window.fbq?.('trackCustom', event, data)
}

export function CheckoutButton({
  checkoutUrl,
  placement,
  className = '',
  pending = 'anchor',
}: {
  checkoutUrl?: string
  placement: string
  className?: string
  pending?: 'anchor' | 'disabled'
}) {
  const label = 'Get the audit for $29'

  if (!checkoutUrl && pending === 'disabled') {
    return (
      <span
        aria-disabled="true"
        className={`inline-flex cursor-not-allowed items-center justify-center whitespace-nowrap rounded-sm border border-black/15 bg-black/8 px-6 py-4 text-sm font-semibold text-black/48 ${className}`}
      >
        Checkout link pending
      </span>
    )
  }

  return (
    <a
      href={checkoutUrl || '#buy'}
      target={checkoutUrl ? '_blank' : undefined}
      rel={checkoutUrl ? 'noreferrer' : undefined}
      onClick={event => {
        track('NoFluffCheckoutClick', {
          content_name: 'The No-Fluff Brand Audit',
          placement,
        })
        window.fbq?.('track', 'InitiateCheckout', {
          content_name: 'The No-Fluff Brand Audit',
          content_type: 'product',
          currency: 'USD',
          value: '29',
        })

        if (checkoutUrl) {
          event.currentTarget.href = trackedCheckoutUrl(checkoutUrl)
        }
      }}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-[#f05a28] px-6 py-4 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-[#d94e20] active:translate-y-px ${className}`}
    >
      {label}
    </a>
  )
}

export function PreviewLink({
  href,
  label,
  placement,
  className = '',
}: {
  href: string
  label: string
  placement: string
  className?: string
}) {
  return (
    <a
      href={href}
      onClick={() =>
        track('NoFluffPreviewClick', {
          content_name: 'The No-Fluff Brand Audit',
          placement,
        })
      }
      className={className}
    >
      {label}
    </a>
  )
}

export function NoFluffAnalytics() {
  useEffect(() => {
    const seen = new Set<string>()
    const elements = document.querySelectorAll<HTMLElement>('[data-scroll-depth]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const depth = (entry.target as HTMLElement).dataset.scrollDepth
          if (!depth || seen.has(depth)) return
          seen.add(depth)
          track('NoFluffScrollDepth', {
            content_name: 'The No-Fluff Brand Audit',
            depth,
          })
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return null
}
