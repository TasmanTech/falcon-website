import { Metadata } from 'next';
import Hero from '@/components/Hero';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: "Commercial & Residential Repair",
  description: 'Trusted commercial and residential repair and maintenance experts serving homeowners and businesses across New Zealand. Available 24/7.',
  keywords: 'Commercial Repair, Residential Maintenance, Locksmith, Facility Maintenance, New Zealand',
  openGraph: {
    title: 'Commercial & Residential Repair and Maintenance',
    description: 'Trusted commercial and residential repair and maintenance experts serving homeowners and businesses across New Zealand. Available 24/7.',
    url: 'https://falconaccess.co.nz/',
  }
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/#webpage",
        "url": "https://falconaccess.co.nz/",
        "name": "Commercial & Residential Repair and Maintenance | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What types of properties do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service a wide range of properties including residential homes, commercial offices, retail spaces, and industrial facilities across New Zealand."
            }
          },
          {
            "@type": "Question",
            "name": "Do you only provide locksmithing services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, while locksmithing and security hardware is one of our specialized services, we provide comprehensive general repair and property maintenance solutions for all your needs."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer emergency repairs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we understand that some maintenance issues simply cannot wait. We offer prompt responses for urgent repair needs to secure your property and restore functionality."
            }
          },
          {
            "@type": "Question",
            "name": "Are your services guaranteed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We pride ourselves on honest, authentic work. If something isn't right, we will make it right. We focus on delivering long-lasting, practical solutions."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero
        title="Commercial & Residential Repair"
        description="Comprehensive maintenance and repair services for your home and business across New Zealand."
        imageSrc="/hero/hero_repair_maintenance.webp"
        imageAlt="Repair and Maintenance Tools"
        ctaText="Get Expert Help Now"
        ctaLink="/contact"
        isMain={true}
      />

      <PhotoContentSection
        title="Comprehensive Property Care"
        content={[
          <p key="1">Maintaining a commercial facility or a residential property requires attention to detail and a wide array of skills. We provide general repair and maintenance services designed to keep your spaces functional, safe, and looking their best.</p>,
          <p key="2">From routine checks to emergency fixes, our dedicated team handles everything from minor hardware replacements to extensive hardware repairs, ensuring your property remains in optimal condition.</p>
        ]}
        imageSrc="/images/general_repair_tools.webp"
        imageAlt="General Repair Tools"
        imageTitle="General Maintenance Equipment"
        ctaText="Discuss Your Needs"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Our Commitment to Quality"
        content={[
          <h3 key="subtitle" className="text-xl text-brand-accent font-semibold mb-6">Authentic, Reliable Service Every Time</h3>,
          <p key="1">At Falcon Access, we believe in doing the job right. We bring years of hands-on experience and a practical approach to every repair task we undertake. We don&apos;t rely on flashy credentials; instead, we let the quality of our hard work speak for itself.</p>,
          <p key="2">Whether it&apos;s a broken door hinge, a faulty mechanism, or general wear and tear, we focus on delivering effective, long-lasting solutions tailored specifically to your property&apos;s requirements.</p>
        ]}
        theme="dark"
      />

      <PhotoContentSection
        title="Specialized Services"
        content={[
          <p key="1">While we handle general repairs, we also provide specialized services including commercial and residential locksmithing. Securing your premises is a crucial aspect of property maintenance.</p>,
          <p key="2">Our services include lock replacements, rekeying, and hardware installation. We ensure that every access point in your building is fully operational and secure, providing peace of mind for business owners and homeowners alike.</p>
        ]}
        imageSrc="/images/locksmith_tools.webp"
        imageAlt="Specialized Locksmith Tools"
        imageTitle="Lock and Hardware Repair"
        ctaText="View Lock Services"
        ctaHref="/lockout"
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Why Choose Falcon Access?"
        subtitle="We provide practical, efficient solutions for all your maintenance needs."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: "Prompt Response",
            description: "We understand that maintenance issues can disrupt your day. We prioritize quick, efficient service to get things back on track."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            title: "Versatile Skillset",
            description: "From basic repairs to specialized hardware installations, our team is equipped to handle a wide variety of tasks."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Honest Work",
            description: "We believe in transparent communication and authentic service. We provide practical solutions without unnecessary upselling."
          }
        ]}
        theme="dark"
      />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about our repair and maintenance services."
        faqs={[
          {
            question: "What types of properties do you service?",
            answer: "We service a wide range of properties including residential homes, commercial offices, retail spaces, and industrial facilities across New Zealand."
          },
          {
            question: "Do you only provide locksmithing services?",
            answer: "No, while locksmithing and security hardware is one of our specialized services, we provide comprehensive general repair and property maintenance solutions for all your needs."
          },
          {
            question: "Do you offer emergency repairs?",
            answer: "Yes, we understand that some maintenance issues simply cannot wait. We offer prompt responses for urgent repair needs to secure your property and restore functionality."
          },
          {
            question: "Are your services guaranteed?",
            answer: "Absolutely. We pride ourselves on honest, authentic work. If something isn't right, we will make it right. We focus on delivering long-lasting, practical solutions."
          }
        ]}
        theme="light"
      />

    </div>
  );
}
