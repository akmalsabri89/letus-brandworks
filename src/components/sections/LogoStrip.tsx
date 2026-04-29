import Image from 'next/image'

interface LogoItem {
  src: string
  alt: string
}

const logos: LogoItem[] = [
  { src: '/logos/ainqa.svg', alt: 'Ainqa' },
  { src: '/logos/clean-traces.svg', alt: 'Clean Traces' },
  { src: '/logos/eutex.svg', alt: 'Eutex' },
  { src: '/logos/geliga.svg', alt: 'Geliga' },
  { src: '/logos/gullate.svg', alt: 'Gullate' },
  { src: '/logos/perintis.svg', alt: 'Perintis' },
  { src: '/logos/vkl-media.svg', alt: 'VKL Media' },
]

const LogoItem = ({ logo, id }: { logo: LogoItem; id: string }) => (
  <span key={id} className="flex-shrink-0 px-14 flex items-center" role="listitem">
    <Image
      src={logo.src}
      alt={logo.alt}
      width={120}
      height={40}
      className="opacity-40 brightness-0"
      style={{ objectFit: 'contain', width: 'auto', height: '30px' }}
    />
  </span>
)

export function LogoStrip() {
  return (
    <section className="bg-gradient-to-b from-[#faf9f6] to-white py-16 w-full overflow-hidden" aria-label="Client logos">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0) }
          to   { transform: translateX(-50%) }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>

      <div className="overflow-hidden">
        <div className="animate-marquee" role="list">
          {logos.map((logo) => (
            <LogoItem key={`a-${logo.alt}`} id={`a-${logo.alt}`} logo={logo} />
          ))}
          {logos.map((logo) => (
            <LogoItem key={`b-${logo.alt}`} id={`b-${logo.alt}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  )
}
