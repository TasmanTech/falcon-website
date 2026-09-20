import { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import IconListSection from '@/components/sections/IconListSection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: 'About Our Commercial & Residential Services',
  description: 'Learn about Falcon Access. We provide honest, practical, and highly reliable commercial and residential repair and maintenance services across New Zealand.',
  keywords: 'About Falcon Access, Property Maintenance New Zealand, Commercial Repair Auckland, Honest Locksmith',
  openGraph: {
    title: 'About Our Commercial & Residential Services',
    description: 'Learn about Falcon Access. We provide honest, practical, and highly reliable commercial and residential repair and maintenance services across New Zealand.',
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
        subtitle="Honest, real, and good property care for your home or shop."
      />

      <PhotoContentSection
        title="Who We Are"
        content={[
          <p key="1">Falcon Access is a great team in New Zealand. We fix homes and shops. We do hard work on doors and locks.</p>,
          <p key="2">We do lock work well. But we also do general fixes. We are ready to help with any issue your home might face.</p>
        ]}
        imageSrc="/falcon_access_logo_about.webp"
        imageAlt="Falcon Access Official Logo"
        imageTitle="Falcon Access Property Maintenance"
        imageDescription="The official logo of Falcon Access, a trusted New Zealand commercial and residential repair service."
        photoPosition="left"
        theme="light"
      />

      <TextContentSection
        title="Our Honest Approach"
        content={[
          <p key="1">We do honest work. We do not use fake titles. You get real help when you call. We give good fixes fast.</p>,
          <p key="2">Each home is different. We do the job right the first time. We make sure your space is safe.</p>
        ]}
        theme="dark"
      />

      <IconListSection
        title="What We Bring to the Table"
        subtitle="Our core principles guide every project we undertake."
        items={[
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "Efficiency",
            description: "We respect your time. We aim to diagnose and resolve maintenance issues as quickly as possible to minimize disruptions."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Authenticity",
            description: "Honest assessments and practical advice. We provide the repairs you actually need."
          },
          {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            title: "Versatility",
            description: "Equipped for a wide range of tasks, from fixing specialised hardware to general facility upkeep."
          }
        ]}
        theme="light"
      />

    </div>
  );
}
