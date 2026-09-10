import Image from 'next/image';
import Link from 'next/link';

interface PhotoContentSectionProps {
  imageSrc: string;
  imageAlt: string;
  imageTitle: string;
  title: string;
  content: React.ReactNode[];
  ctaText?: string;
  ctaHref?: string;
  photoPosition: 'left' | 'right';
  theme?: 'light' | 'dark';
}

export default function PhotoContentSection({
  imageSrc,
  imageAlt,
  imageTitle,
  title,
  content,
  ctaText,
  ctaHref,
  photoPosition,
  theme = 'light'
}: PhotoContentSectionProps) {
  const bgClass = theme === 'light' ? 'bg-brand-light' : 'bg-brand-dark';
  const textClass = theme === 'light' ? 'text-brand-dark' : 'text-brand-light';
  
  const isLeft = photoPosition === 'left';
  
  return (
    <section className={`py-24 ${bgClass} ${textClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
          <div className="w-full md:w-1/2 animate-image-ready animate-play-img">
            <div className={`relative aspect-3/2 w-full rounded-2xl overflow-hidden ${bgClass}`}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                title={imageTitle}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
              {title}
            </h2>
            <div className={`space-y-4 font-inter ${theme === 'light' ? 'text-brand-dark/80' : 'text-brand-light/80'}`}>
              {content.map((paragraph, index) => (
                <div key={index}>{paragraph}</div>
              ))}
            </div>
            {ctaText && ctaHref && (
              <div className="mt-8">
                <Link href={ctaHref} className="inline-block bg-brand-accent text-white px-8 py-4 rounded-full font-bold hover:bg-brand-accent/90 hover:shadow-md transition-all duration-200">
                  {ctaText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
