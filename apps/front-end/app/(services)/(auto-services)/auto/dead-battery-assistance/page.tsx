import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dead Battery Assistance',
  description: 'Quick dead battery assistance and jump starts to get you back on the road safely.',
  keywords: 'dead battery, jump start',
  openGraph: {
    title: 'Dead Battery Assistance | Falcon Access',
    description: 'Quick dead battery assistance and jump starts to get you back on the road safely.',
    url: 'https://falconaccess.co.nz/dead-battery-assistance',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/dead-battery-assistance/#webpage",
        "url": "https://falconaccess.co.nz/dead-battery-assistance",
        "name": "Dead Battery Assistance | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Dead Battery Assistance", "item": "https://falconaccess.co.nz/dead-battery-assistance" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">Dead Battery Assistance</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional dead battery assistance services.</p>
      </div>
    </main>
  );
}
