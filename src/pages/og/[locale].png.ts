import type { APIRoute, GetStaticPaths } from "astro";
import { LOCALES, type Locale } from "../../i18n/ui";
import { homeCard } from "../../lib/og";
import { getRecipes } from "../../lib/recipes";

export const getStaticPaths = (() =>
  LOCALES.map((locale) => ({ params: { locale } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale as Locale;
  return new Response(new Uint8Array(await homeCard(await getRecipes(locale), locale)), {
    headers: { "Content-Type": "image/png" },
  });
};
