import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { caseStudyBySlugQuery, caseStudiesQuery, relatedCaseStudiesQuery } from '@/sanity/lib/queries'
import { WorkCard } from '@/components/works/WorkCard'
import { Parallax } from '@/components/Parallax'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { SITE_URL } from '@/lib/constants'

export async function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects: any[] = await client.fetch(caseStudiesQuery)
  return projects.filter((p: any) => p?.slug?.current).map((p: any) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const project: any = await client.fetch(caseStudyBySlugQuery, { slug })
  if (!project) return {}
  return {
    title: project.title,
    description: project.excerpt || '',
    openGraph: {
      title: project.title,
      description: project.excerpt || '',
      url: `${SITE_URL}/works/${slug}`,
      ...(project.coverImage?.asset?.url ? { images: [{ url: project.coverImage.asset.url }] } : {}),
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [project, related] = await Promise.all([
    client.fetch(caseStudyBySlugQuery, { slug }),
    client.fetch(relatedCaseStudiesQuery, { slug }),
  ])
  if (!project) notFound()

  const coverSrc: string | null = project.coverImage?.asset?.url ?? null
  const stats = project.stats ?? []

  return (
    <>
      {/* Full-viewport hero image */}
      <div className="relative w-full h-[60vh] md:h-dvh overflow-hidden">
        {coverSrc ? (
          <Parallax intensity={100}>
            <Image src={coverSrc} alt={project.client} fill className="object-cover" priority sizes="100vw" quality={95} />
          </Parallax>
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-6 md:left-10">
          <p className="overline text-white/60 mb-2">{project.category}</p>
          <h1 className="display-lg text-white max-w-2xl">{project.title}</h1>
        </div>
      </div>

      {/* Project overview */}
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">

        <Link href="/works" className="mb-12 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
          <ArrowLeft size={14} />
          <span className="overline">Works</span>
        </Link>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 mb-16 border-y border-foreground/10 py-10">
          <div>
            <p className="overline text-muted-foreground mb-2">Client</p>
            <p className="text-foreground font-medium">{project.client}</p>
          </div>
          {project.year && (
            <div>
              <p className="overline text-muted-foreground mb-2">Year</p>
              <p className="text-foreground font-medium">{project.year}</p>
            </div>
          )}
          <div>
            <p className="overline text-muted-foreground mb-2">Scope</p>
            <p className="text-foreground font-medium">{project.category}</p>
          </div>
        </div>

        {/* Excerpt */}
        {project.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-16">
            {project.excerpt}
          </p>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="border-t border-foreground/10 pt-16 mb-20">
            <p className="overline text-muted-foreground mb-10">Results</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s: { value: string; label: string }) => (
                <div key={s.label}>
                  <p className="display-md accent-orange mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>{s.value}</p>
                  <p className="overline text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rich text content */}
        {project.content?.length > 0 && (
          <div className="border-t border-foreground/10 pt-16 mb-20">
            <PortableTextRenderer content={project.content} />
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="border-t border-foreground/10 mx-6 md:mx-10" />
      )}
      {related.length > 0 && (
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10">
          <p className="overline text-muted-foreground mb-10">More Work</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {related.map((p: any) => (
              <WorkCard key={p._id} project={p} aspect="aspect-[4/3]" />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
