"use client";

import { useState, FormEvent } from "react";
import {
  TrendingUp,
  ShieldCheck,
  DollarSign,
  CheckCircle2,
  Mail,
  User,
} from "lucide-react";

export default function InvestorsPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    emailUpdates: false,
  });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...form, submittedAt: new Date().toISOString() };
    const existing = JSON.parse(
      localStorage.getItem("pcg_investor_leads") || "[]"
    );
    existing.push(payload);
    localStorage.setItem("pcg_investor_leads", JSON.stringify(existing));

    try {
      await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formType: "investor" }),
      });
    } catch (err) {
      console.error("Failed to notify investor lead", err);
    }

    setSubmitted(true);
    setForm({ firstName: "", lastName: "", email: "", emailUpdates: false });
    setTimeout(() => setSubmitted(false), 5000);
  }

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
            INVESTORS
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            Receive compelling secured returns on your low loan-to-value
            investment
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-pcg-green py-6">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <p className="text-lg font-semibold text-white md:text-xl">
            Become a registered Prime Capital Group investor today!
          </p>
        </div>
      </section>

      {/* Body Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left: Info */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
                Asset-Based Lending Strategy
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                Prime Capital Group offers qualified investors the opportunity to
                participate in carefully underwritten, asset-based loans secured
                by California real estate. Our conservative lending approach
                focuses on low loan-to-value ratios, ensuring a significant
                equity cushion that protects your investment.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Each investment is secured by a recorded deed of trust on real
                property, giving you a tangible, collateral-backed position. We
                perform rigorous due diligence on every loan, including property
                appraisals, title searches, and borrower analysis, so you can
                invest with confidence.
              </p>

              {/* Stats */}
              <div className="mt-10 rounded-2xl border border-pcg-green/20 bg-pcg-light p-8 text-center">
                <TrendingUp className="mx-auto h-12 w-12 text-pcg-green" />
                <p className="mt-4 font-playfair text-4xl font-bold text-pcg-dark md:text-5xl">
                  Earn Yields Between
                </p>
                <p className="mt-2 font-playfair text-5xl font-bold text-pcg-green md:text-6xl">
                  7.9% and 12.9%
                </p>
                <p className="mt-4 text-gray-600">
                  Annualized returns on secured trust deed investments
                </p>
              </div>

              {/* Trust Deed Description */}
              <div className="mt-10">
                <h3 className="font-playfair text-2xl font-bold text-pcg-dark">
                  Trust Deed Investments
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  A trust deed investment allows you to act as the lender on a
                  real estate loan. Your investment is secured by a recorded deed
                  of trust on the borrower&apos;s property. This means your
                  capital is backed by real, tangible collateral — California
                  real estate.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Unlike stocks or bonds, trust deed investments provide a
                  predictable income stream with monthly interest payments, all
                  while maintaining the security of a hard asset. Prime Capital
                  Group services all loans, handling collections, property
                  inspections, and all administrative duties on your behalf.
                </p>
              </div>

              {/* Benefits */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Secured by Real Estate",
                    desc: "Every investment is backed by California property",
                  },
                  {
                    icon: DollarSign,
                    title: "Monthly Income",
                    desc: "Receive predictable monthly interest payments",
                  },
                  {
                    icon: TrendingUp,
                    title: "Low LTV Ratios",
                    desc: "Conservative underwriting protects your capital",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Full Servicing",
                    desc: "We handle all loan administration for you",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <item.icon className="h-8 w-8 text-pcg-green" />
                    <h4 className="mt-3 font-semibold text-pcg-dark">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <div className="sticky top-24 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
                <h3 className="font-playfair text-2xl font-bold text-pcg-dark">
                  Register as an Investor
                </h3>
                <p className="mt-2 text-gray-600">
                  Join our network and receive information about available
                  investment opportunities.
                </p>

                {submitted && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-800">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                      Thank you! Your registration has been submitted
                      successfully.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="emailUpdates"
                      checked={form.emailUpdates}
                      onChange={(e) =>
                        setForm({ ...form, emailUpdates: e.target.checked })
                      }
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-pcg-green focus:ring-pcg-green"
                    />
                    <label
                      htmlFor="emailUpdates"
                      className="text-sm text-gray-700"
                    >
                      Please email me future investment properties
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-pcg-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-pcg-dark-green hover:shadow-xl"
                  >
                    Submit Registration
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
