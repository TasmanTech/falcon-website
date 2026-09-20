import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
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

describe('Page Component: (core)', () => {
  it('renders successfully', () => {
    // If it's an async component, this simple render might warn, but it usually passes structurally in JS DOM
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
  });
});
