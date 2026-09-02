import { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
export const metadata: Metadata = {
  title: 'Locksmith Auckland',
  description: 'Auckland\'s trusted commercial and residential locksmiths serving homeowners, government, and businesses across New Zealand. Available 24/7.',
  keywords: 'Locksmith Auckland, Commercial Locksmith, Residential Locksmith, Emergency Locksmith, [Brand Name]',
  openGraph: {
    title: 'Locksmith Auckland | [Brand Name]',
    description: 'Auckland\'s trusted commercial and residential locksmiths serving homeowners, government, and businesses across New Zealand. Available 24/7.',
    url: 'https://brandname.co.nz/',
  }
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://brandname.co.nz/#webpage",
        "url": "https://brandname.co.nz/",
        "name": "Locksmith Auckland | [Brand Name]",
        "isPartOf": { "@id": "https://brandname.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brandname.co.nz/" }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <Hero
        title="Auckland's Trusted Locksmith"
        description="Commercial, residential & automotive locksmiths serving homeowners, government & local businesses across Auckland & New Zealand."
        imageSrc="/hero/auckland-commercial-locksmith.webp"
        imageAlt="Auckland Commercial Locksmith Services"
        ctaText="Get Expert Locksmith Help Now"
        ctaLink="/contact"
        isMain={true}
      />

      {/* Content Section */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">

            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Why [Brand Name]?
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80 mb-8">
                <p>
                  We do not just follow industry standards. We set them. [Brand Name] has a long history and were founding members of the Master Locksmiths Association.
                </p>
                <p>
                  We also pioneered master keying and restricted security systems in New Zealand.
                </p>
              </div>
              <ul className="space-y-4 mb-10 font-bold font-inter text-brand-dark/90">
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Trade qualified, licensed & fully insured technicians
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Original members of the Master Locksmiths Association
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Trusted by government & commercial clients
                </li>
              </ul>
              <Link href="/contact" className="inline-block bg-brand-primary text-white px-8 py-4 rounded-lg font-bold hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                Contact Us
              </Link>
            </div>

            <div className="w-full md:w-1/2 animate-svg-ready animate-play-svg">
              <div className="bg-brand-secondary/10 rounded-2xl p-12 aspect-square flex items-center justify-center border border-brand-secondary/20">
                {/* SVG Graphic Placeholder */}
                <svg className="w-full h-full text-brand-primary/50" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 20C55.8 20 20 55.8 20 100C20 144.2 55.8 180 100 180C144.2 180 180 144.2 180 100C180 55.8 144.2 20 100 20ZM132.8 84.8L92.8 124.8C91.2 126.4 89.2 127.2 87.2 127.2C85.2 127.2 83.2 126.4 81.6 124.8L67.2 110.4C64 107.2 64 102 67.2 98.8C70.4 95.6 75.6 95.6 78.8 98.8L87.2 107.2L121.2 73.2C124.4 70 129.6 70 132.8 73.2C136 76.4 136 81.6 132.8 84.8Z" fill="currentColor" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
