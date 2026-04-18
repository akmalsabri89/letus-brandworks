'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TocItem {
  id: string
  text: string
}

interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  coverImage?: { asset?: { url: string } }
}

interface BlogSidebarProps {
  tocItems: TocItem[]
  relatedCaseStudies: CaseStudy[]
}

export function BlogSidebar({ tocItems, relatedCaseStudies }: BlogSidebarProps) {
  const [tocOpen, setTocOpen] = useState(true)

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start space-y-8">
      {tocItems.length > 0 && (
        <div className="rounded-sm overflow-hidden bg-[#faf9f6]">
          <button
            type="button"
            onClick={() => setTocOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] font-[family-name:var(--font-inter)] hover:bg-[#f2f1ee] transition-colors duration-150"
            aria-expanded={tocOpen}
          >
            Table of Contents
            <span className="text-[#bbb] text-base leading-none">{tocOpen ? '−' : '+'}</span>
          </button>
          <div
            className="overflow-hidden transition-all duration-200"
            style={{ maxHeight: tocOpen ? '600px' : '0' }}
          >
            <nav className="px-4 pb-4 pt-1 space-y-1" aria-label="Table of contents">
              {tocItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-[12px] text-[#777] hover:text-[#f05a28] font-[family-name:var(--font-inter)] leading-snug transition-colors duration-150 py-1"
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {relatedCaseStudies.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a]/50 font-[family-name:var(--font-inter)] mb-4">
            Related Work
          </p>
          <div className="space-y-5">
            {relatedCaseStudies.map(cs => (
              <Link
                key={cs._id}
                href={`/works/${cs.slug.current}`}
                className="group flex items-center gap-3"
              >
                {cs.coverImage?.asset?.url ? (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#f0ede8]">
                    <Image
                      src={cs.coverImage.asset.url}
                      alt={cs.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-[#f0ede8] flex-shrink-0" />
                )}
                <p className="text-[12px] font-[500] text-[#1a1a1a] group-hover:text-[#f05a28] transition-colors duration-150 font-[family-name:var(--font-unbounded)] leading-snug">
                  {cs.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
