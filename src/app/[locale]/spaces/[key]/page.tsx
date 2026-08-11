import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { ambianceFeatures, spacePhotos, type SpaceKey } from "@/lib/data";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return ambianceFeatures.map((key) => ({ key }));
}

function isSpaceKey(value: string): value is SpaceKey {
  return (ambianceFeatures as string[]).includes(value);
}

export default function SpacePage({
  params,
}: {
  params: { locale: string; key: string };
}) {
  if (!isLocale(params.locale) || !isSpaceKey(params.key)) notFound();
  const locale = params.locale as Locale;
  const key = params.key as SpaceKey;
  const dict = getMessages(locale);
  const isFa = locale === "fa";
  const feature = dict.ambiance.features[key];
  const photos = spacePhotos[key];

  return (
    <div className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/${locale}#ambiance`}
          className="focus-ring inline-flex items-center gap-1.5 text-sm text-parchment/60 hover:text-gold"
        >
          <span aria-hidden="true" className="rtl:rotate-180">←</span>
          {dict.space_page.back}
        </Link>

        <p className="mt-6 text-xs uppercase tracking-widest2 text-gold">{dict.space_page.eyebrow}</p>
        <h1
          className={cn(
            "mt-3 text-4xl text-parchment sm:text-5xl",
            isFa ? "font-display-fa" : "font-display"
          )}
        >
          {feature.title}
        </h1>
        <p className="mt-4 max-w-xl text-parchment/70">{feature.desc}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {photos.map((photo, i) => {
            const src = photo.unsplashId
              ? `https://images.unsplash.com/photo-${photo.unsplashId}?w=1000&q=78&auto=format&fit=crop`
              : photo.localPhoto;
            if (!src) return null;
            return (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink-line">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>

        {photos.length < 2 && (
          <p className="mt-6 text-center text-xs text-parchment/40">{dict.space_page.more_photos_note}</p>
        )}
      </div>
    </div>
  );
}
