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
    canonical: "/lock/lock-repair",
  },
  title: 'Door Lock Repair Service Auckland',
  description: 'Door lock repair across Auckland: jammed keys, stiff barrels, sliding door locks and repairs after a break-in. Fixed on site, with a NZ$20 call-out.',
  keywords: 'Lock Repair, Door Lock Repair, Door Lock Repair Service, Burglary Repairs Auckland, Break-In Lock Repair, Lock Repair Near Me, Door and Lock Repair, Door Lock Mechanic, Lock Fixer, Hardware Repair, Commercial Maintenance, Residential Repair, Falcon Access',
  openGraph: {
    title: 'Door Lock Repair Service Auckland',
    description: 'Door lock repair across Auckland: jammed keys, stiff barrels, sliding door locks and repairs after a break-in. Fixed on site, with a NZ$20 call-out.',
    url: "/lock/lock-repair",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";
const darkLinkClass = "font-semibold text-brand-light underline hover:text-brand-accent transition-colors";

const faqs = [
  {
    question: "Should I repair or replace my faulty lock?",
    answer: "We'd rather repair a lock than sell you a new one. If the problem is alignment, dirt or a worn spring, a repair is usually the cheaper choice. If the body is cracked, rusted through or worn out inside, we'll tell you honestly that a replacement makes more sense."
  },
  {
    question: "My key is stuck in the lock. What should I do?",
    answer: "Don't force it or pull it with pliers, as that can snap the key inside the cylinder. Leave it where it is, avoid spraying oil into the lock, and give us a call. We can usually free the key and work out why it jammed."
  },
  {
    question: "Can you fix sliding door and ranch slider locks?",
    answer: "Yes. Sliding door locks are one of our most common repairs. Often the roller height or keeper just needs adjusting, but if the lock body inside the door is worn out, we can replace it with a matching one."
  },
  {
    question: "Can you fix commercial and glass door locks?",
    answer: "Yes. We work on a wide range of commercial and residential hardware, including mortice locks, deadlocks and glass door hardware on shopfronts and offices."
  },
  {
    question: "Can you secure my door after a break-in?",
    answer: "Yes. We repair or replace forced locks and damaged strike plates so the door locks properly again, and rekey the remaining locks if keys were taken. You'll get an itemised invoice you can give your insurer."
  },
  {
    question: "How much does a lock repair cost?",
    answer: "There's a flat NZ$20 call-out fee. Repairs are priced by the fault, so once we've found the problem we quote on site and agree the price with you before we start."
  }
];

export default function LockRepairPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock/lock-repair/#webpage",
        "url": "https://falconaccess.co.nz/lock/lock-repair",
        "name": "Door Lock Repair Service Auckland | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/lock/lock-repair#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Lock Repair", "item": "https://falconaccess.co.nz/lock/lock-repair" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/lock/lock-repair#service",
        "url": "https://falconaccess.co.nz/lock/lock-repair",
        "serviceType": "Lock repair",
        "name": "Door Lock Repair Service",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Reliable repair for faulty locks and hardware on commercial and residential properties.",
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
      <JsonLd id="schema-lock-repair-page" schema={jsonLd} />

      <PageHeaderSection
        title="Door Lock Repair Service Auckland"
        subtitle="Stiff, sticking or broken locks fixed on site. Our mobile team covers Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />

      <PhotoContentSection
        priority
        title="Restoring Functionality"
        content={[
          <p key="1">A lock that won&apos;t latch, a key you have to wiggle or a deadbolt that only turns on the third try is more than annoying. Sooner or later it leaves a door you can&apos;t lock, or one you can&apos;t open. Our door lock repair service finds the real cause and fixes it.</p>,
          <p key="2">We work on everything from home deadbolts and privacy knobs to heavy commercial mortice locks. Think of us as your mobile door lock mechanic: we come to you, open the lock up and leave it working smoothly again.</p>
        ]}
        imageSrc="/images/services/lock/lock-repair/lock-mechanism-repair-screwdriver-springs.webp"
        imageAlt="Open mortice lock body showing its gears and springs, with a screwdriver and spare springs"
        imageTitle="Lock Repair Service Auckland"
        imageDescription="Stiff, sticking or worn locks opened up and repaired on site across Auckland."
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Repair First, Replace Only When Necessary"
        content={[
          <p key="1">We won&apos;t sell you parts you don&apos;t need. A surprising number of &quot;broken&quot; locks are really a door that has dropped, a strike plate that has shifted or a cylinder full of grit. Those can usually be fixed without replacing anything.</p>,
          <p key="2">We start by checking how the door sits in the frame, then take the lock apart if we need to. If cleaning, adjusting or a new spring solves it, that&apos;s what we do. If the lock has been forced open, our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> can get you in first and we&apos;ll repair it afterwards.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        title="Reliable, Long-Lasting Fixes"
        content={[
          <p key="1">Our vans carry the tools and common spare parts, so most repairs are finished in a single visit. Once the lock works, we test it with every key you have and check the door closes and latches without a shove.</p>,
          <p key="2">We handle shop and home locks of all kinds, including glass door hardware. Need lock repair near you? Get in touch for an honest look at the problem and a <strong>NZ$20 flat call-out fee</strong>, with the repair quoted on site before we start.</p>
        ]}
        imageSrc="/images/services/lock/lock-repair/brass-lever-lock-cylinder-key-tag.webp"
        imageAlt="Brass lever handle and lock cylinder with a key and numbered key tag"
        imageTitle="Broken Lock Mechanism Repair"
        imageDescription="We fix broken lock mechanisms and worn cylinders so keys turn smoothly again."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="When a Repair Isn't Worth It"
        content={[
          <p key="1">Sometimes fixing a lock is throwing good money after bad. If the lock body is cracked, rusted through, missing parts that are no longer made, or keeps failing after earlier repairs, a new lock will cost less over time. We&apos;ll tell you that straight and quote both options.</p>,
          <p key="2">When replacement is the answer, our <Link href="/lock/lock-change-installation" className={darkLinkClass}>lock change and installation</Link> team can fit a matching lock or an upgrade. If the lock is fine but you&apos;re worried about who has keys, a <Link href="/lock/rekey" className={darkLinkClass}>rekeying service</Link> is all you need. Keypad or app trouble? See our <Link href="/smart-lock/smart-lock-repair-programming" className={darkLinkClass}>smart lock repair and programming</Link> page.</p>
        ]}
        theme="dark"
        align="left"
      />

      <CTASection theme="catchy" />

      <IconListSection
        title="Common Issues We Fix"
        subtitle="The everyday faults we sort out on homes, rentals and shops around Auckland."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
            title: 'Jammed Keys',
            description: "Keys that won't turn, won't come out or have snapped inside the cylinder. We free them without wrecking the lock."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
            title: 'Stiff Barrels',
            description: "Cylinders that need a hard push to turn, usually from dirt, wear or the wrong lubricant. We clean, service or replace the barrel."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            title: 'Sliding Door Locks',
            description: "Ranch slider locks that won't catch, worn mortice lock bodies and handles that have come loose on aluminium doors."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
            title: 'Door & Frame Alignment',
            description: "Doors that have dropped or swollen so the latch misses the strike plate. We adjust the hinges, strike and hardware so it closes cleanly."
          }
        ]}
        theme="white"
      />

      <TextContentSection
        title="Lock Repairs After a Break-In"
        content={[
          <p key="1">A burglary or attempted break-in often leaves a door that won&apos;t lock: a forced deadbolt, a bent or ripped-out strike plate, a snapped cylinder or a latch that no longer catches. Getting that door secure again comes first, and it&apos;s a job we&apos;re glad to come out for.</p>,
          <p key="2">We repair or replace the damaged lock hardware, refit the strike so the door closes and locks properly, and <Link href="/lock/rekey" className={darkLinkClass}>rekey the other locks</Link> if any keys were taken. If the door or frame itself is badly split, you may need a builder or joiner as well, and we&apos;ll be honest about which parts are ours to fix.</p>,
          <p key="3">Every job comes with an itemised invoice, which helps if you&apos;re making an insurance claim. Work outside normal hours costs a bit more, and we&apos;ll tell you before we start.</p>
        ]}
        theme="dark"
        align="left"
      />

      <TextContentSection
        title="Before We Arrive"
        content={[
          <p key="1">If a key is stuck, leave it in the lock rather than forcing it. Have any spare keys ready so we can test them all, and let us know if the door has been forced, slammed or recently painted.</p>,
          <p key="2">Not sure whether you need a repair at all? Our <Link href="/lock" className={linkClass}>Auckland lock services</Link> page compares repairs, rekeys, lock changes and lockouts.</p>
        ]}
        theme="light"
        align="left"
      />

      <FAQSection
        title="Lock Mechanism Repair FAQs"
        subtitle="Common questions about our repair services."
        faqs={faqs}
        theme="dark"
      />

    </div>
  );
}
