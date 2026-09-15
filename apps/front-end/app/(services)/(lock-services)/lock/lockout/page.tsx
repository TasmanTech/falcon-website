import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Emergency Lockout Services',
  description: 'Fast, reliable commercial and residential lockout assistance across Auckland. We prioritise practical, non-destructive entry methods 24/7.',
  keywords: 'Lockout Services, Emergency Locksmith, Auckland, Non-destructive entry, Commercial lockout',
  openGraph: {
    title: 'Emergency Lockout Assistance | Falcon Access',
    description: 'Fast, reliable commercial and residential lockout assistance across Auckland. We prioritise practical, non-destructive entry methods 24/7.',
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
        "@type": "Service",
        "name": "Emergency Lockout Services",
        "provider": {
          "@id": "https://falconaccess.co.nz/#organization"
        },
        "description": "Fast, reliable commercial and residential lockout assistance across Auckland."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you arrive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We understand the urgency of a lockout. We prioritise emergency calls and strive to reach your commercial or residential property in Auckland as quickly as possible."
            }
          },
          {
            "@type": "Question",
            "name": "Will my door or lock be damaged?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our primary goal is non-destructive entry. In the vast majority of cases, we can regain access without causing any damage to your existing hardware or defence mechanisms."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to prove I own the property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, for security and liability reasons, we require a basic form of identification to verify your authorisation to access the premises before we begin work."
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
          Fast, practical, and highly reliable assistance when you need access restored immediately.
        </p>
      </div>

      <PhotoContentSection
        imageSrc="/images/services/lockout_photo.webp"
        imageAlt="Cartoonish illustration of professional lock bypass tools and a deadbolt"
        imageTitle="Lockout Services"
        title="Rapid Response When It Matters Most"
        content={[
          <p key="1">Being locked out of your commercial facility or residential home is far more than a minor inconvenience. It disrupts your entire schedule and can compromise your safety. Our property maintenance team specialises in swift, effective lockout resolution across Auckland, charging a simple, incredibly affordable <strong>$20 flat call-out fee</strong> for everything—no quotes, no waiting, and absolutely no hidden costs.</p>,
          <p key="2">We treat emergency access as a vital priority component of our broader maintenance services, ensuring that your property remains functional and completely secure at all times. If you need immediate help, contact us directly at <a href="tel:+6492431404" className="text-brand-accent hover:underline">+64 9 243 1404</a>.</p>,
          <p key="3">We know that a reliable business needs to be accessible in every way. Just as a skilled web developer ensures a website is always online through robust web design, we ensure your physical doors are always open to you when you need them to be.</p>
        ]}
        ctaText="Connect Now"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Non-Destructive Techniques"
        content={[
          <p key="1">Our approach is deeply rooted in practical, honest work. We always prioritise non-destructive entry methods to minimise the cost and hassle of replacing expensive hardware. Your property&apos;s defence is important to us, and we strive to keep it intact.</p>,
          <p key="2">Rather than immediately resorting to drilling or breaking mechanisms, our experienced team utilises specialised tools to bypass locks safely. This preserves the structural integrity of your doors and existing security systems whenever physically possible, saving you significant time and money.</p>,
          <p key="3">We continually update our skill sets and training programme to stay current with the latest lock technologies, ensuring we can handle even the most advanced commercial access control systems with ease and precision.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Our Lockout Process"
        subtitle="A straightforward, transparent approach to regaining access to your property."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "1. Fast Dispatch",
            description: "Call our direct line at +64 9 243 1404. We strictly prioritise emergency maintenance requests and dispatch our highly trained team promptly to your specific location anywhere in Auckland."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "2. Verification",
            description: "For optimal security, we quickly verify your authorisation to access the property before beginning any entry procedures. This protects you and your valuable assets."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>,
            title: "3. Restoration",
            description: "We utilise professional, state-of-the-art tools to safely restore access. If a mechanism has critically failed, we can repair or replace it entirely on the spot to re-secure your premises."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about our highly responsive lockout assistance."
        faqs={[
          {
            question: "How quickly can you arrive?",
            answer: "We understand the intense urgency of a lockout. We prioritise emergency calls and strive to reach your commercial or residential property in Auckland as quickly as humanly possible."
          },
          {
            question: "Will my door or lock be damaged?",
            answer: "Our primary goal is always non-destructive entry. In the vast majority of cases, we can regain access without causing any damage whatsoever to your existing hardware."
          },
          {
            question: "Do I need to prove I own the property?",
            answer: "Yes, for strict security and liability reasons, we absolutely require a basic form of identification to verify your authorisation to access the premises before we begin any work."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
