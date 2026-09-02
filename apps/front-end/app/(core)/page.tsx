import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-brand-dark animate-text-blurb-ready animate-play-text">
        Welcome to [Brand Name]
      </h1>
      <p className="text-lg md:text-xl text-brand-dark/80 mb-12 max-w-2xl animate-text-blurb-ready animate-play-text" style={{animationDelay: '100ms'}}>
        High-quality locksmithing services in New Zealand. Simple, secure, and reliable.
      </p>
      <div className="flex gap-4 animate-card-ready animate-play" style={{animationDelay: '200ms'}}>
        <Link href="/services" className="bg-brand-accent text-white px-8 py-3 rounded-full font-bold hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          Our Services
        </Link>
        <Link href="/contact" className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
