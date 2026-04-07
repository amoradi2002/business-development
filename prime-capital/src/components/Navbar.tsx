"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

type NavItem = { label: string; href: string };

const loanOptions: NavItem[] = [
  { label: "Hard Money Bridge Loan", href: "/calculator" },
  { label: "HELOC", href: "/calculator" },
  { label: "Cash-Out Refinance", href: "/calculator" },
  { label: "Purchase Loans", href: "/calculator" },
  { label: "Rehab Loans", href: "/calculator" },
  { label: "Construction Loans", href: "/calculator" },
  { label: "Second Mortgage", href: "/calculator" },
  { label: "Acquisition and Development", href: "/calculator" },
  { label: "Private Money Loan", href: "/calculator" },
  { label: "Bank Statement Loan", href: "/calculator" },
  { label: "Jumbo Loans", href: "/calculator" },
];

const freeTools: NavItem[] = [
  { label: "Loan Calculator", href: "/calculator" },
  { label: "Quick Rate Quote", href: "/tools/rate-quote" },
  { label: "Property Value Estimate", href: "/tools/property-value" },
  { label: "Pre-Qualification Letter", href: "/tools/pre-qualification" },
  { label: "Refinance Analysis", href: "/tools/refinance-analysis" },
];

const aboutUs: NavItem[] = [
  { label: "About PCG", href: "/investors" },
  { label: "Zero Mortgage Fraud", href: "/zero-mortgage-fraud" },
];

type DropdownKey = "loanOptions" | "freeTools" | "aboutUs" | null;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileDropdown, setMobileDropdown] = useState<DropdownKey>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileDropdown = (key: DropdownKey) => {
    setMobileDropdown((prev) => (prev === key ? null : key));
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

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
        <nav
          ref={dropdownRef}
          className="hidden items-center gap-6 lg:flex"
        >
          <Link
            href="/"
            className="text-sm font-medium text-pcg-dark transition-colors hover:text-pcg-dark-green"
          >
            Home
          </Link>
          <Link
            href="/borrowers"
            className="text-sm font-medium text-pcg-dark transition-colors hover:text-pcg-dark-green"
          >
            Purchase
          </Link>
          <Link
            href="/borrowers"
            className="text-sm font-medium text-pcg-dark transition-colors hover:text-pcg-dark-green"
          >
            Refinance
          </Link>

          {/* Loan Options Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("loanOptions")}
              className="flex items-center gap-1 text-sm font-medium text-pcg-dark transition-colors hover:text-pcg-dark-green"
            >
              Loan Options
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  openDropdown === "loanOptions" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute left-0 top-full mt-2 w-64 origin-top rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/5 transition-all duration-200 ${
                openDropdown === "loanOptions"
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-95 opacity-0"
              }`}
            >
              {loanOptions.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className="block px-4 py-2 text-sm text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Free Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("freeTools")}
              className="flex items-center gap-1 text-sm font-medium text-pcg-dark transition-colors hover:text-pcg-dark-green"
            >
              Free Tools
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  openDropdown === "freeTools" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute left-0 top-full mt-2 w-64 origin-top rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/5 transition-all duration-200 ${
                openDropdown === "freeTools"
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-95 opacity-0"
              }`}
            >
              {freeTools.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className="block px-4 py-2 text-sm text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* About Us Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("aboutUs")}
              className="flex items-center gap-1 text-sm font-medium text-pcg-dark transition-colors hover:text-pcg-dark-green"
            >
              About Us
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  openDropdown === "aboutUs" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute left-0 top-full mt-2 w-56 origin-top rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/5 transition-all duration-200 ${
                openDropdown === "aboutUs"
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-95 opacity-0"
              }`}
            >
              {aboutUs.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className="block px-4 py-2 text-sm text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Desktop Right Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded-md bg-pcg-green px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-pcg-dark-green"
          >
            Apply Online
          </Link>
          <a
            href="tel:8556659774"
            className="flex items-center gap-2 rounded-md bg-pcg-red px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:opacity-90"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>

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
          onClick={closeMobile}
        />
      )}

      {/* Mobile Drawer (slides from right) */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] transform overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-pcg-red">PCG</span>
            <span className="text-xs font-semibold leading-tight text-pcg-dark-green">
              Prime Capital
              <br />
              Group, Inc.
            </span>
          </div>
          <button onClick={closeMobile} aria-label="Close menu">
            <X className="h-6 w-6 text-pcg-dark" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          <Link
            href="/"
            onClick={closeMobile}
            className="rounded-md px-3 py-2.5 text-base font-medium text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
          >
            Home
          </Link>
          <Link
            href="/borrowers"
            onClick={closeMobile}
            className="rounded-md px-3 py-2.5 text-base font-medium text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
          >
            Purchase
          </Link>
          <Link
            href="/borrowers"
            onClick={closeMobile}
            className="rounded-md px-3 py-2.5 text-base font-medium text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
          >
            Refinance
          </Link>

          {/* Mobile Loan Options */}
          <div>
            <button
              onClick={() => toggleMobileDropdown("loanOptions")}
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
            >
              Loan Options
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  mobileDropdown === "loanOptions" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileDropdown === "loanOptions" && (
              <div className="ml-4 mt-1 flex flex-col border-l-2 border-pcg-green/30 pl-3">
                {loanOptions.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobile}
                    className="rounded-md px-3 py-2 text-sm text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Free Tools */}
          <div>
            <button
              onClick={() => toggleMobileDropdown("freeTools")}
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
            >
              Free Tools
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  mobileDropdown === "freeTools" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileDropdown === "freeTools" && (
              <div className="ml-4 mt-1 flex flex-col border-l-2 border-pcg-green/30 pl-3">
                {freeTools.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobile}
                    className="rounded-md px-3 py-2 text-sm text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile About Us */}
          <div>
            <button
              onClick={() => toggleMobileDropdown("aboutUs")}
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
            >
              About Us
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  mobileDropdown === "aboutUs" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileDropdown === "aboutUs" && (
              <div className="ml-4 mt-1 flex flex-col border-l-2 border-pcg-green/30 pl-3">
                {aboutUs.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobile}
                    className="rounded-md px-3 py-2 text-sm text-pcg-dark transition-colors hover:bg-pcg-light hover:text-pcg-dark-green"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile CTA Buttons */}
          <div className="mt-6 flex flex-col gap-3 border-t pt-4">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="rounded-md bg-pcg-green px-5 py-3 text-center text-sm font-semibold text-white shadow transition-colors hover:bg-pcg-dark-green"
            >
              Apply Online
            </Link>
            <a
              href="tel:8556659774"
              className="flex items-center justify-center gap-2 rounded-md bg-pcg-red px-5 py-3 text-center text-sm font-semibold text-white shadow transition-colors hover:opacity-90"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
