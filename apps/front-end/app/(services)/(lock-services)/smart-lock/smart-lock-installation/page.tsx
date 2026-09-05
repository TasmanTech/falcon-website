import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Smart Lock Installation',
  description: 'Professional smart lock installation. Ensure your smart home security is setup correctly.',
  keywords: 'smart lock installation',
  openGraph: {
    title: 'Smart Lock Installation | Falcon Access',
    description: 'Professional smart lock installation. Ensure your smart home security is setup correctly.',
    url: 'https://falconaccess.co.nz/smart-lock-installation',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock-installation/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock-installation",
        "name": "Smart Lock Installation | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Installation", "item": "https://falconaccess.co.nz/smart-lock-installation" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">Smart Lock Installation</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional smart lock installation services.</p>
      </div>
    </main>
  );
}
