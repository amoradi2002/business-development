import Link from 'next/link';
import { Phone, Mail, MapPin, Award } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const SERVICES = [
  'Patios & Decks',
  'Outdoor Kitchens',
  'Pergolas',
  'Retaining Walls',
  'Fencing & Gates',
  'Concrete & Flatwork',
];

export default function Footer() {
  return (
    <footer className="bg-[#1a2744] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <span
                className="font-heading text-white text-3xl leading-none"
                style={{ letterSpacing: '0.04em' }}
              >
                VIC
              </span>
              <span
                className="font-heading text-[#e8702e] text-sm leading-none"
                style={{ letterSpacing: '0.15em' }}
              >
                CONSTRUCTION
              </span>
            </div>
            <p className="text-[#e8702e] font-heading text-xl mb-4" style={{ letterSpacing: '0.05em' }}>
              BUILT RIGHT. BUILT TO LAST.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Premium outdoor construction across Los Angeles. Patios, decks, outdoor
              kitchens, pergolas, retaining walls, fencing, and concrete flatwork —
              delivered with craftsmanship you can count on.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h3 className="font-heading text-xl mb-5 text-white" style={{ letterSpacing: '0.05em' }}>
              NAVIGATION
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#e8702e] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h3 className="font-heading text-xl mb-5 text-white" style={{ letterSpacing: '0.05em' }}>
              SERVICES
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-white/70 hover:text-[#e8702e] transition-colors duration-200 text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="font-heading text-xl mb-5 text-white" style={{ letterSpacing: '0.05em' }}>
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+18182006274"
                  className="flex items-start gap-3 text-white/70 hover:text-[#e8702e] transition-colors duration-200 text-sm"
                >
                  <Phone className="h-4 w-4 mt-0.5 text-[#e8702e] flex-shrink-0" />
                  (818) 200-6274
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@vicconstruction.com"
                  className="flex items-start gap-3 text-white/70 hover:text-[#e8702e] transition-colors duration-200 text-sm break-all"
                >
                  <Mail className="h-4 w-4 mt-0.5 text-[#e8702e] flex-shrink-0" />
                  info@vicconstruction.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-[#e8702e] flex-shrink-0" />
                Los Angeles, CA
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <Award className="h-4 w-4 mt-0.5 text-[#e8702e] flex-shrink-0" />
                License # 000000
              </li>
            </ul>
          </div>
        </div>

        {/* Orange separator line */}
        <div className="mt-16 mb-6 h-px w-full bg-gradient-to-r from-transparent via-[#e8702e] to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-white/70 text-sm">
            Copyright 2026 VIC Construction Inc. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Powered by ANM Software Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
