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
    canonical: "/car-lockout",
  },
  title: 'Auckland Emergency Car Lockout Service',
  description: 'Fast, non-destructive vehicle lockout assistance across Auckland. Our mobile fleet offers after-hours support to get you back on the road safely and quickly.',
  keywords: 'Car Lockout, Auto Locksmith, Auckland, Vehicle Lockout, Falcon Access',
  openGraph: {
    title: 'Auckland Emergency Car Lockout Service',
    description: 'Fast, non-destructive vehicle lockout assistance across Auckland. Our mobile fleet offers after-hours support to get you back on the road safely and quickly.',
    url: "/car-lockout",
  }
};

export default function CarLockoutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/car-lockout/#webpage",
        "url": "https://falconaccess.co.nz/car-lockout",
        "name": "Car Lockout Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
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
        "name": "Car Lockout Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Fast, non-destructive vehicle lockout assistance across Auckland."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can you open my specific make and model?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our tools and techniques are effective on the vast majority of modern and classic vehicles, regardless of the manufacturer."
            }
          },
          {
            "@type": "Question",
            "name": "Will gaining entry damage my car's paint or weather stripping?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We use specialised, protective tools designed specifically to bypass the lock mechanism without scratching the paint or tearing the weather seals."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to prove ownership of the vehicle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. For legal and security reasons, we require a valid form of identification and proof of ownership or authorisation to access the vehicle before we begin."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id="schema-car-lockout-page" schema={jsonLd} />

      <PageHeaderSection
        title="Auckland Emergency Car Lockout"
        subtitle="Fast, non-destructive vehicle entry. Our mobile responders cover Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        priority
        imageSrc="/images/services/car-lockout/car-door-handle-lock-pick-tool.webp"
        imageAlt="Stainless steel lock pick tool beside a black car door handle"
        imageTitle="Auckland Car Lockout Service"
        imageDescription="Precision tools that open a car door lock without damaging the paint, seals or lock."
        title="Fast & Reliable Car Lockout Services"
        content={[
          <p key="1">Being locked out of your car is bad. Our team gives fast car lockout help. We use safe ways to get you back on the road fast.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Professional Solutions for Your Vehicle"
        content={[
          <p key="1">New cars need special care. Our team knows auto locks well. Your safety is our main goal.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/services/car-lockout/car-lockout-kit-air-wedge-reach-tool.webp"
        imageAlt="Car lockout kit with a long-reach tool, blue inflatable air wedge and door wedge"
        imageTitle="Damage-Free Vehicle Entry"
        imageDescription="The air wedge and long-reach tool we use to open locked cars without scratches or torn weather seals."
        title="Damage-Free Entry Guaranteed"
        content={[
          <p key="1">We care about the safety of your car. We use new tools to give safe entry for all cars. Trust our team to do the job right.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <CTASection
        theme="catchy"
        title="Locked Out of Your Car?"
        description="Call us now. We come to you anywhere in Auckland, with a $20 call-out fee and no fix, no fee."
        buttonText="Call +64 9 243 1404"
        buttonHref="tel:+6492431404"
      />

      <IconListSection
        title="Why Choose Our Car Lockout Service"
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: 'After-Hours Support',
            description: "Locked out late? We are still on call."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            title: 'Expert Technicians',
            description: "Highly trained professionals for every job."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'Fast Response Time',
            description: "We arrive promptly to get you moving again."
          }
        ]}
        theme="white"
      />

      <FAQSection
        title="Emergency Car Lockout FAQs"
        subtitle="Common questions about our vehicle lockout services."
        faqs={[
          {
            question: "Can you open my specific make and model?",
            answer: "Yes, our tools and techniques are effective on the vast majority of modern and classic vehicles, regardless of the manufacturer."
          },
          {
            question: "Will gaining entry damage my car's paint or weather stripping?",
            answer: "No. We use specialised, protective tools designed specifically to bypass the lock mechanism without scratching the paint or tearing the weather seals."
          },
          {
            question: "Do I need to prove ownership of the vehicle?",
            answer: "Yes. For legal and security reasons, we require a valid form of identification and proof of ownership or authorisation to access the vehicle before we begin."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
