import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';

export const metadata: Metadata = {
  title: 'Auckland Smart System Upgrades',
  description: 'Upgrade your commercial or residential property with modern smart lock systems. Professional installation and integration across New Zealand.',
  keywords: 'Smart Lock Installation, Electronic Locks, Digital Keypad, Access Control Upgrade, web design, web development, Falcon Access',
  openGraph: {
    title: 'Auckland Smart System Upgrades',
    description: 'Upgrade your commercial or residential property with modern smart lock systems. Professional installation and integration across New Zealand.',
    url: 'https://falconaccess.co.nz/smart-lock-change',
  }
};

export default function SmartLockChangePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock-change/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock-change",
        "name": "Smart Lock Installation | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Services", "item": "https://falconaccess.co.nz/smart-lock" },
          { "@type": "ListItem", "position": 3, "name": "Smart Lock Upgrades", "item": "https://falconaccess.co.nz/smart-lock/smart-lock-change" }
        ]
      },
      {
        "@type": "Service",
        "name": "Smart Lock Upgrade & Installation",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Professional upgrade and installation of smart locks for commercial and residential doors."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Will a smart lock fit on my existing door?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In most cases, yes. The majority of modern smart locks are designed to fit standard door preparations. We can assess your door and make any necessary adjustments during installation."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if the battery dies or the power goes out?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most smart locks are battery-operated and will not be affected by a home power outage. They also provide ample low-battery warnings. Many models feature a physical key backup or external battery jump terminals."
            }
          },
          {
            "@type": "Question",
            "name": "Can you integrate the lock with my existing smart home system?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, depending on the lock model and your current hub (like Z-Wave, Zigbee, or Wi-Fi systems), we can ensure proper integration during the setup process."
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
        title="Auckland Smart System Upgrades"
        subtitle="Professional electronic and smart lock installations. We service Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        title="Intelligent Access Control"
        content={[
          <p key="1">Upgrading to electronic and smart access systems is a vital step in modernising both commercial facilities and residential homes. We provide robust, end-to-end installation services for a wide variety of digital hardware.</p>,
          <p key="2">Transitioning away from traditional physical keys not only enhances your convenience but allows for detailed tracking, temporary access codes, and immediate revocation of privileges without the need for manual hardware rekeying.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-change/smart-lock-replacement-auckland.webp"
        imageAlt="Modern smart lock installed on a front door"
        imageTitle="Smart Lock Replacement"
        imageDescription="Upgrading outdated mechanical locks to high-security electronic smart lock systems."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Professional Installation Matters"
        content={[
          <p key="1">While many smart locks are heavily marketed as simple DIY projects, improper installation can lead to binding mechanisms, heavily reduced battery life, and severely compromised security.</p>,
          <p key="2">Our property maintenance team completely understands these complexities, much like a seasoned team handles complex web development and flawless web design. We ensure that the door frame, latch hole, and strike plate are perfectly aligned for a truly reliable setup.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        title="Seamless Digital Integration"
        content={[
          <p key="1">We don&apos;t just screw the hardware into the door; we take the necessary time to securely mount the system and actively assist you with the initial network configuration.</p>,
          <p key="2">Experience the absolute convenience of keyless entry today. We charge a highly transparent <strong>$20 flat call-out fee</strong> to evaluate and upgrade your property anywhere in Auckland.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-change/commercial-smart-lock-upgrade.webp"
        imageAlt="Smartphone connecting to a smart lock"
        imageTitle="Commercial Smart Lock Upgrades"
        imageDescription="Securing commercial premises with robust, modern keyless entry replacements."
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Advantages of Smart Hardware"
        subtitle="Enhance the functionality and security of your building."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: 'Keyless Entry Options',
            description: "Eliminate the hassle of lost physical keys. Enter using PIN codes, biometric scanners, or smartphone applications."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
            title: 'Access Tracking & Monitoring',
            description: "Monitor exactly who enters your commercial facility and at what time, providing vital oversight for business managers."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            title: 'Temporary Guest Codes',
            description: "Generate temporary codes for contractors, cleaners, or guests that automatically expire after a scheduled duration."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Smart Lock Upgrade FAQs"
        subtitle="Common questions about smart lock upgrades."
        faqs={[
          {
            question: "Will a smart lock fit on my existing door?",
            answer: "In most cases, yes. The majority of modern smart locks are designed to fit standard door preparations. We can assess your door and make any necessary adjustments during installation."
          },
          {
            question: "What happens if the battery dies or the power goes out?",
            answer: "Most smart locks are battery-operated and will not be affected by a home power outage. They also provide ample low-battery warnings. Many models feature a physical key backup or external battery jump terminals."
          },
          {
            question: "Can you integrate the lock with my existing smart home system?",
            answer: "Yes, depending on the lock model and your current hub (like Z-Wave, Zigbee, or Wi-Fi systems), we can ensure proper integration during the setup process."
          }
        ]}
        theme="dark"
      />

    </div>
  );
}
