import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lock Repair',
  description: 'Expert lock repair services by Falcon Access. We fix broken or jammed locks quickly.',
  keywords: 'lock repair, broken lock',
  openGraph: {
    title: 'Lock Repair | Falcon Access',
    description: 'Expert lock repair services by Falcon Access. We fix broken or jammed locks quickly.',
    url: 'https://falconaccess.co.nz/lock-repair',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock-repair/#webpage",
        "url": "https://falconaccess.co.nz/lock-repair",
        "name": "Lock Repair | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Repair", "item": "https://falconaccess.co.nz/lock-repair" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">Lock Repair</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional lock repair services.</p>
      </div>
    </main>
  );
}
