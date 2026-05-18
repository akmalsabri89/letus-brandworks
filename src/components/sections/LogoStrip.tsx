import Image from 'next/image'
import { Marquee } from '@/components/Marquee'

interface LogoItem { src: string; alt: string }

const logos: LogoItem[] = [
  { src: '/logos/ainqa.svg', alt: 'Ainqa' },
  { src: '/logos/clean-traces.svg', alt: 'Clean Traces' },
  { src: '/logos/eutex.svg', alt: 'Eutex' },
  { src: '/logos/geliga.svg', alt: 'Geliga' },
  { src: '/logos/gullate.svg', alt: 'Gullate' },
  { src: '/logos/perintis.svg', alt: 'Perintis' },
  { src: '/logos/vkl-media.svg', alt: 'VKL Media' },
]

const SLOT_W = 160
const SLOT_H = 48

function LogoSlot({ logo }: { logo: LogoItem }) {
  return (
    <span
      className="flex flex-shrink-0 items-center justify-center"
      style={{ width: SLOT_W, height: SLOT_H }}
    >
      <Image
        src={logo.src}
        alt=""
        width={100}
        height={32}
        className="opacity-40 brightness-0 dark:invert"
        style={{ objectFit: 'contain', width: 'auto', height: 28, maxWidth: 120 }}
      />
    </span>
  )
}

export function LogoStrip() {
  return (
    <section className="border-y border-foreground/10 py-8" aria-label="Client logos">
      <Marquee duration="40s">
        {logos.map((logo) => (
          <LogoSlot key={logo.alt} logo={logo} />
        ))}
      </Marquee>
    </section>
  )
}
