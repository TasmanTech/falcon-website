import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn more about Falcon Access. We provide premium locksmithing services across NZ with a focus on reliability and high-quality workmanship.",
  keywords: 'About Us, Commercial Repair, Residential Maintenance, Property Maintenance New Zealand, Falcon Access',
  openGraph: {
    title: 'About Us | Falcon Access',
    description: 'Learn more about Falcon Access. We are dedicated to providing honest, practical, and reliable commercial and residential repair and maintenance services across New Zealand.',
    url: 'https://falconaccess.co.nz/about',
  }
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/about/#webpage",
        "url": "https://falconaccess.co.nz/about",
        "name": "About Us | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://falconaccess.co.nz/about" }
        ]
      }
    ]
  };

  return (
    <div className="w-full pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 animate-text-blurb-ready animate-play-text">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
          About Falcon Access
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto">
          Honest, practical, and reliable commercial and residential property maintenance.
        </p>
      </div>

      {/* Section 1: Photo / Content (Photo Left) */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 animate-image-ready animate-play-img">
              <div className="relative aspect-3/2 w-full rounded-2xl overflow-hidden bg-brand-light">
                {/* SVG is used here to avoid API quota limits while maintaining unique images */}
                <Image
                  src="/images/about_photo.svg"
                  alt="Cartoonish illustration representing our team and tools"
                  title="About Falcon Access Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80">
                <p>
                  Falcon Access is a dedicated property maintenance team operating across New Zealand. We specialize in comprehensive commercial and residential repair services, handling everything from routine fixes to urgent troubleshooting.
                </p>
                <p>
                  While we offer specialized services like locksmithing and security hardware installation, our true strength lies in our versatility and readiness to tackle any general maintenance challenge your facility or home might face.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: h2 / Content */}
      <section className="py-24 bg-brand-dark text-brand-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-text-blurb-ready animate-play-text">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Our Honest Approach
          </h2>
          <div className="space-y-6 font-inter text-brand-light/80 text-lg">
            <p>
              We don&apos;t believe in relying on flashy, unsubstantiated credentials. Our reputation is built purely on practical, honest, and reliable hard work. When you call us, you get straight answers and effective solutions without unnecessary upselling.
            </p>
            <p>
              Every property has unique demands, and we approach each job with a commitment to doing things right the first time, ensuring long-lasting stability and functionality for your spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: h2 / Icon-List / SVG */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              What We Bring to the Table
            </h2>
            <p className="text-brand-dark/70 max-w-2xl mx-auto text-lg">
              Our core principles guide every project we undertake.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Efficiency</h4>
              <p className="text-brand-dark/70 font-inter">
                We respect your time. We aim to diagnose and resolve maintenance issues as quickly as possible to minimize disruptions.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Authenticity</h4>
              <p className="text-brand-dark/70 font-inter">
                Honest assessments and practical advice. We provide the repairs you actually need.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Versatility</h4>
              <p className="text-brand-dark/70 font-inter">
                Equipped for a wide range of tasks, from fixing specialized hardware to general facility upkeep.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
