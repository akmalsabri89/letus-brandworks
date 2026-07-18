import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckoutButton,
  NoFluffAnalytics,
  PreviewLink,
} from './NoFluffActions'

export const metadata: Metadata = {
  title: 'The No-Fluff Brand Audit',
  description:
    'A 45-minute interactive brand audit for small-business owners who need a clearer pitch, stronger trust, and a practical fix list.',
  alternates: {
    canonical: '/no-fluff-brand-audit',
  },
  openGraph: {
    title: 'The No-Fluff Brand Audit',
    description:
      'Find the brand gaps making your marketing harder to understand, trust, and remember.',
    images: ['/products/no-fluff-brand-audit/audit-cover.webp'],
  },
}

const checkoutUrl = process.env.NEXT_PUBLIC_NO_FLUFF_GUMROAD_URL

const symptoms = [
  'Your answer to “What do you do?” keeps changing.',
  'Your website gets visits, but buyers still look confused.',
  'Your copy sounds generic or overly corporate.',
  'Your visual identity changes from channel to channel.',
  'You know something is off, but not what to fix first.',
]

const diagnosticQuestions = [
  'Can a new visitor explain what you sell within ten seconds?',
  'Is visible proof placed close to the buying decision?',
  'Would someone recognize your brand with the logo removed?',
]

const exercises = [
  {
    title: 'No-Fluff Elevator Pitch',
    description: 'Write a clear two-sentence explanation of what you do and why it is different.',
    output: 'A pitch customers can understand and repeat.',
  },
  {
    title: 'Human Voice Audit',
    description: 'Spot robotic language and rewrite one customer-facing headline in natural words.',
    output: 'A more direct, human way to communicate.',
  },
  {
    title: 'Money Leak Check',
    description: 'Inspect your homepage, product page, and checkout for confusion and missing trust.',
    output: 'A focused view of where buying confidence drops.',
  },
  {
    title: 'Actual Buyer Check',
    description: 'Define the urgent problem your best customer faces and the outcome they really want.',
    output: 'A sharper picture of who the brand must persuade.',
  },
  {
    title: 'Visual Value Check',
    description: 'Score whether your identity feels consistent and supports the price you charge.',
    output: 'A clearer view of the visual signals helping or hurting trust.',
  },
  {
    title: 'What Moves First',
    description: 'Sort every finding into quick wins, big projects, filler, and parked tasks.',
    output: 'A priority map that replaces scattered to-do lists.',
  },
]

const outcomes = [
  'A clearer two-sentence pitch',
  'One improved customer-facing headline',
  'A view of the conversion points weakening trust',
  'A sharper definition of your best-fit buyer',
  'A visual consistency score',
  'A prioritized next-action matrix',
  'A total Brand Gap Score',
]

const bundle = [
  {
    title: 'No-Fluff Brand Audit',
    detail: '10 interactive pages',
    description: 'Six guided checks, a priority matrix, and the final Brand Gap Scorecard.',
  },
  {
    title: 'Positioning Map',
    detail: '2 reusable pages',
    description: 'Map how your brand compares with alternatives in the market.',
  },
  {
    title: 'Business Model Canvas',
    detail: '2 reusable pages',
    description: 'Connect the brand to the business model supporting it.',
  },
  {
    title: 'SWOT Analysis',
    detail: '2 reusable pages',
    description: 'Turn internal realities and market pressure into clear strategic context.',
  },
]

const faq = [
  {
    question: 'Is this only for new businesses?',
    answer:
      'No. It is designed for businesses at any stage that are already communicating or marketing but need a clearer view of what is weakening the brand.',
  },
  {
    question: 'Do I need branding knowledge?',
    answer:
      'No. The prompts use direct business language and practical examples. You only need honest answers about your offer, customers, communication, and visual identity.',
  },
  {
    question: 'Is this an ebook or a workbook?',
    answer:
      'It is an interactive workbook. The main audit asks you to write, check, score, and prioritize instead of simply reading theory.',
  },
  {
    question: 'Can I type directly into it?',
    answer:
      'Yes. All four PDFs contain fillable fields. A desktop or laptop is recommended. You can also print the files and complete them by hand.',
  },
  {
    question: 'How long does it take?',
    answer:
      'The main audit is designed for one focused 45-minute session. The three bonus tools can be completed separately when you need deeper context.',
  },
  {
    question: 'Does this replace professional brand strategy?',
    answer:
      'No. It is a first diagnostic that helps you identify gaps and priorities. Research, stakeholder alignment, positioning, identity, and implementation may require deeper studio support.',
  },
  {
    question: 'How will I receive the files?',
    answer:
      'Gumroad will handle secure checkout and immediate digital delivery. You will receive access to all four PDFs after payment is complete.',
  },
]

export default function NoFluffBrandAuditPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#121212]">
      <NoFluffAnalytics />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-[#faf9f6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between gap-5 px-5 md:px-10">
          <Link href="/" aria-label="Letus Brandworks home" className="shrink-0">
            <Image
              src="/brand/logo.svg"
              alt="Letus Brandworks"
              width={308}
              height={83}
              className="h-7 w-auto md:h-8"
              preload
            />
          </Link>
          <nav aria-label="Product navigation" className="flex items-center gap-5">
            <a
              href="#inside"
              className="hidden text-sm font-medium text-black/60 transition-colors hover:text-black sm:inline"
            >
              See what&apos;s inside
            </a>
            <CheckoutButton
              checkoutUrl={checkoutUrl}
              placement="header"
              className="px-4 py-3"
            />
          </nav>
        </div>
      </header>

      <main>
        <section className="relative isolate min-h-[100dvh] overflow-hidden border-b border-black/10 px-5 pb-14 pt-24 md:px-10">
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-[43%] bg-[#f05a28] lg:block" />
          <div className="mx-auto grid min-h-[calc(100dvh-9.5rem)] max-w-[1500px] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="max-w-3xl py-7">
              <p className="overline mb-5 text-[#f05a28]">The No-Fluff Brand Audit</p>
              <h1 className="font-display text-[clamp(3rem,6.1vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.055em]">
                Find the brand gaps making marketing harder to trust.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/66 md:text-xl">
                A 45-minute interactive audit for owners who need a clearer pitch, stronger trust, and a practical fix list.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CheckoutButton checkoutUrl={checkoutUrl} placement="hero" />
                <PreviewLink
                  href="#preview"
                  label="Preview the workbook"
                  placement="hero"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm border border-black/20 px-6 py-4 text-sm font-semibold text-black transition-[background-color,border-color,transform] hover:border-black hover:bg-black/5 active:translate-y-px"
                />
              </div>
            </div>

            <div id="preview" className="relative flex min-h-[420px] items-center justify-center pb-4 lg:min-h-[72vh] lg:pb-0">
              <div className="w-full max-w-[900px] overflow-hidden rounded-sm border border-black/15 bg-[#f05a28] p-4 shadow-[0_32px_100px_rgba(28,16,8,0.28)] md:p-6">
                <Image
                  src="/products/no-fluff-brand-audit/protected-preview.webp"
                  alt="The No-Fluff Brand Audit cover layered over two intentionally obscured inside pages"
                  width={1800}
                  height={1320}
                  preload
                  className="h-auto w-full rounded-sm shadow-[0_24px_70px_rgba(28,16,8,0.20)]"
                />
                <p className="px-1 pb-1 pt-4 text-xs font-medium leading-relaxed text-white/78 md:text-sm">
                  Cover shown clearly. Working pages intentionally obscured.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Product facts" className="border-b border-black/10 px-5 md:px-10">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-4">
            {[
              ['45 minutes', 'One focused audit'],
              ['10 pages', 'Interactive main workbook'],
              ['3 tools', 'Reusable strategy canvases'],
              ['$29 USD', 'One-time payment'],
            ].map(([value, label], index) => (
              <div
                key={value}
                className={`py-7 ${index % 2 === 0 ? 'pr-4' : 'border-l border-black/10 pl-4'} lg:border-l lg:border-black/10 lg:px-7 ${index === 0 ? 'lg:border-l-0 lg:pl-0' : ''}`}
              >
                <strong className="block font-display text-2xl font-medium tracking-[-0.04em] md:text-3xl">
                  {value}
                </strong>
                <span className="mt-1 block text-xs leading-relaxed text-black/52 md:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-black/10 px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <h2 className="display-md max-w-4xl">If any of these feel familiar, start here.</h2>
            <div className="mt-12 grid gap-x-10 gap-y-0 md:grid-cols-2 lg:grid-cols-[1.05fr_0.95fr]">
              {symptoms.map((symptom, index) => (
                <div
                  key={symptom}
                  className={`grid grid-cols-[44px_1fr] gap-4 border-b border-black/14 py-6 ${index === symptoms.length - 1 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
                >
                  <span className="font-mono text-sm text-[#f05a28]">{String(index + 1).padStart(2, '0')}</span>
                  <p className="max-w-xl text-lg leading-relaxed text-black/72">{symptom}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 bg-white px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="max-w-4xl">
              <h2 className="display-md">Marketing amplifies what is already there.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/64">
                When the pitch, voice, buying path, audience, or visual signals are unclear, more reach creates more confused impressions.
              </p>
            </div>

            <div className="mt-14 border-y border-black/15">
              {diagnosticQuestions.map((question, index) => (
                <div
                  key={question}
                  className="grid gap-4 border-b border-black/12 py-7 last:border-b-0 md:grid-cols-[80px_1fr_auto] md:items-center"
                >
                  <span className="font-display text-3xl font-medium text-[#f05a28]">0{index + 1}</span>
                  <p className="max-w-3xl text-xl leading-snug md:text-2xl">{question}</p>
                  <span className="hidden text-sm text-black/45 md:block">Yes / Not sure</span>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <CheckoutButton checkoutUrl={checkoutUrl} placement="mini-diagnostic" />
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="max-w-xl">
              <h2 className="display-md">Turn vague doubt into a prioritized fix list.</h2>
              <p className="mt-6 text-lg leading-relaxed text-black/64">
                The No-Fluff Brand Audit adapts the diagnostic logic used in deeper studio engagements into an owner-led first step.
              </p>
              <p className="mt-5 text-base leading-relaxed text-black/56">
                It identifies what deserves attention. It does not replace research, strategy, identity development, or implementation.
              </p>
            </div>
            <div className="rounded-sm bg-[#f05a28] p-7 text-white md:p-10">
              {[
                ['Brand Gap Score', 'See the overall condition of the brand.'],
                ['Priority Matrix', 'Separate quick wins from larger projects.'],
                ['Clear Next Action', 'Know what deserves attention first.'],
              ].map(([title, description], index) => (
                <div key={title} className="grid grid-cols-[42px_1fr] gap-4 border-b border-white/25 py-6 first:pt-0 last:border-b-0 last:pb-0">
                  <span className="font-mono text-xs text-white/58">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-[-0.04em]">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/72">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="inside" className="border-b border-black/10 px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1500px]">
            <h2 className="display-md max-w-4xl">Six exercises. One scorecard. No strategy theatre.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/62">
              Every section produces an answer you can use, not another page of brand theory.
            </p>

            <div className="mt-14 grid gap-x-14 lg:grid-cols-2">
              {exercises.map((exercise, index) => (
                <article
                  key={exercise.title}
                  className="grid grid-cols-[48px_1fr] gap-5 border-t border-black/14 py-8"
                >
                  <span className="font-display text-3xl font-medium text-[#f05a28]">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-[-0.04em] md:text-3xl">
                      {exercise.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/60">{exercise.description}</p>
                    <p className="mt-5 border-l-2 border-[#f05a28] pl-4 text-sm font-medium leading-relaxed text-black/78">
                      {exercise.output}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div data-scroll-depth="50" aria-hidden="true" className="h-px" />

        <section className="border-b border-black/10 bg-[#f05a28] px-5 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <h2 className="font-display max-w-4xl text-[clamp(2.5rem,5.5vw,5.5rem)] font-medium leading-[1] tracking-[-0.055em]">
              What you will have after 45 minutes.
            </h2>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className={`min-h-[170px] rounded-sm border border-white/28 p-5 ${index === 0 || index === 6 ? 'bg-white text-[#121212]' : 'bg-white/[0.04]'} ${index === 6 ? 'lg:col-span-2' : ''}`}
                >
                  <span className={`font-mono text-xs ${index === 0 || index === 6 ? 'text-[#f05a28]' : 'text-white/58'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-8 text-lg font-medium leading-snug">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <h2 className="display-md">Download. Audit. Prioritize.</h2>
            <div className="mt-12 grid border-y border-black/15 md:grid-cols-3">
              {[
                ['Download', 'Receive four interactive PDFs after secure checkout.'],
                ['Audit', 'Work through the main workbook in one focused session.'],
                ['Prioritize', 'Use the scorecard and matrix to decide what moves first.'],
              ].map(([title, description], index) => (
                <div
                  key={title}
                  className={`py-8 md:min-h-[220px] md:px-8 ${index > 0 ? 'border-t border-black/12 md:border-l md:border-t-0' : ''} ${index === 0 ? 'md:pl-0' : ''}`}
                >
                  <h3 className="font-display text-3xl font-medium tracking-[-0.04em]">{title}</h3>
                  <p className="mt-5 max-w-sm text-base leading-relaxed text-black/60">{description}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-black/52">
              Fillable on desktop, printable, and designed for repeat use when your offer or market changes.
            </p>
          </div>
        </section>

        <section className="border-b border-black/10 bg-white px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="flex min-h-[410px] flex-col justify-between rounded-sm bg-[#f05a28] p-7 text-white md:p-10">
              <p className="text-sm font-medium text-white/65">The complete digital bundle</p>
              <div>
                <strong className="block font-display text-[clamp(5rem,10vw,9rem)] font-medium leading-none tracking-[-0.07em]">4</strong>
                <span className="mt-2 block font-display text-3xl font-medium tracking-[-0.04em]">interactive PDFs</span>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
                  Sixteen fillable pages across the main audit and three reusable strategy tools.
                </p>
              </div>
            </div>
            <div>
              <h2 className="display-md max-w-4xl">Four practical files. Sixteen interactive pages.</h2>
              <div className="mt-10 grid gap-x-10 md:grid-cols-2">
                {bundle.map((item, index) => (
                  <article key={item.title} className="border-t border-black/14 py-7">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs text-[#f05a28]">0{index + 1}</span>
                      <div>
                        <h3 className="font-display text-xl font-medium tracking-[-0.04em] md:text-2xl">{item.title}</h3>
                        <span className="mt-2 block text-xs font-medium text-[#f05a28]">{item.detail}</span>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/58">{item.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 bg-white px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-2">
            <div className="rounded-sm bg-[#f05a28] p-7 text-white md:p-10">
              <h2 className="font-display text-4xl font-medium tracking-[-0.05em] md:text-5xl">Built for owner-led clarity.</h2>
              <ul className="mt-10 space-y-5 text-base leading-relaxed text-white/88">
                <li>Small and growing businesses already doing marketing</li>
                <li>Teams preparing for a website, campaign, refresh, or rebrand</li>
                <li>Owners willing to answer honestly and act on the findings</li>
                <li>Businesses that need a clear starting point before a larger investment</li>
              </ul>
            </div>
            <div className="rounded-sm border border-black/12 bg-[#faf9f6] p-7 md:p-10">
              <h2 className="font-display text-4xl font-medium tracking-[-0.05em] md:text-5xl">Choose deeper support when needed.</h2>
              <ul className="mt-10 space-y-5 text-base leading-relaxed text-black/68">
                <li>Multiple stakeholders need alignment</li>
                <li>Customer or competitor research is required</li>
                <li>Positioning, naming, identity, or brand systems must be developed</li>
                <li>The business needs the studio to execute the fixes</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1500px]">
            <div className="max-w-4xl">
              <h2 className="display-md">Built from real brand work, simplified into one focused audit.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/62">
                The sample establishes the workbook&apos;s structure and design quality. Letus&apos; deeper engagements show where the underlying process can lead with full strategy and execution.
              </p>
            </div>

            <div className="mt-14 grid overflow-hidden rounded-sm border border-black/12 bg-white lg:grid-cols-[0.72fr_1.28fr]">
              <div className="flex min-h-[300px] items-center justify-center bg-[#f05a28] p-8 text-white md:p-12">
                <strong className="font-display text-[clamp(4.5rem,10vw,9rem)] font-medium leading-none tracking-[-0.07em]">130%+</strong>
              </div>
              <div className="p-7 md:p-12">
                <h3 className="font-display text-3xl font-medium tracking-[-0.04em] md:text-5xl">
                  Geliga Printing grew after a deeper Letus branding engagement.
                </h3>
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-black/62">
                  That fuller engagement carried the work through strategy, identity, and execution. This audit is the diagnostic starting point, not the cause of that result.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="buy" className="border-b border-black/10 bg-[#f3eee5] px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div className="max-w-3xl">
              <h2 className="font-display text-[clamp(3rem,6.2vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.06em]">
                Stop guessing. Decide what moves first.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/62">
                One focused audit, three reusable strategy tools, and a clearer priority list for the business.
              </p>
            </div>

            <div className="rounded-sm border border-black/14 bg-white p-7 shadow-[0_24px_70px_rgba(45,29,16,0.10)] md:p-9">
              <p className="text-sm font-medium text-black/52">The complete digital bundle</p>
              <div className="mt-3 flex items-end gap-3">
                <strong className="font-display text-7xl font-medium tracking-[-0.07em]">$29</strong>
                <span className="pb-2 text-sm text-black/45">USD</span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 text-sm text-black/68">
                <span>4 interactive PDFs</span>
                <span>16 total pages</span>
                <span>45-minute main audit</span>
                <span>3 reusable tools</span>
              </div>
              <CheckoutButton
                checkoutUrl={checkoutUrl}
                placement="offer"
                pending="disabled"
                className="mt-8 w-full"
              />
              <p className="mt-4 text-center text-xs leading-relaxed text-black/42">
                Secure checkout and instant digital delivery through Gumroad.
              </p>
            </div>
          </div>
        </section>

        <section data-scroll-depth="90" className="border-b border-black/10 px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="display-md">Questions before you begin.</h2>
            <div className="mt-12 border-t border-black/15">
              {faq.map(item => (
                <details key={item.question} className="group border-b border-black/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span aria-hidden="true" className="text-2xl font-normal text-[#f05a28] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 text-base leading-relaxed text-black/62">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f05a28] px-5 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <h2 className="font-display max-w-5xl text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.96] tracking-[-0.06em]">
              Find the gaps. Choose the priorities. Move with clarity.
            </h2>
            <div className="mt-10">
              <CheckoutButton
                checkoutUrl={checkoutUrl}
                placement="final"
                pending="disabled"
                className="border border-white/35 bg-white text-[#121212] hover:bg-[#faf9f6]"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-[#faf9f6] px-5 py-9 md:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" aria-label="Letus Brandworks home" className="inline-block">
              <Image
                src="/brand/logo.svg"
                alt="Letus Brandworks"
                width={308}
                height={83}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-3 text-xs text-black/42">© {new Date().getFullYear()} Letus Brandworks</p>
          </div>
          <nav aria-label="Legal and support" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-black/58">
            <Link href="/privacy-policy" className="transition-colors hover:text-black">
              Privacy Policy
            </Link>
            <a href="mailto:hello@letusbrandworks.com" className="transition-colors hover:text-black">
              Support
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
