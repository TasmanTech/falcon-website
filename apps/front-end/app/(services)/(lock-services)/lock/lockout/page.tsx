import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Emergency Lockout Services',
  description: 'Fast, reliable commercial and residential lockout assistance across New Zealand. We prioritize practical, non-destructive entry methods.',
  keywords: 'Lockout Service, Emergency Entry, Residential Lockout, Commercial Lockout, Falcon Access',
  openGraph: {
    title: 'Emergency Lockout Services | Falcon Access',
    description: 'Fast, reliable commercial and residential lockout assistance across New Zealand. We prioritize practical, non-destructive entry methods.',
    url: 'https://falconaccess.co.nz/lockout',
  }
};

export default function LockoutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lockout/#webpage",
        "url": "https://falconaccess.co.nz/lockout",
        "name": "Emergency Lockout Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lockout Services", "item": "https://falconaccess.co.nz/lockout" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you arrive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We understand the urgency of a lockout. We prioritize emergency calls and strive to reach your commercial or residential property as quickly as possible."
            }
          },
          {
            "@type": "Question",
            "name": "Will my door or lock be damaged?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our primary goal is non-destructive entry. In the vast majority of cases, we can regain access without causing any damage to your existing hardware."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to prove I own the property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, for security and liability reasons, we require a basic form of identification to verify your authorization to access the premises before we begin work."
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
          Emergency Lockout Services
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Fast, practical, and reliable assistance when you need access restored.
        </p>
      </div>

      <PhotoContentSection
        imageSrc="/images/services/lockout_photo.webp"
        imageAlt="Cartoonish illustration of professional lock bypass tools and a deadbolt"
        imageTitle="Lockout Services"
        title="Rapid Response When It Matters"
        content={[
          <p key="1">Being locked out of your commercial facility or residential home is more than an inconvenience. Our property maintenance team specializes in swift, effective lockout resolution, charging a simple, incredibly affordable <strong>$20 flat call-out fee</strong> for everything—no quotes, no waiting, and no hidden costs.</p>,
          <p key="2">We treat emergency access as a priority component of our broader maintenance services, ensuring that your property remains functional and secure at all times.</p>
        ]}
        ctaText="Connect Now ($20 Call Out)"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Non-Destructive Techniques"
        content={[
          <p key="1">Our approach is rooted in practical, honest work. We always prioritize non-destructive entry methods to minimize the cost and hassle of replacing hardware.</p>,
          <p key="2">Rather than immediately resorting to drilling, our experienced team utilizes specialized tools to bypass locks safely, preserving the integrity of your doors and existing security systems whenever possible.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Our Lockout Process"
        subtitle="A straightforward, transparent approach to regaining access."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "1. Fast Dispatch",
            description: "Call our direct line. We prioritize emergency maintenance requests and dispatch our team promptly to your location."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "2. Verification",
            description: "For security, we quickly verify authorization to access the property before beginning any entry procedures."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>,
            title: "3. Restoration",
            description: "We utilize professional tools to safely restore access. If a mechanism has failed, we can repair or replace it on the spot."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about our lockout assistance."
        faqs={[
          {
            question: "How quickly can you arrive?",
            answer: "We understand the urgency of a lockout. We prioritize emergency calls and strive to reach your commercial or residential property as quickly as possible."
          },
          {
            question: "Will my door or lock be damaged?",
            answer: "Our primary goal is non-destructive entry. In the vast majority of cases, we can regain access without causing any damage to your existing hardware."
          },
          {
            question: "Do I need to prove I own the property?",
            answer: "Yes, for security and liability reasons, we require a basic form of identification to verify your authorization to access the premises before we begin work."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
