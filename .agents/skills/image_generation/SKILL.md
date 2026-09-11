---
name: Image Generation Workflow
description: Workflow and script for generating transparent webp illustrations within strict file size constraints.
---

# Image Generation Workflow

When instructed to generate new illustrative content images or hero images with transparent backgrounds, follow this exact workflow to bypass AI image generator limitations (which cannot natively output transparent PNG/WebPs).

## Workflow Steps

1. **Generate with Solid Background**: Use the `generate_image` tool. Do NOT ask for a transparent background in the prompt. Instead, explicitly append this to your prompt: `Solid #FF00FF magenta background.`
2. **Setup Sharp**: Ensure `sharp` is installed in your workspace or scratch directory (`npm install sharp`).
3. **Run Chroma-Key Script**: Use the following Node.js script to process the generated image. It will strip the magenta background, convert it to `.webp`, and heavily compress it to meet the project's strict file size constraints (<100KB).

## Processing Script (`process_image.js`)

Save this script to your scratch directory and run it via: `node process_image.js <input_path> <output_path.webp>`

```javascript
const sharp = require('sharp');
const fs = require('fs');

async function processImage(inputPath, outputPath) {
  try {
    const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    
    // Background color roughly magenta (R: ~255, G: ~0, B: ~255)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      if (r > 200 && g < 100 && b > 200) {
        data[i + 3] = 0; // Make transparent
      }
    }

    await sharp(data, {
      raw: { width: info.width, height: info.height, channels: 4 }
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
