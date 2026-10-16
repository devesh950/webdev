import type { Metadata } from 'next';

import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `Privacy Policy — ${restaurant.name}`,
  description: `How this website handles information about ${restaurant.name} and its visitors.`,
  alternates: { canonical: '/privacy' },
};

const updated = '16 October 2026';

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-[var(--line)] pb-14 pt-[calc(var(--nav-height)+3.5rem)]">
        <div className="shell">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-5 text-display-md text-ivory">Privacy Policy</h1>
          <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-[var(--muted)]">
            Last updated {updated}. Written to be read, not to be survived.
          </p>
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          <div className="max-w-prose flex flex-col gap-10">
            {[
              {
                heading: 'What this website collects',
                body: 'This website does not run contact or enquiry forms, and it does not set any cookies. There is no analytics script, no advertising pixel and no third-party tracking.',
              },
              {
                heading: 'Server logs',
                body: 'Like any web server, the host records basic request information such as IP address, browser type and the page requested. This is used only to keep the site running and is not linked to any profile.',
              },
              {
                heading: 'External links',
                body: 'Pages on this site link to Google Maps, where the restaurant has a verified listing. Once you follow those links you are on a Google service governed by Google’s own privacy policy. The same applies to the fonts served for this site.',
              },
              {
                heading: 'Information published about the restaurant',
                body: 'Only two facts about the restaurant are confirmed: its name and its Google Maps listing. Descriptions and cuisine highlights were supplied by the restaurant and may not be independently verified. Menu, prices, opening hours, phone numbers and street address are published only once confirmed directly by the restaurant — until then, this site states plainly that they are unavailable rather than guessing.',
              },
              {
                heading: 'Photography',
                body: 'Photography on this site is licensed stock imagery used to illustrate cuisine and atmosphere. It is not a photograph of this restaurant, and is labelled as illustrative wherever it appears.',
              },
              {
                heading: 'Your rights',
                body: 'Because this site does not collect personal information beyond ordinary server logs, there is no personal data held for you to request or delete. If you have a question about anything on this page, please raise it with the restaurant through the contact details on its Google Maps listing.',
              },
              {
                heading: 'Changes to this policy',
                body: 'This policy will be updated if the website later gains contact forms, online ordering or reservation features.',
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
              <h2 className="font-display text-[1.25rem] text-ivory">Find the restaurant</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                Location and directions are on the{' '}
                <a href="/location" className="text-[var(--gold)] underline underline-offset-4">
                  location page
                </a>
                , and the verified listing is on Google Maps.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}