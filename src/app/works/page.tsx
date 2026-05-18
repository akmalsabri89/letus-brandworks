import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { caseStudiesQuery } from '@/sanity/lib/queries'
import { WorkCard } from '@/components/works/WorkCard'
import { SectionNumber } from '@/components/SectionNumber'

export const metadata: Metadata = {
  title: 'Works',
  description: 'A selection of brands we have built, shaped, and launched into the world.',
}

const ASPECTS = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[16/9]', 'aspect-[3/4]', 'aspect-[4/3]']

export default async function WorksPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects: any[] = await client.fetch(caseStudiesQuery)

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <SectionNumber n={2} />

      {/* Header */}
      <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-16 md:px-10">
        <p className="overline text-muted-foreground mb-4">[ Works ]</p>
        <h1 className="display-lg mb-6 max-w-3xl">Our Work</h1>
        <p className="text-base text-muted-foreground max-w-md leading-relaxed">
          A selection of brands we have built, shaped, and launched into the world.
        </p>
      </div>

      <div className="border-t border-foreground/10 mx-6 md:mx-10" />

      {/* Grid */}
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10">
        {projects.filter(p => p?.slug?.current).length === 0 ? (
          <div className="py-24 text-center">
            <p className="overline text-muted-foreground">Case studies coming soon.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {projects.filter((p: any) => p?.slug?.current).map((project: any, i: number) => (
              <WorkCard
                key={project._id}
                project={project}
                aspect={ASPECTS[i % ASPECTS.length]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
