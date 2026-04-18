'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { submitLead } from '@/app/actions/submitLead'

const SERVICES = [
  'Brand Strategy',
  'Brand Identity',
  'Web Design',
  'Digital Marketing',
  'Social Media',
  'Graphic Design',
]

type FieldErrors = { name?: boolean; email?: boolean; brief?: boolean }

function getFieldErrors(name: string, email: string, brief: string): FieldErrors {
  const errs: FieldErrors = {}
  if (!name.trim()) errs.name = true
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = true
  if (!brief.trim()) errs.brief = true
  return errs
}

function firstMessage(errs: FieldErrors, email: string): string | null {
  if (errs.name) return 'Your name is missing.'
  if (errs.email) return email.trim() ? "That email doesn't look right." : 'An email address is required.'
  if (errs.brief) return 'Tell us a bit about what you need.'
  return null
}

export function CTAForm({ dark = false }: { dark?: boolean }) {
  const shouldReduceMotion = useReducedMotion()
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [brief, setBrief] = useState('')
  const [services, setServices] = useState<string[]>([])

  function toggleService(s: string) {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = getFieldErrors(name, email, brief)
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setServerError(null)
    setLoading(true)
    const result = await submitLead({ name, email, services, brief })
    setLoading(false)
    if (result.success) {
      setDone(true)
    } else {
      setServerError(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  // Base input style without border — border applied per-field based on error state
  const inputBase = [
    'w-full rounded-lg px-5 py-3.5 text-[14px] font-[family-name:var(--font-inter)]',
    'focus:outline-none transition-colors duration-200 border',
    dark
      ? 'bg-[#faf9f6] text-[#1a1a1a] placeholder-[#999]'
      : 'bg-white text-[#1a1a1a] placeholder-[#bbb]',
  ].join(' ')

  function inputClass(hasError: boolean) {
    if (hasError) return `${inputBase} border-red-400 focus:border-red-500`
    return `${inputBase} ${dark ? 'border-transparent focus:border-[#f05a28]' : 'border-[#e5e5e5] focus:border-[#f05a28]'}`
  }

  const chipClass = (selected: boolean) => [
    'px-3.5 py-1.5 rounded-sm text-[12px] font-medium border transition-all duration-150',
    'font-[family-name:var(--font-inter)]',
    selected
      ? 'bg-[#f05a28] border-[#f05a28] text-white'
      : dark
        ? 'bg-[#faf9f6] border-transparent text-[#1a1a1a]/50 hover:border-[#f05a28]/50 hover:text-[#f05a28]'
        : 'bg-white border-[#e5e5e5] text-[#1a1a1a]/50 hover:border-[#f05a28]/50 hover:text-[#f05a28]',
  ].join(' ')

  const alertClass = dark
    ? 'border border-[#f05a28]/30 bg-[#f05a28]/10 rounded-lg px-4 py-3 text-[13px] text-[#ff8060] font-[family-name:var(--font-inter)] leading-snug'
    : 'border border-[#f05a28]/40 bg-[#f05a28]/[0.06] rounded-lg px-4 py-3 text-[13px] text-[#c04010] font-[family-name:var(--font-inter)] leading-snug'

  const errorMessage = serverError ?? firstMessage(fieldErrors, email)

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="success"
            className="text-center py-10"
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="w-14 h-14 bg-[#f05a28]/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#f05a28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={`text-lg font-[500] mb-2 font-[family-name:var(--font-unbounded)] ${dark ? 'text-white' : 'text-[#1a1a1a]'}`}>
              You&apos;re on our radar.
            </h3>
            <p className={`text-sm max-w-[260px] mx-auto leading-relaxed font-[family-name:var(--font-inter)] ${dark ? 'text-white/50' : 'text-[#777]'}`}>
              We&apos;ll be in touch within 48 hours. Keep an eye on your inbox.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={false}
            className="flex flex-col gap-5"
          >
            {/* Error banner */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={alertClass}
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name */}
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={e => { setName(e.target.value); setFieldErrors(prev => ({ ...prev, name: false })) }}
              placeholder="Your name"
              className={inputClass(!!fieldErrors.name)}
            />

            {/* Email */}
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: false })) }}
              placeholder="email@company.com"
              className={inputClass(!!fieldErrors.email)}
            />

            {/* Services */}
            <div className="flex flex-wrap justify-center gap-2 py-1">
              {SERVICES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleService(s)}
                  className={chipClass(services.includes(s))}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Brief */}
            <textarea
              value={brief}
              onChange={e => { setBrief(e.target.value); setFieldErrors(prev => ({ ...prev, brief: false })) }}
              placeholder="What are you trying to build? Even rough notes are a great start."
              rows={5}
              className={`${inputClass(!!fieldErrors.brief)} resize-none`}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f05a28] text-white font-[family-name:var(--font-inter)] text-[13px] font-semibold py-3.5 rounded-full hover:bg-[#d94e20] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Sending…
                </>
              ) : (
                'Send →'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
