'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TocItem { id: string; text: string }
interface CaseStudy { _id: string; title: string; slug: { current: string }; coverImage?: { asset?: { url: string } } }

export function BlogSidebar({ tocItems, relatedCaseStudies }: { tocItems: TocItem[]; relatedCaseStudies: CaseStudy[] }) {
  const [tocOpen, setTocOpen] = useState(true)

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start space-y-8">
      {tocItems.length > 0 && (
        <div className="overflow-hidden rounded-sm border border-border">
          <button
            type="button"
            onClick={() => setTocOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-3 overline text-foreground hover:bg-accent transition-colors"
            aria-expanded={tocOpen}
          >
            Contents
            <span className="text-muted-foreground text-base leading-none">{tocOpen ? '−' : '+'}</span>
          </button>
          <div className="overflow-hidden transition-all duration-200" style={{ maxHeight: tocOpen ? '600px' : '0' }}>
            <nav className="px-4 pb-4 pt-1 space-y-1" aria-label="Table of contents">
              {tocItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
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
          <p className="overline text-muted-foreground mb-4">Related Work</p>
          <div className="space-y-4">
            {relatedCaseStudies.map(cs => (
              <Link key={cs._id} href={`/works/${cs.slug.current}`} className="group flex items-center gap-3">
                {cs.coverImage?.asset?.url ? (
                  <div className="relative w-14 h-14 overflow-hidden rounded-sm flex-shrink-0 bg-muted">
                    <Image
                      src={cs.coverImage.asset.url}
                      alt={cs.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      sizes="56px"
                      quality={85}
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-sm bg-muted flex-shrink-0" />
                )}
                <p className="font-display text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
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
