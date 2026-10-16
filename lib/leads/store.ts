/**
 * Lead delivery.
 *
 * Driver resolution, in order:
 *
 *   1. `webhook` — used whenever `LEAD_WEBHOOK_URL` is set. POSTs the enquiry
 *      to that endpoint, which is where a business inbox, CRM or automation
 *      tool lives. Point it at Make.com / Zapier / n8n / a serverless function.
 *
 *   2. `file`    — the zero-configuration fallback. Appends to
 *      `.data/enquiries.jsonl` on the server's local disk.
 *
 * The file driver is a real fallback rather than a development-only toy: a
 * deployment with no delivery configured will still capture enquiries instead of
 * silently dropping them. The trade-off is that a serverless filesystem is
 * ephemeral, so it logs a loud warning every time it is used in production and
 * the partner page tells the operator lead delivery is not configured yet.
 *
 * Rules this module enforces:
 *   • Secrets are read only from server-side env vars. Nothing secret is ever
 *     referenced from a client component.
 *   • Callers must treat a thrown error as "not delivered". The UI only claims
 *     success once this function resolves.
 */

import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export type DeliveryDriver = 'file' | 'webhook';

export type EnquiryRecord = {
  id: string;
  submittedAt: string;
  name: string;
  restaurantName: string;
  phone: string;
  email: string | null;
  websiteStatus: string;
  services: string[];
  budget: string | null;
  message: string | null;
  source: string;
};

export type DeliveryResult = {
  driver: DeliveryDriver;
  /** Where the enquiry went. Operator-facing, never shown to the enquirer. */
  destination: string;
  /** True when the lead is only on ephemeral local disk. */
  ephemeral: boolean;
};

const STORAGE_DIR = path.join(process.cwd(), '.data');
const STORAGE_FILE = path.join(STORAGE_DIR, 'enquiries.jsonl');

const FILE_DRIVER_WARNING =
  '[leads] LEAD_WEBHOOK_URL is not configured — the enquiry was written to .data/enquiries.jsonl on this server only. On a serverless host that file is ephemeral and will be lost on redeploy. Configure LEAD_DELIVERY + LEAD_WEBHOOK_URL before going live.';

let warnedAboutFileDriver = false;

export function resolveDriver(): DeliveryDriver {
  const configured = process.env.LEAD_DELIVERY?.trim().toLowerCase();

  if (configured === 'file') return 'file';
  if (configured === 'webhook') return 'webhook';

  // Unset: prefer the real destination when one exists, else fall back to file.
  return process.env.LEAD_WEBHOOK_URL?.trim() ? 'webhook' : 'file';
}

async function deliverToFile(record: EnquiryRecord): Promise<DeliveryResult> {
  if (process.env.NODE_ENV === 'production' && !warnedAboutFileDriver) {
    console.error(FILE_DRIVER_WARNING);
    warnedAboutFileDriver = true;
  }

  await mkdir(STORAGE_DIR, { recursive: true });
  await appendFile(STORAGE_FILE, `${JSON.stringify(record)}\n`, 'utf8');

  return {
    driver: 'file',
    destination: '.data/enquiries.jsonl',
    ephemeral: process.env.NODE_ENV === 'production',
  };
}

async function deliverToWebhook(record: EnquiryRecord): Promise<DeliveryResult> {
  const url = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!url) {
    throw new Error(
      'LEAD_DELIVERY=webhook was requested but LEAD_WEBHOOK_URL is not set.',
    );
  }

  const headers: Record<string, string> = {
    'content-type': 'application/json',
  };
  const token = process.env.LEAD_WEBHOOK_BEARER_TOKEN?.trim();
  if (token) headers.authorization = `Bearer ${token}`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      source: 'hajipur-food-website',
      id: record.id,
      submittedAt: record.submittedAt,
      enquiry: record,
    }),
    // Server-side timeout — never let an enquiry hang a request open.
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(
      `Lead webhook responded with ${response.status} ${response.statusText}`,
    );
  }

  return { driver: 'webhook', destination: url, ephemeral: false };
}

/**
 * Delivers an enquiry. Resolves only once the lead is genuinely stored.
 * Throws on failure so the API route can return an honest error to the user.
 */
export async function deliverEnquiry(
  record: EnquiryRecord,
): Promise<DeliveryResult> {
  const driver = resolveDriver();
  return driver === 'webhook' ? deliverToWebhook(record) : deliverToFile(record);
}

export type DeliveryStatus = {
  driver: DeliveryDriver;
  /** True when enquiries will actually reach a durable destination. */
  configured: boolean;
  isProduction: boolean;
  /** Operator-facing explanation, or null when everything is fine. */
  notice: string | null;
};

/** Surfaces lead-delivery health so the partner page can warn the operator. */
export function deliveryStatus(): DeliveryStatus {
  const driver = resolveDriver();
  const isProduction = process.env.NODE_ENV === 'production';
  const durable = driver === 'webhook' && Boolean(process.env.LEAD_WEBHOOK_URL?.trim());

  return {
    driver,
    configured: durable,
    isProduction,
    notice: durable
      ? null
      : isProduction
        ? 'Lead delivery is not configured. Enquiries are being written to a temporary file on the server. Set LEAD_WEBHOOK_URL before launch.'
        : 'Local development mode — enquiries are written to .data/enquiries.jsonl instead of being emailed.',
  };
}