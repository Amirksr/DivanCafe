"use client";

import { useCart } from "@/components/CartProvider";
import { cn } from "@/lib/utils";

export default function OrderButton({
  itemId,
  label,
  tone,
}: {
  itemId: string;
  label: string;
  tone: "dark" | "light";
}) {
  const { openQuickView } = useCart();

  return (
    <button
      type="button"
      onClick={() => openQuickView(itemId)}
      className={cn(
        "focus-ring inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] uppercase tracking-wide transition-colors",
        tone === "light"
          ? "border-charcoal/25 text-charcoal/70 hover:border-copper hover:text-copper"
          : "border-ink-line text-parchment/70 hover:border-copper hover:text-copper-bright"
      )}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
      {label}
    </button>
  );
}
