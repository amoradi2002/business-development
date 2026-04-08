"use client";

import { useState, FormEvent } from "react";
import {
  CheckCircle2,
  Home,
  Clock,
  DollarSign,
  Users,
  Send,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  BadgeCheck,
  Handshake,
  TrendingUp,
} from "lucide-react";

const benefits = [
  "Close deals that would otherwise fall through",
  "Fast pre-approval and funding in days, not months",
  "Competitive loan programs for all property types",
  "Dedicated point of contact for all your referrals",
  "Protect your commission on every transaction",
  "FICO score is not a factor for your clients",
  "Up to 70% LTV on residential and commercial properties",
  "Loan amounts from $50K to $25M",
  "Interest-only payments available",
  "Bridge, purchase, refinance, and cash-out loans",
  "No prepayment penalties on most programs",
  "Loans throughout the state of California",
];

export default function RealtorsPage() {
  const [form, setForm] = useState({
    realtorName: "",
    licenseNumber: "",
    phone: "",
    email: "",
    clientScenario: "",
    propertyAddress: "",
    estimatedPropertyValue: "",
    loanAmountNeeded: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...form, submittedAt: new Date().toISOString() };
    const existing = JSON.parse(
      localStorage.getItem("pcg_realtor_leads") || "[]"
    );
    existing.push(payload);
    localStorage.setItem("pcg_realtor_leads", JSON.stringify(existing));

    try {
      await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formType: "realtor" }),
      });
    } catch (err) {
      console.error("Failed to notify realtor lead", err);
    }

    setSubmitted(true);
    setForm({
      realtorName: "",
      licenseNumber: "",
      phone: "",
      email: "",
      clientScenario: "",
      propertyAddress: "",
      estimatedPropertyValue: "",
      loanAmountNeeded: "",
    });
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
            REALTORS
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            More options, more deals, more earnings
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-playfair text-3xl font-bold text-pcg-red md:text-4xl lg:text-5xl">
            READY TO FUND YOUR DEAL IN JUST DAYS
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-gray-700">
            As a realtor, you know that not every buyer qualifies for
            traditional bank financing. Prime Capital Group helps you convert
            home shoppers into home buyers by providing fast, flexible private
            lending solutions. Don&apos;t let financing stand between your
            clients and their dream property.
          </p>

          {/* Value Props */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-8 text-center shadow-sm">
              <Users className="mx-auto h-10 w-10 text-pcg-green" />
              <h3 className="mt-4 text-xl font-bold text-pcg-dark">
                Convert More Buyers
              </h3>
              <p className="mt-2 text-gray-600">
                Turn shoppers who can&apos;t get bank financing into qualified
                buyers with our flexible loan programs.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-8 text-center shadow-sm">
              <Clock className="mx-auto h-10 w-10 text-pcg-green" />
              <h3 className="mt-4 text-xl font-bold text-pcg-dark">
                Close Faster
              </h3>
              <p className="mt-2 text-gray-600">
                Our streamlined process funds loans in as few as 5-7 business
                days, keeping your deals on track.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-8 text-center shadow-sm">
              <TrendingUp className="mx-auto h-10 w-10 text-pcg-green" />
              <h3 className="mt-4 text-xl font-bold text-pcg-dark">
                Earn More
              </h3>
              <p className="mt-2 text-gray-600">
                More closed deals means more commissions. We help you rescue
                transactions that would otherwise fall through.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="mt-16">
            <h3 className="font-playfair text-2xl font-bold text-pcg-dark md:text-3xl">
              How We Help Your Clients
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              When your client can&apos;t qualify for a conventional mortgage due
              to credit issues, self-employment income, recent bankruptcy, short
              sale, or other challenges, Prime Capital Group steps in. We focus
              on the property&apos;s equity value and the borrower&apos;s
              ability to repay — not their credit score.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              Simply refer your client to us or submit their scenario using the
              form below. We&apos;ll provide a quick preliminary review and work
              with you to close the deal as fast as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-pcg-light py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Why Partner With Prime Capital Group
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-pcg-green" />
                <span className="text-sm font-medium text-pcg-dark">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100 md:p-10">
            <h2 className="font-playfair text-2xl font-bold text-pcg-dark md:text-3xl">
              Refer a Client
            </h2>
            <p className="mt-2 text-gray-600">
              Share your client&apos;s details and we&apos;ll provide a quick
              preliminary review.
            </p>

            {submitted && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-800">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">
                  Thank you! Your referral has been submitted successfully.
                  We will be in touch shortly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Realtor Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="realtorName"
                      required
                      placeholder="Full name"
                      value={form.realtorName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    License Number
                  </label>
                  <div className="relative">
                    <BadgeCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="licenseNumber"
                      required
                      placeholder="DRE #01234567"
                      value={form.licenseNumber}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={handleChange}
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
                      name="email"
                      required
                      placeholder="agent@realty.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Client Scenario
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    name="clientScenario"
                    required
                    rows={4}
                    placeholder="Describe your client's situation, financing needs, and timeline..."
                    value={form.clientScenario}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Property Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="propertyAddress"
                    required
                    placeholder="123 Main St, City, CA 91502"
                    value={form.propertyAddress}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Estimated Property Value
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="estimatedPropertyValue"
                      required
                      placeholder="750,000"
                      value={form.estimatedPropertyValue}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Loan Amount Needed
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="loanAmountNeeded"
                      required
                      placeholder="500,000"
                      value={form.loanAmountNeeded}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-pcg-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-pcg-dark-green hover:shadow-xl"
              >
                <Send className="h-4 w-4" />
                Submit Referral
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
