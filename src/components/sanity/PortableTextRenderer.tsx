'use client'

import { PortableText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/animated-section'

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
    <div className="relative w-full aspect-video overflow-hidden rounded-sm my-10">
      <iframe src={embedUrl} className="absolute inset-0 w-full h-full" allowFullScreen />
    </div>
  )
}

// Group consecutive imageBlocks with the same grid layout into meta-blocks
// so they can be rendered as a unified grid container.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function groupGridBlocks(content: any[]): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = []
  let i = 0

  while (i < content.length) {
    const block = content[i]
    const layout = block?.layout

    if (block?._type === 'imageBlock' && (layout === 'grid-2' || layout === 'grid-3')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const group: any[] = [block]
      let j = i + 1
      while (
        j < content.length &&
        content[j]?._type === 'imageBlock' &&
        content[j]?.layout === layout
      ) {
        group.push(content[j])
        j++
      }

      result.push({
        _type: 'imageGrid',
        _key: block._key,
        layout,
        images: group,
      })
      i = j
    } else {
      result.push(block)
      i++
    }
  }

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PortableTextRenderer({ content }: { content: any[] }) {
  const processedContent = groupGridBlocks(content)

  return (
    <PortableText
      value={processedContent}
      components={{
        types: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          imageBlock: ({ value }: { value: any }) => {
            if (!value?.image?.asset) return null
            const src = urlFor(value.image).url()
            const layout = value.layout || 'full'
            const w = value.image.asset?.metadata?.dimensions?.width || 1200
            const h = value.image.asset?.metadata?.dimensions?.height || 800

            return (
              <AnimatedSection>
                <figure className={`my-10 w-[80%] mx-auto ${layout === 'contained' ? 'max-w-[720px]' : ''}`}>
                  <Image
                    src={src}
                    alt={value.caption || ''}
                    width={w}
                    height={h}
                    className="w-full h-auto rounded-sm"
                    sizes={layout === 'contained' ? '(min-width: 1024px) 720px, 80vw' : '(min-width: 1024px) 1280px, 80vw'}
                    quality={95}
                  />
                  {value.caption && (
                    <figcaption className="text-center text-xs text-muted-foreground mt-3">
                      {value.caption}
                    </figcaption>
                  )}
                </figure>
              </AnimatedSection>
            )
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          imageGrid: ({ value }: { value: any }) => {
            const cols = value.layout === 'grid-3' ? 3 : 2
            const gridClass = cols === 3
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'
              : 'grid grid-cols-1 sm:grid-cols-2 gap-3'

            return (
              <AnimatedSection>
                <div className="my-10 w-[80%] mx-auto">
                  <div className={gridClass}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {value.images.map((item: any) => {
                    if (!item?.image?.asset) return null
                    const src = urlFor(item.image).url()
                    const w = item.image.asset?.metadata?.dimensions?.width || 1200
                    const h = item.image.asset?.metadata?.dimensions?.height || 800
                    return (
                      <figure key={item._key} className="m-0">
                        <Image
                          src={src}
                          alt={item.caption || ''}
                          width={w}
                          height={h}
                          className="w-full h-auto rounded-sm"
                          sizes={cols === 3 ? '(min-width: 1024px) 420px, (min-width: 640px) 50vw, 80vw' : '(min-width: 640px) 50vw, 80vw'}
                          quality={95}
                        />
                        {item.caption && (
                          <figcaption className="text-center text-xs text-muted-foreground mt-2">
                            {item.caption}
                          </figcaption>
                        )}
                      </figure>
                    )
                  })}
                  </div>
                </div>
              </AnimatedSection>
            )
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          videoBlock: ({ value }: { value: any }) => {
            const fileUrl = value?.videoFile?.asset?.url
            const embedUrl = value?.url

            if (fileUrl) {
              return (
                <AnimatedSection>
                  <figure className="w-[80%] mx-auto my-10">
                    <video
                      src={fileUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full rounded-sm"
                    />
                    {value.caption && (
                      <figcaption className="text-center text-xs text-muted-foreground mt-3">
                        {value.caption}
                      </figcaption>
                    )}
                  </figure>
                </AnimatedSection>
              )
            }

            if (embedUrl) {
              return (
                <AnimatedSection>
                  <div className="w-[80%] mx-auto">
                    <VideoEmbed url={embedUrl} />
                  </div>
                </AnimatedSection>
              )
            }

            return null
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sectionLabel: ({ value }: { value: any }) => {
            const label = value.customLabel || value.label
            return (
              <div className="flex items-center gap-3 my-10 max-w-[800px] mx-auto">
                <div className="w-6 h-px bg-eruption" />
                <span className="overline accent-orange">
                  {label}
                </span>
              </div>
            )
          },
        },

        block: {
          normal: ({ children }) => (
            <p className="max-w-[800px] mx-auto text-base text-muted-foreground leading-relaxed mb-5">{children}</p>
          ),
          h2: ({ children }) => (
            <h2 className="max-w-[800px] mx-auto display-md text-foreground mt-12 mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>{children}</h2>
          ),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          h3: ({ children, value }: { children?: React.ReactNode; value?: any }) => {
            const text = (value?.children || []).map((c: { text?: string }) => c.text || '').join('')
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
            return (
              <h3 id={id || undefined} className="max-w-[800px] mx-auto font-display text-xl font-medium text-foreground mt-8 mb-3">{children}</h3>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="max-w-[800px] mx-auto my-12">
              <p
                className="font-display font-medium italic leading-snug text-foreground"
                style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}
              >
                <span aria-hidden className="accent-orange not-italic">&ldquo;</span>
                {children}
                <span aria-hidden className="accent-orange not-italic">&rdquo;</span>
              </p>
            </blockquote>
          ),
        },
      }}
    />
  )
}
