import React from 'react';
import fs from 'fs';
import path from 'path';
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

const source = fs.readFileSync(path.resolve(process.cwd(), 'app/(services)/(lock-services)/smart-lock/smart-lock-change/page.tsx'), 'utf8');
const countOf = (tag: string): number => source.split(`<${tag}`).length - 1;

describe('Page Component: smart-lock-change', () => {
  it('renders successfully', () => {
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
  });

  it('renders the h1 and key h2 headings', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: 'Auckland Smart Lock Change & Upgrades' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Moving From Keys to Keyless' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Will a Smart Lock Fit My Door?' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Set Up Properly, Not Just Screwed On' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Not Sure a Smart Lock Is Right for You?' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Smart Lock Upgrade FAQs' })).toBeInTheDocument();
  });

  it('links to related services in the body copy', () => {
    const { container } = render(<Page />);
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    const expected = [
      '/smart-lock',
      '/smart-lock/smart-lock-installation',
      '/smart-lock/smart-lock-repair-programming',
      '/lock/rekey',
      '/lock/lock-change-installation',
      '/lock/lockout',
    ];
    for (const href of expected) {
      expect(hrefs).toContain(href);
    }
  });

  it('has matching FAQ JSON-LD and rendered FAQs', () => {
    const { container } = render(<Page />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const schema = JSON.parse(script?.innerHTML ?? '{}') as { '@graph': { '@type': string; mainEntity?: { name: string }[] }[] };
    const faqPage = schema['@graph'].find((node) => node['@type'] === 'FAQPage');
    const rendered = Array.from(container.querySelectorAll('details summary')).map((s) => s.textContent?.trim());
    expect(faqPage?.mainEntity?.length).toBe(rendered.length);
    expect(faqPage?.mainEntity?.map((q) => q.name)).toEqual(rendered);
  });

  it('uses the required section components', () => {
    expect(countOf('PhotoContentSection')).toBeGreaterThanOrEqual(2);
    expect(countOf('TextContentSection')).toBeGreaterThanOrEqual(2);
    expect(countOf('CTASection')).toBe(1);
    expect(countOf('FAQSection')).toBe(1);
  });
});
