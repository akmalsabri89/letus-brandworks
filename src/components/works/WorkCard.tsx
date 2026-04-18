'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'

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
    category: string
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

  return (
    <Link
      href={`/works/${project.slug.current}`}
      className="group block break-inside-avoid"
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
    >
      <div className={`relative overflow-hidden rounded-xl ${aspect} bg-[#1a1a1a]`}>
        {allImages.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/10 text-4xl font-[family-name:var(--font-unbounded)] font-[500]">
              {project.client}
            </span>
          </div>
        ) : (
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
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={active === 0}
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-center justify-between">
          <h3 className="font-[family-name:var(--font-unbounded)] text-[15px] font-[500] text-[#1a1a1a]">
            {project.client}
          </h3>
          <span className="text-[#1a1a1a] text-sm opacity-0 translate-x-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300">
            →
          </span>
        </div>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#999] mt-0.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {project.category}
        </p>
      </div>
    </Link>
  )
}
