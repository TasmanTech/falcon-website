import { render, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MetaPixel, { META_PIXEL_ID, META_PIXEL_SRC } from './MetaPixel';

const navigation = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('next/navigation', () => ({ usePathname: () => navigation.pathname }));

/** Returns the commands queued on the fbq stub. */
function commands(): unknown[][] {
  return (window.fbq?.queue ?? []) as unknown[][];
}

describe('MetaPixel', () => {
  beforeEach(() => {
    delete window.fbq;
    delete window._fbq;
    document.head.querySelectorAll('script').forEach((s) => s.remove());
    navigation.pathname = '/';
  });

  afterEach(cleanup);

  it('initialises the pixel and tracks a page view on mount', () => {
    render(<MetaPixel />);
    expect(commands()).toEqual([
      ['init', META_PIXEL_ID],
      ['track', 'PageView'],
    ]);
  });

  it('loads fbevents.js asynchronously via a script element', () => {
    render(<MetaPixel />);
    const scripts = document.head.querySelectorAll(`script[src="${META_PIXEL_SRC}"]`);
    expect(scripts).toHaveLength(1);
    expect((scripts[0] as HTMLScriptElement).async).toBe(true);
  });

  it('tracks another page view on client-side navigation without re-initialising', () => {
    const { rerender } = render(<MetaPixel />);
    navigation.pathname = '/services';
    rerender(<MetaPixel />);
    expect(commands().filter((c) => c[0] === 'init')).toHaveLength(1);
    expect(commands().filter((c) => c[1] === 'PageView')).toHaveLength(2);
    expect(document.head.querySelectorAll(`script[src="${META_PIXEL_SRC}"]`)).toHaveLength(1);
  });
});
