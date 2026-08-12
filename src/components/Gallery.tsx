import Image from "next/image";
import type { Locale, Messages } from "@/lib/i18n";
import { galleryPhotos } from "@/lib/data";
import { translate } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

// One cell per photo (galleryPhotos is fixed order: interior, courtyard,
// roastery, library, coffee, pastry). Only applies above `sm` — mobile
// stays a plain uniform 2-column grid.
const BENTO_SPANS = [
  "sm:col-span-2 sm:row-span-2", // interior — featured
  "sm:col-span-2 sm:row-span-1", // courtyard — wide
  "sm:col-span-1 sm:row-span-1", // roastery
  "sm:col-span-1 sm:row-span-1", // library
  "sm:col-span-2 sm:row-span-1", // coffee — wide
  "sm:col-span-2 sm:row-span-1", // pastry — wide
];

export default function Gallery({ locale, dict }: { locale: Locale; dict: Messages }) {
  const isFa = locale === "fa";

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-widest2 text-gold">{dict.gallery.eyebrow}</p>
        <h2
          className={cn(
            "mt-3 text-4xl text-parchment sm:text-5xl",
            isFa ? "font-display-fa" : "font-display"
          )}
        >
          {dict.gallery.title}
        </h2>
        <p className="mt-3 max-w-xl text-parchment/70">{dict.gallery.description}</p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[150px]">
          {galleryPhotos.map((photo, i) => {
            const src = photo.unsplashId
              ? `https://images.unsplash.com/photo-${photo.unsplashId}?w=800&q=80&auto=format&fit=crop`
              : photo.localPhoto;
            if (!src) return null;
            return (
              <Reveal key={photo.id} delayMs={i * 70} className={cn("aspect-square sm:aspect-auto", BENTO_SPANS[i])}>
                <figure className="group relative flex h-full items-end overflow-hidden rounded-card border border-ink-line">
                  <Image
                    src={src}
                    alt={translate(dict, photo.captionKey)}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent"
                  />
                  <figcaption className="relative p-4 text-xs text-bone/90">
                    {translate(dict, photo.captionKey)}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
