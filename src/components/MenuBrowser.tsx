"use client";

import { useMemo, useState } from "react";
import type { Locale, Messages } from "@/lib/i18n";
import { categoryOrder, menuItems, type CategoryKey } from "@/lib/data";
import { cn } from "@/lib/utils";
import MenuTicket from "@/components/MenuTicket";

type FilterKey = CategoryKey | "all";

export default function MenuBrowser({ locale, dict }: { locale: Locale; dict: Messages }) {
  const [active, setActive] = useState<FilterKey>("all");
  const isFa = locale === "fa";

  const groups = useMemo(() => {
    const keys = active === "all" ? categoryOrder : [active];
    return keys.map((key) => ({
      key,
      items: menuItems.filter((item) => item.category === key),
    }));
  }, [active]);

  const tabs: FilterKey[] = ["all", ...categoryOrder];

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={dict.menu_page.title}
      >
        {tabs.map((tab) => {
          const label = tab === "all" ? dict.menu_page.filter_all : dict.categories.items[tab].name;
          const selected = active === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab)}
              className={cn(
                "focus-ring rounded-full border px-4 py-1.5 text-sm transition-colors",
                selected
                  ? "border-copper bg-copper text-ink"
                  : "border-ink-line text-parchment/70 hover:border-copper/60 hover:text-parchment"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 space-y-14">
        {groups.map((group) => (
          <section key={group.key} id={group.key} className="scroll-mt-24">
            <h2
              className={cn(
                "text-2xl text-parchment",
                isFa ? "font-display-fa" : "font-display"
              )}
            >
              {dict.categories.items[group.key].name}
            </h2>
            <div className="mt-4 border-t border-ink-line">
              {group.items.map((item, i) => (
                <MenuTicket key={item.id} item={item} index={i + 1} locale={locale} dict={dict} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
