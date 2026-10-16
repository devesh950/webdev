/**
 * Enquiry validation — shared by the client form and the server route handler,
 * so a payload that passes in the browser cannot fail differently on the server.
 *
 * Client-side validation is a convenience only. This schema is the authority.
 */

import { z } from 'zod';

/**
 * Indian mobile numbers.
 * Accepts the formats people actually type:
 *   9876543210 | +91 98765 43210 | 091-9876543210 | 098765-43210
 * Rejects landlines, short codes and obviously malformed input.
 *
 * Normalisation strips only *leading* trunk/country prefixes, and only while the
 * remaining string is still longer than 10 digits. That matters: `91` is also a
 * legal mobile starting digit, so blindly removing it would reject valid numbers
 * like `9123456789`.
 */
export const phoneSchema = z
  .string()
  .trim()
  .min(10, 'Please enter a phone or WhatsApp number.')
  .max(24, 'That number looks too long.')
  .refine((value) => {
    let digits = value.replace(/\D/g, '');

    // Drop any leading trunk zero(s): 09876543210, 009876543210…
    while (digits.length > 10 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }

    // Drop a +91 country code, but only if something still follows it.
    if (digits.length > 10 && digits.startsWith('91')) {
      digits = digits.slice(2);
    }

    return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
  }, 'Enter a valid 10-digit Indian mobile number.');

export const websiteStatusValues = [
  'no-website',
  'existing-website',
  'redesign',
] as const;

export const serviceInterestValues = [
  'website',
  'digital-menu',
  'local-seo',
  'complete-package',
] as const;

export const budgetValues = [
  'under-15k',
  '15k-40k',
  '40k-75k',
  '75k-plus',
  'not-sure',
] as const;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'Please keep your name under 80 characters.'),

  restaurantName: z
    .string()
    .trim()
    .min(2, 'Please enter your restaurant name.')
    .max(120, 'Please keep the restaurant name under 120 characters.'),

  phone: phoneSchema,

  email: z
    .string()
    .trim()
    .max(160, 'Please keep the email under 160 characters.')
    .refine(
      (value) => value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value),
      'Enter a valid email address, or leave this field empty.',
    )
    .optional()
    .default(''),

  websiteStatus: z.enum(websiteStatusValues, {
    errorMap: () => ({ message: 'Please choose your current website status.' }),
  }),

  services: z
    .array(z.enum(serviceInterestValues))
    .min(1, 'Please select at least one service.')
    .max(serviceInterestValues.length),

  budget: z
    .enum(budgetValues)
    .optional()
    .or(z.literal(''))
    .transform((value) => (value === '' ? null : value)),

  message: z
    .string()
    .trim()
    .max(1500, 'Please keep your message under 1500 characters.')
    .optional()
    .default(''),

  consent: z.boolean().refine((value) => value === true, {
    message: 'Please agree to the privacy policy before submitting.',
  }),

  /**
   * Spam traps. Both are invisible to real users:
   *  - `companyWebsite` is a honeypot input that only bots fill in.
   *  - `formStartedAt` lets the server reject instant machine submissions.
   */
  companyWebsite: z.string().max(0).optional().or(z.literal('')),
  formStartedAt: z.number().int().nonnegative().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type FieldErrors = Partial<Record<keyof EnquiryInput, string[]>>;

export const websiteStatusLabels: Record<
  (typeof websiteStatusValues)[number],
  string
> = {
  'no-website': 'No website',
  'existing-website': 'Existing website',
  redesign: 'Need a redesign',
};

export const serviceLabels: Record<(typeof serviceInterestValues)[number], string> =
  {
    website: 'Website',
    'digital-menu': 'Digital menu',
    'local-seo': 'Local SEO',
    'complete-package': 'Complete package',
  };

export const budgetLabels: Record<(typeof budgetValues)[number], string> = {
  'under-15k': 'Under ₹15,000',
  '15k-40k': '₹15,000 – ₹40,000',
  '40k-75k': '₹40,000 – ₹75,000',
  '75k-plus': '₹75,000+',
  'not-sure': 'Not sure yet',
};

/** Formats a ZodError into the flat field-error shape the form renders. */
export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const output: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key !== 'string') continue;
    const existing = output[key as keyof EnquiryInput];
    if (existing) existing.push(issue.message);
    else output[key as keyof EnquiryInput] = [issue.message];
  }
  return output;
}