import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FooterTicker } from '@/components/FooterTicker'

const FOOTER_LINKS = [
  { label: 'Works', href: '/works' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
]

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/letusbrandworks' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/letusbrandworks' },
  { label: 'Behance', href: 'https://behance.net/letusbrandworks' },
]

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-foreground/10">
      <FooterTicker />

      {/* CTA strip */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <h2 className="display-lg max-w-2xl">
          Ready to ignite your brand?
        </h2>
        <Link
          href="/contact"
          data-cursor="→ Let's Talk"
          className="flex items-center gap-2 rounded-sm bg-eruption px-6 py-4 text-white transition-transform hover:-translate-y-0.5 shrink-0"
        >
          <span className="overline">Start a Project</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Wordmark */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 overflow-hidden">
        <p
          aria-hidden="true"
          className="font-display font-medium leading-none tracking-[-0.045em] text-foreground/[0.06] dark:text-foreground/[0.08] select-none"
          style={{ fontSize: 'clamp(5rem, 23vw, 22rem)' }}
        >
          letus.
        </p>
      </div>

      {/* Bottom grid */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-foreground/10">
        <div className="col-span-2 md:col-span-1">
          <p className="overline text-muted-foreground mb-3">Studio</p>
          <p className="text-sm text-foreground leading-relaxed">
            Letus Brandworks
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Available worldwide
          </p>
        </div>

        <div>
          <p className="overline text-muted-foreground mb-3">Navigation</p>
          <ul className="flex flex-col gap-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="overline text-muted-foreground mb-3">Social</p>
          <ul className="flex flex-col gap-2">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s.label}
                  <ArrowUpRight size={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="overline text-muted-foreground mb-3">Contact</p>
          <a
            href="mailto:hello@letusbrandworks.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
          >
            hello@letusbrandworks.com
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="overline text-muted-foreground">
          © {new Date().getFullYear()} Letus Brandworks
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy-policy"
            className="overline text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <p className="overline text-muted-foreground">
            Designed &amp; built by Letus
          </p>
        </div>
      </div>
    </footer>
  )
}
