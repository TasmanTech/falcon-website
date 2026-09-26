"use client";

import React, { useState, useEffect } from 'react';

export default function FloatingCTA() {
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);

  useEffect(() => {
    // Hide the chat bubble after 6 seconds to ensure it's not permanent
    const timer = setTimeout(() => {
      setIsBubbleVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="tel:+6492431404"
      className="group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 md:hidden flex flex-col items-end gap-3"
      aria-label="Call for Locksmith Service"
    >
      {isBubbleVisible && (
        <span className="bg-brand-dark text-brand-light text-sm font-semibold px-4 py-2 rounded-2xl rounded-br-none shadow-lg animate-card-ready animate-play">
          24/7 Emergency Lockout Service
        </span>
      )}
      <span className="relative flex items-center">
        {/* Periodic pulse ring to draw the eye; disabled for users who prefer reduced motion */}
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-brand-accent motion-safe:animate-cta-pulse" />
        <span className="relative flex items-center gap-3 bg-brand-accent text-brand-dark rounded-full pl-2 pr-5 py-2 shadow-xl ring-2 ring-white/80 transition-transform group-active:scale-95">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-dark text-white">
            <svg
              className="w-5 h-5 animate-svg-ready animate-play-svg fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-montserrat font-black text-base uppercase tracking-wide">Call Now</span>
            <span className="text-xs font-semibold">+64 9 243 1404</span>
          </span>
        </span>
      </span>
    </a>
  );
}
