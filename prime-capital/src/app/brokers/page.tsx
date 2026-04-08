"use client";

import { useState, FormEvent } from "react";
import {
  CheckCircle2,
  Handshake,
  Clock,
  DollarSign,
  ShieldCheck,
  Send,
  User,
  Phone,
  Mail,
  Building2,
  MapPin,
  FileText,
} from "lucide-react";

const loanCriteria = [
  "FICO score is not a factor",
  "Up to 70% loan-to-value (LTV)",
  "Loan amounts from $50K to $25M",
  "First and second trust deeds",
  "Residential and commercial properties",
  "Interest-only payments available",
  "No prepayment penalties on most loans",
  "Funding in as few as 5-7 business days",
  "Competitive broker compensation",
  "Loans throughout California",
  "Bridge, rehab, construction, and permanent loans",
  "Flexible terms from 6 to 36 months",
];

export default function BrokersPage() {
  const [form, setForm] = useState({
    brokerName: "",
    companyName: "",
    phone: "",
    email: "",
    borrowerScenario: "",
    propertyAddress: "",
    propertyCity: "",
    zipCode: "",
    loanAmount: "",
    propertyValue: "",
    loanPurpose: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...form, submittedAt: new Date().toISOString() };
    const existing = JSON.parse(
      localStorage.getItem("pcg_broker_leads") || "[]"
    );
    existing.push(payload);
    localStorage.setItem("pcg_broker_leads", JSON.stringify(existing));

    try {
      await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formType: "broker" }),
      });
    } catch (err) {
      console.error("Failed to notify broker lead", err);
    }

    setSubmitted(true);
    setForm({
      brokerName: "",
      companyName: "",
      phone: "",
      email: "",
      borrowerScenario: "",
      propertyAddress: "",
      propertyCity: "",
      zipCode: "",
      loanAmount: "",
      propertyValue: "",
      loanPurpose: "",
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
            BROKERS
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            Broker-referred loans is our primary source of business
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-playfair text-3xl font-bold text-pcg-red md:text-4xl lg:text-5xl">
            WE ARE READY TO FUND IN JUST DAYS
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-gray-700">
            At Prime Capital Group, we understand that your success depends on
            converting loan applications into funded deals — and commission
            checks. Our streamlined process is designed to help you close more
            loans, faster. Submit your borrower scenarios and let us do the heavy
            lifting.
          </p>

          {/* Approval Criteria */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-8 shadow-sm">
              <ShieldCheck className="h-10 w-10 text-pcg-green" />
              <h3 className="mt-4 text-xl font-bold text-pcg-dark">
                Strong Collateral
              </h3>
              <p className="mt-2 text-gray-600">
                We focus on the equity and value of the underlying real estate
                collateral. Properties with sufficient equity and strong market
                fundamentals are ideal candidates for our programs.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-8 shadow-sm">
              <DollarSign className="h-10 w-10 text-pcg-green" />
              <h3 className="mt-4 text-xl font-bold text-pcg-dark">
                Ability to Repay
              </h3>
              <p className="mt-2 text-gray-600">
                We verify the borrower has a reasonable ability to repay the loan
                and a viable exit strategy, whether through refinance, sale, or
                other means.
              </p>
            </div>
          </div>

          {/* Benefits Row */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4 rounded-xl bg-white p-5">
              <Handshake className="h-8 w-8 flex-shrink-0 text-pcg-green" />
              <div>
                <h4 className="font-semibold text-pcg-dark">
                  Broker-Friendly
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  Competitive compensation and protection of your client
                  relationships
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl bg-white p-5">
              <Clock className="h-8 w-8 flex-shrink-0 text-pcg-green" />
              <div>
                <h4 className="font-semibold text-pcg-dark">Quick Closings</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Funding in as few as 5-7 business days from submission
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl bg-white p-5">
              <DollarSign className="h-8 w-8 flex-shrink-0 text-pcg-green" />
              <div>
                <h4 className="font-semibold text-pcg-dark">
                  Flexible Programs
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  Creative solutions for unique borrower scenarios
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loans We Fund */}
      <section className="bg-pcg-light py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Loans We Fund
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our lending criteria is straightforward. If your deal meets these
            parameters, we can fund it.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {loanCriteria.map((item) => (
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

      {/* Broker Lead Form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100 md:p-10">
            <h2 className="font-playfair text-2xl font-bold text-pcg-dark md:text-3xl">
              Submit a Loan Scenario
            </h2>
            <p className="mt-2 text-gray-600">
              Share your borrower&apos;s details and we&apos;ll provide a quick
              preliminary review.
            </p>

            {submitted && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-800">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">
                  Thank you! Your loan scenario has been submitted successfully.
                  We will be in touch shortly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Broker Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="brokerName"
                      required
                      placeholder="Full name"
                      value={form.brokerName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="Company"
                      value={form.companyName}
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
                      placeholder="broker@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Borrower Scenario
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    name="borrowerScenario"
                    required
                    rows={4}
                    placeholder="Describe the borrower's situation, property details, and loan needs..."
                    value={form.borrowerScenario}
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
                    placeholder="123 Main St"
                    value={form.propertyAddress}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Property City
                  </label>
                  <input
                    type="text"
                    name="propertyCity"
                    required
                    placeholder="City"
                    value={form.propertyCity}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 py-3 px-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    placeholder="91502"
                    value={form.zipCode}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 py-3 px-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="loanAmount"
                      required
                      placeholder="500,000"
                      value={form.loanAmount}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Property Value
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="propertyValue"
                      required
                      placeholder="750,000"
                      value={form.propertyValue}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Loan Purpose
                </label>
                <input
                  type="text"
                  name="loanPurpose"
                  required
                  placeholder="Purchase, Refinance, Cash-Out, Bridge, etc."
                  value={form.loanPurpose}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 py-3 px-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-pcg-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-pcg-dark-green hover:shadow-xl"
              >
                <Send className="h-4 w-4" />
                Submit Loan Scenario
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
