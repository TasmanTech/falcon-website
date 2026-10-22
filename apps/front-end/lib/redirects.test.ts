import { describe, it, expect } from 'vitest';
import { readdirSync } from 'fs';
import path from 'path';
import { legacyRedirects } from '@/next.config';
import sitemap from '@/app/sitemap';

/**
 * Every public URL the site has published. A page may move or go, but its URL must stay in this
 * list and either be a live page or have an entry in `legacyRedirects`. Add new pages here too.
 */
const PUBLISHED_PATHS = [
  '/',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/lock',
  '/lock/lockout',
  '/lock/lock-repair',
  '/lock/lock-change-installation',
  '/lock/rekey',
  '/smart-lock',
  '/smart-lock/smart-lock-change',
  '/smart-lock/smart-lock-installation',
  '/smart-lock/smart-lock-repair-programming',
  '/auto',
  '/auto/dead-battery-assistance',
  '/auto/obd2-diagnostic',
  '/car-lockout',
  '/locksmith/albany',
  '/locksmith/birkenhead',
  '/locksmith/blockhouse-bay',
  '/locksmith/east-tamaki',
  '/locksmith/flat-bush',
  '/locksmith/henderson',
  '/locksmith/karaka',
  '/locksmith/new-lynn',
  '/locksmith/takapuna',
  '/locksmith/titirangi',
  ...legacyRedirects.map((r) => r.source),
];

/** Walks `app/` and returns the URL of every public `page.tsx` (route groups dropped, admin skipped). */
function livePagePaths(dir = path.resolve(__dirname, '../app'), segments: string[] = []): string[] {
  const paths: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === 'page.tsx') {
      paths.push('/' + segments.filter((s) => !/^\(.*\)$/.test(s)).join('/'));
    } else if (entry.isDirectory() && !['admin', 'api', 'actions'].includes(entry.name)) {
      paths.push(...livePagePaths(path.join(dir, entry.name), [...segments, entry.name]));
    }
  }
  return paths;
}

describe('lib/redirects', () => {
  const live = new Set(livePagePaths());
  const sources = new Set(legacyRedirects.map((r) => r.source));

  it('every published URL is a live page or redirects', () => {
    const missing = PUBLISHED_PATHS.filter((p) => !live.has(p) && !sources.has(p));
    expect(missing).toEqual([]);
  });

  it('every live public page is listed as published', () => {
    const unlisted = [...live].filter((p) => !PUBLISHED_PATHS.includes(p));
    expect(unlisted).toEqual([]);
  });

  it('every redirect lands on a live page or file in one hop', () => {
    for (const { source, destination } of legacyRedirects) {
      expect(live.has(source), `${source} is a live page and would be shadowed`).toBe(false);
      expect(sources.has(destination), `${destination} redirects again`).toBe(false);
      if (destination !== '/icon.png') expect(live.has(destination), `${destination} is not a page`).toBe(true);
    }
  });

  it('has no duplicate sources', () => {
    expect(sources.size).toBe(legacyRedirects.length);
  });

  it('every sitemap URL is a live page', () => {
    const urls = sitemap().map((e) => new URL(e.url).pathname);
    expect(urls.filter((p) => !live.has(p))).toEqual([]);
  });
});
