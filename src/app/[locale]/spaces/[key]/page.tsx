import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { ambianceFeatures, spacePhotos, type SpaceKey } from "@/lib/data";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return ambianceFeatures.map((key) => ({ key }));
}

function isSpaceKey(value: string): value is SpaceKey {
  return (ambianceFeatures as string[]).includes(value);
}

function photoSrc(photo: { unsplashId?: string; localPhoto?: string }): string | undefined {
  return photo.unsplashId
    ? `https://images.unsplash.com/photo-${photo.unsplashId}?w=1200&q=78&auto=format&fit=crop`
    : photo.localPhoto;
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
  const [hero, ...rest] = photos;
  const heroSrc = hero ? photoSrc(hero) : undefined;

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

        {heroSrc && (
          <Reveal className="mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-ink-line">
              <Image src={heroSrc} alt="" fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" priority />
            </div>
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {rest.map((photo, i) => {
              const src = photoSrc(photo);
              if (!src) return null;
              return (
                <Reveal key={i} delayMs={i * 60}>
                  <div className="relative aspect-square overflow-hidden rounded-sm border border-ink-line">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out hover:scale-110"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {photos.length < 2 && (
          <p className="mt-6 text-center text-xs text-parchment/40">{dict.space_page.more_photos_note}</p>
        )}
      </div>
    </div>
  );
}
