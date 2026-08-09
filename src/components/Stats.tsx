import type { Locale, Messages } from "@/lib/i18n";
import { stats } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import Reveal from "@/components/Reveal";

export default function Stats({ locale, dict }: { locale: Locale; dict: Messages }) {
  return (
    <section className="border-y border-ink-line bg-ink-soft px-5 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.key} delayMs={index * 80} className="text-center">
            <p className="font-mono text-3xl text-gold sm:text-4xl">
              {formatNumber(stat.value, locale)}
              {stat.suffix}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wide text-parchment/60">
              {dict.stats[stat.key as keyof typeof dict.stats]}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
