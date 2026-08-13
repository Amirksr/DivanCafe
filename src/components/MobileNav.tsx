"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { Locale, Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { HomeIcon, MenuDocIcon, PeopleIcon, PhoneIcon, CloseIcon } from "@/components/icons";

interface NavLink {
  href: string;
  label: string;
  Icon: typeof HomeIcon;
}

/** Delay between an item lighting up and the panel actually closing/navigating. */
const SELECT_DELAY_MS = 220;

export default function MobileNav({ locale, dict }: { locale: Locale; dict: Messages }) {
  const [open, setOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isFa = locale === "fa";

  const links: NavLink[] = [
    { href: `/${locale}`, label: dict.nav.home, Icon: HomeIcon },
    { href: `/${locale}/menu`, label: dict.nav.menu, Icon: MenuDocIcon },
    { href: `/${locale}/about`, label: dict.nav.about, Icon: PeopleIcon },
    { href: `/${locale}/contact`, label: dict.nav.contact, Icon: PhoneIcon },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname?.startsWith(href);

  // Lock background scroll while the panel is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
    setPendingHref(null);
  }

  function selectLink(href: string) {
    setPendingHref(href);
    window.setTimeout(() => {
      close();
      router.push(href);
    }, SELECT_DELAY_MS);
  }

  return (
    <>
      <button
        type="button"
        className="focus-ring inline-flex flex-col gap-1.5 p-2"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn("block h-px w-6 bg-parchment transition-transform", open && "translate-y-[7px] rotate-45")} />
        <span className={cn("block h-px w-6 bg-parchment transition-opacity", open && "opacity-0")} />
        <span className={cn("block h-px w-6 bg-parchment transition-transform", open && "-translate-y-[7px] -rotate-45")} />
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 bg-charcoal/70 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Off-canvas panel — 70% viewport width, slides from the end (right in RTL, left in LTR) */}
      <nav
        id="mobile-nav-panel"
        aria-label="Primary mobile"
        className={cn(
          "fixed inset-y-0 start-0 z-50 flex w-[70vw] max-w-sm flex-col rounded-e-2xl bg-ink shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : isFa ? "translate-x-full" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 pt-6">
          <Logo wordmark={dict.hero.title} isFa={isFa} />
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={close}
              aria-label={dict.quick_view.close}
              className="focus-ring flex h-8 w-8 items-center justify-center text-parchment/60 hover:text-gold"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mx-5 mt-5 border-t border-ink-line" />

        <ul className="flex flex-1 flex-col gap-1 px-3 pt-4">
          {links.map(({ href, label, Icon }) => {
            const active = pendingHref === href || (!pendingHref && isActive(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    selectLink(href);
                  }}
                  className={cn(
                    "focus-ring relative flex items-center justify-between gap-3 rounded-card px-3 py-3 text-base transition-colors duration-150",
                    active ? "bg-copper/10 text-copper-bright" : "text-parchment/85 hover:bg-white/[0.03]"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                  <span className="flex-1">{label}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-1.5 start-0 w-[3px] rounded-full bg-copper-bright"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="px-5 pb-3">
          <div className="mb-4 flex items-center justify-center gap-3 border-t border-ink-line pt-4">
            <LanguageSwitcher locale={locale} />
          </div>
          <Link
            href={`/${locale}/contact`}
            onClick={(e) => {
              e.preventDefault();
              selectLink(`/${locale}/contact`);
            }}
            className="focus-ring flex items-center justify-center gap-2 rounded-card bg-copper px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-copper-bright"
          >
            {dict.nav.reserve}
            <span aria-hidden="true" className="rtl:rotate-180">→</span>
          </Link>
        </div>
        <div className="pb-[env(safe-area-inset-bottom)]" />
      </nav>
    </>
  );
}
