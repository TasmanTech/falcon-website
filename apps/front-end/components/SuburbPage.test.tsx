import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SuburbPage, { suburbMetadata } from './SuburbPage';
import { suburbs, type Suburb } from '@/lib/suburbs';
import AlbanyPage from '@/app/(locations)/locksmith/albany/page';
import TakapunaPage from '@/app/(locations)/locksmith/takapuna/page';
import HendersonPage from '@/app/(locations)/locksmith/henderson/page';
import NewLynnPage from '@/app/(locations)/locksmith/new-lynn/page';

vi.mock('next/image', () => ({
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
  default: (props: Record<string, unknown>) => <img {...props} />
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>
}));

const all: Suburb[] = Object.values(suburbs);

describe.each(all)('SuburbPage: $name', (suburb) => {
  it('renders the H1, section headings and call button', () => {
    render(<SuburbPage suburb={suburb} />);
    expect(screen.getByRole('heading', { level: 1, name: suburb.heading })).toBeInTheDocument();
    for (const name of [suburb.intro.title, suburb.commonJobs.title, suburb.local.title, suburb.nearby.title, `${suburb.name} Locksmith FAQs`]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: 'Call +64 9 243 1404' })).toHaveAttribute('href', 'tel:+6492431404');
  });

  it('links to at least three service pages and a sibling suburb', () => {
    const { container } = render(<SuburbPage suburb={suburb} />);
    const hrefs = new Set(Array.from(container.querySelectorAll('section a[href^="/"]')).map((a) => a.getAttribute('href')));
    expect([...hrefs].filter((h) => !h?.startsWith('/locksmith/')).length).toBeGreaterThanOrEqual(3);
    expect([...hrefs].some((h) => h?.startsWith('/locksmith/') && h !== suburb.path)).toBe(true);
  });

  it('shows two photos and keeps the FAQ JSON-LD in sync', () => {
    const { container } = render(<SuburbPage suburb={suburb} />);
    expect(container.querySelector(`img[src="${suburb.intro.image.src}"]`)).not.toBeNull();
    expect(container.querySelector(`img[src="${suburb.local.image.src}"]`)).not.toBeNull();
    const script = container.querySelector('script[type="application/ld+json"]');
    const schema = JSON.parse(script?.innerHTML ?? '{}') as { '@graph': { '@type': string; mainEntity?: { name: string }[]; areaServed?: { name: string }[] }[] };
    const faqPage = schema['@graph'].find((node) => node['@type'] === 'FAQPage');
    const rendered = Array.from(container.querySelectorAll('details summary')).map((s) => s.textContent?.trim());
    expect(faqPage?.mainEntity?.map((q) => q.name)).toEqual(rendered);
    const service = schema['@graph'].find((node) => node['@type'] === 'Service');
    expect(service?.areaServed?.[0].name).toBe(`${suburb.name}, Auckland`);
  });

  it('has a self-canonical and metadata within length limits', () => {
    const metadata = suburbMetadata(suburb);
    expect(metadata.alternates?.canonical).toBe(suburb.path);
    expect(suburb.metaTitle.length).toBeLessThanOrEqual(44);
    expect(suburb.metaDescription.length).toBeGreaterThanOrEqual(120);
    expect(suburb.metaDescription.length).toBeLessThanOrEqual(155);
  });
});

describe('suburb content', () => {
  it('uses unique images, titles and FAQs on every page', () => {
    const images = all.flatMap((s) => [s.intro.image.src, s.local.image.src]);
    expect(new Set(images).size).toBe(images.length);
    expect(new Set(all.map((s) => s.metaTitle)).size).toBe(all.length);
    const questions = all.flatMap((s) => s.faqs.map((f) => f.question));
    expect(new Set(questions).size).toBe(questions.length);
  });

  it('renders each route with its own suburb', () => {
    for (const [Page, name] of [[AlbanyPage, 'Albany'], [TakapunaPage, 'Takapuna'], [HendersonPage, 'Henderson'], [NewLynnPage, 'New Lynn']] as const) {
      const { unmount } = render(<Page />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(name);
      unmount();
    }
  });
});
