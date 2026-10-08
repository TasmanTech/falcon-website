import { Metadata } from 'next';
import Link from 'next/link';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: "/smart-lock/smart-lock-installation",
  },
  title: 'Smart Door Lock Installation Auckland',
  description: 'Smart door lock installation across Auckland. Digital and electronic door locks fitted, aligned and set up with codes and app for homes and offices.',
  keywords: 'Smart Lock Installation, Smart Door Lock Installation, Smart Lock Installation Auckland, Digital Lock Installation, Electronic Door Lock, Door Lock Installation Service, Fresh Installation, Door Prep, Electronic Locks, Falcon Access',
  openGraph: {
    title: 'Smart Door Lock Installation Auckland',
    description: 'Smart door lock installation across Auckland. Digital and electronic door locks fitted, aligned and set up with codes and app for homes and offices.',
    url: "/smart-lock/smart-lock-installation",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

/** FAQs shared by the FAQ section and the FAQPage JSON-LD so they always match. */
const faqs = [
  {
    question: "Can you install a smart lock on a brand new door without existing holes?",
    answer: "Yes. We measure the door, drill the holes for the lock body and cylinder, cut the recess in the door edge and fit the strike plate to the frame. We check the door thickness first, because most smart locks are made for a set range."
  },
  {
    question: "Do you handle the network setup for the smart lock?",
    answer: "Yes. If your lock connects to an app or Wi-Fi, we set it up with you, test it from your phone and show you how to add and remove users. Locks that only use a keypad or fingerprint reader don't need a network at all."
  },
  {
    question: "How long does a fresh installation take?",
    answer: "It depends on the door and the lock. Drilling and preparing a blank door takes longer than fitting a lock into existing holes, and solid or thick doors need more care. We'll give you a clear idea when we look at the door."
  },
  {
    question: "Do I need to buy the lock myself?",
    answer: "You can buy your own lock and we'll fit it, or we can help you choose one that suits your door and how you want to use it. If you've already bought one, send us the model so we can check it suits the door."
  },
  {
    question: "Is there a warranty on the installation?",
    answer: "Yes. Every installation comes with a 90-day workmanship warranty at no extra cost, and longer 12- and 24-month warranty options are available."
  }
];

export default function SmartLockInstallationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-installation/#webpage",
        "url": "https://falconaccess.co.nz/smart-lock/smart-lock-installation",
        "name": "Smart Door Lock Installation Auckland | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-installation#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Smart Lock Services", "item": "https://falconaccess.co.nz/smart-lock" },
          { "@type": "ListItem", "position": 3, "name": "Fresh Installation", "item": "https://falconaccess.co.nz/smart-lock/smart-lock-installation" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-installation#service",
        "url": "https://falconaccess.co.nz/smart-lock/smart-lock-installation",
        "serviceType": "Smart lock installation",
        "name": "Smart Door Lock Installation",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Fresh installation of smart locks on new doors or doors without a secure lock: door preparation, fitting, alignment, code and app set-up.",
        "areaServed": { "@type": "City", "name": "Auckland" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id="schema-smart-lock-installation-page" schema={jsonLd} />

      <PageHeaderSection
        title="Smart Door Lock Installation Auckland"
        subtitle="Smart locks fitted to new doors, or doors that have never had a secure lock, with codes and app set-up done for you. We cover Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />

      <PhotoContentSection
        priority
        title="Starting From Scratch"
        content={[
          <p key="1">Maybe you&apos;ve hung a new front door, finished a renovation or fitted out a new office. Or the door has only ever had a basic handle and you want something more secure. Either way, a fresh smart lock installation starts with preparing the door properly.</p>,
          <p key="1a">Smart lock, digital lock, electronic door lock: people use all three names for the same idea, a lock you open with a PIN code, fingerprint, card or phone instead of a key. We fit all of them, in homes and offices from West Auckland and the North Shore to South Auckland.</p>,
          <p key="2">We mark out and drill the holes for the lock body and cylinder, cut the recess in the door edge, and fit the strike plate to the frame. Then we mount the lock, line it up and test it until it locks smoothly with the door shut.</p>,
          <p key="3">Already have a lock in the door that you want to swap? That&apos;s usually a <Link href="/smart-lock/smart-lock-change" className={linkClass}>smart lock change</Link> rather than a fresh install, and often a simpler job. Not sure which you need? Our <Link href="/smart-lock" className={linkClass}>smart lock services overview</Link> runs through the options.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-installation/smart-lock-installation-auckland.webp"
        imageAlt="Brushed steel smart lock with lever handle and thumb-turn"
        imageTitle="Smart Lock Installation Auckland"
        imageDescription="A smart lock with lever handle and thumb-turn, installed and set up ready to use."
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="Why Alignment Matters So Much"
        content={[
          <p key="1">A smart lock has a small motor that throws the bolt or latch for you. If the bolt rubs on the strike plate, or a hole is slightly off-centre, that motor has to work much harder. The batteries go flat early, the lock starts jamming, and eventually something gives.</p>,
          <p key="2">That&apos;s why we take our time with the fit. We check the door sits square in the frame, adjust the strike so the bolt slides in freely, and make sure the door doesn&apos;t need a shove to lock.</p>,
          <p key="3">The door itself matters too. Thin hollow-core doors, warped doors or soft timber may need packing, reinforcing or a different style of lock. If so, we&apos;ll tell you before we start.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        title="Codes, App Set-Up and a Proper Handover"
        content={[
          <p key="1">Once the lock is on, we set up the electronic side. That means a master code, user codes for the people who need them, and the app and Wi-Fi connection if your lock uses one. We test every code and the key override before we call it done.</p>,
          <p key="2">Then we show you how it works: changing codes, adding and removing users, swapping batteries and what the warning lights or beeps mean. If you&apos;re a landlord or rental host, we&apos;ll walk you through giving tenants or guests their own codes.</p>,
          <p key="3">There&apos;s a flat <strong>NZ$20 call-out fee</strong>, and the installation is quoted on site and agreed with you before we start. Work outside normal hours costs a bit more, and we&apos;ll tell you first.</p>
        ]}
        imageSrc="/images/services/smart-lock/smart-lock-installation/keypad-smart-lock-home-fitting.webp"
        imageAlt="Bronze keypad smart lock with lever handle and a screwdriver"
        imageTitle="Residential Smart Lock Fitting"
        imageDescription="A keypad smart lock ready to fit for fast, keyless access at home."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Before We Arrive, and After We Leave"
        content={[
          <p key="1">If you&apos;ve already bought a lock, keep the box and every part, including the paper template and screws. Have the batteries ready and your Wi-Fi password handy if the lock connects to an app.</p>,
          <p key="2">Every installation comes with a <strong>90-day workmanship warranty</strong> at no extra cost, with longer 12- and 24-month options available. If a code stops working or the lock needs a reset later on, our <Link href="/smart-lock/smart-lock-repair-programming" className={linkClass}>smart lock repair and programming</Link> service can sort it.</p>,
          <p key="3">Want a traditional lock on the back door instead? We also handle standard <Link href="/lock/lock-change-installation" className={linkClass}>lock installation</Link> for deadbolts, mortice locks and sliding doors. And if a smart lock ever leaves you stuck outside, our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> covers secure and electronic locks, using non-destructive entry wherever possible.</p>
        ]}
        theme="white"
        align="left"
      />

      <CTASection
        theme="catchy"
        title="Ready for a Smart Lock?"
        description="Tell us about your door and we will recommend and fit a smart lock that suits it."
        buttonText="Get a Quote"
      />

      <IconListSection
        title="Our Fresh Install Process"
        subtitle="What happens once we're at your door."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
            title: 'Measure and Check',
            description: "We check the door thickness, backset and frame, and confirm the lock suits the door before we drill anything."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>,
            title: 'Prepare and Fit',
            description: "We drill the door, cut the recesses, fit the strike plate and mount the lock so the bolt runs without rubbing."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>,
            title: 'Programme and Connect',
            description: "We set your master and user codes, connect the app if your lock has one, and test every way in."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: 'Show You How',
            description: "We hand over the codes and backup keys and show you how to manage users and change the batteries."
          }
        ]}
        theme="light"
      />

      <FAQSection
        title="Smart Lock Installation FAQs"
        subtitle="Common questions about fresh installations."
        faqs={faqs}
        theme="dark"
      />

    </div>
  );
}
