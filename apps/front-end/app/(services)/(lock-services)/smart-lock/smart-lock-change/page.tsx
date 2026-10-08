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
    canonical: "/smart-lock/smart-lock-change",
  },
  title: 'Auckland Smart Lock Change & Upgrades',
  description: 'Upgrade your commercial or residential property with modern smart lock systems. Professional installation and integration across Auckland.',
  keywords: 'Smart Lock Change, Smart Lock Installation, Smart Lock Upgrade, Electronic Locks, Digital Keypad, Access Control Upgrade, Falcon Access',
  openGraph: {
    title: 'Auckland Smart Lock Change & Upgrades',
    description: 'Upgrade your commercial or residential property with modern smart lock systems. Professional installation and integration across Auckland.',
    url: "/smart-lock/smart-lock-change",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

/** FAQs shared by the FAQ section and the FAQPage JSON-LD so they always match. */
const faqs = [
  {
    question: "Will a smart lock fit on my existing door?",
    answer: "In most cases, yes. We check the door thickness, the backset and the existing holes, and whether you have a deadbolt, a lever set or a mortice lock. If the new lock doesn't line up with the old holes, we adjust the door or frame so it fits properly."
  },
  {
    question: "What happens if the battery dies or the power goes out?",
    answer: "Most smart locks run on batteries, so a power cut won't affect them. They warn you when the batteries are getting low, and many have a mechanical key override or emergency power contacts on the outside. We recommend keeping a key override where the lock offers one."
  },
  {
    question: "Can you integrate the lock with my existing smart home system?",
    answer: "It depends on the lock and the system you already have. Some locks connect to an app over Wi-Fi or Bluetooth, and some work with smart home hubs. We set up whatever your lock supports, but it's worth confirming compatibility with the maker before you buy."
  },
  {
    question: "Is a smart lock a good idea for a rental or Airbnb?",
    answer: "Often, yes. You can give each tenant, guest or cleaner their own code and remove it when they leave, so there are no keys to collect or copy. We set up the first codes for you and show you how to manage them yourself."
  },
  {
    question: "How much does it cost to change to a smart lock?",
    answer: "There's a flat NZ$20 call-out fee. The rest depends on the lock, the door and how much adjustment is needed, so we quote on site and agree the price before we start. Work outside normal hours costs a bit more, and we'll tell you first."
  }
];

export default function SmartLockChangePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-change/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock/smart-lock-change",
        "name": "Smart Lock Change & Upgrades | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-change#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Services", "item": "https://falconaccess.co.nz/smart-lock" },
          { "@type": "ListItem", "position": 3, "name": "Smart Lock Upgrades", "item": "https://falconaccess.co.nz/smart-lock/smart-lock-change" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-change#service",
        "url": "https://falconaccess.co.nz/smart-lock/smart-lock-change",
        "serviceType": "Smart lock change and upgrade",
        "name": "Smart Lock Change & Upgrade",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Professional upgrade and installation of smart locks for commercial and residential doors.",
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
      <JsonLd id="schema-smart-lock-change-page" schema={jsonLd} />

      <PageHeaderSection
        title="Auckland Smart Lock Change & Upgrades"
        subtitle="Swap a worn mechanical lock, or an older smart lock, for a keyless one that suits your door. We cover Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />

      <PhotoContentSection
        priority
        title="Moving From Keys to Keyless"
        content={[
          <p key="1">Changing to a smart lock is one of the easiest security upgrades you can make. No more cutting spare keys for every family member, tenant or cleaner, and no more wondering who still has one. When someone moves out or a staff member leaves, you delete their code instead of changing the lock.</p>,
          <p key="2">We swap mechanical deadbolts, handle sets and mortice locks for smart locks, and replace older smart locks that have worn out. A popular choice is a keypad lever lock, like the Yale touchscreen models, where you tap in a PIN and push the handle down.</p>,
          <p key="3">Starting with a door that&apos;s never had a proper lock? That&apos;s a <Link href="/smart-lock/smart-lock-installation" className={linkClass}>fresh smart lock installation</Link> instead. You can also compare all our <Link href="/smart-lock" className={linkClass}>smart lock services</Link> in one place.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-change/push-pull-smart-lock-replacement-auckland.webp"
        imageAlt="Champagne gold push-pull smart lock with fingerprint reader"
        imageTitle="Smart Lock Replacement Auckland"
        imageDescription="Swapping a worn or outdated smart lock for a newer, more reliable model."
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Will a Smart Lock Fit My Door?"
        content={[
          <p key="1">Most doors can take a smart lock, but your existing hardware decides how simple the change is. We look at the door thickness, the backset, the size and position of the existing holes, and whether you have a deadbolt, a lever set or a mortice lock.</p>,
          <p key="2">If the new lock lines up with the old holes, it&apos;s a straight swap. If it doesn&apos;t, we may need to enlarge holes, move the strike plate, fill old fixings or adjust the door so it closes cleanly. Many older Auckland homes have Lockwood security deadlocks or mortice locks on painted timber doors, and these often need a particular style of smart lock or extra door work.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        title="Set Up Properly, Not Just Screwed On"
        content={[
          <p key="1">Once the new lock is fitted, we set your master code and user codes, connect the app and Wi-Fi if the lock uses them, and test every way in, including the key override. Then we show you how to manage users and change the batteries.</p>,
          <p key="2">Most smart locks run on batteries, so a power cut won&apos;t lock you out. They warn you when the batteries are low, and many have a mechanical key or emergency power contacts as a backup. We recommend keeping a key override where the lock has one.</p>,
          <p key="3">There&apos;s a flat <strong>NZ$20 call-out fee</strong>. The change itself is quoted on site and agreed before we start, and every installation comes with a <strong>90-day workmanship warranty</strong> at no extra cost.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-change/keycard-smart-lock-commercial-upgrade.webp"
        imageAlt="Stainless steel keycard smart lock with lever handle and access card"
        imageTitle="Commercial Smart Lock Upgrade"
        imageDescription="Keycard smart lock upgrades for offices, rentals and commercial doors."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Not Sure a Smart Lock Is Right for You?"
        content={[
          <p key="1">A smart lock isn&apos;t for everyone, and that&apos;s fine. If you&apos;d rather keep keys, <Link href="/lock/rekey" className={linkClass}>rekeying your locks</Link> stops old keys working without replacing the hardware. A standard <Link href="/lock/lock-change-installation" className={linkClass}>lock change</Link> may also suit some doors better, like sliding doors or back doors.</p>,
          <p key="2">If your current smart lock is just playing up, it may not need replacing at all. Our <Link href="/smart-lock/smart-lock-repair-programming" className={linkClass}>smart lock repair and programming</Link> service sorts out flat batteries, codes that won&apos;t take and resets. And if you&apos;re stuck outside right now, our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> can get you in without damaging the door.</p>
        ]}
        theme="white"
        align="left"
      />

      <CTASection theme="catchy" />

      <IconListSection
        title="Why People Make the Switch"
        subtitle="What a smart lock can do that a key can't."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: 'Keyless Entry Options',
            description: "Open the door with a PIN, a fingerprint or your phone, depending on the lock. No keys to lose or hide under the doormat."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
            title: 'A Code for Each Person',
            description: "Give family, tenants, cleaners or staff their own codes, and remove them when they no longer need access."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            title: 'Temporary Guest Codes',
            description: "Many locks let you set codes for guests or tradespeople that only work for a set time, which suits Airbnb and rental hosts."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Smart Lock Upgrade FAQs"
        subtitle="Common questions about smart lock upgrades."
        faqs={faqs}
        theme="dark"
      />

    </div>
  );
}
