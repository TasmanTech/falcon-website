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
    canonical: "/lock/lock-repair",
  },
  title: 'Auckland Hardware & Lock Repair',
  description: 'Reliable hardware and lock repair for commercial and residential properties. We fix faulty mechanisms efficiently to restore your security.',
  keywords: 'Lock Repair, Door Lock Repair, Door Lock Repair Service, Lock Repair Near Me, Door and Lock Repair, Door Lock Mechanic, Lock Fixer, Hardware Repair, Commercial Maintenance, Residential Repair, web design, web development, Falcon Access',
  openGraph: {
    title: 'Auckland Hardware & Lock Repair',
    description: 'Reliable hardware and lock repair for commercial and residential properties. We fix faulty mechanisms efficiently to restore your security.',
    url: "/lock/lock-repair",
  }
};

export default function LockRepairPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock-repair/#webpage",
        "url": "https://falconaccess.co.nz/lock-repair",
        "name": "Hardware & Lock Repair Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Lock Repair", "item": "https://falconaccess.co.nz/lock/lock-repair" }
        ]
      },
      {
        "@type": "Service",
        "name": "Hardware & Lock Repair Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Reliable repair for faulty locks and hardware on commercial and residential properties."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Should I repair or replace my faulty lock?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Whenever possible, we prefer to repair existing hardware to save you money. However, if internal mechanisms are completely worn out, we'll offer a straightforward replacement recommendation."
            }
          },
          {
            "@type": "Question",
            "name": "Can you fix commercial glass door locks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we handle a wide range of commercial and residential hardware, including specialised mortise locks and glass door hardware."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a repair usually take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most standard hardware repairs are completed within an hour of our arrival, depending on the severity of the damage or misalignment."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id="schema-lock-repair-page" schema={jsonLd} />

      <PageHeaderSection 
        title="Auckland Hardware & Lock Repair"
        subtitle="Practical repair solutions to keep your property secure. Our mobile maintenance team services Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        title="Restoring Functionality"
        content={[
          <p key="1">A broken lock is a big risk. It can leave your whole building unsafe. Our door lock repair service finds and fixes the fault fast.</p>,
          <p key="2">We fix home deadbolts and heavy shop locks. Think of us as your door lock mechanic. We give a lasting repair to keep your place safe.</p>
        ]}
        imageSrc="/images/services/lock/lock-repair/lock-repair-service-auckland.webp"
        imageAlt="Expert hardware and lock repair tools"
        imageTitle="Lock Repair Service"
        imageDescription="Fixing jammed, stiff, or broken door locks to restore security and functionality."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Repair First, Replace Only When Necessary"
        content={[
          <p key="1">We do honest hard work. We do not try to sell you parts you do not need. Many lock issues are just bad alignment or dirt. These can be fixed fast.</p>,
          <p key="2">Our team works like a web developer fixing web design code. We carefully take apart your lock. If a fix can solve the issue, we do that. This saves you time and cash.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        title="Reliable, Long-Lasting Fixes"
        content={[
          <p key="1">Most lock fixes are done in under an hour. We bring all the needed tools to do these fixes right on-site.</p>,
          <p key="2">We handle many types of shop and home locks. We even fix glass door locks. Need lock repair near you? Reach out today for an honest check and a <strong>$20 flat call-out fee</strong>.</p>
        ]}
        imageSrc="/images/services/lock/lock-repair/broken-lock-mechanism-repair.webp"
        imageAlt="Fixing a damaged residential deadbolt"
        imageTitle="Lock Mechanism Repair"
        imageDescription="Internal lock mechanism diagnostics and repair to extend the life of your existing hardware."
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Common Issues We Fix"
        subtitle="We handle a wide array of wear-and-tear related problems."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
            title: 'Strike Plate Realignment',
            description: "Often caused by building settlement or sagging doors, preventing the latch from properly securing into the frame."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            title: 'Internal Mechanism Repair',
            description: "Broken springs, seized cylinders, or snapped tailpieces that prevent smooth operation."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
            title: 'Friction & Sticking Resolution',
            description: "Hardware that requires excessive force to turn or pull, often remedied through proper cleaning and lubrication."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="Lock Mechanism Repair FAQs"
        subtitle="Common questions about our repair services."
        faqs={[
          {
            question: "Should I repair or replace my faulty lock?",
            answer: "Whenever possible, we prefer to repair existing hardware to save you money. However, if internal mechanisms are completely worn out, we'll offer a straightforward replacement recommendation."
          },
          {
            question: "Can you fix commercial glass door locks?",
            answer: "Yes, we handle a wide range of commercial and residential hardware, including specialised mortise locks and glass door hardware."
          },
          {
            question: "How long does a repair usually take?",
            answer: "Most standard hardware repairs are completed within an hour of our arrival, depending on the severity of the damage or misalignment."
          }
        ]}
        theme="dark"
      />

    </div>
  );
}
