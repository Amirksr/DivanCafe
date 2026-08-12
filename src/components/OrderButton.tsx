"use client";

import { useCart } from "@/components/CartProvider";

export default function OrderButton({
  itemId,
  label,
}: {
  itemId: string;
  label: string;
  tone?: "dark" | "light";
}) {
  const { openQuickView } = useCart();

  return (
    <button
      type="button"
      onClick={() => openQuickView(itemId)}
      className="focus-ring inline-flex items-center gap-1.5 rounded-card bg-copper px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-charcoal transition-colors hover:bg-copper-bright"
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
      {label}
    </button>
  );
}
