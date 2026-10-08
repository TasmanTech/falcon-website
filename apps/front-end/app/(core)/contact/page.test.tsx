import React from 'react';
import fs from 'fs';
import path from 'path';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

vi.mock('next/image', () => ({
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
  default: (props: { priority?: boolean; src?: string; alt?: string; [key: string]: unknown }) => {
    const imgProps = { ...props };
    delete imgProps.priority;
    return <img {...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  }
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>
}));

const source = fs.readFileSync(path.resolve(process.cwd(), 'app/(core)/contact/page.tsx'), 'utf8');
const countTag = (tag: string): number => (source.match(new RegExp(`<${tag}(?![A-Za-z])`, 'g')) ?? []).length;

/** Parses the page's JSON-LD and returns the FAQPage question count. */
const schemaFaqCount = (container: HTMLElement): number => {
  const raw = container.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}';
  const graph = (JSON.parse(raw) as { '@graph'?: { '@type': string; mainEntity?: unknown[] }[] })['@graph'] ?? [];
  return graph.find((node) => node['@type'] === 'FAQPage')?.mainEntity?.length ?? 0;
};

/** Internal hrefs in the page, excluding the page itself. */
const internalLinks = (container: HTMLElement, self: string): string[] =>
  Array.from(container.querySelectorAll('a[href^="/"]'))
    .map((a) => a.getAttribute('href') ?? '')
    .filter((href) => href !== self);

describe('Page Component: contact', () => {
  it('renders successfully', () => {
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
  });

  it('renders the h1 and key h2 headings', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: 'Get in Touch' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Contact Information' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'The Quickest Way to Reach Us' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'What We Can Help With' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'We Come to You' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Service Areas and Hours' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Locked Out Right Now?' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'What Happens Next' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Contact FAQs' })).toBeInTheDocument();
  });

  it('links to at least four other pages in the body copy', () => {
    const { container } = render(<Page />);
    const hrefs = internalLinks(container, '/contact');
    expect(new Set(hrefs).size).toBeGreaterThanOrEqual(4);
    expect(hrefs).toContain('/lock/lockout');
    expect(hrefs).toContain('/lock/rekey');
    expect(hrefs).toContain('/lock/lock-repair');
    expect(hrefs).toContain('/smart-lock/smart-lock-installation');
    expect(hrefs).toContain('/car-lockout');
  });

  it('uses at least two photo and two text sections, and exactly one CTA and one FAQ', () => {
    expect(countTag('PhotoContentSection')).toBeGreaterThanOrEqual(2);
    expect(countTag('TextContentSection')).toBeGreaterThanOrEqual(2);
    expect(countTag('CTASection')).toBe(1);
    expect(countTag('FAQSection')).toBe(1);
  });

  it('has matching FAQ JSON-LD and rendered FAQs', () => {
    const { container } = render(<Page />);
    const rendered = container.querySelectorAll('details').length;
    expect(rendered).toBeGreaterThan(0);
    expect(schemaFaqCount(container)).toBe(rendered);
  });
});
