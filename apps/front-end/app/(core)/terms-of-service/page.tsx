import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using our services. Please read our terms of service carefully before utilizing our locksmithing solutions.',
  openGraph: {
    title: 'Terms of Service | Falcon Access',
    description: 'Terms and conditions for using our services. Please read our terms of service carefully before utilizing our locksmithing solutions.',
    url: 'https://falconaccess.co.nz/terms-of-service',
  }
};

export default function TermsOfServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/terms-of-service/#webpage",
        "url": "https://falconaccess.co.nz/terms-of-service",
        "name": "Terms of Service | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://falconaccess.co.nz/terms-of-service" }
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
        Terms of Service
      </h1>
      <p className="text-lg text-brand-dark/80 max-w-2xl animate-text-blurb-ready animate-play-text">
        Please read our terms of service carefully before utilizing our premium locksmithing solutions.
      </p>
    </div>
  );
}
