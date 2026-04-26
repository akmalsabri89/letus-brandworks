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

  const coverSrc = project.coverImage?.asset?.url ?? null

  return (
    <>
      <Nav />
      <main className="min-h-dvh">

        {/* ── Full-viewport hero — clean image, no overlay ── */}
        <div data-nav-ghost className="relative w-full h-[55vh] sm:h-[65vh] lg:h-dvh overflow-hidden">
          {coverSrc ? (
            <Image src={coverSrc} alt={project.client} fill className="object-cover" priority sizes="100vw" unoptimized />
          ) : (
            <div className="absolute inset-0 bg-[#1a1a1a]" />
          )}
        </div>

        {/* ── Project info — rounded cream card on dark ─── */}
        <div className="bg-white px-5 sm:px-8 lg:px-12 pt-20 pb-10">
          <div className="max-w-[1200px] mx-auto bg-[#faf9f6] rounded-3xl px-8 sm:px-10 lg:px-14 pt-12 pb-14 lg:pt-14 lg:pb-16">

            {/* Back link */}
            <Link
              href="/works"
              className="text-[12px] text-[#1a1a1a]/40 hover:text-[#1a1a1a] font-[family-name:var(--font-inter)] transition-colors inline-block mb-10"
            >
              ← Works
            </Link>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-[500] text-[#1a1a1a] leading-[0.95] tracking-tight mb-10"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              {project.title}
            </h1>

            {/* Divider */}
            <div className="border-t border-[#1a1a1a]/10 mb-10" />

            {/* Specs + Excerpt */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

              {/* Specs — left col */}
              <div className="lg:col-span-3 flex flex-row flex-wrap lg:flex-col gap-6 lg:gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/30 mb-1.5 font-[family-name:var(--font-inter)]">Client</p>
                  <p className="text-sm text-[#1a1a1a] font-medium font-[family-name:var(--font-inter)]">{project.client}</p>
                </div>
                {project.year && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/30 mb-1.5 font-[family-name:var(--font-inter)]">Year</p>
                    <p className="text-sm text-[#1a1a1a] font-medium font-[family-name:var(--font-inter)]">{project.year}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/30 mb-1.5 font-[family-name:var(--font-inter)]">Scope</p>
                  <p className="text-sm text-[#1a1a1a] font-medium font-[family-name:var(--font-inter)]">{project.category}</p>
                </div>
              </div>

              {/* Excerpt — right col, Inter body font */}
              {project.excerpt && (
                <div className="lg:col-span-9">
                  <p className="text-lg lg:text-xl text-[#1a1a1a]/75 leading-relaxed font-[family-name:var(--font-inter)] font-[400] max-w-[680px]">
                    {project.excerpt}
                  </p>
                </div>
              )}

            </div>

            {/* Stats — below grid, orange numerals, no separate section */}
            {project.stats?.length > 0 && (
              <div className="mt-14 pt-10 border-t border-[#1a1a1a]/10 grid grid-cols-2 lg:grid-cols-4 gap-8">
                {project.stats.map((stat: any) => (
                  <div key={stat.label}>
                    <p
                      className="text-3xl lg:text-4xl font-[500] text-[#f05a28] leading-none mb-2"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#1a1a1a]/45 font-[family-name:var(--font-inter)] uppercase tracking-[0.12em]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* ── Content ───────────────────────────────────── */}
        {project.content?.length > 0 && (
          <div className="bg-white px-5 sm:px-8 lg:px-12 py-20">
            <div className="w-full">
              <PortableTextRenderer content={project.content} />
            </div>
          </div>
        )}

        {/* ── Footer CTA ────────────────────────────────── */}
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
