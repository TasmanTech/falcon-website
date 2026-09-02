import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using our services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark animate-text-blurb-ready animate-play-text">
        Terms of Service
      </h1>
      <p className="text-lg text-brand-dark/80 max-w-2xl animate-text-blurb-ready animate-play-text">
        Please read our terms of service carefully before utilizing our premium locksmithing solutions.
      </p>
    </div>
  );
}
