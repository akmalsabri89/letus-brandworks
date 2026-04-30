'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { easing } from '@/lib/tokens'

interface WorkCardProps {
  title: string
  category: string
  slug: string
  imageUrl?: string
  index: number
}

export function WorkCard({ title, category, slug, imageUrl, index }: WorkCardProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      whileHover={shouldReduce ? {} : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative rounded-[10px] overflow-hidden bg-[#1e1e1e] border border-[#222] cursor-pointer"
    >
      <Link href={`/works/${slug}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#161616]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading={index < 2 ? 'eager' : 'lazy'}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e1e] to-[#141414]" />
          )}

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent opacity-60" />
        </div>

        {/* Edge glow — only visible on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          aria-hidden
        >
          {/* Bottom edge gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f05a28] to-transparent" />
          {/* Radial glow rising from bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full"
            style={{
              height: '80px',
              background: 'radial-gradient(ellipse at 50% 100%, rgba(240,90,40,0.25) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        </div>

        {/* Orange border on hover */}
        <div className="absolute inset-0 rounded-[10px] border border-[#f05a28] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

        {/* Meta */}
        <div className="px-4 pb-4 pt-3">
          <h3
            className="text-[15px] font-[700] text-white leading-tight tracking-tight group-hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {title}
          </h3>
          <p
            className="text-[11px] text-[#f05a28] mt-1 tracking-[1px] uppercase"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {category}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
