'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { restaurant } from '@/data/restaurant';

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section">
      <div className="shell max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">Frequently Asked Questions</p>
          <h2 className="mt-4 text-display-md text-ivory">
            Planning Your Visit to The Taj
          </h2>
          <p className="mt-3 text-[1rem] leading-relaxed text-[var(--muted)]">
            Everything you need to know about our location, timings, party reservations and services.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          {restaurant.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface)] transition-colors hover:border-[rgba(200,169,107,0.3)]"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[1.0625rem] text-ivory">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[var(--gold)] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[var(--line)] px-6 pb-6 pt-4 text-sm leading-relaxed text-[var(--muted)]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
