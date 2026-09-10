import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';

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

      {/* Section 1: Photo / Content (Photo Left) */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 animate-image-ready animate-play-img">
              <div className="relative aspect-3/2 w-full rounded-2xl overflow-hidden bg-brand-light">
                <Image
                  src="/images/general_repair_tools.webp"
                  alt="General Repair Tools"
                  title="General Maintenance Equipment"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Comprehensive Property Care
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80 mb-8">
                <p>
                  Maintaining a commercial facility or a residential property requires attention to detail and a wide array of skills. We provide general repair and maintenance services designed to keep your spaces functional, safe, and looking their best.
                </p>
                <p>
                  From routine checks to emergency fixes, our dedicated team handles everything from minor hardware replacements to extensive hardware repairs, ensuring your property remains in optimal condition.
                </p>
              </div>
              <Link href="/contact" className="inline-block bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-bold hover:bg-brand-accent/90 hover:-translate-y-1 transition-all duration-200">
                Discuss Your Needs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Center Text Content */}
      <section className="py-24 bg-brand-dark text-brand-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-text-blurb-ready animate-play-text">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Our Commitment to Quality
          </h2>
          <h3 className="text-xl text-brand-accent font-semibold mb-6">
            Authentic, Reliable Service Every Time
          </h3>
          <div className="space-y-6 font-inter text-brand-light/80 text-lg">
            <p>
              At Falcon Access, we believe in doing the job right. We bring years of hands-on experience and a practical approach to every repair task we undertake. We don&apos;t rely on flashy credentials; instead, we let the quality of our hard work speak for itself.
            </p>
            <p>
              Whether it&apos;s a broken door hinge, a faulty mechanism, or general wear and tear, we focus on delivering effective, long-lasting solutions tailored specifically to your property&apos;s requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Content / Photo (Photo Right) */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="w-full md:w-1/2 animate-image-ready animate-play-img">
              <div className="relative aspect-3/2 w-full rounded-2xl overflow-hidden bg-brand-light">
                <Image
                  src="/images/locksmith_tools.webp"
                  alt="Specialized Locksmith Tools"
                  title="Lock and Hardware Repair"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Specialized Services
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80 mb-8">
                <p>
                  While we handle general repairs, we also provide specialized services including commercial and residential locksmithing. Securing your premises is a crucial aspect of property maintenance.
                </p>
                <p>
                  Our services include lock replacements, rekeying, and hardware installation. We ensure that every access point in your building is fully operational and secure, providing peace of mind for business owners and homeowners alike.
                </p>
              </div>
              <Link href="/lockout" className="inline-block bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-bold hover:bg-brand-accent/90 hover:-translate-y-1 transition-all duration-200">
                View Lock Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: h2 / icon-list / SVG */}
      <section className="py-24 bg-brand-dark text-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Why Choose Falcon Access?
            </h2>
            <p className="text-brand-light/70 max-w-2xl mx-auto text-lg">
              We provide practical, efficient solutions for all your maintenance needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-light/5 rounded-2xl p-8 border border-brand-light/10 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent animate-svg-ready animate-play-svg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Prompt Response</h4>
              <p className="text-brand-light/70 font-inter">
                We understand that maintenance issues can disrupt your day. We prioritize quick, efficient service to get things back on track.
              </p>
            </div>

            <div className="bg-brand-light/5 rounded-2xl p-8 border border-brand-light/10 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent animate-svg-ready animate-play-svg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Versatile Skillset</h4>
              <p className="text-brand-light/70 font-inter">
                From basic repairs to specialized hardware installations, our team is equipped to handle a wide variety of tasks.
              </p>
            </div>

            <div className="bg-brand-light/5 rounded-2xl p-8 border border-brand-light/10 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent animate-svg-ready animate-play-svg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Honest Work</h4>
              <p className="text-brand-light/70 font-inter">
                We believe in transparent communication and authentic service. We provide practical solutions without unnecessary upselling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-brand-dark/70 text-lg">
              Common questions about our repair and maintenance services.
            </p>
          </div>

          <div className="space-y-6">
            <details className="group bg-white rounded-xl shadow-sm border border-brand-dark/5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-dark font-montserrat font-bold text-lg">
                What types of properties do you service?
                <span className="relative size-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-dark/70 font-inter">We service a wide range of properties including residential homes, commercial offices, retail spaces, and industrial facilities across New Zealand.</p>
            </details>
            
            <details className="group bg-white rounded-xl shadow-sm border border-brand-dark/5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-dark font-montserrat font-bold text-lg">
                Do you only provide locksmithing services?
                <span className="relative size-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-dark/70 font-inter">No, while locksmithing and security hardware is one of our specialized services, we provide comprehensive general repair and property maintenance solutions for all your needs.</p>
            </details>
            
            <details className="group bg-white rounded-xl shadow-sm border border-brand-dark/5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-dark font-montserrat font-bold text-lg">
                Do you offer emergency repairs?
                <span className="relative size-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-dark/70 font-inter">Yes, we understand that some maintenance issues simply cannot wait. We offer prompt responses for urgent repair needs to secure your property and restore functionality.</p>
            </details>
            
            <details className="group bg-white rounded-xl shadow-sm border border-brand-dark/5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-dark font-montserrat font-bold text-lg">
                Are your services guaranteed?
                <span className="relative size-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-dark/70 font-inter">Absolutely. We pride ourselves on honest, authentic work. If something isn&apos;t right, we will make it right. We focus on delivering long-lasting, practical solutions.</p>
            </details>
          </div>
        </div>
      </section>

    </div>
  );
}
