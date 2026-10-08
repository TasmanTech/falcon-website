import { Metadata } from 'next';
import Link from 'next/link';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
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

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

/** FAQs shared by the FAQ section and the FAQPage JSON-LD so they always match. */
const faqs = [
  {
    question: "Can you install any brand of smart lock?",
    answer: "We fit most home and light commercial smart locks, including brands we regularly work on such as Yale. If you have already bought a lock, send us the model and a photo of your door and we will check it suits the door before we come out."
  },
  {
    question: "Do you offer reprogramming services?",
    answer: "Yes. We reset smart locks, set up new master codes, and add or remove user codes for family, tenants, rental guests and staff. We also service and programme PIN-code access control keypads on gates and commercial doors."
  },
  {
    question: "How much does a smart lock job cost?",
    answer: "There is a flat NZ$20 call-out fee. The rest depends on the lock, the door and how much preparation it needs, so we quote on site and agree the price with you before we start."
  }
];

export default function SmartLockServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock",
        "name": "Smart Lock Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/smart-lock#service" }
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
        "@id": "https://falconaccess.co.nz/smart-lock#service",
        "url": "https://falconaccess.co.nz/smart-lock",
        "serviceType": "Smart lock services",
        "name": "Smart Lock Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Smart lock installation, changes from mechanical locks, repairs and code programming for homes, rentals and businesses across Auckland.",
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
      <JsonLd id="schema-smart-lock-page" schema={jsonLd} />
      <PageHeaderSection
        title="Smart Lock Installation Auckland"
        subtitle="Keypad, fingerprint and app-controlled locks fitted, repaired and programmed across Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Link href="/smart-lock/smart-lock-installation" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play">
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Installation</h2>
              <p className="text-brand-dark/70 text-sm">A new smart lock fitted to your door, lined up properly and set up with your codes.</p>
            </div>
          </Link>
          <Link href="/smart-lock/smart-lock-change" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Change &amp; Upgrade</h2>
              <p className="text-brand-dark/70 text-sm">Swap a worn mechanical lock or an old smart lock for a keyless one that suits your door.</p>
            </div>
          </Link>
          <Link href="/smart-lock/smart-lock-repair-programming" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Repair &amp; Programming</h2>
              <p className="text-brand-dark/70 text-sm">Flat batteries, codes that won&apos;t work, resets, user codes and access control keypads.</p>
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
        title="Keyless Entry That Suits Your Door"
        content={[
          <p key="1">A smart lock lets you open the door with a PIN, a fingerprint or your phone instead of a key. No spare hidden under the pot plant, and no getting locked out because someone took the last key to school.</p>,
          <p key="2">We fit and look after them for Auckland homes, rentals, offices and shared buildings. A lock we see often is the Yale touchscreen keypad lever lock, where you tap in a PIN and push the handle down. On commercial sites, we service and programme access control keypads like the Rosslare units mounted on gate posts.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Choosing a Smart Lock for Your Door"
        content={[
          <p key="1">Not every smart lock suits every door, so check a few things before you buy. Most locks are made for a set range of door thickness. The existing holes and the backset (the distance from the door edge to the centre of the handle) decide whether a lock drops straight in or needs extra work.</p>,
          <p key="2">Then there&apos;s the style. A deadbolt-style smart lock adds keyless locking above your existing handle, while a lever-style lock replaces the whole handle set. Older Auckland homes often have mortice locks set into the door edge, which need a mortice-style smart lock or careful door work.</p>,
          <p key="3">Last, think about how you&apos;ll open it. Keypads are simple and suit families and tenants. Fingerprint readers are quick for a small household, and app control is handy for letting people in remotely.</p>
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
          <p key="1">Our <Link href="/smart-lock/smart-lock-installation" className={linkClass}>smart lock installation</Link> covers fitting the lock, lining it up with the strike, setting your codes and the app, and showing you how it all works. Every installation comes with a 90-day workmanship warranty at no extra cost.</p>,
          <p key="2">Old lock playing up? We handle <Link href="/smart-lock/smart-lock-change" className={linkClass}>smart lock replacement</Link> and <Link href="/smart-lock/smart-lock-repair-programming" className={linkClass}>smart lock repair and programming</Link> for homes and businesses, from flat batteries to adding and removing user codes.</p>
        ]}
        ctaText="Get a Quote"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Batteries, Backup Keys and Staying With Keys"
        content={[
          <p key="1">Most smart locks run on batteries, so a power cut won&apos;t lock you out. They warn you with a light or a beep when the batteries get low, and many have a mechanical key override or emergency power contacts. We always suggest a lock that keeps a key override.</p>,
          <p key="2">Rather stick with keys? That&apos;s fine too. We do standard <Link href="/lock/lock-change-installation" className={linkClass}>lock changes and installation</Link>, and <Link href="/lock/rekey" className={linkClass}>rekeying your existing locks</Link> stops old keys working without new hardware. Stuck outside a smart lock? Our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> handles secure electronic locks too.</p>
        ]}
        theme="white"
        align="left"
      />

      <CTASection
        theme="catchy"
        title="Thinking About a Smart Lock?"
        description="Tell us about your door and we will recommend and fit a smart lock that suits it."
        buttonText="Get a Quote"
      />

      <IconListSection
        title="How a Smart Lock Job Works"
        subtitle="Simple, upfront and done properly."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
            title: 'Tell Us About Your Door',
            description: "Call or send a request, with a photo of the door if you can. We talk through the options and confirm the flat NZ$20 call-out."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
            title: 'We Check and Quote',
            description: "We measure the door and frame and agree a price before work starts. Work outside normal hours costs a bit more, and we tell you first."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Fitted and Explained',
            description: "We fit and test the lock, set up your codes, and show you how to manage users and change the batteries."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Smart Lock FAQs"
        subtitle="Common questions about our smart lock installations and repairs."
        faqs={faqs}
        theme="dark"
      />
    </div>
  );
}
