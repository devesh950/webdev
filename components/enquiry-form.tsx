'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useMemo, useRef, useState } from 'react';

import {
  budgetLabels,
  budgetValues,
  enquirySchema,
  fieldErrorsFrom,
  serviceInterestValues,
  serviceLabels,
  websiteStatusLabels,
  websiteStatusValues,
  type EnquiryInput,
  type FieldErrors,
} from '@/lib/validation/enquiry';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type FormState = {
  name: string;
  restaurantName: string;
  phone: string;
  email: string;
  websiteStatus: string;
  services: string[];
  budget: string;
  message: string;
  consent: boolean;
  companyWebsite: string;
};

const initialState: FormState = {
  name: '',
  restaurantName: '',
  phone: '',
  email: '',
  websiteStatus: '',
  services: [],
  budget: '',
  message: '',
  consent: false,
  // Honeypot: hidden from humans, tempting to bots.
  companyWebsite: '',
};

export function EnquiryForm() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');
  const [reference, setReference] = useState<string>('');

  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(Date.now());

  const serviceOptions = useMemo(
    () =>
      serviceInterestValues.map((value) => ({
        value,
        label: serviceLabels[value],
      })),
    [],
  );

  const budgetOptions = useMemo(
    () => budgetValues.map((value) => ({ value, label: budgetLabels[value] })),
    [],
  );

  const statusOptions = useMemo(
    () => websiteStatusValues.map((value) => ({ value, label: websiteStatusLabels[value] })),
    [],
  );

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }, []);

  const toggleService = useCallback((value: string) => {
    setForm((previous) => ({
      ...previous,
      services: previous.services.includes(value)
        ? previous.services.filter((item) => item !== value)
        : [...previous.services, value],
    }));
    setErrors((previous) => {
      if (!previous.services) return previous;
      const next = { ...previous };
      delete next.services;
      return next;
    });
  }, []);

  /** Moves focus to the first field with an error for keyboard/screen-reader users. */
  const focusFirstError = useCallback((fieldErrors: FieldErrors) => {
    const firstKey = Object.keys(fieldErrors)[0];
    if (!firstKey) return;
    const element = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
    element?.focus();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setMessage('');

    // Client-side pass first, purely to give fast feedback.
    const payload: EnquiryInput = {
      name: form.name,
      restaurantName: form.restaurantName,
      phone: form.phone,
      email: form.email,
      websiteStatus: form.websiteStatus as EnquiryInput['websiteStatus'],
      services: form.services as EnquiryInput['services'],
      budget: (form.budget || undefined) as EnquiryInput['budget'],
      message: form.message,
      consent: form.consent,
      companyWebsite: form.companyWebsite,
      formStartedAt: startedAt.current,
    };

    const clientCheck = enquirySchema.safeParse(payload);
    if (!clientCheck.success) {
      const fieldErrors = fieldErrorsFrom(clientCheck.error);
      setErrors(fieldErrors);
      setStatus('error');
      setMessage('Please check the highlighted fields and try again.');
      focusFirstError(fieldErrors);
      return;
    }

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: unknown = await response.json();
      const result = data as {
        ok?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
        reference?: string;
      };

      if (!response.ok || !result.ok) {
        if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
          setErrors(result.fieldErrors);
          focusFirstError(result.fieldErrors);
        }
        setStatus('error');
        setMessage(
          result.message ??
            'We could not submit your enquiry. Please try again in a moment.',
        );
        return;
      }

      // Success is only ever claimed after the backend confirms storage.
      setReference(result.reference ?? '');
      setStatus('success');
      setForm(initialState);
      startedAt.current = Date.now();
    } catch {
      setStatus('error');
      setMessage(
        'We could not reach the server. Check your connection and try again — or email us directly.',
      );
    }
  }

  /* ------------------------------------------------------------ success */
  if (status === 'success') {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        aria-live="polite"
        className="rounded-card border border-[rgba(200,169,107,0.4)] bg-[rgba(200,169,107,0.06)] p-8 text-center sm:p-12"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[rgba(200,169,107,0.5)] bg-[rgba(200,169,107,0.12)] text-[var(--gold)]">
          <CheckCircle2 size={26} aria-hidden="true" />
        </span>

        <h2 className="mt-7 font-display text-[1.75rem] text-ivory">
          Your enquiry has been received
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-[1rem] leading-relaxed text-[var(--muted)]">
          Thank you — we have your details and will get back to you with a plan and a quote.
          Keep the reference below for your records.
        </p>

        {reference ? (
          <p className="mt-6 inline-block rounded-full border border-[var(--line)] bg-[rgba(10,10,9,0.4)] px-4 py-2 font-mono text-[0.8125rem] text-[var(--gold-soft)]">
            Reference: {reference}
          </p>
        ) : null}

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setStatus('idle');
              setReference('');
            }}
          >
            Send another enquiry
          </button>
          <Link href="/restaurants" className="btn btn-primary">
            Browse restaurants
          </Link>
        </div>
      </motion.div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-9"
      aria-describedby="enquiry-privacy-note"
    >
      <AnimatePresence>
        {status === 'error' && message ? (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            role="alert"
            className="mb-7 flex items-start gap-3 overflow-hidden rounded-xl border border-[rgba(212,112,90,0.5)] bg-[rgba(212,112,90,0.1)] p-4 text-[0.9375rem] text-[#f0b8a8]"
          >
            <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{message}</span>
          </motion.p>
        ) : null}
      </AnimatePresence>

      {/* Honeypot — visually and semantically hidden from people. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.companyWebsite}
          onChange={(event) => update('companyWebsite', event.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          name="name"
          label="Your name"
          required
          error={errors.name?.[0]}
          hint="The person we should speak to."
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Ramesh Kumar"
            value={form.name}
            disabled={submitting}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            onChange={(event) => update('name', event.target.value)}
            className="field-input"
          />
        </Field>

        <Field
          id="restaurantName"
          name="restaurantName"
          label="Restaurant name"
          required
          error={errors.restaurantName?.[0]}
        >
          <input
            id="restaurantName"
            name="restaurantName"
            type="text"
            autoComplete="organization"
            placeholder="e.g. The Taj Multicuisine Restaurant"
            value={form.restaurantName}
            disabled={submitting}
            aria-invalid={Boolean(errors.restaurantName)}
            aria-describedby={errors.restaurantName ? 'restaurantName-error' : undefined}
            onChange={(event) => update('restaurantName', event.target.value)}
            className="field-input"
          />
        </Field>

        <Field
          id="phone"
          name="phone"
          label="Phone or WhatsApp"
          required
          error={errors.phone?.[0]}
          hint="10-digit Indian mobile number."
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            value={form.phone}
            disabled={submitting}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            onChange={(event) => update('phone', event.target.value)}
            className="field-input"
          />
        </Field>

        <Field
          id="email"
          name="email"
          label="Business email"
          optional
          error={errors.email?.[0]}
        >
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@restaurant.com"
            value={form.email}
            disabled={submitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onChange={(event) => update('email', event.target.value)}
            className="field-input"
          />
        </Field>

        <Field
          id="websiteStatus"
          name="websiteStatus"
          label="Current website status"
          required
          error={errors.websiteStatus?.[0]}
        >
          <select
            id="websiteStatus"
            name="websiteStatus"
            value={form.websiteStatus}
            disabled={submitting}
            aria-invalid={Boolean(errors.websiteStatus)}
            aria-describedby={errors.websiteStatus ? 'websiteStatus-error' : undefined}
            onChange={(event) => update('websiteStatus', event.target.value)}
            className="field-input"
          >
            <option value="">Please choose…</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="budget"
          name="budget"
          label="Approximate budget"
          optional
          error={errors.budget?.[0]}
          hint="Only if you have a figure in mind."
        >
          <select
            id="budget"
            name="budget"
            value={form.budget}
            disabled={submitting}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? 'budget-error' : undefined}
            onChange={(event) => update('budget', event.target.value)}
            className="field-input"
          >
            <option value="">Prefer not to say</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Services — a labelled checkbox group */}
      <fieldset
        className="mt-7 border-0 p-0"
        aria-describedby={errors.services ? 'services-error' : undefined}
      >
        <legend className="field-label">
          What do you need?{' '}
          <span className="text-[var(--gold)]">*</span>
        </legend>

        <div className="flex flex-wrap gap-2.5">
          {serviceOptions.map((option) => {
            const selected = form.services.includes(option.value);
            return (
              <label
                key={option.value}
                className="chip"
                data-selected={selected}
              >
                <input
                  type="checkbox"
                  name="services"
                  value={option.value}
                  checked={selected}
                  disabled={submitting}
                  onChange={() => toggleService(option.value)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid h-4 w-4 place-items-center rounded-[4px] border transition-colors duration-300',
                    selected
                      ? 'border-transparent bg-[#14100a] text-[var(--gold-soft)]'
                      : 'border-[var(--line-strong)]',
                  )}
                >
                  {selected ? (
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 6.2 5 8.6l4.5-5" />
                    </svg>
                  ) : null}
                </span>
                {option.label}
              </label>
            );
          })}
        </div>

        {errors.services?.[0] ? (
          <p id="services-error" role="alert" className="mt-3 text-[0.8125rem] text-[#f0b8a8]">
            {errors.services[0]}
          </p>
        ) : null}
      </fieldset>

      <div className="mt-7">
        <Field
          id="message"
          name="message"
          label="Anything else we should know?"
          optional
          error={errors.message?.[0]}
          hint="Your menu, your photos, your Google listing — whatever is on your mind."
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={1500}
            placeholder="Tell us about your restaurant and what you want the website to do."
            value={form.message}
            disabled={submitting}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            onChange={(event) => update('message', event.target.value)}
            className="field-input"
          />
        </Field>
      </div>

      {/* Consent */}
      <div className="mt-7">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            disabled={submitting}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            onChange={(event) => update('consent', event.target.checked)}
            className="sr-only"
          />
          <span
            aria-hidden="true"
            className={cn(
              'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border transition-colors duration-300',
              form.consent
                ? 'border-transparent bg-[var(--gold)] text-[#14100a]'
                : errors.consent
                  ? 'border-[#d4705a]'
                  : 'border-[var(--line-strong)]',
            )}
          >
            {form.consent ? (
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.2 5 8.6l4.5-5" />
              </svg>
            ) : null}
          </span>
          <span className="text-[0.875rem] leading-relaxed text-[var(--muted)]">
            I agree that Hajipur Food may store and use these details to respond to my enquiry,
            as described in the{' '}
            <Link href="/privacy" className="text-[var(--gold)] underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent?.[0] ? (
          <p id="consent-error" role="alert" className="mt-3 text-[0.8125rem] text-[#f0b8a8]">
            {errors.consent[0]}
          </p>
        ) : null}
      </div>

      {/* Submit */}
      <div className="mt-9 flex flex-col gap-4">
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className="btn btn-primary w-full"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Sending your enquiry…
            </>
          ) : (
            'Request My Consultation'
          )}
        </button>

        <p
          id="enquiry-privacy-note"
          className="flex items-center justify-center gap-2 text-center text-[0.75rem] text-[var(--muted-dim)]"
        >
          <Lock size={12} aria-hidden="true" />
          Sent over an encrypted connection and used only to reply to you.
          <ShieldCheck size={12} aria-hidden="true" />
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ Field */

function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string | undefined;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}{' '}
        {required ? (
          <span className="text-[var(--gold)]" aria-hidden="true">
            *
          </span>
        ) : optional ? (
          <span className="text-[var(--muted-dim)] normal-case tracking-normal">(optional)</span>
        ) : null}
      </label>

      {children}

      {/* The hint line always occupies a row, even when empty. Without that
          reserved space, a field with a hint pushes its neighbour's label out
          of alignment in the two-column grid. */}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[0.8125rem] text-[#f0b8a8]">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-[0.8125rem] text-[var(--muted-dim)]">
          {hint ?? '\u00A0'}
        </p>
      )}
    </div>
  );
}