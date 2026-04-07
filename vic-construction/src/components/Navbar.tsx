'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'navbar-scrolled' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2 group">
            <span
              className="font-heading text-white text-3xl md:text-4xl leading-none"
              style={{ letterSpacing: '0.04em' }}
            >
              VIC
            </span>
            <span
              className="font-heading text-[#e8702e] text-sm md:text-base leading-none"
              style={{ letterSpacing: '0.15em' }}
            >
              CONSTRUCTION
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#e8702e] transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18182006274"
              className="flex items-center gap-2 text-white hover:text-[#e8702e] transition-colors duration-200 font-medium"
            >
              <Phone className="h-4 w-4" />
              (818) 200-6274
            </a>
            <Link href="/contact" className="btn btn-primary">
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white p-2"
            aria-label="Open menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile menu */}
      <aside className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-baseline gap-2">
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
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white text-lg py-3 px-2 border-b border-white/10 hover:text-[#e8702e] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary mt-6 w-full"
          >
            Get a Quote
          </Link>

          <a
            href="tel:+18182006274"
            className="flex items-center justify-center gap-2 text-white mt-4 py-3 hover:text-[#e8702e] transition-colors duration-200 font-medium"
          >
            <Phone className="h-5 w-5" />
            (818) 200-6274
          </a>
        </nav>
      </aside>
    </>
  );
}
