import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { caseStudyBySlugQuery, caseStudiesQuery, relatedCaseStudiesQuery } from '@/sanity/lib/queries'
import { WorkCard } from '@/components/works/WorkCard'
import { ChapterIndex } from '@/components/ChapterIndex'
import { FigCaption } from '@/components/FigCaption'
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
    description: project.summary || project.excerpt || '',
    openGraph: {
      title: project.title,
      description: project.summary || project.excerpt || '',
      url: `${SITE_URL}/works/${slug}`,
      ...(project.coverImage?.asset?.url ? { images: [{ url: project.coverImage.asset.url }] } : {}),
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [project, related] = await Promise.all([
    client.fetch(caseStudyBySlugQuery, { slug }),
    client.fetch(relatedCaseStudiesQuery, { slug }),
  ])
  if (!project) notFound()

  const coverSrc: string | null = project.coverImage?.asset?.url ?? null
  const metrics = (project.metrics?.length ? project.metrics : project.stats) ?? []
  const chapters = project.chapters ?? []

  return (
    <>
      {chapters.length > 0 && (
        <ChapterIndex chapters={chapters.map((c: { title: string }, i: number) => ({
          id: `chapter-${i}`,
          label: c.title,
        }))} />
      )}

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
          <p className="overline text-white/60 mb-2">{project.sector || project.category}</p>
          <h1 className="display-lg text-white max-w-2xl">{project.title}</h1>
        </div>
      </div>

      {/* Project overview */}
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">

        <Link href="/works" className="mb-12 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
          <ArrowLeft size={14} />
          <span className="overline">Works</span>
        </Link>

        {/* Headline */}
        {project.headline && (
          <h2 className="display-md max-w-3xl mb-12">{project.headline}</h2>
        )}

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-16 border-y border-foreground/10 py-10">
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
          {project.services?.length > 0 && (
            <div>
              <p className="overline text-muted-foreground mb-2">Services</p>
              <div className="flex flex-wrap gap-1.5">
                {project.services.map((s: string) => (
                  <span key={s} className="overline text-foreground/60 border border-foreground/15 px-2 py-0.5 text-[0.6rem]">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        {(project.summary || project.excerpt) && (
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-16">
            {project.summary || project.excerpt}
          </p>
        )}

        {/* Challenge / Solution */}
        {(project.challenge || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 border-t border-foreground/10 pt-16">
            {project.challenge && (
              <div>
                <p className="overline text-muted-foreground mb-4">The Challenge</p>
                <p className="text-base text-foreground/80 leading-relaxed">{project.challenge}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <p className="overline text-muted-foreground mb-4">Our Approach</p>
                <p className="text-base text-foreground/80 leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>
        )}

        {/* Chapters */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {chapters.map((chapter: any, i: number) => (
          <div key={i} id={`chapter-${i}`} className="mb-20 border-t border-foreground/10 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <p className="overline text-muted-foreground mb-2">Chapter {String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-2xl font-display font-medium">{chapter.title}</h3>
              </div>
              <div className="md:col-span-8">
                {chapter.body && <PortableTextRenderer content={chapter.body} />}
              </div>
            </div>
          </div>
        ))}

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="border-t border-foreground/10 pt-16 mb-20">
            <p className="overline text-muted-foreground mb-10">Results</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {metrics.map((m: { value: string; label: string }) => (
                <div key={m.label}>
                  <p className="display-md accent-orange mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>{m.value}</p>
                  <p className="overline text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <div className="mb-20 space-y-4">
            {project.gallery.map((img: { asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } }; caption?: string; alt?: string }, i: number) => {
              if (!img?.asset?.url) return null
              const w = img.asset.metadata?.dimensions?.width ?? 1600
              const h = img.asset.metadata?.dimensions?.height ?? 900
              return (
                <div key={i} className="overflow-hidden rounded-sm">
                  <Image
                    src={img.asset.url}
                    alt={img.alt || `Gallery ${i + 1}`}
                    width={w}
                    height={h}
                    className="w-full h-auto"
                    sizes="(min-width: 1024px) 1600px, 100vw"
                    quality={95}
                  />
                  {img.caption && <FigCaption n={i + 1}>{img.caption}</FigCaption>}
                </div>
              )
            })}
          </div>
        )}

        {/* Quote */}
        {project.quote && (
          <blockquote className="border-t border-foreground/10 pt-16 mb-20">
            <p className="text-2xl md:text-3xl font-display font-medium leading-snug text-foreground max-w-3xl mb-6">
              &ldquo;{project.quote}&rdquo;
            </p>
            {project.quoteBy && (
              <cite className="overline text-muted-foreground not-italic">{project.quoteBy}</cite>
            )}
          </blockquote>
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
            {related.map((p: any) => (
              <WorkCard key={p._id} project={p} aspect="aspect-[4/3]" />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
