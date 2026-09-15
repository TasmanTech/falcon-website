import { Metadata } from 'next';
import Hero from '@/components/Hero';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: "Commercial & Residential Repair",
  description: 'Trusted commercial and residential repair and maintenance experts serving Auckland. We provide property care, web design, and emergency services 24/7.',
  keywords: 'Commercial Repair, Residential Maintenance, Locksmith, Web Design, Web Developer, Auckland, New Zealand',
  openGraph: {
    title: 'Commercial & Residential Repair | Falcon Access',
    description: 'Trusted commercial and residential repair and maintenance experts serving Auckland. We provide property care, web design, and emergency services 24/7.',
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
        "name": "Commercial & Residential Repair | Falcon Access",
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
            "name": "What types of properties do you service in Auckland?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service a wide range of properties including residential homes, commercial offices, retail spaces, and industrial facilities across Auckland and the wider New Zealand area."
            }
          },
          {
            "@type": "Question",
            "name": "Do you only provide lockout and locksmithing services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, while emergency lockout assistance and security hardware are our highly specialised services, we provide comprehensive general repair, property maintenance, and even digital services like web design."
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
          },
          {
            "@type": "Question",
            "name": "I'm locked out of my business or home, how fast can you arrive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We treat lockouts as high-priority emergencies. We aim for rapid deployment to get you safely back inside using non-destructive methods whenever possible."
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
        description="Comprehensive maintenance, general repair, and rapid-response 24/7 lockout assistance for your home and business across Auckland. Call us at +64 9 243 1404 for immediate help."
        imageSrc="/hero/new-hero.webp"
        imageAlt="Repair and Maintenance Tools"
        ctaText="Get a Quote"
        ctaLink="/contact"
        isMain={true}
      />

      <PhotoContentSection
        title="Comprehensive Property Care"
        content={[
          <p key="1">Maintaining a commercial facility or a residential property requires attention to detail and a wide array of skills. We provide general repair and maintenance services designed to keep your spaces functional, secure, and looking their absolute best. We operate Auckland wide, ensuring that local homes and businesses receive the highest standard of care.</p>,
          <p key="2">From routine checks to emergency fixes—including securing compromised access points—our dedicated team ensures your property remains in optimal condition. We also partner with a top-tier web developer to offer digital solutions, meaning we can help your business thrive both physically and online through expert web design.</p>,
          <p key="3">Our team understands that property maintenance is an ongoing programme of work, not just a one-off job. We customise our approach to fit your specific schedule and budget, minimising disruption to your daily life or commercial operations.</p>
        ]}
        imageSrc="/images/content-1.webp"
        imageAlt="General Repair Tools"
        imageTitle="General Maintenance Equipment"
        ctaText="Connect Now"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Our Commitment to Quality"
        content={[
          <h3 key="subtitle" className="text-xl text-brand-accent font-semibold mb-6">Authentic, Reliable Service Every Time</h3>,
          <p key="1">At Falcon Access, we believe in doing the job right the first time. We bring years of hands-on experience and a practical approach to every repair task we undertake. We don&apos;t rely on flashy credentials or invented affiliations; instead, we let the exceptional quality of our hard work speak for itself. We are straightforward and transparent in everything we do.</p>,
          <p key="2">Whether it&apos;s a broken door hinge, a faulty mechanism, an emergency lockout situation requiring non-destructive entry, or referring you for web development, we focus on delivering effective, long-lasting solutions tailored specifically to your property&apos;s requirements. You can always reach our dispatch directly at <a href="tel:+6492431404" className="text-brand-accent hover:underline">+64 9 243 1404</a>.</p>
        ]}
        theme="dark"
      />

      <PhotoContentSection
        title="Specialised Lockout & Security Services"
        content={[
          <p key="1">While we handle a vast range of general repairs, one of our highly specialised services is commercial and residential lockout assistance. Being locked out of your business or home is incredibly stressful, which is exactly why we prioritise rapid, non-destructive entry methods. We aim to have your door open quickly, safely, and without unnecessary damage to your existing hardware.</p>,
          <p key="2">Beyond emergency lockouts, we also provide comprehensive security upgrades, lock replacements, and rekeying. We ensure that every access point in your building is fully operational and secure, creating a robust defence against unauthorised access. Trust us to handle your physical security with the utmost professionalism.</p>
        ]}
        imageSrc="/images/content-2.webp"
        imageAlt="Specialised Locksmith Tools"
        imageTitle="Lock and Hardware Repair"
        ctaText="View Lock Services"
        ctaHref="/lockout"
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Why Choose Falcon Access?"
        subtitle="We provide practical, efficient solutions for all your physical and digital maintenance needs."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: "Prompt Response",
            description: "We understand that maintenance issues and emergency lockouts can disrupt your day. We prioritise quick, efficient deployment to get you back inside and things back on track as swiftly as possible."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            title: "Versatile Skillset",
            description: "From basic property repairs and specialised hardware installations to expert web design consultations, our highly trained team is equipped to handle a surprisingly wide variety of tasks."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Honest Work",
            description: "We believe in transparent communication and fair pricing. For lockouts, we always attempt non-destructive entry first, providing practical solutions without unnecessary upselling or hidden fees."
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
            answer: "We service a wide range of properties including residential homes, commercial offices, retail spaces, and industrial facilities across Auckland and New Zealand."
          },
          {
            question: "Do you only provide lockout and locksmithing services?",
            answer: "No, while emergency lockout assistance and security hardware are our highly specialised services, we provide comprehensive general repair, property maintenance, and digital solutions like web design."
          },
          {
            question: "Do you offer emergency repairs?",
            answer: "Yes, we understand that some maintenance issues simply cannot wait. We offer prompt responses for urgent repair needs to secure your property and restore functionality."
          },
          {
            question: "Are your services guaranteed?",
            answer: "Absolutely. We pride ourselves on honest, authentic work. If something isn't right, we will make it right. We focus on delivering long-lasting, practical solutions."
          },
          {
            question: "I'm locked out of my business or home, how fast can you arrive?",
            answer: "We treat lockouts as high-priority emergencies. We aim for rapid deployment to get you safely back inside using non-destructive methods whenever possible."
          }
        ]}
        theme="light"
      />
    </div>
  );
}
