import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us for quotes or emergency locksmith assistance across New Zealand. We are available 24/7 for all your security needs.',
  keywords: 'Contact Locksmith, Emergency Locksmith Number, Locksmith Quotes New Zealand, [Brand Name]',
  openGraph: {
    title: 'Contact Us | [Brand Name]',
    description: 'Get in touch with us for quotes or emergency locksmith assistance across New Zealand. We are available 24/7 for all your security needs.',
    url: 'https://brandname.co.nz/contact',
  }
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://brandname.co.nz/contact/#webpage",
        "url": "https://brandname.co.nz/contact",
        "name": "Contact Us | [Brand Name]",
        "isPartOf": { "@id": "https://brandname.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brandname.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://brandname.co.nz/contact" }
        ]
      }
    ]
  };

  return (
    <div className="container mx-auto px-6 pt-32 pb-24">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark animate-text-blurb-ready animate-play-text">
        Contact Us
      </h1>
      <p className="text-lg text-brand-dark/80 max-w-2xl animate-text-blurb-ready animate-play-text">
        Reach out today for premium locksmith services, quotes, or emergency assistance across New Zealand.
      </p>
    </div>
  );
}
