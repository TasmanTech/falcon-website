import { Metadata } from 'next';
import Link from 'next/link';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';

export const metadata: Metadata = {
  title: 'Mobile Auto Locksmith Auckland',
  description: 'Reliable mobile automotive assistance in Auckland. We provide car lockouts, OBDII diagnostics, and dead battery jump starts 24/7.',
  keywords: 'Auto Services, Car Lockout, OBDII Diagnostic, Dead Battery Assistance, Auckland, web design, web development, Falcon Access',
  openGraph: {
    title: 'Mobile Auto Locksmith Auckland',
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
    <div className="w-full bg-brand-light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeaderSection
        title="Mobile Auto Locksmith Auckland"
        subtitle="Fast, reliable mobile auto locksmith services. We cover Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Link href="/car-lockout" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Car Lockout</h3>
              <p className="text-brand-dark/70 text-sm">Fast, non-destructive entry when you have locked your keys inside your vehicle or the boot.</p>
            </div>
          </Link>
          <Link href="/auto/obd2-diagnostic" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">OBDII Diagnostic</h3>
              <p className="text-brand-dark/70 text-sm">Professional diagnostic code reading to clearly identify underlying vehicle engine issues.</p>
            </div>
          </Link>
          <Link href="/auto/dead-battery-assistance" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Dead Battery Assist</h3>
              <p className="text-brand-dark/70 text-sm">Prompt, surge-protected jump-starts and battery checks to get your car running again safely.</p>
            </div>
          </Link>
        </div>
      </div>

      <PhotoContentSection
        imageSrc="/images/services/auto/auto-locksmith-services-auckland.webp"
        imageAlt="Auto lock and key repair services"
        imageTitle="Auto Locksmith Services"
        imageDescription="Professional automotive services spanning from vehicle lockouts to dead battery jump starts."
        title="Comprehensive Auto Lock and Key Services"
        content={[
          <p key="1">Your vehicle&apos;s security is essential. As part of our commercial and residential repair and maintenance services, we offer complete auto lock solutions. We handle everything from key duplication to complex ignition repairs.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Advanced Technology and Reliable Service"
        content={[
          <p key="1">We stay up-to-date with the latest automotive security trends. Whether you need a simple key cut or advanced transponder programming, our experts are equipped to assist you. Our commitment to excellence mirrors our high standards in web design and web development.</p>
        ]}
        theme="dark"
      />

      <CTASection theme="catchy" />

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
