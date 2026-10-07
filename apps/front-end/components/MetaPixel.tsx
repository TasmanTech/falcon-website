"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { whenIdleAfterLoad } from "@/lib/idle";

export const META_PIXEL_ID = "2023735691616104";
export const META_PIXEL_SRC = "https://connect.facebook.net/en_US/fbevents.js";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/**
 * Returns the global `fbq` function. On first call it creates Meta's standard queueing
 * stub, initialises the pixel and appends fbevents.js, mirroring the official snippet
 * without injecting inline script. Queued commands are replayed once the library loads.
 *
 * @returns {Fbq} The fbq function.
 */
function getFbq(): Fbq {
  if (window.fbq) return window.fbq;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = META_PIXEL_SRC;
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  return fbq;
}

/**
 * Loads the Meta (Facebook) Pixel and reports a PageView on the first load and on every
 * client-side navigation, which the stock snippet alone would miss in the App Router.
 * The first load is deferred until the page is idle; later navigations track straight away.
 *
 * @returns {React.ReactNode} A `<noscript>` tracking image for visitors without JavaScript.
 */
export default function MetaPixel(): React.ReactNode {
  const pathname = usePathname();

  useEffect(() => {
    if (window.fbq) window.fbq("track", "PageView");
    else whenIdleAfterLoad(() => getFbq()("track", "PageView"));
  }, [pathname]);

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
