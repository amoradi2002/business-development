import Link from "next/link";
import { Phone, Mail, MapPin, Printer } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Investors", href: "/investors" },
  { label: "Borrowers", href: "/borrowers" },
  { label: "Brokers", href: "/brokers" },
  { label: "Realtors", href: "/realtors" },
  { label: "Calculator", href: "/calculator" },
  { label: "Contact", href: "/contact" },
  { label: "Zero Mortgage Fraud", href: "/zero-mortgage-fraud" },
];

export default function Footer() {
  return (
    <footer className="bg-pcg-dark-green text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <span className="text-3xl font-black text-white">PCG</span>
              <span className="ml-2 text-sm font-semibold leading-tight text-white/80">
                Prime Capital Group, Inc.
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Southern California&apos;s premier private and hard money lender.
              Direct funding for real estate investors, borrowers, and brokers.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <p className="font-semibold text-white">Garik Hadjinian</p>
              <p>DRE License #01726567</p>
              <a
                href="tel:8556659774"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0" />
                Office: (855) 665-9774
              </a>
              <a
                href="tel:8183848544"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0" />
                Direct: (818) 384-8544
              </a>
              <span className="flex items-center gap-2">
                <Printer className="h-4 w-4 shrink-0" />
                Fax: (866) 315-4703
              </span>
              <a
                href="mailto:Garik@PrimeCapitalGroupInc.com"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" />
                Garik@PrimeCapitalGroupInc.com
              </a>
            </div>
          </div>

          {/* Address & Badges */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">
              Office
            </h4>
            <a
              href="https://maps.google.com/?q=1010+W+Magnolia+Blvd+Suite+202+Burbank+CA+91506"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                1010 W. Magnolia Blvd.
                <br />
                Suite #202
                <br />
                Burbank, CA 91506
              </span>
            </a>
            <div className="mt-6 flex flex-col gap-2 text-xs text-white/50">
              <span>NMLS Licensed</span>
              <span>CA DRE Licensed</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/20 pt-8 text-center text-xs text-white/50">
          <p>
            &copy; 2026 Prime Capital Group, Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
