import { cn } from '@/lib/utils'

const STREAKS = [
  { left: '43%', height: '42%', opacity: 0.35, width: '1px' },
  { left: '47%', height: '60%', opacity: 0.55, width: '1px' },
  { left: '50%', height: '78%', opacity: 0.85, width: '1px' },
  { left: '53%', height: '62%', opacity: 0.50, width: '1px' },
  { left: '57%', height: '38%', opacity: 0.30, width: '1px' },
  { left: '61%', height: '28%', opacity: 0.22, width: '1px' },
  { left: '39%', height: '25%', opacity: 0.20, width: '1px' },
] as const

interface EnergyStreaksProps {
  className?: string
}

export function EnergyStreaks({ className }: EnergyStreaksProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden>
      {STREAKS.map((s, i) => (
        <div
          key={i}
          className="eruption-layer absolute bottom-0"
          style={{
            left: s.left,
            height: s.height,
            width: s.width,
            opacity: s.opacity,
            background: 'linear-gradient(to top, #f05a28, rgba(240,90,40,0.4) 60%, transparent)',
          }}
        />
      ))}
    </div>
  )
}
