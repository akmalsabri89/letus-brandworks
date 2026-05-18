'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDate } from '@/utils/formatDate'
import { Parallax } from '@/components/Parallax'

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

  useEffect(() => {
    setActive(searchParams.get('category') || 'All')
  }, [searchParams])

  const categories = ['All', ...Array.from(
    new Set(posts.map(p => p.category).filter((c): c is string => !!c))
  )]

  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active)
  const heroPost = filtered.find(p => p.featured) ?? filtered[0] ?? null
  const remainingPosts = heroPost ? filtered.filter(p => p._id !== heroPost._id) : []

  function handleFilter(cat: string) {
    setActive(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'All') params.delete('category')
    else params.set('category', cat)
    const qs = params.toString()
    router.push(qs ? `?${qs}` : '?', { scroll: false })
  }

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter by category">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => handleFilter(cat)}
            aria-pressed={active === cat}
            className={`overline px-4 py-2 rounded-sm border transition-all duration-150 ${
              active === cat
                ? 'bg-eruption border-transparent text-white'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

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
            className="overline text-muted-foreground py-16 text-center"
          >
            No posts in this category yet.
          </motion.p>
        ) : (
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* Hero post */}
            {heroPost && (
              <div className="mb-12">
                <Link href={`/blogs/${heroPost.slug.current}`} className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                    {heroPost.coverImage?.asset?.url ? (
                      <Parallax intensity={50}>
                        <Image
                          src={heroPost.coverImage.asset.url}
                          alt={heroPost.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          quality={95}
                          priority
                        />
                      </Parallax>
                    ) : (
                      <div className="absolute inset-0 bg-muted" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {heroPost.category && <span className="overline accent-orange">{heroPost.category}</span>}
                      {heroPost.publishedAt && <span className="overline text-muted-foreground">{formatDate(heroPost.publishedAt)}</span>}
                    </div>
                    <h2 className="display-md mb-4 group-hover:accent-orange transition-colors" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
                      {heroPost.title}
                    </h2>
                    {heroPost.excerpt && (
                      <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-lg">{heroPost.excerpt}</p>
                    )}
                    <span className="overline accent-orange">Read article →</span>
                  </div>
                </Link>
              </div>
            )}

            {heroPost && remainingPosts.length > 0 && (
              <div className="border-t border-foreground/10 mb-12" />
            )}

            {remainingPosts.length > 0 && (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {remainingPosts.map(post => (
                    <motion.div
                      key={post._id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link href={`/blogs/${post.slug.current}`} className="group block">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-muted mb-5">
                          {post.coverImage?.asset?.url ? (
                            <Parallax intensity={40}>
                              <Image
                                src={post.coverImage.asset.url}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                quality={95}
                              />
                            </Parallax>
                          ) : (
                            <div className="absolute inset-0 bg-muted" />
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          {post.category && <span className="overline accent-orange">{post.category}</span>}
                          {post.publishedAt && <span className="overline text-muted-foreground">{formatDate(post.publishedAt)}</span>}
                        </div>
                        <h2 className="font-display text-lg font-medium text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
