import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy and data handling practices. Learn how Falcon Access protects your information and handles your data with care.',
  openGraph: {
    title: 'Privacy Policy | Falcon Access',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
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
              At Falcon Access (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services or visit our website. We comply with the New Zealand Privacy Act 2020.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect personal information from you, including information about your:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Name and contact information (email address, phone number).</li>
              <li>Location (billing address and the physical address of the property requiring maintenance).</li>
              <li>Interactions with us (service requests, communications, and billing history).</li>
            </ul>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We collect your personal information in order to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide our commercial and residential repair and maintenance services.</li>
              <li>Communicate with you regarding quotes, appointments, and service updates.</li>
              <li>Process payments and manage invoicing.</li>
              <li>Improve our website and customer service experience.</li>
            </ul>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">3. Sharing Your Information</h2>
            <p className="mb-6">
              We do not sell, trade, or rent your personal information to others. We may share your information with trusted third-party service providers (such as payment processors or accounting software) only to the extent necessary to operate our business and provide our services.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">4. Data Security</h2>
            <p className="mb-6">
              We take reasonable steps to ensure your personal information is protected against loss, unauthorized access, use, modification, or disclosure. We use secure servers and standard industry protocols to protect digital data.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">5. Your Rights</h2>
            <p className="mb-6">
              You have the right to ask for a copy of any personal information we hold about you, and to ask for it to be corrected if you think it is wrong. If you&apos;d like to ask for a copy of your information, or to have it corrected, please contact us at <strong>info@falconaccess.co.nz</strong> or call us at <a href="tel:+6492431404" className="text-brand-accent hover:underline">+64 9 243 1404</a>.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">6. Changes to this Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the &quot;Last updated&quot; date will be revised accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
