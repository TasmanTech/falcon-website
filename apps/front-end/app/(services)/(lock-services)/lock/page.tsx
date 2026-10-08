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
  description: 'Comprehensive lock services including emergency lockout assistance, rekeying, lock change, and professional lock repair across Auckland.',
  keywords: 'Lock Services, Locksmith Services, Locksmith Near Me, General Locksmith, Locksmith for Business, Lock Service Near Me, Lockout, Rekey, Lock Repair, Lock Change, Lock Replacement, Lock Installation, New Zealand, Falcon Access',
  openGraph: {
    title: 'Auckland Locksmith & Hardware Services',
    description: 'Comprehensive lock services including emergency lockout assistance, rekeying, lock change, and professional lock repair across Auckland.',
    url: "/lock",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";
const darkLinkClass = "font-semibold text-brand-light underline hover:text-brand-accent transition-colors";

const faqs = [
  {
    question: "What type of lock services do you offer?",
    answer: "We handle lockouts, rekeying, lock repair, and lock changes and new installations for homes and businesses. We also install and repair smart locks, and help with car lockouts."
  },
  {
    question: "Are you a locksmith for business?",
    answer: "Yes. We look after shops, offices and other commercial premises as well as homes, including commercial mortice locks, turnbolts, glass door hardware and rekeying after staff changes. We also offer a fast commercial lockout service."
  },
  {
    question: "Do you provide emergency lockout assistance?",
    answer: "Yes. We treat lockouts as a priority, offer after-hours support, and use non-destructive entry first to get you back inside without damaging the door or lock."
  },
  {
    question: "How much do your lock services cost?",
    answer: "There's a flat NZ$20 call-out fee. Everything else is quoted on site and agreed with you before we start, based on the lock, the work involved and the time of day. Work outside normal hours costs a bit more."
  }
];

export default function LockServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock/#webpage",
        "url": "https://falconaccess.co.nz/lock",
        "name": "Lock Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/lock#service" }
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
        "@id": "https://falconaccess.co.nz/lock#service",
        "url": "https://falconaccess.co.nz/lock",
        "serviceType": "Locksmith services",
        "name": "Lock Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Lockouts, rekeying, lock repair, and lock change and installation for homes and businesses across Auckland.",
        "areaServed": { "@type": "City", "name": "Auckland" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="w-full bg-brand-light">
      <JsonLd id="schema-lock-page" schema={jsonLd} />
      <PageHeaderSection 
        title="Auckland Locksmith & Hardware Services"
        subtitle="Lockouts, rekeys, lock repairs and new locks for homes and businesses. We cover Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <Link href="/lock/lockout" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play">
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Lockout</h2>
              <p className="text-brand-dark/70 text-sm">Locked out of your home, a room or your business? We get you back in without damaging the door.</p>
            </div>
          </Link>
          <Link href="/lock/rekey" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Rekey</h2>
              <p className="text-brand-dark/70 text-sm">Keep your existing locks and get new keys. The old ones stop working for good.</p>
            </div>
          </Link>
          <Link href="/lock/lock-change-installation" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Lock Change &amp; Install</h2>
              <p className="text-brand-dark/70 text-sm">New locks supplied, fitted and tested, with a 90-day workmanship warranty.</p>
            </div>
          </Link>
          <Link href="/lock/lock-repair" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '300ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Lock Repair</h2>
              <p className="text-brand-dark/70 text-sm">Stiff, jammed or broken locks fixed on site, so you only replace what you have to.</p>
            </div>
          </Link>
        </div>
      </div>

      <PhotoContentSection
        priority
        imageSrc="/images/services/lock/key-in-lock-cylinder-locksmith-auckland.webp"
        imageAlt="Silver key inserted in a lock cylinder showing its brass pins"
        imageTitle="Residential & Commercial Locksmith"
        imageDescription="Lock cylinders and keys for residential and commercial locksmith work across Auckland."
        title="Secure Your Property with Expert Lock Services"
        content={[
          <p key="1">Locks are one part of what we do as a commercial and residential repair and maintenance business, and they&apos;re the part people usually need in a hurry. We look after front doors, back doors, sliding doors, internal doors and shopfronts all over Auckland.</p>,
          <p key="2">We&apos;re mobile, so we come to you with the tools and common parts in the van. We&apos;re open Monday to Saturday 7 am to 9 pm and Sunday 7 am to 7 pm, with after-hours support for lockouts and other emergencies.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="How to Choose the Right Lock Service"
        content={[
          <p key="1">Not sure which job you need? Start with what&apos;s actually wrong:</p>,
          <ul key="2" className="list-disc pl-6 space-y-2">
            <li><strong>You can&apos;t get in:</strong> our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> opens house, bedroom, bathroom, apartment and shop doors, using non-destructive entry first.</li>
            <li><strong>The lock is fine, but the keys aren&apos;t:</strong> lost keys, a new home or a staff change call for a <Link href="/lock/rekey" className={linkClass}>rekeying service</Link>, so old keys stop working.</li>
            <li><strong>The lock is stiff, jammed or won&apos;t latch:</strong> <Link href="/lock/lock-repair" className={linkClass}>door lock repair</Link> usually sorts it without buying anything new.</li>
            <li><strong>The lock is worn out, or there isn&apos;t one:</strong> a <Link href="/lock/lock-change-installation" className={linkClass}>lock replacement or new installation</Link> is the answer.</li>
          </ul>,
          <p key="3">Still unsure? Describe the problem when you call and we&apos;ll point you to the right fix. We always look at a repair before suggesting a new lock.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/services/lock/deadbolt-and-knob-door-set.webp"
        imageAlt="Matching stainless steel deadbolt and round door knob set"
        imageTitle="Door Lock Installation"
        imageDescription="A matching deadbolt and knob set, fitted as a pair for a secure front door."
        title="From New Locks to Quick Fixes"
        content={[
          <p key="1">We fit new deadbolts, mortice locks, Trilock multi-point locks and sliding door locks, and every installation comes with a 90-day workmanship warranty. Our <Link href="/lock/lock-change-installation" className="font-semibold text-brand-dark underline hover:text-brand-primary transition-colors">lock change and installation service</Link> suits homes, rentals and shops.</p>,
          <p key="2">Lock feeling stiff? Try our <Link href="/lock/lock-repair" className="font-semibold text-brand-dark underline hover:text-brand-primary transition-colors">door lock repair</Link>. Moved house or lost a key? A <Link href="/lock/rekey" className="font-semibold text-brand-dark underline hover:text-brand-primary transition-colors">lock rekey</Link> stops the old keys working. Locked out? Our <Link href="/lock/lockout" className="font-semibold text-brand-dark underline hover:text-brand-primary transition-colors">residential lockout service</Link> offers after-hours support.</p>
        ]}
        ctaText="Book a Locksmith"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Tailored Security for Every Need"
        content={[
          <p key="1">Every home and business is different, so we start by looking at the door, how it&apos;s used and who needs to get in. Then we suggest the simplest lock that does the job, rather than the most expensive one.</p>,
          <p key="2">Want to stop carrying keys? Our <Link href="/smart-lock" className={darkLinkClass}>smart lock services</Link> cover keypad and app-controlled locks, from installation to repairs and programming. Locked your keys in the car instead? Our <Link href="/car-lockout" className={darkLinkClass}>car lockout service</Link> can help.</p>,
          <p key="3">Pricing is simple: a flat <strong>NZ$20 call-out fee</strong>, then the job is quoted on site and agreed before we start.</p>
        ]}
        theme="dark"
        align="left"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Lock Services FAQs"
        subtitle="Common questions about our traditional lock services."
        faqs={faqs}
        theme="light"
      />
    </div>
  );
}
