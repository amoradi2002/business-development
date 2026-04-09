"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white transition-transform group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, #3b6fe8 0%, #5a8af0 100%)",
                boxShadow: "0 8px 24px -8px rgba(59, 111, 232, 0.6)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 20L12 4L20 20"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 14H17"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="11" r="1.5" fill="white" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div
                className="text-white font-bold text-lg leading-none tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                ANM
              </div>
              <div className="text-[10px] text-blue-200 uppercase tracking-widest leading-none mt-0.5">
                Software Solutions
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/85 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#contact" className="btn btn-primary !py-2.5 !px-5 !text-sm">
              Book a Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      <div
        className={`mobile-menu-backdrop ${open ? "open" : ""} md:hidden`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile menu panel */}
      <div className={`mobile-menu ${open ? "open" : ""} md:hidden`}>
        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white text-xl font-semibold"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-4 w-full"
          >
            Book a Call
          </a>
          <div className="mt-6 pt-6 border-t border-white/10 text-white/60 text-sm">
            <div className="mb-2">anmdevlopmentservices@yahoo.com</div>
            <div>(818) 930-9738</div>
          </div>
        </nav>
      </div>
    </>
  );
}
