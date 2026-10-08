import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import MetaPixel from "@/components/MetaPixel";
import JsonLd from '@/components/JsonLd';
import SiteChrome from "@/components/SiteChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://falconaccess.co.nz'),
  title: {
    template: "%s | Falcon Access",
    default: "Falcon Access | High Quality Locksmithing in NZ",
  },
  description: "Mobile locksmith, smart lock and auto services across Auckland. Lockouts, lock repairs, rekeying, jump starts and diagnostics with a $20 call-out fee.",
  openGraph: {
    title: "Falcon Access",
    description: "Mobile locksmith, smart lock and auto services across Auckland. Lockouts, lock repairs, rekeying, jump starts and diagnostics with a $20 call-out fee.",
    siteName: "Falcon Access",
    locale: "en_NZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://falconaccess.co.nz/#website",
        "url": "https://falconaccess.co.nz/",
        "name": "Falcon Access",
        "publisher": {
          "@id": "https://falconaccess.co.nz/#organization"
        }
      },
      {
        "@type": ["LocalBusiness", "Locksmith"],
        "@id": "https://falconaccess.co.nz/#organization",
        "name": "Falcon Access",
        "legalName": "Falcon Access Limited",
        "url": "https://falconaccess.co.nz",
        "logo": "https://falconaccess.co.nz/falcon_access_logo.webp",
        "image": "https://falconaccess.co.nz/falcon_access_logo.webp",
        "description": "Mobile locksmith, smart lock and auto services for homes, businesses and vehicles across Auckland.",
        "telephone": "+64 9 243 1404",
        "email": "info@falconaccess.co.nz",
        "priceRange": "$20 call-out fee, work quoted on site",
        "currenciesAccepted": "NZD",
        "areaServed": [
          { "@type": "City", "name": "Auckland", "sameAs": "https://en.wikipedia.org/wiki/Auckland" },
          { "@type": "Place", "name": "Auckland City" },
          { "@type": "Place", "name": "North Shore" },
          { "@type": "Place", "name": "West Auckland" },
          { "@type": "Place", "name": "East Auckland" },
          { "@type": "Place", "name": "South Auckland" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Locksmith, Smart Lock and Auto Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/lock/lockout#service" } },
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/lock/rekey#service" } },
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/lock/lock-repair#service" } },
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/lock/lock-change-installation#service" } },
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-installation#service" } },
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-change#service" } },
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/smart-lock/smart-lock-repair-programming#service" } },
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/car-lockout#service" } },
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/auto/dead-battery-assistance#service" } },
            { "@type": "Offer", "itemOffered": { "@id": "https://falconaccess.co.nz/auto/obd2-diagnostic#service" } }
          ]
        },
        "hasMap": "https://www.google.com/maps?cid=14340846117585175277",
        "sameAs": [
          "https://www.google.com/maps?cid=14340846117585175277",
          "https://www.facebook.com/falconaccessnz",
          "https://www.instagram.com/falconaccess/"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Auckland",
          "addressRegion": "Auckland",
          "addressCountry": "NZ"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "07:00",
            "closes": "21:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "07:00",
            "closes": "19:00"
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} font-inter antialiased bg-brand-light text-brand-dark flex flex-col min-h-screen`}
      >
        <JsonLd id="schema-app-layout" schema={globalJsonLd} />
        <SiteChrome>
          <Navbar />
        </SiteChrome>
        <main className="grow">
          {children}
        </main>
        <SiteChrome>
          <FloatingCTA />
          <Footer />
          {process.env.NODE_ENV === "production" ? (
            <>
              <GoogleAdsTag />
              <MetaPixel />
              <AnalyticsWrapper>
                <GoogleAnalytics gaId="G-2BELF6S2L5" />
              </AnalyticsWrapper>
            </>
          ) : null}
        </SiteChrome>
      </body>
    </html>
  );
}
