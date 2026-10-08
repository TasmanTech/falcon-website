import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

vi.mock('next/image', () => ({
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
  default: (props: Record<string, unknown>) => <img {...props} />
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>
}));

describe('Page Component: lock-change-installation', () => {
  it('renders the main headings', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: "Lock Replacement & Lock Change Auckland" })).toBeInTheDocument();
    for (const name of [
      "When to Change Your House Locks",
      "Locks We Supply and Fit",
      "Hardware Types We Install",
      "Pricing and Our 90-Day Warranty",
      "Lock Installation & Change FAQs",
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
  });

  it('links to related services in the body copy', () => {
    const { container } = render(<Page />);
    const hrefs = new Set(Array.from(container.querySelectorAll('a[href^="/"]')).map((a) => a.getAttribute('href')));
    const expected = ["/lock", "/lock/rekey", "/lock/lock-repair", "/lock/lockout", "/smart-lock/smart-lock-installation"];
    expected.forEach((href) => expect(hrefs.has(href)).toBe(true));
    const bodyLinks = Array.from(container.querySelectorAll('section p a[href^="/"], section li a[href^="/"]'))
      .map((a) => a.getAttribute('href'))
      .filter((href) => href !== '/contact');
    expect(new Set(bodyLinks).size).toBeGreaterThanOrEqual(4);
  });

  it('uses the required section mix', () => {
    const { container } = render(<Page />);
    const sections = Array.from(container.querySelectorAll('section'));
    expect(sections.filter((s) => s.querySelector('img')).length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll('section > div.max-w-4xl.animate-text-blurb-ready').length).toBeGreaterThanOrEqual(2);
    expect(sections.filter((s) => s.className.includes('md:py-32')).length).toBe(1);
    expect(sections.filter((s) => s.querySelector('details')).length).toBe(1);
  });

  it('keeps the FAQ JSON-LD in sync with the rendered FAQs', () => {
    const { container } = render(<Page />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const schema = JSON.parse(script?.innerHTML ?? '{}') as { '@graph': { '@type': string; mainEntity?: { name: string }[] }[] };
    const faqPage = schema['@graph'].find((node) => node['@type'] === 'FAQPage');
    const rendered = Array.from(container.querySelectorAll('details summary')).map((s) => s.textContent?.trim());
    expect(faqPage?.mainEntity?.length).toBe(rendered.length);
    expect(faqPage?.mainEntity?.map((q) => q.name)).toEqual(rendered);
  });
});
