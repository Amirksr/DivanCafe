"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { Locale, Messages } from "@/lib/i18n";

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  partySize: string;
  date: string;
  message: string;
}

export const emptyContactForm: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  partySize: "",
  date: "",
  message: "",
};

/** Basic shape validation shared between the UI and its tests. */
export function validateContactForm(values: ContactFormValues): Partial<Record<keyof ContactFormValues, string>> {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};
  if (!values.name.trim()) errors.name = "required";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "invalid";
  if (!values.message.trim()) errors.message = "required";
  return errors;
}

export default function ContactForm({ locale, dict }: { locale: Locale; dict: Messages }) {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ReturnType<typeof validateContactForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const f = dict.contact_page.form;

  function update<K extends keyof ContactFormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-sm border border-gold/40 bg-ink-soft p-6 text-parchment">
        <p className="font-mono text-sm text-gold">✓ {locale === "fa" ? "پیام دریافت شد" : "Message received"}</p>
        <p className="mt-2 text-sm text-parchment/70">
          {locale === "fa"
            ? "به‌زودی برای تأیید رزرو با شما تماس می‌گیریم."
            : "We'll follow up shortly to confirm your reservation."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <h2 className="font-mono text-xs uppercase tracking-wide text-copper-bright">{f.reserve_title}</h2>

      <Field label={f.name} htmlFor="name" error={errors.name}>
        <input
          id="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.email} htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
        <Field label={f.phone} htmlFor="phone">
          <input
            id="phone"
            type="tel"
            dir="ltr"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.party_size} htmlFor="party-size">
          <input
            id="party-size"
            type="number"
            min={1}
            max={20}
            value={values.partySize}
            onChange={(e) => update("partySize", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label={f.date} htmlFor="date">
          <input
            id="date"
            type="date"
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label={f.message} htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          rows={4}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass}
          aria-invalid={Boolean(errors.message)}
        />
      </Field>

      <button
        type="submit"
        className="focus-ring w-full rounded-sm bg-copper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-copper-bright sm:w-auto"
      >
        {f.submit}
      </button>
    </form>
  );
}

const inputClass =
  "focus-ring mt-1.5 w-full border border-ink-line bg-transparent px-3 py-2 text-sm text-parchment placeholder:text-parchment/40";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm text-parchment/80">
      {label}
      {children}
      {error && (
        <span className="mt-1 block text-xs text-copper-bright" role="alert">
          {error === "required" ? "—" : error}
        </span>
      )}
    </label>
  );
}
