import { Metadata } from 'next';
import Link from 'next/link';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: "Auto Services",
  description: 'Reliable mobile automotive assistance in Auckland. We provide car lockouts, OBDII diagnostics, and dead battery jump starts 24/7.',
  keywords: 'Auto Services, Car Lockout, OBDII Diagnostic, Dead Battery Assistance, Auckland, New Zealand, web design',
  openGraph: {
    title: 'Auto Services | Falcon Access',
    description: 'Reliable mobile automotive assistance in Auckland. We provide car lockouts, OBDII diagnostics, and dead battery jump starts 24/7.',
    url: 'https://falconaccess.co.nz/auto',
  }
};

export default function AutoServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/auto/#webpage",
        "url": "https://falconaccess.co.nz/auto",
        "name": "Auto Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Auto Services", "item": "https://falconaccess.co.nz/auto" }
        ]
      },
      {
        "@type": "Service",
        "name": "Auto Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Mobile automotive assistance across Auckland."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you provide emergency car lockout assistance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide rapid, non-destructive car lockout assistance across Auckland to safely get you back into your vehicle."
            }
          },
          {
            "@type": "Question",
            "name": "What is an OBDII diagnostic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An OBDII diagnostic reads the error codes from your vehicle's onboard computer to quickly identify the root cause of engine or system faults, much like debugging a web design project."
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
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-brand-dark mb-6">Auto Services</h1>
          <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
            Reliable, 24/7 mobile automotive assistance designed to get you back on the road quickly across Auckland. Whether you need emergency entry, deep diagnostics, or battery jumps, we specialise in prompt solutions. Just as a web developer manages your online presence, we manage your vehicle&apos;s urgent physical needs. Call us at <a href="tel:+6492431404" className="text-brand-accent hover:underline">+64 9 243 1404</a>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Link href="/car-lockout" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Car Lockout</h3>
              <p className="text-brand-dark/70 text-sm">Fast, non-destructive entry when you have locked your keys inside your vehicle or the boot.</p>
            </div>
          </Link>
          <Link href="/auto/obdii-diagnostic" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">OBDII Diagnostic</h3>
              <p className="text-brand-dark/70 text-sm">Professional diagnostic code reading to clearly identify underlying vehicle engine issues.</p>
            </div>
          </Link>
          <Link href="/auto/dead-battery-assistance" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Dead Battery Assist</h3>
              <p className="text-brand-dark/70 text-sm">Prompt, surge-protected jump-starts and battery checks to get your car running again safely.</p>
            </div>
          </Link>
        </div>
      </div>

      <FAQSection
        title="Auto Services FAQs"
        subtitle="Common questions about our on-the-road automotive assistance programme."
        faqs={[
          {
            question: "Do you provide emergency car lockout assistance?",
            answer: "Yes, we provide rapid, non-destructive car lockout assistance across Auckland to safely get you back into your vehicle."
          },
          {
            question: "What is an OBDII diagnostic?",
            answer: "An OBDII diagnostic reads the error codes from your vehicle's onboard computer to quickly identify the root cause of engine or system faults, much like debugging a web design project."
          }
        ]}
        theme="light"
      />
    </div>
  );
}
