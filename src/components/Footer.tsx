import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer({ locale, dict }: { locale: Locale; dict: Messages }) {
  const isFa = locale === "fa";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-line bg-ink px-5 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className={cn("text-2xl text-parchment", isFa ? "font-display-fa" : "font-display")}>
              {dict.hero.title}
            </p>
            <p className="mt-3 max-w-xs text-sm text-parchment/60">{dict.footer.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs uppercase tracking-widest2 text-copper-bright">
              {dict.footer.quick_links}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-parchment/70">
              <li><Link className="focus-ring hover:text-gold" href={`/${locale}`}>{dict.nav.home}</Link></li>
              <li><Link className="focus-ring hover:text-gold" href={`/${locale}/menu`}>{dict.nav.menu}</Link></li>
              <li><Link className="focus-ring hover:text-gold" href={`/${locale}/about`}>{dict.nav.about}</Link></li>
              <li><Link className="focus-ring hover:text-gold" href={`/${locale}/contact`}>{dict.nav.contact}</Link></li>
            </ul>
          </nav>

          <div>
            <p className="text-xs uppercase tracking-widest2 text-copper-bright">
              {dict.footer.contact_info}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-parchment/70">
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
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest2 text-copper-bright">
              {dict.footer.newsletter}
            </p>
            <p className="mt-4 text-sm text-parchment/60">{dict.footer.newsletter_desc}</p>
            <NewsletterForm placeholder={dict.footer.newsletter_placeholder} cta={dict.footer.newsletter_cta} />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-ink-line pt-6 text-xs text-parchment/50 sm:flex-row">
          <p>
            © {year} {dict.hero.title} — {dict.footer.rights}
          </p>
          <p>{dict.footer.made_by}</p>
        </div>
      </div>
    </footer>
  );
}
