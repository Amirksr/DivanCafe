import type { Locale } from "./i18n";

/** Joins truthy class-name fragments into a single string. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a Toman price for display, using Persian (Eastern Arabic)
 * digits and grouping for `fa`, and plain Western digits for `en`.
 * Throws on negative or non-finite input so bad menu data fails fast.
 */
export function formatPrice(amount: number, locale: Locale): string {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError(`formatPrice: invalid amount "${amount}"`);
  }
  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US");
  return formatter.format(Math.round(amount));
}

/**
 * Formats a generic stat number (not a price), preserving one decimal
 * place when the input has a fractional part instead of rounding it away.
 * Use this for things like ratings (4.9); use formatPrice for Toman amounts.
 */
export function formatNumber(value: number, locale: Locale): string {
  if (!Number.isFinite(value)) {
    throw new RangeError(`formatNumber: invalid value "${value}"`);
  }
  const hasFraction = !Number.isInteger(value);
  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    minimumFractionDigits: hasFraction ? 1 : 0,
    maximumFractionDigits: 1,
  });
  return formatter.format(value);
}

/** Zero-pads a menu item's ledger index, e.g. 3 -> "٠٣" / "03". */
export function ledgerNumber(index: number, locale: Locale): string {
  const padded = String(index).padStart(2, "0");
  if (locale !== "fa") return padded;
  const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return padded.replace(/\d/g, (d) => faDigits[Number(d)] ?? d);
}
