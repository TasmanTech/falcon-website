import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Smart Lock Change',
  description: 'Upgrade to a new smart lock. We offer comprehensive smart lock change services for homes and businesses.',
  keywords: 'smart lock change, smart lock',
  openGraph: {
    title: 'Smart Lock Change | Falcon Access',
    description: 'Upgrade to a new smart lock. We offer comprehensive smart lock change services for homes and businesses.',
    url: 'https://falconaccess.co.nz/smart-lock-change',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock-change/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock-change",
        "name": "Smart Lock Change | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Change", "item": "https://falconaccess.co.nz/smart-lock-change" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">Smart Lock Change</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional smart lock change services.</p>
      </div>
    </main>
  );
}
