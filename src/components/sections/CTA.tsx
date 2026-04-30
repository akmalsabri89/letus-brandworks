import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/animated-section'
import { EruptionGlow } from '@/components/ui/eruption-glow'
import { EnergyStreaks } from '@/components/ui/energy-streaks'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0000] to-[#1a0500] py-36 px-5 sm:px-8 lg:px-12">

      {/* More intense eruption than the hero */}
      <EruptionGlow intensity={1.3} wide className="opacity-90" />
      <EnergyStreaks />

      {/* Dark fade to contain glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-transparent to-[#0a0000] opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto text-center">
        <AnimatedSection>
          <p
            className="text-[10px] tracking-[3px] uppercase text-[#f05a28] mb-6"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Ready to ignite?
          </p>
          <h2
            className="text-[length:var(--text-section)] font-[900] text-white leading-tight tracking-[var(--letter-hero)] mb-10 max-w-[640px] mx-auto"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Let's Build Something That Lasts.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center bg-[#f05a28] text-white text-[14px] font-semibold px-10 py-4 rounded-full hover:bg-[#d94e20] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Start a Project →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
