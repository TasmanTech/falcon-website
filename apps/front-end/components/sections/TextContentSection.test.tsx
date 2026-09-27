import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TextContentSection from './TextContentSection';

describe('TextContentSection Component', () => {
  it('renders the heading and content', () => {
    render(<TextContentSection title="Heading" content={[<p key="1">Body copy</p>]} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Heading' })).toBeInTheDocument();
    expect(screen.getByText('Body copy')).toBeInTheDocument();
  });

  it('centres text by default', () => {
    render(<TextContentSection title="Centred" content={[]} />);
    expect(screen.getByRole('heading', { name: 'Centred' }).parentElement).toHaveClass('text-center');
  });

  it('left-aligns text when align is left', () => {
    render(<TextContentSection title="Left" content={[]} align="left" />);
    const wrapper = screen.getByRole('heading', { name: 'Left' }).parentElement;
    expect(wrapper).toHaveClass('text-left');
    expect(wrapper).not.toHaveClass('text-center');
  });
});
