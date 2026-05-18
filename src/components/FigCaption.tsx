interface FigCaptionProps {
  n: number
  children: React.ReactNode
  className?: string
}

export function FigCaption({ n, children, className = '' }: FigCaptionProps) {
  return (
    <figcaption className={`overline mt-3 flex items-baseline gap-2 text-muted-foreground ${className}`}>
      <span className="accent-orange">Fig. {String(n).padStart(2, '0')}</span>
      <span className="hidden sm:inline">—</span>
      <span>{children}</span>
    </figcaption>
  )
}
