import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';

import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';
import { jsonLdScript, websiteStructuredData } from '@/lib/structured-data';
import { siteConfig } from '@/lib/site';

import './globals.css';

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  // Variable font: `axes` requires omitting an explicit `weight` list.
  axes: ['SOFT', 'WONK'],
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
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'restaurants in Hajipur',
    'Hajipur food',
    'best restaurants Hajipur',
    'biryani in Hajipur',
    'family dining Hajipur',
    'North Indian food Hajipur',
    'vegetarian restaurants Hajipur',
    'Hajipur Bihar restaurants',
    'restaurant website design Bihar',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
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
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '48x48' }, { url: '/favicon.ico', sizes: '32x32' }],
    shortcut: '/favicon.ico',
  },
  category: 'food',
};

export const viewport: Viewport = {
  themeColor: '#101010',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  // Deliberately capped: user zoom must never be disabled.
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-charcoal text-ivory antialiased">
        {/*
          Scroll-revealed sections are animated by Framer Motion, which ships
          inline `opacity:0` on the server. If JavaScript never runs they would
          stay invisible, so CSS restores them when scripting is unavailable.

          This is done two ways on purpose, and neither touches the DOM React
          owns:
            · `@media (scripting: none)` in globals.css  — modern browsers
            · this <noscript> block                         — legacy browsers
          An earlier version used a `no-js` class removed by an inline script,
          which mutated <html> before hydration and caused a hydration
          mismatch. This approach has no such side effect.
        */}
        <noscript>
          <style>{`.reveal-motion{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <div className="grain-overlay" aria-hidden="true" />

        <SiteNav />

        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>

        <SiteFooter />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteStructuredData()) }}
        />
      </body>
    </html>
  );
}