import Link from "next/link";
import Image from "next/image";
import CopyrightYear from "./CopyrightYear";

interface FooterLink {
  href: string;
  label: string;
  children?: FooterLink[];
}

/** Hub service pages, each followed by its individual service pages (shown indented). */
const serviceLinks: FooterLink[] = [
  {
    href: "/lock",
    label: "Lock Services",
    children: [
      { href: "/lock/lockout", label: "Lockout" },
      { href: "/lock/rekey", label: "Rekey" },
      { href: "/lock/lock-change-installation", label: "Lock Change & Install" },
      { href: "/lock/lock-repair", label: "Lock Repair" },
    ],
  },
  {
    href: "/smart-lock",
    label: "Smart Lock Services",
    children: [
      { href: "/smart-lock/smart-lock-installation", label: "Smart Lock Installation" },
      { href: "/smart-lock/smart-lock-change", label: "Smart Lock Change" },
      { href: "/smart-lock/smart-lock-repair-programming", label: "Repair & Programming" },
    ],
  },
  {
    href: "/auto",
    label: "Auto Services",
    children: [
      { href: "/auto/obd2-diagnostic", label: "OBDII Diagnostic" },
      { href: "/auto/dead-battery-assistance", label: "Dead Battery Assistance" },
    ],
  },
  { href: "/car-lockout", label: "Car Lockout" },
];

/**
 * Global footer component.
 * Displays company information, social links, and navigation links grouped by category.
 * Included at the bottom of all pages via the root layout.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light py-12 border-t border-brand-light/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="mb-6">
            <Image src="/falcon_access_logo.webp" alt="Falcon Access Logo" width={300} height={64} className="h-14 md:h-16 w-auto rounded-xl p-1 bg-white" style={{ width: 'auto' }} />
          </div>
          <p className="text-brand-light/70 font-inter mb-6">
            Mobile locksmith, smart lock and auto services across Auckland.
          </p>
          <div className="flex space-x-4">
            {/* Social Icons */}
            <a href="https://www.facebook.com/falconaccessnz" target="_blank" rel="noopener noreferrer" className="text-brand-light hover:text-brand-accent hover:-translate-y-1 transition-all inline-block">
              <span className="sr-only">Falcon Access on Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="https://www.instagram.com/falconaccess/" target="_blank" rel="noopener noreferrer" className="text-brand-light hover:text-brand-accent hover:-translate-y-1 transition-all inline-block">
              <span className="sr-only">Falcon Access on Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.415.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.382.896-.422.164-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.382-.164-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.381.42-.419.819-.679 1.382-.896.422-.166 1.057-.361 2.227-.415 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.059 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.059-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
          </div>
        </div>

        <div>
          <div className="font-bold text-lg mb-4 font-montserrat">Services</div>
          <ul className="space-y-2 font-inter">
            {serviceLinks.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className="text-brand-light/80 hover:text-brand-accent hover:translate-x-1 transition-all inline-block">{service.label}</Link>
                {service.children && (
                  <ul className="mt-2 ml-1 pl-4 space-y-1.5 border-l border-brand-light/20 text-sm">
                    {service.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="text-brand-light/70 hover:text-brand-accent hover:translate-x-1 transition-all inline-block">{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-bold text-lg mb-4 font-montserrat">Company</div>
          <ul className="space-y-2 font-inter">
            <li><Link href="/about" className="text-brand-light/80 hover:text-brand-accent hover:translate-x-1 transition-all inline-block">About Us</Link></li>
            <li><Link href="/contact" className="text-brand-light/80 hover:text-brand-accent hover:translate-x-1 transition-all inline-block">Contact</Link></li>
            <li><Link href="/privacy-policy" className="text-brand-light/80 hover:text-brand-accent hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="text-brand-light/80 hover:text-brand-accent hover:translate-x-1 transition-all inline-block">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-bold text-lg mb-4 font-montserrat">Contact Us</div>
          <ul className="space-y-2 font-inter text-brand-light/80 mb-4">
            <li>Phone: <a href="tel:+6492431404" className="underline hover:text-brand-accent transition-colors">+64 9 243 1404</a></li>
            <li>Email: <a href="mailto:info@falconaccess.co.nz" className="underline hover:text-brand-accent transition-colors">info@falconaccess.co.nz</a></li>
            <li>Mon to Sat: 7 am to 9 pm</li>
            <li>Sun: 7 am to 7 pm</li>
            <li>
              <a href="https://www.google.com/maps?cid=14340846117585175277" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                Falcon Access
              </a>
            </li>
          </ul>
          <div className="mt-4 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408755.524889178!2d174.7265725!3d-36.8328344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6528990332c1aad5%3A0xc704eb90193442ed!2sFalcon%20Access!5e0!3m2!1sen!2snz!4v1790732079856!5m2!1sen!2snz"
              width="200"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Falcon Access Location Map"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-light/10 text-center text-brand-light/70 font-inter text-sm">
        &copy; <CopyrightYear /> Falcon Access Limited. All rights reserved.
      </div>
    </footer>
  );
}
