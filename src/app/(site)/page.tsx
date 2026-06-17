import { LogoStrip } from '@/components/sections/LogoStrip'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { ProcessScroll } from '@/components/sections/ProcessScroll'
import { Testimonials } from '@/components/sections/Testimonials'
import { HomeHero } from '@/components/sections/HomeHero'
import { HomeServices } from '@/components/sections/HomeServices'
import { client } from '@/sanity/lib/client'
import { featuredCaseStudiesQuery, homeServicesQuery, testimonialsQuery } from '@/sanity/lib/queries'
import type { FeaturedProject } from '@/components/sections/SelectedWork'
import type { SanityService } from '@/components/sections/HomeServices'
import type { SanityTestimonial } from '@/components/sections/Testimonials'

export const revalidate = 60

export default async function Home() {
  const [projects, homeServices, testimonials] = await Promise.all([
    client.fetch<FeaturedProject[]>(featuredCaseStudiesQuery),
    client.fetch<SanityService[]>(homeServicesQuery),
    client.fetch<SanityTestimonial[]>(testimonialsQuery),
  ])

  return (
    <>
      <HomeHero />
      <LogoStrip />
      <SelectedWork projects={projects} />
      <HomeServices services={homeServices} />
      <ProcessScroll />
      <Testimonials testimonials={testimonials} />
    </>
  )
}
