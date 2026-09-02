import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our high-quality locksmithing services in New Zealand.',
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark animate-text-blurb-ready animate-play-text">
        Our Services
      </h1>
      <p className="text-lg text-brand-dark/80 mb-12 max-w-2xl animate-text-blurb-ready animate-play-text">
        Discover how we can help secure your property with our premium offerings.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-card-ready animate-play">
        <Link href="/services/locksmith" className="block p-8 rounded-2xl bg-white border border-brand-dark/10 hover:-translate-y-1 hover:border-brand-accent transition-all duration-200">
          <h2 className="text-2xl font-montserrat font-bold mb-4">Locksmith Services</h2>
          <p className="text-brand-dark/70">Professional residential and commercial locksmithing solutions.</p>
        </Link>
      </div>
    </div>
  );
}
