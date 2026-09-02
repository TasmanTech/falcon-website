import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us for quotes or emergency locksmith assistance.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark animate-text-blurb-ready animate-play-text">
        Contact Us
      </h1>
      <p className="text-lg text-brand-dark/80 max-w-2xl animate-text-blurb-ready animate-play-text">
        Reach out today for premium locksmith services, quotes, or emergency assistance across New Zealand.
      </p>
    </div>
  );
}
