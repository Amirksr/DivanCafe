# Divan (دیوان) — Coffeehouse & Kitchen

A bilingual (Persian/English) cafe website built with Next.js 14 (App Router),
TypeScript, and Tailwind CSS. Inspired by `cafino.site`, but rebuilt with a
distinct visual identity (a "ledger / ticket" menu system and coffee-ring
stamp motif instead of a generic template look), full RTL support, a
filterable menu, and a tested codebase.

## Stack

- **Next.js 14** (App Router, static generation)
- **TypeScript** (strict mode)
- **Tailwind CSS** (custom design tokens — see `tailwind.config.ts`)
- **Custom lightweight i18n** — `/fa` and `/en` routes, no external i18n
  dependency, RTL/LTR handled via the `dir` attribute
- **Jest + Testing Library** — 33 unit/component tests

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/fa` or `/en` based on
your browser's `Accept-Language` header.

## Project structure

```
messages/           en.json / fa.json — all UI copy, per locale
src/
  app/
    [locale]/        locale-scoped routes: /, /menu, /about, /contact
    layout.tsx        root passthrough layout
  components/         Header, Hero, MenuTicket, ContactForm, etc.
  lib/
    i18n.ts            locale helpers + dictionary loader
    utils.ts           cn(), formatPrice(), ledgerNumber()
    data.ts             menu items, categories, gallery, stats
__tests__/            Jest test suites (mirrors src/ structure)
```

## Testing

```bash
npm test          # run once
npm run test:watch
```

All new logic (pure helpers, i18n resolution, form validation, and the
`MenuTicket` component in both locales) has unit/component test coverage.

## Editorial content

- Menu items, prices (in Toman), categories, and stats live in
  `src/lib/data.ts` — edit this file to update the menu.
- All UI strings live in `messages/en.json` and `messages/fa.json`, keyed
  identically so both stay in sync.
- Photography: the gallery and hero currently use stylized gradient
  placeholders (no external image hotlinking) so the project has zero
  external image dependencies out of the box. Swap in real photography by
  replacing the placeholder blocks in `src/components/Gallery.tsx` and
  `src/components/Hero.tsx` with `next/image`, pointing at your own asset
  host (already allow-listed for `images.unsplash.com` in
  `next.config.mjs` — add your own host there too).

## Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Vercel, **Add New Project** → import the repo. Framework preset
   `Next.js` is auto-detected — no config changes needed.
3. Deploy. Vercel will run `npm install && npm run build` automatically.
4. Custom domain: add it under **Settings → Domains** once deployed.

No environment variables are required for the current version (no
database, no backend). The contact form is a static UI stub — wire its
`handleSubmit` in `src/components/ContactForm.tsx` to an API route or a
service like Formspree/Resend when you're ready to receive real
submissions.

### Vercel CLI (alternative)

```bash
npm i -g vercel
vercel
vercel --prod
```

---

### یادداشت فارسی

این پروژه یک وب‌سایت دو زبانه (فارسی/انگلیسی) برای کافه با Next.js 14،
TypeScript و Tailwind است. برای اجرا: `npm install` سپس `npm run dev`.
محتوای منو در `src/lib/data.ts` و متن‌های رابط کاربری در `messages/fa.json`
و `messages/en.json` قرار دارند. برای استقرار، پروژه را در گیت‌هاب push کنید
و در Vercel به‌عنوان یک پروژه‌ی Next.js وارد کنید — نیازی به تنظیم متغیر
محیطی نیست.
