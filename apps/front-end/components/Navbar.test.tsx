import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

vi.mock('next/image', () => ({
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
  default: (props: Record<string, unknown>) => <img {...props} />
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>
}));

describe('Navbar Component', () => {
  it('renders logo and desktop links', () => {
    render(<Navbar />);
    expect(screen.getByAltText('Falcon Access Logo')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
  
  it('toggles mobile menu', () => {
    render(<Navbar />);
    const button = screen.getByLabelText('Toggle menu');
    fireEvent.click(button);
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
  });
});
