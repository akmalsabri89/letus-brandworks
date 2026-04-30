import { cn } from '@/lib/utils'

interface EruptionGlowProps {
  intensity?: number  // 0–1, scales all opacity values
  className?: string
  wide?: boolean      // wider atmospheric spread for CTA section
}

export function EruptionGlow({ intensity = 1, className, wide = false }: EruptionGlowProps) {
  const w = wide ? '140%' : '110%'

  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden>
      {/* Atmospheric haze — widest, most blurred */}
      <div
        className="eruption-layer absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: w,
          height: '70%',
          background: `radial-gradient(ellipse at 50% 100%,
            rgba(139,34,0,${0.3 * intensity}) 0%,
            transparent 65%)`,
          filter: 'blur(48px)',
        }}
      />
      {/* Ember mid-ring */}
      <div
        className="eruption-layer absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '80%',
          height: '55%',
          background: `radial-gradient(ellipse at 50% 100%,
            rgba(139,34,0,${0.55 * intensity}) 0%,
            rgba(240,90,40,${0.22 * intensity}) 30%,
            transparent 65%)`,
          filter: 'blur(28px)',
        }}
      />
      {/* Bright orange core */}
      <div
        className="eruption-layer absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '45%',
          height: '40%',
          background: `radial-gradient(ellipse at 50% 100%,
            rgba(240,90,40,${0.85 * intensity}) 0%,
            rgba(139,34,0,${0.45 * intensity}) 40%,
            transparent 70%)`,
          filter: 'blur(14px)',
        }}
      />
    </div>
  )
}
