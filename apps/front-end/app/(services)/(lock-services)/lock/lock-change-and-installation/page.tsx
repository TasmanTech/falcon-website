import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lock Change & Installation',
  description: 'Professional lock change and installation services. We supply and install high-quality locks.',
  keywords: 'lock change, lock installation',
  openGraph: {
    title: 'Lock Change & Installation | Falcon Access',
    description: 'Professional lock change and installation services. We supply and install high-quality locks.',
    url: 'https://falconaccess.co.nz/lock-change-and-installation',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock-change-and-installation/#webpage",
        "url": "https://falconaccess.co.nz/lock-change-and-installation",
        "name": "Lock Change & Installation | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Change and Installation", "item": "https://falconaccess.co.nz/lock-change-and-installation" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">Lock Change and Installation</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional lock change and installation services.</p>
      </div>
    </main>
  );
}
