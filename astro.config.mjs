// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import images from "./integrations/images.mjs";

export default defineConfig({
  site: "https://cuisinomicon.com",
  // URLs stay as they were on the Next.js site: /canneles, no trailing slash.
  // vercel.json serves canneles.html at /canneles (cleanUrls).
  trailingSlash: "never",
  build: { format: "file" },
  // Astro 7 strips whitespace with JSX rules by default; keep HTML semantics.
  compressHTML: true,
  integrations: [images()],
  vite: { plugins: [tailwindcss()] },
  fonts: [
    // Ticket theme
    {
      // DEC VT320 terminal face, for titles and totals
      name: "VT323",
      cssVariable: "--font-vt323",
      provider: fontProviders.google(),
      weights: [400],
      styles: ["normal"],
      fallbacks: ["monospace"],
    },
    {
      name: "Chivo Mono",
      cssVariable: "--font-chivo-mono",
      provider: fontProviders.google(),
      weights: ["400 800"],
      styles: ["normal", "italic"],
      fallbacks: ["monospace"],
    },
    // Arcanes theme
    {
      name: "Almendra",
      cssVariable: "--font-almendra",
      provider: fontProviders.google(),
      weights: [700],
      styles: ["normal"],
      fallbacks: ["serif"],
    },
    {
      name: "Almendra SC",
      cssVariable: "--font-almendra-sc",
      provider: fontProviders.google(),
      weights: [400],
      styles: ["normal"],
      fallbacks: ["serif"],
    },
    {
      name: "Alegreya Sans",
      cssVariable: "--font-alegreya-sans",
      provider: fontProviders.google(),
      weights: [400, 500, 700],
      styles: ["normal", "italic"],
      fallbacks: ["sans-serif"],
    },
  ],
});
