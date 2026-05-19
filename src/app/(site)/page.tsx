import { LogoStrip } from '@/components/sections/LogoStrip'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { ProcessScroll } from '@/components/sections/ProcessScroll'
import { Testimonials } from '@/components/sections/Testimonials'
import { HomeHero } from '@/components/sections/HomeHero'
import { HomeServices } from '@/components/sections/HomeServices'

export default function Home() {
  return (
    <>
      <HomeHero />
      <LogoStrip />
      <SelectedWork />
      <HomeServices />
      <ProcessScroll />
      <Testimonials />
    </>
  )
}
