import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Smart Lock Installation | Falcon Access',
  description: 'Upgrade your commercial or residential property with modern smart lock systems. Professional installation and integration across New Zealand.',
  keywords: 'Smart Lock Installation, Electronic Locks, Digital Keypad, Access Control Upgrade, Falcon Access',
  openGraph: {
    title: 'Smart Lock Installation | Falcon Access',
    description: 'Upgrade your commercial or residential property with modern smart lock systems. Professional installation and integration across New Zealand.',
    url: 'https://falconaccess.co.nz/smart-lock-change',
  }
};

export default function SmartLockChangePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock-change/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock-change",
        "name": "Smart Lock Installation | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Installation", "item": "https://falconaccess.co.nz/smart-lock-change" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Will a smart lock fit on my existing door?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In most cases, yes. The majority of modern smart locks are designed to fit standard door preparations. We can assess your door and make any necessary adjustments during installation."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if the battery dies or the power goes out?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most smart locks are battery-operated and will not be affected by a home power outage. They also provide ample low-battery warnings. Many models feature a physical key backup or external battery jump terminals."
            }
          },
          {
            "@type": "Question",
            "name": "Can you integrate the lock with my existing smart home system?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, depending on the lock model and your current hub (like Z-Wave, Zigbee, or Wi-Fi systems), we can ensure proper integration during the setup process."
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
          Smart System Upgrades
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Modernize your property access with professional electronic and smart lock installations.
        </p>
      </div>

      {/* Section 1: Photo / Content (Photo Left) */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 animate-image-ready animate-play-img">
              <div className="relative aspect-3/2 w-full rounded-2xl overflow-hidden bg-brand-light">
                <Image
                  src="/images/services/smart-lock-change_photo.svg"
                  alt="Cartoonish illustration representing digital keypads and electronic access"
                  title="Smart Lock Installation"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Intelligent Access Control
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80">
                <p>
                  Upgrading to electronic and smart access systems is a vital step in modernizing both commercial facilities and residential homes. We provide end-to-end installation services for a wide variety of digital hardware.
                </p>
                <p>
                  Transitioning away from traditional physical keys not only enhances convenience but allows for detailed tracking, temporary access codes, and immediate revocation of privileges without the need for hardware rekeying.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="inline-block bg-brand-accent text-white px-8 py-4 rounded-full font-bold hover:bg-brand-accent/90 hover:shadow-md transition-all duration-200">
                  Request an Upgrade
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
            Professional Installation Matters
          </h2>
          <div className="space-y-6 font-inter text-brand-light/80 text-lg">
            <p>
              While many smart locks are marketed as DIY projects, improper installation can lead to binding mechanisms, reduced battery life, and compromised security.
            </p>
            <p>
              Our property maintenance team ensures that the door frame, latch hole, and strike plate are perfectly aligned. We take the time to securely mount the hardware and assist with the initial network configuration, providing a truly reliable setup.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: h2 / Icon-List / SVG */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Advantages of Smart Hardware
            </h2>
            <p className="text-brand-dark/70 max-w-2xl mx-auto text-lg">
              Enhance the functionality and security of your building.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Keyless Convenience</h4>
              <p className="text-brand-dark/70 font-inter">
                Eliminate the hassle of lost physical keys. Enter using PIN codes, biometric scanners, or smartphone applications.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Audit Trails</h4>
              <p className="text-brand-dark/70 font-inter">
                Monitor exactly who enters your commercial facility and at what time, providing vital oversight for business managers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Temporary Access</h4>
              <p className="text-brand-dark/70 font-inter">
                Generate temporary codes for contractors, cleaners, or guests that automatically expire after a scheduled duration.
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
              Common questions about smart lock upgrades.
            </p>
          </div>
          
          <div className="space-y-6">
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Will a smart lock fit on my existing door?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">In most cases, yes. The majority of modern smart locks are designed to fit standard door preparations. We can assess your door and make any necessary adjustments during installation.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                What happens if the battery dies or the power goes out?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Most smart locks are battery-operated and will not be affected by a home power outage. They also provide ample low-battery warnings. Many models feature a physical key backup or external battery jump terminals.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Can you integrate the lock with my existing smart home system?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Yes, depending on the lock model and your current hub (like Z-Wave, Zigbee, or Wi-Fi systems), we can ensure proper integration during the setup process.</p>
            </details>
          </div>
        </div>
      </section>

    </div>
  );
}
