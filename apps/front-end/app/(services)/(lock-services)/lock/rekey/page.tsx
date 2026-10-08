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
    canonical: "/lock/rekey",
  },
  title: 'Lock Rekeying for Auckland Homes & Offices',
  description: 'Rekey locks across Auckland so old keys stop working. House, rental and office rekeying with new keys cut on site, plus a flat NZ$20 call-out.',
  keywords: 'Rekey Locks, Rekey House Locks, Rekey My House, Rekey Office Locks, Rekey Locks Auckland, Change Locks After Moving House, Landlord Lock Change, Rekeying, Lock Rekey, Lock Rekey Service, Lock Changing Service, Hardware Rekeying, Commercial Security, Falcon Access',
  openGraph: {
    title: 'Lock Rekeying for Auckland Homes & Offices',
    description: 'Rekey locks across Auckland so old keys stop working. House, rental and office rekeying with new keys cut on site, plus a flat NZ$20 call-out.',
    url: "/lock/rekey",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";
const darkLinkClass = "font-semibold text-brand-light underline hover:text-brand-accent transition-colors";

const faqs = [
  {
    question: "What is the difference between rekeying and replacing a lock?",
    answer: "Replacing a lock means taking the whole mechanism out of the door and fitting a new one. Rekeying keeps your existing lock and changes the pins inside the cylinder so the old keys stop working. If the lock is in good condition, rekeying is usually quicker and costs less."
  },
  {
    question: "Should I rekey my house after moving in?",
    answer: "Yes, it's one of the best things to do in the first week. Previous owners, tenants, tradespeople and neighbours may all still have keys. If the locks are in good shape, rekeying is cheaper than changing the locks after moving house, and the old keys stop working just the same."
  },
  {
    question: "Can you make all my doors use the same key?",
    answer: "Usually, yes. If your locks are the same brand or share the same keyway, we can key them alike so one key opens the front door, back door and garage. If one lock uses a different keyway, we'll tell you on site and suggest the simplest fix."
  },
  {
    question: "Can you cut extra keys when you rekey?",
    answer: "Yes. Most people ask for a few spare keys at the same visit, one for each person in the house plus a spare to keep somewhere safe. Tell us how many you need when you book."
  },
  {
    question: "Can you rekey office locks after staff changes?",
    answer: "Yes. Rekeying is a common way for shops and offices to shut out keys held by former staff or contractors. We can look at your current keys and locks and talk you through the options before we start."
  },
  {
    question: "How much does rekeying cost?",
    answer: "There's a flat NZ$20 call-out fee. The rekey itself is quoted on site, depending on how many cylinders you have, the type of lock and how many keys you need. Work outside normal hours costs a bit more, and we'll tell you before we start."
  }
];

export default function RekeyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock/rekey/#webpage",
        "url": "https://falconaccess.co.nz/lock/rekey",
        "name": "Rekey Locks in Auckland | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/lock/rekey#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Rekeying", "item": "https://falconaccess.co.nz/lock/rekey" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/lock/rekey#service",
        "url": "https://falconaccess.co.nz/lock/rekey",
        "serviceType": "Lock rekeying",
        "name": "Lock Rekeying Service",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Cost-effective hardware rekeying for commercial and residential properties.",
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
      <JsonLd id="schema-rekey-page" schema={jsonLd} />

      <PageHeaderSection
        title="Rekey Locks in Auckland"
        subtitle="Keep the locks you have and make the old keys useless. We rekey homes, rentals and businesses across Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />

      <PhotoContentSection
        priority
        title="Rekey Your House Without New Locks"
        content={[
          <p key="1">You don&apos;t always need new locks to stop someone getting in. A lock rekey changes the small pins inside your existing cylinder, so the lock works with a new key and the old ones simply won&apos;t turn.</p>,
          <p key="2">Your handles, deadbolts and door hardware stay exactly where they are. You get a fresh set of keys, the old keys become useless, and you only pay for the work inside the cylinder rather than a whole new lock.</p>
        ]}
        imageSrc="/images/services/lock/rekey/chrome-lever-lock-keys-rekeying-auckland.webp"
        imageAlt="Chrome lever handles and lock cylinder with a set of keys"
        imageTitle="Lock Rekeying Service Auckland"
        imageDescription="Rekeying your existing locks so old keys stop working, without replacing the hardware."
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="When Should You Rekey?"
        content={[
          <p key="1">The short answer: whenever you don&apos;t know who else has a key. These are the times we get asked to rekey most:</p>,
          <ul key="2" className="list-disc pl-6 space-y-2">
            <li><strong>Moving house:</strong> previous owners, tenants, builders and neighbours may all still hold a key to your new place.</li>
            <li><strong>Lost or stolen keys:</strong> especially if they were on a ring with your address or car keys.</li>
            <li><strong>New tenants or flatmates:</strong> landlords and property managers often rekey between tenancies.</li>
            <li><strong>Staff changes:</strong> shops and offices rekey when someone leaves with a key that wasn&apos;t returned.</li>
          </ul>,
          <p key="3">If you&apos;re locked out because the keys have gone missing, our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> gets you inside first, and we can rekey at the same visit so the lost set stops working.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        title="Fast & Efficient Service"
        content={[
          <p key="1">Our vans carry the pins, tools and key blanks to rekey most locks on site. We regularly work on brands such as Lockwood, Yale, Kwikset and Legge, on everything from front door deadbolts to keyed lever handles on internal doors.</p>,
          <p key="2">We take each cylinder out, re-pin it to suit a new key, refit it and test every key in every lock before we leave. There&apos;s a simple <strong>NZ$20 flat call-out fee</strong>, and the rekey is quoted on site before we start.</p>
        ]}
        imageSrc="/images/services/lock/rekey/euro-cylinder-new-keys-rekey.webp"
        imageAlt="Brass euro lock cylinder with a set of newly cut keys"
        imageTitle="Residential Lock Rekey"
        imageDescription="A rekeyed cylinder and a fresh set of keys for your home."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Rekey or Change the Lock?"
        content={[
          <p key="1">Rekeying makes sense when the lock itself is sound: it turns smoothly, latches properly and you like how it looks. If the lock is worn, sticking or damaged, new keys won&apos;t fix that, and our <Link href="/lock/lock-change-installation" className={darkLinkClass}>lock change and installation service</Link> is the better spend.</p>,
          <p key="2">A lock that only feels stiff may just need a service, which our <Link href="/lock/lock-repair" className={darkLinkClass}>lock repair</Link> team can sort while we&apos;re there. And if you&apos;d rather stop worrying about keys altogether, a <Link href="/smart-lock/smart-lock-installation" className={darkLinkClass}>smart lock installation</Link> lets you open the door with a PIN code instead.</p>
        ]}
        theme="dark"
        align="left"
      />

      <CTASection theme="catchy" />

      <IconListSection
        title="Benefits of Rekeying"
        subtitle="A straightforward way to take back control of who can get in."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: 'Cost-Effective Security',
            description: "You keep the hardware you already have, so you're paying for new pins and keys rather than a new lock on every door."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
            title: 'One Key for Every Door',
            description: "Keying alike means the front door, back door and garage can all open with the same key, so there's less on your key ring."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Old Keys Stop Working',
            description: "Keys held by former tenants, past owners or ex-staff won't open anything once the job is done, and you decide who gets the new ones."
          }
        ]}
        theme="white"
      />

      <TextContentSection
        title="Before We Arrive"
        content={[
          <p key="1">Count the doors you want on the new key, including garage, side and sliding doors, and gather any old keys you still have. Let us know how many spare keys you need so we bring enough blanks.</p>,
          <p key="2">If you&apos;re still weighing up your options, our <Link href="/lock" className={linkClass}>Auckland lock services</Link> page explains how rekeying fits alongside lockouts, repairs and lock changes.</p>
        ]}
        theme="light"
        align="left"
      />

      <FAQSection
        title="Lock Rekeying Service FAQs"
        subtitle="Common questions about our rekeying services."
        faqs={faqs}
        theme="dark"
      />

    </div>
  );
}
