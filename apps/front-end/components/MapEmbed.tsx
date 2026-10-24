"use client";

import { useState } from 'react';

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d502960.8997659807!2d174.7265725!3d-36.8328344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874f32ad50f5c01f%3A0x49f4f78f3c6c5268!2sFalcon%20Access%20Locksmith!5e1!3m2!1sen!2snz!4v1792813536331!5m2!1sen!2snz";

/**
 * Google Maps embed behind a click-to-load facade. The embed pulls in several
 * hundred KB of third-party script, so it only loads once the visitor asks for it.
 */
export default function MapEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        src={MAP_SRC}
        width="200"
        height="200"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        title="Falcon Access Locksmith Location Map"
      ></iframe>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      className="w-50 h-50 flex flex-col items-center justify-center gap-2 bg-brand-light/10 hover:bg-brand-light/20 text-brand-light/80 hover:text-brand-accent transition-colors cursor-pointer font-inter text-sm"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Show map
    </button>
  );
}
