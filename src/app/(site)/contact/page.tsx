import type { Metadata } from 'next'
import { Mail, MessageCircle } from 'lucide-react'
import { CTAForm } from '@/components/sections/CTAForm'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Tell us about your brand and what you're trying to build. We'll take it from there.",
}

interface SiteSettings {
  email?: string
  whatsapp?: { number?: string; display?: string }
  socials?: Array<{ platform: string; url: string }>
}

export default async function ContactPage() {
  const settings: SiteSettings = await client.fetch(siteSettingsQuery) ?? {}

  const email = settings.email ?? 'hello@letusbrandworks.com'
  const whatsappUrl = settings.whatsapp?.number
    ? `https://wa.me/${settings.whatsapp.number}`
    : 'https://wa.me/60143693225'
  const whatsappDisplay = settings.whatsapp?.display ?? '+6014-369 3225'
  const socials = settings.socials ?? []

  return (
    <section className="min-h-dvh">
      <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-24 md:px-10">

        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="overline text-muted-foreground mb-6">[ Contact ]</p>
          <h1 className="display-lg mb-6">Start a Project</h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Tell us about your brand and what you&apos;re trying to build. We&apos;ll take it from there.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Form */}
          <div>
            <CTAForm />
          </div>

          {/* Contact info */}
          <div className="lg:pt-4">
            <p className="overline text-muted-foreground mb-6">Or reach us directly</p>

            <div className="flex flex-col gap-4 mb-10">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 rounded-sm border border-border px-5 py-4 text-foreground hover:border-primary hover:text-primary transition-colors group"
              >
                <Mail size={18} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                <span className="text-sm font-medium">{email}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-sm border border-border px-5 py-4 text-foreground hover:border-[#25d366] hover:text-[#25d366] transition-colors group"
              >
                <MessageCircle size={18} className="text-muted-foreground group-hover:text-[#25d366] transition-colors flex-shrink-0" />
                <span className="text-sm font-medium">{whatsappDisplay}</span>
              </a>
            </div>

            {socials.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socials.map(s => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overline text-muted-foreground border border-border px-4 py-2 hover:border-foreground hover:text-foreground transition-colors"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            )}

            <div className="mt-12 pt-10 border-t border-foreground/10">
              <p className="overline text-muted-foreground mb-2">Working from</p>
              <p className="text-foreground font-medium">SOL · III</p>
              <p className="text-muted-foreground text-sm mt-1">Available across the planet</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
