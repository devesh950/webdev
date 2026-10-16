import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionHeading } from '@/components/section-heading';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Hajipur Food collects, stores and uses enquiry data submitted through the restaurant website consultation form.',
  alternates: { canonical: '/privacy' },
};

const updated = '16 October 2026';

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-[var(--line)] pb-14 pt-[calc(var(--nav-height)+3.5rem)]">
        <div className="shell">
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            description={`Last updated ${updated}. Written to be read, not to be survived.`}
            as="h1"
          />
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          <div className="max-w-prose flex flex-col gap-10">
            {[
              {
                heading: 'What we collect',
                body: 'When you submit an enquiry we collect the details you type into the form: your name, restaurant name, phone or WhatsApp number, an optional business email, your current website status, the services you are interested in, an optional budget range, and any message you write. We also receive the standard technical information your browser sends with any request, such as your IP address and user agent, which we use for spam protection and rate limiting.',
              },
              {
                heading: 'Why we collect it',
                body: 'So we can reply to your enquiry with a plan and a quote. We do not sell your details, and we do not add them to an unrelated mailing list.',
              },
              {
                heading: 'Where it is stored',
                body: 'Enquiries are delivered to a business inbox or lead system configured by this website. In local development they are written to a local file that is excluded from version control. Both destinations are operated by us; no third-party advertising or analytics scripts receive form data.',
              },
              {
                heading: 'How long we keep it',
                body: 'For as long as the conversation with you is useful, and no longer than we reasonably need. Ask us to delete it at any time and we will.',
              },
              {
                heading: 'Cookies and analytics',
                body: 'This site does not use advertising cookies. If analytics are added in future, this policy will be updated before they are enabled.',
              },
              {
                heading: 'Your rights',
                body: `You can ask for a copy of the information we hold about you, ask us to correct it, or ask us to delete it. Contact us at ${
                  siteConfig.enquiryEmail ? (
                    <a
                      href={`mailto:${siteConfig.enquiryEmail}?subject=${encodeURIComponent(
                        'Privacy request',
                      )}`}
                      className="text-[var(--gold)] underline underline-offset-4"
                    >
                      {siteConfig.enquiryEmail}
                    </a>
                  ) : (
                    'the address on our enquiry form'
                  )
                }.`,
              },
              {
                heading: 'Restaurant listings',
                body: 'Restaurant descriptions and cuisine highlights are supplied starting content and may not be fully verified. Photography on this site is licensed stock imagery and is not a photograph of the restaurants shown. Each listing links to its Google Maps record, which is the authoritative source for that business’s own information.',
              },
            ].map((block) => (
              <section key={block.heading}>
                <h2 className="font-display text-[1.45rem] text-ivory">{block.heading}</h2>
                <p className="mt-4 text-[1rem] leading-relaxed text-[var(--muted)]">
                  {block.body}
                </p>
              </section>
            ))}

            <div className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-7">
              <h2 className="font-display text-[1.25rem] text-ivory">Ready to talk?</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                The consultation form is the quickest route to a reply.
              </p>
              <Link href="/partner" className="btn btn-primary mt-6">
                Request My Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}