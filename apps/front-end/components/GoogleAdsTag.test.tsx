import { render, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import GoogleAdsTag, { GOOGLE_ADS_ID, PHONE_CALL_CONVERSION } from './GoogleAdsTag';

/** Returns the dataLayer entries as plain arrays for easy matching. */
function commands(): unknown[][] {
  return (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>));
}

describe('GoogleAdsTag', () => {
  beforeEach(() => {
    delete window.dataLayer;
    delete window.gtag;
  });

  afterEach(cleanup);

  it('configures the Google Ads account on mount', () => {
    render(<GoogleAdsTag />);
    expect(commands()).toContainEqual(['config', GOOGLE_ADS_ID]);
  });

  it('reports a conversion when a phone link is clicked', () => {
    const { container } = render(
      <>
        <GoogleAdsTag />
        <a href="tel:+6492431404"><span>Call</span></a>
      </>,
    );
    // jsdom cannot follow tel: links, so stop the navigation after the tag has seen the click
    container.querySelector('a')!.addEventListener('click', (e) => e.preventDefault());
    container.querySelector('span')!.click();
    expect(commands()).toContainEqual(['event', 'conversion', { send_to: PHONE_CALL_CONVERSION }]);
  });

  it('ignores clicks on other links', () => {
    const { container } = render(
      <>
        <GoogleAdsTag />
        <a href="/contact">Contact</a>
      </>,
    );
    container.querySelector('a')!.addEventListener('click', (e) => e.preventDefault());
    container.querySelector('a')!.click();
    expect(commands().some((c) => c[0] === 'event')).toBe(false);
  });
});
