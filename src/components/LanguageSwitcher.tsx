"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function swapLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = nextLocale;
  return `/${segments.join("/")}`;
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <div className="flex items-center gap-1 text-sm" role="group" aria-label="Language">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="mx-1 text-parchment-dim/40">/</span>}
          <Link
            href={swapLocaleInPath(pathname, loc)}
            className={cn(
              "focus-ring uppercase tracking-wide",
              loc === locale ? "text-gold" : "text-parchment/60 hover:text-parchment"
            )}
            aria-current={loc === locale ? "true" : undefined}
          >
            {loc}
          </Link>
        </span>
      ))}
    </div>
  );
}
