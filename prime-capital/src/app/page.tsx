import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Building2,
  ThumbsUp,
  Landmark,
  Banknote,
  Home,
  RefreshCcw,
  ShoppingBag,
  Hammer,
  HardHat,
  Layers,
  CheckCircle2,
  DollarSign,
  FileCheck,
  Phone,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Direct Lender",
    subtitle: "No Middleman",
  },
  {
    icon: Clock,
    title: "Close in 5-7 Days",
    subtitle: "Fast Funding",
  },
  {
    icon: Building2,
    title: "All Property Types",
    subtitle: "Residential & Commercial",
  },
  {
    icon: ThumbsUp,
    title: "When Others Say No",
    subtitle: "We Say Yes",
  },
];

const loanProducts = [
  {
    icon: Landmark,
    title: "Bridge Loans",
    description:
      "Short-term financing to bridge the gap between buying and selling. Ideal for time-sensitive transactions.",
  },
  {
    icon: Banknote,
    title: "Hard Money Loans",
    description:
      "Asset-based lending with fast approvals. Perfect for investors who need speed and flexibility.",
  },
  {
    icon: Home,
    title: "HELOC",
    description:
      "Access your home equity with a flexible line of credit. Draw funds as you need them.",
  },
  {
    icon: RefreshCcw,
    title: "Cash-Out Refinance",
    description:
      "Unlock trapped equity in your property. Use funds for renovations, investments, or debt payoff.",
  },
  {
    icon: ShoppingBag,
    title: "Purchase Loans",
    description:
      "Competitive financing for property acquisitions. Close quickly and beat the competition.",
  },
  {
    icon: Hammer,
    title: "Rehab Loans",
    description:
      "Fix-and-flip financing with flexible draw schedules. Fund both purchase and renovation costs.",
  },
  {
    icon: HardHat,
    title: "Construction Loans",
    description:
      "Ground-up construction financing for residential and commercial projects across Southern California.",
  },
  {
    icon: Layers,
    title: "Second Mortgages",
    description:
      "Tap into your property equity without refinancing your first mortgage. Flexible terms available.",
  },
];

const propertyTypes = [
  "Single Family Residences",
  "Townhouses",
  "Condos",
  "Multifamily",
  "Office",
  "Warehouse",
  "Self Storage",
  "Retail",
  "Hospitality",
  "Churches",
  "Mobile Home",
  "Mixed-Use",
  "Raw Land",
];

const whyPcg = [
  {
    icon: CheckCircle2,
    title: "2-Criteria Approval",
    description:
      "We focus on what matters: strong collateral and the ability to repay. Simple, straightforward underwriting.",
  },
  {
    icon: DollarSign,
    title: "In-House Funding",
    description:
      "As a direct lender, we control the entire process. No middleman, no delays, no surprises.",
  },
  {
    icon: FileCheck,
    title: "Simplified Underwriting",
    description:
      "Business purpose loans with streamlined documentation. FICO score is not a determining factor.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO
      ============================================================ */}
      <section
        className="relative overflow-hidden bg-pcg-dark-green"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-24 text-center lg:px-8 lg:py-36">
          <h1 className="font-playfair text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
            Funding the
            <br />
            American Dream
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/80 md:text-xl">
            Southern California&apos;s Premier Private &amp; Hard Money Lender
            &mdash; Closing in Days, Not Months.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/calculator"
              className="inline-block rounded-md bg-pcg-green px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-green-600"
            >
              Apply Now
            </Link>
            <Link
              href="/calculator"
              className="inline-block rounded-md border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-pcg-dark-green"
            >
              Calculate Your Loan
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          TRUST BAR
      ============================================================ */}
      <section className="border-b bg-white py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 lg:grid-cols-4 lg:px-8">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center"
            >
              <item.icon className="mb-3 h-10 w-10 text-pcg-green" />
              <p className="text-base font-bold text-pcg-dark">{item.title}</p>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          LOAN PRODUCTS
      ============================================================ */}
      <section className="bg-pcg-light py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Loan Products
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">
            Flexible financing solutions for every real estate scenario.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loanProducts.map((product) => (
              <div
                key={product.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <product.icon className="mb-4 h-9 w-9 text-pcg-green" />
                <h3 className="font-playfair text-lg font-bold text-pcg-dark">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PROPERTY TYPES
      ============================================================ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Property Types We Finance
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">
            From single-family homes to raw land &mdash; if it has value, we can
            lend on it.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {propertyTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-pcg-green/30 bg-pcg-green/5 px-5 py-2.5 text-sm font-medium text-pcg-dark-green"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY PCG
      ============================================================ */}
      <section className="bg-pcg-light py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Why Prime Capital Group?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {whyPcg.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-pcg-green/10">
                  <item.icon className="h-7 w-7 text-pcg-green" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-pcg-dark">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          RATES SECTION
      ============================================================ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Competitive Rates &amp; Terms
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border-2 border-pcg-green/20 bg-pcg-light p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-pcg-green">
                Rates As Low As
              </p>
              <p className="mt-2 font-playfair text-4xl font-black text-pcg-dark lg:text-5xl">
                6.49% &ndash; 12.99%
              </p>
            </div>
            <div className="rounded-xl border-2 border-pcg-green/20 bg-pcg-light p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-pcg-green">
                Loan Amounts
              </p>
              <p className="mt-2 font-playfair text-4xl font-black text-pcg-dark lg:text-5xl">
                $50K &ndash; $25M
              </p>
            </div>
            <div className="rounded-xl border-2 border-pcg-green/20 bg-pcg-light p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-pcg-green">
                Up To
              </p>
              <p className="mt-2 font-playfair text-4xl font-black text-pcg-dark lg:text-5xl">
                70% LTV
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA BANNER
      ============================================================ */}
      <section
        className="bg-pcg-dark-green"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-16 text-center lg:px-8 lg:py-20">
          <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl">
            Ready to Get Funded?
          </h2>
          <p className="mt-3 text-xl text-white/80">
            Talk to Garik Today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:8183848544"
              className="flex items-center gap-2 rounded-md border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-pcg-dark-green"
            >
              <Phone className="h-5 w-5" />
              (818) 384-8544
            </a>
            <Link
              href="/contact"
              className="inline-block rounded-md bg-pcg-green px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-green-600"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
