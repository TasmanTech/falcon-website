import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Locksmith Services',
  description: 'Professional locksmithing services for residential and commercial properties in NZ.',
};

export default function LocksmithServicePage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark animate-text-blurb-ready animate-play-text">
        Locksmith Services
      </h1>
      <p className="text-lg text-brand-dark/80 max-w-2xl animate-text-blurb-ready animate-play-text">
        Emergency and scheduled locksmithing for all your needs. We provide rapid response and high-security installations.
      </p>
    </div>
  );
}
