interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQSectionProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
  theme?: 'light' | 'dark';
}

export default function FAQSection({
  title,
  subtitle,
  faqs,
  theme = 'dark'
}: FAQSectionProps) {
  const bgClass = theme === 'light' ? 'bg-brand-light' : 'bg-brand-dark';
  const textClass = theme === 'light' ? 'text-brand-dark' : 'text-brand-light';
  const mutedTextClass = theme === 'light' ? 'text-brand-dark/70' : 'text-brand-light/70';

  return (
    <section className={`py-24 ${bgClass} ${textClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            {title}
          </h2>
          <p className={`${mutedTextClass} text-lg`}>
            {subtitle}
          </p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white/10 rounded-xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className={`flex cursor-pointer items-center justify-between gap-1.5 p-6 ${textClass} font-montserrat font-bold text-lg`}>
                {faq.question}
                <span className="relative size-5 shrink-0 text-brand-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </summary>
              <p className={`px-6 pb-6 ${mutedTextClass} font-inter`}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
