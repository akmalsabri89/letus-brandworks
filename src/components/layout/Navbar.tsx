'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { NAV_LINKS } from '@/lib/constants'

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isDark = resolvedTheme === 'dark'
  const logoSrc = isDark ? '/brand/logo-white.svg' : '/brand/logo.svg'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'backdrop-blur-xl bg-background/70' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <Link href="/" aria-label="Letus Brandworks home" className="flex items-center gap-3">
            {mounted && (
              <img src={logoSrc} alt="Letus Brandworks" className="h-7 w-auto md:h-8" draggable="false" />
            )}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`overline editorial-link transition-colors ${isActive ? 'accent-orange' : 'text-foreground'}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-accent"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <Sun size={16} />
                    </motion.span>
                  ) : (
                    <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <Moon size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}

            <Link
              href="/contact"
              data-cursor="→ Let's Talk"
              className="hidden rounded-sm bg-eruption px-4 py-2.5 text-white transition-transform hover:-translate-y-0.5 lg:inline-block"
            >
              <span className="overline">Contact</span>
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen((s) => !s)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-background lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="display-md">{link.label}</span>
                      <span className="overline text-muted-foreground">{link.num}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block rounded-sm bg-eruption px-6 py-5 text-center text-white"
              >
                <span className="overline">Start a Project →</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
