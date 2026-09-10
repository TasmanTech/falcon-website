interface TextContentSectionProps {
  title: string;
  content: React.ReactNode[];
  theme?: 'light' | 'dark';
}

export default function TextContentSection({
  title,
  content,
  theme = 'dark'
}: TextContentSectionProps) {
  const bgClass = theme === 'light' ? 'bg-brand-light' : 'bg-brand-dark';
  const textClass = theme === 'light' ? 'text-brand-dark' : 'text-brand-light';
  const mutedTextClass = theme === 'light' ? 'text-brand-dark/80' : 'text-brand-light/80';

  return (
    <section className={`py-24 ${bgClass} ${textClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-text-blurb-ready animate-play-text">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
          {title}
        </h2>
        <div className={`space-y-6 font-inter ${mutedTextClass} text-lg`}>
          {content.map((paragraph, index) => (
            <div key={index}>{paragraph}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
