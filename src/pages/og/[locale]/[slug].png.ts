import type { APIRoute, GetStaticPaths } from "astro";
import { LOCALES } from "../../../i18n/ui";
import { recipeCard } from "../../../lib/og";
import { getRecipes, type Recipe } from "../../../lib/recipes";

export const getStaticPaths = (async () => {
  const all = await Promise.all(LOCALES.map((locale) => getRecipes(locale)));
  return all.flat().map((recipe) => ({
    params: { locale: recipe.locale, slug: recipe.slug },
    props: { recipe },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ recipe: Recipe }> = async ({ props }) =>
  new Response(new Uint8Array(await recipeCard(props.recipe)), {
    headers: { "Content-Type": "image/png" },
  });
