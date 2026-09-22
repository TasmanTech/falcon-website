import { Metadata } from 'next';
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
  title: 'Auckland Jump Starts & Battery Help',
  description: 'Fast, professional 12V and 24V jump starts across Auckland. Our equipped response vehicles get your dead battery running safely and quickly.',
  keywords: 'Dead Battery Assistance, Jump Start Auckland, Mobile Battery Service, Auto Electric, Falcon Access',
  openGraph: {
    title: 'Auckland Jump Starts & Battery Help',
    description: 'Fast dead battery jump starts across Auckland. Our mobile fleet safely revives your vehicle battery using surge-protected equipment.',
    url: "/auto/dead-battery-assistance",
  }
};

export default function DeadBatteryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/auto/dead-battery-assistance/#webpage",
        "url": "https://falconaccess.co.nz/auto/dead-battery-assistance",
        "name": "Dead Battery Assistance | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
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
        "name": "Dead Battery Assistance",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Fast dead battery jump starts and diagnostics across Auckland."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you arrive to jump start my car?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We prioritise dead battery calls to ensure rapid dispatch. Our mobile fleet typically arrives quickly anywhere in Auckland, getting you back on the road without long delays."
            }
          },
          {
            "@type": "Question",
            "name": "Is it safe to jump start modern vehicles?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We use professional-grade jump starter packs equipped with advanced surge protection to completely prevent damage to your vehicle's sensitive ECU and electronics."
            }
          },
          {
            "@type": "Question",
            "name": "What if the battery won't hold a charge?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If a standard jump start is unsuccessful, we perform on-the-spot diagnostics. We can often help arrange a replacement or tow if the battery has completely failed."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id="schema-dead-battery-assistance-page" schema={jsonLd} />

      <PageHeaderSection
        title="Auckland Mobile Jump Starts"
        subtitle="Fast and reliable mobile jump starts. Our mobile fleet services Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        imageSrc="/images/services/auto/dead-battery-assistance/dead-battery-jump-start-auckland.webp"
        imageAlt="Professional car battery jump start service"
        imageTitle="Dead Battery Jump Start"
        imageDescription="Emergency mobile vehicle jump start assistance to get you back on the road quickly."
        title="Quick & Reliable Engine Starts"
        content={[
          <p key="1">A dead battery can happen to anyone. It can leave you stuck at a bad time. We give fast jump starts across Auckland. We charge a clear <strong>$20 flat call-out fee</strong>.</p>,
          <p key="2">Don&apos;t wait for hours for a tow truck. Call us directly at <a href="tel:+6492431404" className="text-brand-accent underline hover:text-brand-accent/80 transition-colors">+64 9 243 1404</a> and we will dispatch a technician immediately.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Safety First Diagnostics"
        content={[
          <p key="1">New cars are like big computers. A bad jump start can cause huge power spikes. These spikes can fry parts and hurt the car. This leads to high repair costs.</p>,
          <p key="2">Our tools carefully control the power to your car. We care about this just like a good web team cares about web design. Safe power is our main goal.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        imageSrc="/images/services/auto/dead-battery-assistance/mobile-battery-assistance-vehicle.webp"
        imageAlt="Surge-protected jump starter packs"
        imageTitle="Mobile Battery Assistance"
        imageDescription="Our equipped mobile response vehicles carry high-capacity jump packs for all engine sizes."
        title="Surge-Protected Equipment"
        content={[
          <p key="1">We use strong, safe tools to start cars. We can start both standard and fast new cars. We do this without hurting the car parts.</p>,
          <p key="2">If the battery is very low, our team will watch the power load. We give a smooth and safe start every single time.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Our Jump Start Process"
        subtitle="How we get you moving again quickly and safely."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'Rapid Emergency Response',
            description: "We strictly prioritise emergency calls so you aren't left waiting by the side of the road. Our Auckland mobile fleet responds quickly."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Surge-Protected Equipment',
            description: "We utilise advanced jump packs with built-in safeguards to completely protect your car's sensitive electronics during the jump start."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
            title: 'Alternator & Battery Testing',
            description: "After starting, we verify the alternator is successfully charging and assess if the battery simply needs to be replaced."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Jump Start & Dead Battery FAQs"
        subtitle="Common questions about our mobile jump start service."
        faqs={[
          {
            question: "How quickly can you arrive to jump start my car?",
            answer: "We prioritise dead battery calls to ensure rapid dispatch. Our mobile fleet typically arrives quickly anywhere in Auckland, getting you back on the road without long delays."
          },
          {
            question: "Is it safe to jump start modern vehicles?",
            answer: "Yes. We use professional-grade jump starter packs equipped with advanced surge protection to completely prevent damage to your vehicle's sensitive ECU and electronics."
          },
          {
            question: "What if the battery won't hold a charge?",
            answer: "If a standard jump start is unsuccessful, we perform on-the-spot diagnostics. We can often help arrange a replacement or tow if the battery has completely failed."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
