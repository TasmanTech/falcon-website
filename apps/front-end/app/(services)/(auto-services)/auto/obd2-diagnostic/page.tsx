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
    canonical: "/auto/obd2-diagnostic",
  },
  title: 'Mobile Auto Electrical Diagnostics Auckland',
  description: 'Professional OBDII diagnostic scanning in Auckland. We quickly identify engine error codes to help you make informed repair decisions.',
  keywords: 'OBDII diagnostic, OBD2 scan, auto repair, check engine light, Auckland, Falcon Access',
  openGraph: {
    title: 'Mobile Auto Electrical Diagnostics Auckland',
    description: 'Professional OBDII diagnostic scanning in Auckland. We quickly identify engine error codes to help you make informed repair decisions.',
    url: "/auto/obd2-diagnostic",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

const faqs = [
  {
    question: "What does an OBDII scanner actually do?",
    answer: "It plugs into your car's diagnostic port and reads the standardised trouble codes (DTCs) stored by the engine computer. Those codes show which system triggered the warning light and give a clear starting point for finding the cause."
  },
  {
    question: "Can you clear the check engine light?",
    answer: "Yes, we can clear the light for you. If the underlying problem hasn't been fixed, though, the light will come back on within the next few drives, so clearing it only makes sense once the cause is sorted."
  },
  {
    question: "Do you perform the necessary repairs?",
    answer: "We handle some minor electrical issues ourselves. For most mechanical faults, we give you the codes and a plain English explanation so you can go to a mechanic knowing what to ask for."
  },
  {
    question: "Is it safe to keep driving with the check engine light on?",
    answer: "It depends on the fault. A steady light usually means something needs attention soon but isn't an emergency. A flashing light often points to a serious misfire, so stop driving when it's safe and get it checked."
  },
  {
    question: "How much does a diagnostic scan cost?",
    answer: "There's a flat NZ$20 call-out fee to come to you, and the scan is quoted before we start. Work outside normal hours costs a bit more, and we'll tell you up front."
  }
];

export default function obd2Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/auto/obd2-diagnostic/#webpage",
        "url": "https://falconaccess.co.nz/auto/obd2-diagnostic",
        "name": "OBDII Diagnostic Scanning | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/auto/obd2-diagnostic#service" }
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
        "@id": "https://falconaccess.co.nz/auto/obd2-diagnostic#service",
        "url": "https://falconaccess.co.nz/auto/obd2-diagnostic",
        "serviceType": "OBD2 diagnostic scan",
        "name": "OBDII Diagnostic Scanning",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Mobile OBDII diagnostic scanning to identify check engine light codes across Auckland.",
        "areaServed": { "@type": "City", "name": "Auckland" }
      },
      {
        "@type": "FAQPage",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
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
      <JsonLd id="schema-obd2-diagnostic-page" schema={jsonLd} />

      <PageHeaderSection
        title="Mobile Auto Electrical Diagnostics Auckland"
        subtitle="Check engine light on? We come to you, read the fault codes and explain them in plain English. We cover Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />

      <PhotoContentSection
        priority
        imageSrc="/images/services/auto/obd2-diagnostic/obd2-diagnostic-scan-tablet-auckland.webp"
        imageAlt="Handheld OBD2 diagnostic scan tablet with an orange connector cable"
        imageTitle="OBD2 Vehicle Diagnostics Auckland"
        imageDescription="A professional OBD2 scan tablet that reads live fault codes from your car's computer on site."
        title="Understand Your Vehicle's Faults"
        content={[
          <p key="1">A <em>Check Engine</em> light is unsettling, especially when the car seems to drive fine. It could be something small, or an early warning of a bigger problem. Rather than guess, an OBDII scan reads what your car&apos;s computer has actually recorded.</p>,
          <p key="2">Our auto diagnostics are part of our <Link href="/auto" className={linkClass}>mobile auto services</Link>, so we come to you at home, at work or wherever the car is parked. We plug our scan tool into the diagnostic port, usually under the dashboard, and read the codes on the spot.</p>,
          <p key="3">We charge a flat <strong>NZ$20 call-out fee</strong> to come to you, and the scan is quoted before we start. Call us on <a href="tel:+6492431404" className="text-brand-accent underline hover:text-brand-accent/80 transition-colors">+64 9 243 1404</a>.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="What a Scan Tells You, and What It Doesn't"
        content={[
          <p key="1">Your car&apos;s engine computer keeps an eye on dozens of sensors. When a reading goes outside its normal range, it stores a diagnostic trouble code and often switches on a warning light. A scan reads those codes, along with live data such as coolant temperature and oxygen sensor readings.</p>,
          <p key="2">A code is a starting point, not a final answer. A misfire code tells you which cylinder is misfiring, but not always whether the cause is a spark plug, a coil or fuel delivery. We&apos;re upfront about that, and we&apos;ll tell you how sure we are of the cause.</p>,
          <p key="3">Some problems don&apos;t set a code at all, such as worn brakes, suspension noises or most mechanical wear. A scan is no substitute for a mechanic&apos;s inspection there, and we&apos;ll tell you when that&apos;s the better next step.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/services/auto/obd2-diagnostic/handheld-obd2-car-code-reader.webp"
        imageAlt="Handheld OBD2 car code reader with a 16-pin connector cable"
        imageTitle="Car Code Reader"
        imageDescription="A handheld code reader for quick checks when a warning light comes on."
        title="Plain English Results You Can Act On"
        content={[
          <p key="1">Once the scan is done, we explain each code in plain English: what&apos;s likely causing it, how urgent it is, and whether it&apos;s sensible to keep driving. The cause might be as simple as a loose fuel cap or as specific as a faulty sensor.</p>,
          <p key="2">Walking into a garage already knowing the code puts you in a stronger position. You can ask the right questions, compare quotes and avoid paying for guesswork.</p>,
          <p key="3">We handle some minor electrical issues ourselves. For mechanical repairs, we give you the information a mechanic needs to get started.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Flat Batteries and Warning Lights"
        content={[
          <p key="1">Not every warning light means engine trouble. A weak or recently flat battery can confuse a car&apos;s electronics and light up the dash, and some of those faults stay stored as codes after the car is running normally again.</p>,
          <p key="2">If your car struggled to start before the lights came on, our <Link href="/auto/dead-battery-assistance" className={linkClass}>jump start and battery check</Link> is often the better first step. We get it running, test the battery and alternator, then scan for any codes still there.</p>,
          <p key="3">We&apos;re a mobile repair and locksmith business, so the same team can help with a <Link href="/car-lockout" className={linkClass}>car lockout</Link> or a <Link href="/lock/lockout" className={linkClass}>house lockout</Link> too. One number covers the lot.</p>
        ]}
        theme="light"
        align="left"
      />

      <CTASection
        theme="catchy"
        title="Warning Light On?"
        description="We come to you anywhere in Auckland to read the fault codes and explain what they mean."
        buttonText="Book a Diagnostic"
      />

      <IconListSection
        title="What We Scan For"
        subtitle="Clear information from your car's engine control unit."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'P-Code Interpretation',
            description: "We read standard and manufacturer-specific P-codes, the ones that switch on your check engine light, and tell you what each one means."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Live Data Monitoring',
            description: "We can watch live engine data, such as oxygen sensor voltages and coolant temperature, which helps track down faults that come and go."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: 'Code Clearing',
            description: "Once a fault is fixed, we can clear the stored codes and turn off the dash light. If the cause is still there, the light will come back."
          }
        ]}
        theme="white"
      />

      <FAQSection
        title="OBD2 Diagnostic Code FAQs"
        subtitle="Common questions about our diagnostic scanning."
        faqs={faqs}
        theme="dark"
      />
    </div>
  );
}
