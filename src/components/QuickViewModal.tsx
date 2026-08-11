"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Locale, Messages } from "@/lib/i18n";
import { getMenuItem } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";
import { categoryIcons } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function QuickViewModal({ locale, dict }: { locale: Locale; dict: Messages }) {
  const { quickViewItemId, closeQuickView, addItem } = useCart();
  const item = quickViewItemId ? getMenuItem(quickViewItemId) : undefined;
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isFa = locale === "fa";

  // Reset transient state whenever a different item is opened.
  useEffect(() => {
    setQuantity(1);
    setJustAdded(false);
  }, [quickViewItemId]);

  useEffect(() => {
    if (!item) return;
    closeButtonRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeQuickView();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, closeQuickView]);

  if (!item) return null;

  const CategoryIcon = categoryIcons[item.category];
  const photoSrc = item.unsplashId
    ? `https://images.unsplash.com/photo-${item.unsplashId}?w=800&q=75&auto=format&fit=crop`
    : item.localPhoto;

  function handleAdd() {
    if (!item) return;
    addItem(item.id, quantity);
    setJustAdded(true);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/70 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.name[locale]}
      onClick={closeQuickView}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-lg bg-ink sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full bg-ink-soft">
          {photoSrc ? (
            <Image src={photoSrc} alt="" fill sizes="448px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-parchment/30">
              <CategoryIcon className="h-16 w-16" strokeWidth={1.1} />
            </div>
          )}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeQuickView}
            aria-label={dict.quick_view.close}
            className="focus-ring absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/80 text-parchment hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h3 className={cn("text-2xl text-parchment", isFa ? "font-display-fa" : "font-display")}>
            {item.name[locale]}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-parchment/70">{item.desc[locale]}</p>
          <p className="mt-4 font-mono text-lg text-gold">
            {formatPrice(item.price, locale)} {dict.common.toman}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-sm border border-ink-line">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="-"
                className="focus-ring flex h-10 w-10 items-center justify-center text-parchment hover:text-gold"
              >
                −
              </button>
              <span className="w-8 text-center font-mono text-parchment" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                aria-label="+"
                className="focus-ring flex h-10 w-10 items-center justify-center text-parchment hover:text-gold"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="focus-ring flex-1 rounded-sm bg-copper px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-copper-bright"
            >
              {justAdded ? `✓ ${dict.quick_view.added}` : dict.quick_view.add_to_cart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
