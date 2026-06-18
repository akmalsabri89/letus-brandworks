import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { sanityFetch } from '@/sanity/lib/live'
import { postBySlugQuery, postsQuery, sidebarCaseStudiesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { BlogSidebar } from '@/components/blogs/BlogSidebar'
import { Parallax } from '@/components/Parallax'
import { formatDate } from '@/utils/formatDate'
import { SITE_URL } from '@/lib/constants'

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = await client.fetch(postsQuery)
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
      title: post.title, description, type: 'article',
      url: canonical, publishedTime: post.publishedAt,
      ...(coverUrl ? { images: [{ url: coverUrl }] } : {}),
    },
    twitter: {
      card: 'summary_large_image', title: post.title, description,
      ...(coverUrl ? { images: [coverUrl] } : {}),
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: post } = await sanityFetch({ query: postBySlugQuery, params: { slug } })
  if (!post) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allTags = [...((post as any).tags ?? []), ...((post as any).customTags ?? [])]
  const { data: relatedCaseStudies } = await sanityFetch({
    query: sidebarCaseStudiesQuery,
    params: { tags: allTags },
  })

  const coverSrc = post.coverImage ? urlFor(post.coverImage).width(1400).url() : null

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
      {/* Header */}
      <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-12 md:px-10 border-b border-foreground/10">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.category && <span className="overline accent-orange">{post.category}</span>}
            {post.publishedAt && <span className="overline text-muted-foreground">{formatDate(post.publishedAt)}</span>}
          </div>
          <h1 className="display-md mb-6">{post.title}</h1>
          {post.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
          )}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag: string) => (
                <span key={tag} className="overline text-muted-foreground border border-border px-3 py-1 text-[0.6rem]">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cover image */}
      {coverSrc && (
        <div className="relative w-full aspect-[16/7] overflow-hidden">
          <Parallax intensity={80}>
            <Image src={coverSrc} alt={post.title} fill className="object-cover" priority sizes="100vw" quality={95} />
          </Parallax>
        </div>
      )}

      {/* Two-column content */}
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">

          {/* Article body */}
          <div className="min-w-0">
            {post.content?.length > 0 && (
              <PortableTextRenderer content={post.content} />
            )}

            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-4 mt-16 pt-10 border-t border-foreground/10">
                {post.author.photo?.asset && (
                  <div className="relative w-12 h-12 overflow-hidden rounded-sm flex-shrink-0">
                    <Image
                      src={urlFor(post.author.photo).width(96).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                      quality={95}
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium text-foreground text-sm">{post.author.name}</p>
                  <p className="overline text-muted-foreground">Letus Brandworks</p>
                </div>
              </div>
            )}

            <div className="mt-10">
              <Link href="/blogs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
                <ArrowLeft size={14} />
                <span className="overline">Back to Journal</span>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <BlogSidebar tocItems={tocItems} relatedCaseStudies={relatedCaseStudies} />
        </div>
      </div>
    </>
  )
}
