import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Hardware & Lock Repair Services',
  description: 'Reliable hardware and lock repair for commercial and residential properties. We fix faulty mechanisms efficiently to restore your security.',
  keywords: 'Lock Repair, Hardware Repair, Commercial Maintenance, Residential Repair, Falcon Access',
  openGraph: {
    title: 'Hardware & Lock Repair Services | Falcon Access',
    description: 'Reliable hardware and lock repair for commercial and residential properties. We fix faulty mechanisms efficiently to restore your security.',
    url: 'https://falconaccess.co.nz/lock-repair',
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
          { "@type": "ListItem", "position": 2, "name": "Lock Repair", "item": "https://falconaccess.co.nz/lock-repair" }
        ]
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
              "text": "Yes, we handle a wide range of commercial and residential hardware, including specialized mortise locks and glass door hardware."
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
    <div className="w-full pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 animate-text-blurb-ready animate-play-text">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
          Hardware & Lock Repair
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Practical repair solutions to keep your property secure and functioning smoothly.
        </p>
      </div>

      <PhotoContentSection
        title="Restoring Functionality"
        content={[
          <p key="1">A sticking or broken mechanism isn&apos;t just frustrating; it can compromise the security of your entire building. As part of our comprehensive property maintenance services, we specialize in diagnosing and fixing faulty hardware.</p>,
          <p key="2">From residential deadbolts to heavy-duty commercial latches, our goal is to identify the root cause of the issue and implement a lasting, reliable repair.</p>
        ]}
        imageSrc="/images/services/lock-repair_photo.webp"
        imageAlt="Cartoonish illustration representing hardware and lock repair tools"
        ctaText="Discuss Your Issue ($20 Call Out)"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Repair First, Replace Only When Necessary"
        content={[
          <p key="1">We believe in honest, hard work over upselling unnecessary replacements. Many hardware issues stem from simple misalignment, dirt buildup, or minor component failure.</p>,
          <p key="2">Our technicians will carefully disassemble and assess the mechanism. If a simple repair or adjustment can reliably solve the problem, that is the route we take, saving you both time and money.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Common Issues We Fix"
        subtitle="We handle a wide array of wear-and-tear related problems."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
            title: "Misaligned Strikes",
            description: "Often caused by building settlement or sagging doors, preventing the latch from properly securing into the frame."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            title: "Internal Component Failure",
            description: "Broken springs, seized cylinders, or snapped tailpieces that prevent smooth operation."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
            title: "Sticking & Binding",
            description: "Hardware that requires excessive force to turn or pull, often remedied through proper cleaning and lubrication."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about our repair services."
        faqs={[
          {
            question: "Should I repair or replace my faulty lock?",
            answer: "Whenever possible, we prefer to repair existing hardware to save you money. However, if internal mechanisms are completely worn out, we'll offer a straightforward replacement recommendation."
          },
          {
            question: "Can you fix commercial glass door locks?",
            answer: "Yes, we handle a wide range of commercial and residential hardware, including specialized mortise locks and glass door hardware."
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
