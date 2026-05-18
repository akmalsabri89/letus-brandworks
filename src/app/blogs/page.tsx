import type { Metadata } from 'next'
import { Suspense } from 'react'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { BlogGrid } from '@/components/blogs/BlogGrid'
import { SectionNumber } from '@/components/SectionNumber'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thoughts on brand strategy, identity design, and building businesses that stand out.',
}

export default async function BlogsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = await client.fetch(postsQuery)

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <SectionNumber n={5} />

      {/* Header */}
      <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-16 md:px-10">
        <p className="overline text-muted-foreground mb-4">[ Journal ]</p>
        <h1 className="display-lg mb-6 max-w-3xl">The Dispatch</h1>
        <p className="text-base text-muted-foreground max-w-md leading-relaxed">
          Thoughts on brand strategy, identity design, and building businesses that stand out.
        </p>
      </div>

      <div className="border-t border-foreground/10 mx-6 md:mx-10" />

      {/* Posts */}
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10">
        {posts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="overline text-muted-foreground">Posts coming soon.</p>
          </div>
        ) : (
          <Suspense>
            <BlogGrid posts={posts} />
          </Suspense>
        )}
      </div>
    </section>
  )
}
