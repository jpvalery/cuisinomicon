import { homePath, LANG, LOCALES, type Locale, t } from "../i18n/ui";
import { flatIngredients, isoDuration } from "./format";
import type { Recipe } from "./recipes";
import { coverImages } from "./recipes";
import { SITE } from "./site";

// JSON-LD for search engines. One @graph per page; nodes link by @id.

const abs = (path: string) => new URL(path, SITE.url).href;
const PERSON_ID = `${SITE.url}/#jp`;
const WEBSITE_ID = `${SITE.url}/#website`;

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.author.name,
  url: SITE.author.url,
};

const website = (locale: Locale) => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  description: t(locale).description,
  inLanguage: LOCALES.map((l) => LANG[l].html),
  publisher: { "@id": PERSON_ID },
});

export function homeGraph(recipes: Recipe[], locale: Locale) {
  const url = abs(homePath(locale));
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(locale),
      person,
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: SITE.name,
        description: t(locale).description,
        inLanguage: LANG[locale].html,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: recipes.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: abs(r.url),
          })),
        },
      },
    ],
  };
}

/** Removes the lightweight markup used in step text (`*word*`). */
const plain = (text: string) => text.replace(/\*([^*]+)\*/g, "$1");

export function recipeGraph(recipe: Recipe) {
  const { data, locale } = recipe;
  const url = abs(recipe.url);
  const stepId = t(locale).recipe.stepId;
  const stepPhotos = data.steps.flatMap((s) => (s.image ? [abs(s.image)] : []));
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "Recipe",
        "@id": `${url}#recipe`,
        name: data.title,
        description: data.description,
        image: [...coverImages(recipe.key).schema.map(abs), ...stepPhotos],
        author: { "@id": PERSON_ID },
        datePublished: data.published.toISOString(),
        ...(data.updated && { dateModified: data.updated.toISOString() }),
        inLanguage: LANG[locale].html,
        mainEntityOfPage: url,
        isPartOf: { "@id": WEBSITE_ID },
        prepTime: isoDuration(data.prepTime),
        cookTime: isoDuration(data.cookTime),
        totalTime: isoDuration(data.totalTime),
        recipeYield: String(data.yield),
        recipeCategory: data.category,
        recipeCuisine: data.cuisine,
        keywords: data.keywords.join(", "),
        recipeIngredient: flatIngredients(data.ingredients),
        recipeInstructions: data.steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: plain(step.text || step.name),
          url: `${url}#${stepId}-${i + 1}`,
          ...(step.image && { image: abs(step.image) }),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: abs(homePath(locale)) },
          { "@type": "ListItem", position: 2, name: data.title, item: url },
        ],
      },
    ],
  };
}

/** Safe to inline in a <script type="application/ld+json">. */
export function jsonLd(graph: object): string {
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
