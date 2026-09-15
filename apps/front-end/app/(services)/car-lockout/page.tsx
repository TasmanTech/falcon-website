import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Vehicle Lockout Services',
  description: 'Fast, non-destructive vehicle lockout assistance across Auckland. Our 24/7 mobile fleet gets you back on the road safely and quickly.',
  keywords: 'Car Lockout, Auto Locksmith, Auckland, Vehicle Lockout, web design, Falcon Access',
  openGraph: {
    title: 'Vehicle Lockout Services | Falcon Access',
    description: 'Fast, non-destructive vehicle lockout assistance across Auckland. Our 24/7 mobile fleet gets you back on the road safely and quickly.',
    url: 'https://falconaccess.co.nz/car-lockout',
  }
};

export default function CarLockoutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/car-lockout/#webpage",
        "url": "https://falconaccess.co.nz/car-lockout",
        "name": "Vehicle Lockout Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Auto Services", "item": "https://falconaccess.co.nz/auto" },
          { "@type": "ListItem", "position": 3, "name": "Vehicle Lockout", "item": "https://falconaccess.co.nz/car-lockout" }
        ]
      },
      {
        "@type": "Service",
        "name": "Vehicle Lockout Services",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Fast, non-destructive vehicle lockout assistance across Auckland."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can you open my specific make and model?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our tools and techniques are effective on the vast majority of modern and classic vehicles, regardless of the manufacturer."
            }
          },
          {
            "@type": "Question",
            "name": "Will gaining entry damage my car's paint or weather stripping?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We use specialised, protective tools designed specifically to bypass the lock mechanism without scratching the paint or tearing the weather seals."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to prove ownership of the vehicle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. For legal and security reasons, we require a valid form of identification and proof of ownership or authorisation to access the vehicle before we begin."
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
          Vehicle Lockout Services
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Fast, non-destructive entry when you are locked out of your car anywhere in Auckland.
        </p>
      </div>

      <PhotoContentSection
        imageSrc="/images/services/car-lockout_photo.webp"
        imageAlt="Cartoonish illustration of an automotive wedge tool and car key fob"
        imageTitle="Vehicle Lockout Assistance"
        title="Back on the Road Safely and Quickly"
        content={[
          <p key="1">Locking your keys inside your vehicle or the boot is a stressful and incredibly common situation. Our mobile team provides rapid response vehicle lockout assistance across Auckland. We offer a transparent and incredibly affordable <strong>$20 flat call-out fee</strong> for everything—no quotes, no waiting, and no hidden costs.</p>,
          <p key="2">We operate a 24/7 mobile fleet to ensure we can reach you exactly when you need us. Just as a top-tier web developer ensures a web design project launches smoothly without errors, we ensure your lockout is resolved swiftly and flawlessly. Call us directly at <a href="tel:+6492431404" className="text-brand-accent hover:underline">+64 9 243 1404</a>.</p>
        ]}
        ctaText="Request Emergency Access"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="A Practical, Honest Approach"
        content={[
          <p key="1">Modern vehicles feature highly complex security systems and tightly sealed cabins. We absolutely do not rely on outdated or damaging methods like coat hangers or excessive force. Such methods can bend your door frame, ruin weather stripping, or shatter glass, leading to extremely expensive repairs.</p>,
          <p key="2">Instead, we specialise in non-destructive entry. Our approach is straightforward and highly professional: we arrive quickly at your location, verify ownership for your security, and use precise techniques to bypass the lock and safely recover your keys. Your vehicle&apos;s defence mechanisms remain completely intact.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="Our Vehicle Service Promise"
        subtitle="Reliable, damage-free assistance when you are stranded."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "Rapid Dispatch",
            description: "We strictly prioritise vehicle lockouts. Our Auckland mobile fleet ensures you aren't left waiting by the side of the road or in an unfamiliar parking lot."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Damage-Free",
            description: "Protecting your vehicle's paint, glass, and internal wiring is our absolute top priority during the entire entry process. We use specialised protective tools."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: "Universal Capability",
            description: "We are fully equipped to handle a vast array of vehicle makes and models, from older mechanical locks to modern electronic security systems."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about our vehicle lockout services."
        faqs={[
          {
            question: "Can you open my specific make and model?",
            answer: "Yes, our tools and techniques are effective on the vast majority of modern and classic vehicles, regardless of the manufacturer."
          },
          {
            question: "Will gaining entry damage my car's paint or weather stripping?",
            answer: "No. We use specialised, protective tools designed specifically to bypass the lock mechanism without scratching the paint or tearing the weather seals."
          },
          {
            question: "Do I need to prove ownership of the vehicle?",
            answer: "Yes. For legal and security reasons, we require a valid form of identification and proof of ownership or authorisation to access the vehicle before we begin."
          }
        ]}
        theme="dark"
      />
    </div>
  );
}
