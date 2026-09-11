import Image from 'next/image';
import Link from 'next/link';

/**
 * Props for the Hero component.
 */
interface HeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaText?: string;
  ctaLink?: string;
  isMain?: boolean;
}

/**
 * Hero component used across the website to display a prominent banner with an image, title, and call to action.
 *
 * @param {HeroProps} props - The properties for the Hero component.
 * @param {string} props.title - The main heading text.
 * @param {string} props.description - The sub-heading or description text.
 * @param {string} props.imageSrc - The source path for the background image.
 * @param {string} props.imageAlt - The alt text for the background image.
 * @param {string} [props.ctaText] - Optional text for the call-to-action button.
 * @param {string} [props.ctaLink] - Optional URL for the call-to-action button.
 * @param {boolean} [props.isMain=false] - If true, styles the hero for the main landing page.
 * @returns {JSX.Element} The rendered Hero component.
 */
export default function Hero({
  title,
  description,
  imageSrc,
  imageAlt,
  ctaText,
  ctaLink,
  isMain = false,
}: HeroProps) {
  return (
    <section className="relative bg-brand-dark text-brand-light overflow-hidden">
      {/* Right Half Image with Fade */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[60%] z-0">
        <div className="absolute inset-0 bg-linear-to-r from-brand-dark via-brand-dark/80 to-transparent z-10 w-full" />
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="w-full md:w-1/2 md:pr-12">
          <h1 className={`font-montserrat font-bold mb-6 animate-text-blurb-ready animate-play-text ${isMain ? 'text-4xl md:text-6xl leading-tight' : 'text-4xl md:text-5xl'}`}>
            {title}
          </h1>
          <p className={`text-brand-light/90 mb-10 max-w-2xl animate-text-blurb-ready animate-play-text ${isMain ? 'text-lg md:text-xl' : 'text-lg'}`} style={{ animationDelay: '100ms' }}>
            {description}
          </p>
          {ctaText && ctaLink && (
            <div className="animate-card-ready animate-play" style={{ animationDelay: '200ms' }}>
              <Link href={ctaLink} className="inline-block bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-bold hover:bg-brand-accent/90 transition-colors">
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
