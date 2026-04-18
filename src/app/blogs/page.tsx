import { Suspense } from 'react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { BlogGrid } from '@/components/blogs/BlogGrid'

export default async function BlogsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = await client.fetch(postsQuery)

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-white pt-36 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">

          <div className="mb-12">
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
            <Suspense>
              <BlogGrid posts={posts} />
            </Suspense>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
