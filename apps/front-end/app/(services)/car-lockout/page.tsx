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
    canonical: "/car-lockout",
  },
  title: 'Auckland Emergency Car Lockout Service',
  description: 'Non-destructive car lockout help across Auckland, with after-hours support. Keys in the car or boot, or a dead remote? We come to you and get you back in.',
  keywords: 'Car Lockout, Car Locksmith, Locked Keys in Car, Vehicle Unlocking, Car Door Unlock, Auto Locksmith, Auckland, Vehicle Lockout, Keys Locked in Car, Falcon Access',
  openGraph: {
    title: 'Auckland Emergency Car Lockout Service',
    description: 'Non-destructive car lockout help across Auckland, with after-hours support. Keys in the car or boot, or a dead remote? We come to you and get you back in.',
    url: "/car-lockout",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

const faqs = [
  {
    question: "Can you open my specific make and model?",
    answer: "In most cases, yes. We open a wide range of modern and older cars. Tell us the make and model when you call and we'll explain what's involved."
  },
  {
    question: "Will gaining entry damage my car's paint or weather stripping?",
    answer: "We use non-destructive entry wherever possible, with protective tools that ease the door open without scratching the paint or tearing the rubber seals. We don't drill or force the lock."
  },
  {
    question: "Do I need to prove ownership of the vehicle?",
    answer: "Yes. Before we open a vehicle, we'll ask for photo ID and proof that you own it or are allowed to use it, such as the registration papers or a rental agreement. It's standard practice that protects you."
  },
  {
    question: "How much does a car lockout cost?",
    answer: "There's a flat NZ$20 call-out fee. The entry itself is priced on site, based on your vehicle and the method it needs, and we agree the price with you before we start. Work outside normal hours costs a bit more, and we'll tell you up front."
  },
  {
    question: "My remote won't unlock the car. Is it the fob or the car battery?",
    answer: "It could be either. If the interior lights and dashboard are dead too, the car battery is probably flat. If not, the fob battery is the likely culprit. Try the spare key or the key blade first."
  }
];

export default function CarLockoutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/car-lockout/#webpage",
        "url": "https://falconaccess.co.nz/car-lockout",
        "name": "Car Lockout Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/car-lockout#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Vehicle Lockout", "item": "https://falconaccess.co.nz/car-lockout" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/car-lockout#service",
        "url": "https://falconaccess.co.nz/car-lockout",
        "serviceType": "Car lockout service",
        "name": "Car Lockout Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Non-destructive car lockout help across Auckland for keys locked in the car or boot, dead remotes and unresponsive central locking.",
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
      <JsonLd id="schema-car-lockout-page" schema={jsonLd} />

      <PageHeaderSection
        title="Auckland Emergency Car Lockout"
        subtitle="Keys locked in the car? We come to you anywhere in Auckland City, the North Shore, West, East and South Auckland, and get you back in without damage."
      />

      <PhotoContentSection
        priority
        imageSrc="/images/services/car-lockout/car-door-handle-lock-pick-tool.webp"
        imageAlt="Stainless steel lock pick tool beside a black car door handle"
        imageTitle="Auckland Car Lockout Service"
        imageDescription="Precision tools that open a car door lock without damaging the paint, seals or lock."
        title="Keys Locked in the Car?"
        content={[
          <p key="1">It always happens at the worst moment. You shut the door with the keys on the seat, or leave them in the boot with the shopping, and the car locks itself. As a mobile car locksmith and part of our <Link href="/auto" className={linkClass}>mobile auto services</Link>, we come to you, at home, at work, in a car park or on the roadside. We handle unlocking vehicles on the spot, so there&apos;s no tow and no trip to a dealer.</p>,
          <p key="2">The situations we see most often are:</p>,
          <ul key="3" className="list-disc pl-6 space-y-2">
            <li>Keys locked inside the car, on the seat, in a bag or still in the ignition</li>
            <li>Keys locked in the boot, which is trickier on cars where the boot only opens from the remote or a button inside</li>
            <li>A remote or fob with a flat battery, so the buttons do nothing</li>
            <li>Central locking that won&apos;t respond at all, even with the right key</li>
          </ul>,
          <p key="4">We charge a flat <strong>NZ$20 call-out fee</strong> to come to you. The entry itself is quoted on site, so you know the price before we touch the car.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Why Central Locking Stops Working"
        content={[
          <p key="1">If your remote suddenly stops working, think about the car battery as well as the fob. Central locking needs power. When the car battery goes flat, the remote, the interior lights and the electric locks can all die at once, and the car stays locked.</p>,
          <p key="2">In that case we get you in through the door first, then look at the battery. Our <Link href="/auto/dead-battery-assistance" className={linkClass}>dead battery assistance</Link> covers a safe, surge-protected jump start and a check of the battery and alternator, so you aren&apos;t stuck twice in one day.</p>,
          <p key="3">If only the fob battery is flat, the key blade in the driver&apos;s door will usually still open the car. Many fobs hide a small metal key, so check for one before you call.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/services/car-lockout/car-lockout-kit-air-wedge-reach-tool.webp"
        imageAlt="Car lockout kit with a long-reach tool, blue inflatable air wedge and door wedge"
        imageTitle="Damage-Free Vehicle Entry"
        imageDescription="The air wedge and long-reach tool we use to open locked cars without scratches or torn weather seals."
        title="How We Open Your Car Without Damage"
        content={[
          <p key="1">We use non-destructive entry wherever possible. That usually means a soft inflatable air wedge to ease the top of the door open a few millimetres, then a long-reach tool to press the unlock button or lift the handle from inside.</p>,
          <p key="2">We protect the paint and the rubber door seals as we work, and we don&apos;t drill or force the lock. Once you&apos;re in, we check the doors lock and unlock properly and that your key and remote still work as they should.</p>,
          <p key="3">Most modern and older cars can be opened this way. Some vehicles with deadlocking or extra security need a different approach, and we&apos;ll explain your options before we start.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="What Affects the Price"
        content={[
          <p key="1">The call-out is a flat NZ$20. After that, car lockouts are priced on site by the vehicle and the entry method it needs. Keys on the seat of a common hatchback are usually straightforward. A car with deadlocks, or keys in a boot that only opens electrically, takes more time.</p>,
          <p key="2">We&apos;re available Monday to Saturday 7 am to 9 pm and Sunday 7 am to 7 pm, with after-hours emergency support outside those times. Work outside normal hours costs a bit more, and we&apos;ll tell you before we start.</p>,
          <p key="3">If a warning light stays on after a flat battery, our <Link href="/auto/obd2-diagnostic" className={linkClass}>OBD2 diagnostic scan</Link> reads the fault codes and explains them in plain English. House keys locked in the car too? Our <Link href="/lock/lockout" className={linkClass}>house lockout service</Link> can get you inside at home as well.</p>
        ]}
        theme="light"
        align="left"
      />

      <CTASection
        theme="catchy"
        title="Locked Out of Your Car?"
        description="Call us now. We come to you anywhere in Auckland, with a NZ$20 call-out fee and no fix, no fee."
        buttonText="Call +64 9 243 1404"
        buttonHref="tel:+6492431404"
      />

      <IconListSection
        title="What to Have Ready When You Call"
        subtitle="A few details help us bring the right tools and get you back in sooner."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            title: 'Make and Model',
            description: "Tell us the make, model and rough age of the car, and where the keys are, so we bring the right tools."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: 'Exactly Where You Are',
            description: "A street address, car park level or landmark makes us easy to find. Beside a busy road? Wait somewhere safe."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'ID and Proof of Ownership',
            description: "Before we open a vehicle, we'll ask for photo ID and proof you own it or are allowed to use it, such as the registration or a rental agreement."
          }
        ]}
        theme="white"
      />

      <FAQSection
        title="Emergency Car Lockout FAQs"
        subtitle="Common questions about our vehicle lockout services."
        faqs={faqs}
        theme="dark"
      />
    </div>
  );
}
