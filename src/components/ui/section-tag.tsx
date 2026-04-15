import { cn } from '@/lib/utils'

interface SectionTagProps {
  children: React.ReactNode
  className?: string
  variant?: 'dark' | 'light' | 'orange'
}

export function SectionTag({ children, className, variant = 'dark' }: SectionTagProps) {
  const variants = {
    dark: 'text-[#1a1a1a]/50 border-[#1a1a1a]/15',
    light: 'text-white/50 border-white/15',
    orange: 'text-[#f05a28] border-[#f05a28]/30',
  }
  return (
    <span
      className={cn(
        'inline-block font-[family-name:var(--font-inter)] text-[10px] font-semibold uppercase tracking-[0.18em] border px-3 py-1.5 rounded-full',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
