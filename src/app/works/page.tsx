import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { caseStudiesQuery } from '@/sanity/lib/queries'
import { WorkCard } from '@/components/works/WorkCard'
import { AnimatedSection } from '@/components/ui/animated-section'

const ASPECT_RATIOS = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[16/9]', 'aspect-[3/4]', 'aspect-[4/3]']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WorksGrid({ projects }: { projects: any[] }) {
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
      {projects.filter((p: any) => p?.slug?.current).map((project: any, i: number) => (
        <AnimatedSection key={project._id}>
          <WorkCard
            project={project}
            aspect={ASPECT_RATIOS[i % ASPECT_RATIOS.length]}
          />
        </AnimatedSection>
      ))}
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

          <AnimatedSection>
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
          </AnimatedSection>

          <WorksGrid projects={projects} />

        </div>
      </main>
      <Footer />
    </>
  )
}
