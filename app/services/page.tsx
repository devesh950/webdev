import type { Metadata } from 'next';

import { CtaBand } from '@/components/cta-band';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCards } from '@/components/service-cards';
import { processSteps } from '@/data/services';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Restaurant Website Design in Hajipur & Bihar',
  description:
    'Branded restaurant websites, digital menus and local SEO foundations for restaurants in Hajipur and Bihar. Mobile-first design, honest scoping, no ranking promises.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Restaurant Website Design in Hajipur · Hajipur Food',
    description:
      'Branded restaurant websites, digital menus and local SEO foundations for restaurants in Hajipur and Bihar.',
    url: '/services',
  },
};

const faqs = [
  {
    question: 'How long does a restaurant website take?',
    answer:
      'Most single-location restaurant sites are built in two to four weeks depending on how much of your menu, photography and history you already have ready. We agree a timeline before starting.',
  },
  {
    question: 'Can I update the menu myself afterwards?',
    answer:
      'Yes. Your site is handed over with a clear way to change dishes and prices yourself, plus a short walkthrough so you are never dependent on us for small edits.',
  },
  {
    question: 'Will this get my restaurant to the top of Google?',
    answer:
      'Nobody can honestly promise that, and we will not. What we do build is the technical and content foundation that local search depends on, so your business information is accurate and your pages are genuinely usable on a phone.',
  },
  {
    question: 'Do you provide the food photography?',
    answer:
      'No. We design around your own photographs so the site looks like your restaurant. If you do not have a photographer yet, we can recommend one.',
  },
  {
    question: 'What does it cost?',
    answer:
      'It depends on how many pages, how large the menu is and whether you need a digital menu ordering flow. You will get a fixed, itemised quote after the free consultation — before any work begins.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-[var(--line)] pb-20 pt-[calc(var(--nav-height)+5rem)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_34rem_at_70%_0%,rgba(200,169,107,0.14),transparent_62%)]"
        />
        <div className="shell">
          <SectionHeading
            eyebrow="Website development services"
            title={
              <>
                Your restaurant deserves a
                <br className="hidden sm:block" />{' '}
                <span className="italic gold-gradient-text">remarkable</span> digital presence
              </>
            }
            description="Turn your restaurant’s online presence into a destination where customers can explore your menu, discover your location, and connect with your business."
            as="h1"
          />

          <Reveal delay={0.15} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#consultation" className="btn btn-primary">
              Build My Restaurant Website
            </a>
            <a href="#process" className="btn btn-ghost">
              See the process
            </a>
          </Reveal>
        </div>
      </header>

      {/* --------------------------------------------------------- services */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="What you get"
            title="Three things, done properly"
            description="We keep the scope tight so the result is something you will actually be proud to share."
          />
          <div className="mt-14">
            <ServiceCards />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- process */}
      <section id="process" className="section section-alt">
        <div className="shell">
          <SectionHeading
            eyebrow="The process"
            title="From first call to live site"
            description="No jargon, no mystery. You will know what is happening at each step."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-card border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <RevealItem key={step.step}>
                <div className="flex h-full flex-col gap-4 bg-[var(--surface)] p-7">
                  <span className="font-display text-[2.4rem] leading-none text-[rgba(200,169,107,0.32)]">
                    {step.step}
                  </span>
                  <h3 className="font-display text-[1.2rem] text-ivory">{step.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* --------------------------------------------------------- promises */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="What we will not do"
                title="No promises we cannot keep"
                description="Local business owners deserve straight answers, so here is what you will never hear from us."
              />
              <ul className="mt-9 flex flex-col gap-5">
                {[
                  'Guarantee a number one Google ranking.',
                  'Guarantee a specific number of calls or leads.',
                  'Publish your menu, prices or hours without your approval.',
                  'Buy fake reviews, ratings or awards.',
                  'Hide the fact that a site is advertising.',
                ].map((item, index) => (
                  <Reveal key={item} delay={index * 0.06}>
                    <li className="flex gap-4 border-b border-[var(--line)] pb-5">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-5 shrink-0 bg-[var(--bronze)]"
                      />
                      <span className="text-[1rem] text-[var(--muted)]">{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <SectionHeading
                eyebrow="Common questions"
                title="Before you get in touch"
              />
              <div className="mt-9 flex flex-col gap-px overflow-hidden rounded-card border border-[var(--line)] bg-[var(--line)]">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group bg-[var(--surface)] p-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[1rem] text-ivory marker:hidden">
                      {faq.question}
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-[var(--gold)] transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div id="consultation" className="scroll-mt-28">
        <CtaBand
          eyebrow="Free consultation"
          title="Let’s talk about your restaurant."
          description="Tell us what you serve and what you want the website to do. We will come back with a plain-English plan and a fixed quote — with no obligation."
        />
      </div>
    </>
  );
}