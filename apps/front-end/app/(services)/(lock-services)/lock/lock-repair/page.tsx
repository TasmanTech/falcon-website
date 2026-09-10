import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hardware & Lock Repair Services | Falcon Access',
  description: 'Reliable hardware and lock repair for commercial and residential properties. We fix faulty mechanisms efficiently to restore your security.',
  keywords: 'Lock Repair, Hardware Repair, Commercial Maintenance, Residential Repair, Falcon Access',
  openGraph: {
    title: 'Hardware & Lock Repair Services | Falcon Access',
    description: 'Reliable hardware and lock repair for commercial and residential properties. We fix faulty mechanisms efficiently to restore your security.',
    url: 'https://falconaccess.co.nz/lock-repair',
  }
};

export default function LockRepairPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock-repair/#webpage",
        "url": "https://falconaccess.co.nz/lock-repair",
        "name": "Hardware & Lock Repair Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Repair", "item": "https://falconaccess.co.nz/lock-repair" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Should I repair or replace my faulty lock?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Whenever possible, we prefer to repair existing hardware to save you money. However, if internal mechanisms are completely worn out, we'll offer a straightforward replacement recommendation."
            }
          },
          {
            "@type": "Question",
            "name": "Can you fix commercial glass door locks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we handle a wide range of commercial and residential hardware, including specialized mortise locks and glass door hardware."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a repair usually take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most standard hardware repairs are completed within an hour of our arrival, depending on the severity of the damage or misalignment."
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
          Hardware & Lock Repair
        </h1>
        <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
          Practical repair solutions to keep your property secure and functioning smoothly.
        </p>
      </div>

      {/* Section 1: Photo / Content (Photo Left) */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 animate-image-ready animate-play-img">
              <div className="relative aspect-3/2 w-full rounded-2xl overflow-hidden bg-brand-light">
                <Image
                  src="/images/services/lock-repair_photo.svg"
                  alt="Cartoonish illustration representing hardware and lock repair tools"
                  title="Hardware Repair"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Restoring Functionality
              </h2>
              <div className="space-y-4 font-inter text-brand-dark/80">
                <p>
                  A sticking or broken mechanism isn't just frustrating; it can compromise the security of your entire building. As part of our comprehensive property maintenance services, we specialize in diagnosing and fixing faulty hardware.
                </p>
                <p>
                  From residential deadbolts to heavy-duty commercial latches, our goal is to identify the root cause of the issue and implement a lasting, reliable repair.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="inline-block bg-brand-accent text-white px-8 py-4 rounded-full font-bold hover:bg-brand-accent/90 hover:shadow-md transition-all duration-200">
                  Discuss Your Issue ($20 Call Out)
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
            Repair First, Replace Only When Necessary
          </h2>
          <div className="space-y-6 font-inter text-brand-light/80 text-lg">
            <p>
              We believe in honest, hard work over upselling unnecessary replacements. Many hardware issues stem from simple misalignment, dirt buildup, or minor component failure.
            </p>
            <p>
              Our technicians will carefully disassemble and assess the mechanism. If a simple repair or adjustment can reliably solve the problem, that is the route we take, saving you both time and money.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: h2 / Icon-List / SVG */}
      <section className="py-24 bg-brand-light text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Common Issues We Fix
            </h2>
            <p className="text-brand-dark/70 max-w-2xl mx-auto text-lg">
              We handle a wide array of wear-and-tear related problems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Misaligned Strikes</h4>
              <p className="text-brand-dark/70 font-inter">
                Often caused by building settlement or sagging doors, preventing the latch from properly securing into the frame.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Internal Component Failure</h4>
              <p className="text-brand-dark/70 font-inter">
                Broken springs, seized cylinders, or snapped tailpieces that prevent smooth operation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">Sticking & Binding</h4>
              <p className="text-brand-dark/70 font-inter">
                Hardware that requires excessive force to turn or pull, often remedied through proper cleaning and lubrication.
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
              Common questions about our repair services.
            </p>
          </div>
          
          <div className="space-y-6">
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Should I repair or replace my faulty lock?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Whenever possible, we prefer to repair existing hardware to save you money. However, if internal mechanisms are completely worn out, we'll offer a straightforward replacement recommendation.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                Can you fix commercial glass door locks?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Yes, we handle a wide range of commercial and residential hardware, including specialized mortise locks and glass door hardware.</p>
            </details>
            
            <details className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-brand-light font-montserrat font-bold text-lg">
                How long does a repair usually take?
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-brand-light/70 font-inter">Most standard hardware repairs are completed within an hour of our arrival, depending on the severity of the damage or misalignment.</p>
            </details>
          </div>
        </div>
      </section>

    </div>
  );
}
