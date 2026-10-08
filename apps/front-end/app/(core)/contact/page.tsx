import { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import CTASection from '@/components/sections/CTASection';
import FAQSection from '@/components/sections/FAQSection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  title: 'Contact Our Auckland Team',
  description: 'Contact Falcon Access in Auckland for lockouts, lock repairs, smart locks and mobile auto help. Call +64 9 243 1404 or send a message for a quote.',
  keywords: 'Contact Falcon Access, Property Maintenance Contact, Repair Services New Zealand',
  openGraph: {
    title: 'Contact Our Auckland Team',
    description: 'Contact Falcon Access in Auckland for lockouts, lock repairs, smart locks and mobile auto help. Call +64 9 243 1404 or send a message for a quote.',
    url: "/contact",
  }
};

const linkClass = 'font-semibold text-brand-dark underline hover:text-brand-primary transition-colors';

/** Contact page FAQs, shared by the FAQSection and the FAQPage JSON-LD so they always match. */
const contactFaqs: { question: string; answer: string }[] = [
  {
    question: "What happens after I send a request?",
    answer: "We get back to you to confirm the job and the NZ$20 call-out, then arrange a time. If it's urgent, such as a lockout, please call us instead."
  },
  {
    question: "What are your opening hours?",
    answer: "Monday to Saturday 7 am to 9 pm and Sunday 7 am to 7 pm. We also offer after-hours emergency support."
  },
  {
    question: "How much is the call-out fee?",
    answer: "The call-out is a flat NZ$20 anywhere in our Auckland service area. The work itself is quoted separately on site."
  },
  {
    question: "Do you quote before starting?",
    answer: "Yes. The technician looks at the job and gives you a price on site, and nothing starts until you've agreed to it."
  },
  {
    question: "Does after-hours or weekend work cost more?",
    answer: "Yes. Work after 6 pm, before 9 am, at weekends or on public holidays costs a bit more. We'll always tell you the price before we start."
  }
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://falconaccess.co.nz/contact/#webpage",
        "url": "https://falconaccess.co.nz/contact",
        "name": "Contact Us | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": contactFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
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
    <div className="w-full bg-brand-light">
      <JsonLd id="schema-contact-page" schema={jsonLd} />

      <PageHeaderSection 
        title="Get in Touch"
        subtitle="Need a quote, or need help right now? Call us or use the form below and we'll get back to you."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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
                    <p className="text-sm text-brand-dark/70 font-inter mt-1">After-hours support for urgent lockouts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-montserrat text-brand-dark/70 uppercase tracking-wider mb-1">Email</h3>
                    <a href="mailto:info@falconaccess.co.nz" className="text-lg font-bold text-brand-dark hover:text-brand-accent transition-colors">info@falconaccess.co.nz</a>
                    <p className="text-sm text-brand-dark/70 font-inter mt-1">We reply to every message as soon as we can.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-montserrat text-brand-dark/70 uppercase tracking-wider mb-1">Hours</h3>
                    <p className="text-lg font-bold text-brand-dark">Mon to Sat: 7 am to 9 pm</p>
                    <p className="text-lg font-bold text-brand-dark">Sun: 7 am to 7 pm</p>
                    <p className="text-sm text-brand-dark/70 font-inter mt-1">Mobile service across Auckland City, the North Shore, and West, East, and South Auckland.</p>
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

      <PhotoContentSection
        priority
        title="The Quickest Way to Reach Us"
        content={[
          <p key="1">If you&apos;re locked out or something is urgent, call us on <a href="tel:+6492431404" className="text-brand-dark font-semibold underline hover:text-brand-primary transition-colors">+64 9 243 1404</a>. A phone call is the fastest way to get help on its way.</p>,
          <p key="2">For quotes and anything that can wait, use the form. Tell us your suburb, the door or lock type and what&apos;s going wrong. A photo of the lock helps.</p>
        ]}
        imageSrc="/images/contact/smartphone-and-house-keys-contact-locksmith-auckland.webp"
        imageAlt="Smartphone with a blank screen lying beside a ring of brass and silver house keys"
        imageTitle="Contact an Auckland Locksmith"
        imageDescription="Call or send us a message and we will confirm the job and the NZ$20 call-out before we head your way."
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="What We Can Help With"
        content={[
          <p key="1">Most messages we get are about our <Link href="/lock/lockout" className={linkClass}>lockout service</Link>, a <Link href="/lock/rekey" className={linkClass}>lock rekey</Link> after lost keys or a move, or <Link href="/lock/lock-repair" className={linkClass}>lock repair</Link> for a sticking or broken lock.</p>,
          <p key="2">We also handle <Link href="/smart-lock/smart-lock-installation" className={linkClass}>smart lock installation</Link> and keypads, and <Link href="/car-lockout" className={linkClass}>car lockout help</Link> if your keys are stuck inside the car. Not sure which you need? Just describe the problem.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        title="We Come to You"
        content={[
          <p key="1">We&apos;re fully mobile across Auckland, and our vans carry common latches, cylinders and tools. That means most repairs and lock changes are done in one visit.</p>,
          <p key="2">We quote on site and you agree the price before we start. A special-order lock may need a second visit.</p>
        ]}
        imageSrc="/images/contact/locksmith-service-case-locks-and-tools-auckland.webp"
        imageAlt="Open hard-shell service case holding screwdrivers, door latches and spare lock cylinders"
        imageTitle="Mobile Locksmith Service Auckland"
        imageDescription="The service case our technicians bring to every job, so most repairs and lock changes are done in one visit."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Service Areas and Hours"
        content={[
          <p key="1">We cover Auckland City, the North Shore, and West, East and South Auckland. We&apos;re open Monday to Saturday from 7 am to 9 pm and Sunday from 7 am to 7 pm.</p>,
          <p key="2">Outside those hours, we offer after-hours emergency support. Work outside normal hours costs a bit more, and we&apos;ll tell you before we start.</p>
        ]}
        theme="dark"
        align="left"
      />

      <CTASection
        title="Locked Out Right Now?"
        description="Don't wait on a form. Give us a call and we'll get help on its way."
        buttonText="Call Now"
        buttonHref="tel:+6492431404"
        theme="catchy"
      />

      <IconListSection
        title="What Happens Next"
        subtitle="Three simple steps from your first message to a finished job."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
            title: "1. Call or Send a Request",
            description: "Ring us or fill in the form with your suburb and what's going on."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: "2. We Confirm the Job",
            description: "We confirm what you need and the flat NZ$20 call-out before we head your way."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
            title: "3. We Quote On Site",
            description: "A technician comes to you, quotes the work and starts once you've agreed the price."
          }
        ]}
        theme="white"
      />

      <FAQSection
        title="Contact FAQs"
        subtitle="Answers to the questions people ask before they get in touch."
        faqs={contactFaqs}
        theme="light"
      />
    </div>
  );
}
