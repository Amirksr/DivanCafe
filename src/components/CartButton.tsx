"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { useCart } from "@/components/CartProvider";
import { formatNumber } from "@/lib/utils";

export default function CartButton({ locale, label }: { locale: Locale; label: string }) {
  const { totalCount } = useCart();

  return (
    <Link
      href={`/${locale}/cart`}
      aria-label={label}
      className="focus-ring relative flex h-8 w-8 items-center justify-center text-parchment/70 transition-colors hover:text-gold"
    >
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="21" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="17" cy="21" r="1.4" fill="currentColor" stroke="none" />
      </svg>
      {totalCount > 0 && (
        <span
          className="absolute -end-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-copper px-1 font-mono text-[10px] leading-none text-charcoal"
          data-testid="cart-badge"
        >
          {formatNumber(totalCount, locale)}
        </span>
      )}
    </Link>
  );
}
