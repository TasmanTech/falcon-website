import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';

export const metadata: Metadata = {
  alternates: {
    canonical: '/smart-lock/smart-lock-installation',
  },
  title: 'Auckland Fresh Smart Lock Installation',
  description: 'Professional fresh installation of smart lock systems for commercial and residential properties. Get your doors correctly prepped and secured.',
  keywords: 'Smart Lock Installation, Fresh Installation, Door Prep, Electronic Locks, web design, web development, Falcon Access',
  openGraph: {
    title: 'Auckland Fresh Smart Lock Installation',
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
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Services", "item": "https://falconaccess.co.nz/smart-lock" },
          { "@type": "ListItem", "position": 3, "name": "Fresh Installation", "item": "https://falconaccess.co.nz/smart-lock/smart-lock-installation" }
        ]
      },
      {
        "@type": "Service",
        "name": "Fresh Smart Lock Installation",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Precision drilling and fresh installation of smart locks for new doors."
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
    <div className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeaderSection 
        title="Auckland Fresh Smart Lock Installation"
        subtitle="Precision preparation and setup for brand new doors. Our team covers Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        title="Starting From Scratch"
        content={[
          <p key="1">You might be fixing up a new office or home. Or you might be putting a lock on a new door. A new smart lock needs great care.</p>,
          <p key="2">Our team has the tools to drill and fit the door frame. We make sure the new smart lock fits perfectly. It will work great from day one.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-installation/smart-lock-installation-auckland.webp"
        imageAlt="Drilling bore holes into a new door for a smart lock"
        imageTitle="Smart Lock Installation"
        imageDescription="Professional installation of digital and biometric smart locks for modern home security."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="The Importance of Precision"
        content={[
          <p key="1">Smart locks have small motors inside. They do not work well if they rub. If a hole is off-center, the motor works too hard. This drains the power fast and breaks the lock.</p>,
          <p key="2">This is why a pro fit is so key. We do not just screw the lock on. We make sure the door fit is perfect. We take care like a web team does for web design.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        title="Flawless Electronic Setup"
        content={[
          <p key="1">We prep the door and mount the lock first. Then we make sure all the tech parts are set up and tested well.</p>,
          <p key="2">We charge a simple, clear <strong>$20 flat call-out fee</strong>. We come to your place in Auckland and set up your smart lock.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-installation/residential-smart-lock-fitting.webp"
        imageAlt="Connecting internal wiring for a smart keypad"
        imageTitle="Seamless Smart Lock Fitting"
        imageDescription="Clean and precise fitting of electronic locks into existing wooden or metal doors."
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Our Fresh Install Process"
        subtitle="A comprehensive approach to new smart hardware."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>,
            title: 'Precision Door Drilling',
            description: "Accurate measurement and drilling of blank doors using professional jigs to ensure the crossbore and edge bore are perfectly square."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Frictionless Mounting',
            description: "Securely fastening the motorised deadbolt or lever, ensuring zero friction between the latch and the strike plate."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>,
            title: 'Network & App Configuration',
            description: "Configuring the electronic components, testing the network connectivity, and guiding you through the app setup and code generation."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Smart Lock Installation FAQs"
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
