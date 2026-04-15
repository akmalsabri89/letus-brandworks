import Link from 'next/link'
import Image from 'next/image'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-MY', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default async function BlogsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = await client.fetch(postsQuery)

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-white pt-36 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">

          <div className="mb-16">
            <h1
              className="text-4xl lg:text-5xl font-[500] text-[#1a1a1a] leading-tight tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Blogs
            </h1>
            <p className="text-base text-[#777] max-w-[440px]" style={{ fontFamily: 'var(--font-inter)' }}>
              Thoughts on brand strategy, identity design, and building businesses that stand out.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#999] font-[family-name:var(--font-inter)] text-sm">
                Posts coming soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const src = post.coverImage ? urlFor(post.coverImage).width(720).url() : null
                return (
                  <Link key={post._id} href={`/blogs/${post.slug.current}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#f0ede8] mb-4">
                      {src ? (
                        <Image
                          src={src}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#f0ede8]" />
                      )}
                    </div>
                    <div className="px-1">
                      <div className="flex items-center gap-3 mb-2">
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
                )
              })}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
