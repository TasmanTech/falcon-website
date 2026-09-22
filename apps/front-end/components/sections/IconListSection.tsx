interface IconItem {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

interface IconListSectionProps {
  title: string;
  subtitle?: string;
  items: IconItem[];
  theme?: 'light' | 'dark' | 'white';
}

export default function IconListSection({
  title,
  subtitle,
  items,
  theme = 'light'
}: IconListSectionProps) {
  const bgClass = theme === 'dark' ? 'bg-brand-dark' : theme === 'white' ? 'bg-white' : 'bg-brand-light';
  const textClass = theme === 'dark' ? 'text-brand-light' : 'text-brand-dark';
  const mutedTextClass = theme === 'dark' ? 'text-brand-light/70' : 'text-brand-dark/90';

  const getGridCols = (count: number) => {
    if (count === 1) return 'md:grid-cols-1';
    if (count === 2) return 'md:grid-cols-2 max-w-4xl mx-auto';
    if (count === 4) return 'md:grid-cols-2 lg:grid-cols-4';
    return 'md:grid-cols-3'; // Default for 3 items
  };

  const gridClass = getGridCols(items.length);

  return (
    <section className={`py-24 ${bgClass} ${textClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-text-blurb-ready animate-play-text">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className={`${mutedTextClass} max-w-2xl mx-auto text-lg`}>
              {subtitle}
            </p>
          )}
        </div>
        
        <div className={`grid grid-cols-1 ${gridClass} gap-8`}>
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 hover:border-brand-accent/50 transition-colors animate-card-ready animate-play flex flex-col items-center text-center text-brand-dark" 
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-montserrat mb-3">{item.title}</h3>
              <p className="text-brand-dark/90 font-inter">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
