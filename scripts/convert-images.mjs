// Convert every PNG/JPEG in public/ to a sibling .webp.
// Safe to re-run — already-converted files are skipped unless the source is newer.
//
// Run with: node scripts/convert-images.mjs

import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '..', 'public');

// Per-file quality overrides. Defaults to 80.
const qualityOverrides = {
  'header-logo.png': 90,
  'logo.png': 90,
  'logo-white.png': 90,
  '600-logo.png': 90,
};

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(p);
    } else {
      yield p;
    }
  }
}

async function fileSize(p) {
  try { return (await stat(p)).size; } catch { return null; }
}

async function fileMtime(p) {
  try { return (await stat(p)).mtimeMs; } catch { return null; }
}

async function main() {
  let converted = 0;
  let skipped = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for await (const src of walk(PUBLIC)) {
    const ext = path.extname(src).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') continue;

    const dst = src.replace(/\.(png|jpe?g)$/i, '.webp');
    const srcMtime = await fileMtime(src);
    const dstMtime = await fileMtime(dst);

    if (dstMtime !== null && dstMtime >= srcMtime) {
      skipped++;
      continue;
    }

    const fileName = path.basename(src);
    const quality = qualityOverrides[fileName] ?? 80;

    try {
      await sharp(src).webp({ quality }).toFile(dst);
      const before = await fileSize(src);
      const after = await fileSize(dst);
      totalBefore += before;
      totalAfter += after;
      const pct = Math.round(((before - after) / before) * 100);
      const rel = path.relative(PUBLIC, src);
      console.log(`  ${rel}: ${before} → ${after} (-${pct}%)`);
      converted++;
    } catch (err) {
      console.warn(`  failed: ${path.relative(PUBLIC, src)} — ${err.message}`);
    }
  }

  if (converted > 0) {
    const pct = Math.round(((totalBefore - totalAfter) / totalBefore) * 100);
    console.log(`\n${converted} converted, ${skipped} skipped (already up-to-date)`);
    console.log(`Total: ${totalBefore} → ${totalAfter} bytes (-${pct}%)`);
  } else {
    console.log(`Nothing to convert (${skipped} files already up-to-date)`);
  }
}

main().catch((err) => {
  console.error('convert-images failed:', err);
  process.exit(1);
});
