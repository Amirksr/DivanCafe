"use client";

import Link from "next/link";
import Image from "next/image";
import type { Locale, Messages } from "@/lib/i18n";
import { useCart } from "@/components/CartProvider";
import { formatNumber, formatPrice, cn } from "@/lib/utils";
import { categoryIcons } from "@/components/icons";

export default function CartView({ locale, dict }: { locale: Locale; dict: Messages }) {
  const { lines, totalPrice, removeItem, setQuantity } = useCart();
  const isFa = locale === "fa";

  if (lines.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-parchment/70">{dict.cart.empty}</p>
        <Link
          href={`/${locale}/menu`}
          className="focus-ring mt-6 inline-block rounded-sm border border-copper px-6 py-3 text-sm text-copper-bright hover:bg-copper hover:text-charcoal"
        >
          {dict.cart.empty_cta}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="divide-y divide-dashed divide-ink-line border-t border-ink-line">
        {lines.map(({ item, quantity }) => {
          const CategoryIcon = categoryIcons[item.category];
          const photoSrc = item.unsplashId
            ? `https://images.unsplash.com/photo-${item.unsplashId}?w=200&q=70&auto=format&fit=crop`
            : item.localPhoto;

          return (
            <div key={item.id} className="flex items-center gap-4 py-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-ink-line/60 bg-ink-soft">
                {photoSrc ? (
                  <Image src={photoSrc} alt="" fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-parchment/40">
                    <CategoryIcon className="h-7 w-7" strokeWidth={1.3} />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className={cn("text-base text-parchment", isFa ? "font-display-fa" : "font-display")}>
                  {item.name[locale]}
                </p>
                <p className="mt-0.5 font-mono text-xs text-parchment/50">
                  {formatPrice(item.price, locale)} {dict.common.toman}
                </p>
              </div>

              <div className="flex items-center rounded-sm border border-ink-line">
                <button
                  type="button"
                  onClick={() => setQuantity(item.id, quantity - 1)}
                  aria-label="-"
                  className="focus-ring flex h-8 w-8 items-center justify-center text-parchment hover:text-gold"
                >
                  −
                </button>
                <span className="w-6 text-center font-mono text-sm text-parchment">{formatNumber(quantity, locale)}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(item.id, quantity + 1)}
                  aria-label="+"
                  className="focus-ring flex h-8 w-8 items-center justify-center text-parchment hover:text-gold"
                >
                  +
                </button>
              </div>

              <p className="w-24 shrink-0 text-end font-mono text-sm text-gold" data-testid="line-total">
                {formatPrice(item.price * quantity, locale)}
              </p>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={dict.cart.remove}
                className="focus-ring shrink-0 text-parchment/40 hover:text-copper-bright"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-2 border-t border-ink-line pt-6">
        <div className="flex w-full max-w-xs items-center justify-between text-sm text-parchment/70 sm:w-64">
          <span>{dict.cart.total}</span>
          <span className="font-mono text-lg text-gold" data-testid="cart-total">
            {formatPrice(totalPrice, locale)} {dict.common.toman}
          </span>
        </div>

        <div className="mt-4 flex w-full flex-col items-stretch gap-3 sm:w-64">
          <button
            type="button"
            disabled
            aria-disabled="true"
            title={dict.cart.checkout_note}
            className="focus-ring cursor-not-allowed rounded-sm bg-copper/40 px-6 py-3 text-sm font-medium text-charcoal/60"
          >
            {dict.cart.checkout}
          </button>
          <p className="text-center text-xs text-parchment/40">{dict.cart.checkout_note}</p>
          <Link
            href={`/${locale}/menu`}
            className="focus-ring text-center text-sm text-parchment/60 hover:text-gold"
          >
            {dict.cart.continue_shopping}
          </Link>
        </div>
      </div>
    </div>
  );
}
