// Generates the theme images from the original covers and step photos.
//
//   public/img/ticket/<slug>.png        Atkinson dither, ink on transparent (Ticket theme)
//   public/img/ticket/steps/<name>.png  same, for step photos
//   public/img/arcanes/<slug>.png       Tarot de Marseille flat colours + outline (Arcanes theme)
//   public/img/arcanes/steps/<name>.jpg greyscale, the theme tints it blue in CSS
//   public/img/schema/<slug>-{1x1,4x3,16x9}.jpg  crops for Recipe structured data
//
// Outputs are skipped when newer than their source. Sizes go to
// src/generated/images.json so pages can set width/height on every <img>.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const VERSION = 1; // bump to force a full rebuild after changing the treatments

const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const hex = (h) => [1, 3, 5].map((i) => Number.parseInt(h.slice(i, i + 2), 16));

/** Bounding box of whatever differs from the paper colour of the illustration. */
async function subjectBox(file) {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const bg = [0, 0, 0];
  for (let y = 0; y < 40; y++)
    for (let x = w - 40; x < w; x++)
      for (let c = 0; c < 3; c++) bg[c] += data[(y * w + x) * 3 + c] / 1600;
  const rows = new Array(h).fill(0);
  const cols = new Array(w).fill(0);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3;
      const d =
        Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
      if (d > 70) {
        rows[y]++;
        cols[x]++;
      }
    }
  const first = (a) => a.findIndex((v) => v > 3);
  const last = (a) => a.length - 1 - [...a].reverse().findIndex((v) => v > 3);
  let [x0, x1, y0, y1] = [first(cols), last(cols), first(rows), last(rows)];
  if (x0 < 0 || y0 < 0) return { left: 0, top: 0, width: w, height: h, imgW: w, imgH: h };
  const pad = Math.round(Math.max(x1 - x0, y1 - y0) * 0.06);
  x0 = Math.max(0, x0 - pad);
  y0 = Math.max(0, y0 - pad);
  x1 = Math.min(w - 1, x1 + pad);
  y1 = Math.min(h - 1, y1 + pad);
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1, imgW: w, imgH: h };
}

async function source(src) {
  if (!src.crop) return sharp(src.file).removeAlpha();
  return sharp(src.file).removeAlpha().extract(src.box);
}

/** Greyscale in [0, 1] with the paper pushed to white. */
async function greyNorm(src, width) {
  const { data, info } = await (await source(src))
    .resize({ width })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const hist = new Array(256).fill(0);
  for (const v of data) hist[v]++;
  const pct = (p) => {
    let acc = 0;
    for (let i = 0; i < 256; i++) {
      acc += hist[i];
      if (acc >= p * data.length) return i;
    }
    return 255;
  };
  const lo = pct(0.02);
  const hi = src.crop ? pct(0.6) : pct(0.995);
  const L = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) L[i] = clamp((data[i] - lo) / (hi - lo));
  return { L, w: info.width, h: info.height };
}

function blur(L, w, h, r) {
  const tmp = new Float32Array(L.length);
  const out = new Float32Array(L.length);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let s = 0;
      let n = 0;
      for (let k = -r; k <= r; k++) {
        const xx = x + k;
        if (xx >= 0 && xx < w) {
          s += L[y * w + xx];
          n++;
        }
      }
      tmp[y * w + x] = s / n;
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let s = 0;
      let n = 0;
      for (let k = -r; k <= r; k++) {
        const yy = y + k;
        if (yy >= 0 && yy < h) {
          s += tmp[yy * w + x];
          n++;
        }
      }
      out[y * w + x] = s / n;
    }
  return out;
}

function rgba(w, h, fill) {
  const buf = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) buf.set(fill(i), i * 4);
  return sharp(buf, { raw: { width: w, height: h, channels: 4 } });
}

// ── Ticket: Atkinson dither, 1 bit ──
async function ticket(src, out) {
  const { L, w, h } = await greyNorm(src, 240);
  const g = Float32Array.from(L, (v) => v ** 1.15);
  const ink = new Uint8Array(w * h);
  const spread = [
    [1, 0],
    [2, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [0, 2],
  ];
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const level = g[i] < 0.5 ? 0 : 1;
      ink[i] = 1 - level;
      const err = (g[i] - level) / 8;
      for (const [dx, dy] of spread) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx >= 0 && xx < w && yy < h) g[yy * w + xx] += err;
      }
    }
  const c = hex("#1c1b19");
  await rgba(w, h, (i) => (ink[i] ? [...c, 255] : [0, 0, 0, 0]))
    .png({ palette: true, colours: 2 })
    .toFile(out);
  return { width: w, height: h };
}

// ── Arcanes: flat Marseille colours, black contours ──
const PALETTE = {
  bg: null,
  black: "#1d1a17",
  red: "#c8372d",
  yellow: "#f0b92d",
  flesh: "#f3c29a",
  blue: "#3866ad",
  sky: "#8fb8d8",
  green: "#3f8a55",
};
const KEYS = Object.keys(PALETTE);

function classify(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 510;
  const s = max === min ? 0 : (max - min) / (255 - Math.abs(max + min - 255));
  let hue = 0;
  if (max !== min) {
    if (max === r) hue = ((g - b) / (max - min)) % 6;
    else if (max === g) hue = (b - r) / (max - min) + 2;
    else hue = (r - g) / (max - min) + 4;
    hue = (hue * 60 + 360) % 360;
  }
  if (l < 0.24) return "red";
  if (l > 0.86) return "bg";
  if (s < 0.18) return l > 0.62 ? "sky" : "blue";
  if (hue >= 345 || hue < 22) return l > 0.62 ? "flesh" : "red";
  if (hue < 38) return l > 0.58 ? "yellow" : "red";
  if (hue < 70) return l > 0.45 ? "yellow" : "red";
  if (hue < 170) return "green";
  if (hue < 265) return "blue";
  return l > 0.62 ? "flesh" : "red";
}

async function arcanes(src, out) {
  const W = 640;
  const { data, info } = await (await source(src))
    .resize({ width: W })
    .modulate({ saturation: 1.3 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const { L } = await greyNorm(src, W);
  const Ls = blur(L, w, h, 2);
  const Lb = blur(L, w, h, 7);
  const Lf = blur(L, w, h, 5);
  const rgb = [0, 1, 2].map((c) =>
    blur(
      Float32Array.from({ length: w * h }, (_, i) => data[i * 3 + c]),
      w,
      h,
      4,
    ),
  );
  let lab = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++)
    lab[i] = KEYS.indexOf(Lf[i] > 0.84 ? "bg" : classify(rgb[0][i], rgb[1][i], rgb[2][i]));
  // majority filter, twice, to get woodcut-flat colour fields
  const R = 3;
  for (let pass = 0; pass < 2; pass++) {
    const next = new Uint8Array(w * h);
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const count = new Array(KEYS.length).fill(0);
        for (let dy = -R; dy <= R; dy++)
          for (let dx = -R; dx <= R; dx++) {
            const xx = x + dx;
            const yy = y + dy;
            if (xx >= 0 && yy >= 0 && xx < w && yy < h) count[lab[yy * w + xx]]++;
          }
        next[y * w + x] = count.indexOf(Math.max(...count));
      }
    lab = next;
  }
  const colours = KEYS.map((k) => (PALETTE[k] ? hex(PALETTE[k]) : null));
  const black = hex(PALETTE.black);
  await rgba(w, h, (i) => {
    const x = i % w;
    const y = (i / w) | 0;
    let edge = false;
    for (let dy = -1; dy <= 1 && !edge; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx >= 0 && yy >= 0 && xx < w && yy < h && lab[yy * w + xx] !== lab[i]) {
          edge = true;
          break;
        }
      }
    const colour = colours[lab[i]];
    const contour = colour && (Ls[i] - Lb[i] < -0.05 || L[i] < 0.12);
    if (edge || contour) return [...black, 255];
    return colour ? [...colour, 255] : [0, 0, 0, 0];
  })
    .png({ palette: true, colours: 10 })
    .toFile(out);
  return { width: w, height: h };
}

async function arcanesStep(src, out) {
  const info = await sharp(src.file)
    .resize({ width: 560 })
    .greyscale()
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out);
  return { width: info.width, height: info.height };
}

/** Crop of the given aspect ratio, centred on the subject, as large as the image allows. */
async function crop(src, ratio, width, out) {
  const { box } = src;
  let h = box.imgH;
  let w = Math.round(h * ratio);
  if (w > box.imgW) {
    w = box.imgW;
    h = Math.round(w / ratio);
  }
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height / 2;
  const left = Math.round(clamp(cx - w / 2, 0, box.imgW - w));
  const top = Math.round(clamp(cy - h / 2, 0, box.imgH - h));
  const info = await sharp(src.file)
    .extract({ left, top, width: w, height: h })
    .resize({ width, height: Math.round(width / ratio) })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  return { width: info.width, height: info.height };
}

async function fresh(out, input) {
  try {
    const [o, i] = await Promise.all([fs.stat(out), fs.stat(input)]);
    return o.mtimeMs >= i.mtimeMs;
  } catch {
    return false;
  }
}

/** Reads `cover:` and step `image:` paths from the recipe frontmatter. */
async function recipes(contentDir) {
  const files = (await fs.readdir(contentDir)).filter((f) => f.endsWith(".md"));
  return Promise.all(
    files.map(async (f) => {
      const text = await fs.readFile(path.join(contentDir, f), "utf8");
      const front = text.split(/^---$/m)[1] ?? "";
      return {
        slug: f.replace(/\.md$/, ""),
        cover: /^cover:\s*(\S+)/m.exec(front)?.[1],
        steps: [...front.matchAll(/^\s+image:\s*(\S+)/gm)].map((m) => m[1]),
      };
    }),
  );
}

export async function generateImages(root, logger) {
  const pub = path.join(root, "public");
  const outDir = path.join(pub, "img");
  const manifestFile = path.join(root, "src/generated/images.json");
  let previous = {};
  try {
    previous = JSON.parse(await fs.readFile(manifestFile, "utf8"));
  } catch {}
  const stale = previous.version !== VERSION;
  const manifest = { version: VERSION, covers: {}, steps: {} };
  for (const d of ["ticket/steps", "arcanes/steps", "schema"])
    await fs.mkdir(path.join(outDir, d), { recursive: true });
  await fs.mkdir(path.dirname(manifestFile), { recursive: true });

  let made = 0;
  const job = async (out, input, run, cached) => {
    if (!stale && cached && (await fresh(out, input))) return cached;
    made++;
    return run(out);
  };

  for (const r of await recipes(path.join(root, "src/content/recettes"))) {
    if (!r.cover) throw new Error(`${r.slug}: missing cover`);
    const file = path.join(pub, r.cover);
    const box = await subjectBox(file);
    const src = { file, box, crop: true };
    const prev = previous.covers?.[r.slug] ?? {};
    const out = (p) => path.join(outDir, p);
    manifest.covers[r.slug] = {
      ticket: await job(out(`ticket/${r.slug}.png`), file, (o) => ticket(src, o), prev.ticket),
      arcanes: await job(out(`arcanes/${r.slug}.png`), file, (o) => arcanes(src, o), prev.arcanes),
      schema: {
        "1x1": await job(
          out(`schema/${r.slug}-1x1.jpg`),
          file,
          (o) => crop(src, 1, 720, o),
          prev.schema?.["1x1"],
        ),
        "4x3": await job(
          out(`schema/${r.slug}-4x3.jpg`),
          file,
          (o) => crop(src, 4 / 3, 960, o),
          prev.schema?.["4x3"],
        ),
        "16x9": await job(
          out(`schema/${r.slug}-16x9.jpg`),
          file,
          (o) => crop(src, 16 / 9, 1280, o),
          prev.schema?.["16x9"],
        ),
      },
    };
    for (const step of r.steps) {
      const name = path.basename(step).replace(/\.[^.]+$/, "");
      const stepFile = path.join(pub, step);
      const s = { file: stepFile, crop: false };
      const p = previous.steps?.[step] ?? {};
      manifest.steps[step] = {
        name,
        ticket: await job(out(`ticket/steps/${name}.png`), stepFile, (o) => ticket(s, o), p.ticket),
        arcanes: await job(
          out(`arcanes/steps/${name}.jpg`),
          stepFile,
          (o) => arcanesStep(s, o),
          p.arcanes,
        ),
      };
    }
  }
  await fs.writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);
  logger.info(made ? `generated ${made} image(s)` : "images up to date");
}

export default function images() {
  return {
    name: "cuisinomicon:images",
    hooks: {
      "astro:config:setup": async ({ config, logger }) => {
        await generateImages(fileURLToPath(config.root), logger);
      },
    },
  };
}
