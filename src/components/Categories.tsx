import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";
import { categoryOrder, categoryCounts } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { categoryIcons } from "@/components/icons";
import Reveal from "@/components/Reveal";

export default function Categories({ locale, dict }: { locale: Locale; dict: Messages }) {
  const isFa = locale === "fa";

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-widest2 text-gold">{dict.categories.eyebrow}</p>
        <h2
          className={cn(
            "mt-3 text-4xl text-parchment sm:text-5xl",
            isFa ? "font-display-fa" : "font-display"
          )}
        >
          {dict.categories.title}
        </h2>
        <p className="mt-3 max-w-xl text-parchment/70">{dict.categories.description}</p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {categoryOrder.map((key, index) => {
            const item = dict.categories.items[key];
            const Icon = categoryIcons[key];
            return (
              <Reveal key={key} delayMs={index * 60}>
                <Link
                  href={`/${locale}/menu#${key}`}
                  className="focus-ring group relative flex h-[172px] flex-col justify-center overflow-hidden rounded-card border border-ink-line bg-ink-soft p-5 transition-all duration-300 hover:-translate-y-1 hover:border-copper hover:shadow-lg hover:shadow-black/20"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-8 w-8 shrink-0 text-copper-bright transition-transform duration-300 group-hover:scale-110"
                  />
                  <p
                    className={cn(
                      "mt-3 line-clamp-2 text-lg leading-snug text-parchment",
                      isFa ? "font-display-fa" : "font-display"
                    )}
                  >
                    {item.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-parchment/50">
                    {formatNumber(categoryCounts[key], locale)} {item.unit}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute end-4 top-4 text-copper opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-180"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
