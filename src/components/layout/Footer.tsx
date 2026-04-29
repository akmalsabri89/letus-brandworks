import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

const serviceLinks = [
  { label: 'Brand Strategy', href: '/services' },
  { label: 'Brand Identity', href: '/services' },
  { label: 'Website Design', href: '/services' },
  { label: 'Marketing Strategy', href: '/services' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Our Work', href: '/works' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f]">
      {/* Top section */}
      <div className="py-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 — Brand */}
          <div>
            <Logo white width={90} height={28} />
            <p
              className="text-sm text-white/40 mt-4 leading-relaxed max-w-[200px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Volcanic brand strategy and identity — built to erupt.
            </p>
          </div>

          {/* Col 2 — Services */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-5"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Services
            </p>
            <ul>
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors leading-loose"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-5"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Company
            </p>
            <ul>
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors leading-loose"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-5"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Connect
            </p>
            <a
              href="mailto:hello@letusbrandworks.com"
              className="text-sm text-white/50 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              hello@letusbrandworks.com
            </a>
            <p
              className="text-xs text-white/25 mt-4"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Based in Kedah, Malaysia
            </p>
            <p
              className="text-xs text-white/25 mt-1"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Available for projects worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] py-6 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs text-white/25"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            © {new Date().getFullYear()} Letus Brandworks. All rights reserved.
          </p>
          <p
            className="text-xs text-white/25"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Designed &amp; built by Letus
          </p>
        </div>
      </div>
    </footer>
  )
}
