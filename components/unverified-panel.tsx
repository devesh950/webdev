import { AlertCircle, Info } from 'lucide-react';

/**
 * A reusable "we don't have this yet" panel.
 *
 * This is a design object, not an apology: honest empty states are part of the
 * product. Nothing here is ever filled with a guess.
 */
export function UnverifiedPanel({
  title,
  description,
  variant = 'info',
  action,
}: {
  title: string;
  description: string;
  variant?: 'info' | 'notice';
  action?: React.ReactNode;
}) {
  const Icon = variant === 'notice' ? AlertCircle : Info;

  return (
    <div
      className={[
        'rounded-card border border-dashed p-7',
        variant === 'notice'
          ? 'border-[rgba(200,169,107,0.4)] bg-[rgba(200,169,107,0.05)]'
          : 'border-[var(--line-strong)] bg-[rgba(247,243,235,0.02)]',
      ].join(' ')}
    >
      <div className="flex gap-4">
        <span
          className={[
            'grid h-10 w-10 shrink-0 place-items-center rounded-full border',
            variant === 'notice'
              ? 'border-[rgba(200,169,107,0.4)] text-[var(--gold)]'
              : 'border-[var(--line-strong)] text-[var(--muted)]',
          ].join(' ')}
        >
          <Icon size={17} aria-hidden="true" />
        </span>

        <div>
          <h3 className="font-display text-[1.15rem] text-ivory">{title}</h3>
          <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
            {description}
          </p>
          {action ? <div className="mt-5">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}