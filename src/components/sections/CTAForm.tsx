'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { submitLead, type LeadData } from '@/app/actions/submitLead'

const SERVICES = [
  'Brand Strategy',
  'Brand Identity',
  'Web Design',
  'Social Media',
  'Digital Marketing',
  'Other',
]

const STEPS = ['Services', 'Business', 'Contact']

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 32 : -32,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -32 : 32,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  }),
}

const inputClass = "w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#1a1a1a] placeholder-[#bbb] text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#f05a28] transition-colors"

export function CTAForm({ cardBg = '#faf9f6' }: { cardBg?: string }) {
  const shouldReduceMotion = useReducedMotion()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [services, setServices] = useState<string[]>([])
  const [business, setBusiness] = useState('')
  const [industry, setIndustry] = useState('')
  const [brief, setBrief] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  function goTo(next: number) {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  function toggleService(s: string) {
    setServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')
    const data: LeadData = { name, email, whatsapp, services, business, industry, brief }
    const result = await submitLead(data)
    setLoading(false)
    if (result.success) {
      setDone(true)
    } else {
      setError(result.error ?? 'Something went wrong.')
    }
  }

  const canNext = [
    services.length > 0,
    business.trim().length > 0 && industry.trim().length > 0,
    name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  ]

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="rounded-2xl p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)]" style={{ backgroundColor: cardBg }}>

        {done ? (
          <motion.div
            className="text-center py-6"
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="w-14 h-14 bg-[#f05a28]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#f05a28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-unbounded)] text-lg font-[500] text-[#1a1a1a] mb-2">
              You&apos;re on our radar.
            </h3>
            <p className="text-[#777] font-[family-name:var(--font-inter)] text-sm max-w-[280px] mx-auto leading-relaxed">
              We&apos;ll be in touch within 48 hours. Keep an eye on your inbox.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Progress */}
            <div className="mb-7">
              <div className="flex gap-1.5 mb-3">
                {STEPS.map((_, i) => (
                  <div key={i} className="relative flex-1 h-0.5 rounded-full bg-[#e5e5e5] overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#f05a28] rounded-full"
                      initial={false}
                      animate={{ width: i < step ? '100%' : i === step ? '50%' : '0%' }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {STEPS.map((label, i) => (
                  <span
                    key={label}
                    className={`text-[11px] font-[family-name:var(--font-inter)] transition-colors duration-300 ${
                      i === step ? 'text-[#1a1a1a] font-medium' : i < step ? 'text-[#f05a28]' : 'text-[#ccc]'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="relative overflow-hidden min-h-[220px]">
              <AnimatePresence custom={dir} mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    custom={dir}
                    variants={shouldReduceMotion ? {} : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    <p className="text-[#777] font-[family-name:var(--font-inter)] text-sm mb-4 text-center">
                      What do you need?
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {SERVICES.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`px-4 py-2 rounded-full text-[13px] font-[family-name:var(--font-inter)] font-medium border transition-all duration-200 ${
                            services.includes(s)
                              ? 'bg-[#f05a28] border-[#f05a28] text-white'
                              : 'bg-white border-[#e5e5e5] text-[#1a1a1a] hover:border-[#f05a28] hover:text-[#f05a28]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={dir}
                    variants={shouldReduceMotion ? {} : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full space-y-3"
                  >
                    <p className="text-[#777] font-[family-name:var(--font-inter)] text-sm mb-4 text-center">
                      Tell us about your business
                    </p>
                    <input
                      type="text"
                      placeholder="Business name *"
                      value={business}
                      onChange={e => setBusiness(e.target.value)}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      placeholder="Industry *"
                      value={industry}
                      onChange={e => setIndustry(e.target.value)}
                      className={inputClass}
                    />
                    <textarea
                      placeholder="Brief (optional) — what are you trying to achieve?"
                      value={brief}
                      onChange={e => setBrief(e.target.value)}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={dir}
                    variants={shouldReduceMotion ? {} : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full space-y-3"
                  >
                    <p className="text-[#777] font-[family-name:var(--font-inter)] text-sm mb-4 text-center">
                      How do we reach you?
                    </p>
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className={inputClass}
                    />
                    <input
                      type="email"
                      placeholder="Email address *"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={inputClass}
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp number (optional)"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      className={inputClass}
                    />
                    {error && (
                      <p className="text-red-500 text-xs font-[family-name:var(--font-inter)] text-center">{error}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#f0ede8]">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="text-[#999] hover:text-[#1a1a1a] text-sm font-[family-name:var(--font-inter)] transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => goTo(step + 1)}
                  disabled={!canNext[step]}
                  className="bg-[#f05a28] text-white font-[family-name:var(--font-inter)] text-[13px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#d94e20] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canNext[step] || loading}
                  className="bg-[#f05a28] text-white font-[family-name:var(--font-inter)] text-[13px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#d94e20] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Send →'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
