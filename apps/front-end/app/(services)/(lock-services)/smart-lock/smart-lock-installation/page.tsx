import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Fresh Smart Lock Installation',
  description: 'Professional fresh installation of smart lock systems for commercial and residential properties. Get your doors correctly prepped and secured.',
  keywords: 'Smart Lock Installation, Fresh Installation, Door Prep, Electronic Locks, Falcon Access',
  openGraph: {
    title: 'Fresh Smart Lock Installation | Falcon Access',
    description: 'Professional fresh installation of smart lock systems for commercial and residential properties. Get your doors correctly prepped and secured.',
    url: 'https://falconaccess.co.nz/smart-lock-installation',
  }
};

export default function SmartLockInstallationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock-installation/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock-installation",
        "name": "Fresh Smart Lock Installation | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Fresh Installation", "item": "https://falconaccess.co.nz/smart-lock-installation" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can you install a smart lock on a brand new door without existing holes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. A fresh installation means we precision-drill the necessary bore holes and strike plates into a blank door to accommodate your new smart lock perfectly."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle the network setup for the smart lock?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, part of our professional installation service includes ensuring the lock is properly connected to your Wi-Fi, Bluetooth, or smart home hub."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a fresh installation take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Drilling and prepping a fresh door takes slightly longer than a simple replacement. Typically, we allocate 1 to 2 hours per door for a complete, accurate setup."
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
          Fresh Smart Lock Installation
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Precision preparation and setup for brand new doors and complete system overhauls.
        </p>
      </div>

      <PhotoContentSection
        title="Starting From Scratch"
        content={[
          <p key="1">Whether you are fitting out a new commercial office, building an extension, or simply replacing an old, damaged door with a blank one, a fresh smart lock installation requires precise carpentry and electronic expertise.</p>,
          <p key="2">Our property maintenance team is equipped to accurately drill, mortise, and align the door frame to perfectly accommodate modern digital and smart hardware, ensuring seamless operation from day one.</p>
        ]}
        imageSrc="/images/services/smart-lock-installation_photo.webp"
        imageAlt="Cartoonish illustration representing a fresh door prep and smart lock"
        ctaText="Schedule Installation ($20 Call Out)"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="The Importance of Precision"
        content={[
          <p key="1">Smart locks contain sensitive motorized components that have a very low tolerance for friction. If a bore hole is slightly off-center or the strike plate is misaligned, the motor will struggle, leading to rapid battery drain and premature failure.</p>,
          <p key="2">This is why professional installation is critical. We don&apos;t just screw the lock into the door; we ensure the physical foundation is flawlessly aligned so your new investment operates reliably for years.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Our Fresh Install Process"
        subtitle="A comprehensive approach to new smart hardware."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>,
            title: "Door Preparation",
            description: "Accurate measurement and drilling of blank doors using professional jigs to ensure the crossbore and edge bore are perfectly square."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Hardware Mounting",
            description: "Securely fastening the motorized deadbolt or lever, ensuring zero friction between the latch and the strike plate."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>,
            title: "System Setup",
            description: "Configuring the electronic components, testing the network connectivity, and guiding you through the app setup and code generation."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about fresh installations."
        faqs={[
          {
            question: "Can you install a smart lock on a brand new door without existing holes?",
            answer: "Yes. A fresh installation means we precision-drill the necessary bore holes and strike plates into a blank door to accommodate your new smart lock perfectly."
          },
          {
            question: "Do you handle the network setup for the smart lock?",
            answer: "Yes, part of our professional installation service includes ensuring the lock is properly connected to your Wi-Fi, Bluetooth, or smart home hub."
          },
          {
            question: "How long does a fresh installation take?",
            answer: "Drilling and prepping a fresh door takes slightly longer than a simple replacement. Typically, we allocate 1 to 2 hours per door for a complete, accurate setup."
          }
        ]}
        theme="dark"
      />

    </div>
  );
}
