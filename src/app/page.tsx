import { Nav } from '@/components/layout/Nav'
import { HeroEruption } from '@/components/sections/HeroEruption'
import { LogoStrip } from '@/components/sections/LogoStrip'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Services } from '@/components/sections/Services'
import { ProcessScroll } from '@/components/sections/ProcessScroll'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroEruption />
        <LogoStrip />
        <SelectedWork />
        <Services />
        <ProcessScroll />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
