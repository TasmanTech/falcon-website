import { Metadata } from 'next';
import Link from 'next/link';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: "/smart-lock",
  },
  title: 'Smart Lock Installation Auckland',
  description: 'Expert smart lock services including professional installation, upgrades, repairs, and programming for residential and commercial properties.',
  keywords: 'Smart Locks, Smart Lock Installation, Smart Lock Repair, New Zealand, Falcon Access',
  openGraph: {
    title: 'Smart Lock Installation Auckland',
    description: 'Expert smart lock services including professional installation, upgrades, repairs, and programming.',
    url: "/smart-lock",
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
    <div className="w-full bg-brand-light">
      <JsonLd id="schema-smart-lock-page" schema={jsonLd} />
      <PageHeaderSection
        title="Smart Lock Installation Auckland"
        subtitle="Modernise your property access with professional smart lock services across Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Link href="/smart-lock/smart-lock-installation" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play">
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Installation</h2>
              <p className="text-brand-dark/70 text-sm">Professional installation of cutting-edge smart lock hardware for your property.</p>
            </div>
          </Link>
          <Link href="/smart-lock/smart-lock-change" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Change &amp; Upgrade</h2>
              <p className="text-brand-dark/70 text-sm">Upgrade your old mechanical locks to modern, secure smart lock systems.</p>
            </div>
          </Link>
          <Link href="/smart-lock/smart-lock-repair-programming" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Repair &amp; Programming</h2>
              <p className="text-brand-dark/70 text-sm">Specialised diagnostics, mechanical repairs, and digital reprogramming.</p>
            </div>
          </Link>
        </div>
      </div>

      <PhotoContentSection
        priority
        imageSrc="/images/services/smart-lock/fingerprint-keypad-smart-lock-auckland.webp"
        imageAlt="Black smart lock with fingerprint sensor and illuminated keypad"
        imageTitle="Smart Lock Services Auckland"
        imageDescription="Keyless smart locks with fingerprint and PIN entry, supplied and fitted across Auckland."
        title="Modern Convenience with Smart Lock Systems"
        content={[
          <p key="1">Update your property with smart security. Smart locks let you in without keys. Our team will set them up perfectly.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Seamless Integration and Support"
        content={[
          <p key="1">We connect your new smart locks to your Wi-Fi network. Our team makes sure it works smoothly.</p>
        ]}
        theme="dark"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/services/smart-lock/digital-smart-lock-lever-handle.webp"
        imageAlt="Slim black digital smart lock with an integrated lever handle"
        imageTitle="Digital Smart Locks"
        imageDescription="A slim digital smart lock with lever handle, a popular choice for Auckland front doors."
        title="Fitted, Set Up and Looked After"
        content={[
          <p key="1">This smart lock is one of our real jobs in Auckland. Our <Link href="/smart-lock/smart-lock-installation" className="font-semibold text-brand-dark underline hover:text-brand-primary transition-colors">smart lock installation</Link> covers fitting, codes and app set-up.</p>,
          <p key="2">Old lock playing up? We handle <Link href="/smart-lock/smart-lock-change" className="font-semibold text-brand-dark underline hover:text-brand-primary transition-colors">smart lock replacement</Link> and <Link href="/smart-lock/smart-lock-repair-programming" className="font-semibold text-brand-dark underline hover:text-brand-primary transition-colors">smart lock repair and programming</Link> for homes and businesses.</p>
        ]}
        ctaText="Get a Quote"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <CTASection
        theme="catchy"
        title="Thinking About a Smart Lock?"
        description="Tell us about your door and we will recommend and fit a smart lock that suits it."
        buttonText="Get a Quote"
      />

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
