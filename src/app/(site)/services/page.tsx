import type { Metadata } from 'next'
import { SectionNumber } from '@/components/SectionNumber'
import { ProcessScroll } from '@/components/sections/ProcessScroll'
import { ServicesAccordion } from '@/components/sections/ServicesAccordion'
import { sanityFetch } from '@/sanity/lib/live'
import { servicesQuery } from '@/sanity/lib/queries'
import type { SanityService } from '@/components/sections/HomeServices'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Brand-led. Always. Brand strategy and visual identity as the foundation, with web, marketing, social, and graphic design as ongoing partnership.',
}

export default async function ServicesPage() {
  const { data } = await sanityFetch({ query: servicesQuery })
  const services = data as SanityService[]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <SectionNumber n={3} position="right" />
        <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-20 md:px-10 md:pb-28">
          <p className="overline text-muted-foreground mb-6">[ Services ]</p>
          <h1 className="display-lg mb-8 max-w-3xl">
            Brand-led.<br />
            <em className="italic accent-orange">Always.</em>
          </h1>
          <p className="text-base text-muted-foreground max-w-md leading-relaxed md:text-lg">
            Two services we obsess over, and one stack we maintain.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="border-t border-foreground/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <ServicesAccordion services={services} />
        </div>
      </section>

      {/* Process */}
      <ProcessScroll />
    </>
  )
}
