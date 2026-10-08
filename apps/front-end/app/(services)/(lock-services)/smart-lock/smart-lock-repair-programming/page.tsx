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
    canonical: "/smart-lock/smart-lock-repair-programming",
  },
  title: 'Auckland Smart Lock Repair & Programming',
  description: 'Expert diagnostics and repair for smart locks and electronic access systems. Restore functionality to your commercial or residential property.',
  keywords: 'Smart Lock Repair, Smart Lock Programming, Electronic Lock Diagnostics, Keypad Repair, Access Control Fix, Site Access Repair, Falcon Access',
  openGraph: {
    title: 'Auckland Smart Lock Repair & Programming',
    description: 'Expert diagnostics and repair for smart locks and electronic access systems. Restore functionality to your commercial or residential property.',
    url: "/smart-lock/smart-lock-repair-programming",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

/** FAQs shared by the FAQ section and the FAQPage JSON-LD so they always match. */
const faqs = [
  {
    question: "How do I know if my smart lock is broken or just out of batteries?",
    answer: "Most smart locks flash a light or beep when the batteries are low. Try a fresh set of good-quality batteries first. If the lock still doesn't respond, or the batteries keep going flat quickly, the motor, wiring or door alignment may need attention."
  },
  {
    question: "Can you fix a smart lock that keeps jamming?",
    answer: "Yes. Jamming is usually mechanical rather than electronic, caused by a strike plate or door that has moved out of line. We realign the door and strike so the bolt runs freely and the motor isn't straining."
  },
  {
    question: "Are smart lock repairs more expensive than standard hardware?",
    answer: "It depends on the fault. Alignment and adjustment work is much the same as on a standard lock. If an electronic part has failed, we'll explain whether repair or replacement is better value and quote before we start."
  },
  {
    question: "Can you add or remove codes for tenants, guests or staff?",
    answer: "Yes. We add and remove user codes, set up new master codes, and reset locks to factory settings when the original code has been lost. We also show you how to manage codes yourself."
  },
  {
    question: "Do you work on access control keypads?",
    answer: "Yes. We service and programme PIN-code access control keypads on gates and commercial doors, so site access keeps working, including changing codes when staff or contractors leave."
  }
];

export default function SmartLockRepairPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-repair-programming/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock/smart-lock-repair-programming",
        "name": "Smart Lock Repair & Programming | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-repair-programming#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Services", "item": "https://falconaccess.co.nz/smart-lock" },
          { "@type": "ListItem", "position": 3, "name": "Diagnostics & Repair", "item": "https://falconaccess.co.nz/smart-lock/smart-lock-repair-programming" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-repair-programming#service",
        "url": "https://falconaccess.co.nz/smart-lock/smart-lock-repair-programming",
        "serviceType": "Smart lock repair and programming",
        "name": "Smart Lock Repair & Programming",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Smart lock repairs, resets and code programming, plus servicing and programming of access control keypads, across Auckland.",
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
    <div className="w-full">
      <JsonLd id="schema-smart-lock-repair-programming-page" schema={jsonLd} />

      <PageHeaderSection
        title="Auckland Smart Lock Repair & Programming"
        subtitle="Flat batteries, codes that won't work, jammed bolts, resets and access control keypads sorted on site. We cover Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />

      <PhotoContentSection
        priority
        title="When a Smart Lock Lets You Down"
        content={[
          <p key="1">A smart lock that won&apos;t respond can leave you stuck outside, or with a door you can&apos;t lock. The good news is that most faults can be fixed. Many come down to something simple, like batteries, a code that&apos;s been overwritten or a door that&apos;s dropped out of line.</p>,
          <p key="2">We repair and programme home smart locks such as Yale touchscreen keypad lever locks, and PIN-code access control keypads on commercial sites, like the Rosslare keypads used on gate posts. We check both the mechanical and the electronic side, because either one can cause the same symptoms.</p>,
          <p key="3">Locked out right now behind a smart lock that won&apos;t open? Call our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> first. Smart and electronic locks are handled as secure-lock lockouts, and we always try non-destructive entry first.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-repair-programming/access-control-reader-programming-auckland.webp"
        imageAlt="Black access control card reader with a green status light and key fob"
        imageTitle="Smart Lock Repair & Programming"
        imageDescription="Access control readers and fobs repaired and reprogrammed on site in Auckland."
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Finding the Real Cause"
        content={[
          <p key="1">Plenty of smart lock faults look electronic but turn out to be physical. If the door has dropped or the strike plate has shifted, the bolt rubs, the motor strains and the batteries go flat far too quickly. New batteries alone only buy you a few weeks.</p>,
          <p key="2">So we start with the door. We check how it sits in the frame, whether the bolt runs freely and whether the lock body is worn. Then we look at the electronics: the keypad, the batteries and contacts, the codes and any app connection.</p>,
          <p key="3">If something is worn out, we&apos;ll tell you honestly whether repair or a <Link href="/smart-lock/smart-lock-change" className={linkClass}>smart lock replacement</Link> makes more sense. For ordinary keyed locks that stick or won&apos;t turn, our <Link href="/lock/lock-repair" className={linkClass}>lock repair service</Link> has you covered.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        title="Codes, Users and Resets"
        content={[
          <p key="1">A lot of our smart lock work is programming rather than repair. We add and remove user codes when tenants move out, when Airbnb or rental guests change over, or when staff join or leave. We can also reset a lock to factory settings and set a new master code if the old one has been lost.</p>,
          <p key="2">For businesses, we service and programme access control keypads on gates and doors. That includes changing codes so former staff or contractors can no longer get in.</p>,
          <p key="3">There&apos;s a flat <strong>NZ$20 call-out fee</strong> to come out and look at the fault. Any repair is quoted on site and agreed before we start. Work outside normal hours costs a bit more, and we&apos;ll tell you up front.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-repair-programming/digital-keypad-lock-repair.webp"
        imageAlt="Satin steel digital keypad lock with lever handle"
        imageTitle="Digital Lock Repair"
        imageDescription="Keypad and digital lock repairs for apartments, rentals and commercial buildings."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Before You Call, and After We Leave"
        content={[
          <p key="1">Before you call, try a fresh set of good-quality batteries and check the door closes without a push. If that doesn&apos;t fix it, note any lights or beeps the lock makes, as they help us find the fault faster.</p>,
          <p key="2">Before we leave, we test every code, the key override and the lock with the door shut. We also show you how to add and remove users yourself, so you don&apos;t need us every time a tenant changes. If we replace the lock, the new installation comes with our 90-day workmanship warranty at no extra cost.</p>,
          <p key="3">Adding a smart lock to another door? See our <Link href="/smart-lock/smart-lock-installation" className={linkClass}>smart lock installation</Link> page, or browse all our <Link href="/smart-lock" className={linkClass}>smart lock services</Link>.</p>
        ]}
        theme="white"
        align="left"
      />

      <CTASection theme="catchy" />

      <IconListSection
        title="Common Smart Lock Problems We Fix"
        subtitle="Mechanical and electronic faults, sorted on site."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'Jamming and Friction',
            description: "Realigning the strike plate and door so the bolt runs freely and the motor isn't straining."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
            title: 'Flat or Draining Batteries',
            description: "Finding out why batteries die early, cleaning contacts and checking app or Wi-Fi connections that keep dropping."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
            title: 'Codes and Resets',
            description: "Fixing keypads that won't accept codes, resetting locks and setting up new master and user codes."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Access Control Keypads',
            description: "Servicing and reprogramming PIN-code keypads on gates and commercial doors."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Smart Lock Repair & Sync FAQs"
        subtitle="Common questions about electronic hardware repair."
        faqs={faqs}
        theme="dark"
      />

    </div>
  );
}
