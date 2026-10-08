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

// Wrap each section component in a marker so the test can count how many the page renders.
const wrapSection = vi.hoisted(() => async (
  importOriginal: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>,
  testId: string
) => {
  const { default: Real } = await importOriginal();
  return {
    default: (props: Record<string, unknown>) => (
      <div data-testid={testId}><Real {...props} /></div>
    )
  };
});

vi.mock('@/components/sections/PhotoContentSection', (importOriginal) => wrapSection(importOriginal as never, 'photo-section'));
vi.mock('@/components/sections/TextContentSection', (importOriginal) => wrapSection(importOriginal as never, 'text-section'));
vi.mock('@/components/sections/CTASection', (importOriginal) => wrapSection(importOriginal as never, 'cta-section'));
vi.mock('@/components/sections/FAQSection', (importOriginal) => wrapSection(importOriginal as never, 'faq-section'));

describe('Page Component: obd2-diagnostic', () => {
  it('renders successfully', () => {
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
  });

  it('renders the h1 and key h2 headings', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: 'Mobile Auto Electrical Diagnostics Auckland' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: "What a Scan Tells You, and What It Doesn't" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: "Plain English Results You Can Act On" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: "Flat Batteries and Warning Lights" })).toBeInTheDocument();
  });

  it('uses the required section counts', () => {
    render(<Page />);
    expect(screen.getAllByTestId('photo-section').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByTestId('text-section').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByTestId('cta-section')).toHaveLength(1);
    expect(screen.getAllByTestId('faq-section')).toHaveLength(1);
  });

  it('links to at least four related pages', () => {
    const { container } = render(<Page />);
    const targets = ['/auto', '/auto/dead-battery-assistance', '/car-lockout', '/lock/lockout'];
    for (const href of targets) {
      expect(container.querySelector(`a[href="${href}"]`)).not.toBeNull();
    }
  });

  it('keeps the FAQ JSON-LD in step with the rendered FAQs', () => {
    const { container } = render(<Page />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const schema = JSON.parse(script?.innerHTML ?? '{}') as { '@graph': { '@type': string; mainEntity?: { name: string }[] }[] };
    const faqPage = schema['@graph'].find((node) => node['@type'] === 'FAQPage');
    const rendered = container.querySelectorAll('details summary');
    expect(faqPage?.mainEntity?.length).toBe(rendered.length);
    faqPage?.mainEntity?.forEach((question, index) => {
      expect(rendered[index].textContent).toContain(question.name);
    });
  });
});
