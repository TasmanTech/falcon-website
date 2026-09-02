import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our premium locksmithing company in New Zealand.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark animate-text-blurb-ready animate-play-text">
        About Us
      </h1>
      <p className="text-lg text-brand-dark/80 max-w-2xl animate-text-blurb-ready animate-play-text">
        We are dedicated to providing the highest quality security solutions. With years of experience, our team guarantees professionalism and reliability.
      </p>
    </div>
  );
}
