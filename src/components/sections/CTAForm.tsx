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
    x: dir > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  }),
}

export function CTAForm() {
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

  if (done) {
    return (
      <motion.div
        className="text-center py-8"
        initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="font-[family-name:var(--font-unbounded)] text-xl font-[500] text-white mb-2">
          You&apos;re on our radar.
        </h3>
        <p className="text-white/70 font-[family-name:var(--font-inter)] text-sm max-w-[320px] mx-auto">
          We&apos;ll be in touch within 1 business day. Keep an eye on your inbox.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-300 ${
                  i < step
                    ? 'bg-white text-[#f05a28]'
                    : i === step
                    ? 'bg-white/20 text-white ring-2 ring-white/50'
                    : 'bg-white/10 text-white/40'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span
                className={`text-[11px] font-[family-name:var(--font-inter)] transition-colors duration-300 ${
                  i === step ? 'text-white' : 'text-white/40'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px transition-colors duration-300 ${i < step ? 'bg-white/50' : 'bg-white/20'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="relative overflow-hidden min-h-[240px]">
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
              <p className="text-white/80 font-[family-name:var(--font-inter)] text-sm mb-4 text-center">
                What do you need?
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SERVICES.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`px-4 py-2 rounded-full text-[13px] font-[family-name:var(--font-inter)] font-medium transition-all duration-200 ${
                      services.includes(s)
                        ? 'bg-white text-[#f05a28]'
                        : 'bg-white/10 text-white hover:bg-white/20'
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
              <p className="text-white/80 font-[family-name:var(--font-inter)] text-sm mb-4 text-center">
                Tell us about your business
              </p>
              <input
                type="text"
                placeholder="Business name *"
                value={business}
                onChange={e => setBusiness(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-white/50 transition-colors"
              />
              <input
                type="text"
                placeholder="Industry *"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-white/50 transition-colors"
              />
              <textarea
                placeholder="Brief (optional) — what are you trying to achieve?"
                value={brief}
                onChange={e => setBrief(e.target.value)}
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-white/50 transition-colors resize-none"
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
              <p className="text-white/80 font-[family-name:var(--font-inter)] text-sm mb-4 text-center">
                How do we reach you?
              </p>
              <input
                type="text"
                placeholder="Your name *"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-white/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Email address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-white/50 transition-colors"
              />
              <input
                type="tel"
                placeholder="WhatsApp number (optional)"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-white/50 transition-colors"
              />
              {error && (
                <p className="text-white/70 text-xs font-[family-name:var(--font-inter)] text-center">{error}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="text-white/60 hover:text-white text-sm font-[family-name:var(--font-inter)] transition-colors"
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
            className="bg-white text-[#f05a28] font-[family-name:var(--font-inter)] text-[13px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#faf9f6] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canNext[step] || loading}
            className="bg-white text-[#f05a28] font-[family-name:var(--font-inter)] text-[13px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#faf9f6] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending…' : 'Send →'}
          </button>
        )}
      </div>
    </div>
  )
}
