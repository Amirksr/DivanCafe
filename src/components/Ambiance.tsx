import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";
import { ambianceFeatures } from "@/lib/data";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

export default function Ambiance({ locale, dict }: { locale: Locale; dict: Messages }) {
  const isFa = locale === "fa";

  return (
    <section id="ambiance" className="scroll-mt-28 bg-ink-soft px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <p className="text-xs uppercase tracking-widest2 text-gold">{dict.ambiance.eyebrow}</p>
          <h2
            className={cn(
              "mt-3 text-4xl text-parchment sm:text-5xl",
              isFa ? "font-display-fa" : "font-display"
            )}
          >
            {dict.ambiance.title}
          </h2>
          <p className="mt-4 max-w-md text-parchment/70">{dict.ambiance.description}</p>

          <dl className="mt-8 rounded-card border border-ink-line p-6">
            <dt className="font-mono text-xs uppercase tracking-wide text-copper-bright">
              {dict.hours.title}
            </dt>
            <div className="mt-3 flex justify-between text-sm text-parchment/80">
              <span>{dict.hours.everyday}</span>
              <span className="font-mono">{dict.hours.everyday_time}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-parchment/80">
              <span>{dict.hours.weekend}</span>
              <span className="font-mono">{dict.hours.weekend_time}</span>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {ambianceFeatures.map((key, index) => {
            const feature = dict.ambiance.features[key];
            return (
              <Reveal key={key} delayMs={index * 80}>
                <Link
                  href={`/${locale}/spaces/${key}`}
                  className="focus-ring group relative flex h-36 flex-col rounded-card border border-ink-line bg-ink p-5 transition-colors hover:border-copper"
                >
                  <p
                    className={cn(
                      "line-clamp-1 text-base text-parchment",
                      isFa ? "font-display-fa" : "font-display"
                    )}
                  >
                    {feature.title}
                  </p>
                  <p className="mt-1.5 line-clamp-3 pe-5 text-xs leading-relaxed text-parchment/60">
                    {feature.desc}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute end-4 top-5 text-copper-bright opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
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
