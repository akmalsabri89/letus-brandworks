import type { Metadata } from 'next'
import { SectionNumber } from '@/components/SectionNumber'
import { ProcessScroll } from '@/components/sections/ProcessScroll'
import { ServicesAccordion } from '@/components/sections/ServicesAccordion'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Brand-led. Always. Brand strategy and visual identity as the foundation, with web, marketing, social, and graphic design as ongoing partnership.',
}

const SERVICES = [
  {
    num: '01',
    name: 'Brand Strategy',
    tagline: 'Position. Provoke. Prove.',
    chips: ['Discovery', 'Positioning', 'Narrative', 'Naming', 'Brand Voice'],
    description:
      'We dig past the deck. Stakeholder interviews, market dissection, and a positioning sharp enough to defend in any boardroom. Strategy is the invisible architecture every other decision rests on. Get it right and the rest gets easier.',
  },
  {
    num: '02',
    name: 'Visual Identity',
    tagline: 'Marks worth defending.',
    chips: ['Identity System', 'Guidelines', 'Art Direction', 'Logo', 'Typography'],
    description:
      'Logos, typography, colour, art direction. Built as a system that survives boardrooms, retailers, and screens we haven’t invented yet. Every mark we ship is engineered to scale from a favicon to a billboard without losing voice.',
  },
  {
    num: '+',
    name: 'Brand Stack',
    tagline: 'We stay close.',
    chips: ['Website', 'Social Media', 'Graphic Design', 'Digital Marketing'],
    description:
      'Once the brand is built, we stay on as your creative and marketing partner. Web, social, ads, ongoing design. The studio that already knows your brand inside out. Bundled into a retainer or scoped per project, your call.',
  },
]

export default function ServicesPage() {
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

      {/* Accordion services */}
      <section className="border-t border-foreground/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <ServicesAccordion services={SERVICES} />
        </div>
      </section>

      {/* Process */}
      <ProcessScroll />
    </>
  )
}
