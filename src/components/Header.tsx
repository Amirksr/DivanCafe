"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale, Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
  dict: Messages;
}

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links: Array<{ href: string; label: string }> = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/menu`, label: dict.nav.menu },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line/70 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href={`/${locale}`}
          className={cn(
            "focus-ring text-xl tracking-widest2",
            locale === "fa" ? "font-display-fa" : "font-display"
          )}
        >
          {dict.hero.title}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "focus-ring text-sm transition-colors hover:text-copper-bright",
                isActive(link.href) ? "text-copper-bright" : "text-parchment/80"
              )}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="focus-ring rounded-sm border border-copper px-4 py-2 text-sm text-copper-bright transition-colors hover:bg-copper hover:text-ink"
          >
            {dict.nav.reserve}
          </Link>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex flex-col gap-1.5 p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "block h-px w-6 bg-parchment transition-transform",
              open && "translate-y-[7px] rotate-45"
            )}
          />
          <span className={cn("block h-px w-6 bg-parchment transition-opacity", open && "opacity-0")} />
          <span
            className={cn(
              "block h-px w-6 bg-parchment transition-transform",
              open && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-ink-line/70 px-5 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-ring block text-base text-parchment/90"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between">
            <LanguageSwitcher locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="focus-ring rounded-sm border border-copper px-4 py-2 text-sm text-copper-bright"
              onClick={() => setOpen(false)}
            >
              {dict.nav.reserve}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
