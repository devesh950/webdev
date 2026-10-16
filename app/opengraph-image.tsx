import { ImageResponse } from 'next/og';

import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${restaurant.name} — ${restaurant.category}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generated Open Graph card.
 *
 * Rendered rather than uploaded so it stays in step with the brand, and because
 * it never needs to be mistaken for a photograph of the restaurant.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'radial-gradient(900px 600px at 80% 0%, rgba(200,169,107,0.28), transparent 60%), linear-gradient(160deg, #1a1a17 0%, #0d0d0c 100%)',
          color: '#F7F3EB',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: '2px solid #C8A96B',
              display: 'flex',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 28, letterSpacing: '0.01em' }}>The Taj</div>
            <div
              style={{
                fontSize: 13,
                letterSpacing: '0.3em',
                color: '#C8A96B',
                marginTop: 8,
                fontFamily: 'sans-serif',
              }}
            >
              MULTICUISINE RESTAURANT
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 70, lineHeight: 1.06, letterSpacing: '-0.02em' }}>
            Family meals, memorable evenings.
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#A8A39B',
              maxWidth: 840,
              fontFamily: 'sans-serif',
              lineHeight: 1.45,
            }}
          >
            {restaurant.summary}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(247,243,235,0.16)',
            paddingTop: 26,
            fontSize: 17,
            color: '#C8A96B',
            fontFamily: 'sans-serif',
            letterSpacing: '0.16em',
          }}
        >
          <span>{siteConfig.location.label.toUpperCase()}</span>
          <span style={{ color: '#A8A39B' }}>NORTH INDIAN · MUGHLAI</span>
        </div>
      </div>
    ),
    size,
  );
}