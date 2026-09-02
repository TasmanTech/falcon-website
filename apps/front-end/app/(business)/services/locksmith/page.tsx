import { Metadata } from 'next';
import Hero from '@/components/Hero';
export const metadata: Metadata = {
  title: 'Emergency Locksmith',
  description: 'Emergency and scheduled locksmithing for all your needs. We provide rapid response and high-security installations day or night across New Zealand.',
  keywords: 'Emergency Locksmith, Mobile Locksmith, 24/7 Locksmith, Key Cutting, Damage-Free Entry, [Brand Name]',
  openGraph: {
    title: 'Emergency Locksmith | [Brand Name]',
    description: 'Emergency and scheduled locksmithing for all your needs. We provide rapid response and high-security installations day or night across New Zealand.',
    url: 'https://brandname.co.nz/services/locksmith',
  }
};

export default function LocksmithServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://brandname.co.nz/services/locksmith/#webpage",
        "url": "https://brandname.co.nz/services/locksmith",
        "name": "Emergency Locksmith | [Brand Name]",
        "isPartOf": { "@id": "https://brandname.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brandname.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://brandname.co.nz/services" },
          { "@type": "ListItem", "position": 3, "name": "Locksmith", "item": "https://brandname.co.nz/services/locksmith" }
        ]
      },
      {
        "@type": "Service",
        "name": "Emergency and Mobile Locksmith Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": "[Brand Name]",
          "image": "https://brandname.co.nz/hero/mobile-emergency-locksmith.webp"
        },
        "areaServed": "New Zealand",
        "description": "Emergency and scheduled locksmithing for all your needs. We provide rapid response and high-security installations day or night.",
        "serviceType": "Locksmith"
      }
    ]
  };

  return (
    <div className="w-full">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <Hero
        title="Emergency & Mobile Locksmith Services"
        description="Emergency and scheduled locksmithing for all your needs. We provide rapid response and high-security installations day or night."
        imageSrc="/hero/mobile-emergency-locksmith.webp"
        imageAlt="Mobile Emergency Locksmith Services"
        ctaText="Call Us Now"
        ctaLink="/contact"
      />

      {/* Content Section */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">

            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Fast, Reliable Help When You Need It
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80 mb-8">
                <p>
                  Being locked out is stressful. Our mobile vans are fully equipped workshops ready to solve any security or access issue on the spot.
                </p>
                <p>
                  Whether you've lost your keys, need your locks rekeyed after a break-in, or just want to upgrade your home's security, our certified technicians are on call 24/7.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 font-bold font-inter text-brand-dark/90">
                <li className="flex items-center gap-3 bg-white p-4 rounded-lg border border-brand-dark/10 shadow-sm">
                  <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  24/7 Availability
                </li>
                <li className="flex items-center gap-3 bg-white p-4 rounded-lg border border-brand-dark/10 shadow-sm">
                  <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Rapid Response
                </li>
                <li className="flex items-center gap-3 bg-white p-4 rounded-lg border border-brand-dark/10 shadow-sm">
                  <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  Damage-Free Entry
                </li>
                <li className="flex items-center gap-3 bg-white p-4 rounded-lg border border-brand-dark/10 shadow-sm">
                  <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                  On-Site Key Cutting
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/2 animate-svg-ready animate-play-svg">
              <div className="bg-brand-secondary/10 rounded-2xl p-12 aspect-square flex items-center justify-center border border-brand-secondary/20">
                {/* SVG Graphic Placeholder */}
                <svg className="w-full h-full text-brand-primary/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 9v3l-5 5-5-5V9" />
                  <path d="M7.5 9v11" />
                  <path d="M14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
