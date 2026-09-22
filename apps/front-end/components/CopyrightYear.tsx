import { cacheLife } from "next/cache";

/**
 * Renders the current year for the copyright notice.
 * Cached so the footer can still be prerendered under Cache Components;
 * the value is refreshed daily.
 *
 * @returns {Promise<number>} The current four-digit year.
 */
export default async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
