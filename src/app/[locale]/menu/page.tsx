import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import MenuBrowser from "@/components/MenuBrowser";

export default function MenuPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getMessages(locale);
  const isFa = locale === "fa";

  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <p className="text-xs uppercase tracking-widest2 text-gold">{dict.menu_page.eyebrow}</p>
      <h1
        className={cn(
          "mt-3 text-5xl text-parchment sm:text-6xl",
          isFa ? "font-display-fa" : "font-display"
        )}
      >
        {dict.menu_page.title}
      </h1>
      <p className="mt-4 max-w-xl text-parchment/70">{dict.menu_page.description}</p>

      <div className="mt-12">
        <MenuBrowser locale={locale} dict={dict} />
      </div>
    </div>
  );
}
