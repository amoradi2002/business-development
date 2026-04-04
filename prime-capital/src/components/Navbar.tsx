"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Investors", href: "/investors" },
  { label: "Borrowers", href: "/borrowers" },
  { label: "Brokers", href: "/brokers" },
  { label: "Realtors", href: "/realtors" },
  { label: "Calculator", href: "/calculator" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-black leading-none text-pcg-red">
            PCG
          </span>
          <span className="hidden text-sm font-semibold leading-tight text-pcg-dark-green sm:block">
            Prime Capital
            <br />
            Group, Inc.
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-pcg-dark transition-colors hover:text-pcg-dark-green"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-pcg-green px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-pcg-dark-green"
          >
            Get Funded Now
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-7 w-7 text-pcg-dark" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-72 transform bg-white shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="text-xl font-black text-pcg-red">PCG</span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-pcg-dark" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-base font-medium text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 rounded-md bg-pcg-green px-5 py-3 text-center text-sm font-semibold text-white shadow transition-colors hover:bg-pcg-dark-green"
          >
            Get Funded Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
