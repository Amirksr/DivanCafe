import Image from "next/image";
import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import RingStamp from "@/components/RingStamp";
import Reveal from "@/components/Reveal";

export default function Hero({ locale, dict }: { locale: Locale; dict: Messages }) {
  const isFa = locale === "fa";

  return (
    <section className="relative overflow-hidden bg-charcoal px-5 pb-24 pt-16 sm:pt-24">
      <Image
        src="/gallery-photos/exterior.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/75 to-charcoal"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#D4A24C_0,transparent_35%),radial-gradient(circle_at_80%_60%,#B8622C_0,transparent_40%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-widest2 text-gold">{dict.hero.eyebrow}</p>
          <h1
            className={cn(
              "mt-4 text-balance text-6xl leading-[0.95] text-bone sm:text-7xl",
              isFa ? "font-display-fa" : "font-display"
            )}
          >
            {dict.hero.title}
          </h1>
          <p
            className={cn(
              "mt-4 text-xl text-copper-bright",
              isFa ? "font-display-fa" : "font-display italic"
            )}
          >
            {dict.hero.subtitle}
          </p>
          <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-bone/75">
            {dict.hero.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/menu`}
              className="focus-ring rounded-sm bg-copper px-6 py-3 text-sm font-medium text-charcoal transition-all hover:-translate-y-0.5 hover:bg-copper-bright hover:shadow-lg hover:shadow-copper/20"
            >
              {dict.hero.cta_menu}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="focus-ring rounded-sm border border-bone/30 px-6 py-3 text-sm text-bone/90 transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              {dict.hero.cta_reserve}
            </Link>
          </div>
        </Reveal>

        <Reveal delayMs={150} className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
          <div aria-hidden="true" className="absolute inset-0 rounded-full border border-charcoal-line" />
          <div aria-hidden="true" className="absolute inset-6 rounded-full border border-dashed border-charcoal-line" />

          {/* steam - centered above the cup */}
          <div
            aria-hidden="true"
            className="absolute bottom-[58%] start-1/2 flex -translate-x-1/2 gap-3 rtl:translate-x-1/2"
          >
            <span className="h-16 w-2 rounded-full bg-bone/60 blur-[2px] animate-steam" />
            <span className="h-20 w-2 rounded-full bg-bone/60 blur-[2px] animate-steam-delay" />
            <span className="h-16 w-2 rounded-full bg-bone/60 blur-[2px] animate-steam" />
          </div>

          {/* cup */}
          <svg viewBox="0 0 200 140" className="relative h-40 w-56 text-copper-bright" aria-hidden="true">
            <path
              d="M20 40h120v40c0 27-27 44-60 44S20 107 20 80V40Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              d="M140 52h16a18 18 0 0 1 0 36h-16"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
            <line x1="20" y1="40" x2="140" y2="40" stroke="currentColor" strokeWidth="4" />
          </svg>

          <div className="absolute -bottom-4 -end-4 origin-center animate-stamp rotate-[-8deg] rounded-full border-2 border-gold bg-charcoal/80 px-5 py-4 text-center shadow-lg">
            <RingStamp className="absolute inset-0 h-full w-full text-gold" />
            <p className="relative text-[10px] uppercase tracking-widest2 text-gold">{dict.hero.open_badge}</p>
            <p className="relative mt-1 font-mono text-sm text-bone">{dict.hero.hours_today}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
