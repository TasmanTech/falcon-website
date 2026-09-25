import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const logger = new Logger('Assets');

/**
 * Lists the directories that may contain the back-end `assets` folder, in priority order.
 *
 * `process.cwd()` alone is not reliable: locally the back-end runs from `apps/back-end`,
 * but the Docker image starts it from the monorepo root (`/app`). Resolving relative to
 * the entry script (`dist/main.mjs`) works no matter where the process was started.
 *
 * @returns {string[]} Candidate absolute paths to the assets directory.
 */
export function getAssetsDirCandidates(): string[] {
  const candidates: string[] = [];
  const entryScript = process.argv[1];

  if (entryScript) {
    candidates.push(path.resolve(path.dirname(entryScript), '..', 'assets'));
  }
  candidates.push(path.join(process.cwd(), 'assets'));
  candidates.push(path.join(process.cwd(), 'apps', 'back-end', 'assets'));

  return candidates;
}

/**
 * Resolves the absolute path of a branded PDF asset.
 * Logs a warning when the asset cannot be found so a missing file never silently
 * downgrades generated documents.
 *
 * @param {string} fileName - The asset file name, e.g. `invoice-badge.png`.
 * @returns {string | null} The absolute path to the asset, or null if it does not exist.
 */
export function resolveAsset(fileName: string): string | null {
  const candidates = getAssetsDirCandidates();

  for (const dir of candidates) {
    const assetPath = path.join(dir, fileName);
    if (fs.existsSync(assetPath)) {
      return assetPath;
    }
  }

  logger.warn(
    `Asset "${fileName}" not found in any of: ${candidates.join(', ')}. Falling back to default styling.`,
  );
  return null;
}
