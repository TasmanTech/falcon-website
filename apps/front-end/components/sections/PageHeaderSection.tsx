import React from 'react';

interface PageHeaderSectionProps {
  title: string;
  subtitle: string;
}

export default function PageHeaderSection({ title, subtitle }: PageHeaderSectionProps) {
  return (
    <section className="w-full pt-48 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-text-blurb-ready animate-play-text">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
          {title}
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
