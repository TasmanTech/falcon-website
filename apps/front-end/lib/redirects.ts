/** A permanent (301) redirect from a retired URL to the live page that replaced it. */
export interface LegacyRedirect {
  source: string;
  destination: string;
}

/**
 * Every public URL the site has ever served, linked to or listed in the sitemap that is no
 * longer a page. Served by `redirects()` in `next.config.ts`; `lib/redirects.test.ts` checks
 * each destination is a live page. Never remove an entry: old URLs stay in search indexes,
 * bookmarks and backlinks long after the page moves.
 */
export const legacyRedirects: LegacyRedirect[] = [
  // Renamed service pages (f58160a, 76c33e5 in September 2026)
  { source: '/auto/obdii-diagnostic', destination: '/auto/obd2-diagnostic' },
  { source: '/lock/lock-change-and-installation', destination: '/lock/lock-change-installation' },
  {
    source: '/smart-lock/smart-lock-repair-and-programming',
    destination: '/smart-lock/smart-lock-repair-programming',
  },

  // Flat service URLs from the first sitemap and links, before the /lock, /smart-lock and /auto hubs
  { source: '/lockout', destination: '/lock/lockout' },
  { source: '/lock-repair', destination: '/lock/lock-repair' },
  { source: '/lock-change', destination: '/lock/lock-change-installation' },
  { source: '/lock-change-and-installation', destination: '/lock/lock-change-installation' },
  { source: '/rekey', destination: '/lock/rekey' },
  { source: '/smart-lock-change', destination: '/smart-lock/smart-lock-change' },
  { source: '/smart-lock-installation', destination: '/smart-lock/smart-lock-installation' },
  { source: '/smart-lock-repair', destination: '/smart-lock/smart-lock-repair-programming' },
  { source: '/smart-lock-repair-and-programming', destination: '/smart-lock/smart-lock-repair-programming' },
  { source: '/dead-battery-assistance', destination: '/auto/dead-battery-assistance' },
  { source: '/obdii-diagnostic', destination: '/auto/obd2-diagnostic' },
  { source: '/auto/car-lockout', destination: '/car-lockout' },

  // Early mockup pages and links (September 2026)
  { source: '/services', destination: '/' },
  { source: '/services/locksmith', destination: '/lock' },
  { source: '/careers', destination: '/about' },

  // app/favicon.ico was removed; browsers and search engines still request it
  { source: '/favicon.ico', destination: '/icon.png' },
];
