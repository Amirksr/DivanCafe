import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import PopularItems from "@/components/PopularItems";
import Gallery from "@/components/Gallery";
import Ambiance from "@/components/Ambiance";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getMessages(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Stats locale={locale} dict={dict} />
      <Categories locale={locale} dict={dict} />
      <PopularItems locale={locale} dict={dict} />
      <Gallery locale={locale} dict={dict} />
      <Ambiance locale={locale} dict={dict} />
    </>
  );
}
