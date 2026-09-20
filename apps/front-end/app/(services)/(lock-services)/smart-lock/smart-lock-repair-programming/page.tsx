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
    canonical: '/smart-lock/smart-lock-repair-programming',
  },
  title: 'Auckland Smart System Diagnostics',
  description: 'Expert diagnostics and repair for smart locks and electronic access systems. Restore functionality to your commercial or residential property.',
  keywords: 'Smart Lock Repair, Electronic Lock Diagnostics, Keypad Repair, Access Control Fix, web design, web development, Falcon Access',
  openGraph: {
    title: 'Auckland Smart System Diagnostics',
    description: 'Expert diagnostics and repair for smart locks and electronic access systems. Restore functionality to your commercial or residential property.',
    url: 'https://falconaccess.co.nz/smart-lock-repair',
  }
};

export default function SmartLockRepairPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock-repair/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock-repair",
        "name": "Smart Lock Diagnostics & Repair | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Services", "item": "https://falconaccess.co.nz/smart-lock" },
          { "@type": "ListItem", "position": 3, "name": "Diagnostics & Repair", "item": "https://falconaccess.co.nz/smart-lock/smart-lock-repair-programming" }
        ]
      },
      {
        "@type": "Service",
        "name": "Smart Lock Diagnostics & Repair",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Expert diagnostics and repair for smart locks and electronic access systems."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I know if my smart lock is broken or just out of batteries?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most smart locks will flash a red light or emit a specific beep when the battery is low. If replacing the batteries with fresh, high-quality ones doesn't resolve the issue, the motor or electronic board may require professional repair."
            }
          },
          {
            "@type": "Question",
            "name": "Can you fix a smart lock that keeps jamming?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Jamming is often a mechanical issue caused by a misaligned strike plate rather than an electronic failure. We can realign the door frame to eliminate friction and restore smooth motor operation."
            }
          },
          {
            "@type": "Question",
            "name": "Are smart lock repairs more expensive than standard hardware?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It depends on the issue. Mechanical realignments cost the same as standard doors. If an internal electronic component has failed, we will provide a transparent estimate to determine if repair or replacement is the more economical choice."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id="schema-smart-lock-repair-programming-page" schema={jsonLd} />

      <PageHeaderSection 
        title="Auckland Smart System Diagnostics"
        subtitle="Expert troubleshooting for electronic hardware. We service Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        title="Restoring Digital Access"
        content={[
          <p key="1">A broken smart lock can stop your work or leave your home at risk. These new systems need special skills. They are not like old locks.</p>,
          <p key="2">Our team is ready to fix both the lock parts and the digital parts. We find the issue fast to get your system back online.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-repair-programming/smart-lock-repair-programming-auckland.webp"
        imageAlt="Troubleshooting an electronic lock keypad"
        imageTitle="Smart Lock Repair Auckland"
        imageDescription="Expert diagnostic and repair services for commercial and residential smart lock systems."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Identifying the Root Cause"
        content={[
          <p key="1">Many smart lock faults look like digital bugs. But the real cause is often physical. A bad door fit makes the lock motor work too hard. This drains the power and breaks the lock.</p>,
          <p key="2">We take a real, full look at the repair. Good web design needs good code. A smart lock needs a good door fit. We make sure the door is right before we fix the tech.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        title="Comprehensive Electronic Solutions"
        content={[
          <p key="1">We look at the whole door first. We do not just buy new parts right away. This smart way saves our clients time and cash.</p>,
          <p key="2">If you have issues with your smart locks, call us today. We charge a clear <strong>$20 flat call-out fee</strong> to look at the fault on-site in Auckland.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-repair-programming/smart-lock-integration-specialists.webp"
        imageAlt="Testing smart lock connectivity on a smartphone"
        imageTitle="Smart Lock Programming"
        imageDescription="Reprogramming and system integration for keyless entry and access control systems."
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Common Electronic Issues"
        subtitle="We troubleshoot and repair a wide range of smart system faults."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'Mechanical Friction Resolution',
            description: "Resolving mechanical friction and realigning strike plates so the internal motor can operate smoothly without draining power."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
            title: 'Network Troubleshooting',
            description: "Diagnosing unresponsive keypads and troubleshooting lost connections to your local Wi-Fi or smart home hub."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
            title: 'Factory Resets & Programming',
            description: "Performing hard factory resets for malfunctioning units and assisting with reprogramming access codes and network settings."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Smart Lock Repair & Sync FAQs"
        subtitle="Common questions about electronic hardware repair."
        faqs={[
          {
            question: "How do I know if my smart lock is broken or just out of batteries?",
            answer: "Most smart locks will flash a red light or emit a specific beep when the battery is low. If replacing the batteries with fresh, high-quality ones doesn't resolve the issue, the motor or electronic board may require professional repair."
          },
          {
            question: "Can you fix a smart lock that keeps jamming?",
            answer: "Yes. Jamming is often a mechanical issue caused by a misaligned strike plate rather than an electronic failure. We can realign the door frame to eliminate friction and restore smooth motor operation."
          },
          {
            question: "Are smart lock repairs more expensive than standard hardware?",
            answer: "It depends on the issue. Mechanical realignments cost the same as standard doors. If an internal electronic component has failed, we will provide a transparent estimate to determine if repair or replacement is the more economical choice."
          }
        ]}
        theme="dark"
      />

    </div>
  );
}
