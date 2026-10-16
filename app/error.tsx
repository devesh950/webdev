'use client';

import { RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep the digest so the failure can be traced in platform logs.
    console.error('[app] render error:', error.digest ?? error.message);
  }, [error]);

  return (
    <div className="relative flex min-h-[100svh] items-center pt-[var(--nav-height)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_30rem_at_50%_12%,rgba(212,112,90,0.14),transparent_62%)]"
      />

      <div className="shell py-24 text-center">
        <p className="text-[0.6875rem] uppercase tracking-[0.3em] text-[var(--gold)]">
          Something went wrong
        </p>

        <h1 className="mx-auto mt-6 max-w-[20ch] text-display-lg text-ivory">
          We could not serve that page
        </h1>

        <p className="mx-auto mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-[var(--muted)]">
          This is on us, not on you. Try again — and if it keeps happening, the
          restaurant directory is still reachable.
        </p>

        {error.digest ? (
          <p className="mt-6 font-mono text-[0.75rem] text-[var(--muted-dim)]">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary">
            <RefreshCw size={15} aria-hidden="true" />
            Try again
          </button>
          <Link href="/restaurants" className="btn btn-ghost">
            Go to the directory
          </Link>
        </div>
      </div>
    </div>
  );
}