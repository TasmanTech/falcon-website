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
    canonical: "/lock/lockout",
  },
  title: 'Emergency Lockout Services Auckland Wide',
  description: 'Fast house, apartment and commercial lockout help across Auckland. Non-destructive entry first, a flat NZ$20 call-out and after-hours support.',
  keywords: 'Locksmith to Open Door, Locked Out of House, Office Lockout, Lockout Services, Residential Lockout Service, Commercial Lockout Service, Door Unlocking Service, Lock Opener Service, Emergency Locksmith, Locksmith Emergency Services, After-Hours Locksmith, Auckland, Non-destructive entry, Commercial lockout, Falcon Access',
  openGraph: {
    title: 'Emergency Lockout Services Auckland Wide',
    description: 'Fast house, apartment and commercial lockout help across Auckland. Non-destructive entry first, a flat NZ$20 call-out and after-hours support.',
    url: "/lock/lockout",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

const faqs = [
  {
    question: "How quickly can you get to me?",
    answer: "We treat lockouts as a priority and head out promptly once you call. Exact timing depends on traffic and where you are in Auckland."
  },
  {
    question: "Can a locksmith open a locked door without the key?",
    answer: "Yes. Most locked doors can be opened without the key using picks and bypass tools, which leave the lock working afterwards. Deadlocks and high-security cylinders take longer, and a few need a different approach, which we'll explain before we start."
  },
  {
    question: "Will my door or lock be damaged?",
    answer: "We always try non-destructive entry first, and most locks open without any damage to the door, frame or lock. If a lock has failed and must be drilled, we'll explain why and agree the price first."
  },
  {
    question: "How much does a lockout cost?",
    answer: "A flat NZ$20 call-out fee, then we quote the entry on site, based on the type of lock, before we start. Work outside normal hours costs a bit more."
  },
  {
    question: "Can you open a bedroom or bathroom door that's locked from the inside?",
    answer: "Yes. Privacy knobs on bedroom and bathroom doors are one of our most common calls, often when a child has pushed the button and can't undo it. These usually open without any damage."
  },
  {
    question: "Do I need to prove I live or work there?",
    answer: "Yes. Before we open a door we need to see you're allowed in, usually photo ID showing the address, a tenancy agreement or a recent bill."
  }
];

export default function LockoutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock/lockout/#webpage",
        "url": "https://falconaccess.co.nz/lock/lockout",
        "name": "Emergency Lockout Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/lock/lockout#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Lockout Services", "item": "https://falconaccess.co.nz/lock/lockout" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/lock/lockout#service",
        "url": "https://falconaccess.co.nz/lock/lockout",
        "serviceType": "Emergency lockout service",
        "name": "Emergency Lockout Services",
        "provider": {
          "@id": "https://falconaccess.co.nz/#organization"
        },
        "description": "Fast, reliable commercial and residential lockout assistance across Auckland.",
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
      <JsonLd id="schema-lockout-page" schema={jsonLd} />

      <PageHeaderSection
        title="Emergency Lockout Services Auckland Wide"
        subtitle="Locked out of your house, flat, shop or a room inside? We get you back in with non-destructive entry first, across Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />

      <PhotoContentSection
        priority
        imageSrc="/images/services/lock/lockout/key-in-stainless-door-lock-lockout-auckland.webp"
        imageAlt="Key inserted in a square stainless steel door lock"
        imageTitle="Residential Lockout Service Auckland"
        imageDescription="Back inside and turning your own key again after our Auckland lockout service."
        title="Door Unlocking Service Across Auckland"
        content={[
          <p key="1">Being locked out is stressful, whether your keys are sitting on the kitchen bench or the door simply clicked shut behind you. When you need a locksmith to open a door, our door unlocking service covers houses, flats, offices and shops across Auckland, and every lockout call is a priority.</p>,
          <p key="2">You pay a flat <strong>NZ$20 call-out fee</strong> for us to come to you. Once we&apos;ve had a look at the lock, we tell you what it will cost to open, and nothing starts until you&apos;re happy with the price. We also offer after-hours support, so you&apos;re not stuck outside until morning.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="The Lockouts We Get Called To Most"
        content={[
          <p key="1">Lockouts are the job we do most. These are the situations we sort out week in, week out:</p>,
          <ul key="2" className="list-disc pl-6 space-y-2">
            <li><strong>House lockouts:</strong> front and back doors with deadbolts, deadlocks and entrance handle sets, including brands we regularly work on such as Lockwood, Yale, Kwikset and Legge.</li>
            <li><strong>Bedroom and bathroom doors:</strong> privacy knobs that lock behind you, very often when a child has pushed the button and can&apos;t undo it.</li>
            <li><strong>Apartments and flats:</strong> doors that latch as they close, with the keys left inside the unit.</li>
            <li><strong>Shops and offices:</strong> commercial doors that need opening so you can get trading again.</li>
            <li><strong>Small locks:</strong> mailboxes, cabinets and locked boxes, opened without drilling where we can.</li>
          </ul>,
          <p key="3">Locked out of a vehicle instead? Our <Link href="/car-lockout" className={linkClass}>car lockout help</Link> uses different tools and is priced by vehicle. If a keypad or smart lock has stopped letting you in, see our <Link href="/smart-lock/smart-lock-repair-programming" className={linkClass}>smart lock repair and programming</Link> service.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/services/lock/lockout/locksmith-picks-emergency-door-unlocking.webp"
        imageAlt="Two stainless steel locksmith picks for non-destructive door unlocking"
        imageTitle="Emergency Door Unlocking Tools"
        imageDescription="Precision picks that open a lock without drilling, so your lock and door stay intact."
        title="Non-Destructive Techniques"
        content={[
          <p key="1">We don&apos;t reach for the drill first. Picks, bypass tools and a bit of patience open most locks without marking the door, the frame or the lock itself. That saves you buying new hardware on top of the lockout.</p>,
          <p key="2">Once you&apos;re back inside, we check the lock still locks and unlocks properly with your key. If a lock has genuinely failed, we can sort it there and then with our <Link href="/lock/lock-repair" className={linkClass}>lock repair service</Link>, or fit a new one through our <Link href="/lock/lock-change-installation" className={linkClass}>lock change and installation</Link> work.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="What Affects the Price of a Lockout"
        content={[
          <p key="1">We don&apos;t guess lockout prices over the phone, because the lock makes the biggest difference. The NZ$20 call-out gets us to your door, and we quote the entry itself on site before we touch anything. Locks fall roughly into three groups:</p>,
          <ul key="2" className="list-disc pl-6 space-y-2">
            <li><strong>Standard locks:</strong> simple locks such as cabinets and mailboxes. These are usually the quickest to open.</li>
            <li><strong>Advanced locks:</strong> deadbolts, entrance handle sets and 5-pin cylinders, the kind found on most Auckland front doors.</li>
            <li><strong>Secure locks:</strong> smart, electronic and restricted locks, plus 6-pin cylinders. These take more time and skill to open without damage.</li>
          </ul>,
          <p key="3">Timing matters too. Work outside normal hours, such as evenings, early mornings, weekends and public holidays, costs a bit more, and we&apos;ll tell you before we start.</p>
        ]}
        theme="dark"
        align="left"
      />

      <CTASection
        theme="catchy"
        title="Locked Out Right Now?"
        description="Call us now. We come to you anywhere in Auckland and use non-destructive entry first."
        buttonText="Call +64 9 243 1404"
        buttonHref="tel:+6492431404"
      />

      <IconListSection
        title="Our Lockout Process"
        subtitle="Three simple steps from your phone call to being back inside."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'Call Us',
            description: <>Ring <a href="tel:+6492431404" className="text-brand-accent underline hover:text-brand-accent/80 transition-colors">+64 9 243 1404</a> and tell us where you are, which door you&apos;re locked out of and what kind of lock it is if you know. We confirm the NZ$20 call-out and head your way promptly.</>
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Authorisation Check',
            description: "Before we open anything, we check you're allowed in, usually with photo ID showing the address, a lease or a power bill."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>,
            title: 'Back Inside',
            description: "We open the door with non-destructive entry first, then test the lock with you. If it's damaged or worn out, we explain your options and quote before doing anything more."
          }
        ]}
        theme="white"
      />

      <TextContentSection
        title="Lost Your Keys, Not Just Locked Out?"
        content={[
          <p key="1">If your keys are lost or stolen rather than locked inside, opening the door is only half the job. Whoever finds them could still let themselves in. A <Link href="/lock/rekey" className={linkClass}>lock rekey</Link> changes the pins inside your existing lock so the old keys stop working, and we can cut spare keys at the same visit.</p>,
          <p key="2">Not sure which job you need? Our <Link href="/lock" className={linkClass}>Auckland lock services</Link> page compares lockouts, rekeys, repairs and lock changes.</p>
        ]}
        theme="light"
        align="left"
      />

      <FAQSection
        title="Residential Lockout FAQs"
        subtitle="Straight answers to the questions we hear most on lockout calls."
        faqs={faqs}
        theme="dark"
      />
    </div>
  );
}
