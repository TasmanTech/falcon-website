import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Falcon Access',
  description: 'Terms and conditions for using Falcon Access services. Please read our terms of service carefully before utilizing our repair and maintenance solutions.',
  openGraph: {
    title: 'Terms of Service | Falcon Access',
    description: 'Terms and conditions for using Falcon Access services. Please read our terms of service carefully before utilizing our repair and maintenance solutions.',
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
    <div className="w-full pt-32 pb-24 bg-brand-light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
            Terms of Service
          </h1>
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto font-inter">
            Last updated: September 10, 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-brand-dark/5 p-8 md:p-12 animate-text-blurb-ready animate-play-text" style={{ animationDelay: '100ms' }}>
          <div className="prose prose-lg max-w-none font-inter text-brand-dark/80">
            <p className="mb-6">
              Welcome to Falcon Access. These Terms of Service govern your use of our website and our commercial and residential repair and maintenance services. By booking a service or using our website, you agree to these terms.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">1. Services Provided</h2>
            <p className="mb-6">
              Falcon Access provides general property maintenance, hardware repair, and specialized services including locksmithing. We commit to performing all services with reasonable care and skill. We reserve the right to decline any service request that we deem unsafe or outside the scope of our expertise.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">2. Quotes and Estimates</h2>
            <p className="mb-6">
              Any quotes provided are estimates based on the information available at the time. While we strive for accuracy, the final cost may vary if unforeseen issues arise during the performance of the service. We will communicate any significant changes in cost before proceeding with additional work.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">3. Payment Terms</h2>
            <p className="mb-6">
              Payment is due upon completion of the service unless prior arrangements have been made for commercial accounts. We accept major credit cards and bank transfers. Invoices that remain unpaid after their due date may incur late fees or be forwarded to a collection agency.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">4. Liability and Warranties</h2>
            <p className="mb-6">
              We stand behind the authenticity and quality of our work. However, our liability for any damages or losses arising from our services is limited to the cost of the services provided. We do not accept liability for pre-existing damage to your property or issues caused by normal wear and tear following our repairs.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">5. Governing Law</h2>
            <p className="mb-6">
              These Terms of Service are governed by and construed in accordance with the laws of New Zealand. Any disputes relating to these terms or our services will be subject to the exclusive jurisdiction of the courts of New Zealand.
            </p>

            <h2 className="text-2xl font-bold font-montserrat text-brand-dark mt-10 mb-4">6. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about these Terms of Service, please <Link href="/contact" className="text-brand-accent hover:underline">contact us</Link> or call us at <strong>+64 9 243 1404</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
