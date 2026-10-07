import type { APIRoute } from "astro";
import { DEFAULT_LOCALE, homePath, LOCALES, type Locale } from "../i18n/ui";
import { getRecipes } from "../lib/recipes";
import { SITE } from "../lib/site";

const abs = (path: string) => new URL(path, SITE.url).href;

/** One <url> per page, each listing every language version (hreflang) of itself. */
function entry(
  loc: string,
  lastmod: string | undefined,
  alternates: Partial<Record<Locale, string>>,
) {
  const langs = LOCALES.filter((l) => alternates[l]);
  const links =
    langs.length > 1
      ? [
          ...langs.map(
            (l) =>
              `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(alternates[l] ?? "")}"/>`,
          ),
          ...(alternates[DEFAULT_LOCALE]
            ? [
                `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(alternates[DEFAULT_LOCALE])}"/>`,
              ]
            : []),
        ]
      : [];
  return `  <url><loc>${abs(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}${links.join("")}</url>`;
}

export const GET: APIRoute = async () => {
  const byLocale = await Promise.all(LOCALES.map((l) => getRecipes(l)));
  const recipes = byLocale.flat();
  const lastmod = (r: (typeof recipes)[number]) =>
    (r.data.updated ?? r.data.published).toISOString();
  const newest = recipes.map(lastmod).sort().at(-1);
  const homes = Object.fromEntries(LOCALES.map((l) => [l, homePath(l)]));
  const urls = [
    ...LOCALES.map((l) => entry(homePath(l), newest, homes)),
    ...recipes.map((r) => entry(r.url, lastmod(r), r.alternates)),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
