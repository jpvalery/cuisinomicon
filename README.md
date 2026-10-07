# Cuisinomicon 𖤐

Jp's recipe collection, at [cuisinomicon.com](https://cuisinomicon.com).

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Formatted and linted with [Biome](https://biomejs.dev). Deployed on Vercel as a static site.

## Commands

| Command        | Action                                        |
| -------------- | --------------------------------------------- |
| `pnpm install` | Install dependencies                          |
| `pnpm dev`     | Start the dev server                          |
| `pnpm build`   | Build the static site to `dist/`              |
| `pnpm preview` | Serve `dist/` locally                         |
| `pnpm check`   | Lint and check formatting with Biome          |
| `pnpm format`  | Apply Biome fixes and formatting              |

## Two themes

The site has two looks that share the same HTML. The **Menu** button at the top of every page (or <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd>) opens a modal to pick one, switch language, or email Jp:

- **Ticket**: kitchen order tickets on a steel rail, VT323 terminal type, dithered images.
- **Arcanes**: each recipe is a Tarot de Marseille card on a blue cloth.

`<html data-theme="ticket|arcanes">` holds the active theme. An inline script in `src/layouts/Base.astro` sets it before the first paint: the saved choice first, otherwise Ticket for a light system theme and Arcanes for a dark one. The favicon, the Apple touch icon (`public/icons/`) and the browser colour follow the theme (`THEME_META` in `src/lib/site.ts`).

In markup, the Tailwind variants `ticket:` and `arcanes:` style an element per theme. The classes `ticket-only` and `arcanes-only` show an element in one theme only. Decorations that are hard to express as utilities live in `src/styles/global.css`.

Printing a recipe always produces the receipt, sized for an 80 mm thermal printer (72 mm printable). The "Imprimer le bon (80 mm)" button also sets the page to the exact receipt height, so the printer cuts once.

## Languages

French is the original and keeps the URLs without prefix (`/canneles`). English lives under `/en/` (`/en/lemon-meringue-tart`). Interface strings, the contact address and the URL helpers are in `src/i18n/ui.ts`.

Pages link their translations with `hreflang` (plus `x-default` → French), and the sitemap lists the same alternates.

## Add a recipe

1. Put the cover illustration in `public/assets/cover/<slug>.jpg`. A subject on a plain light background works best.
2. Create `src/content/recettes/<slug>.md`. The file name is the URL: `/<slug>`.
3. Restart `pnpm dev` so the theme images are generated.
4. Optional: add the English version (see below).

```yaml
---
title: Cannelés
description: One or two sentences. Also used as the meta description (160 characters at most).
published: 2025-08-19T22:15:00.000Z
updated: 2026-10-07T12:00:00.000Z # optional
category: Dessert
cuisine: Française
keywords: [cannelés]
yield: 12
prepTime: PT1H # ISO 8601 durations
cookTime: PT1H10M
totalTime: PT2H30M # must be at least prepTime + cookTime
cover: /assets/cover/canneles.jpg
ingredients:
  - 240g sucre # a plain list…
  - group: Meringue # …or named groups
    items:
      - 5 blancs d'oeuf
steps:
  - name: Pétrir la pâte
    text: Mélanger les ingrédients. *lentement* becomes emphasis.
    image: /assets/pages/<slug>/photo.jpeg # optional step photo
---

Notes in Markdown.
```

`src/content.config.ts` validates every field at build time.

### English version

Create `src/content/en/<same file name as the French recipe>.md`. It holds only text; times, yield, dates and images come from the French file:

```yaml
---
slug: canneles # English URL: /en/canneles
title: Cannelés
description: My recipe for Bordeaux cannelés, with rum and vanilla.
category: Dessert
cuisine: French
keywords: [cannelés]
ingredients: [...] # same number of items as the French file, same order
steps: [...] # same number of steps, same order (step photos come from French)
---

Notes in Markdown.
```

The build fails if the step or ingredient count differs from the French file. A recipe without an English file is simply absent from the English site.

## Images

`integrations/images.mjs` runs at the start of `astro dev` and `astro build`. It reads each cover and step photo, then writes to `public/img/` (git-ignored):

- `ticket/`: 1-bit Atkinson dither (Ticket theme)
- `arcanes/`: flat Tarot colours with black contours (Arcanes theme)
- `schema/`: 1:1, 4:3 and 16:9 crops for the Recipe structured data

It skips images that are newer than their source. Bump `VERSION` in the file to regenerate everything.

## SEO

- Canonical URLs without a trailing slash. `vercel.json` serves `canneles.html` at `/canneles`.
- Open Graph and Twitter tags on every page. The 1200×630 cards (`/og/<locale>.png`, `/og/<locale>/<slug>.png`) are rendered at build time by `src/lib/og.ts`: satori lays out the card and turns text into paths with the fonts in `src/og/fonts/`, then sharp converts it to PNG.
- JSON-LD: `WebSite` and `ItemList` on the home pages, `Recipe` and `BreadcrumbList` on recipe pages, in the page's language.
- `hreflang` alternates in the `<head>` and in `sitemap.xml`; `robots.txt` points to the sitemap.
