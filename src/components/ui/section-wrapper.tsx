import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  id?: string
  as?: 'section' | 'div'
}

export function SectionWrapper({
  children,
  className,
  innerClassName,
  id,
  as: Tag = 'section',
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={cn('w-full px-5 sm:px-8 lg:px-12 py-24 lg:py-32', className)}>
      <div className={cn('max-w-[1200px] mx-auto', innerClassName)}>
        {children}
      </div>
    </Tag>
  )
}
