import { type CollectionEntry, getCollection } from "astro:content";
import manifest from "../generated/images.json";
import { DEFAULT_LOCALE, type Locale, recipePath } from "../i18n/ui";
import { flatIngredients } from "./format";

type French = CollectionEntry<"recettes">;
type English = CollectionEntry<"en">;

export interface Recipe {
  /** File name of the French recipe: links translations and generated images. */
  key: string;
  locale: Locale;
  /** URL slug in this locale. */
  slug: string;
  url: string;
  /** Position in publication order, from 1. Shown as Bon N° / arcane number. */
  n: number;
  data: French["data"];
  /** The entry whose Markdown body holds the notes, in this locale. */
  entry: French | English;
  /** URL of this recipe in every locale it exists in. */
  alternates: Partial<Record<Locale, string>>;
}

async function load() {
  const french = (await getCollection("recettes")).sort(
    (a, b) => a.data.published.valueOf() - b.data.published.valueOf(),
  );
  const english = new Map((await getCollection("en")).map((e) => [e.id, e]));

  for (const [key, en] of english) {
    const fr = french.find((f) => f.id === key);
    if (!fr) throw new Error(`src/content/en/${key}.md has no French recipe`);
    // steps and ingredients pair up by position: step photos and order come from French
    if (en.data.steps.length !== fr.data.steps.length)
      throw new Error(
        `${key}: ${en.data.steps.length} English steps, ${fr.data.steps.length} French`,
      );
    const [ei, fi] = [flatIngredients(en.data.ingredients), flatIngredients(fr.data.ingredients)];
    if (ei.length !== fi.length)
      throw new Error(`${key}: ${ei.length} English ingredients, ${fi.length} French`);
  }

  return french.map((fr, i) => {
    const en = english.get(fr.id);
    const alternates: Recipe["alternates"] = { fr: recipePath("fr", fr.id) };
    if (en) alternates.en = recipePath("en", en.data.slug);
    return { fr, en, n: i + 1, alternates };
  });
}

export async function getRecipes(locale: Locale = DEFAULT_LOCALE): Promise<Recipe[]> {
  const all = await load();
  if (locale === "fr") {
    return all.map(({ fr, n, alternates }) => ({
      key: fr.id,
      locale,
      slug: fr.id,
      url: recipePath(locale, fr.id),
      n,
      data: fr.data,
      entry: fr,
      alternates,
    }));
  }
  // a recipe without a translation is simply absent from the English site
  return all.flatMap(({ fr, en, n, alternates }) => {
    if (!en) return [];
    const { slug, steps, ...text } = en.data;
    return [
      {
        key: fr.id,
        locale,
        slug,
        url: recipePath(locale, slug),
        n,
        data: {
          ...fr.data,
          ...text,
          steps: fr.data.steps.map((step, i) => ({
            ...step,
            name: steps[i].name,
            text: steps[i].text,
          })),
        } as French["data"],
        entry: en,
        alternates,
      },
    ];
  });
}

export interface Size {
  width: number;
  height: number;
}

interface Manifest {
  covers: Record<
    string,
    { ticket: Size; arcanes: Size; schema: Record<"1x1" | "4x3" | "16x9", Size> }
  >;
  steps: Record<string, { name: string; ticket: Size; arcanes: Size }>;
}

const images = manifest as Manifest;

export function coverImages(key: string) {
  const sizes = images.covers[key];
  if (!sizes) throw new Error(`No generated images for ${key}; restart the dev server`);
  return {
    ticket: { src: `/img/ticket/${key}.png`, ...sizes.ticket },
    arcanes: { src: `/img/arcanes/${key}.png`, ...sizes.arcanes },
    schema: (["1x1", "4x3", "16x9"] as const).map((r) => `/img/schema/${key}-${r}.jpg`),
  };
}

export function stepImages(path: string) {
  const step = images.steps[path];
  if (!step) throw new Error(`No generated images for ${path}; restart the dev server`);
  return {
    ticket: { src: `/img/ticket/steps/${step.name}.png`, ...step.ticket },
    arcanes: { src: `/img/arcanes/steps/${step.name}.jpg`, ...step.arcanes },
  };
}
