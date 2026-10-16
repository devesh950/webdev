/**
 * Fixed-window rate limiter, held in process memory.
 *
 * SUITABLE FOR: a single Node instance (local development, `next start` on one
 * box, and Vercel's default single-region runtime for low traffic).
 *
 * NOT SUITABLE FOR: serverless platforms that spin up many concurrent
 * instances, where limits are per-instance. If you deploy at scale, swap the
 * store for a shared one — see `docs/LEADS.md` for a Redis/Upstash variant that
 * keeps this exact interface.
 */

type Bucket = { count: number; resetAt: number };

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000);
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX ?? 5);

const buckets = new Map<string, Bucket>();

/** Keeps the map from growing without bound on a long-running process. */
function sweep(now: number): void {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  limit: number;
};

export function checkRateLimit(
  key: string,
  options: { max?: number; windowMs?: number } = {},
): RateLimitResult {
  const limit = options.max ?? MAX_REQUESTS;
  const windowMs = options.windowMs ?? WINDOW_MS;
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      limit,
    };
  }

  bucket.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  return {
    allowed: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSeconds,
    limit,
  };
}

/** Best-effort client identifier from proxy headers set by the platform. */
export function clientKeyFromRequest(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip =
    forwarded?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown';
  const agent = request.headers.get('user-agent') ?? '';
  return `${ip}|${agent.slice(0, 48)}`;
}