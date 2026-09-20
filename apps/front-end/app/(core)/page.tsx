import { Metadata } from 'next';
import Hero from '@/components/Hero';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Auckland Commercial & Residential Maintenance',
  description: 'Trusted commercial and residential repair and maintenance experts serving Auckland. We provide property care, web design, and emergency services 24/7.',
  keywords: 'Commercial Repair, Residential Maintenance, Locksmith, Web Design, Web Developer, Auckland, New Zealand',
  openGraph: {
    title: 'Auckland Commercial & Residential Maintenance',
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
            "name": "What types of properties do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service a wide range of properties including residential homes, commercial offices, retail spaces, and industrial facilities across Auckland and New Zealand."
            }
          },
          {
            "@type": "Question",
            "name": "Do you only provide lockout and locksmithing services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, while emergency lockout assistance and security hardware are our highly specialised services, we provide comprehensive general repair, property maintenance, and digital solutions like web design."
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
            "name": "Will my door or lock be damaged during a lockout service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, whether you are locked out of your home or business, we prioritize non-destructive methods to regain access. We always start with a brief site inspection to determine the safest way in, ensuring we protect your existing property across our NZ service areas."
            }
          },
          {
            "@type": "Question",
            "name": "How can I tell if my lock needs to be replaced?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If your lock is showing signs of wear, such as sticking, being difficult to turn, or if it’s becoming loose, it may be time to replace it. Our technicians can perform a comprehensive site inspection at your home or business to advise on the best, most practical course of action for your security needs in NZ."
            }
          },
          {
            "@type": "Question",
            "name": "What should I do if my lock is damaged?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A damaged lock compromises the security of your home or business and should be addressed immediately. Call our dispatch directly at +64 9 243 1404; we will arrive promptly to secure the property and conduct a site inspection to provide the most reliable repair solutions across NZ."
            }
          },
          {
            "@type": "Question",
            "name": "Can you help me if I’m locked out of my house?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialize in rapid-response emergency lockout services for any home or business. Our experienced team will arrive quickly, conduct a rapid site inspection to choose the safest entry method, and safely get you back inside. We are proud to serve communities across NZ with honest, reliable assistance."
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

      <section className="bg-brand-catchy text-white py-12 text-center px-4 w-full shadow-md relative z-10 animate-card-ready animate-play">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-montserrat font-black uppercase mb-3 tracking-wide">
            24/7 Emergency Lockout Service Auckland Wide
          </h2>
          <p className="text-xl md:text-2xl font-inter font-bold uppercase mb-8 text-white/90">
            $20 Flat Callout Fee. No charge if we don&apos;t help you get in.
          </p>
          <a href="tel:+6492431404" className="inline-block bg-brand-dark text-white font-black text-xl px-10 py-5 rounded-full hover:bg-brand-dark/90 transition-transform hover:scale-105 shadow-xl">
            CALL +64 9 243 1404 NOW
          </a>
        </div>
      </section>

      <PhotoContentSection
        title="Comprehensive Property Care"
        content={[
          <p key="1">Maintaining a commercial facility or a residential property requires attention to detail and a wide array of skills. We provide general repair and maintenance services designed to keep your spaces functional, secure, and looking their absolute best. We operate Auckland wide, ensuring that local homes and businesses receive the highest standard of care.</p>,
          <p key="2">From routine checks to emergency fixes, including securing compromised access points, our dedicated team ensures your property remains in optimal condition. We also partner with a top-tier web developer to offer digital solutions, meaning we can help your business thrive both physically and online through expert web design.</p>,
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
        title="Our Auckland Service Guarantees"
        subtitle="We stand firmly behind our commercial and residential contracting work across the wider Auckland region."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'No Fix, No Fee Guarantee',
            description: "If we can't complete the job or safely unlock your property, we won't charge you a cent. Our priority is providing authentic, reliable access solutions."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: 'On-Time Mobile Arrival',
            description: "We completely respect your busy schedule. Whether it's an emergency lockout or planned property maintenance, our Auckland mobile units arrive precisely when promised."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
            title: 'Exceptional Workmanship',
            description: "We take immense pride in our trade. We provide excellent, long-lasting residential repair and commercial security services, always striving to do our absolute best on every single job."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: 'Transparent $20 Callout Fee',
            description: "No hidden costs and absolutely no surprise surcharges. We operate with a brilliantly simple, highly affordable $20 flat call-out fee for all locksmithing and maintenance visits across NZ."
          }
        ]}
        theme="dark"
      />

      <CTASection theme="catchy" />

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
            question: "Will my door or lock be damaged during a lockout service?",
            answer: "No, whether you are locked out of your home or business, we prioritize non-destructive methods to regain access. We always start with a brief site inspection to determine the safest way in, ensuring we protect your existing property across our NZ service areas."
          },
          {
            question: "How can I tell if my lock needs to be replaced?",
            answer: "If your lock is showing signs of wear, such as sticking, being difficult to turn, or if it’s becoming loose, it may be time to replace it. Our technicians can perform a comprehensive site inspection at your home or business to advise on the best, most practical course of action for your security needs in NZ."
          },
          {
            question: "What should I do if my lock is damaged?",
            answer: "A damaged lock compromises the security of your home or business and should be addressed immediately. Call our dispatch directly at +64 9 243 1404; we will arrive promptly to secure the property and conduct a site inspection to provide the most reliable repair solutions across NZ."
          },
          {
            question: "Can you help me if I’m locked out of my house?",
            answer: "Yes, we specialize in rapid-response emergency lockout services for any home or business. Our experienced team will arrive quickly, conduct a rapid site inspection to choose the safest entry method, and safely get you back inside. We are proud to serve communities across NZ with honest, reliable assistance."
          }
        ]}
        theme="light"
      />
    </div>
  );
}
