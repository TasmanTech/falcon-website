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
    canonical: "/lock",
  },
  title: 'Auckland Locksmith & Hardware Services',
  description: 'Comprehensive lock services including emergency lockout assistance, rekeying, lock change, and professional lock repair across New Zealand.',
  keywords: 'Lock Services, Locksmith Services, Locksmith Near Me, General Locksmith, Locksmith for Business, Lock Service Near Me, Lockout, Rekey, Lock Repair, Lock Change, Lock Replacement, Lock Installation, New Zealand, web design, web development, Falcon Access',
  openGraph: {
    title: 'Auckland Locksmith & Hardware Services',
    description: 'Comprehensive lock services including emergency lockout assistance, rekeying, lock change, and professional lock repair.',
    url: "/lock",
  }
};

export default function LockServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock/#webpage",
        "url": "https://falconaccess.co.nz/lock",
        "name": "Lock Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" }
        ]
      },
      {
        "@type": "Service",
        "name": "Lock Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What type of lock services do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer a full range of lock services including emergency lockout assistance, professional rekeying, full lock replacements and installations, and meticulous lock repair."
            }
          },
          {
            "@type": "Question",
            "name": "Are you a locksmith for business?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We are a locksmith for business as well as homes. We look after shop locks, office doors, and master key systems. We also offer a fast commercial lockout service."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide emergency lockout assistance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we treat lockouts as high-priority emergencies and aim for rapid deployment to get you safely back inside using non-destructive methods whenever possible."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full bg-brand-light">
      <JsonLd id="schema-lock-page" schema={jsonLd} />
      <PageHeaderSection 
        title="Auckland Locksmith & Hardware Services"
        subtitle="Professional hardware and lock services. We proudly cover Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <Link href="/lock/lockout" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play">
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Lockout</h2>
              <p className="text-brand-dark/70 text-sm">Fast, non-destructive door unlocking when you are locked out of your home or business.</p>
            </div>
          </Link>
          <Link href="/lock/rekey" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Rekey</h2>
              <p className="text-brand-dark/70 text-sm">A lock rekey makes your old locks work with new keys. Old keys stop working.</p>
            </div>
          </Link>
          <Link href="/lock/lock-change-installation" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Lock Change &amp; Install</h2>
              <p className="text-brand-dark/70 text-sm">Lock replacement and lock installation with strong, lasting hardware.</p>
            </div>
          </Link>
          <Link href="/lock/lock-repair" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '300ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Lock Repair</h2>
              <p className="text-brand-dark/70 text-sm">Door lock repair for stiff, stuck, or broken locks.</p>
            </div>
          </Link>
        </div>
      </div>

      <PhotoContentSection
        imageSrc="/images/services/lock/residential-commercial-locksmith-auckland.webp"
        imageAlt="Professional lock installation and repair"
        imageTitle="Locksmith Services Auckland"
        imageDescription="Full-service residential and commercial lock installation, repair, and emergency unlocking."
        title="Secure Your Property with Expert Lock Services"
        content={[
          <p key="1">Good security starts with strong locks. Our locksmith services cover homes and shops. We keep your place safe and secure.</p>,
          <p key="2">Need a locksmith near you? Our vans cover all of Auckland. We are on call 24 hours a day for lockouts.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Tailored Security for Every Need"
        content={[
          <p key="1">Each home and shop is different. We look at what you need. We suggest the best locks. We give complete help, much like our custom web design.</p>
        ]}
        theme="dark"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Lock Services FAQs"
        subtitle="Common questions about our traditional lock services."
        faqs={[
          {
            question: "What type of lock services do you offer?",
            answer: "We offer a full range of lock services including emergency lockout assistance, professional rekeying, full lock replacements and installations, and meticulous lock repair."
          },
          {
            question: "Are you a locksmith for business?",
            answer: "Yes. We are a locksmith for business as well as homes. We look after shop locks, office doors, and master key systems. We also offer a fast commercial lockout service."
          },
          {
            question: "Do you provide emergency lockout assistance?",
            answer: "Yes, we treat lockouts as high-priority emergencies and aim for rapid deployment to get you safely back inside using non-destructive methods whenever possible."
          }
        ]}
        theme="light"
      />
    </div>
  );
}
