import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'OBDII Diagnostic',
  description: "Professional OBDII diagnostic services to quickly identify and resolve your vehicle's engine issues using state-of-the-art tools.",
  keywords: 'obdii diagnostic, auto repair',
  openGraph: {
    title: 'OBDII Diagnostic',
    description: 'Professional OBDII diagnostic services for your vehicle to quickly identify and resolve error codes.',
    url: 'https://falconaccess.co.nz/auto/obdii-diagnostic',
  }
};

export default function OBDIIPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/auto/obdii-diagnostic/#webpage",
        "url": "https://falconaccess.co.nz/auto/obdii-diagnostic",
        "name": "OBDII Diagnostic",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "OBDII Diagnostic", "item": "https://falconaccess.co.nz/auto/obdii-diagnostic" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does an OBDII scanner actually do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An OBDII scanner plugs into your vehicle's computer port to read standardized diagnostic trouble codes (DTCs), which tell us exactly why a warning light has illuminated on your dashboard."
            }
          },
          {
            "@type": "Question",
            "name": "Can you clear the check engine light?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we can clear the light. However, if the underlying mechanical or electrical issue hasn't been fixed, the light will simply turn back on during your next drive cycle."
            }
          },
          {
            "@type": "Question",
            "name": "Do you perform the necessary repairs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide the accurate diagnostic data so you know exactly what's wrong. While we handle some minor electrical issues, we primarily arm you with the information you need before visiting a mechanic."
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
          OBDII Diagnostic
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Stop guessing why that warning light is on. Get a precise diagnostic readout.
        </p>
      </div>

      <PhotoContentSection
        imageSrc="/images/services/obdii_photo.webp"
        imageAlt="Cartoonish illustration of a handheld OBDII diagnostic scanner tool"
        imageTitle="Professional Diagnostic Scanning"
        title="Understand Your Vehicle"
        content={[
          <p key="1">A sudden <em>Check Engine</em> light can be alarming. Instead of taking expensive guesses at what might be wrong, our OBDII diagnostic scanning provides clear, accurate data directly from your vehicle&apos;s computer.</p>,
          <p key="2">We operate with a simple and transparent <strong>$20 flat call-out fee</strong> to come directly to your location, plug in our state-of-the-art diagnostic scanner, and tell you exactly what the trouble code means.</p>
        ]}
        ctaText="Book a Scan ($20 Call Out)"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Knowledge is Power"
        content={[
          <p key="1">Taking your car to a mechanic without knowing the underlying issue can often lead to overcharging or unnecessary repairs. A preliminary scan arms you with the specific diagnostic trouble code (DTC).</p>,
          <p key="2">Whether it&apos;s a loose gas cap, a faulty oxygen sensor, or a cylinder misfire, knowing the exact error code puts you in control of your vehicle&apos;s maintenance and repair decisions.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="What We Scan For"
        subtitle="Comprehensive data retrieval from your engine control unit."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "Check Engine Lights",
            description: "Read and interpret standard and manufacturer-specific P-codes triggering your dash light."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Live Sensor Data",
            description: "Monitor real-time engine telemetry like O2 sensor voltages and coolant temperatures."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: "Emissions Readiness",
            description: "Check if your vehicle's monitors are ready to pass a standard emissions inspection."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about our diagnostic scans."
        faqs={[
          {
            question: "What does an OBDII scanner actually do?",
            answer: "An OBDII scanner plugs into your vehicle's computer port to read standardized diagnostic trouble codes (DTCs), which tell us exactly why a warning light has illuminated on your dashboard."
          },
          {
            question: "Can you clear the check engine light?",
            answer: "Yes, we can clear the light. However, if the underlying mechanical or electrical issue hasn't been fixed, the light will simply turn back on during your next drive cycle."
          },
          {
            question: "Do you perform the necessary repairs?",
            answer: "We provide the accurate diagnostic data so you know exactly what's wrong. While we handle some minor electrical issues, we primarily arm you with the information you need before visiting a mechanic."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
