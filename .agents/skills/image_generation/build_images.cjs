/**
 * Builds every hero and content image listed in manifest.json.
 *
 * Usage (from the repo root):
 *   node .agents/skills/image_generation/build_images.cjs            build all
 *   node .agents/skills/image_generation/build_images.cjs car-lockout  build entries whose page or output matches
 *
 * Content images: 1024x1024 webp, < 100KB. Hero images: 1600x900 webp, < 175KB.
 * Gallery images: keep their aspect ratio, longest edge <= 1600 (never upscaled), < 160KB.
 * A .webp source already at the target size and budget is copied byte-for-byte (no re-encode).
 * Otherwise quality steps down from 82 until the file fits its budget.
 * Encoded files carry the entry's title, alt and description as EXIF and XMP; all other source
 * metadata (GPS, camera, timestamps) is stripped.
 */
const path = require('path');
const fs = require('fs');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const sharp = require(require.resolve('sharp', { paths: [repoRoot, path.join(repoRoot, 'apps', 'front-end')] }));

const CONTENT_DIR = path.join(repoRoot, 'Content');
const PUBLIC_DIR = path.join(repoRoot, 'apps', 'front-end', 'public');

const SIZES = {
  hero: { width: 1600, height: 900, maxBytes: 175 * 1000 },
  content: { width: 1024, height: 1024, maxBytes: 99 * 1000 },
  gallery: { width: 1600, height: 1600, maxBytes: 160 * 1000, fit: 'inside' },
};

const AUTHOR = 'Falcon Access';
const SITE_URL = 'https://falconaccess.co.nz';

const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** EXIF and XMP fields that image search and asset managers read for caption, credit and licence. */
function seoMetadata(entry) {
  const rights = `© ${new Date().getFullYear()} ${AUTHOR}. All rights reserved.`;
  const xmpAlt = (value) => `<rdf:Alt><rdf:li xml:lang="x-default">${escapeXml(value)}</rdf:li></rdf:Alt>`;
  const xmp = [
    '<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
    '<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/"',
    ' xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/" xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"',
    ' xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/">',
    `<dc:title>${xmpAlt(entry.title)}</dc:title>`,
    `<dc:description>${xmpAlt(entry.description || entry.alt)}</dc:description>`,
    `<Iptc4xmpCore:AltTextAccessibility>${xmpAlt(entry.alt)}</Iptc4xmpCore:AltTextAccessibility>`,
    `<dc:creator><rdf:Seq><rdf:li>${AUTHOR}</rdf:li></rdf:Seq></dc:creator>`,
    `<dc:rights>${xmpAlt(rights)}</dc:rights>`,
    `<photoshop:Credit>${AUTHOR}</photoshop:Credit>`,
    `<photoshop:City>Auckland</photoshop:City><photoshop:Country>New Zealand</photoshop:Country>`,
    `<xmpRights:WebStatement>${SITE_URL}/terms-of-service</xmpRights:WebStatement>`,
    '</rdf:Description></rdf:RDF></x:xmpmeta>',
  ].join('');
  return {
    exif: { IFD0: { ImageDescription: entry.alt, XPTitle: entry.title, Artist: AUTHOR, Copyright: rights } },
    xmp,
  };
}

const PAGE_BG = 250; // #FAFAFA, the bg-brand-light section colour

/**
 * Gemini renders "#FAFAFA" backgrounds a touch warm/dark (e.g. #F6F5F1). Scale each channel so the
 * corner colour lands exactly on #FAFAFA and the image blends into the section with no visible edge.
 */
async function matchBackground(input) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const inset = Math.round(info.width * 0.02);
  const corners = [[inset, inset], [info.width - inset, inset], [inset, info.height - inset], [info.width - inset, info.height - inset]];
  const gains = [0, 1, 2].map((c) => {
    const values = corners.map(([x, y]) => data[(y * info.width + x) * info.channels + c]).sort((a, b) => a - b);
    const median = (values[1] + values[2]) / 2;
    return median > 200 ? PAGE_BG / median : 1; // only correct genuinely light backgrounds
  });
  return sharp(input).removeAlpha().linear(gains, [0, 0, 0]).toBuffer();
}

async function cropSource(sourcePath, crop, target) {
  const input = sourcePath.includes(`${path.sep}Generated${path.sep}`) ? await matchBackground(sourcePath) : sourcePath;
  const base = sharp(input).rotate(); // honour EXIF orientation (phone photos)
  if (target.fit === 'inside') {
    const cropped = crop && crop !== 'none' ? sharp(await extractRegion(base, crop)) : base;
    return cropped.resize(target.width, target.height, { fit: 'inside', withoutEnlargement: true });
  }
  if (crop === 'attention') {
    return base.resize(target.width, target.height, { fit: 'cover', position: sharp.strategy.attention });
  }
  return sharp(await extractRegion(base, crop)).resize(target.width, target.height, { fit: 'cover' });
}

/** Cuts a {left, top, width, height} box, given in fractions of the (rotated) source, out of `base`. */
async function extractRegion(base, crop) {
  const rotated = await base.toBuffer();
  const { width, height } = await sharp(rotated).metadata();
  const region = {
    left: Math.round(crop.left * width),
    top: Math.round(crop.top * height),
    width: Math.round(crop.width * width),
    height: Math.round(crop.height * height),
  };
  return sharp(rotated).extract(region).toBuffer();
}

async function buildImage(entry) {
  if (entry.locked) {
    console.log(`  locked      ${entry.output}`);
    return;
  }
  const target = SIZES[entry.slot] || SIZES.content;
  const sourcePath = path.join(CONTENT_DIR, entry.source);
  const outputPath = path.join(PUBLIC_DIR, entry.output);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  if (path.extname(sourcePath).toLowerCase() === '.webp') {
    const meta = await sharp(sourcePath).metadata();
    const bytes = fs.statSync(sourcePath).size;
    if (meta.width === target.width && meta.height === target.height && bytes <= target.maxBytes) {
      fs.copyFileSync(sourcePath, outputPath);
      console.log(`${(bytes / 1024).toFixed(1).padStart(6)}KB copy ${entry.output}`);
      return;
    }
  }

  const pipeline = await cropSource(sourcePath, entry.crop, target);
  const resized = await pipeline.sharpen({ sigma: 0.6 }).toBuffer();
  const { exif, xmp } = seoMetadata(entry);

  for (let quality = 82; quality >= 40; quality -= 4) {
    const webp = await sharp(resized)
      .withExif(exif)
      .withXmp(xmp)
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer();
    if (webp.length <= target.maxBytes || quality <= 40) {
      fs.writeFileSync(outputPath, webp);
      const kb = (webp.length / 1024).toFixed(1);
      const flag = webp.length > target.maxBytes ? '  OVER BUDGET' : '';
      console.log(`${kb.padStart(6)}KB q${quality}  ${entry.output}${flag}`);
      return;
    }
  }
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
  const filter = process.argv[2];
  const entries = manifest.images.filter(
    (e) => !filter || e.page.includes(filter) || e.output.includes(filter)
  );
  for (const entry of entries) {
    await buildImage(entry);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
