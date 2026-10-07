export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** French is the original language and keeps the URLs without prefix. */
export const DEFAULT_LOCALE: Locale = "fr";

export const LANG: Record<Locale, { html: string; og: string; name: string }> = {
  fr: { html: "fr-CA", og: "fr_CA", name: "Français" },
  en: { html: "en-CA", og: "en_CA", name: "English" },
};

export const homePath = (locale: Locale) => (locale === DEFAULT_LOCALE ? "/" : `/${locale}`);
export const recipePath = (locale: Locale, slug: string) =>
  locale === DEFAULT_LOCALE ? `/${slug}` : `/${locale}/${slug}`;

export const CONTACT_EMAIL = "cuisinomicon@jpvalery.me";

const NUMBER_WORDS: Record<Locale, string[]> = {
  fr: ["zéro", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"],
  en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
};
const count = (locale: Locale, n: number) => NUMBER_WORDS[locale][n] ?? String(n);

export const UI = {
  fr: {
    description:
      "Les recettes de cuisine de Jp Valery : desserts, pâtes, boulangerie et brunch, testés et mis au propre.",
    homeTitle: "Cuisinomicon — Les recettes de Jp",
    recipeTitle: (title: string) => `${title} — la recette`,
    ogAlt: "Cuisinomicon, les recettes de Jp",
    skip: "Aller au contenu",
    by: "par",
    menu: {
      open: "Menu",
      title: "Menu",
      close: "Fermer",
      style: "Style",
      ticket: "Les bons de la cuisine",
      arcanes: "Un tirage de tarot",
      language: "Langue",
      contact: "Contact",
      write: "Écrire à Jp",
    },
    back: { ticket: "Tous les bons", arcanes: "Toutes les cartes" },
    ticket: {
      tagline: (n: number) => ({
        before: "Les recettes de Jp, imprimées à la commande.",
        count: `${n}\u00a0bons`,
        after: "au passe.",
      }),
      number: "Bon N°",
      table: "Table :",
      house: "Recettes de Jp",
      date: "Date",
      cuisine: "Cuisine",
      note: "Note du chef",
      thanks: "Merci et à bientôt",
      print: "Imprimer le bon (80 mm)",
      totalRecipes: (n: number) => `${n} recettes`,
    },
    arcanes: {
      tagline: (n: number) => `Les recettes de Jp, en ${count("fr", n)} arcanes.`,
      draw: "Tirer une carte",
      drawAgain: "Tirer une autre carte",
      read: "Lire la recette",
      close: "Fermer",
      drawn: "Carte tirée",
      notes: "Notes",
      kind: (category: string, cuisine: string) => `${category}, cuisine ${cuisine.toLowerCase()}`,
    },
    recipe: {
      ingredients: "Ingrédients",
      steps: "Étapes",
      prep: "Préparation",
      cook: "Cuisson",
      total: "Total",
      yield: "Pour",
      step: "Étape",
      stepId: "etape",
      summary: (prep: string, cook: string, y: number) =>
        `Préparation ${prep}, cuisson ${cook}, pour ${y}.`,
    },
  },
  en: {
    description:
      "Jp Valery's recipes: desserts, pasta, baking and brunch, tested and written down properly.",
    homeTitle: "Cuisinomicon — Jp's recipes",
    recipeTitle: (title: string) => `${title} — recipe`,
    ogAlt: "Cuisinomicon, Jp's recipes",
    skip: "Skip to content",
    by: "by",
    menu: {
      open: "Menu",
      title: "Menu",
      close: "Close",
      style: "Style",
      ticket: "Kitchen order tickets",
      arcanes: "A tarot spread",
      language: "Language",
      contact: "Contact",
      write: "Email Jp",
    },
    back: { ticket: "All tickets", arcanes: "All cards" },
    ticket: {
      tagline: (n: number) => ({
        before: "Jp's recipes, printed to order.",
        count: `${n}\u00a0tickets`,
        after: "on the pass.",
      }),
      number: "Ticket #",
      table: "Table:",
      house: "Jp's recipes",
      date: "Date",
      cuisine: "Cuisine",
      note: "Chef's note",
      thanks: "Thank you, come again",
      print: "Print ticket (80 mm)",
      totalRecipes: (n: number) => `${n} recipes`,
    },
    arcanes: {
      tagline: (n: number) => `Jp's recipes, in ${count("en", n)} arcana.`,
      draw: "Draw a card",
      drawAgain: "Draw another card",
      read: "Read the recipe",
      close: "Close",
      drawn: "Card drawn",
      notes: "Notes",
      kind: (category: string, cuisine: string) => `${category}, ${cuisine} cuisine`,
    },
    recipe: {
      ingredients: "Ingredients",
      steps: "Steps",
      prep: "Prep",
      cook: "Cook",
      total: "Total",
      yield: "Yield",
      step: "Step",
      stepId: "step",
      summary: (prep: string, cook: string, y: number) => `Prep ${prep}, cook ${cook}, yield ${y}.`,
    },
  },
} satisfies Record<Locale, unknown>;

export type Strings = (typeof UI)[Locale];
export const t = (locale: Locale): Strings => UI[locale];
