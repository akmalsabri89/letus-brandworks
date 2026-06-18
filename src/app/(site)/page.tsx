import { LogoStrip } from '@/components/sections/LogoStrip'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { ProcessScroll } from '@/components/sections/ProcessScroll'
import { Testimonials } from '@/components/sections/Testimonials'
import { HomeHero } from '@/components/sections/HomeHero'
import { HomeServices } from '@/components/sections/HomeServices'
import { sanityFetch } from '@/sanity/lib/live'
import { featuredCaseStudiesQuery, homeServicesQuery, testimonialsQuery } from '@/sanity/lib/queries'
import type { FeaturedProject } from '@/components/sections/SelectedWork'
import type { SanityService } from '@/components/sections/HomeServices'
import type { SanityTestimonial } from '@/components/sections/Testimonials'

export default async function Home() {
  const [r1, r2, r3] = await Promise.all([
    sanityFetch({ query: featuredCaseStudiesQuery }),
    sanityFetch({ query: homeServicesQuery }),
    sanityFetch({ query: testimonialsQuery }),
  ])

  const projects = r1.data as FeaturedProject[]
  const homeServices = r2.data as SanityService[]
  const testimonials = r3.data as SanityTestimonial[]

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
