import { Metadata } from 'next';
import Link from 'next/link';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';
import JsonLd from '@/components/JsonLd';

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

const faqs = [
  {
    question: "Do you provide emergency car lockout assistance?",
    answer: "Yes. We offer non-destructive car lockout help across Auckland, including after-hours emergency support. Before we open a vehicle, we'll ask for ID and proof that you own it or are allowed to use it."
  },
  {
    question: "What is an OBDII diagnostic?",
    answer: "An OBDII diagnostic reads the fault codes stored in your car's onboard computer. It shows which system triggered a warning light, and we explain what the codes mean in plain English."
  },
  {
    question: "Do you come to me?",
    answer: "Yes, all our auto services are mobile. We come to your home, your workplace or wherever the car is parked across Auckland City, the North Shore, West, East and South Auckland."
  },
  {
    question: "How much do your auto services cost?",
    answer: "There's a flat NZ$20 call-out fee. The job itself is quoted on site, depends on your vehicle and what it needs, and is agreed with you before we start."
  },
  {
    question: "Do you do mechanical repairs?",
    answer: "No, we're not a mechanical workshop. We handle car lockouts, jump starts and diagnostic scans, plus some minor electrical issues, and we'll tell you when a fault needs a mechanic."
  }
];

export const metadata: Metadata = {
  alternates: {
    canonical: "/auto",
  },
  title: 'Mobile Auto Locksmith Auckland',
  description: 'Reliable mobile automotive assistance in Auckland. We provide car lockouts, OBDII diagnostics, and dead battery jump starts, with after-hours support.',
  keywords: 'Auto Services, Car Lockout, OBDII Diagnostic, Dead Battery Assistance, Auckland, Falcon Access',
  openGraph: {
    title: 'Mobile Auto Locksmith Auckland',
    description: 'Reliable mobile automotive assistance in Auckland. We provide car lockouts, OBDII diagnostics, and dead battery jump starts, with after-hours support.',
    url: "/auto",
  }
};

export default function AutoServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/auto/#webpage",
        "url": "https://falconaccess.co.nz/auto",
        "name": "Auto Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/auto#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Auto Services", "item": "https://falconaccess.co.nz/auto" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/auto#service",
        "url": "https://falconaccess.co.nz/auto",
        "serviceType": "Mobile auto services",
        "name": "Auto Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Mobile car lockouts, jump starts and OBDII diagnostic scans across Auckland.",
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
      <JsonLd id="schema-auto-page" schema={jsonLd} />
      <PageHeaderSection
        title="Mobile Auto Locksmith Auckland"
        subtitle="Car lockouts, flat batteries and warning lights, sorted where your car is. We come to you across Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Link href="/car-lockout" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play">
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Car Lockout</h2>
              <p className="text-brand-dark/70 text-sm">Fast, non-destructive entry when you have locked your keys inside your vehicle or the boot.</p>
            </div>
          </Link>
          <Link href="/auto/obd2-diagnostic" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">OBDII Diagnostic</h2>
              <p className="text-brand-dark/70 text-sm">Professional diagnostic code reading to clearly identify underlying vehicle engine issues.</p>
            </div>
          </Link>
          <Link href="/auto/dead-battery-assistance" className="block group">
            <div className="bg-white border border-brand-dark/10 rounded-xl p-8 h-full hover:border-brand-accent transition-colors flex flex-col items-center text-center animate-card-ready animate-play" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Dead Battery Assist</h2>
              <p className="text-brand-dark/70 text-sm">Prompt, surge-protected jump-starts and battery checks to get your car running again safely.</p>
            </div>
          </Link>
        </div>
      </div>

      <PhotoContentSection
        priority
        imageSrc="/images/services/auto/car-rev-counter-gauge-auto-services.webp"
        imageAlt="Round car rev counter gauge with a chrome bezel and red needle"
        imageTitle="Mobile Auto Services Auckland"
        imageDescription="Mobile auto services across Auckland, from car lockouts and flat batteries to OBD2 diagnostic scans."
        title="Mobile Auto Help Across Auckland"
        content={[
          <p key="1">Car trouble rarely happens somewhere convenient. Our mobile auto services come to you, whether the car is in your driveway, outside work or in a supermarket car park. We bring the tools to the car, so the everyday problems don&apos;t need a tow or a trip to a workshop.</p>,
          <p key="2">Most of our auto calls are lockouts: keys on the front seat, keys in the boot, or a remote that has stopped working. After that come flat batteries and dashboard warning lights, which is where a jump start or a diagnostic scan helps.</p>,
          <p key="3">Auto work sits alongside our commercial and residential repair and maintenance, including <Link href="/lock" className={linkClass}>locksmith services</Link> for homes and businesses, so one call covers a lot.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Which Service Do You Need?"
        content={[
          <p key="1">If you can&apos;t get into the car at all, start with a car lockout. If you can get in but nothing happens when you turn the key, or you only hear clicking, it&apos;s usually a flat battery. If the car runs but a warning light has come on, a diagnostic scan is the place to start.</p>,
          <p key="2">Sometimes it&apos;s more than one. A flat car battery can stop the remote and central locking working, so you end up locked out and flat at the same time. We work out what&apos;s going on when we arrive and explain it before we do anything.</p>,
          <p key="3">We&apos;re not a mechanical workshop. If a scan points to a bigger mechanical fault, we&apos;ll explain it plainly so you can take the car to a mechanic knowing what to ask for.</p>
        ]}
        theme="dark"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/services/auto/car-key-remote-fob-auto-locksmith.webp"
        imageAlt="Black flip car key with a remote fob on a key ring"
        imageTitle="Auto Locksmith Help"
        imageDescription="Our auto locksmith service helps Auckland drivers get back into their car and back on the road."
        title="Roadside Help When You Need It"
        content={[
          <p key="1">Keys locked in the car or the boot? Our <Link href="/car-lockout" className={linkClass}>emergency car lockout service</Link> gets you back in without damage to the paint or door seals. We&apos;ll ask for ID and proof you own or can use the car before we open it. Lost the only key? We also cut replacement car keys, including many chipped keys, so ask when you call.</p>,
          <p key="2">Car won&apos;t start? We offer <Link href="/auto/dead-battery-assistance" className={linkClass}>mobile jump starts and battery checks</Link> using surge-protected equipment. A warning light on the dash? Our <Link href="/auto/obd2-diagnostic" className={linkClass}>OBD2 diagnostic scan</Link> reads the fault codes, and we explain them in plain English.</p>,
          <p key="3">Locked out of the house rather than the car? Our <Link href="/lock/lockout" className={linkClass}>home lockout service</Link> takes the same careful, non-destructive approach to house, apartment and office doors.</p>
        ]}
        ctaText="Call for Help"
        ctaHref="tel:+6492431404"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Pricing and Hours"
        content={[
          <p key="1">Every job starts with a flat <strong>NZ$20 call-out fee</strong>. After that, car lockouts are priced on site by the vehicle and the entry method, and jump starts and scans are quoted before we begin. You agree the price before any work starts.</p>,
          <p key="2">We&apos;re available Monday to Saturday 7 am to 9 pm and Sunday 7 am to 7 pm, with after-hours emergency support outside those times. Work outside normal hours costs a bit more, and we&apos;ll tell you before we start.</p>,
          <p key="3">Not urgent? <Link href="/contact" className={linkClass}>Send us a request</Link> with a few details about the car and where it is, and we&apos;ll get back to you.</p>
        ]}
        theme="white"
        align="left"
      />

      <CTASection
        theme="catchy"
        title="Need Help With Your Vehicle?"
        description="Car lockouts, jump starts and fault code checks across Auckland, with a NZ$20 call-out fee."
        buttonText="Call +64 9 243 1404"
        buttonHref="tel:+6492431404"
      />

      <FAQSection
        title="Auto Services FAQs"
        subtitle="Common questions about our mobile auto services."
        faqs={faqs}
        theme="light"
      />
    </div>
  );
}
