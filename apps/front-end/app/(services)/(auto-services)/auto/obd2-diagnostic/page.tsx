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
    canonical: '/auto/obd2-diagnostic',
  },
  title: 'Mobile Auto Electrical Diagnostics Auckland',
  description: 'Professional OBDII diagnostic scanning in Auckland. We quickly identify engine error codes to help you make informed repair decisions.',
  keywords: 'OBDII diagnostic, auto repair, check engine light, Auckland, web design, web development, Falcon Access',
  openGraph: {
    title: 'Mobile Auto Electrical Diagnostics Auckland',
    description: 'Professional OBDII diagnostic scanning in Auckland. We quickly identify engine error codes to help you make informed repair decisions.',
    url: 'https://falconaccess.co.nz/auto/obd2-diagnostic',
  }
};

export default function obd2Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/auto/obd2-diagnostic/#webpage",
        "url": "https://falconaccess.co.nz/auto/obd2-diagnostic",
        "name": "OBDII Diagnostic Scanning | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Auto Services", "item": "https://falconaccess.co.nz/auto" },
          { "@type": "ListItem", "position": 3, "name": "OBDII Diagnostic", "item": "https://falconaccess.co.nz/auto/obd2-diagnostic" }
        ]
      },
      {
        "@type": "Service",
        "name": "OBDII Diagnostic Scanning",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Mobile OBDII diagnostic scanning to identify check engine light codes across Auckland."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does an OBDII scanner actually do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An OBDII scanner plugs directly into your vehicle's computer port to read standardized diagnostic trouble codes (DTCs). This tells us exactly why a warning light has illuminated on your dashboard."
            }
          },
          {
            "@type": "Question",
            "name": "Can you clear the check engine light?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we can clear the light for you. However, if the underlying mechanical or electrical issue hasn't been fixed, the light will simply turn back on during your next drive cycle."
            }
          },
          {
            "@type": "Question",
            "name": "Do you perform the necessary repairs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide the accurate diagnostic data so you know exactly what is wrong. While we handle some minor electrical issues, we primarily arm you with the information you need before visiting a mechanic."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id="schema-obd2-diagnostic-page" schema={jsonLd} />

      <PageHeaderSection
        title="Mobile Auto Electrical Diagnostics Auckland"
        subtitle="Precise mobile vehicle diagnostics. Our technicians service Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        imageSrc="/images/services/auto/obd2-diagnostic/obd2-vehicle-diagnostic-auckland.webp"
        imageAlt="Professional OBDII diagnostic scanner tool"
        imageTitle="OBD2 Vehicle Diagnostics"
        imageDescription="Comprehensive OBD2 electronic diagnostics to identify engine fault codes and dashboard warnings."
        title="Understand Your Vehicle's Faults"
        content={[
          <p key="1">A sudden <em>Check Engine</em> light is scary. Do not take expensive guesses. Our mobile OBDII scan gives clear data from your car. We travel all over Auckland to do this fast.</p>,
          <p key="2">We operate with a simple and completely transparent <strong>$20 flat call-out fee</strong> to come directly to your location. Contact us at <a href="tel:+6492431404" className="text-brand-accent hover:underline">+64 9 243 1404</a>.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Detailed Reports & Knowledge"
        content={[
          <p key="1">Going to a shop without knowing the fault is risky. You might pay too much. A quick scan gives you the exact error code. This puts you in control.</p>,
          <p key="2">We give clear reports. Think of it like a web team fixing bad web design. We find the exact code causing the issue. Then you can fix the car properly.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        imageSrc="/images/services/auto/obd2-diagnostic/car-code-reader-diagnostics.webp"
        imageAlt="Reading diagnostic trouble codes from a vehicle"
        imageTitle="Car Code Reader Services"
        imageDescription="Using professional-grade OBD2 scan tools to accurately diagnose vehicle computer issues."
        title="Empowering Repair Decisions"
        content={[
          <p key="1">The issue might be a loose gas cap or a bad sensor. Knowing the exact code is smart. It helps you make good choices about your car.</p>,
          <p key="2">We plug in our great scan tool. We tell you what the code means in plain words. This ensures you are ready for any repairs.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="What We Scan For"
        subtitle="Comprehensive data retrieval from your engine control unit."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'P-Code Interpretation',
            description: "We quickly read and expertly interpret standard and manufacturer-specific P-codes that trigger your dash light."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Live Telemetry Monitoring',
            description: "We can monitor real-time engine telemetry, such as O2 sensor voltages and vital coolant temperatures."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: 'Emissions Readiness Check',
            description: "We check if your vehicle's internal monitors are fully ready to pass a standard New Zealand emissions inspection."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="OBD2 Diagnostic Code FAQs"
        subtitle="Common questions about our diagnostic scanning."
        faqs={[
          {
            question: "What does an OBDII scanner actually do?",
            answer: "An OBDII scanner plugs directly into your vehicle's computer port to read standardized diagnostic trouble codes (DTCs). This tells us exactly why a warning light has illuminated on your dashboard."
          },
          {
            question: "Can you clear the check engine light?",
            answer: "Yes, we can clear the light for you. However, if the underlying mechanical or electrical issue hasn't been fixed, the light will simply turn back on during your next drive cycle."
          },
          {
            question: "Do you perform the necessary repairs?",
            answer: "We provide the accurate diagnostic data so you know exactly what is wrong. While we handle some minor electrical issues, we primarily arm you with the information you need before visiting a mechanic."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
