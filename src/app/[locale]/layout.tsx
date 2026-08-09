import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { getMessages, isLocale, localeDirection, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** CSS custom properties consumed by the font families declared in tailwind.config.ts. */
const fontVariables: CSSProperties = {
  "--font-display": "'Newsreader', serif",
  "--font-display-fa": "'Vazirmatn', serif",
  "--font-body": "'Inter', sans-serif",
  "--font-body-fa": "'Vazirmatn', sans-serif",
  "--font-mono": "'JetBrains Mono', monospace",
} as CSSProperties;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getMessages(params.locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: { fa: "/fa", en: "/en" },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getMessages(locale);
  const dir = localeDirection[locale];

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router layout head, not pages/_document */}
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Vazirmatn:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={
          dir === "rtl"
            ? "font-body-fa antialiased"
            : "font-body antialiased"
        }
        style={fontVariables}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-copper focus:px-4 focus:py-2 focus:text-parchment"
        >
          {locale === "fa" ? "رفتن به محتوای اصلی" : "Skip to content"}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
