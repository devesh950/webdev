/** Decorative empty-plate mark for the 404 state. Purely presentational. */
export function FoodNotFoundArt() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto grid h-32 w-32 place-items-center"
    >
      <span className="absolute h-32 w-32 rounded-full border border-[rgba(200,169,107,0.35)]" />
      <span className="absolute h-44 w-44 rounded-full border border-[var(--line)]" />
      <svg viewBox="0 0 64 64" className="relative h-14 w-14" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="32" cy="32" r="21" />
        <circle cx="32" cy="32" r="13" strokeDasharray="3 5" />
        <path d="M32 19v26" strokeDasharray="2 6" />
      </svg>
    </div>
  );
}