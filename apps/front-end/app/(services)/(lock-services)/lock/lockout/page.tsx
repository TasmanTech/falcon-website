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
    canonical: "/lock/lockout",
  },
  title: 'Emergency Lockout Services Auckland Wide',
  description: 'Fast, reliable commercial and residential lockout assistance across Auckland. We prioritise practical, non-destructive entry methods 24/7.',
  keywords: 'Lockout Services, Residential Lockout Service, Commercial Lockout Service, Door Unlocking Service, Lock Opener Service, Emergency Locksmith, Locksmith Emergency Services, 24 Hour Locksmith, Auckland, Non-destructive entry, Commercial lockout, web design, web development, Falcon Access',
  openGraph: {
    title: 'Emergency Lockout Services Auckland Wide',
    description: 'Fast, reliable commercial and residential lockout assistance across Auckland. We prioritise practical, non-destructive entry methods 24/7.',
    url: "/lock/lockout",
  }
};

export default function LockoutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lockout/#webpage",
        "url": "https://falconaccess.co.nz/lockout",
        "name": "Emergency Lockout Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Lockout Services", "item": "https://falconaccess.co.nz/lock/lockout" }
        ]
      },
      {
        "@type": "Service",
        "name": "Emergency Lockout Services",
        "provider": {
          "@id": "https://falconaccess.co.nz/#organization"
        },
        "description": "Fast, reliable commercial and residential lockout assistance across Auckland."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you arrive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We understand the urgency of a lockout. We prioritise emergency calls and strive to reach your commercial or residential property in Auckland as quickly as possible."
            }
          },
          {
            "@type": "Question",
            "name": "Will my door or lock be damaged?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our primary goal is non-destructive entry. In the vast majority of cases, we can regain access without causing any damage to your existing hardware or defence mechanisms."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to prove I own the property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, for security and liability reasons, we require a basic form of identification to verify your authorisation to access the premises before we begin work."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id="schema-lockout-page" schema={jsonLd} />

      <PageHeaderSection
        title="Emergency Lockout Services Auckland Wide"
        subtitle="Fast, reliable emergency lockout assistance. We respond quickly across Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        imageSrc="/images/services/lock/lockout/residential-lockout-service-auckland.webp"
        imageAlt="Professional lock bypass tools on a commercial door"
        imageTitle="Residential Lockout Service"
        imageDescription="Emergency door unlocking services for homes and apartments using non-destructive methods."
        title="Rapid Response When It Matters Most"
        content={[
          <p key="1">Being locked out of your home or shop is stressful. It stops your day and leaves you unsafe. We offer a fast residential lockout service and commercial lockout service across Auckland.</p>,
          <p key="2">We charge a clear and cheap <strong>$20 flat call-out fee</strong>. There are no long waits or hidden costs. We are a 24 hour locksmith service, so you can call us day or night.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Secure and Accessible"
        content={[
          <p key="1">We know a good business needs to be open. A web team keeps a site online with good web design. We make sure your real doors are open when you need them.</p>,
          <p key="2">Our work is very honest and practical. We keep up with new lock tech. This helps us handle advanced access systems with ease.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        imageSrc="/images/services/lock/lockout/emergency-door-unlocking-tools.webp"
        imageAlt="Non-destructive entry techniques used by professionals"
        imageTitle="Emergency Unlocking Tools"
        imageDescription="Precision lock picking and bypassing techniques to safely grant access to your property."
        title="Non-Destructive Techniques"
        content={[
          <p key="1">We use safe entry methods first. This saves you the cost of buying new parts. Your physical safety is key, and we strive to keep it intact.</p>,
          <p key="2">We do not drill or break locks right away. Our door unlocking service uses special tools to open locks safely. This keeps your doors safe, saving you time and cash.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Our Lockout Process"
        subtitle="A straightforward, transparent approach to regaining access to your property."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'Immediate Dispatch',
            description: "Call our direct line at +64 9 243 1404. We strictly prioritise emergency maintenance requests and dispatch our highly trained team promptly to your specific location anywhere in Auckland."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Authorization Verification',
            description: "For optimal security, we quickly verify your authorisation to access the property before beginning any entry procedures. This protects you and your valuable assets."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>,
            title: 'Non-Destructive Entry',
            description: "We utilise professional, state-of-the-art tools to safely restore access. If a mechanism has critically failed, we can repair or replace it entirely on the spot to re-secure your premises."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Residential Lockout FAQs"
        subtitle="Common questions about our highly responsive lockout assistance."
        faqs={[
          {
            question: "How quickly can you arrive?",
            answer: "We understand the intense urgency of a lockout. We prioritise emergency calls and strive to reach your commercial or residential property in Auckland as quickly as humanly possible."
          },
          {
            question: "Will my door or lock be damaged?",
            answer: "Our primary goal is always non-destructive entry. In the vast majority of cases, we can regain access without causing any damage whatsoever to your existing hardware."
          },
          {
            question: "Do I need to prove I own the property?",
            answer: "Yes, for strict security and liability reasons, we absolutely require a basic form of identification to verify your authorisation to access the premises before we begin any work."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
