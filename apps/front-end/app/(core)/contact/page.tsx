import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Falcon Access for commercial and residential repair, maintenance, and emergency services across New Zealand.',
  keywords: 'Contact Falcon Access, Property Maintenance Contact, Repair Services New Zealand',
  openGraph: {
    title: 'Contact Us | Falcon Access',
    description: 'Get in touch with Falcon Access for commercial and residential repair, maintenance, and emergency services across New Zealand.',
    url: 'https://falconaccess.co.nz/contact',
  }
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/contact/#webpage",
        "url": "https://falconaccess.co.nz/contact",
        "name": "Contact Us | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://falconaccess.co.nz/contact" }
        ]
      }
    ]
  };

  return (
    <div className="w-full pt-32 pb-24 bg-brand-light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark">
            Get in Touch
          </h1>
          <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto font-inter">
            Whether you need a quote for an upcoming project or require urgent assistance, our team is ready to help. Reach out using the details below or fill out our contact form.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2 space-y-8 animate-text-blurb-ready animate-play-text" style={{ animationDelay: '100ms' }}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/5">
              <h2 className="text-2xl font-bold font-montserrat text-brand-dark mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-montserrat text-brand-dark/70 uppercase tracking-wider mb-1">Phone</h3>
                    <a href="tel:+6492431404" className="text-lg font-bold text-brand-dark hover:text-brand-accent transition-colors">+64 9 243 1404</a>
                    <p className="text-sm text-brand-dark/70 font-inter mt-1">Available 24/7 for emergencies.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-montserrat text-brand-dark/70 uppercase tracking-wider mb-1">Email</h3>
                    <a href="mailto:info@falconaccess.co.nz" className="text-lg font-bold text-brand-dark hover:text-brand-accent transition-colors">info@falconaccess.co.nz</a>
                    <p className="text-sm text-brand-dark/70 font-inter mt-1">We aim to respond within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 animate-card-ready animate-play" style={{ animationDelay: '200ms' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
