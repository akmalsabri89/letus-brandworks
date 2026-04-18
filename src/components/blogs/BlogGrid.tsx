'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDate } from '@/utils/formatDate'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  publishedAt?: string
  featured?: boolean
  coverImage?: { asset?: { url: string } }
}

export function BlogGrid({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [active, setActive] = useState(searchParams.get('category') || 'All')

  // Sync state if URL changes externally (e.g., back button)
  useEffect(() => {
    setActive(searchParams.get('category') || 'All')
  }, [searchParams])

  const categories = ['All', ...Array.from(
    new Set(posts.map(p => p.category).filter((c): c is string => !!c))
  )]

  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active)

  // Hero: first featured post in filtered set, or first post
  const heroPost = filtered.find(p => p.featured) ?? filtered[0] ?? null
  const remainingPosts = heroPost ? filtered.filter(p => p._id !== heroPost._id) : []

  function handleFilter(cat: string) {
    setActive(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'All') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    const qs = params.toString()
    router.push(qs ? `?${qs}` : '?', { scroll: false })
  }

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => handleFilter(cat)}
            aria-pressed={active === cat}
            className={`px-4 py-1.5 rounded-sm text-[12px] font-medium font-[family-name:var(--font-inter)] border transition-all duration-150 ${
              active === cat
                ? 'bg-[#f05a28] border-[#f05a28] text-white'
                : 'bg-white border-[#e5e5e5] text-[#1a1a1a]/50 hover:border-[#f05a28]/50 hover:text-[#f05a28]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Live region for screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {active === 'All'
          ? `Showing all ${filtered.length} posts`
          : `Showing ${filtered.length} post${filtered.length !== 1 ? 's' : ''} in ${active}`}
      </div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[#999] font-[family-name:var(--font-inter)] text-sm py-16 text-center"
          >
            No posts in this category yet.
          </motion.p>
        ) : (
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* Hero card */}
            {heroPost && (
              <div className="mb-10">
                <Link href={`/blogs/${heroPost.slug.current}`} className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] rounded-xl overflow-hidden bg-[#f0ede8]">
                    {heroPost.coverImage?.asset?.url ? (
                      <Image
                        src={heroPost.coverImage.asset.url}
                        alt={heroPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        unoptimized
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#f0ede8]" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center py-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {heroPost.category && (
                        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f05a28] font-[family-name:var(--font-inter)]">
                          {heroPost.category}
                        </span>
                      )}
                      {heroPost.publishedAt && (
                        <span className="text-[11px] text-[#bbb] font-[family-name:var(--font-inter)]">
                          {formatDate(heroPost.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h2
                      className="text-2xl lg:text-3xl font-[500] text-[#1a1a1a] leading-tight tracking-tight mb-4 group-hover:text-[#f05a28] transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      {heroPost.title}
                    </h2>
                    {heroPost.excerpt && (
                      <p className="text-[14px] text-[#777] leading-relaxed font-[family-name:var(--font-inter)] mb-5">
                        {heroPost.excerpt}
                      </p>
                    )}
                    <span className="text-[13px] font-medium text-[#f05a28] font-[family-name:var(--font-inter)]">
                      Read article →
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Divider between hero and grid */}
            {heroPost && remainingPosts.length > 0 && (
              <div className="border-t border-[#1a1a1a]/6 mb-10" />
            )}

            {/* Regular grid */}
            {remainingPosts.length > 0 && (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {remainingPosts.map(post => {
                    const src = post.coverImage?.asset?.url ?? null
                    return (
                      <motion.div
                        key={post._id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link href={`/blogs/${post.slug.current}`} className="group block">
                          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#f0ede8] mb-4">
                            {src ? (
                              <Image
                                src={src}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                unoptimized
                              />
                            ) : (
                              <div className="absolute inset-0 bg-[#f0ede8]" />
                            )}
                          </div>
                          <div className="px-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              {post.category && (
                                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f05a28] font-[family-name:var(--font-inter)]">
                                  {post.category}
                                </span>
                              )}
                              {post.publishedAt && (
                                <span className="text-[11px] text-[#bbb] font-[family-name:var(--font-inter)]">
                                  {formatDate(post.publishedAt)}
                                </span>
                              )}
                            </div>
                            <h2 className="font-[family-name:var(--font-unbounded)] text-[15px] font-[500] text-[#1a1a1a] leading-snug mb-2 group-hover:text-[#f05a28] transition-colors duration-200">
                              {post.title}
                            </h2>
                            {post.excerpt && (
                              <p className="text-[13px] text-[#999] leading-relaxed font-[family-name:var(--font-inter)] line-clamp-2">
                                {post.excerpt}
                              </p>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
