import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GallerySection, { GalleryImage } from './GallerySection';

vi.mock('next/image', () => ({
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
  default: (props: Record<string, unknown>) => {
    const imgProps = { ...props };
    delete imgProps.fill;
    return <img {...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  }
}));

const images: GalleryImage[] = [
  { src: '/images/one.webp', alt: 'First alt', title: 'First Title', description: 'First description.', width: 1200, height: 1600 },
  { src: '/images/two.webp', alt: 'Second alt', title: 'Second Title', description: 'Second description.', width: 1200, height: 1600 },
  { src: '/images/three.webp', alt: 'Third alt', title: 'Third Title', description: 'Third description.', width: 800, height: 600 },
];

const renderGallery = () => render(<GallerySection title="Our Work" subtitle="Recent jobs." images={images} />);

describe('GallerySection Component', () => {
  it('renders the heading, subtitle and every slide with SEO attributes', () => {
    renderGallery();
    expect(screen.getByRole('heading', { level: 2, name: 'Our Work' })).toBeInTheDocument();
    expect(screen.getByText('Recent jobs.')).toBeInTheDocument();
    const slides = screen.getAllByRole('listitem');
    expect(slides).toHaveLength(3);
    expect(slides[0]).toHaveAttribute('aria-label', '1 of 3');
    const img = screen.getByAltText('First alt');
    expect(img).toHaveAttribute('src', '/images/one.webp');
    expect(img).toHaveAttribute('title', 'First Title');
    expect(screen.queryByText('Second Title')).not.toBeInTheDocument();
  });

  it('has previous and next carousel arrows, with previous disabled at the start', () => {
    renderGallery();
    expect(screen.getByRole('button', { name: 'Previous photos' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next photos' })).toBeInTheDocument();
  });

  it('scrolls the track when an arrow is pressed', async () => {
    const scrollBy = vi.fn();
    Element.prototype.scrollBy = scrollBy;
    // jsdom has no layout: report a track wider than its viewport so the next arrow enables
    const scrollWidth = vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(1200);
    const clientWidth = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(400);
    renderGallery();
    const next = screen.getByRole('button', { name: 'Next photos' });
    expect(next).toBeEnabled();
    fireEvent.click(next);
    expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: expect.any(Number) }));
    scrollWidth.mockRestore();
    clientWidth.mockRestore();
  });

  it('enlarges a photo in a lightbox without a caption', async () => {
    const user = userEvent.setup();
    renderGallery();
    await user.click(screen.getByRole('button', { name: 'Enlarge photo: Second Title' }));
    const dialog = screen.getByRole('dialog', { name: 'Second Title, photo 2 of 3' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    expect(screen.queryByText('Second description.')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close enlarged photo' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('moves between photos with the lightbox arrows and wraps around', async () => {
    const user = userEvent.setup();
    renderGallery();
    await user.click(screen.getByRole('button', { name: 'Enlarge photo: Third Title' }));
    await user.click(screen.getByRole('button', { name: 'Next photo' }));
    expect(screen.getByRole('dialog', { name: 'First Title, photo 1 of 3' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Previous photo' }));
    expect(screen.getByRole('dialog', { name: 'Third Title, photo 3 of 3' })).toBeInTheDocument();
  });

  it('supports the keyboard: arrow keys navigate and Escape closes and restores focus', async () => {
    const user = userEvent.setup();
    renderGallery();
    const opener = screen.getByRole('button', { name: 'Enlarge photo: First Title' });
    await user.click(opener);
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('dialog', { name: 'Second Title, photo 2 of 3' })).toBeInTheDocument();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('dialog', { name: 'First Title, photo 1 of 3' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });

  it('changes photo on a horizontal swipe', async () => {
    const user = userEvent.setup();
    renderGallery();
    await user.click(screen.getByRole('button', { name: 'Enlarge photo: First Title' }));
    const dialog = screen.getByRole('dialog');
    fireEvent.touchStart(dialog, { touches: [{ clientX: 300 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 100 }] });
    expect(screen.getByRole('dialog', { name: 'Second Title, photo 2 of 3' })).toBeInTheDocument();
  });

  it('closes when the close button is pressed', async () => {
    const user = userEvent.setup();
    renderGallery();
    await user.click(screen.getByRole('button', { name: 'Enlarge photo: First Title' }));
    await user.click(screen.getByRole('button', { name: 'Close enlarged photo' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
