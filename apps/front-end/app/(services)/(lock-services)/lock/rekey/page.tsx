import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rekey Services',
  description: 'Secure rekey services by Falcon Access. Ensure your property is safe with our professional locksmiths.',
  keywords: 'rekey, locksmith',
  openGraph: {
    title: 'Rekey Services | Falcon Access',
    description: 'Secure rekey services by Falcon Access. Ensure your property is safe with our professional locksmiths.',
    url: 'https://falconaccess.co.nz/rekey',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/rekey/#webpage",
        "url": "https://falconaccess.co.nz/rekey",
        "name": "Rekey Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Rekey", "item": "https://falconaccess.co.nz/rekey" }
        ]
      }
    ]
  };

  return (
    <main className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8 text-brand-dark">Rekey</h1>
        <p className="text-brand-dark/70 font-inter">We provide professional rekey services.</p>
      </div>
    </main>
  );
}
