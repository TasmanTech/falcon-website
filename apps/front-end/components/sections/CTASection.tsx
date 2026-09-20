import Link from 'next/link';

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  theme?: 'light' | 'dark' | 'white' | 'catchy';
}

export default function CTASection({
  title = "Ready to Secure Your Property?",
  description = "Contact our expert commercial and residential repair team today to discuss your maintenance or security needs.",
  buttonText = "Get in Touch",
  buttonHref = "/contact",
  theme = 'catchy'
}: CTASectionProps) {
  const bgClass = theme === 'dark' ? 'bg-brand-dark' : theme === 'white' ? 'bg-white' : theme === 'catchy' ? 'bg-brand-catchy' : 'bg-brand-light';
  const textClass = (theme === 'dark' || theme === 'catchy') ? 'text-brand-light' : 'text-brand-dark';
  const descClass = (theme === 'dark' || theme === 'catchy') ? 'text-brand-light/90' : 'text-brand-dark/80';
  
  // High contrast button for the catchy theme
  const btnClass = theme === 'catchy' 
    ? 'bg-brand-dark text-brand-light hover:bg-brand-dark/90' 
    : 'bg-brand-primary text-white hover:bg-brand-primary/90';

  return (
    <section className={`w-full py-16 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-card-ready animate-play">
        <h2 className={`text-3xl md:text-4xl font-bold font-montserrat mb-4 ${textClass}`}>
          {title}
        </h2>
        <p className={`text-lg mb-8 max-w-2xl mx-auto font-inter ${descClass}`}>
          {description}
        </p>
        <Link 
          href={buttonHref}
          className={`inline-block px-8 py-4 font-bold rounded-full transition-colors shadow-sm ${btnClass}`}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
