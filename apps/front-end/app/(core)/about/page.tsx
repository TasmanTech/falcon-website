import { Metadata } from 'next';
import Link from 'next/link';
import FAQSection from '@/components/sections/FAQSection';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';
import CTASection from '@/components/sections/CTASection';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: 'About Our Commercial & Residential Services',
  description: 'Meet Falcon Access, a local Auckland locksmith and repair team. Honest advice, after-hours lockout help and a flat NZ$20 call-out for homes and businesses.',
  keywords: 'About Falcon Access, Local Locksmith Auckland, General Locksmith, Locksmith Services, Locksmith for Business, After-Hours Locksmith, Property Maintenance New Zealand, Commercial Repair Auckland, Honest Locksmith',
  openGraph: {
    title: 'About Our Commercial & Residential Services',
    description: 'Meet Falcon Access, a local Auckland locksmith and repair team. Honest advice, after-hours lockout help and a flat NZ$20 call-out for homes and businesses.',
    url: "/about",
  }
};

const linkClass = 'font-semibold text-brand-dark underline hover:text-brand-primary transition-colors';
const darkLinkClass = 'font-semibold text-brand-light underline hover:text-brand-accent transition-colors';

/** About page FAQs, shared by the FAQSection and the FAQPage JSON-LD so they always match. */
const aboutFaqs: { question: string; answer: string }[] = [
  {
    question: "Which parts of Auckland do you cover?",
    answer: "We're mobile and cover Auckland City, the North Shore, and West, East and South Auckland. We come to your home, business or car."
  },
  {
    question: "How much does a job cost?",
    answer: "The call-out is a flat NZ$20. The work itself is quoted on site, based on the lock, the time involved, the urgency and the security level, and you agree the price before we start."
  },
  {
    question: "Is your work guaranteed?",
    answer: "Yes. Every installation comes with a 90-day workmanship warranty at no extra cost, and 12- and 24-month options are available. If something isn't right, we'll come back and fix it."
  },
  {
    question: "Do you work outside normal hours?",
    answer: "Yes. We're open Monday to Saturday 7 am to 9 pm and Sunday 7 am to 7 pm, with after-hours emergency support. Work outside normal hours costs a bit more, and we'll tell you before we start."
  }
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://falconaccess.co.nz/about/#webpage",
        "url": "https://falconaccess.co.nz/about",
        "name": "About Us | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": aboutFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
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
    <div className="w-full">
      <JsonLd id="schema-about-page" schema={jsonLd} />

      <PageHeaderSection
        title="About Falcon Access"
        subtitle="A local locksmith and repair team for homes and businesses across Auckland."
      />

      <PhotoContentSection
        priority
        title="Who We Are"
        content={[
          <p key="1">Falcon Access is a mobile repair and maintenance business based in Auckland. We fit, fix and look after locks, doors and the hardware around them, for homes and businesses alike.</p>,
          <p key="2">Locks are our main trade. Most of our calls are lockouts, from front doors and bedrooms to apartments and shops, and our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> is built around getting you in without damage. We also repair and replace locks, rekey cylinders, and fit and programme <Link href="/smart-lock" className={linkClass}>smart locks and keypads</Link>.</p>,
          <p key="3">We help with more than doors, too. We take on general repairs around your property, and our <Link href="/auto" className={linkClass}>mobile auto services</Link> cover car lockouts and flat batteries.</p>
        ]}
        imageSrc="/falcon_access_logo_about.webp"
        imageAlt="Falcon Access Official Logo"
        imageTitle="Falcon Access Property Maintenance"
        imageDescription="The official logo of Falcon Access, a trusted New Zealand commercial and residential repair service."
        ctaText="View Lock Services"
        ctaHref="/lock"
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Our Honest Approach"
        content={[
          <p key="1">We tell you what&apos;s wrong in plain words, and you know the price before we start. The call-out is a flat NZ$20. Everything else is quoted on site and agreed with you first.</p>,
          <p key="2">If a lock can be fixed, we&apos;ll fix it. We only suggest a new one when a <Link href="/lock/lock-repair" className={darkLinkClass}>lock repair</Link> won&apos;t last, and if you&apos;ve lost a key, a rekey is often cheaper than replacing the whole lock. You pay for what you need and nothing more.</p>,
          <p key="3">If we can&apos;t get you in, you don&apos;t pay. And if a job needs doing outside normal hours, we&apos;ll tell you it costs a bit more before we start, not on the invoice.</p>
        ]}
        theme="dark"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/about/stainless-steel-deadbolt-and-keys.webp"
        imageAlt="Stainless steel deadbolt lock with two keys on a key ring"
        imageTitle="Deadbolt Installation"
        imageDescription="A stainless steel deadbolt and keys, the kind of hardware we fit for Auckland homes and businesses."
        title="Where We Work"
        content={[
          <p key="1">We&apos;re fully mobile and cover all of Auckland: Auckland City, the North Shore, and West, East and South Auckland. If you need a locksmith near you, we&apos;re not far away.</p>,
          <p key="2">We carry common latches, cylinders and tools in the van, so most jobs are done in one visit. Houses, rentals, shops and offices all get the same care, from a <Link href="/lock/rekey" className={linkClass}>rekey after a tenant moves out</Link> to a new deadlock on an older timber door.</p>,
          <p key="3">Locked out late? Our emergency locksmith service offers after-hours support. Call us on <a href="tel:+6492431404" className="text-brand-accent underline hover:text-brand-accent/80 transition-colors">+64 9 243 1404</a> when you need us.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="How a Job Runs"
        content={[
          <ol key="1" className="list-decimal pl-6 space-y-3">
            <li>You call us or send a request through our <Link href="/contact" className={linkClass}>contact form</Link>, telling us where you are and what&apos;s going on.</li>
            <li>We confirm the job and the flat NZ$20 call-out, then head your way.</li>
            <li>The technician looks at the lock or door and quotes the work on site.</li>
            <li>You agree the price before any work begins. No surprises.</li>
            <li>We do the job, test everything, tidy up after ourselves and hand over any new keys.</li>
          </ol>,
          <p key="2">Every installation comes with a 90-day workmanship warranty at no extra cost, with longer 12- and 24-month options if you want them.</p>
        ]}
        theme="white"
        align="left"
      />

      <CTASection theme="catchy" />

      <IconListSection
        title="What You Can Expect"
        subtitle="The simple rules we follow on every job."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "Fast Help",
            description: "Your time matters. We find the fault, explain it and get it fixed, so you can get on with your day."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Straight Advice",
            description: "Fair prices and honest advice. If a cheaper fix will do the job, we'll say so."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            title: "One Team, Many Jobs",
            description: "From a stuck deadbolt to a new smart lock or a sliding door that won't lock, one call covers it."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
            title: "Care for Your Place",
            description: "We try non-destructive methods first and treat your home or shop like our own."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="About Falcon Access FAQs"
        subtitle="Quick answers about who we are and how we work."
        faqs={aboutFaqs}
        theme="dark"
      />
    </div>
  );
}
