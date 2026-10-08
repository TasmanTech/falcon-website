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
    canonical: "/lock/lock-change-installation",
  },
  title: 'Lock Replacement & Lock Change Auckland',
  description: 'Door lock replacement and lock changes across Auckland. New locks supplied, fitted and tested for homes, rentals and businesses. NZ$20 call-out.',
  keywords: 'Lock Replacement, Lock Change, Install Deadbolt, Deadbolt Installation Auckland, Landlord Lock Change, Office Lock Change, Commercial Lock Change, Door Lock Replacement, Change House Locks, Lock Replacement Auckland, Lock Installation, Lock Installation Service, Lock Changing Service, New Locks, Hardware Upgrade, Commercial Security, Residential Replacement, Falcon Access',
  openGraph: {
    title: 'Lock Replacement & Lock Change Auckland',
    description: 'Door lock replacement and lock changes across Auckland. New locks supplied, fitted and tested for homes, rentals and businesses. NZ$20 call-out.',
    url: "/lock/lock-change-installation",
  }
};

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";
const darkLinkClass = "font-semibold text-brand-light underline hover:text-brand-accent transition-colors";

const faqs = [
  {
    question: "Do you provide the replacement hardware?",
    answer: "Yes. We supply and fit residential and commercial mortice locks, turnbolts, Trilock multi-point locks, rim locks, screen door locks and euro cylinders. If you've already bought a lock, we're happy to fit that too, as long as it suits your door."
  },
  {
    question: "Can you replace a ranch slider or sliding door lock?",
    answer: "Yes. Worn sliding door locks are a common job. We match the replacement to the size and style of your door, fit it, and adjust the keeper so the door locks without having to be lifted or shoved."
  },
  {
    question: "Can you fit a lock where there wasn't one before?",
    answer: "Yes. A fresh installation includes preparing the door, fitting the lock and strike, aligning everything and testing that it works smoothly with every key."
  },
  {
    question: "Do I need to change my house locks after moving in?",
    answer: "It's a good idea, because you can't know how many copies of the old keys are out there. If the existing locks are in good condition, rekeying them is usually cheaper than a full door lock replacement and has the same effect: the old keys stop working. If the locks are worn or you want better security, a lock change makes more sense."
  },
  {
    question: "Is there a warranty on new locks?",
    answer: "Every installation comes with a 90-day workmanship warranty at no extra cost. Longer 12-month and 24-month warranty options are also available if you'd like extra cover."
  },
  {
    question: "Can I replace my locks with smart hardware?",
    answer: "Yes. Many doors can take a keypad or smart lock instead of a standard mechanical lock. We'll check your door and talk you through options that suit it."
  }
];

export default function LockChangePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock/lock-change-installation/#webpage",
        "url": "https://falconaccess.co.nz/lock/lock-change-installation",
        "name": "Lock Replacement & Lock Change | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" },
        "mainEntity": { "@id": "https://falconaccess.co.nz/lock/lock-change-installation#service" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Lock Replacement", "item": "https://falconaccess.co.nz/lock/lock-change-installation" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://falconaccess.co.nz/lock/lock-change-installation#service",
        "url": "https://falconaccess.co.nz/lock/lock-change-installation",
        "serviceType": "Lock change and installation",
        "name": "Hardware & Lock Replacement",
        "provider": { "@id": "https://falconaccess.co.nz/#organization" },
        "description": "Professional hardware replacement for commercial and residential properties.",
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
      <JsonLd id="schema-lock-change-installation-page" schema={jsonLd} />

      <PageHeaderSection
        title="Lock Replacement & Lock Change Auckland"
        subtitle="New locks supplied, fitted and tested on homes, rentals and businesses across Auckland City, the North Shore, West Auckland, East Auckland and South Auckland."
      />

      <PhotoContentSection
        priority
        imageSrc="/images/services/lock/lock-change-installation/lever-handle-deadbolt-lock-installation-auckland.webp"
        imageAlt="Brushed steel lever handle and matching round deadbolt"
        imageTitle="Lock Installation Service Auckland"
        imageDescription="A new lever handle and deadbolt set, installed by our Auckland team."
        title="Upgrading Your Security"
        content={[
          <p key="1">Maybe you&apos;ve just moved in, maybe the old lock has finally given up, or maybe you want something stronger on the front door. Whatever the reason, a new lock is only as good as the way it&apos;s fitted.</p>,
          <p key="2">Our lock installation service covers the whole job: we help you choose a lock that suits the door, fit it properly, line it up with the frame and test it with every key. Homes, rentals, shops and offices all get the same careful work.</p>
        ]}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title="When to Change Your House Locks"
        content={[
          <p key="0">Most people ask about a lock change at one of a few moments: you&apos;ve just bought or moved into a house, a tenant has moved out, keys have gone missing, or the lock on the front door has started to stick, slip or jam. Each of those has a slightly different answer, so it&apos;s worth a quick chat before you buy anything.</p>,
          <p key="1">We always look at a repair first. But if a lock is cracked, badly rusted or worn out inside, a fix won&apos;t last, and replacing it is the better long-term choice. Our <Link href="/lock/lock-repair" className={linkClass}>lock repair</Link> page covers the faults we can usually fix instead.</p>,
          <p key="2">If the lock works well and you just want the old keys to stop working, you probably don&apos;t need a new lock at all. A <Link href="/lock/rekey" className={linkClass}>lock rekey</Link> keeps your existing hardware and gives you new keys for less.</p>
        ]}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        imageSrc="/images/services/lock/lock-change-installation/multipoint-door-lock-replacement.webp"
        imageAlt="Multipoint door lock with lever handle and five steel locking bolts"
        imageTitle="New Door Lock Fitting"
        imageDescription="A multipoint lock replacement with extra bolts for stronger front door security."
        title="Precision Installation"
        content={[
          <p key="1">A like-for-like swap is often simple. An upgrade may mean adjusting the door or frame so the new lock sits and latches properly, and a fresh install where no lock was fitted before means preparing the door, fitting the lock and strike, aligning everything and testing it.</p>,
          <p key="2">We regularly work on brands such as Lockwood, Yale, Kwikset, Legge and Ikonic, and we can special-order locks we don&apos;t carry. Already bought your own lock? We&apos;re happy to fit it, as long as it suits the door. We can also cut extra keys at the same visit, so everyone in the house has their own.</p>
        ]}
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Locks We Supply and Fit"
        content={[
          <p key="1">These are the mechanisms we fit most often, on everything from older timber villas to modern aluminium joinery:</p>,
          <ul key="2" className="list-disc pl-6 space-y-2">
            <li><strong>Residential mortice locks</strong> for front and back doors.</li>
            <li><strong>Commercial mortice locks and turnbolts</strong> for shopfronts, offices and staff doors.</li>
            <li><strong>Trilock multi-point locks</strong> that bolt the door at several points.</li>
            <li><strong>Rim locks and deadlocks</strong>, common on older Auckland homes.</li>
            <li><strong>Screen door mortice locks</strong> and <strong>euro profile cylinders</strong>.</li>
            <li><strong>Sliding door and ranch slider locks</strong>, including worn mortice lock bodies replaced to match.</li>
          </ul>,
          <p key="3">Prefer a PIN code to a key? Our <Link href="/smart-lock/smart-lock-installation" className={darkLinkClass}>smart lock installation</Link> service fits keypad and app-controlled locks instead.</p>
        ]}
        theme="dark"
        align="left"
      />

      <CTASection theme="catchy" />

      <IconListSection
        title="Hardware Types We Install"
        subtitle="We supply and install hardware to suit the door and how it's used."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
            title: 'Commercial Grade Hardware',
            description: "Strong locks, latches and lever sets built for busy doors that open and close all day."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
            title: 'Residential Locks & Latches',
            description: "Deadbolts, knobs, lever handles and thumb turns that let you unlock from inside without a key, which matters if you need to get out fast."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
            title: 'Digital & Smart Keypads',
            description: "Keypad and touchscreen locks that open with a PIN code, fitted and set up to suit your household or team."
          }
        ]}
        theme="white"
      />

      <TextContentSection
        title="Deadbolt Installation, Landlords and Offices"
        content={[
          <p key="1">A deadbolt is one of the simplest upgrades for a front door. Installing one properly means drilling a clean hole for the cylinder, cutting the bolt into the door edge, setting a solid strike plate into the frame and lining it all up so the bolt throws fully without catching. Choose one with a thumb turn on the inside, so you can get out quickly without hunting for a key.</p>,
          <p key="2">Landlords and property managers often ask us to change locks between tenancies, and offices and shops call us after staff changes. If several doors need doing, we can key them alike so one key opens them all. Often a <Link href="/lock/rekey" className={darkLinkClass}>rekey</Link> is enough; a full lock change makes sense when the hardware is worn or you want an upgrade.</p>
        ]}
        theme="dark"
        align="left"
      />

      <TextContentSection
        title="Pricing and Our 90-Day Warranty"
        content={[
          <p key="1">There&apos;s a flat <strong>NZ$20 call-out fee</strong>, and the job is quoted on site before we start. The price depends on the lock you choose, how much door or frame work is needed and whether it&apos;s a special order. Work outside normal hours costs a bit more, and we&apos;ll tell you first.</p>,
          <p key="2">Every installation comes with a <strong>90-day workmanship warranty</strong> at no extra cost, with longer 12-month and 24-month options available. Locked out right now? Our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> gets you in first, and our <Link href="/lock" className={linkClass}>Auckland lock services</Link> page compares every option.</p>
        ]}
        theme="light"
        align="left"
      />

      <FAQSection
        title="Lock Installation & Change FAQs"
        subtitle="Common questions about replacing hardware."
        faqs={faqs}
        theme="dark"
      />
    </div>
  );
}
