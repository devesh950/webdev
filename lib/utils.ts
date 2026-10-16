import type { ClassValue } from './types';

/** Tiny classname joiner. Keeps components free of template-literal noise. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (typeof value === 'string') out.push(value);
    else if (Array.isArray(value)) out.push(cn(...value));
    else {
      for (const [key, enabled] of Object.entries(value)) {
        if (enabled) out.push(key);
      }
    }
  }
  return out.join(' ');
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '');
  const origin = base ?? 'http://localhost:3000';
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatIndianNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}