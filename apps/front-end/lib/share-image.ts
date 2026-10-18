/**
 * The site-wide social share image (served from `app/opengraph-image.jpg`).
 * Every page that sets its own `openGraph` must include it, because Next merges metadata
 * shallowly: a page's `openGraph` replaces the layout's, images and all.
 */
export const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Trade hand tools laid out for commercial and residential repair work in Auckland",
};
