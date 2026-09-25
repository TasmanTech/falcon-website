/**
 * Generates `assets/invoice-badge.png`: the Falcon Access mark in white on a
 * brand gradient, used as the logo block at the top of invoice PDFs.
 *
 * Run from `apps/back-end`: `node scripts/generate-invoice-badge.mjs`
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.resolve(here, '../../front-end/public/falcon_access_logo.webp');
const outPath = path.resolve(here, '../assets/invoice-badge.png');

// Rendered at 3x the PDF size (200x70pt) so it stays crisp when printed
const WIDTH = 600;
const HEIGHT = 210;
const MARK_SIZE = 190;

const gradient = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#044389"/>
      <stop offset="0.65" stop-color="#5995ED"/>
      <stop offset="1" stop-color="#7CAFC4"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" rx="24" fill="url(#g)"/>
</svg>`);

// The source logo is navy on white with no alpha channel, so turn darkness into opacity
const mask = await sharp(logoPath)
  .resize(MARK_SIZE, MARK_SIZE)
  .greyscale()
  .negate()
  .linear(1.8, -40)
  .raw()
  .toBuffer();

const whiteMark = await sharp({
  create: { width: MARK_SIZE, height: MARK_SIZE, channels: 3, background: '#ffffff' },
})
  .joinChannel(mask, { raw: { width: MARK_SIZE, height: MARK_SIZE, channels: 1 } })
  .png()
  .toBuffer();

await sharp(gradient)
  .composite([{ input: whiteMark, left: 16, top: Math.round((HEIGHT - MARK_SIZE) / 2) }])
  .png()
  .toFile(outPath);

console.log(`Wrote ${outPath}`);
