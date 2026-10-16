import { ImageResponse } from 'next/og';

import { getRestaurant } from '@/data/restaurants';
import { siteConfig } from '@/lib/site';

export const runtime = 'edge';
export const alt = 'Restaurant listing on Hajipur Food';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function RestaurantOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);

  const name = restaurant?.name ?? 'Restaurant listing';
  const category = restaurant?.category ?? siteConfig.location.label;
  const summary = restaurant?.summary ?? siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 76px',
          background:
            'radial-gradient(800px 560px at 85% 8%, rgba(200,169,107,0.3), transparent 62%), linear-gradient(160deg, #1b1b18 0%, #0c0c0b 100%)',
          color: '#F7F3EB',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontFamily: 'sans-serif',
            fontSize: 17,
            letterSpacing: '0.26em',
            color: '#C8A96B',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ height: 1, width: 56, background: '#C8A96B', display: 'flex' }} />
          {category}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 68, lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 940 }}>
            {name}
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#A8A39B',
              maxWidth: 860,
              lineHeight: 1.5,
              fontFamily: 'sans-serif',
            }}
          >
            {summary}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(247,243,235,0.16)',
            paddingTop: 24,
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 22, color: '#F7F3EB' }}>Hajipur Food</div>
            <div style={{ fontSize: 14, letterSpacing: '0.28em', color: '#C8A96B' }}>
              {siteConfig.location.label.toUpperCase()}
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#A8A39B',
              maxWidth: 380,
              textAlign: 'right',
              lineHeight: 1.4,
            }}
          >
            Illustrative imagery. Verified listing only.
          </div>
        </div>
      </div>
    ),
    size,
  );
}