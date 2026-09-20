import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import JsonLd from '@/components/JsonLd';

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
  description: "Premium locksmith services in New Zealand. Reliable, secure, and professional.",
    openGraph: { title: "Falcon Access", description: "Premium locksmith services in New Zealand. Reliable, secure, and professional.", url: "/" },
    alternates: { canonical: "/" }
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
        "url": "https://falconaccess.co.nz",
        "logo": "https://falconaccess.co.nz/falcon_access_logo.webp",
        "image": "https://falconaccess.co.nz/falcon_access_logo.webp",
        "description": "Premium commercial and residential repair, maintenance, and locksmith services in Auckland.",
        "telephone": "+64 9 243 1404",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Auckland",
          "addressRegion": "Auckland",
          "addressCountry": "NZ"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "07:00",
          "closes": "18:00"
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} font-inter antialiased bg-brand-light text-brand-dark flex flex-col min-h-screen`}
      >
        <JsonLd id="schema-app-layout" schema={globalJsonLd} />
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <FloatingCTA />
        <Footer />
      </body>
    </html>
  );
}
