import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';

export const metadata: Metadata = {
  title: 'Emergency Lockout Services Auckland Wide',
  description: 'Fast, reliable commercial and residential lockout assistance across Auckland. We prioritise practical, non-destructive entry methods 24/7.',
  keywords: 'Lockout Services, Emergency Locksmith, Auckland, Non-destructive entry, Commercial lockout, web design, web development, Falcon Access',
  openGraph: {
    title: 'Emergency Lockout Services Auckland Wide',
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
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Lockout Services", "item": "https://falconaccess.co.nz/lock/lockout" }
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
    <div className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeaderSection 
        title="Emergency Lockout Services Auckland Wide"
        subtitle="Fast, reliable emergency lockout assistance. We respond quickly across Auckland City, the North Shore, West Auckland, East Auckland, and South Auckland."
      />

      <PhotoContentSection
        imageSrc="/images/services/lock/lockout/content-1.webp"
        imageAlt="Professional lock bypass tools on a commercial door"
        title="Rapid Response When It Matters Most"
        content={[
          <p key="1">Being locked out of your commercial facility or residential home is far more than a minor inconvenience. It significantly disrupts your schedule and can compromise your safety. Our property maintenance team specialises in swift, effective lockout resolution across Auckland.</p>,
          <p key="2">We charge a brilliantly simple, incredibly affordable <strong>$20 flat call-out fee</strong> for everything. There are no quotes to wait for, no long delays, and absolutely no hidden costs. We treat emergency access as a vital priority component of our broader maintenance services.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Secure and Accessible"
        content={[
          <p key="1">We know that a reliable business needs to be completely accessible in every practical way. Just as a highly skilled web developer ensures a website is always online through exceptionally robust web design, we ensure your physical doors are always open to you when you need them to be.</p>,
          <p key="2">Our approach is deeply rooted in practical, honest work. We continually update our training programme to stay current with the absolute latest lock technologies, ensuring we can handle even the most advanced commercial access control systems with ease and total precision.</p>
        ]}
        theme="white"
      />

      <PhotoContentSection
        imageSrc="/images/services/lock/lockout/content-2.webp"
        imageAlt="Non-destructive entry techniques used by professionals"
        title="Non-Destructive Techniques"
        content={[
          <p key="1">We always prioritise non-destructive entry methods to significantly minimise the cost and hassle of replacing expensive hardware. Your property&apos;s physical defence is important to us, and we firmly strive to keep it entirely intact.</p>,
          <p key="2">Rather than immediately resorting to drilling or breaking mechanisms, our highly experienced team utilises specialised tools to skillfully bypass locks safely. This preserves the structural integrity of your doors, saving you significant time and money.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <IconListSection
        title="Our Lockout Process"
        subtitle="A straightforward, transparent approach to regaining access to your property."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: 'Emergency Lockout Services Auckland Wide',
            description: "Call our direct line at +64 9 243 1404. We strictly prioritise emergency maintenance requests and dispatch our highly trained team promptly to your specific location anywhere in Auckland."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Emergency Lockout Services Auckland Wide',
            description: "For optimal security, we quickly verify your authorisation to access the property before beginning any entry procedures. This protects you and your valuable assets."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>,
            title: 'Emergency Lockout Services Auckland Wide',
            description: "We utilise professional, state-of-the-art tools to safely restore access. If a mechanism has critically failed, we can repair or replace it entirely on the spot to re-secure your premises."
          }
        ]}
        theme="white"
      />

      <CTASection theme="catchy" />

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
