/** Total minutes of an ISO 8601 duration such as `PT1H30M`. */
export function minutes(iso: string): number {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?$/.exec(iso);
  if (!m) throw new Error(`Invalid duration: ${iso}`);
  return Number(m[1] ?? 0) * 60 + Number(m[2] ?? 0);
}

/** `PT1H30M` → `1 h 30` (fr) or `1 h 30 min` (en); `PT12M` → `12 min`; `PT2H` → `2 h`. */
export function duration(iso: string, locale: "fr" | "en" = "fr"): string {
  const total = minutes(iso);
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h && m) return locale === "fr" ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h ${m} min`;
  return h ? `${h} h` : `${m} min`;
}

/** Normalised ISO duration for structured data (`PT1H32M`). */
export function isoDuration(iso: string): string {
  const total = minutes(iso);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `PT${h ? `${h}H` : ""}${m || !h ? `${m}M` : ""}`;
}

const ROMAN: Array<[number, string]> = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function roman(n: number): string {
  let out = "";
  let rest = n;
  for (const [value, glyph] of ROMAN) {
    while (rest >= value) {
      out += glyph;
      rest -= value;
    }
  }
  return out;
}

export interface IngredientGroup {
  group: string | null;
  items: string[];
}

/** Plain strings that follow each other share one unnamed group. */
export function ingredientGroups(
  list: ReadonlyArray<string | { group: string; items: string[] }>,
): IngredientGroup[] {
  const out: IngredientGroup[] = [];
  for (const entry of list) {
    if (typeof entry === "string") {
      const last = out.at(-1);
      if (last && last.group === null) last.items.push(entry);
      else out.push({ group: null, items: [entry] });
    } else {
      out.push({ group: entry.group, items: [...entry.items] });
    }
  }
  return out;
}

export function flatIngredients(list: ReadonlyArray<string | { items: string[] }>): string[] {
  return list.flatMap((entry) => (typeof entry === "string" ? [entry] : entry.items));
}

const UNIT = [
  "kg|g|ml|cl|l",
  "tasses?|livres?|cuillères? à (?:soupe|café)|pincées?",
  "cups?|pounds?|lbs?|tablespoons?|tbsp|teaspoons?|tsp|pinch(?:es)?",
].join("|");
const QUANTITY = new RegExp(
  // (?!\p{L}) instead of \b, which does not treat "é" as a letter ("café")
  `^((?:\\d+\\s\\d\\/\\d|\\d+\\/\\d|\\d+(?:[.,]\\d+)?)\\s*(?:(?:${UNIT})(?!\\p{L}))?)\\s*(de |d'|of )?(.+)$`,
  "iu",
);

export interface Quantity {
  amount: string;
  /** Receipt-style abbreviation of the amount, e.g. `2 c. à s.` */
  short: string;
  /** "de " / "d'" / "of " between amount and name, kept for the full sentence */
  joiner: string;
  name: string;
}

/** `2 cuillères à soupe de rhum` → amount `2 cuillères à soupe`, joiner `de `, name `rhum`. */
export function splitQuantity(item: string): Quantity | null {
  const m = QUANTITY.exec(item);
  if (!m) return null;
  const amount = m[1].trim();
  const short = amount
    .replace(/cuillères? à soupe/i, "c. à s.")
    .replace(/cuillères? à café/i, "c. à c.")
    .replace(/tasses?/i, "tasse")
    .replace(/livres?|pounds?|lbs/i, "lb")
    .replace(/tablespoons?/i, "tbsp")
    .replace(/teaspoons?/i, "tsp")
    .replace(/cups/i, "cup")
    .replace(/pinches/i, "pinch");
  return { amount, short, joiner: m[2] ?? "", name: m[3] };
}

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/**
 * Step text to safe HTML: `*word*` becomes <em>, and temperatures and
 * durations get a `.hl` span (the Ticket theme prints them in red ink).
 */
export function stepHtml(text: string): string {
  return escapeHtml(text)
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /(\d+°[FC](?:\/\d+°[FC])?|\d+\s?(?:minutes|min\b|heures?|hours?|h\b))/g,
      '<span class="hl">$1</span>',
    );
}

/** Tarot de Marseille letter-cutters wrote U as V. */
export function marseille(title: string): string {
  return title.toUpperCase().replace(/U/g, "V");
}
