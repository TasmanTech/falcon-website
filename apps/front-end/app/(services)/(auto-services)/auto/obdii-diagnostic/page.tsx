import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'OBDII Diagnostic',
  description: 'Professional OBDII diagnostic services for your vehicle to quickly identify and resolve error codes.',
  keywords: 'obdii diagnostic, auto repair',
  openGraph: {
    title: 'OBDII Diagnostic | Falcon Access',
    description: 'Professional OBDII diagnostic services for your vehicle to quickly identify and resolve error codes.',
    url: 'https://falconaccess.co.nz/obdii-diagnostic',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/obdii-diagnostic/#webpage",
        "url": "https://falconaccess.co.nz/obdii-diagnostic",
        "name": "OBDII Diagnostic | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "OBDII Diagnostic", "item": "https://falconaccess.co.nz/obdii-diagnostic" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">OBDII Diagnostic</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional obdii diagnostic services.</p>
      </div>
    </main>
  );
}
