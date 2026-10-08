import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { homeGalleryImages } from './gallery';

const publicDir = path.resolve(__dirname, '..', 'public');

describe('homeGalleryImages', () => {
  it('points every image at a built webp file in public/', () => {
    for (const image of homeGalleryImages) {
      expect(image.src).toMatch(/^\/images\/home\/gallery\/[a-z0-9-]+-auckland\.webp$/);
      expect(fs.existsSync(path.join(publicDir, image.src))).toBe(true);
    }
  });

  it('has unique images with alt text, a title and a description', () => {
    expect(new Set(homeGalleryImages.map((image) => image.src)).size).toBe(homeGalleryImages.length);
    for (const image of homeGalleryImages) {
      expect(image.alt.length).toBeGreaterThan(10);
      expect(image.alt.length).toBeLessThanOrEqual(125);
      expect(image.alt).not.toMatch(/^(image|photo|picture) of/i);
      expect(image.title.length).toBeLessThanOrEqual(50);
      expect(image.description.length).toBeGreaterThan(10);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
    }
  });
});
