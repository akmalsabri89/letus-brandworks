import { LogoStrip } from '@/components/sections/LogoStrip'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { ProcessScroll } from '@/components/sections/ProcessScroll'
import { Testimonials } from '@/components/sections/Testimonials'
import { HomeHero } from '@/components/sections/HomeHero'
import { HomeServices } from '@/components/sections/HomeServices'
import { client } from '@/sanity/lib/client'
import { caseStudiesQuery } from '@/sanity/lib/queries'

export default async function Home() {
  const sanityProjects: Array<{ slug?: { current?: string }; coverImage?: { asset?: { url?: string } } }> =
    await client.fetch(caseStudiesQuery)

  const covers: Record<string, string> = {}
  for (const p of sanityProjects) {
    if (p.slug?.current && p.coverImage?.asset?.url) {
      covers[p.slug.current] = p.coverImage.asset.url
    }
  }

  return (
    <>
      <HomeHero />
      <LogoStrip />
      <SelectedWork covers={covers} />
      <HomeServices />
      <ProcessScroll />
      <Testimonials />
    </>
  )
}
