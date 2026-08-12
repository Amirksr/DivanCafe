import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

const valueKeys = ["quality", "craft", "community"] as const;
const teamKeys = ["roaster", "chef", "host"] as const;

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getMessages(locale);
  const isFa = locale === "fa";
  const page = dict.about_page;

  return (
    <div className="px-5 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-widest2 text-gold">{page.eyebrow}</p>
        <h1
          className={cn(
            "mt-3 text-balance text-5xl text-parchment sm:text-6xl",
            isFa ? "font-display-fa" : "font-display"
          )}
        >
          {page.title}
        </h1>

        <div className="mt-8 space-y-5 text-parchment/75">
          <p>{page.p1}</p>
          <p>{page.p2}</p>
          <p>{page.p3}</p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className={cn("text-2xl text-parchment", isFa ? "font-display-fa" : "font-display")}>
          {page.values_title}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {valueKeys.map((key) => {
            const value = page.values[key];
            return (
              <div key={key} className="rounded-card border border-ink-line bg-ink-soft p-6">
                <p className={cn("text-lg text-parchment", isFa ? "font-display-fa" : "font-display")}>
                  {value.title}
                </p>
                <p className="mt-2 text-sm text-parchment/60">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className={cn("text-2xl text-parchment", isFa ? "font-display-fa" : "font-display")}>
          {page.team_title}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {teamKeys.map((key) => {
            const member = page.team[key];
            return (
              <div key={key} className="flex items-center gap-4 rounded-card border border-ink-line p-4">
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-copper-dim to-ink font-mono text-sm text-parchment/70"
                >
                  {member.name.slice(0, 1)}
                </div>
                <div>
                  <p className="text-sm text-parchment">{member.name}</p>
                  <p className="text-xs text-parchment/50">{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
