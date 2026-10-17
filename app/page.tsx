import type { Metadata } from 'next';

import { Hero } from '@/components/hero';
import { InlineReservation } from '@/components/inline-reservation';
import { MasonryGallery } from '@/components/masonry-gallery';
import { SignatureDishes } from '@/components/signature-dishes';
import { StorySection } from '@/components/story-section';
import { TabbedMenu } from '@/components/tabbed-menu';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `${restaurant.name} — Royal Awadhi & Modern Indian Fine Dining in Hajipur`,
  description: `Experience Michelin-style fine dining at ${restaurant.name} in Hajipur, Bihar. Royal Awadhi curries, charcoal clay tandoor specialties, slow-dum biryanis, and private banquet celebrations. Located on Lower Dakbunglow Road above HDFC Bank.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${restaurant.name} — Fine Dining Restaurant in Hajipur`,
    description: `Royal Awadhi flavours, charcoal tandoor kebabs, and warm hospitality at ${restaurant.name}, Hajipur.`,
    url: siteConfig.url,
    siteName: restaurant.name,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: full-screen background with dark gradient, large serif type, tagline, and two buttons */}
      <Hero />

      {/* 2. Story: split layout, short brand story on one side, large photo on the other, with subtle parallax */}
      <StorySection />

      {/* 3. Signature dishes: 3-4 cards with large photos, dish name, description, price, slow zoom on hover */}
      <SignatureDishes />

      {/* 4. Menu: tabbed categories (Starters, Mains, Desserts, Drinks), clean typographic layout with dotted leaders and veg/spicy icons */}
      <TabbedMenu />

      {/* 5. Gallery: masonry grid with a lightbox on click */}
      <MasonryGallery />

      {/* 6. Testimonials: minimal, elegant quote carousel */}
      <TestimonialsCarousel />

      {/* 7. Reservation: interactive form with validation and success message */}
      <InlineReservation />

      {/* 8. Footer: rendered via layout with address, hours, map embed, socials, phone & WhatsApp button */}
    </>
  );
}
