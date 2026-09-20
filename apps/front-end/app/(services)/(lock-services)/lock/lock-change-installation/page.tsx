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
    canonical: '/lock/lock-change-installation',
  },
  title: 'Auckland Door Hardware & Lock Replacement',
  description: 'Upgrade the security of your commercial or residential property with our professional hardware and lock replacement services across New Zealand.',
  keywords: 'Lock Replacement, New Locks, Hardware Upgrade, Commercial Security, Residential Replacement, web design, web development, Falcon Access',
  openGraph: {
    title: 'Auckland Door Hardware & Lock Replacement',
    description: 'Upgrade the security of your commercial or residential property with our professional hardware and lock replacement services across New Zealand.',
    url: 'https://falconaccess.co.nz/lock-change',
  }
};

export default function LockChangePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock-change/#webpage",
        "url": "https://falconaccess.co.nz/lock-change",
        "name": "Hardware & Lock Replacement | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Lock Replacement", "item": "https://falconaccess.co.nz/lock/lock-change-installation" }
        ]
      },
      {
        "@type": "Service",
        "name": "Hardware & Lock Replacement",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Professional hardware replacement for commercial and residential properties."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I replace my locks with smart hardware?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We can upgrade your standard mechanical hardware to modern digital and smart lock systems tailored to your specific needs and door types."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a typical hardware replacement take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For standard residential and commercial doors, a complete hardware swap usually takes less than an hour per door, minimizing disruption."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide the replacement hardware?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we supply a wide range of reliable, high-quality hardware. Alternatively, if you have already purchased compatible hardware, we can provide professional installation."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id="schema-lock-change-installation-page" schema={jsonLd} />

      <PageHeaderSection 
        title="Auckland Door Hardware Replacement"
        subtitle="Professional installation of reliable hardware to upgrade your property. We service Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        imageSrc="/images/services/lock/lock-change-installation/lock-installation-service-auckland.webp"
        imageAlt="Professional hardware replacement tools"
        imageTitle="Lock Installation Service"
        imageDescription="Installing new, high-security deadbolts and handle sets for improved property defense."
        title="Upgrading Your Security"
        content={[
          <p key="1">You might be moving to a new place. Or maybe you need to fix old locks. Putting in new locks is a key part of keeping your property safe.</p>,
          <p key="2">We are property care experts. We provide strong and reliable lock fit services tailored to your exact needs.</p>,
          <p key="3">Our team is great at putting in new hardware. We make sure all parts fit perfectly. We keep your assets safe and secure.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="When to Consider Replacement"
        content={[
          <p key="1">We try to fix locks first. But sometimes, buying a new lock is the best choice. If your lock is broken or badly rusted, a fix will not last long. A new lock is a smart choice for the long term.</p>,
          <p key="2">Good web design keeps a site safe. Good locks keep your property safe. If you have new staff or tenants, you need to be sure about access. A new lock is the safest choice.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        imageSrc="/images/services/lock/lock-change-installation/new-door-lock-fitting.webp"
        imageAlt="Modern hardware solutions installed correctly"
        imageTitle="New Door Lock Fitting"
        imageDescription="Professional mortising and fitting of fresh locks on wooden, aluminum, and composite doors."
        title="Precision Installation"
        content={[
          <p key="1">We install a wide range of good hardware. If you already bought a lock, we can put it in for you. We give expert setup services.</p>,
          <p key="2">For most doors, a hardware swap takes less than an hour per door. This means less disruption to your home or business.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Hardware Types We Install"
        subtitle="We supply and install a variety of robust solutions."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
            title: 'Commercial Grade Hardware',
            description: "Strong latches, push bars, and locks made for high traffic and long life."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
            title: 'Residential Locks & Latches',
            description: "Deadbolts, knobs, levers, and safe window latches to protect your home."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: 'Digital & Smart Keypads',
            description: "Modern keypads and smart locks that connect with your home or shop system."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Lock Installation & Change FAQs"
        subtitle="Common questions about replacing hardware."
        faqs={[
          {
            question: "Can I replace my locks with smart hardware?",
            answer: "Absolutely. We can upgrade your standard mechanical hardware to modern digital and smart lock systems tailored to your specific needs and door types."
          },
          {
            question: "How long does a typical hardware replacement take?",
            answer: "For standard residential and commercial doors, a complete hardware swap usually takes less than an hour per door, minimizing disruption."
          },
          {
            question: "Do you provide the replacement hardware?",
            answer: "Yes, we supply a wide range of reliable, high-quality hardware. Alternatively, if you have already purchased compatible hardware, we can provide professional installation."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
