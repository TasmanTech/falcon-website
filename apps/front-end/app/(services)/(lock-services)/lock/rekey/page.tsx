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
    canonical: "/lock/rekey",
  },
  title: 'Auckland Hardware Rekeying Services',
  description: 'Cost-effective hardware rekeying for commercial and residential properties. Secure your facility without replacing the entire mechanism.',
  keywords: 'Rekeying, Lock Rekey, Lock Rekey Service, Lock Changing Service, Hardware Rekeying, Commercial Security, web design, web development, Falcon Access',
  openGraph: {
    title: 'Auckland Hardware Rekeying Services',
    description: 'Cost-effective hardware rekeying for commercial and residential properties. Secure your facility without replacing the entire mechanism.',
    url: "/lock/rekey",
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
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Rekeying", "item": "https://falconaccess.co.nz/lock/rekey" }
        ]
      },
      {
        "@type": "Service",
        "name": "Hardware Rekeying Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Cost-effective hardware rekeying for commercial and residential properties."
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
    <div className="w-full">
      <JsonLd id="schema-rekey-page" schema={jsonLd} />

      <PageHeaderSection 
        title="Auckland Hardware Rekeying"
        subtitle="Secure your property efficiently by changing the keys. We service Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        title="Economical Access Control"
        content={[
          <p key="1">You do not always have to buy new locks to stop access. A lock rekey is a smart fix. We change the inside parts of your old locks.</p>,
          <p key="2">This makes all old keys useless. We give you a fresh set of keys. This gives you peace of mind at a low cost.</p>
        ]}
        imageSrc="/images/services/lock/rekey/lock-rekeying-service-auckland.webp"
        imageAlt="Internal pins and springs of a door lock"
        imageTitle="Lock Rekeying Service"
        imageDescription="Cost-effective lock rekeying for new homeowners and businesses needing fresh keys."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="When Should You Rekey?"
        content={[
          <p key="1">We suggest rekeying when there is a big change in occupancy or a risk. This is very common for shops with staff changes or homes with new owners.</p>,
          <p key="2">If your locks are physically sound, rekeying is the honest choice to stay safe. Much like good web design relies on good code, good security relies on good lock parts.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        title="Fast & Efficient Service"
        content={[
          <p key="1">Our mobile units carry all the tools to rekey your property on-site. We are trained to work with many major lock brands and shop systems.</p>,
          <p key="2">Take total control of your access today. Reach out to our team for a simple, clear <strong>$20 flat call-out fee</strong> to your place.</p>
        ]}
        imageSrc="/images/services/lock/rekey/residential-lock-rekey-technician.webp"
        imageAlt="Rekeying a commercial hardware cylinder"
        imageTitle="Professional Lock Rekeying"
        imageDescription="Adjusting lock cylinder pins to work with a new set of keys without replacing the hardware."
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Benefits of Rekeying"
        subtitle="A straightforward approach to managing building access."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: 'Cost-Effective Security',
            description: "Save significantly by utilising your existing, functional hardware instead of buying entirely new sets for every door."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
            title: 'Master Key Convenience',
            description: "Reduce the number of keys you carry by configuring multiple doors to operate on a single, unified key."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Instant Access Revocation',
            description: "Instantly revoke access from old tenants, lost keys, or former employees, restoring complete control over your premises."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Lock Rekeying Service FAQs"
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
