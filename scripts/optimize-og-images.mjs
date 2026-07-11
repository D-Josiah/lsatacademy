// One-off optimizer for the oversized PNGs used as social share images.
//
// scripts/prerender.mjs points og:image at /assets/IndicatorWords.png and
// /assets/SufficientAssumption.png. The originals were multi-megabyte (5.9MB /
// 1.2MB) — over Twitter's 5MB limit and a needless download for every share-card
// scrape. Social cards render at ~1200px wide, so we cap width and recompress in
// place (filenames must stay the same — the prerender references them by name).
//
// Re-runnable: it just re-encodes whatever is on disk. Run with `node
// scripts/optimize-og-images.mjs` after replacing an OG source image.

import sharp from 'sharp';
import path from 'node:path';
import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, '..', 'public', 'assets');
const MAX_WIDTH = 1200;

const targets = ['IndicatorWords.png', 'SufficientAssumption.png'];

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function optimize(file) {
  const full = path.join(ASSETS, file);
  const before = (await stat(full)).size;

  // Read fully into a buffer first so we can safely overwrite the same path.
  const input = await sharp(full).rotate();
  const meta = await input.metadata();
  const out = await input
    .resize({ width: Math.min(MAX_WIDTH, meta.width || MAX_WIDTH), withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 80, effort: 8, palette: true })
    .toBuffer();

  await sharp(out).toFile(full);
  const after = (await stat(full)).size;
  console.log(`${file}: ${kb(before)} -> ${kb(after)}  (${meta.width}px -> ${Math.min(MAX_WIDTH, meta.width || MAX_WIDTH)}px)`);
}

for (const t of targets) {
  await optimize(t).catch((e) => {
    console.error(`Failed to optimize ${t}:`, e.message);
    process.exitCode = 1;
  });
}
