/** Loading skeletons. Reused by page and suspense boundaries. */

function Bar({ className = '' }: { className?: string }) {
  return <span className={`block rounded-full bg-[rgba(247,243,235,0.06)] ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface)]">
      <Bar className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-col gap-3 p-6">
        <Bar className="h-3 w-24" />
        <Bar className="h-6 w-3/4" />
        <Bar className="h-3 w-1/2" />
        <Bar className="h-16 w-full" />
        <div className="mt-2 flex gap-2">
          <Bar className="h-6 w-20 rounded-full" />
          <Bar className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function DirectorySkeleton() {
  return (
    <div aria-hidden="true">
      <Bar className="h-14 w-full rounded-card" />
      <div className="mt-4 flex gap-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <Bar key={index} className="h-11 w-28 rounded-full" />
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div aria-hidden="true">
      <Bar className="h-[70svh] w-full rounded-none" />
      <div className="shell py-16">
        <Bar className="h-4 w-40" />
        <Bar className="mt-6 h-12 w-2/3" />
        <Bar className="mt-4 h-5 w-1/3" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="flex flex-col gap-4">
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-11/12" />
            <Bar className="h-4 w-4/5" />
          </div>
          <Bar className="h-56 w-full rounded-card" />
        </div>
      </div>
    </div>
  );
}