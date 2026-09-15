import { Metadata } from 'next';
import Link from 'next/link';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: "Smart Lock Services",
  description: 'Expert smart lock services including professional installation, upgrades, repairs, and programming for residential and commercial properties.',
  keywords: 'Smart Locks, Smart Lock Installation, Smart Lock Repair, New Zealand',
  openGraph: {
    title: 'Smart Lock Services | Falcon Access',
    description: 'Expert smart lock services including professional installation, upgrades, repairs, and programming.',
    url: 'https://falconaccess.co.nz/smart-lock',
  }
};

export default function SmartLockServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock",
        "name": "Smart Lock Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Services", "item": "https://falconaccess.co.nz/smart-lock" }
        ]
      },
      {
        "@type": "Service",
        "name": "Smart Lock Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can you install any brand of smart lock?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We are highly experienced with a vast array of major smart lock brands and can professionally install and configure them to suit your needs."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer reprogramming services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we can help reset, repair, or reprogram your smart lock to ensure it seamlessly integrates with your access control systems."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full pt-32 pb-16 bg-brand-light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-brand-dark mb-6">Smart Lock Services</h1>
          <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
            Expert smart lock services including professional installation, upgrades, repairs, and programming for modern residential and commercial access control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Link href="/smart-lock/smart-lock-installation" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Installation</h3>
              <p className="text-brand-dark/70 text-sm">Professional installation of cutting-edge smart lock hardware for your property.</p>
            </div>
          </Link>
          <Link href="/smart-lock/smart-lock-change" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Change &amp; Upgrade</h3>
              <p className="text-brand-dark/70 text-sm">Upgrade your old mechanical locks to modern, secure smart lock systems.</p>
            </div>
          </Link>
          <Link href="/smart-lock/smart-lock-repair-programming" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Repair &amp; Programming</h3>
              <p className="text-brand-dark/70 text-sm">Specialised diagnostics, mechanical repairs, and digital reprogramming.</p>
            </div>
          </Link>
        </div>
      </div>

      <FAQSection
        title="Smart Lock FAQs"
        subtitle="Common questions about our smart lock installations and repairs."
        faqs={[
          {
            question: "Can you install any brand of smart lock?",
            answer: "We are highly experienced with a vast array of major smart lock brands and can professionally install and configure them to suit your needs."
          },
          {
            question: "Do you offer reprogramming services?",
            answer: "Yes, we can help reset, repair, or reprogram your smart lock to ensure it seamlessly integrates with your access control systems."
          }
        ]}
        theme="light"
      />
    </div>
  );
}
