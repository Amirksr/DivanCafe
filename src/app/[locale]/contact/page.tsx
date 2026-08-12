import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/ContactForm";

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getMessages(locale);
  const isFa = locale === "fa";
  const page = dict.contact_page;

  return (
    <div className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-widest2 text-gold">{page.eyebrow}</p>
        <h1
          className={cn(
            "mt-3 text-5xl text-parchment sm:text-6xl",
            isFa ? "font-display-fa" : "font-display"
          )}
        >
          {page.title}
        </h1>
        <p className="mt-4 max-w-xl text-parchment/70">{page.description}</p>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <ContactForm locale={locale} dict={dict} />

          <div>
            <h2 className="font-mono text-xs uppercase tracking-wide text-copper-bright">
              {page.info_title}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-parchment/75">
              <li>{dict.footer.address}</li>
              <li dir="ltr" className="text-start">
                <a className="focus-ring hover:text-gold" href={`tel:${dict.footer.phone.replace(/\s|-/g, "")}`}>
                  {dict.footer.phone}
                </a>
              </li>
              <li dir="ltr" className="text-start">
                <a className="focus-ring hover:text-gold" href={`mailto:${dict.footer.email}`}>
                  {dict.footer.email}
                </a>
              </li>
            </ul>

            <div
              aria-hidden="true"
              className="relative mt-6 flex h-56 items-center justify-center overflow-hidden rounded-card border border-ink-line bg-gradient-to-br from-ink-soft to-ink"
            >
              <svg viewBox="0 0 200 120" className="h-full w-full text-ink-line" fill="none">
                <path d="M0 90 Q50 60 100 90 T200 80" stroke="currentColor" strokeWidth="1" />
                <path d="M0 40 Q60 70 120 40 T200 50" stroke="currentColor" strokeWidth="1" />
                <circle cx="120" cy="55" r="5" fill="#D4A24C" />
              </svg>
            </div>
            <p className="mt-3 text-xs text-parchment/50">{page.map_note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
