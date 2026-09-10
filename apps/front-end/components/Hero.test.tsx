import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  it('renders title and description', () => {
    render(<Hero title="Test Title" description="Test Desc" imageSrc="/test.jpg" imageAlt="Test Image" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Desc')).toBeInTheDocument();
  });
  it('renders CTA if provided', () => {
    render(<Hero title="A" description="B" imageSrc="/i.jpg" imageAlt="I" ctaText="Click Me" ctaLink="/go" />);
    const link = screen.getByRole('link', { name: 'Click Me' });
    expect(link).toHaveAttribute('href', '/go');
  });
});
