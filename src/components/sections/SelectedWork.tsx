import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { caseStudiesQuery } from '@/sanity/lib/queries'
import { WorkCard } from '@/components/ui/WorkCard'
import { AnimatedSection } from '@/components/ui/animated-section'

interface WorkItem {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  coverImage?: { asset?: { url: string } }
}

async function getWork(): Promise<WorkItem[]> {
  try {
    return await client.fetch(caseStudiesQuery)
  } catch {
    return []
  }
}

export async function SelectedWork() {
  const works = await getWork()

  return (
    <section className="bg-[#141414] py-24 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-[10px] tracking-[3px] uppercase text-[#f05a28] mb-3"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Selected Work
              </p>
              <h2
                className="text-[length:var(--text-section)] font-[800] text-white leading-tight tracking-[var(--letter-section)]"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                The Work.
              </h2>
            </div>
            <Link
              href="/works"
              className="text-[12px] text-[#555] hover:text-[#f05a28] transition-colors duration-200 pb-1"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              View all →
            </Link>
          </div>
        </AnimatedSection>

        {/* Grid */}
        {works.length === 0 ? (
          <AnimatedSection>
            <div className="text-[#444] text-[14px] text-center py-16"
              style={{ fontFamily: 'var(--font-inter)' }}>
              Work coming soon.
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {works.slice(0, 6).map((work, i) => (
              <AnimatedSection key={work._id} delay={i * 0.08}>
                <WorkCard
                  title={work.title}
                  category={work.category ?? 'Brand Identity'}
                  slug={work.slug.current}
                  imageUrl={work.coverImage?.asset?.url}
                  index={i}
                />
              </AnimatedSection>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
