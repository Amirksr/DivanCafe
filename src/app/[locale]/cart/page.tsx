import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import CartView from "@/components/CartView";

export default function CartPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getMessages(locale);
  const isFa = locale === "fa";

  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <h1
        className={cn(
          "text-4xl text-parchment sm:text-5xl",
          isFa ? "font-display-fa" : "font-display"
        )}
      >
        {dict.cart.title}
      </h1>

      <div className="mt-10">
        <CartView locale={locale} dict={dict} />
      </div>
    </div>
  );
}
