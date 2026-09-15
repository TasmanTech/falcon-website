import { Metadata } from 'next';
import Link from 'next/link';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: "Lock Services",
  description: 'Comprehensive lock services including emergency lockout assistance, rekeying, lock change, and professional lock repair across New Zealand.',
  keywords: 'Lock Services, Lockout, Rekey, Lock Repair, Lock Change, New Zealand',
  openGraph: {
    title: 'Lock Services | Falcon Access',
    description: 'Comprehensive lock services including emergency lockout assistance, rekeying, lock change, and professional lock repair.',
    url: 'https://falconaccess.co.nz/lock',
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
    <div className="w-full pt-32 pb-16 bg-brand-light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-brand-dark mb-6">Lock Services</h1>
          <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
            Professional lock maintenance, repair, and emergency entry services for commercial and residential properties. We prioritise your security with rapid, reliable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <Link href="/lock/lockout" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Lockout</h3>
              <p className="text-brand-dark/70 text-sm">Rapid, non-destructive entry when you are locked out of your home or business.</p>
            </div>
          </Link>
          <Link href="/lock/rekey" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Rekey</h3>
              <p className="text-brand-dark/70 text-sm">Update your existing locks to work with new keys, securing your premises efficiently.</p>
            </div>
          </Link>
          <Link href="/lock/lock-change-and-installation" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Lock Change &amp; Install</h3>
              <p className="text-brand-dark/70 text-sm">Complete replacement and installation of high-quality, durable locks.</p>
            </div>
          </Link>
          <Link href="/lock/lock-repair" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Lock Repair</h3>
              <p className="text-brand-dark/70 text-sm">Specialised repair services to restore the functionality of your faulty mechanisms.</p>
            </div>
          </Link>
        </div>
      </div>

      <FAQSection
        title="Lock Services FAQs"
        subtitle="Common questions about our traditional lock services."
        faqs={[
          {
            question: "What type of lock services do you offer?",
            answer: "We offer a full range of lock services including emergency lockout assistance, professional rekeying, full lock replacements and installations, and meticulous lock repair."
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
