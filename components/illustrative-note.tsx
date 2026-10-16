import { Info } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Mandatory disclosure for illustrative photography.
 *
 * Every food image on this site is licensed stock imagery, not a photograph of
 * the restaurant beside it. This chip makes that explicit wherever an image
 * appears, so the design can never imply a real photo of a real restaurant.
 */
export function IllustrativeNote({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <p
      className={cn(
        'flex items-start gap-2 text-[0.6875rem] leading-relaxed text-[var(--muted-dim)]',
        className,
      )}
    >
      <Info size={13} className="mt-0.5 shrink-0 text-[var(--gold)]/70" aria-hidden="true" />
      <span>
        {compact
          ? 'Illustrative image · not this restaurant'
          : 'Illustrative image from a licensed stock library. This is not a photograph of this restaurant.'}
      </span>
    </p>
  );
}

/** Compact credit chip for use on top of imagery. */
export function CreditChip({ credit }: { credit: string }) {
  return <span className="credit-chip">{credit}</span>;
}