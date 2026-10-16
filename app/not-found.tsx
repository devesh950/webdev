import Link from 'next/link';

import { FoodNotFoundArt } from './not-found-art';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-height)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_30rem_at_50%_10%,rgba(200,169,107,0.12),transparent_62%)]"
      />

      <div className="shell py-24 text-center">
        <FoodNotFoundArt />

        <p className="mt-12 text-[0.6875rem] uppercase tracking-[0.3em] text-[var(--gold)]">
          Error 404
        </p>

        <h1 className="mx-auto mt-6 max-w-[18ch] text-display-lg text-ivory">
          This table isn’t on the map
        </h1>

        <p className="mx-auto mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-[var(--muted)]">
          The page you were looking for has moved, or the restaurant has not been added yet.
          Our directory is small on purpose — it may simply not be listed.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/restaurants" className="btn btn-primary w-full sm:w-auto">
            Browse all restaurants
          </Link>
          <Link href="/" className="btn btn-ghost w-full sm:w-auto">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}