import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Hardware Rekeying Services',
  description: 'Cost-effective hardware rekeying for commercial and residential properties. Secure your facility without replacing the entire mechanism.',
  keywords: 'Rekeying, Lock Rekey, Hardware Rekeying, Commercial Security, Falcon Access',
  openGraph: {
    title: 'Hardware Rekeying Services | Falcon Access',
    description: 'Cost-effective hardware rekeying for commercial and residential properties. Secure your facility without replacing the entire mechanism.',
    url: 'https://falconaccess.co.nz/rekey',
  }
};

export default function RekeyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/rekey/#webpage",
        "url": "https://falconaccess.co.nz/rekey",
        "name": "Hardware Rekeying Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Rekeying", "item": "https://falconaccess.co.nz/rekey" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between rekeying and replacing hardware?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Replacing hardware involves removing the entire mechanism from the door. Rekeying simply changes the internal pins of your existing hardware so old keys no longer work, which is usually much faster and more cost-effective."
            }
          },
          {
            "@type": "Question",
            "name": "Can you make all my doors use the same key?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, provided the hardware mechanisms are of the same brand or share the same keyway profile, we can key them alike for your convenience."
            }
          },
          {
            "@type": "Question",
            "name": "Is rekeying suitable for commercial master key systems?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We regularly maintain and rekey complex commercial master key systems to ensure proper access control across different management levels."
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
          Hardware Rekeying
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Secure your property efficiently by changing the keys, not the hardware.
        </p>
      </div>

      <PhotoContentSection
        title="Economical Access Control"
        content={[
          <p key="1">When you need to restrict access to a building, you don&apos;t necessarily have to replace all the hardware. Rekeying is a practical property maintenance solution that alters the internal components of your existing mechanisms.</p>,
          <p key="2">This service renders all previously issued keys useless and provides you with a fresh set, granting you immediate peace of mind at a fraction of the cost of full hardware replacement.</p>
        ]}
        imageSrc="/images/services/rekey_photo.webp"
        imageAlt="Cartoonish illustration representing keys and internal hardware pins"
        ctaText="Book a Rekey ($20 Call Out)"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="When Should You Rekey?"
        content={[
          <p key="1">We recommend rekeying whenever there is a change in occupancy or a potential security risk. This is highly common for commercial spaces experiencing employee turnover or residential properties changing tenants or owners.</p>,
          <p key="2">If your current hardware is physically sound and operating smoothly, rekeying is the honest, efficient recommendation to secure your premises without upselling unnecessary equipment.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Benefits of Rekeying"
        subtitle="A straightforward approach to managing building access."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: "Cost-Effective",
            description: "Save significantly by utilizing your existing, functional hardware instead of buying entirely new sets for every door."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
            title: "Keying Alike",
            description: "Reduce the number of keys you carry by configuring multiple doors to operate on a single, unified key."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Immediate Security",
            description: "Instantly revoke access from old tenants, lost keys, or former employees, restoring complete control over your premises."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about our rekeying services."
        faqs={[
          {
            question: "What is the difference between rekeying and replacing hardware?",
            answer: "Replacing hardware involves removing the entire mechanism from the door. Rekeying simply changes the internal pins of your existing hardware so old keys no longer work, which is usually much faster and more cost-effective."
          },
          {
            question: "Can you make all my doors use the same key?",
            answer: "Yes, provided the hardware mechanisms are of the same brand or share the same keyway profile, we can key them alike for your convenience."
          },
          {
            question: "Is rekeying suitable for commercial master key systems?",
            answer: "Absolutely. We regularly maintain and rekey complex commercial master key systems to ensure proper access control across different management levels."
          }
        ]}
        theme="dark"
      />

    </div>
  );
}
