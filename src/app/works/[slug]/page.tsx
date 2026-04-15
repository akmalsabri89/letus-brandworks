import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { caseStudyBySlugQuery, caseStudiesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'

export async function generateStaticParams() {
  const projects = await client.fetch(caseStudiesQuery)
  return projects.filter((p: any) => p?.slug?.current).map((p: any) => ({ slug: p.slug.current }))
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project: any = await client.fetch(caseStudyBySlugQuery, { slug })
  if (!project) notFound()

  const coverSrc = project.coverImage ? urlFor(project.coverImage).width(2000).url() : null

  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-[#0f0f0f]">

        {/* ── Full-viewport hero ───────────────────────── */}
        <div className="relative w-full h-dvh overflow-hidden">
          {coverSrc ? (
            <Image src={coverSrc} alt={project.client} fill className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 bg-[#1a1a1a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />

          {/* Back link */}
          <div className="absolute top-28 left-5 sm:left-8 lg:left-12 z-10">
            <Link
              href="/works"
              className="text-white/50 hover:text-white text-[12px] font-[family-name:var(--font-inter)] transition-colors"
            >
              ← Works
            </Link>
          </div>

          {/* Title block — bottom left */}
          <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-8 lg:px-12 pb-16 max-w-[1200px] mx-auto">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f05a28] font-[family-name:var(--font-inter)] block mb-4">
              {project.category}
            </span>
            <h1
              className="text-5xl sm:text-6xl lg:text-8xl font-[500] text-white leading-[0.95] tracking-tight max-w-[900px]"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              {project.title}
            </h1>
          </div>
        </div>

        {/* ── Project intro ────────────────────────────── */}
        <div className="bg-[#0f0f0f] px-5 sm:px-8 lg:px-12 py-20">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Specs — left col */}
            <div className="lg:col-span-3 flex flex-col gap-7">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5 font-[family-name:var(--font-inter)]">Client</p>
                <p className="text-sm text-white font-medium font-[family-name:var(--font-inter)]">{project.client}</p>
              </div>
              {project.year && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5 font-[family-name:var(--font-inter)]">Year</p>
                  <p className="text-sm text-white font-medium font-[family-name:var(--font-inter)]">{project.year}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5 font-[family-name:var(--font-inter)]">Scope</p>
                <p className="text-sm text-white font-medium font-[family-name:var(--font-inter)]">{project.category}</p>
              </div>
            </div>

            {/* Excerpt — right col */}
            {project.excerpt && (
              <div className="lg:col-span-9 lg:border-l lg:border-white/10 lg:pl-12">
                <p
                  className="text-2xl lg:text-3xl text-white/90 leading-relaxed font-[400]"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  {project.excerpt}
                </p>
              </div>
            )}

          </div>
        </div>

        {/* ── Stats ────────────────────────────────────── */}
        {project.stats?.length > 0 && (
          <div className="bg-[#f05a28] px-5 sm:px-8 lg:px-12 py-16">
            <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
              {project.stats.map((stat: any) => (
                <div key={stat.label}>
                  <p
                    className="text-4xl lg:text-6xl font-[500] text-white leading-none mb-2"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/70 font-[family-name:var(--font-inter)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Content ──────────────────────────────────── */}
        {project.content?.length > 0 && (
          <div className="bg-[#faf9f6] px-5 sm:px-8 lg:px-12 py-20">
            <div className="w-full">
              <PortableTextRenderer content={project.content} />
            </div>
          </div>
        )}

        {/* ── Footer CTA ───────────────────────────────── */}
        <div className="bg-[#0f0f0f] px-5 sm:px-8 lg:px-12 py-20">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] mb-3">Next step</p>
              <p
                className="text-2xl lg:text-3xl font-[500] text-white leading-tight"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                Ready to build your brand?
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/contact"
                className="bg-[#f05a28] text-white font-semibold text-[13px] px-7 py-3.5 rounded-full hover:bg-[#d94e20] transition-colors duration-200 font-[family-name:var(--font-inter)]"
              >
                Let&apos;s Talk →
              </Link>
              <Link
                href="/works"
                className="text-white/50 hover:text-white text-[13px] font-[family-name:var(--font-inter)] transition-colors"
              >
                ← All Works
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
