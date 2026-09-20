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
    <div className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-end gap-3">
      {isBubbleVisible && (
        <div className="bg-brand-dark text-brand-light text-sm px-4 py-2 rounded-2xl rounded-br-none shadow-md animate-card-ready animate-play">
          24/7 Emergency Lockout Service
        </div>
      )}
      <a
        href="tel:+6492431404"
        className="bg-brand-accent text-white rounded-full p-4 shadow-lg hover:bg-brand-accent/90 transition-colors flex items-center justify-center"
        aria-label="Call for Locksmith Service"
      >
        <svg
          className="w-6 h-6 animate-svg-ready animate-play-svg fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>
      </a>
    </div>
  );
}
