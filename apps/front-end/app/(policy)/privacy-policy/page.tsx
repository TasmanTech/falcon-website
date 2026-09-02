import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy and data handling practices. Learn how we protect your information and handle your data with care.',
  openGraph: {
    title: 'Privacy Policy | [Brand Name]',
    description: 'Our privacy policy and data handling practices. Learn how we protect your information and handle your data with care.',
    url: 'https://brandname.co.nz/privacy-policy',
  }
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://brandname.co.nz/privacy-policy/#webpage",
        "url": "https://brandname.co.nz/privacy-policy",
        "name": "Privacy Policy | [Brand Name]",
        "isPartOf": { "@id": "https://brandname.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brandname.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://brandname.co.nz/privacy-policy" }
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
        Privacy Policy
      </h1>
      <p className="text-lg text-brand-dark/80 max-w-2xl animate-text-blurb-ready animate-play-text">
        Details about how we protect your information and handle your data with care and security.
      </p>
    </div>
  );
}
