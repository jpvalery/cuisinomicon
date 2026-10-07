// Open Graph cards, rendered at build time: satori lays out the tree and turns text into
// paths (fonts from src/og/fonts, static TTF), sharp rasterises the SVG to PNG.
// Left half: the Ticket theme. Right half: the Arcanes theme.
import fs from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";
import { type Locale, t } from "../i18n/ui";
import { duration, marseille, roman } from "./format";
import type { Recipe } from "./recipes";

export const OG_SIZE = { width: 1200, height: 630 } as const;

const C = {
  counter: "#d5d6d2",
  steelHi: "#f4f5f4",
  steel: "#b9bcbc",
  steelLo: "#7d8183",
  paper: "#fdfdfa",
  ink: "#1c1b19",
  ink2: "#5d5b56",
  cloth: "#1b2a5e",
  card: "#f4ead5",
  line: "#1d1a17",
  red: "#c8372d",
  gold: "#f0b92d",
  sky: "#8fb8d8",
  azure: "#3866ad",
};

const root = process.cwd();
const read = (...p: string[]) => fs.readFile(path.join(root, ...p));

let fonts: Promise<Parameters<typeof satori>[1]["fonts"]> | undefined;
function loadFonts() {
  fonts ??= Promise.all([
    read("src/og/fonts/vt323-400.ttf").then((data) => ({
      name: "VT323",
      data,
      weight: 400 as const,
    })),
    read("src/og/fonts/chivo-mono-400.ttf").then((data) => ({
      name: "Chivo Mono",
      data,
      weight: 400 as const,
    })),
    read("src/og/fonts/chivo-mono-700.ttf").then((data) => ({
      name: "Chivo Mono",
      data,
      weight: 700 as const,
    })),
    read("src/og/fonts/almendra-700.ttf").then((data) => ({
      name: "Almendra",
      data,
      weight: 700 as const,
    })),
    read("src/og/fonts/alegreya-sans-400.ttf").then((data) => ({
      name: "Alegreya Sans",
      data,
      weight: 400 as const,
    })),
  ]);
  return fonts;
}

// ── a tiny element builder: satori takes React-like objects ──
type Style = Record<string, string | number>;
interface El {
  type: string;
  props: {
    style?: Style;
    src?: string;
    width?: number;
    height?: number;
    children?: Child | Child[];
  };
}
type Child = El | string;

const div = (style: Style, ...children: Child[]): El => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});
const img = (src: string, width: number, height: number, style: Style = {}): El => ({
  type: "img",
  props: { src, width, height, style },
});

const svgUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

async function pngUri(file: string, scale = 1) {
  const image = sharp(path.join(root, "public", file));
  const { width = 0, height = 0 } = await image.metadata();
  const data = await image
    .resize({ width: width * scale, kernel: "nearest" })
    .png()
    .toBuffer();
  return {
    src: `data:image/png;base64,${data.toString("base64")}`,
    width: width * scale,
    height: height * scale,
  };
}

/** Le Soleil, as on the cards: 20 rays and a disc with a red ring. */
function sun(size: number) {
  const c = size / 2;
  const rays = Array.from({ length: 20 }, (_, i) => {
    const a = (i * 18 * Math.PI) / 180;
    const w = (3.5 * Math.PI) / 180;
    const R = size / 2;
    const p = (ang: number) => `${c + R * Math.sin(ang)},${c - R * Math.cos(ang)}`;
    return `<polygon points="${c},${c} ${p(a - w)} ${p(a + w)}"/>`;
  }).join("");
  const r = size * 0.18;
  return svgUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><g fill="${C.gold}">${rays}</g><circle cx="${c}" cy="${c}" r="${r}" fill="${C.gold}" stroke="${C.line}" stroke-width="3"/><circle cx="${c}" cy="${c}" r="${r - 8}" fill="none" stroke="${C.red}" stroke-width="2"/></svg>`,
  );
}

const STAR = (x: number, y: number, s: number) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M10 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z"/>`;
const stars = svgUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="630"><g fill="${C.gold}" fill-opacity=".18">${[
    [40, 40, 1],
    [430, 90, 0.7],
    [480, 420, 1.2],
    [70, 520, 0.8],
    [250, 585, 0.6],
    [520, 250, 0.5],
    [20, 300, 0.6],
  ]
    .map(([x, y, s]) => STAR(x, y, s))
    .join("")}</g></svg>`,
);
const lattice = svgUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="800"><defs><pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M14 0L28 14 14 28 0 14z" fill="none" stroke="${C.gold}" stroke-width="1.6"/><circle cx="14" cy="14" r="2.4" fill="${C.red}"/></pattern></defs><rect width="400" height="800" fill="url(#p)"/></svg>`,
);
const pentagram = svgUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 6 47 52 8 23.5h48L17 52z" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></svg>`,
);

const dashed = div({ borderTop: `3px dashed ${C.ink}`, margin: "16px 0" });

const rail = div({
  position: "absolute",
  top: 26,
  left: 0,
  width: 660,
  height: 20,
  backgroundImage: `linear-gradient(${C.steelHi}, ${C.steel} 45%, ${C.steelLo})`,
  boxShadow: "0 4px 6px rgba(0,0,0,0.22)",
});

function receipt(...children: Child[]) {
  return div(
    {
      position: "absolute",
      top: 36,
      left: 64,
      width: 532,
      minHeight: 700,
      flexDirection: "column",
      backgroundColor: C.paper,
      padding: "34px 26px",
      transform: "rotate(-1.5deg)",
      boxShadow: "0 14px 26px rgba(0,0,0,0.28)",
      fontFamily: "Chivo Mono",
      fontSize: 22,
      color: C.ink,
    },
    ...children,
  );
}

// satori lays out plain strings badly next to siblings: give each text its own box
const box = (c: Child) => (typeof c === "string" ? div({}, c) : c);
const row = (left: Child, right: Child, style: Style = {}) =>
  div({ justifyContent: "space-between", ...style }, box(left), box(right));

async function cardFace(recipe: Recipe, height: number) {
  const width = Math.round((height * 6) / 11);
  const art = await pngUri(`/img/arcanes/${recipe.key}.png`);
  const artW = width - 56;
  const banner = marseille(recipe.data.title);
  return div(
    {
      width,
      height,
      padding: 9,
      backgroundColor: C.card,
      border: `3px solid ${C.line}`,
      borderRadius: 12,
      boxShadow: "0 18px 30px rgba(0,0,0,0.45)",
    },
    div(
      { flexDirection: "column", flexGrow: 1, border: `2px solid ${C.line}` },
      div(
        {
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderBottom: `2px solid ${C.line}`,
          fontFamily: "Almendra",
          fontSize: 32,
        },
        roman(recipe.n),
      ),
      div(
        {
          position: "relative",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 26,
          overflow: "hidden",
        },
        div({
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          backgroundColor: C.sky,
          borderBottom: `2px solid ${C.line}`,
        }),
        img(sun(200), 200, 200, { position: "absolute", top: 12, left: (width - 24 - 200) / 2 }),
        img(art.src, artW, Math.round((art.height * artW) / art.width)),
      ),
      div(
        {
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderTop: `2px solid ${C.line}`,
          fontFamily: "Almendra",
          fontSize: banner.length > 15 ? 21 : 26,
          lineHeight: 1.05,
          padding: "0 10px",
          letterSpacing: 1,
        },
        banner,
      ),
    ),
  );
}

const cardBack = (height: number) => {
  const width = Math.round((height * 6) / 11);
  return div(
    {
      width,
      height,
      padding: 9,
      backgroundColor: C.card,
      border: `3px solid ${C.line}`,
      borderRadius: 12,
      boxShadow: "0 18px 30px rgba(0,0,0,0.45)",
    },
    div(
      {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        border: `2px solid ${C.line}`,
        position: "relative",
        backgroundColor: C.azure,
      },
      img(lattice, width - 28, height - 28, { position: "absolute", top: 0, left: 0 }),
      div({
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: C.gold,
        border: `3px solid ${C.line}`,
      }),
    ),
  );
};

function frame(left: El[], right: El[]) {
  return div(
    {
      width: OG_SIZE.width,
      height: OG_SIZE.height,
      backgroundColor: C.counter,
      position: "relative",
    },
    div(
      { position: "absolute", top: 0, left: 0, width: 660, height: 630, overflow: "hidden" },
      ...left,
    ),
    div(
      {
        position: "absolute",
        top: 0,
        left: 640,
        width: 560,
        height: 630,
        backgroundColor: C.cloth,
        justifyContent: "center",
        alignItems: "center",
      },
      img(stars, 560, 630, { position: "absolute", top: 0, left: 0 }),
      ...right,
    ),
  );
}

async function render(tree: El) {
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    ...OG_SIZE,
    fonts: await loadFonts(),
  });
  return sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette: true, colours: 128 })
    .toBuffer();
}

const z = (n: number) => String(n).padStart(2, "0");

export async function recipeCard(recipe: Recipe) {
  const { data, locale } = recipe;
  const s = t(locale);
  const d = data.published;
  const dither = await pngUri(`/img/ticket/${recipe.key}.png`, 2);
  const title = data.title.toUpperCase();
  const titleSize = title.length > 18 ? 76 : 96;
  const left = [
    receipt(
      row(
        div(
          { fontWeight: 700 },
          `${s.ticket.number.toUpperCase()} ${String(recipe.n).padStart(3, "0")}`,
        ),
        `${z(d.getUTCDate())}.${z(d.getUTCMonth() + 1)}.${String(d.getUTCFullYear()).slice(2)}`,
      ),
      row(`${s.ticket.table} ${data.category}`, `× ${data.yield}`),
      dashed,
      div({ fontFamily: "VT323", fontSize: titleSize, lineHeight: 0.82 }, title),
      dashed,
      row(
        `${s.recipe.total} ${duration(data.totalTime, locale)}`,
        `${s.recipe.cook} ${duration(data.cookTime, locale)}`,
        {
          fontWeight: 700,
        },
      ),
      div(
        { justifyContent: "center", marginTop: 18 },
        img(dither.src, dither.width, dither.height),
      ),
    ),
    rail,
  ];
  const right = [div({ transform: "rotate(4deg)" }, await cardFace(recipe, 540))];
  return render(frame(left, right));
}

export async function homeCard(recipes: Recipe[], locale: Locale) {
  const s = t(locale);
  const left = [
    receipt(
      div(
        { alignItems: "center", justifyContent: "center", gap: 14 },
        div({ fontFamily: "VT323", fontSize: 92, lineHeight: 0.8 }, "CUISINOMICON"),
        img(pentagram, 44, 44),
      ),
      div({ justifyContent: "center", color: C.ink2, marginTop: 8 }, s.ticket.house),
      dashed,
      ...recipes.map((r) =>
        row(
          div({ maxWidth: 360, overflow: "hidden" }, r.data.title.toUpperCase()),
          div({ fontWeight: 700 }, duration(r.data.totalTime, locale)),
          { marginBottom: 6 },
        ),
      ),
      dashed,
      row(
        div({ fontFamily: "VT323", fontSize: 56, lineHeight: 0.9 }, "TOTAL"),
        div(
          { fontFamily: "VT323", fontSize: 56, lineHeight: 0.9 },
          s.ticket.totalRecipes(recipes.length).toUpperCase(),
        ),
      ),
    ),
    rail,
  ];
  const right = [
    div({ position: "absolute", top: 70, left: 70, transform: "rotate(-8deg)" }, cardBack(480)),
    div(
      { position: "absolute", top: 50, left: 230, transform: "rotate(5deg)" },
      await cardFace(recipes[0], 520),
    ),
  ];
  return render(frame(left, right));
}
