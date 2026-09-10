import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Emergency Lockout Services | Falcon Access',
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

      {/* Section 1: Photo / Content (Photo Left) */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 animate-image-ready animate-play-img">
              <div className="relative aspect-3/2 w-full rounded-2xl overflow-hidden bg-brand-light">
                <Image
                  src="/images/services/lockout_photo.svg"
                  alt="Cartoonish illustration representing lockout tools"
                  title="Lockout Services"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Rapid Response When It Matters
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80">
                <p>
                  Being locked out of your commercial facility or residential home is more than an inconvenience; it can disrupt operations and pose security concerns. Our property maintenance team specializes in swift, effective lockout resolution.
                </p>
                <p>
                  We treat emergency access as a priority component of our broader maintenance services, ensuring that your property remains functional and secure at all times.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="inline-block bg-brand-accent text-white px-8 py-4 rounded-full font-bold hover:bg-brand-accent/90 hover:shadow-md transition-all duration-200">
                  Connect Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: h2 / Content */}
      <section className="py-24 bg-brand-dark text-brand-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-text-blurb-ready animate-play-text">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Non-Destructive Techniques
          </h2>
          <div className="space-y-6 font-inter text-brand-light/80 text-lg">
            <p>
              Our approach is rooted in practical, honest work. We always prioritize non-destructive entry methods to minimize the cost and hassle of replacing hardware.
            </p>
            <p>
              Rather than immediately resorting to drilling, our experienced team utilizes specialized tools to bypass locks safely, preserving the integrity of your doors and existing security systems whenever possible.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: h2 / Icon-List / SVG */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Our Lockout Process
            </h2>
            <p className="text-brand-dark/70 max-w-2xl mx-auto text-lg">
              A straightforward, transparent approach to regaining access.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">1. Fast Dispatch</h4>
              <p className="text-brand-dark/70 font-inter">
                Call our direct line. We prioritize emergency maintenance requests and dispatch our team promptly to your location.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">2. Verification</h4>
              <p className="text-brand-dark/70 font-inter">
                For security, we quickly verify authorization to access the property before beginning any entry procedures.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">3. Restoration</h4>
              <p className="text-brand-dark/70 font-inter">
                We utilize professional tools to safely restore access. If a mechanism has failed, we can repair or replace it on the spot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: FAQ */}
      <section className="py-24 bg-brand-dark text-brand-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-brand-light/70 text-lg">
              Common questions about our lockout assistance.
            </p>
          </div>
          
          <div className="space-y-6">
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                How quickly can you arrive?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">We understand the urgency of a lockout. We prioritize emergency calls and strive to reach your commercial or residential property as quickly as possible.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Will my door or lock be damaged?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Our primary goal is non-destructive entry. In the vast majority of cases, we can regain access without causing any damage to your existing hardware.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Do I need to prove I own the property?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Yes, for security and liability reasons, we require a basic form of identification to verify your authorization to access the premises before we begin work.</p>
            </details>
          </div>
        </div>
      </section>

    </div>
  );
}
