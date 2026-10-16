import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/reveal';
import { siteConfig } from '@/lib/site';

/**
 * The owner-facing conversion band. Repeated at natural points through the
 * journey rather than hammered at every scroll stop.
 */
export function CtaBand({
  eyebrow = 'For restaurant owners',
  title = 'Your Restaurant Deserves a Remarkable Digital Presence.',
  description = 'Turn your restaurant’s online presence into a destination where customers can explore your menu, discover your location, and connect with your business.',
  primaryLabel = 'Build My Restaurant Website',
  primaryHref = '/partner',
  secondaryLabel = 'Request a Free Website Consultation',
  secondaryHref = '/partner#consultation',
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section-tight relative overflow-hidden border-block border-[var(--line)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_28rem_at_50%_0%,rgba(200,169,107,0.13),transparent_65%)]"
      />

      <div className="shell">
        <Reveal className="relative mx-auto max-w-[54rem] text-center">
          <span className="hairline mx-auto mb-8 block w-16" aria-hidden="true" />

          <p className="eyebrow justify-center">{eyebrow}</p>

          <h2 className="mt-6 text-display-md text-ivory">{title}</h2>

          <p className="mx-auto mt-6 max-w-[52rem] text-[1.0625rem] leading-relaxed text-[var(--muted)]">
            {description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={primaryHref} className="btn btn-primary group w-full sm:w-auto">
              {primaryLabel}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
              />
            </Link>
            <Link href={secondaryHref} className="btn btn-ghost w-full sm:w-auto">
              {secondaryLabel}
            </Link>
          </div>

          <p className="mt-7 text-[0.8125rem] text-[var(--muted-dim)]">
            {siteConfig.location.label} · No ranking or sales guarantees — a website built to
            earn its place.
          </p>
        </Reveal>
      </div>
    </section>
  );
}