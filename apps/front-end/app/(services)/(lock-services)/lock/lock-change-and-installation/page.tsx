import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Hardware & Lock Replacement',
  description: 'Upgrade the security of your commercial or residential property with our professional hardware and lock replacement services across New Zealand.',
  keywords: 'Lock Replacement, New Locks, Hardware Upgrade, Commercial Security, Residential Replacement, Falcon Access',
  openGraph: {
    title: 'Hardware & Lock Replacement | Falcon Access',
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
          { "@type": "ListItem", "position": 2, "name": "Lock Replacement", "item": "https://falconaccess.co.nz/lock-change" }
        ]
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
    <div className="w-full pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 animate-text-blurb-ready animate-play-text">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
          Hardware Replacement
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Professional installation of reliable hardware to upgrade and secure your property.
        </p>
      </div>

      <PhotoContentSection
        imageSrc="/images/services/lock-change_photo.webp"
        imageAlt="Cartoonish illustration of a new brass lock cylinder and installation tools"
        imageTitle="Hardware Installation"
        title="Upgrading Your Security"
        content={[
          <p key="1">Whether you&apos;re moving into a new building, responding to a security breach, or simply replacing worn-out mechanisms, installing new hardware is a fundamental aspect of property maintenance. We operate on a transparent and highly affordable <strong>$20 flat call-out fee</strong>.</p>,
          <p key="2">Our team specializes in the precise installation of both standard and specialized hardware across commercial spaces and residential properties. We ensure everything fits perfectly and operates smoothly.</p>
        ]}
        ctaText="Book Installation ($20 Call Out)"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="When to Consider Replacement"
        content={[
          <p key="1">While we always attempt repairs first, there are scenarios where a full replacement is the most practical and cost-effective choice. If mechanisms are structurally damaged, severely corroded, or visibly compromised, a repair is only a temporary patch.</p>,
          <p key="2">Upgrading is also a smart move if you want to modernize your facility with smart access control or if you&apos;ve recently experienced a turnover in staff or tenants and need absolute certainty about access rights.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Hardware Types We Install"
        subtitle="We supply and install a variety of robust solutions."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
            title: "Commercial Hardware",
            description: "Heavy-duty latches, push bars, mortise locks, and access control components designed for high traffic and durability."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
            title: "Residential Hardware",
            description: "Standard deadbolts, knob sets, lever handles, and secure window latches to protect your home."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: "Smart Systems",
            description: "Modern digital keypads and smart deadbolts that integrate with facility management or home automation systems."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
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
