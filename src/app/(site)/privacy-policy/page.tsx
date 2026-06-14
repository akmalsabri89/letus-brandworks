import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Letus Brandworks, including how we collect, use, and protect information submitted through our website.',
}

const SECTIONS = [
  {
    title: 'Information we collect',
    body: [
      'When you contact us through the website, we may collect information you choose to provide, such as your name, email address, company name, website, project details, and any message you send to us.',
      'We may also collect basic technical information automatically, such as pages visited, device type, browser type, approximate location, referral source, and interactions with our website.',
    ],
  },
  {
    title: 'How we use information',
    body: [
      'We use the information we collect to respond to enquiries, understand project fit, provide our services, improve our website, measure marketing performance, and maintain the security and reliability of our systems.',
      'We do not sell personal information.',
    ],
  },
  {
    title: 'Analytics, advertising, and Meta Pixel',
    body: [
      'Our website may use analytics and advertising tools, including Meta Pixel, to understand how visitors use the website, measure campaign performance, and build remarketing audiences.',
      'These tools may use cookies or similar technologies to collect browsing activity and device information. Meta may process this information according to its own privacy policy and settings.',
      'You can manage cookies and tracking through your browser settings, device settings, or the privacy controls provided by the relevant advertising platforms.',
    ],
  },
  {
    title: 'Sharing information',
    body: [
      'We may share information with trusted service providers who help us operate the website, process enquiries, send email, manage analytics, host data, or deliver marketing services.',
      'We may also disclose information if required by law, regulation, legal process, or to protect the rights, safety, and property of Letus Brandworks, our clients, or others.',
    ],
  },
  {
    title: 'Data retention',
    body: [
      'We keep personal information only for as long as reasonably necessary for the purposes described in this policy, unless a longer retention period is required or permitted by law.',
      'Project enquiries and business correspondence may be retained as part of our operational records.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You may contact us to request access, correction, or deletion of personal information you have provided to us, subject to any legal or operational requirements that apply.',
      'You may also opt out of some advertising tracking through your browser, device, or platform privacy settings.',
    ],
  },
  {
    title: 'Security',
    body: [
      'We take reasonable steps to protect information from unauthorised access, loss, misuse, or disclosure. However, no method of transmission or storage is completely secure.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. The latest version will be published on this page with the updated date.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-foreground/10">
        <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-20 md:px-10 md:pb-28">
          <p className="overline text-muted-foreground mb-6">[ Legal ]</p>
          <h1 className="display-lg mb-8 max-w-4xl">Privacy Policy</h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            This Privacy Policy explains how Letus Brandworks collects, uses, and protects
            information when you visit our website or contact the studio.
          </p>
          <p className="overline mt-10 text-muted-foreground">Last updated: 13 June 2026</p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10 px-6 py-20 md:px-10 md:py-28">
          <aside className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="sticky top-28 rounded-sm border border-foreground/10 p-6">
              <p className="overline text-muted-foreground mb-4">Contact</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                For privacy questions or requests, email us at{' '}
                <a
                  href="mailto:hello@letusbrandworks.com"
                  className="text-foreground underline underline-offset-4 hover:text-eruption"
                >
                  hello@letusbrandworks.com
                </a>
                .
              </p>
            </div>
          </aside>

          <div className="col-span-12 md:col-span-8 lg:col-span-7 lg:col-start-5">
            <div className="space-y-14">
              {SECTIONS.map((section, index) => (
                <section key={section.title} className="border-b border-foreground/10 pb-14 last:border-b-0">
                  <p className="overline accent-orange mb-4">{String(index + 1).padStart(2, '0')}</p>
                  <h2 className="mb-6 font-display text-2xl font-medium tracking-[-0.04em] md:text-4xl">
                    {section.title}
                  </h2>
                  <div className="space-y-5">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-relaxed text-muted-foreground md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
