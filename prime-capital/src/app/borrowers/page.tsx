"use client";

import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Building2,
  Home,
  Warehouse,
  Store,
  Hotel,
  Church,
  LandPlot,
  Layers,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Building,
  Hammer,
  BrickWall,
  Container,
} from "lucide-react";

const propertyTypes = [
  { name: "Single Family Residences", icon: Home },
  { name: "Townhouses", icon: Home },
  { name: "Condos", icon: Building2 },
  { name: "Multifamily", icon: Building2 },
  { name: "Office", icon: Building },
  { name: "Warehouse", icon: Warehouse },
  { name: "Self Storage", icon: Container },
  { name: "Retail", icon: Store },
  { name: "Hospitality", icon: Hotel },
  { name: "Churches", icon: Church },
  { name: "Mobile Home", icon: Home },
  { name: "Mixed-Use", icon: Layers },
  { name: "Raw Land", icon: LandPlot },
];

const loanTypes = [
  "Purchase",
  "Refinance",
  "Cash-Out Refinance",
  "Acquisition and Development",
  "Second Mortgages",
];

const businessLoanTypes = [
  {
    name: "Residential",
    icon: Home,
    desc: "SFR, condos, townhouses, multifamily properties",
  },
  {
    name: "Commercial",
    icon: Building,
    desc: "Office, retail, warehouse, mixed-use properties",
  },
  {
    name: "Rehab",
    icon: Hammer,
    desc: "Fix-and-flip, renovation, and value-add projects",
  },
  {
    name: "Bridge",
    icon: BrickWall,
    desc: "Short-term financing to bridge the gap",
  },
  {
    name: "Construction",
    icon: Building2,
    desc: "Ground-up construction and major renovation",
  },
];

export default function BorrowersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-pcg-dark py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-pcg-dark-green/30 to-pcg-dark/90" />
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pcg-green">
            Prime Capital Group
          </p>
          <h1 className="font-playfair text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            BORROWERS
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            We say Yes when banks say NO
          </p>
        </div>
      </section>

      {/* Red Heading Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-playfair text-3xl font-bold text-pcg-red md:text-4xl lg:text-5xl">
            WE FUND WHAT BANKS DON&apos;T
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-gray-700">
            Prime Capital Group specializes in bridge loans for commercial and
            residential properties throughout California. Whether you need
            short-term financing to acquire, refinance, or renovate a property,
            we provide fast, flexible funding solutions tailored to your needs.
          </p>

          {/* Stats Row */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-8 text-center shadow-sm">
              <DollarSign className="mx-auto h-10 w-10 text-pcg-green" />
              <p className="mt-4 font-playfair text-3xl font-bold text-pcg-dark">
                6.49% &ndash; 12.99%
              </p>
              <p className="mt-2 text-sm text-gray-600">Competitive Rates</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-8 text-center shadow-sm">
              <Clock className="mx-auto h-10 w-10 text-pcg-green" />
              <p className="mt-4 font-playfair text-3xl font-bold text-pcg-dark">
                5&ndash;7 Days
              </p>
              <p className="mt-2 text-sm text-gray-600">Fast Funding</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-8 text-center shadow-sm">
              <FileText className="mx-auto h-10 w-10 text-pcg-green" />
              <p className="mt-4 font-playfair text-3xl font-bold text-pcg-dark">
                Flexible
              </p>
              <p className="mt-2 text-sm text-gray-600">Terms & Structures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="bg-pcg-light py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Loan Types
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {loanTypes.map((type) => (
              <div
                key={type}
                className="flex items-center gap-3 rounded-xl bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-pcg-green" />
                <span className="text-lg font-medium text-pcg-dark">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Property Types We Finance
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {propertyTypes.map((type) => (
              <div
                key={type.name}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <type.icon className="h-7 w-7 flex-shrink-0 text-pcg-green" />
                <span className="font-medium text-pcg-dark">{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equity / No Denial Section */}
      <section className="bg-pcg-light py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            We Look at the Equity Value
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            We look at the equity value of the underlying collateral, not the
            borrower&apos;s credit score or income history. We do not deny
            applications based on credit score, bankruptcy, short sale history,
            foreclosure, or tax liens. If you have substantial equity in your
            property and a viable exit strategy, we want to help you get funded.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Our underwriting focuses on the property&apos;s value and the
            borrower&apos;s ability to repay, making our loans accessible to
            borrowers who may not qualify for traditional bank financing.
          </p>
        </div>
      </section>

      {/* Business Purpose Loan Types */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Business Purpose Loan Types
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessLoanTypes.map((type) => (
              <div
                key={type.name}
                className="rounded-2xl border border-gray-100 bg-pcg-light p-6 shadow-sm"
              >
                <type.icon className="h-10 w-10 text-pcg-green" />
                <h3 className="mt-4 text-xl font-bold text-pcg-dark">
                  {type.name}
                </h3>
                <p className="mt-2 text-gray-600">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-pcg-dark py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl">
            Flexible Terms, Simple Application Process and Fast Funding
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Get started today. Speak with a loan officer or submit your
            application online.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:8556659774"
              className="flex items-center gap-2 rounded-lg bg-pcg-green px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-pcg-dark-green hover:shadow-xl"
            >
              <Phone className="h-5 w-5" />
              Call (855) 665-9774
            </a>
            <Link
              href="/calculator"
              className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-pcg-dark"
            >
              Apply Online
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
