import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'OBDII Diagnostic Scanning',
  description: 'Professional OBDII diagnostic scanning in Auckland. We quickly identify engine error codes to help you make informed repair decisions.',
  keywords: 'obdii diagnostic, auto repair, check engine light, Auckland, web design',
  openGraph: {
    title: 'OBDII Diagnostic Scanning | Falcon Access',
    description: 'Professional OBDII diagnostic scanning in Auckland. We quickly identify engine error codes to help you make informed repair decisions.',
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
        "name": "OBDII Diagnostic Scanning | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Auto Services", "item": "https://falconaccess.co.nz/auto" },
          { "@type": "ListItem", "position": 3, "name": "OBDII Diagnostic", "item": "https://falconaccess.co.nz/auto/obdii-diagnostic" }
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
    <div className="w-full pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 animate-text-blurb-ready animate-play-text">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
          OBDII Diagnostic Scanning
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Stop guessing why that warning light is on. Get a precise diagnostic readout today.
        </p>
      </div>

      <PhotoContentSection
        imageSrc="/images/services/obdii_photo.webp"
        imageAlt="Cartoonish illustration of a handheld OBDII diagnostic scanner tool"
        imageTitle="Professional Diagnostic Scanning"
        title="Understand Your Vehicle's Faults"
        content={[
          <p key="1">A sudden <em>Check Engine</em> light can be incredibly alarming. Instead of taking expensive guesses at what might be wrong, our mobile OBDII diagnostic scanning provides clear, accurate data directly from your vehicle&apos;s computer. We travel Auckland wide to deliver this service quickly.</p>,
          <p key="2">We operate with a simple and completely transparent <strong>$20 flat call-out fee</strong> to come directly to your location. We plug in our state-of-the-art diagnostic scanner and tell you exactly what the trouble code means in plain English.</p>,
          <p key="3">We provide detailed, readable reports. Think of it like a web developer debugging a broken piece of web design—we find the exact line of code causing the issue so it can be fixed properly. Contact us at <a href="tel:+6492431404" className="text-brand-accent hover:underline">+64 9 243 1404</a>.</p>
        ]}
        ctaText="Book a Scan"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Knowledge is Power"
        content={[
          <p key="1">Taking your car to a mechanic without knowing the underlying issue can often lead to overcharging or unnecessary repairs. A preliminary scan arms you with the specific diagnostic trouble code (DTC), putting you firmly in control.</p>,
          <p key="2">Whether the issue is a loose petrol cap, a faulty oxygen sensor, or a severe cylinder misfire, knowing the exact error code lets you make smart, informed decisions about your vehicle&apos;s maintenance and repair programme.</p>
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
            description: "We quickly read and expertly interpret standard and manufacturer-specific P-codes that trigger your dash light."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Live Sensor Data",
            description: "We can monitor real-time engine telemetry, such as O2 sensor voltages and vital coolant temperatures."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: "Emissions Readiness",
            description: "We check if your vehicle's internal monitors are fully ready to pass a standard New Zealand emissions inspection."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
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
