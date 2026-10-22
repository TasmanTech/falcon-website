import type { Metadata } from 'next';
import PhotoContentSection from '@/components/sections/PhotoContentSection';
import TextContentSection from '@/components/sections/TextContentSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageHeaderSection from '@/components/sections/PageHeaderSection';
import JsonLd from '@/components/JsonLd';
import type { Suburb } from '@/lib/suburbs';
import { SHARE_IMAGE } from "@/lib/share-image";

const BASE_URL = "https://falconaccess.co.nz";

/**
 * Builds the metadata for a suburb landing page from its data.
 *
 * @param suburb - The suburb the page is for.
 * @returns The page metadata, with a self-canonical and Open Graph URL.
 */
export function suburbMetadata(suburb: Suburb): Metadata {
  return {
    alternates: { canonical: suburb.path },
    title: suburb.metaTitle,
    description: suburb.metaDescription,
    openGraph: {
      images: [SHARE_IMAGE],
      title: suburb.metaTitle,
      description: suburb.metaDescription,
      url: suburb.path,
    },
  };
}

/**
 * Local landing page for one suburb: what we do there, the local jobs and housing we see,
 * neighbouring areas, a call to action and FAQs, with matching JSON-LD.
 *
 * @param props.suburb - The suburb content to render (see `lib/suburbs.tsx`).
 * @returns The rendered suburb page.
 */
export default function SuburbPage({ suburb }: { suburb: Suburb }) {
  const url = `${BASE_URL}${suburb.path}`;
  const locality = suburb.locality ?? "Auckland";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": `${suburb.metaTitle} | Falcon Access`,
        "isPartOf": { "@id": `${BASE_URL}/#website` },
        "mainEntity": { "@id": `${url}#service` }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": `Locksmith ${suburb.name}`, "item": url }
        ]
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        "url": url,
        "serviceType": "Mobile locksmith",
        "name": `Locksmith ${suburb.name}`,
        "provider": { "@id": `${BASE_URL}/#organization` },
        "description": suburb.metaDescription,
        "areaServed": [
          {
            "@type": "Place",
            "name": `${suburb.name}, ${locality}`,
            "containedInPlace": { "@type": "Place", "name": suburb.locality ?? `${suburb.region}, Auckland` }
          },
          ...suburb.nearbySuburbs.map((name) => ({ "@type": "Place", "name": name.includes(",") ? name : `${name}, Auckland` }))
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": suburb.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  return (
    <div className="w-full">
      <JsonLd id={`schema-locksmith-${suburb.slug}-page`} schema={jsonLd} />

      <PageHeaderSection title={suburb.heading} subtitle={suburb.subtitle} />

      <PhotoContentSection
        priority
        imageSrc={suburb.intro.image.src}
        imageAlt={suburb.intro.image.alt}
        imageTitle={suburb.intro.image.title}
        imageDescription={suburb.intro.image.description}
        title={suburb.intro.title}
        content={suburb.intro.content}
        photoPosition="right"
        theme="light"
      />

      <TextContentSection
        title={suburb.commonJobs.title}
        content={suburb.commonJobs.content}
        theme="white"
        align="left"
      />

      <PhotoContentSection
        imageSrc={suburb.local.image.src}
        imageAlt={suburb.local.image.alt}
        imageTitle={suburb.local.image.title}
        imageDescription={suburb.local.image.description}
        title={suburb.local.title}
        content={suburb.local.content}
        photoPosition="left"
        theme="light"
      />

      <CTASection
        theme="catchy"
        title={`Need a Locksmith in ${suburb.name}?`}
        description={`Call us now. We come to you anywhere in ${suburb.name} for a flat NZ$20 call-out, and quote the work before we start.`}
        buttonText="Call +64 9 243 1404"
        buttonHref="tel:+6492431404"
      />

      <TextContentSection
        title={suburb.nearby.title}
        content={suburb.nearby.content}
        theme="white"
        align="left"
      />

      <FAQSection
        title={`${suburb.name} Locksmith FAQs`}
        subtitle={`Answers to the questions ${suburb.name} customers ask us most.`}
        faqs={suburb.faqs}
        theme="dark"
      />
    </div>
  );
}
