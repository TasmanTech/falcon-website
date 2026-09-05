import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Smart Lock Repair',
  description: 'Expert smart lock repair and programming. Troubleshooting for all major smart lock brands.',
  keywords: 'smart lock repair, smart lock programming',
  openGraph: {
    title: 'Smart Lock Repair | Falcon Access',
    description: 'Expert smart lock repair and programming. Troubleshooting for all major smart lock brands.',
    url: 'https://falconaccess.co.nz/smart-lock-repair-and-programming',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock-repair-and-programming/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock-repair-and-programming",
        "name": "Smart Lock Repair | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Repair and Programming", "item": "https://falconaccess.co.nz/smart-lock-repair-and-programming" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">Smart Lock Repair and Programming</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional smart lock repair and programming services.</p>
      </div>
    </main>
  );
}
