import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lockout Services',
  description: 'Fast and reliable lockout services by Falcon Access in New Zealand. 24/7 emergency response.',
  keywords: 'lockout, emergency locksmith',
  openGraph: {
    title: 'Lockout Services | Falcon Access',
    description: 'Fast and reliable lockout services by Falcon Access in New Zealand. 24/7 emergency response.',
    url: 'https://falconaccess.co.nz/lockout',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lockout/#webpage",
        "url": "https://falconaccess.co.nz/lockout",
        "name": "Lockout Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lockout", "item": "https://falconaccess.co.nz/lockout" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">Lockout</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional lockout services.</p>
      </div>
    </main>
  );
}
