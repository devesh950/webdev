import { NextResponse } from 'next/server';

import { checkRateLimit, clientKeyFromRequest } from '@/lib/rate-limit';
import {
  deliverEnquiry,
  deliveryStatus,
  type EnquiryRecord,
} from '@/lib/leads/store';
import { enquirySchema, fieldErrorsFrom } from '@/lib/validation/enquiry';

/** Only POST is meaningful here. */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { ok: true, delivery: deliveryStatus() },
    { headers: { 'cache-control': 'no-store' } },
  );
}

/** Minimum time a genuine person needs to fill the form in. */
const MIN_FILL_SECONDS = 2.5;

export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'The request could not be read.' },
      { status: 400 },
    );
  }

  // Honeypot: a hidden field only automated submissions will fill.
  const honeypot = (payload as Record<string, unknown> | null)?.companyWebsite;
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    // Respond as if accepted so bots learn nothing, but store nothing.
    return NextResponse.json({ ok: true, id: 'accepted' });
  }

  // Instant submissions are a strong machine signal.
  const startedAt = (payload as Record<string, unknown> | null)?.formStartedAt;
  if (typeof startedAt === 'number' && Date.now() - startedAt < MIN_FILL_SECONDS * 1000) {
    return NextResponse.json(
      { ok: false, message: 'That was submitted a little too quickly. Please try again.' },
      { status: 429 },
    );
  }

  const limit = checkRateLimit(clientKeyFromRequest(request));
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Too many enquiries from this device. Please try again in a few minutes, or email us directly.',
        retryAfterSeconds: limit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: { 'retry-after': String(limit.retryAfterSeconds) },
      },
    );
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Please check the highlighted fields.',
        fieldErrors: fieldErrorsFrom(parsed.error),
      },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const record: EnquiryRecord = {
    id: `hf_${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`,
    submittedAt: new Date().toISOString(),
    name: input.name,
    restaurantName: input.restaurantName,
    phone: input.phone,
    email: input.email ? input.email : null,
    websiteStatus: input.websiteStatus,
    services: input.services,
    budget: input.budget ?? null,
    message: input.message ? input.message : null,
    source: 'website-partner-form',
  };

  try {
    const delivery = await deliverEnquiry(record);
    return NextResponse.json(
      { ok: true, id: record.id, reference: record.id, deliveredVia: delivery.driver },
      { status: 201, headers: { 'cache-control': 'no-store' } },
    );
  } catch (error) {
    // Deliberately honest: we only report success once storage confirmed it.
    console.error('[enquiry] delivery failed:', error);
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not save your enquiry just now. Please try again, or contact us directly by email.',
      },
      { status: 502 },
    );
  }
}