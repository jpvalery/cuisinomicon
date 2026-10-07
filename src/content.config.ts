import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { minutes } from "./lib/format";

const duration = z.string().regex(/^PT(?:\d+H)?(?:\d+M)?$/, "ISO 8601 duration, e.g. PT1H30M");

const ingredientGroup = z.object({
  group: z.string(),
  items: z.array(z.string()).nonempty(),
});

const recettes = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/recettes" }),
  schema: z
    .object({
      title: z.string(),
      // used as meta description: keep it unique and short
      description: z.string().max(160),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.string(),
      cuisine: z.string(),
      keywords: z.array(z.string()).default([]),
      yield: z.number().int().positive(),
      prepTime: duration,
      cookTime: duration,
      totalTime: duration,
      // path inside public/, also the source for the generated theme images
      cover: z.string().startsWith("/"),
      ingredients: z.array(z.union([z.string(), ingredientGroup])).nonempty(),
      steps: z
        .array(
          z.object({
            name: z.string(),
            text: z.string().optional(),
            image: z.string().startsWith("/").optional(),
          }),
        )
        .nonempty(),
    })
    .refine((r) => minutes(r.totalTime) >= minutes(r.prepTime) + minutes(r.cookTime), {
      message: "totalTime must be at least prepTime + cookTime",
      path: ["totalTime"],
    }),
});

// English translations. The file name is the French recipe's file name; times, yield,
// dates and images come from the French file, so only text lives here.
const en = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/en",
    // the id is the file name, which pairs it with the French recipe; `slug` is the English URL
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, digits and dashes"),
    title: z.string(),
    description: z.string().max(160),
    category: z.string(),
    cuisine: z.string(),
    keywords: z.array(z.string()).default([]),
    ingredients: z.array(z.union([z.string(), ingredientGroup])).nonempty(),
    steps: z.array(z.object({ name: z.string(), text: z.string().optional() })).nonempty(),
  }),
});

export const collections = { recettes, en };
