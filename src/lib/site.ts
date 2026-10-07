export const SITE = {
  name: "Cuisinomicon",
  url: "https://cuisinomicon.com",
  author: { name: "Jp Valery", url: "https://jpvalery.me" },
  twitter: "@jpvalery",
  since: 2021,
  analytics: {
    src: "https://analytics.jpvalery.com/script.js",
    websiteId: "2025ac19-430a-4360-b22d-12870aa0c4b5",
  },
} as const;

export const THEMES = ["ticket", "arcanes"] as const;
export type Theme = (typeof THEMES)[number];

/** Per theme: page background for <meta name="theme-color">, favicon and Apple touch icon. */
export const THEME_META: Record<Theme, { color: string; icon: string; touchIcon: string }> = {
  ticket: { color: "#d5d6d2", icon: "/icons/ticket.svg", touchIcon: "/icons/ticket.png" },
  arcanes: { color: "#1b2a5e", icon: "/icons/arcanes.svg", touchIcon: "/icons/arcanes.png" },
};

/** Social cards are rendered by src/pages/og/[locale].png.ts and og/[locale]/[slug].png.ts. */
export const OG = { width: 1200, height: 630 } as const;
export const ogPath = (locale: string, slug?: string) =>
  slug ? `/og/${locale}/${slug}.png` : `/og/${locale}.png`;
