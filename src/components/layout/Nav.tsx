'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const navLinks = [
  { label: 'Works', href: '/works' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Go charcoal when a [data-nav-dark] section is in the viewport
  useEffect(() => {
    const el = document.querySelector('[data-nav-dark]')
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setIsDark(entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const entranceVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }

  const drawerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
      transition: { duration: 0.2, ease: 'easeIn' as const },
    },
  }

  return (
    <motion.header
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[1200px]"
      variants={entranceVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Pill nav */}
      <nav
        className={`relative flex items-center justify-between px-4 py-2.5 rounded-full backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.10)] transition-colors duration-300 ${
          isDark
            ? 'bg-[#1a1a1a]/90 border-white/10'
            : 'bg-white/70 border-white/25'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.04,
          }}
        />

        {/* Logo */}
        <Link href="/" className="relative flex-shrink-0 flex items-center">
          <Image
            src={isDark ? '/brand/logo-white.svg' : '/brand/logo.svg'}
            alt="Letus"
            width={80}
            height={24}
            priority
            className="transition-opacity duration-300"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[13px] font-medium transition-colors px-3 py-1.5 ${
                  isDark
                    ? 'text-white/60 hover:text-white'
                    : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center bg-[#f05a28] text-white text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#d94e20] transition-colors duration-300 relative"
        >
          Contact
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden relative flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] transition-all duration-200 ${
              isDark ? 'bg-white' : 'bg-[#1a1a1a]'
            } ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`}
          />
          <span
            className={`block w-5 h-[1.5px] transition-all duration-200 ${
              isDark ? 'bg-white' : 'bg-[#1a1a1a]'
            } ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-[1.5px] transition-all duration-200 ${
              isDark ? 'bg-white' : 'bg-[#1a1a1a]'
            } ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`md:hidden mt-2 rounded-2xl backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden transition-colors duration-300 ${
              isDark
                ? 'bg-[#1a1a1a]/95 border-white/10'
                : 'bg-white/90 border-white/30'
            }`}
          >
            <ul className="flex flex-col py-2" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-5 py-3 text-[14px] font-medium transition-colors ${
                      isDark
                        ? 'text-white/60 hover:text-white hover:bg-white/5'
                        : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-black/[0.03]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-4 pt-2 pb-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center bg-[#f05a28] text-white text-[13px] font-semibold px-4 py-2.5 rounded-full hover:bg-[#d94e20] transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
