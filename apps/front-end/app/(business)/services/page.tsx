import { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our high-quality locksmithing services in New Zealand. We specialize in comprehensive security solutions, commercial systems, and household locks.',
  keywords: 'Locksmith Services, Security Solutions, Commercial Security, Household Locks, New Zealand Locksmith, [Brand Name]',
  openGraph: {
    title: 'Our Services | [Brand Name]',
    description: 'Explore our high-quality locksmithing services in New Zealand. We specialize in comprehensive security solutions, commercial systems, and household locks.',
    url: 'https://brandname.co.nz/services',
  }
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://brandname.co.nz/services/#webpage",
        "url": "https://brandname.co.nz/services",
        "name": "Our Services | [Brand Name]",
        "isPartOf": { "@id": "https://brandname.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brandname.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://brandname.co.nz/services" }
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
        title="Locksmith Services for Homes & Businesses"
        description="[Brand Name] specialize in comprehensive security solutions, including commercial security systems, household locks, and safety fittings designed to safeguard your property."
        imageSrc="/hero/security-access-systems.webp"
        imageAlt="Security and Access Systems"
      />

      {/* Content Section */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-card-ready animate-play">

            <div className="bg-white rounded-xl shadow-sm border border-brand-dark/10 overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-video bg-brand-secondary/10 flex items-center justify-center p-8">
                {/* SVG Image placeholder */}
                <svg className="w-full h-full text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  <path d="M17.5 9v3l-5 5-5-5V9" />
                  <path d="M7.5 9v11" />
                </svg>
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-montserrat font-bold mb-4">Mobile Locksmiths</h3>
                <p className="text-brand-dark/80 font-inter mb-6 grow">
                  Get prompt, reliable assistance with our mobile and emergency locksmith services. Day or night, our experts are available 24/7.
                </p>
                <Link href="/services/locksmith" className="text-brand-primary font-bold hover:text-brand-accent transition-colors font-inter">
                  Find Mobile Locksmiths &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-brand-dark/10 overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-video bg-brand-secondary/10 flex items-center justify-center p-8">
                {/* SVG Image placeholder */}
                <svg className="w-full h-full text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-montserrat font-bold mb-4">Locks</h3>
                <p className="text-brand-dark/80 font-inter mb-6 grow">
                  Explore our locks, including mechanical, electronic and digital locks, for homes and businesses. We also offer lock installation.
                </p>
                <Link href="/services/locksmith" className="text-brand-primary font-bold hover:text-brand-accent transition-colors font-inter">
                  Browse Locks &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-brand-dark/10 overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-video bg-brand-secondary/10 flex items-center justify-center p-8">
                {/* SVG Image placeholder */}
                <svg className="w-full h-full text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-montserrat font-bold mb-4">Keys</h3>
                <p className="text-brand-dark/80 font-inter mb-6 grow">
                  Discover our comprehensive key services, from house key cutting and duplication to custom solutions for commercial.
                </p>
                <Link href="/services/locksmith" className="text-brand-primary font-bold hover:text-brand-accent transition-colors font-inter">
                  Shop Keys &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
