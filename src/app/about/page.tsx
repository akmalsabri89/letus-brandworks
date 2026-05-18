import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionNumber } from '@/components/SectionNumber'
import { Parallax } from '@/components/Parallax'
import { FigCaption } from '@/components/FigCaption'

export const metadata: Metadata = {
  title: 'About',
  description: 'Letus is a boutique Brand Design Studio. We work with founders and businesses ready to lead their category.',
}

const CONVICTIONS = [
  {
    num: '01',
    title: 'Substance over polish',
    body: 'Polish is the easy part. The harder work is clarity, coherence, and a brand that still makes sense at scale.',
  },
  {
    num: '02',
    title: 'Strategy before surface',
    body: 'We design the thinking before we design the look. Identity follows positioning, never the other way around.',
  },
  {
    num: '03',
    title: 'Depth over throughput',
    body: 'Every brand we take on deserves our full attention. We’d rather go deep than spread thin. Our clients get a partner.',
  },
  {
    num: '04',
    title: 'System by design',
    body: 'Every brand gets its own logic. The way it looks, the way it sounds, the way it holds together across every touchpoint.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <SectionNumber n={4} position="right" />
        <div className="relative mx-auto max-w-[1600px] px-6 pt-40 pb-24 md:px-10 md:pb-32">
          <p className="overline text-muted-foreground mb-6">[ About ]</p>

          <h1 className="display-xl max-w-[14ch]">
            A studio named after
            <br />
            <em className="italic accent-orange">an eruption.</em>
          </h1>

          <div className="mt-20 grid grid-cols-12 gap-6 md:gap-12 items-start">
            {/* Body */}
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-muted-foreground mb-6">[ The word ]</p>
              <p className="text-base text-foreground/80 leading-relaxed mb-5 md:text-lg">
                Letus is the Malay word for eruption.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-5 md:text-lg">
                We named the studio after the moment a brand stops blending in.
                The deck closes. The room goes quiet. Someone says, <em className="italic">okay, this is them.</em>
              </p>
              <p className="text-base text-muted-foreground leading-relaxed md:text-lg">
                That moment is engineered. It comes from strategy before identity, depth before
                throughput, and a system designed to hold under scrutiny.
              </p>
            </div>

            {/* Hero image */}
            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Parallax intensity={50}>
                  <Image
                    src="/covers/geliga.png"
                    alt="Geliga, brand strategy and identity work by Letus"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                    quality={95}
                    priority
                  />
                </Parallax>
              </div>
              <FigCaption n={1}>Geliga / Brand Strategy &amp; Identity, 2025.</FigCaption>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto strip */}
      <section className="bg-foreground py-24 text-background md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <p className="overline opacity-60 mb-10">[ Manifesto ]</p>
          <p className="display-lg max-w-4xl">
            Most brands are <em className="italic accent-orange">asking permission</em> to be noticed.
            <br />
            We help them stop.
          </p>
        </div>
      </section>

      {/* Convictions */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
          <div className="mb-16">
            <p className="overline text-muted-foreground mb-6">[ What we believe ]</p>
            <h2 className="display-lg max-w-3xl">
              Four convictions we run the studio on.
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {CONVICTIONS.map((c, i) => (
              <div
                key={c.num}
                className={`col-span-12 md:col-span-6 ${i % 2 === 1 ? 'md:mt-16' : ''}`}
              >
                <p className="overline accent-orange mb-3">{c.num}</p>
                <h3 className="display-md mb-5" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                  {c.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
