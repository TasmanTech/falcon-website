import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';

export const metadata: Metadata = {
  title: 'Auckland Emergency Car Lockout Service',
  description: 'Fast, non-destructive vehicle lockout assistance across Auckland. Our 24/7 mobile fleet gets you back on the road safely and quickly.',
  keywords: 'Car Lockout, Auto Locksmith, Auckland, Vehicle Lockout, web design, web development, Falcon Access',
  openGraph: {
    title: 'Auckland Emergency Car Lockout Service',
    description: 'Fast, non-destructive vehicle lockout assistance across Auckland. Our 24/7 mobile fleet gets you back on the road safely and quickly.',
    url: 'https://falconaccess.co.nz/car-lockout',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeaderSection
        title="Auckland Emergency Car Lockout"
        subtitle="Fast, non-destructive vehicle entry. Our mobile responders cover Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        imageSrc="/images/services/car-lockout/auckland-emergency-car-lockout-technician.webp"
        imageAlt="Technician providing safe car lockout assistance"
        imageTitle="Auckland Car Lockout Service"
        imageDescription="Mobile technician providing emergency, non-destructive car lockout assistance across Auckland."
        title="Fast & Reliable Car Lockout Services"
        content={[
          <p key="1">Getting locked out of your vehicle is frustrating. Our commercial and residential repair and maintenance team provides fast and professional car lockout assistance. We use safe techniques to get you back on the road quickly.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Professional Solutions for Your Vehicle"
        content={[
          <p key="1">Modern vehicles require specialized care. Our trained technicians understand the intricacies of auto locks and security systems. We deliver top-tier service alongside our web design and web development offerings. Your satisfaction and security are our highest priorities.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        imageSrc="/images/services/car-lockout/damage-free-vehicle-entry-tools.webp"
        imageAlt="Damage-free vehicle entry tools"
        imageTitle="Damage-Free Vehicle Entry"
        imageDescription="Specialized vehicle entry tools ensuring no damage to your car paint or weather stripping."
        title="Damage-Free Entry Guaranteed"
        content={[
          <p key="1">We prioritize the safety of your vehicle. Using the latest tools, we guarantee a damage-free entry for all car models. Trust our comprehensive repair and maintenance experts to handle the job with precision.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Why Choose Our Car Lockout Service"
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: 'Auckland Emergency Car Lockout Service',
            description: "We are ready to help you at any time."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            title: 'Auckland Emergency Car Lockout Service',
            description: "Highly trained professionals for every job."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'Auckland Emergency Car Lockout Service',
            description: "We arrive promptly to get you moving again."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Frequently Asked Questions"
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
