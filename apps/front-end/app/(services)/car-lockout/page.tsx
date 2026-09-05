import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Car Lockout',
  description: 'Emergency car lockout assistance. We get you back into your vehicle safely and quickly without damage.',
  keywords: 'car lockout, auto locksmith',
  openGraph: {
    title: 'Car Lockout | Falcon Access',
    description: 'Emergency car lockout assistance. We get you back into your vehicle safely and quickly without damage.',
    url: 'https://falconaccess.co.nz/car-lockout',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/car-lockout/#webpage",
        "url": "https://falconaccess.co.nz/car-lockout",
        "name": "Car Lockout | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Car Lockout", "item": "https://falconaccess.co.nz/car-lockout" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">Car Lockout</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional car lockout services.</p>
      </div>
    </main>
  );
}
