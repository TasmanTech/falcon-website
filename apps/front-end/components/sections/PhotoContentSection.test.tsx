import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PhotoContentSection from './PhotoContentSection';

vi.mock('next/image', () => ({
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
  default: (props: Record<string, unknown>) => <img {...props} />
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>
}));

const baseProps = {
  imageSrc: '/images/test.webp',
  imageAlt: 'Test alt text',
  imageTitle: 'Test Title',
  imageDescription: 'Longer description for screen readers.',
  title: 'Section Heading',
  content: [<p key="1">Section copy</p>],
};

describe('PhotoContentSection Component', () => {
  it('renders the image with SEO attributes at 1024x1024', () => {
    render(<PhotoContentSection {...baseProps} photoPosition="right" />);
    const img = screen.getByAltText('Test alt text');
    expect(img).toHaveAttribute('src', '/images/test.webp');
    expect(img).toHaveAttribute('title', 'Test Title');
    expect(img).toHaveAttribute('width', '1024');
    expect(img).toHaveAttribute('height', '1024');
    expect(screen.getByText('Longer description for screen readers.')).toHaveClass('sr-only');
  });

  it('places the photo on the right with flex-row-reverse', () => {
    const { container } = render(<PhotoContentSection {...baseProps} photoPosition="right" />);
    expect(container.querySelector('[class~="md:flex-row-reverse"]')).not.toBeNull();
  });

  it('places the photo on the left with flex-row', () => {
    const { container } = render(<PhotoContentSection {...baseProps} photoPosition="left" />);
    expect(container.querySelector('[class~="md:flex-row-reverse"]')).toBeNull();
    expect(container.querySelector('[class~="md:flex-row"]')).not.toBeNull();
  });

  it('renders the CTA link when provided', () => {
    render(<PhotoContentSection {...baseProps} photoPosition="left" ctaText="Call Now" ctaHref="/contact" />);
    expect(screen.getByRole('link', { name: 'Call Now' })).toHaveAttribute('href', '/contact');
  });
});
