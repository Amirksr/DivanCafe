import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";
import { popularItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import MenuTicket from "@/components/MenuTicket";
import Reveal from "@/components/Reveal";

export default function PopularItems({ locale, dict }: { locale: Locale; dict: Messages }) {
  const isFa = locale === "fa";

  return (
    <section className="bg-paper px-5 py-20 text-charcoal">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-widest2 text-copper">{dict.popular.eyebrow}</p>
        <h2
          className={cn(
            "mt-3 text-4xl sm:text-5xl",
            isFa ? "font-display-fa" : "font-display"
          )}
        >
          {dict.popular.title}
        </h2>
        <p className="mt-3 max-w-lg text-charcoal/70">{dict.popular.description}</p>

        <Reveal delayMs={100} className="mt-8 rounded-sm border border-charcoal/10 bg-bone px-6 sm:px-8">
          {popularItems.map((item, i) => (
            <MenuTicket key={item.id} item={item} index={i + 1} locale={locale} dict={dict} tone="light" />
          ))}
        </Reveal>

        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/menu`}
            className="focus-ring inline-block rounded-sm border border-charcoal/20 px-6 py-3 text-sm text-charcoal transition-all hover:-translate-y-0.5 hover:border-copper hover:text-copper"
          >
            {dict.popular.view_all}
          </Link>
        </div>
      </div>
    </section>
  );
}
