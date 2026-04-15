import Image from 'next/image'

const serviceLinks = [
  'Brand Strategy',
  'Brand Identity',
  'Website Design',
  'Marketing Strategy',
]

const companyLinks = ['About', 'Our Work', 'Process', 'Blog', 'Contact']

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f]">
      {/* Top section */}
      <div className="py-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 — Brand */}
          <div>
            <Image
              src="/brand/logo-white.svg"
              alt="Letus Brandworks"
              width={90}
              height={28}
            />
            <p
              className="text-sm text-white/40 mt-4 leading-relaxed max-w-[200px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Boutique Brand Design Agency
            </p>
            <div className="mt-6 flex gap-4">
              {/* Instagram */}
              <a href="#" className="text-white/35 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-white/35 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="text-white/35 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-5"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Services
            </p>
            <ul className="space-y-0">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm text-white/50 hover:text-white transition-colors leading-loose"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {label}
                  </a>
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
            <ul className="space-y-0">
              {companyLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm text-white/50 hover:text-white transition-colors leading-loose"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {label}
                  </a>
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
            © 2025 Letus Brandworks. All rights reserved.
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
