import { MonitorSmartphone, Search, UtensilsCrossed, type LucideIcon } from 'lucide-react';

import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import { services, type ServiceIcon } from '@/data/services';
import { cn } from '@/lib/utils';

const icons: Record<ServiceIcon, LucideIcon> = {
  monitor: MonitorSmartphone,
  utensils: UtensilsCrossed,
  search: Search,
};

export function ServiceCards({ compact = false }: { compact?: boolean }) {
  return (
    <RevealGroup
      className={cn(
        'grid gap-6',
        compact ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {services.map((service) => {
        const Icon = icons[service.icon];
        return (
          <RevealItem key={service.slug}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface)] p-7 transition-[transform,border-color,box-shadow] duration-700 ease-editorial hover:-translate-y-1.5 hover:border-[rgba(200,169,107,0.4)] hover:shadow-lift sm:p-8">
              {/* Gold wash on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(26rem 16rem at 50% 0%, rgba(200,169,107,0.10), transparent 70%)',
                }}
              />

              <span className="relative grid h-12 w-12 place-items-center rounded-full border border-[rgba(200,169,107,0.35)] bg-[rgba(200,169,107,0.08)] text-[var(--gold)] transition-transform duration-700 ease-editorial group-hover:scale-105">
                <Icon size={19} aria-hidden="true" />
              </span>

              <h3 className="relative mt-6 font-display text-[1.4rem] leading-snug text-ivory">
                {service.title}
              </h3>

              <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                {service.summary}
              </p>

              {!compact ? (
                <ul className="relative mt-6 flex flex-col gap-2.5 border-t border-[var(--line)] pt-6">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.875rem] text-[var(--muted)]">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-3 shrink-0 bg-[var(--gold)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

export function ServiceList({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {services.map((service, index) => {
        const Icon = icons[service.icon];
        return (
          <Reveal key={service.slug} delay={index * 0.07}>
            <li className="flex gap-4 border-t border-[var(--line)] pt-5">
              <Icon size={18} className="mt-1 shrink-0 text-[var(--gold)]" aria-hidden="true" />
              <div>
                <h3 className="font-display text-[1.15rem] text-ivory">{service.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                  {service.summary}
                </p>
              </div>
            </li>
          </Reveal>
        );
      })}
    </ul>
  );
}