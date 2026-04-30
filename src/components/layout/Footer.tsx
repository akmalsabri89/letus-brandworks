import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Work', href: '/works' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-[#1a1a1a] py-16 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">

        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">

          {/* Brand */}
          <div className="max-w-[280px]">
            <p
              className="text-[18px] font-[900] text-white tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              LETUS<span className="text-[#f05a28]">.</span>
            </p>
            <p
              className="text-[13px] leading-relaxed text-[#444]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Boutique brand strategy and identity design. Kedah, Malaysia.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#555] hover:text-[#f05a28] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p
              className="text-[10px] tracking-[2px] uppercase text-[#333] mb-3"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Get in touch
            </p>
            <a
              href="mailto:akmal.kreation@gmail.com"
              className="text-[13px] text-[#555] hover:text-[#f05a28] transition-colors duration-200 block"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              akmal.kreation@gmail.com
            </a>
          </div>

        </div>

        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row justify-between gap-3">
          <p
            className="text-[11px] text-[#333]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            © {new Date().getFullYear()} Letus Brandworks. All rights reserved.
          </p>
          <p
            className="text-[11px] text-[#2a2a2a]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Crafted in Kedah.
          </p>
        </div>

      </div>
    </footer>
  )
}
