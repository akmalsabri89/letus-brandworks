'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Parallax } from '@/components/Parallax'

interface SanityImage {
  asset?: { _id: string; url: string }
  hotspot?: object
  crop?: object
}

interface WorkCardProps {
  project: {
    _id: string
    slug: { current: string }
    client: string
    category?: string
    sector?: string
    summary?: string
    excerpt?: string
    coverImage?: SanityImage
    galleryImages?: SanityImage[]
  }
  aspect: string
}

export function WorkCard({ project, aspect }: WorkCardProps) {
  const coverSrc = project.coverImage?.asset?.url ?? null
  const gallerySrcs = (project.galleryImages ?? [])
    .filter((img): img is SanityImage & { asset: { _id: string; url: string } } => !!img?.asset?.url)
    .map(img => img.asset.url)

  const allImages = [coverSrc, ...gallerySrcs].filter((src, i, arr): src is string =>
    src !== null && arr.indexOf(src) === i
  )

  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startCycling() {
    if (allImages.length <= 1) return
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % allImages.length)
    }, 1000)
  }

  function stopCycling() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setActive(0)
  }

  const label = project.sector || project.category || ''

  return (
    <Link
      href={`/works/${project.slug.current}`}
      className="group block break-inside-avoid"
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
    >
      <div className={`relative overflow-hidden rounded-sm ${aspect} bg-muted`}>
        {allImages.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-foreground/10 text-4xl font-display font-medium select-none">
              {project.client}
            </span>
          </div>
        ) : (
          <Parallax intensity={40}>
            <AnimatePresence mode="sync">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={allImages[active]}
                  alt={project.client}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  priority={active === 0}
                  quality={95}
                />
              </motion.div>
            </AnimatePresence>
          </Parallax>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-base font-medium text-foreground leading-snug">
            {project.client}
          </h3>
          {label && (
            <p className="overline text-muted-foreground mt-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {label}
            </p>
          )}
        </div>
        <span className="text-foreground opacity-0 translate-x-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300 text-sm flex-shrink-0 ml-3">
          →
        </span>
      </div>
    </Link>
  )
}
