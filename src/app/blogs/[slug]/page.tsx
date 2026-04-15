import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-MY', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export async function generateStaticParams() {
  const posts = await client.fetch(postsQuery)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return posts.filter((p: any) => p?.slug?.current).map((p: any) => ({ slug: p.slug.current }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post: any = await client.fetch(postBySlugQuery, { slug })
  if (!post) notFound()

  const coverSrc = post.coverImage ? urlFor(post.coverImage).width(1400).url() : null

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-[#faf9f6]">

        {/* Header */}
        <div className="pt-36 pb-12 px-5 sm:px-8 lg:px-12 bg-white border-b border-[#1a1a1a]/8">
          <div className="max-w-[760px] mx-auto">
            <div className="flex items-center gap-3 mb-5">
              {post.category && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#f05a28] font-[family-name:var(--font-inter)]">
                  {post.category}
                </span>
              )}
              {post.publishedAt && (
                <span className="text-[11px] text-[#bbb] font-[family-name:var(--font-inter)]">
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </div>
            <h1
              className="text-3xl lg:text-5xl font-[500] text-[#1a1a1a] leading-tight tracking-tight mb-5"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-[#777] leading-relaxed font-[family-name:var(--font-inter)]">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* Cover image */}
        {coverSrc && (
          <div className="relative w-full aspect-[16/7] overflow-hidden">
            <Image src={coverSrc} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Content */}
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-16">
          {post.content?.length > 0 && (
            <PortableTextRenderer content={post.content} />
          )}

          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-4 mt-16 pt-10 border-t border-[#1a1a1a]/8">
              {post.author.photo?.asset && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(post.author.photo).width(96).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-[#1a1a1a] font-[family-name:var(--font-inter)]">
                  {post.author.name}
                </p>
                <p className="text-xs text-[#999] font-[family-name:var(--font-inter)]">Letus Brandworks</p>
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/blogs"
              className="text-sm text-[#999] hover:text-[#1a1a1a] font-[family-name:var(--font-inter)] transition-colors"
            >
              ← Back to Blogs
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
