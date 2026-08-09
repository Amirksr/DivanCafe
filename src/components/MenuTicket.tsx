import type { Locale, Messages } from "@/lib/i18n";
import type { MenuItem } from "@/lib/data";
import { cn, formatPrice, ledgerNumber } from "@/lib/utils";

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

  return (
    <article
      className={cn(
        "group relative -mx-2 flex gap-4 rounded-sm border-b border-dashed px-2 py-5 transition-colors duration-200 last:border-none",
        isLight ? "border-ink/15 hover:bg-black/[0.03]" : "border-ink-line hover:bg-white/[0.03]"
      )}
    >
      <span className="pt-1 font-mono text-xs text-copper-dim" aria-hidden="true">
        {ledgerNumber(index, locale)}
      </span>

      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3
            className={cn(
              "text-lg",
              isLight ? "text-ink" : "text-parchment",
              isFa ? "font-display-fa" : "font-display"
            )}
          >
            {item.name[locale]}
          </h3>
          <span className="font-mono text-sm text-gold" data-testid="price">
            {formatPrice(item.price, locale)} {dict.common.toman}
          </span>
        </div>
        <p className={cn("mt-1 text-sm", isLight ? "text-ink/60" : "text-parchment/60")}>
          {item.desc[locale]}
        </p>

        {(item.isNew || item.vegetarian || item.popular) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.isNew && <Tag label={dict.common.new} tone="gold" />}
            {item.vegetarian && <Tag label={dict.common.vegetarian} tone="sage" />}
            {item.popular && <Tag label={dict.common.signature} tone="copper" />}
          </div>
        )}
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
