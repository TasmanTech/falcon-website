import { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import GallerySection from '@/components/sections/GallerySection';
import JsonLd from '@/components/JsonLd';
import { homeGalleryImages } from '@/lib/gallery';

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: 'Auckland Locksmith, Smart Locks & Auto Help',
  description: 'Mobile locksmith serving Auckland homes, businesses and vehicles. Lockouts, lock repairs, rekeying, smart locks and jump starts with a $20 call-out fee.',
  keywords: 'Commercial Repair, Residential Maintenance, Locksmith, Locksmith Near Me, After-Hours Locksmith, Locksmith Services, Emergency Locksmith, Door Lock Repair, Lock Replacement, Lock Installation, Residential Lockout Service, Commercial Lockout Service, Auckland, New Zealand',
  openGraph: {
    title: 'Auckland Locksmith, Smart Locks & Auto Help',
    description: 'Mobile locksmith serving Auckland homes, businesses and vehicles. Lockouts, lock repairs, rekeying, smart locks and jump starts with a $20 call-out fee.',
    url: "/",
  }
};

const linkClass = 'font-semibold text-brand-dark underline hover:text-brand-primary transition-colors';
const darkLinkClass = 'font-semibold text-brand-light underline hover:text-brand-accent transition-colors';

/** Homepage FAQs, shared by the FAQSection and the FAQPage JSON-LD so they always match. */
const homeFaqs: { question: string; answer: string }[] = [
  {
    question: "What types of properties do you service?",
    answer: "Houses, flats and apartments, rentals, shops, offices and other commercial sites across Auckland. If it has a door, a lock or a gate keypad, we can usually help."
  },
  {
    question: "Do you only provide lockout and locksmithing services?",
    answer: "No. Lockouts and lock work are our speciality, but we also do general repair and maintenance for homes and businesses, such as sticking doors, loose hinges and worn hardware."
  },
  {
    question: "Do you offer emergency repairs?",
    answer: "Yes. Some problems can't wait, like a front door that won't lock or a broken sliding door lock. Call us and we'll get to you as promptly as we can to make the place secure again."
  },
  {
    question: "Are your services guaranteed?",
    answer: "Yes. Every installation comes with a 90-day workmanship warranty at no extra cost, and longer warranty options are available. If something we did isn't right, tell us and we'll come back and sort it."
  },
  {
    question: "Do you offer after-hours locksmith services?",
    answer: "Yes. We offer after-hours support across Auckland for emergencies such as lockouts. Call +64 9 243 1404. Work outside normal hours costs a bit more, and we'll tell you the price before we start."
  },
  {
    question: "Will my door or lock be damaged during a lockout service?",
    answer: "We always try non-destructive entry first, so in most cases there's no damage to the door, frame or lock. We look at the lock before we start, pick the safest way in, and check the lock still works once you're inside."
  },
  {
    question: "How can I tell if my lock needs to be replaced?",
    answer: "Watch for a key that sticks or is hard to turn, a lock that feels loose, or a latch that doesn't catch. Often a repair or rekey is enough. We'll look at it on site and tell you honestly whether it's worth fixing or replacing."
  },
  {
    question: "What should I do if my lock is damaged?",
    answer: "A damaged lock leaves your home or business less secure, so it's worth sorting quickly. Call us on +64 9 243 1404. We'll come out, make the door secure, and quote the repair or replacement on site."
  },
  {
    question: "Can you help me if I'm locked out of my house?",
    answer: "Yes, house lockouts are one of the most common calls we get. Ring us, tell us where you are and what kind of lock it is, and we'll come to you. We get you back inside using the gentlest method that works."
  }
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/#webpage",
        "url": "https://falconaccess.co.nz/",
        "name": "Commercial & Residential Repair | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" }
        ]
      },
      {
        "@type": "ImageGallery",
        "@id": "https://falconaccess.co.nz/#gallery",
        "name": "Our Recent Locksmith Work in Auckland",
        "description": "Photos of keypad locks, deadbolts, sliding door locks and cabinet locks Falcon Access has installed, repaired and opened for Auckland homes and businesses.",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#webpage" },
        "about": { "@id": "https://falconaccess.co.nz/#organization" },
        "image": homeGalleryImages.map((image) => ({
          "@type": "ImageObject",
          "contentUrl": `https://falconaccess.co.nz${image.src}`,
          "url": `https://falconaccess.co.nz${image.src}`,
          "name": image.title,
          "caption": image.alt,
          "description": image.description,
          "width": image.width,
          "height": image.height,
          "encodingFormat": "image/webp",
          "contentLocation": { "@type": "City", "name": "Auckland" },
          "creator": { "@id": "https://falconaccess.co.nz/#organization" },
          "copyrightHolder": { "@id": "https://falconaccess.co.nz/#organization" },
          "creditText": "Falcon Access",
          "copyrightNotice": "© Falcon Access"
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": homeFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id="schema-(core)-page" schema={jsonLd} />
      <Hero
        title="Commercial & Residential Repair"
        description={<>Locked out, or a lock playing up? We come to you for lockouts, lock repairs and smart locks across Auckland, with after-hours support for emergencies. Call us on <a href="tel:+6492431404" className="text-brand-accent underline hover:text-brand-accent/80 transition-colors">+64 9 243 1404</a> and we&apos;ll help you sort it.</>}
        imageSrc="/images/home/auckland-repair-maintenance-hand-tools.webp"
        imageAlt="Orange bolt cutters, screwdrivers, pliers and a pipe wrench laid out for repair work"
        imageTitle="Commercial & Residential Repair Tools"
        ctaText="Get a Quote"
        ctaLink="/contact"
        isMain={true}
      />

      <section className="bg-brand-catchy text-white py-12 text-center px-4 w-full shadow-md relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-montserrat font-black uppercase mb-3 tracking-wide">
            After-Hours Emergency Locksmith Auckland Wide
          </h2>
          <p className="text-xl md:text-2xl font-inter font-bold uppercase mb-8 text-white">
            $20 Flat Callout Fee. No charge if we don&apos;t help you get in.
          </p>
          <a href="tel:+6492431404" className="inline-block bg-brand-dark text-white font-black text-xl px-10 py-5 rounded-full hover:bg-brand-dark/90 transition-transform hover:scale-105 shadow-xl">
            CALL +64 9 243 1404 NOW
          </a>
        </div>
      </section>

      <PhotoContentSection
        title="Specialised Lockout & Security Services"
        content={[
          <p key="1">We fix plenty of things around homes and businesses, but lockouts are what we do best. Being stuck outside your own door is stressful, so we come to you and get you back in promptly. We use non-destructive entry wherever we can, so your door, frame and lock are left as they were.</p>,
          <p key="2">Once you&apos;re inside, we can also take care of lock repair, lock replacement and rekeying, so every door shuts and locks properly. If it happens late at night, we offer after-hours support too.</p>
        ]}
        imageSrc="/images/home/locksmith-lock-pick-set-auckland.webp"
        imageAlt="Locksmith lock pick set with tension wrenches and brass lock cylinders"
        imageTitle="Auckland Locksmith Tools"
        imageDescription="Lock picks and tension tools we use to open doors without damaging the lock or frame."
        ctaText="View Lock Services"
        ctaHref="/lock"
        photoPosition="right"
        theme="light"
      />

      <GallerySection
        title="Our Recent Locksmith Work in Auckland"
        subtitle={<>Real jobs from around Auckland, from <Link href="/smart-lock/smart-lock-installation" className="font-semibold underline decoration-brand-dark decoration-2 underline-offset-4 hover:text-brand-dark/70 transition-colors">smart lock installation</Link> to deadbolts, <Link href="/lock/lock-repair" className="font-semibold underline decoration-brand-dark decoration-2 underline-offset-4 hover:text-brand-dark/70 transition-colors">lock repairs</Link> and cabinet locks. Tap any photo to see it up close.</>}
        images={homeGalleryImages}
        theme="accent"
      />

      <TextContentSection
        title="The Kinds of Jobs We Do Every Week"
        content={[
          <p key="1">Those photos are a fair snapshot of a normal week. We fit keypad locks like the Yale touchscreen lever, which opens with a PIN instead of a key. Through our <Link href="/smart-lock/smart-lock-repair-programming" className={linkClass}>smart lock repair and programming</Link> service, we also look after gate keypads such as Rosslare access control.</p>,
          <p key="2">Plenty of older Auckland homes still have timber doors with Lockwood deadlocks. We regularly work on brands such as Kwikset, Legge, Ikonic and Lockwood, whether that&apos;s a <Link href="/lock/lock-change-installation" className={linkClass}>new deadbolt installation</Link> or a <Link href="/lock/rekey" className={linkClass}>rekeying service</Link> so old keys stop working.</p>,
          <p key="3">Then there are the everyday calls: a child who&apos;s pushed the button on a brass privacy knob and locked the bathroom, a worn ranch slider lock we replace mid-job, or a stuck display cabinet lock. For anything shut tight, our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> is the place to start.</p>
        ]}
        theme="white"
        align="left"
      />

      <IconListSection
        title="Our Auckland Service Guarantees"
        subtitle="What you can count on when you book us, at home or at work, anywhere in Auckland."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'No Fix, No Fee Guarantee',
            description: "If we can't complete the job or can't safely get you in, you don't pay. Simple as that."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: 'Honest Arrival Updates',
            description: "We know your time matters. We'll give you a realistic idea of when we can get to you, and if traffic or another job holds us up, we'll let you know rather than leave you wondering."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
            title: 'Workmanship We Stand Behind',
            description: "We test every lock before we leave. Every installation comes with a 90-day workmanship warranty at no extra cost, and if something isn't right, we'll come back and fix it."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: 'Transparent $20 Callout Fee',
            description: "The call-out is a flat NZ$20. The job itself is quoted on site and agreed before we start. Work outside normal hours costs a bit more, and we'll always tell you first."
          }
        ]}
        theme="dark"
      />

      <PhotoContentSection
        title="Comprehensive Property Care"
        content={[
          <p key="1">Locks are only part of what keeps a building working. We also look after the doors, frames and hardware around them, for homes, rentals, shops and offices all over Auckland.</p>,
          <p key="2">That might be a door that drags on the floor, a hinge that&apos;s worked loose, or a latch that no longer lines up with the strike plate. Small fixes like these stop bigger problems later.</p>,
          <p key="3">For ongoing upkeep, we can plan the work around your schedule and budget. We turn up with the tools for the job, work tidily and keep out of your way as much as we can.</p>
        ]}
        imageSrc="/images/home/property-maintenance-power-tools-auckland.webp"
        imageAlt="Orange cordless drill and impact driver with pliers, screwdrivers and a pipe wrench"
        imageTitle="Property Maintenance Tools"
        imageDescription="Cordless power tools and hand tools for commercial and residential property maintenance in Auckland."
        ctaText="Connect Now"
        ctaHref="/contact"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Our Commitment to Quality"
        content={[
          <h3 key="subtitle" className="text-xl text-brand-accent font-semibold mb-6">Authentic, Reliable Service Every Time</h3>,
          <p key="1">We&apos;d rather do a job once and do it properly. You&apos;ll get straight answers about what&apos;s wrong, what it will take to fix and what it costs, before any work starts. You can read more <Link href="/about" className={darkLinkClass}>about how we work</Link>.</p>,
          <p key="2">Whether it&apos;s a sticking hinge, a broken lock or a lockout, we go for repairs that last rather than quick patches. Give us a call on <a href="tel:+6492431404" className="text-brand-accent underline hover:text-brand-accent/80 transition-colors">+64 9 243 1404</a>.</p>
        ]}
        theme="dark"
      />

      <CTASection theme="catchy" />

      <FAQSection
        title="General Maintenance & Locksmith FAQs"
        subtitle="Common questions about our repair and maintenance services."
        faqs={homeFaqs}
        theme="light"
      />
    </div>
  );
}
