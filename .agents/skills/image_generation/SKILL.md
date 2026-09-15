---
name: Image Generation Workflow
description: Workflow and script for generating transparent webp illustrations within strict file size constraints.
---

# Image Generation Workflow

When instructed to generate new illustrative content images or hero images, use this workflow to produce highly optimized images that match the site's aesthetic seamlessly.

## Workflow Steps

1. **Generate with Brand-Light Background**: Use the `generate_image` tool. Do NOT ask for a transparent background. Instead, explicitly append this to your prompt: `Solid #FAFAFA background. Flat vector style, extremely simple and minimalist. The object must fit fully within the frame with padding, no cropping.`
2. **Setup Sharp**: Ensure `sharp` is installed in your workspace or scratch directory (`npm install sharp`).
3. **Convert & Compress Script**: Use the following Node.js script to process the generated image. It will convert it to `.webp` and heavily compress it to meet the project's strict file size constraints (<100KB). Do NOT attempt to chroma-key or remove the background.

## Processing Script (`process_image.js`)

Save this script to your scratch directory and run it via: `node process_image.js <input_path> <output_path.webp>`

```javascript
const sharp = require('sharp');

async function processImage(inputPath, outputPath) {
  try {
    const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });

    await sharp(data, {
      raw: { width: info.width, height: info.height, channels: info.channels }
    })
    .webp({ quality: 80, effort: 6 })
    .toFile(outputPath);

    console.log(`Processed successfully: ${outputPath}`);
  } catch (err) {
    console.error(err);
  }
}
processImage(process.argv[2], process.argv[3]);
```
