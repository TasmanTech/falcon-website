import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our premium locksmithing company in New Zealand. We are dedicated to providing the highest quality security solutions.',
  keywords: 'About Locksmith, Master Locksmiths, Locksmith Company New Zealand, Falcon Access',
  openGraph: {
    title: 'About Us | Falcon Access',
    description: 'Learn more about our premium locksmithing company in New Zealand. We are dedicated to providing the highest quality security solutions.',
    url: 'https://falconaccess.co.nz/about',
  }
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/about/#webpage",
        "url": "https://falconaccess.co.nz/about",
        "name": "About Us | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://falconaccess.co.nz/about" }
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
        About Us
      </h1>
      <p className="text-lg text-brand-dark/80 max-w-2xl animate-text-blurb-ready animate-play-text">
        We are dedicated to providing the highest quality security solutions. With years of experience, our team guarantees professionalism and reliability.
      </p>
    </div>
  );
}
