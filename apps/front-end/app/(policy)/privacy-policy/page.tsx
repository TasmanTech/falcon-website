import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy and data handling practices.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-brand-dark animate-text-blurb-ready animate-play-text">
        Privacy Policy
      </h1>
      <p className="text-lg text-brand-dark/80 max-w-2xl animate-text-blurb-ready animate-play-text">
        Details about how we protect your information and handle your data with care and security.
      </p>
    </div>
  );
}
