import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Smart Lock Installation',
  description: 'Upgrade your commercial or residential property with modern smart lock systems. Professional installation and integration across New Zealand.',
  keywords: 'Smart Lock Installation, Electronic Locks, Digital Keypad, Access Control Upgrade, Falcon Access',
  openGraph: {
    title: 'Smart Lock Installation | Falcon Access',
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
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Installation", "item": "https://falconaccess.co.nz/smart-lock-change" }
        ]
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
    <div className="w-full pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 animate-text-blurb-ready animate-play-text">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
          Smart System Upgrades
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Modernize your property access with professional electronic and smart lock installations.
        </p>
      </div>

      <PhotoContentSection
        title="Intelligent Access Control"
        content={[
          <p key="1">Upgrading to electronic and smart access systems is a vital step in modernizing both commercial facilities and residential homes. We provide end-to-end installation services for a wide variety of digital hardware.</p>,
          <p key="2">Transitioning away from traditional physical keys not only enhances convenience but allows for detailed tracking, temporary access codes, and immediate revocation of privileges without the need for hardware rekeying.</p>
        ]}
        imageSrc="/images/services/smart-lock-change_photo.webp"
        imageAlt="Cartoonish illustration representing digital keypads and electronic access"
        ctaText="Request an Upgrade ($20 Call Out)"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Professional Installation Matters"
        content={[
          <p key="1">While many smart locks are marketed as DIY projects, improper installation can lead to binding mechanisms, reduced battery life, and compromised security.</p>,
          <p key="2">Our property maintenance team ensures that the door frame, latch hole, and strike plate are perfectly aligned. We take the time to securely mount the hardware and assist with the initial network configuration, providing a truly reliable setup.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Advantages of Smart Hardware"
        subtitle="Enhance the functionality and security of your building."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: "Keyless Convenience",
            description: "Eliminate the hassle of lost physical keys. Enter using PIN codes, biometric scanners, or smartphone applications."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
            title: "Audit Trails",
            description: "Monitor exactly who enters your commercial facility and at what time, providing vital oversight for business managers."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            title: "Temporary Access",
            description: "Generate temporary codes for contractors, cleaners, or guests that automatically expire after a scheduled duration."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
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
