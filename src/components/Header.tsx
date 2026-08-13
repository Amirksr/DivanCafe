"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import CartButton from "@/components/CartButton";
import MobileNav from "@/components/MobileNav";

interface HeaderProps {
  locale: Locale;
  dict: Messages;
}

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const isFa = locale === "fa";

  const links: Array<{ href: string; label: string }> = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/menu`, label: dict.nav.menu },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname?.startsWith(href);

  return (
    <header className="sticky top-3 z-40 mx-3 rounded-card border border-ink-line bg-ink/95 backdrop-blur sm:mx-6 lg:mx-auto lg:max-w-6xl">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <Link href={`/${locale}`} className="focus-ring">
          <Logo wordmark={dict.hero.title} isFa={isFa} />
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
          <ThemeToggle />
          <CartButton locale={locale} label={dict.nav.cart} />
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="focus-ring rounded-card border border-copper px-4 py-2 text-sm text-copper-bright transition-colors hover:bg-copper hover:text-charcoal"
          >
            {dict.nav.reserve}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <CartButton locale={locale} label={dict.nav.cart} />
          <MobileNav locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  );
}
