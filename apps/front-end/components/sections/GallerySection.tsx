'use client';

import * as React from 'react';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

interface GallerySectionProps {
  title: string;
  subtitle?: React.ReactNode;
  images: GalleryImage[];
  theme?: 'light' | 'dark' | 'accent';
}

const THEMES = {
  light: { bg: 'bg-brand-light', text: 'text-brand-dark', muted: 'text-brand-dark/80', arrowHover: 'hover:bg-brand-accent hover:text-brand-dark' },
  dark: { bg: 'bg-brand-dark', text: 'text-brand-light', muted: 'text-brand-light/80', arrowHover: 'hover:bg-brand-accent hover:text-brand-dark' },
  accent: { bg: 'bg-brand-accent', text: 'text-brand-dark', muted: 'text-brand-dark', arrowHover: 'hover:bg-brand-light hover:text-brand-dark' },
} as const;

const SWIPE_THRESHOLD = 50;

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ArrowIcon({ direction }: { direction: 'left' | 'right' }): React.JSX.Element {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

/**
 * Horizontally scrolling photo carousel with arrow controls. Selecting a photo opens it full screen in a
 * lightbox that supports arrow buttons, the keyboard (left / right / Escape) and swiping on touch screens.
 */
export default function GallerySection({
  title,
  subtitle,
  images,
  theme = 'light'
}: GallerySectionProps): React.JSX.Element {
  const { bg: bgClass, text: textClass, muted: mutedTextClass, arrowHover } = THEMES[theme];

  const headingId = React.useId();
  const trackRef = React.useRef<HTMLUListElement>(null);
  const slideButtonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const lightboxRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const touchStartX = React.useRef<number | null>(null);

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(images.length > 1);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const updateScrollState = React.useCallback((): void => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollTrack = (direction: 1 | -1): void => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = slide ? slide.offsetWidth + gap : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const showPrevious = React.useCallback((): void => {
    setOpenIndex((index) => (index === null ? null : (index - 1 + images.length) % images.length));
  }, [images.length]);

  const showNext = React.useCallback((): void => {
    setOpenIndex((index) => (index === null ? null : (index + 1) % images.length));
  }, [images.length]);

  const closeLightbox = React.useCallback((): void => {
    setOpenIndex(null);
  }, []);

  const isOpen = openIndex !== null;
  const openedFromIndex = React.useRef<number | null>(null);
  const openLightbox = (index: number): void => {
    openedFromIndex.current = index;
    setOpenIndex(index);
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const slideButtons = slideButtonRefs.current;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        showPrevious();
      } else if (event.key === 'ArrowRight') {
        showNext();
      } else if (event.key === 'Tab' && lightboxRef.current) {
        // Keep keyboard focus inside the lightbox while it is open
        const focusable = Array.from(lightboxRef.current.querySelectorAll<HTMLElement>('button'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      // Return focus to the photo that opened the lightbox
      if (openedFromIndex.current !== null) {
        slideButtons[openedFromIndex.current]?.focus();
      }
    };
  }, [isOpen, closeLightbox, showPrevious, showNext]);

  const handleTouchStart = (event: React.TouchEvent): void => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent): void => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX > SWIPE_THRESHOLD) showPrevious();
    if (deltaX < -SWIPE_THRESHOLD) showNext();
  };

  const arrowClass = `absolute top-[42%] -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-brand-dark text-brand-light border border-brand-light/20 cursor-pointer ${arrowHover} transition-colors duration-200 disabled:opacity-0 disabled:cursor-not-allowed disabled:pointer-events-none`;
  const lightboxButtonClass = 'flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-brand-light border border-white/20 cursor-pointer hover:bg-brand-accent hover:text-brand-dark transition-colors duration-200';
  const openImage = openIndex === null ? null : images[openIndex];

  return (
    <section aria-labelledby={headingId} aria-roledescription="carousel" className={`py-24 ${bgClass} ${textClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-text-blurb-ready animate-play-text">
          <h2 id={headingId} className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            {title}
          </h2>
          {subtitle && <p className={`${mutedTextClass} text-lg font-inter`}>{subtitle}</p>}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous photos"
            className={`${arrowClass} left-2 lg:-left-6`}
          >
            <ArrowIcon direction="left" />
          </button>

          <ul
            ref={trackRef}
            onScroll={updateScrollState}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, index) => (
              <li
                key={image.src}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${images.length}`}
                className="snap-start shrink-0 w-[88%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                  <button
                    type="button"
                    ref={(element) => { slideButtonRefs.current[index] = element; }}
                    onClick={() => openLightbox(index)}
                    aria-label={`Enlarge photo: ${image.title}`}
                    className="group relative block w-full aspect-3/4 rounded-2xl overflow-hidden bg-gray-200 cursor-pointer focus-visible:outline-4 focus-visible:outline-brand-accent"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      title={image.title}
                      fill
                      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-brand-dark/80 text-brand-light opacity-90 group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors" aria-hidden="true">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                      </svg>
                    </span>
                  </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => scrollTrack(1)}
            disabled={!canScrollNext}
            aria-label="Next photos"
            className={`${arrowClass} right-2 lg:-right-6`}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      {openImage && openIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${openImage.title}, photo ${openIndex + 1} of ${images.length}`}
          className="fixed inset-0 z-100 flex flex-col bg-black text-brand-light"
          onClick={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between gap-4 px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-2">
            <p className="font-inter text-sm text-brand-light/80" aria-live="polite">
              {openIndex + 1} / {images.length}
            </p>
            <button ref={closeButtonRef} type="button" onClick={closeLightbox} aria-label="Close enlarged photo" className={lightboxButtonClass}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            className="relative flex flex-1 min-h-0 items-center justify-center px-2 sm:px-20"
            onClick={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}
          >
            <Image
              key={openImage.src}
              src={openImage.src}
              alt={openImage.alt}
              title={openImage.title}
              width={openImage.width}
              height={openImage.height}
              sizes="(max-width: 768px) 100vw, 80vw"
              loading="eager"
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg"
            />
            <button type="button" onClick={showPrevious} aria-label="Previous photo" className={`${lightboxButtonClass} absolute left-2 sm:left-4 top-1/2 -translate-y-1/2`}>
              <ArrowIcon direction="left" />
            </button>
            <button type="button" onClick={showNext} aria-label="Next photo" className={`${lightboxButtonClass} absolute right-2 sm:right-4 top-1/2 -translate-y-1/2`}>
              <ArrowIcon direction="right" />
            </button>
          </div>

          <div className="pb-[calc(1rem+env(safe-area-inset-bottom))]" aria-hidden="true" />
        </div>
      )}
    </section>
  );
}
