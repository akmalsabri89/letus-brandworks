import Link from 'next/link'
import Image from 'next/image'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { caseStudiesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function WorksGrid({ projects }: { projects: any[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-[#999] font-[family-name:var(--font-inter)] text-sm">
          Case studies coming soon.
        </p>
      </div>
    )
  }

  return (
    <div className="columns-1 md:columns-2 gap-5 space-y-5">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {projects.filter((p: any) => p?.slug?.current).map((project: any, i: number) => {
        const src = project.coverImage ? urlFor(project.coverImage).width(900).url() : null
        const aspectRatios = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[16/9]', 'aspect-[3/4]', 'aspect-[4/3]']
        const aspect = aspectRatios[i % aspectRatios.length]

        return (
          <Link
            key={project._id}
            href={`/works/${project.slug.current}`}
            className="group block break-inside-avoid"
          >
            <div className={`relative overflow-hidden rounded-xl ${aspect} bg-[#1a1a1a]`}>
              {src ? (
                <Image
                  src={src}
                  alt={project.client}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/10 text-4xl font-[family-name:var(--font-unbounded)] font-[500]">
                    {project.client}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4 px-1">
              <div className="flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-unbounded)] text-[15px] font-[500] text-[#1a1a1a]">
                  {project.client}
                </h3>
                <span className="text-[#1a1a1a] text-sm opacity-0 translate-x-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300">
                  →
                </span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#999] mt-0.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {project.category}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default async function WorksPage() {
  const projects = await client.fetch(caseStudiesQuery)

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
              Our Work
            </h1>
            <p className="text-base text-[#777] max-w-[440px]" style={{ fontFamily: 'var(--font-inter)' }}>
              A selection of brands we have built, shaped, and launched into the world.
            </p>
          </div>

          <WorksGrid projects={projects} />

        </div>
      </main>
      <Footer />
    </>
  )
}
