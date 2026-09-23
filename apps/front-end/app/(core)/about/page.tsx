import { Metadata } from 'next';
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
  description: 'Meet Falcon Access, a local Auckland locksmith and repair team. Honest lock services, 24/7 lockout help, and a $20 flat callout fee for homes and businesses.',
  keywords: 'About Falcon Access, Local Locksmith Auckland, General Locksmith, Locksmith Services, Locksmith for Business, 24 Hour Locksmith, Property Maintenance New Zealand, Commercial Repair Auckland, Honest Locksmith',
  openGraph: {
    title: 'About Our Commercial & Residential Services',
    description: 'Meet Falcon Access, a local Auckland locksmith and repair team. Honest lock services, 24/7 lockout help, and a $20 flat callout fee for homes and businesses.',
    url: "/about",
  }
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/about/#webpage",
        "url": "https://falconaccess.co.nz/about",
        "name": "About Us | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
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
        title="Who We Are"
        content={[
          <p key="1">Falcon Access is a local Auckland team. We fit, fix, and look after locks and doors for homes and businesses.</p>,
          <p key="2">Locks are our main trade. As a general locksmith, we handle lockouts, lock repair, rekeys, and new lock installs. We also set up and fix smart locks.</p>,
          <p key="3">We help with more than locks, too. We take on general repairs around your property. We can also jump a flat car battery or get you back into a locked car.</p>
        ]}
        imageSrc="/falcon_access_logo_about.webp"
        imageAlt="Falcon Access Official Logo"
        imageTitle="Falcon Access Property Maintenance"
        imageDescription="The official logo of Falcon Access, a trusted New Zealand commercial and residential repair service."
        ctaText="View Lock Services"
        ctaHref="/lock"
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Our Honest Approach"
        content={[
          <p key="1">We tell you what is wrong in plain words. You know the price before we start. There are no hidden fees.</p>,
          <p key="2">If a lock can be fixed, we fix it. We only suggest a new lock when a repair will not last. You pay for what you need and nothing more.</p>,
          <p key="3">Our callout fee is a flat $20. If we can&apos;t get you in, you don&apos;t pay.</p>
        ]}
        theme="dark"
      />

      <TextContentSection
        title="Where We Work"
        content={[
          <p key="1">Our vans cover all of Auckland. That includes Auckland City, the North Shore, and West, East, and South Auckland. If you need a locksmith near you, we are not far away.</p>,
          <p key="2">We carry our tools with us, so most jobs are done in one visit. We are a locksmith for business as well as homes. Shops, offices, and rentals all get the same care.</p>,
          <p key="3">Locked out? Our emergency locksmith service runs 24/7. Call us on <a href="tel:+6492431404" className="text-brand-accent underline hover:text-brand-accent/80 transition-colors">+64 9 243 1404</a> at any hour.</p>
        ]}
        theme="white"
      />

      <IconListSection
        title="What You Can Expect"
        subtitle="The simple rules we follow on every job."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "Fast Help",
            description: "Your time matters. We find the fault and fix it fast, so you can get on with your day."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Straight Advice",
            description: "Fair prices and honest advice. We only do the work you really need."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            title: "One Team, Many Jobs",
            description: "From a stuck deadbolt to a new smart lock, one call covers it."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
            title: "Care for Your Place",
            description: "We use safe, non-destructive methods first. We treat your home or shop like our own."
          }
        ]}
        theme="light"
      />

      <CTASection theme="catchy" />

    </div>
  );
}
