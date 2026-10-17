import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';

import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';
import { restaurant } from '@/data/restaurant';
import { jsonLdScript, restaurantStructuredData, websiteStructuredData } from '@/lib/structured-data';
import { siteConfig } from '@/lib/site';

import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${restaurant.name} — ${restaurant.category} in ${siteConfig.location.label}`,
    template: `%s · ${restaurant.name}`,
  },
  description: siteConfig.description,
  applicationName: restaurant.name,
  keywords: [
    'The Taj Multicuisine Restaurant',
    'restaurant in Hajipur',
    'family dining Hajipur',
    'North Indian restaurant Hajipur',
    'Mughlai restaurant Hajipur',
    'multicuisine restaurant Bihar',
    'group dining Hajipur',
    'restaurants near Hajipur',
  ],
  authors: [{ name: restaurant.name }],
  creator: restaurant.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: restaurant.name,
    title: `${restaurant.name} — ${restaurant.category} in ${siteConfig.location.label}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${restaurant.name} — ${siteConfig.location.label}`,
    description: siteConfig.description,
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '48x48' }, { url: '/favicon.ico', sizes: '32x32' }],
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'food',
};

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  // Deliberately capped: user zoom must never be disabled.
  maximumScale: 5,
};

import { ReservationProvider } from '@/components/reservation-context';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-[#FAF7F2] text-stone-900 antialiased">
        <noscript>
          <style>{`.reveal-motion{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <div className="grain-overlay" aria-hidden="true" />

        <ReservationProvider>
          <SiteNav />

          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>

          <SiteFooter />
        </ReservationProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteStructuredData()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(restaurantStructuredData()) }}
        />
      </body>
    </html>
  );
}