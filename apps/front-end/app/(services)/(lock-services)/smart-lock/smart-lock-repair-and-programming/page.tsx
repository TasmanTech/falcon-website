import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Smart Lock Diagnostics & Repair | Falcon Access',
  description: 'Expert diagnostics and repair for smart locks and electronic access systems. Restore functionality to your commercial or residential property.',
  keywords: 'Smart Lock Repair, Electronic Lock Diagnostics, Keypad Repair, Access Control Fix, Falcon Access',
  openGraph: {
    title: 'Smart Lock Diagnostics & Repair | Falcon Access',
    description: 'Expert diagnostics and repair for smart locks and electronic access systems. Restore functionality to your commercial or residential property.',
    url: 'https://falconaccess.co.nz/smart-lock-repair',
  }
};

export default function SmartLockRepairPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock-repair/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock-repair",
        "name": "Smart Lock Diagnostics & Repair | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Repair", "item": "https://falconaccess.co.nz/smart-lock-repair" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I know if my smart lock is broken or just out of batteries?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most smart locks will flash a red light or emit a specific beep when the battery is low. If replacing the batteries with fresh, high-quality ones doesn't resolve the issue, the motor or electronic board may require professional repair."
            }
          },
          {
            "@type": "Question",
            "name": "Can you fix a smart lock that keeps jamming?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Jamming is often a mechanical issue caused by a misaligned strike plate rather than an electronic failure. We can realign the door frame to eliminate friction and restore smooth motor operation."
            }
          },
          {
            "@type": "Question",
            "name": "Are smart lock repairs more expensive than standard hardware?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It depends on the issue. Mechanical realignments cost the same as standard doors. If an internal electronic component has failed, we will provide a transparent estimate to determine if repair or replacement is the more economical choice."
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
          Smart System Diagnostics
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Expert troubleshooting and repair for electronic and smart access hardware.
        </p>
      </div>

      {/* Section 1: Photo / Content (Photo Left) */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 animate-image-ready animate-play-img">
              <div className="relative aspect-3/2 w-full rounded-2xl overflow-hidden bg-brand-light">
                <Image
                  src="/images/services/smart-lock-repair_photo.svg"
                  alt="Cartoonish illustration representing electronic hardware diagnostics"
                  title="Smart Lock Diagnostics"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Restoring Digital Access
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80">
                <p>
                  When a smart lock or electronic access system fails, it can completely disrupt the flow of your commercial facility or leave your home vulnerable. These modern systems require specialized knowledge that goes beyond traditional mechanical hardware.
                </p>
                <p>
                  Our property maintenance experts are equipped to troubleshoot both the physical mechanisms and the electronic components of your smart hardware, providing comprehensive diagnostics to get your system back online quickly.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="inline-block bg-brand-accent text-white px-8 py-4 rounded-full font-bold hover:bg-brand-accent/90 hover:shadow-md transition-all duration-200">
                  Request a Diagnostic ($20 Call Out)
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
            Identifying the Root Cause
          </h2>
          <div className="space-y-6 font-inter text-brand-light/80 text-lg">
            <p>
              Smart hardware issues often present as electronic failures (like a dead keypad or lost Wi-Fi connection) when the underlying cause is actually mechanical. A slightly misaligned door can force the lock's motor to work overtime, rapidly draining batteries and eventually burning out the mechanism.
            </p>
            <p>
              We take a practical, holistic approach to repair. Instead of immediately replacing expensive electronic boards, we assess the entire door structure to ensure the physical alignment is perfect before addressing network or power issues.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: h2 / Icon-List / SVG */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Common Electronic Issues
            </h2>
            <p className="text-brand-dark/70 max-w-2xl mx-auto text-lg">
              We troubleshoot and repair a wide range of smart system faults.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Motor Fatigue</h4>
              <p className="text-brand-dark/70 font-inter">
                Resolving mechanical friction and realigning strike plates so the internal motor can operate smoothly without draining power.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Connectivity Drops</h4>
              <p className="text-brand-dark/70 font-inter">
                Diagnosing unresponsive keypads and troubleshooting lost connections to your local Wi-Fi or smart home hub.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">System Resets</h4>
              <p className="text-brand-dark/70 font-inter">
                Performing hard factory resets for malfunctioning units and assisting with reprogramming access codes and network settings.
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
              Common questions about electronic hardware repair.
            </p>
          </div>
          
          <div className="space-y-6">
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                How do I know if my smart lock is broken or just out of batteries?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Most smart locks will flash a red light or emit a specific beep when the battery is low. If replacing the batteries with fresh, high-quality ones doesn't resolve the issue, the motor or electronic board may require professional repair.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Can you fix a smart lock that keeps jamming?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Yes. Jamming is often a mechanical issue caused by a misaligned strike plate rather than an electronic failure. We can realign the door frame to eliminate friction and restore smooth motor operation.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Are smart lock repairs more expensive than standard hardware?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">It depends on the issue. Mechanical realignments cost the same as standard doors. If an internal electronic component has failed, we will provide a transparent estimate to determine if repair or replacement is the more economical choice.</p>
            </details>
          </div>
        </div>
      </section>

    </div>
  );
}
