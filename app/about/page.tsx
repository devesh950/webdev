import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { IllustrativeNote } from '@/components/illustrative-note';
import { PhotoFrame } from '@/components/photo-frame';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { foodPhoto } from '@/lib/images';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Hajipur Food is an independent directory of restaurants in Hajipur, Bihar, paired with website design services for local food businesses.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-[var(--line)] pb-16 pt-[calc(var(--nav-height)+4rem)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(56rem_30rem_at_70%_0%,rgba(200,169,107,0.12),transparent_62%)]"
        />
        <div className="shell">
          <SectionHeading
            eyebrow="About"
            title="A directory small enough to be right"
            description={siteConfig.supportingTagline}
            as="h1"
          />
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
            <div className="flex flex-col gap-6">
              {[
                'Hajipur has no shortage of good food. What it has lacked is a place that lists those places carefully — without invented menus, without numbers nobody confirmed, without a wall of stock photography pretending to be someone’s dining room.',
                'Hajipur Food started as a short answer to that. Five restaurants, each anchored to a confirmed Google Maps listing, each described only as far as its description has actually been verified. Where something is missing, the page says so instead of filling the gap.',
                'The second half of this project is aimed at the people running those kitchens. If you own a restaurant in Hajipur and your online presence is a Google Maps pin and nothing else, we build the website that sits behind it — a branded site with your menu, your photographs, your location and a way for customers to reach you.',
              ].map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.06}>
                  <p className="prose-body">{paragraph}</p>
                </Reveal>
              ))}

              <Reveal delay={0.2}>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/restaurants" className="btn btn-primary group">
                    Explore the directory
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                    />
                  </Link>
                  <Link href="/partner" className="btn btn-ghost">
                    Build my restaurant website
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <figure>
                <PhotoFrame
                  image={foodPhoto('indianThali')}
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="aspect-[4/5] w-full rounded-card"
                />
                <figcaption className="mt-4">
                  <IllustrativeNote />
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}