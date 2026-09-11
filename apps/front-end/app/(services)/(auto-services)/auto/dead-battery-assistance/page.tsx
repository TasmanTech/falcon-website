import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Dead Battery Assistance',
  description: "Fast and reliable dead battery assistance in New Zealand. Our expert team will help you get your vehicle back on the road safely.",
  keywords: 'dead battery, jump start',
  openGraph: {
    title: 'Dead Battery Assistance',
    description: 'Quick dead battery assistance and jump starts to get you back on the road safely.',
    url: 'https://falconaccess.co.nz/auto/dead-battery-assistance',
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
        "name": "Dead Battery Assistance",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Dead Battery Assistance", "item": "https://falconaccess.co.nz/auto/dead-battery-assistance" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you arrive to jump start my car?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We prioritize dead battery calls to ensure rapid dispatch. Our team typically arrives quickly, getting you back on the road without long delays."
            }
          },
          {
            "@type": "Question",
            "name": "Is it safe to jump start modern vehicles?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We use professional-grade jump starter packs equipped with surge protection to prevent damage to your vehicle's sensitive ECU and electronics."
            }
          },
          {
            "@type": "Question",
            "name": "What if the battery won't hold a charge?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If a jump start is unsuccessful, we can perform on-the-spot diagnostics. We can often help arrange a replacement or tow if the battery is completely failed."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 animate-text-blurb-ready animate-play-text">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
          Dead Battery Assistance
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Fast and reliable jump starts to get you back on the road safely.
        </p>
      </div>

      <PhotoContentSection
        imageSrc="/images/services/dead-battery_photo.webp"
        imageAlt="Cartoonish illustration of a car battery with jumper cables attached"
        imageTitle="Professional Jump Starts"
        title="Quick & Reliable Starts"
        content={[
          <p key="1">A dead battery can happen to anyone, leaving you stranded at the worst possible time. Our team provides fast, professional jump starts with a clear <strong>$20 flat call-out fee</strong>.</p>,
          <p key="2">We use heavy-duty, surge-protected equipment designed to safely start both standard and high-performance modern vehicles without risking damage to the delicate onboard electronics.</p>
        ]}
        ctaText="Request Jump Start ($20 Call Out)"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Safety First Diagnostics"
        content={[
          <p key="1">Modern cars are essentially rolling computers. Improperly jump-starting a vehicle using cheap jumper cables can cause power surges that fry critical control modules, leading to incredibly expensive repairs.</p>,
          <p key="2">Our equipment strictly controls the voltage delivery. If the battery is deeply discharged, we carefully monitor the electrical load, ensuring a smooth and safe start every time.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Our Jump Start Process"
        subtitle="How we get you moving again."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "Rapid Dispatch",
            description: "We prioritize emergency calls so you aren't left waiting by the side of the road."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Surge Protection",
            description: "Advanced jump packs with built-in safeguards to protect your car's sensitive electronics."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
            title: "Battery Health Check",
            description: "We verify the alternator is charging and assess if the battery simply needs replacing."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about our jump start service."
        faqs={[
          {
            question: "How quickly can you arrive to jump start my car?",
            answer: "We prioritize dead battery calls to ensure rapid dispatch. Our team typically arrives quickly, getting you back on the road without long delays."
          },
          {
            question: "Is it safe to jump start modern vehicles?",
            answer: "Yes. We use professional-grade jump starter packs equipped with surge protection to prevent damage to your vehicle's sensitive ECU and electronics."
          },
          {
            question: "What if the battery won't hold a charge?",
            answer: "If a jump start is unsuccessful, we can perform on-the-spot diagnostics. We can often help arrange a replacement or tow if the battery is completely failed."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
