import type { Metadata } from 'next';
import { Clock3, Mail, PhoneCall, ShieldCheck } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { EnquiryForm } from '@/components/enquiry-form';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCards } from '@/components/service-cards';
import { processSteps } from '@/data/services';
import { deliveryStatus } from '@/lib/leads/store';
import { siteConfig } from '@/lib/site';

/**
 * Rendered per-request so the lead-delivery setup notice reflects the live
 * environment rather than whatever was set at build time.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Request a Free Website Consultation',
  description:
    'Restaurant owner in Hajipur? Request a free website consultation for a branded restaurant website, digital menu or local search setup. Fixed quote, no obligation.',
  alternates: { canonical: '/partner' },
  openGraph: {
    title: 'Request a Free Website Consultation · Hajipur Food',
    description:
      'Branded restaurant websites, digital menus and local search foundations for Hajipur and Bihar.',
    url: '/partner',
  },
};

const expectations = [
  {
    icon: Clock3,
    title: 'A reply within two working days',
    body: 'You will hear back from a person, not an automated sequence.',
  },
  {
    icon: PhoneCall,
    title: 'A short, free consultation',
    body: 'Fifteen minutes about your menu, your customers and what you want the site to do.',
  },
  {
    icon: ShieldCheck,
    title: 'A fixed quote before any work',
    body: 'Itemised and agreed up front. If it is not right, you owe nothing.',
  },
];

export default function PartnerPage() {
  const delivery = deliveryStatus();
  const email = siteConfig.enquiryEmail;

  return (
    <>
      <header className="relative overflow-hidden border-b border-[var(--line)] pb-20 pt-[calc(var(--nav-height)+5rem)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_34rem_at_28%_0%,rgba(200,169,107,0.14),transparent_62%)]"
        />
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="For restaurant owners"
                title="Let’s build your restaurant’s online presence."
                description="You already have the hard part — the food, the room, the regulars. This is about making sure the people looking for you can actually find you, understand what you serve and reach you."
                as="h1"
              />

              <ul className="mt-11 flex flex-col gap-6">
                {expectations.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 0.08}>
                      <li className="flex gap-5">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(200,169,107,0.35)] bg-[rgba(200,169,107,0.08)] text-[var(--gold)]">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                        <div>
                          <h2 className="font-display text-[1.15rem] text-ivory">
                            {item.title}
                          </h2>
                          <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    </Reveal>
                  );
                })}
              </ul>

              <Reveal delay={0.2} className="mt-11">
                <div className="flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-8">
                  <p className="text-[0.875rem] text-[var(--muted)]">
                    Prefer email?
                    {email ? (
                      <>
                        {' '}
                        <a
                          href={`mailto:${email}?subject=${encodeURIComponent(
                            'Restaurant website enquiry',
                          )}`}
                          className="inline-flex items-center gap-1.5 text-[var(--gold)] underline underline-offset-4"
                        >
                          <Mail size={14} aria-hidden="true" />
                          {email}
                        </a>
                      </>
                    ) : (
                      <>
                        {' '}
                        Use the form on this page — it reaches the same inbox and gives us
                        everything we need to reply properly.
                      </>
                    )}
                  </p>
                </div>
              </Reveal>
            </div>

            <div id="consultation" className="scroll-mt-28">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </header>

      {/* Operator notice. Never shown to the public as marketing — it exists so a
    misconfigured deployment is obvious before leads start going missing. */}
      {delivery.notice ? (
        <div className="border-b border-[var(--line)] bg-[rgba(200,169,107,0.05)]">
          <div className="shell py-4">
            <p className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
              <span>
                <strong className="font-medium text-ivory">Setup notice.</strong>{' '}
                {delivery.notice}{' '}
                {delivery.driver === 'file' ? (
                  <>
                    Set <code className="text-[var(--gold-soft)]">LEAD_DELIVERY=webhook</code> and{' '}
                    <code className="text-[var(--gold-soft)]">LEAD_WEBHOOK_URL</code> for
                    production delivery — see <span className="text-ivory">README.md</span>.
                  </>
                ) : null}
              </span>
            </p>
          </div>
        </div>
      ) : null}

      {/* --------------------------------------------------------- services */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="What we build"
            title="Three ways we can help"
            description="Pick one, or let us recommend the combination that suits your restaurant."
          />
          <div className="mt-14">
            <ServiceCards compact />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- process */}
      <section className="section section-alt">
        <div className="shell">
          <SectionHeading eyebrow="The process" title="How it works, in four steps" />
          <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="border-t border-[var(--line)] pt-6">
                <span className="font-display text-[2rem] leading-none text-[rgba(200,169,107,0.32)]">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-[1.15rem] text-ivory">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                  {step.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Not ready yet?"
        title="Look around first."
        description="Browse the restaurant collection, see how we present a listing, and decide whether this is something you want for your own restaurant."
        primaryLabel="Explore Restaurants"
        primaryHref="/restaurants"
        secondaryLabel="Read about the project"
        secondaryHref="/about"
      />
    </>
  );
}