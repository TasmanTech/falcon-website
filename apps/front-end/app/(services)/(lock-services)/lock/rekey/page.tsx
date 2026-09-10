import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hardware Rekeying Services',
  description: 'Cost-effective hardware rekeying for commercial and residential properties. Secure your facility without replacing the entire mechanism.',
  keywords: 'Rekeying, Lock Rekey, Hardware Rekeying, Commercial Security, Falcon Access',
  openGraph: {
    title: 'Hardware Rekeying Services | Falcon Access',
    description: 'Cost-effective hardware rekeying for commercial and residential properties. Secure your facility without replacing the entire mechanism.',
    url: 'https://falconaccess.co.nz/rekey',
  }
};

export default function RekeyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/rekey/#webpage",
        "url": "https://falconaccess.co.nz/rekey",
        "name": "Hardware Rekeying Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Rekeying", "item": "https://falconaccess.co.nz/rekey" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between rekeying and replacing hardware?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Replacing hardware involves removing the entire mechanism from the door. Rekeying simply changes the internal pins of your existing hardware so old keys no longer work, which is usually much faster and more cost-effective."
            }
          },
          {
            "@type": "Question",
            "name": "Can you make all my doors use the same key?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, provided the hardware mechanisms are of the same brand or share the same keyway profile, we can key them alike for your convenience."
            }
          },
          {
            "@type": "Question",
            "name": "Is rekeying suitable for commercial master key systems?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We regularly maintain and rekey complex commercial master key systems to ensure proper access control across different management levels."
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
          Hardware Rekeying
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Secure your property efficiently by changing the keys, not the hardware.
        </p>
      </div>

      {/* Section 1: Photo / Content (Photo Left) */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 animate-image-ready animate-play-img">
              <div className="relative aspect-3/2 w-full rounded-2xl overflow-hidden bg-brand-light">
                <Image
                  src="/images/services/rekey_photo.svg"
                  alt="Cartoonish illustration representing keys and internal hardware pins"
                  title="Rekeying Services"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Economical Access Control
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80">
                <p>
                  When you need to restrict access to a building, you don&apos;t necessarily have to replace all the hardware. Rekeying is a practical property maintenance solution that alters the internal components of your existing mechanisms.
                </p>
                <p>
                  This service renders all previously issued keys useless and provides you with a fresh set, granting you immediate peace of mind at a fraction of the cost of full hardware replacement.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="inline-block bg-brand-accent text-white px-8 py-4 rounded-full font-bold hover:bg-brand-accent/90 hover:shadow-md transition-all duration-200">
                  Book a Rekey ($20 Call Out)
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
            When Should You Rekey?
          </h2>
          <div className="space-y-6 font-inter text-brand-light/80 text-lg">
            <p>
              We recommend rekeying whenever there is a change in occupancy or a potential security risk. This is highly common for commercial spaces experiencing employee turnover or residential properties changing tenants or owners.
            </p>
            <p>
              If your current hardware is physically sound and operating smoothly, rekeying is the honest, efficient recommendation to secure your premises without upselling unnecessary equipment.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: h2 / Icon-List / SVG */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Benefits of Rekeying
            </h2>
            <p className="text-brand-dark/70 max-w-2xl mx-auto text-lg">
              A straightforward approach to managing building access.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Cost-Effective</h4>
              <p className="text-brand-dark/70 font-inter">
                Save significantly by utilizing your existing, functional hardware instead of buying entirely new sets for every door.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Keying Alike</h4>
              <p className="text-brand-dark/70 font-inter">
                Reduce the number of keys you carry by configuring multiple doors to operate on a single, unified key.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Immediate Security</h4>
              <p className="text-brand-dark/70 font-inter">
                Instantly revoke access from old tenants, lost keys, or former employees, restoring complete control over your premises.
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
              Common questions about our rekeying services.
            </p>
          </div>
          
          <div className="space-y-6">
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                What is the difference between rekeying and replacing hardware?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Replacing hardware involves removing the entire mechanism from the door. Rekeying simply changes the internal pins of your existing hardware so old keys no longer work, which is usually much faster and more cost-effective.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Can you make all my doors use the same key?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Yes, provided the hardware mechanisms are of the same brand or share the same keyway profile, we can key them alike for your convenience.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Is rekeying suitable for commercial master key systems?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Absolutely. We regularly maintain and rekey complex commercial master key systems to ensure proper access control across different management levels.</p>
            </details>
          </div>
        </div>
      </section>

    </div>
  );
}
