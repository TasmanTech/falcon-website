/**
 * Generates AI images for manifest entries with Google's Gemini image API (Nano Banana Pro).
 *
 * Each entry's `reference` photo (in Content/, optional) is sent together with its `prompt`, and the
 * result is saved to Content/Generated/<output basename>.png for review. It does NOT touch
 * public/ — after reviewing, point the entry's `source` at the generated file, remove
 * `locked`, and run build_images.cjs.
 *
 * Usage (from the repo root):
 *   node .agents/skills/image_generation/generate_images.cjs              all entries with a prompt
 *   node .agents/skills/image_generation/generate_images.cjs /lock/rekey  entries whose page or output matches
 *
 * API key: AI_STUDIO_KEY or GEMINI_API_KEY from the environment, otherwise read from
 * ../global.env (one level above the repo). The key is never logged.
 */
const path = require('path');
const fs = require('fs');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const sharp = require(require.resolve('sharp', { paths: [repoRoot, path.join(repoRoot, 'apps', 'front-end')] }));

const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-3-pro-image';
const CONTENT_DIR = path.join(repoRoot, 'Content');
const OUT_DIR = path.join(CONTENT_DIR, 'Generated');
const CONCURRENCY = 3;

const STYLE =
  ' Photorealistic studio product photograph. Seamless, solid, flat #FAFAFA off-white background with only a soft contact shadow beneath the objects.' +
  ' Soft, even, diffused studio lighting, crisp sharp focus across the whole subject, true-to-life materials.' +
  ' No people, no hands, no gloves. The subject is centred and fully in frame with generous padding on every side.' +
  ' Every object appears exactly once, solid and in focus: no ghosted, duplicated, blurred or semi-transparent objects, no haze or smoke.' +
  ' No text, no logos, no brand names, no readable labels, no watermark.';

// Text goes first and the photo is framed as loose inspiration: when the photo leads, the model
// edits it instead (blurred scenes, hands left in).
const REFERENCE_NOTE =
  ' The attached photo is loose inspiration for the subject matter only. Do NOT edit, trace or reproduce it:' +
  ' ignore its scene, background, people, blur and framing entirely.';

function loadKey() {
  const fromEnv = process.env.AI_STUDIO_KEY || process.env.GEMINI_API_KEY;
  if (fromEnv) return fromEnv.trim();
  const envFile = path.join(repoRoot, '..', 'global.env');
  if (fs.existsSync(envFile)) {
    const match = fs.readFileSync(envFile, 'utf8').match(/^(?:AI_STUDIO_KEY|GEMINI_API_KEY)=(.*)$/m);
    if (match) return match[1].trim();
  }
  throw new Error('No API key: set AI_STUDIO_KEY or GEMINI_API_KEY, or add it to ../global.env');
}

async function generate(entry, key) {
  const parts = [{ text: `Create a brand-new image from scratch: ${entry.prompt}.${STYLE}${entry.reference ? REFERENCE_NOTE : ''}` }];
  if (entry.reference) {
    const refPath = path.join(CONTENT_DIR, entry.reference);
    const ref = await sharp(refPath).rotate().resize(1536, 1536, { fit: 'inside' }).jpeg({ quality: 88 }).toBuffer();
    parts.push({ inline_data: { mime_type: 'image/jpeg', data: ref.toString('base64') } });
  }
  const aspectRatio = entry.slot === 'hero' ? '16:9' : '1:1';
  const body = {
    contents: [{ parts }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio, imageSize: '2K' } },
  };

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) throw new Error(`${data.error.code} ${data.error.status}: ${data.error.message}`);

  const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData || p.inline_data);
  if (!part) throw new Error(`no image returned (finishReason: ${data.candidates?.[0]?.finishReason ?? 'unknown'})`);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, path.basename(entry.output, '.webp') + '.png');
  fs.writeFileSync(outPath, Buffer.from((part.inlineData || part.inline_data).data, 'base64'));
  return path.relative(repoRoot, outPath);
}

async function main() {
  const key = loadKey();
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
  const filter = process.argv[2];
  const queue = manifest.images.filter(
    (e) => e.prompt && (!filter || e.page.includes(filter) || e.output.includes(filter))
  );
  console.log(`Generating ${queue.length} image(s) with ${MODEL}`);

  let failed = 0;
  const worker = async () => {
    while (queue.length) {
      const entry = queue.shift();
      try {
        console.log(`ok    ${await generate(entry, key)}`);
      } catch (err) {
        failed++;
        console.log(`FAIL  ${entry.page} ${entry.slot}: ${err.message}`);
        // Billing/auth errors apply to every request, so stop instead of burning through the queue.
        if (/\b(401|402|403)\b/.test(err.message)) queue.length = 0;
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
