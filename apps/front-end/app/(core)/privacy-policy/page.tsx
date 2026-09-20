import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: '/privacy-policy',
  },
  title: 'Website Privacy Policy',
  description: 'Our privacy policy and data handling practices. Learn how Falcon Access protects your information and handles your data with care.',
  openGraph: {
    title: 'Website Privacy Policy | Falcon Access',
    description: 'Our privacy policy and data handling practices. Learn how Falcon Access protects your information and handles your data with care.',
    url: 'https://falconaccess.co.nz/privacy-policy',
  }
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/privacy-policy/#webpage",
        "url": "https://falconaccess.co.nz/privacy-policy",
        "name": "Privacy Policy | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://falconaccess.co.nz/privacy-policy" }
        ]
      }
    ]
  };

  return (
    <div className="w-full pt-32 pb-24 bg-brand-light">
      <JsonLd id="schema-privacy-policy-page" schema={jsonLd} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
            Privacy Policy
          </h1>
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto font-inter">
            Last updated: September 10, 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-brand-dark/5 p-8 md:p-12 animate-text-blurb-ready animate-play-text" style={{ animationDelay: '100ms' }}>
          <div className="prose prose-lg max-w-none font-inter text-brand-dark/80">
            <p className="mb-6">
              At Falcon Access, we protect your privacy. This policy explains how we collect, use, and protect your data. We comply with the New Zealand Privacy Act 2020.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect your data, such as:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Name, email address, and phone number.</li>
              <li>Your billing address and the address of the property.</li>
              <li>Your past service requests and billing history.</li>
            </ul>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We collect your data to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>To give you our repair and maintenance services.</li>
              <li>To talk to you about quotes and appointments.</li>
              <li>To process payments and manage bills.</li>
              <li>To improve our website and customer service.</li>
            </ul>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">3. Sharing Your Information</h2>
              We do not sell or trade your personal data. We may share your data with trusted partners to run our business.

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">4. Data Security</h2>
              We take steps to ensure your data is safe. We protect it against loss or bad access. We use secure servers.

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">5. Your Rights</h2>
              You have the right to ask for a copy of your data. You can ask us to fix it if it is wrong. If you want to do this, please contact us at <a href="mailto:info@falconaccess.co.nz" className="font-bold text-brand-accent hover:underline">info@falconaccess.co.nz</a> or call us at <a href="tel:+6492431404" className="text-brand-accent hover:underline">+64 9 243 1404</a>.

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">6. Changes to this Policy</h2>
              We may update this Privacy Policy from time to time. Changes will be posted on this page.
          </div>
        </div>
      </div>
    </div>
  );
}
