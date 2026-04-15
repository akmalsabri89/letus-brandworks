'use client'

import { PortableText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

function VideoEmbed({ url }: { url: string }) {
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be')
  const isVimeo = url.includes('vimeo.com')

  let embedUrl = url
  if (isYoutube) {
    const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
    embedUrl = `https://www.youtube.com/embed/${id}`
  } else if (isVimeo) {
    const id = url.split('/').pop()
    embedUrl = `https://player.vimeo.com/video/${id}`
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden my-10">
      <iframe src={embedUrl} className="absolute inset-0 w-full h-full" allowFullScreen />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PortableTextRenderer({ content }: { content: any[] }) {
  return (
    <PortableText
      value={content}
      components={{
        types: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          imageBlock: ({ value }: { value: any }) => {
            if (!value?.image?.asset) return null
            const src = urlFor(value.image).url()
            const layout = value.layout || 'full'

            if (layout === 'grid-2' || layout === 'grid-3') {
              return null // handled at array level — skip here
            }

            return (
              <figure className="my-10 w-[80%] mx-auto">
                <div className={`relative w-full overflow-hidden rounded-xl ${layout === 'contained' ? 'max-w-[720px] mx-auto' : ''}`} style={{ aspectRatio: '16/9' }}>
                  <Image src={src} alt={value.caption || ''} fill className="object-cover" />
                </div>
                {value.caption && (
                  <figcaption className="text-center text-xs text-[#999] mt-3 font-[family-name:var(--font-inter)]">
                    {value.caption}
                  </figcaption>
                )}
              </figure>
            )
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          videoBlock: ({ value }: { value: any }) => {
            if (!value?.url) return null
            return (
              <div className="w-[80%] mx-auto">
                <VideoEmbed url={value.url} />
              </div>
            )
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sectionLabel: ({ value }: { value: any }) => {
            const label = value.customLabel || value.label
            return (
              <div className="flex items-center gap-3 my-10 max-w-[800px] mx-auto">
                <div className="w-6 h-px bg-[#f05a28]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#f05a28] font-[family-name:var(--font-inter)]">
                  {label}
                </span>
              </div>
            )
          },
        },
        block: {
          normal: ({ children }) => (
            <p className="max-w-[800px] mx-auto text-base text-[#555] leading-relaxed mb-5 font-[family-name:var(--font-inter)]">{children}</p>
          ),
          h2: ({ children }) => (
            <h2 className="max-w-[800px] mx-auto text-2xl lg:text-3xl font-[500] text-[#1a1a1a] leading-tight tracking-tight mt-12 mb-4 font-[family-name:var(--font-unbounded)]">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="max-w-[800px] mx-auto text-xl font-[500] text-[#1a1a1a] mt-8 mb-3 font-[family-name:var(--font-unbounded)]">{children}</h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="max-w-[800px] mx-auto border-l-2 border-[#f05a28] pl-6 my-8 italic text-lg text-[#1a1a1a]/70 font-[family-name:var(--font-inter)]">
              {children}
            </blockquote>
          ),
        },
      }}
    />
  )
}
