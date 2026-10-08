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
    canonical: "/auto/dead-battery-assistance",
  },
  title: 'Jump Start Service Auckland',
  description: 'Car jump start service across Auckland. Flat battery call-outs for 12V and 24V vehicles, with a battery check and a flat NZ$20 call-out fee.',
  keywords: 'Dead Battery Assistance, Jump Start Auckland, Car Jump Start Service, Flat Battery Call-Out Auckland, Jump Start Near Me, Mobile Battery Service, Auto Electric, Falcon Access',
  openGraph: {
    title: 'Jump Start Service Auckland',
    description: 'Car jump start service across Auckland. Flat battery call-outs for 12V and 24V vehicles, with a battery check and a flat NZ$20 call-out fee.',
    url: "/auto/dead-battery-assistance",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

const faqs = [
  {
    question: "How quickly can you arrive to jump start my car?",
    answer: "We treat flat battery calls as a priority and come to you anywhere in Auckland. How soon we get there depends on where you are, so call us and we'll give you an honest idea on the phone."
  },
  {
    question: "Is it safe to jump start modern vehicles?",
    answer: "Yes, when it's done properly. We use a professional jump starter pack with built-in surge protection to protect your car's ECU and electronics, rather than leads from another car."
  },
  {
    question: "What if the battery won't hold a charge?",
    answer: "If a jump start doesn't hold, we check the battery and alternator on the spot and tell you what we find. If the battery has failed, we can help you arrange a replacement or a tow."
  },
  {
    question: "How much does a jump start cost?",
    answer: "There's a flat NZ$20 call-out fee, and the jump start is quoted before we begin. Work outside normal hours costs a bit more, and we'll tell you before we start."
  },
  {
    question: "What should I do after a jump start?",
    answer: "Keep the engine running and take the car for a decent drive, ideally half an hour or more on open road, so the alternator can recharge the battery. Then get the battery tested, especially if it was slow to start before it went flat."
  }
];

export default function DeadBatteryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/auto/dead-battery-assistance/#webpage",
        "url": "https://falconaccess.co.nz/auto/dead-battery-assistance",
        "name": "Jump Start Service Auckland | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/auto/dead-battery-assistance#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Auto Services", "item": "https://falconaccess.co.nz/auto" },
          { "@type": "ListItem", "position": 3, "name": "Dead Battery Assistance", "item": "https://falconaccess.co.nz/auto/dead-battery-assistance" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/auto/dead-battery-assistance#service",
        "url": "https://falconaccess.co.nz/auto/dead-battery-assistance",
        "serviceType": "Jump start and dead battery assistance",
        "name": "Dead Battery Assistance",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Fast dead battery jump starts and diagnostics across Auckland.",
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
      <JsonLd id="schema-dead-battery-assistance-page" schema={jsonLd} />

      <PageHeaderSection
        title="Jump Start Service Auckland"
        subtitle="Flat battery? We come to you with a surge-protected jump starter anywhere in Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />

      <PhotoContentSection
        priority
        imageSrc="/images/services/auto/dead-battery-assistance/jump-leads-on-car-battery-auckland.webp"
        imageAlt="Car battery with red and black jump leads clamped to its terminals"
        imageTitle="Dead Battery Jump Start Auckland"
        imageDescription="Jump leads connected to a flat 12-volt car battery for a fast mobile jump start."
        title="Flat Battery Call-Outs, Wherever You Are"
        content={[
          <p key="1">A flat battery never picks a good moment. Maybe the lights were left on overnight, the car has sat unused for a few weeks, or the battery is simply getting old. Whatever the reason, our <Link href="/auto" className={linkClass}>mobile auto services</Link> bring a portable jump starter to you, at home, at work or on the roadside.</p>,
          <p key="2">We jump start both 12V and 24V systems. Once the engine is running, we check the battery and the charging system, so you know whether you can trust the car tomorrow morning.</p>,
          <p key="3">Every flat battery call-out starts with the same <strong>NZ$20 call-out fee</strong>, and the jump start itself is quoted before we begin. Call us on <a href="tel:+6492431404" className="text-brand-accent underline hover:text-brand-accent/80 transition-colors">+64 9 243 1404</a> and we&apos;ll get a technician on the way.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Is It the Battery? Signs to Look For"
        content={[
          <p key="1">A few signs point to a flat or failing battery:</p>,
          <ul key="2" className="list-disc pl-6 space-y-2">
            <li>Rapid clicking when you turn the key or press start, but the engine doesn&apos;t turn over</li>
            <li>A slow, lazy crank that sounds like the engine is struggling</li>
            <li>Dim or flickering dash lights, or a dash that lights up and then dies when you try to start</li>
            <li>A remote and central locking that don&apos;t respond at all</li>
          </ul>,
          <p key="3">That last one can leave you locked out as well as flat. Our <Link href="/car-lockout" className={linkClass}>car lockout service</Link> gets you in without damage, and then we sort the battery.</p>,
          <p key="4">If the engine cranks at a normal speed but won&apos;t fire, the battery probably isn&apos;t the problem. We&apos;ll tell you that honestly rather than jump start a car that doesn&apos;t need it.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/services/auto/dead-battery-assistance/portable-jump-starter-pack-clamps.webp"
        imageAlt="Portable jump starter pack with red and black battery clamps"
        imageTitle="Mobile Battery Assistance"
        imageDescription="The portable jump starter we bring to get your car running again at home, work or the roadside."
        title="Surge-Protected Equipment"
        content={[
          <p key="1">Modern cars are full of electronics, from the engine computer to the touchscreen. A careless jump start, with leads on the wrong way or a sudden voltage spike, can damage those parts and leave you with a big repair bill.</p>,
          <p key="2">That&apos;s why we use a portable jump starter pack with built-in surge protection, not another car and an old set of leads. It feeds controlled power to your battery, and we connect it in the right order every time.</p>,
          <p key="3">If the battery is very low, we watch the load as it comes back up rather than cranking the engine over and over. It&apos;s a gentler start for the battery and the car.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Jump Start or a Battery That's Done?"
        content={[
          <p key="1">A jump start gets the engine running, but it can&apos;t fix a battery at the end of its life. If yours went flat because a light was left on, a jump and a good drive usually sort it out. If it keeps going flat, or it&apos;s several years old, it&apos;s probably on its way out.</p>,
          <p key="2">With the engine running, we test that the alternator is charging and check how well the battery holds up. If it won&apos;t hold a charge, we&apos;ll say so plainly and help you arrange a replacement or a tow if you need one.</p>,
          <p key="3">If warning lights stay on after the car starts, or it doesn&apos;t feel right, our <Link href="/auto/obd2-diagnostic" className={linkClass}>OBD2 diagnostic scan</Link> reads the fault codes. A deep flat can leave stored codes behind, and a scan sorts the real faults from the leftovers.</p>,
          <p key="4">Flat battery at home and locked out of the house too? Our <Link href="/lock/lockout" className={linkClass}>house lockout service</Link> gets you back inside without damage.</p>
        ]}
        theme="light"
        align="left"
      />

      <CTASection
        theme="catchy"
        title="Flat Battery?"
        description="Call us for a mobile jump start anywhere in Auckland. We charge a NZ$20 call-out fee."
        buttonText="Call +64 9 243 1404"
        buttonHref="tel:+6492431404"
      />

      <IconListSection
        title="Our Jump Start Process"
        subtitle="How we get you moving again quickly and safely."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'Tell Us About the Car',
            description: "Let us know the make and model, where it's parked and what happened when you tried to start it. We treat flat battery calls as a priority."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Surge-Protected Start',
            description: "We connect our jump starter pack, with its built-in safeguards, so your car's electronics stay protected while we get the engine going."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
            title: 'Alternator & Battery Testing',
            description: "With the engine running, we check the alternator is charging and tell you whether the battery just needs a good drive or is due for replacement."
          }
        ]}
        theme="white"
      />

      <FAQSection
        title="Jump Start & Dead Battery FAQs"
        subtitle="Common questions about our mobile jump start service."
        faqs={faqs}
        theme="dark"
      />
    </div>
  );
}
