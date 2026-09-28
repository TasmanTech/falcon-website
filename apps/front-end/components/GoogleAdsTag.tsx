"use client";

import { useEffect } from "react";

export const GOOGLE_ADS_ID = "AW-18473622820";
export const PHONE_CALL_CONVERSION = "AW-18473622820/_8fTCKnXxYUdEKS69OhE";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    // dataLayer is already declared by @next/third-parties
    gtag?: Gtag;
  }
}

/**
 * Returns the global `gtag` function, creating the standard queueing stub if gtag.js
 * has not loaded yet. Queued commands are replayed once the library loads.
 *
 * @returns {Gtag} The gtag function.
 */
function getGtag(): Gtag {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js expects the Arguments object itself, not an array
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  return window.gtag;
}

/**
 * Registers the Google Ads account with the Google tag and reports a "Phone call lead"
 * conversion whenever a visitor taps a `tel:` link anywhere on the site.
 *
 * gtag.js itself is loaded by the Google Analytics tag, which is deferred until the first
 * interaction; commands pushed before then are queued, so taps are never lost.
 *
 * @returns {null} Renders nothing.
 */
export default function GoogleAdsTag(): null {
  useEffect(() => {
    const gtag = getGtag();
    gtag("js", new Date());
    gtag("config", GOOGLE_ADS_ID);

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (!link) return;
      gtag("event", "conversion", { send_to: PHONE_CALL_CONVERSION });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
