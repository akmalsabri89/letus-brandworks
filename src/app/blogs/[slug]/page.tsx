import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postsQuery, relatedCaseStudiesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { BlogSidebar } from '@/components/blogs/BlogSidebar'
import { formatDate } from '@/utils/formatDate'

const SITE_URL = 'https://letusbrandworks.com'

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function generateStaticParams() {
  const posts = await client.fetch(postsQuery)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return posts.filter((p: any) => p?.slug?.current).map((p: any) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post: any = await client.fetch(postBySlugQuery, { slug })
  if (!post) return {}

  const description = post.metaDescription || post.excerpt || ''
  const canonical = post.canonicalUrl || `${SITE_URL}/blogs/${slug}`
  const coverUrl = post.coverImage?.asset?.url

  return {
    title: post.title,
    description,
    alternates: { canonical },
    keywords: post.tags ?? [],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: canonical,
      publishedTime: post.publishedAt,
      ...(coverUrl ? { images: [{ url: coverUrl }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(coverUrl ? { images: [coverUrl] } : {}),
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [post, relatedCaseStudies] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.fetch(postBySlugQuery, { slug }) as Promise<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.fetch(relatedCaseStudiesQuery) as Promise<any[]>,
  ])

  if (!post) notFound()

  const coverSrc = post.coverImage ? urlFor(post.coverImage).width(1400).url() : null

  // Extract H3 headings for table of contents
  const tocItems: { id: string; text: string }[] = (post.content || [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((block: any) => block._type === 'block' && block.style === 'h3')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((block: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const text = (block.children || []).map((c: any) => c.text || '').join('')
      return { id: slugifyHeading(text), text }
    })
    .filter((item: { id: string; text: string }) => item.id && item.text)

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-white">

        {/* Header */}
        <div className="pt-36 pb-12 bg-white border-b border-[#1a1a1a]/8">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="max-w-[760px]">
            <div className="flex flex-wrap items-center gap-2 mb-5">
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

            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-[#1a1a1a]/40 border border-[#1a1a1a]/10 px-3 py-1 rounded-sm font-[family-name:var(--font-inter)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          </div>
        </div>

        {/* Cover image */}
        {coverSrc && (
          <div className="relative w-full aspect-[16/7] overflow-hidden">
            <Image src={coverSrc} alt={post.title} fill className="object-cover" priority unoptimized />
          </div>
        )}

        {/* Two-column content */}
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-start">

            {/* Left: article body */}
            <div className="min-w-0 lg:pr-5 [&>*:first-child]:!mt-0">
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

            {/* Right: sidebar */}
            <BlogSidebar
              tocItems={tocItems}
              relatedCaseStudies={relatedCaseStudies}
            />

          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
