import Image from "next/image";
import type { Locale, Messages } from "@/lib/i18n";
import type { MenuItem } from "@/lib/data";
import { cn, formatPrice, ledgerNumber } from "@/lib/utils";
import { categoryIcons } from "@/components/icons";
import OrderButton from "@/components/OrderButton";

interface MenuTicketProps {
  item: MenuItem;
  index: number;
  locale: Locale;
  dict: Messages;
  /** "dark" (default) sits on the ink background; "light" sits on the paper background. */
  tone?: "dark" | "light";
}

export default function MenuTicket({ item, index, locale, dict, tone = "dark" }: MenuTicketProps) {
  const isFa = locale === "fa";
  const isLight = tone === "light";
  const CategoryIcon = categoryIcons[item.category];
  const photoSrc = item.unsplashId
    ? `https://images.unsplash.com/photo-${item.unsplashId}?w=200&q=70&auto=format&fit=crop`
    : item.localPhoto;

  return (
    <article
      className={cn(
        "group relative -mx-2 flex gap-4 rounded-card border-b border-dashed px-2 py-5 transition-colors duration-200 last:border-none",
        isLight ? "border-charcoal/15 hover:bg-black/[0.03]" : "border-ink-line hover:bg-white/[0.03]"
      )}
    >
      <span className="pt-1 font-mono text-xs text-copper-dim" aria-hidden="true">
        {ledgerNumber(index, locale)}
      </span>

      {photoSrc ? (
        <div
          className={cn(
            "relative h-14 w-14 shrink-0 overflow-hidden rounded-card border",
            isLight ? "border-charcoal-line/40" : "border-ink-line/60"
          )}
        >
          <Image src={photoSrc} alt="" fill sizes="56px" className="object-cover" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-card border",
            isLight ? "border-charcoal/15 bg-black/[0.02] text-charcoal/40" : "border-ink-line bg-white/[0.02] text-parchment/40"
          )}
        >
          <CategoryIcon className="h-6 w-6" strokeWidth={1.3} />
        </div>
      )}

      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3
            className={cn(
              "text-lg",
              isLight ? "text-charcoal" : "text-parchment",
              isFa ? "font-display-fa" : "font-display"
            )}
          >
            {item.name[locale]}
          </h3>
          <span className="font-mono text-sm text-gold" data-testid="price">
            {formatPrice(item.price, locale)} {dict.common.toman}
          </span>
        </div>
        <p className={cn("mt-1 text-sm", isLight ? "text-charcoal/60" : "text-parchment/60")}>
          {item.desc[locale]}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {item.isNew && <Tag label={dict.common.new} tone="gold" />}
          {item.vegetarian && <Tag label={dict.common.vegetarian} tone="sage" />}
          {item.popular && <Tag label={dict.common.signature} tone="copper" />}
          <OrderButton itemId={item.id} label={dict.quick_view.order_button} tone={tone} />
        </div>
      </div>
    </article>
  );
}

function Tag({ label, tone }: { label: string; tone: "gold" | "sage" | "copper" }) {
  const tones = {
    gold: "border-gold/50 text-gold",
    sage: "border-sage-solid/50 text-sage-solid",
    copper: "border-copper/50 text-copper-bright",
  } as const;

  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wide",
        tones[tone]
      )}
    >
      {label}
    </span>
  );
}
