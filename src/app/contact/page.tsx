import { CTAForm } from '@/components/sections/CTAForm'
import { CONTACT } from '@/config/contact'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-[#faf9f6] pt-32 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[640px] mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="text-4xl lg:text-5xl font-[500] text-[#1a1a1a] leading-tight tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Start a Project
            </h1>
            <p
              className="text-base text-[#777] max-w-[400px] mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Tell us about your brand and what you&apos;re trying to build. We&apos;ll take it from there.
            </p>
          </div>

          {/* Form */}
          <CTAForm />

          {/* Contact methods */}
          <div className="mt-12 pt-10 border-t border-[#1a1a1a]/8">
            <p
              className="text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-[#bbb] mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Or reach us directly
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              {/* Email */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-[#e5e5e5] hover:border-[#f05a28] hover:text-[#f05a28] text-[#1a1a1a] transition-colors duration-200 group w-full sm:w-auto justify-center"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <span className="text-[#999] group-hover:text-[#f05a28] transition-colors duration-200">
                  <MailIcon />
                </span>
                <span className="text-[13px] font-medium">{CONTACT.email}</span>
              </a>

              {/* WhatsApp */}
              <a
                href={CONTACT.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-[#e5e5e5] hover:border-[#25d366] hover:text-[#25d366] text-[#1a1a1a] transition-colors duration-200 group w-full sm:w-auto justify-center"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <span className="text-[#999] group-hover:text-[#25d366] transition-colors duration-200">
                  <WhatsAppIcon />
                </span>
                <span className="text-[13px] font-medium">{CONTACT.whatsapp.display}</span>
              </a>

            </div>

            {/* Socials — renders only when populated */}
            {CONTACT.socials.length > 0 && (
              <div className="flex items-center justify-center gap-3 mt-4">
                {CONTACT.socials.map(s => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#1a1a1a] text-[#777] hover:text-[#1a1a1a] text-[12px] font-medium transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
