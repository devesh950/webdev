import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export type Crumb = { name: string; path: string };

/**
 * Server-rendered breadcrumb trail. The final item is the current page and is
 * marked `aria-current` rather than being a link.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-stone-600">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  size={12}
                  aria-hidden="true"
                  className="text-stone-400"
                />
              ) : null}
              {isLast ? (
                <span aria-current="page" className="text-amber-800 font-semibold">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="transition-colors duration-300 hover:text-stone-950 hover:underline underline-offset-4"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}