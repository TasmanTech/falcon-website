interface IconItem {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

interface IconListSectionProps {
  title: string;
  subtitle: string;
  items: IconItem[];
  theme?: 'light' | 'dark';
}

export default function IconListSection({
  title,
  subtitle,
  items,
  theme = 'light'
}: IconListSectionProps) {
  const bgClass = theme === 'light' ? 'bg-brand-light' : 'bg-brand-dark';
  const textClass = theme === 'light' ? 'text-brand-dark' : 'text-brand-light';
  const mutedTextClass = theme === 'light' ? 'text-brand-dark/70' : 'text-brand-light/70';

  return (
    <section className={`py-24 ${bgClass} ${textClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            {title}
          </h2>
          <p className={`${mutedTextClass} max-w-2xl mx-auto text-lg`}>
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center text-brand-dark" 
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold font-montserrat mb-3">{item.title}</h4>
              <p className="text-brand-dark/70 font-inter">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
