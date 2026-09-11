import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Smart Lock Diagnostics & Repair',
  description: 'Expert diagnostics and repair for smart locks and electronic access systems. Restore functionality to your commercial or residential property.',
  keywords: 'Smart Lock Repair, Electronic Lock Diagnostics, Keypad Repair, Access Control Fix, Falcon Access',
  openGraph: {
    title: 'Smart Lock Diagnostics & Repair | Falcon Access',
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
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Repair", "item": "https://falconaccess.co.nz/smart-lock-repair" }
        ]
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
    <div className="w-full pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 animate-text-blurb-ready animate-play-text">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
          Smart System Diagnostics
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Expert troubleshooting and repair for electronic and smart access hardware.
        </p>
      </div>

      <PhotoContentSection
        title="Restoring Digital Access"
        content={[
          <p key="1">When a smart lock or electronic access system fails, it can completely disrupt the flow of your commercial facility or leave your home vulnerable. These modern systems require specialized knowledge that goes beyond traditional mechanical hardware.</p>,
          <p key="2">Our property maintenance experts are equipped to troubleshoot both the physical mechanisms and the electronic components of your smart hardware, providing comprehensive diagnostics to get your system back online quickly.</p>
        ]}
        imageSrc="/images/services/smart-lock-repair-and-programming_photo.webp"
        imageAlt="Cartoonish illustration representing electronic hardware diagnostics"
        ctaText="Request a Diagnostic ($20 Call Out)"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Identifying the Root Cause"
        content={[
          <p key="1">Smart hardware issues often present as electronic failures (like a dead keypad or lost Wi-Fi connection) when the underlying cause is actually mechanical. A slightly misaligned door can force the lock&apos;s motor to work overtime, rapidly draining batteries and eventually burning out the mechanism.</p>,
          <p key="2">We take a practical, holistic approach to repair. Instead of immediately replacing expensive electronic boards, we assess the entire door structure to ensure the physical alignment is perfect before addressing network or power issues.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Common Electronic Issues"
        subtitle="We troubleshoot and repair a wide range of smart system faults."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "Motor Fatigue",
            description: "Resolving mechanical friction and realigning strike plates so the internal motor can operate smoothly without draining power."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
            title: "Connectivity Drops",
            description: "Diagnosing unresponsive keypads and troubleshooting lost connections to your local Wi-Fi or smart home hub."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
            title: "System Resets",
            description: "Performing hard factory resets for malfunctioning units and assisting with reprogramming access codes and network settings."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
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
