"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";

const LOAN_TYPES = [
  "Hard Money Bridge",
  "HELOC",
  "Cash-Out Refinance",
  "Purchase",
  "Rehab Loan",
  "Construction",
  "Second Mortgage",
  "Acquisition and Development",
  "Private Money Loan",
];

const PROPERTY_TYPES = [
  "SFR",
  "Townhouse",
  "Condo",
  "Multifamily",
  "Office",
  "Warehouse",
  "Retail",
  "Mixed-Use",
  "Raw Land",
  "Other",
];

const LOAN_TERMS = [
  { label: "6 months", months: 6 },
  { label: "12 months", months: 12 },
  { label: "24 months", months: 24 },
  { label: "5 years", months: 60 },
  { label: "10 years", months: 120 },
  { label: "15 years", months: 180 },
  { label: "20 years", months: 240 },
  { label: "30 years", months: 360 },
];

const RATE_TABLE: Record<string, number> = {
  "Hard Money Bridge": 10.5,
  HELOC: 8.75,
  "Cash-Out Refinance": 7.25,
  Purchase: 7.0,
  "Rehab Loan": 11.5,
  Construction: 11.99,
  "Second Mortgage": 9.5,
  "Acquisition and Development": 10.99,
  "Private Money Loan": 10.5,
};

type CalcState = {
  loanType: string;
  propertyType: string;
  propertyValue: string;
  loanAmount: string;
  loanTerm: string;
};

type ContactState = {
  fullName: string;
  phone: string;
  email: string;
};

const INITIAL_CALC: CalcState = {
  loanType: "",
  propertyType: "",
  propertyValue: "",
  loanAmount: "",
  loanTerm: "",
};

const INITIAL_CONTACT: ContactState = {
  fullName: "",
  phone: "",
  email: "",
};

function formatDollars(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString();
}

function stripDollars(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function formatMoney(n: number) {
  if (!isFinite(n) || isNaN(n)) return "—";
  return (
    "$" +
    Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 })
  );
}

export default function RateQuotePage() {
  const [calc, setCalc] = useState<CalcState>(INITIAL_CALC);
  const [contact, setContact] = useState<ContactState>(INITIAL_CONTACT);
  const [showContact, setShowContact] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCalcChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "propertyValue" || name === "loanAmount") {
      setCalc((prev) => ({ ...prev, [name]: stripDollars(value) }));
    } else {
      setCalc((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const computed = useMemo(() => {
    const baseRate = calc.loanType ? RATE_TABLE[calc.loanType] : null;
    const propertyValue = Number(calc.propertyValue) || 0;
    const loanAmount = Number(calc.loanAmount) || 0;
    const term = LOAN_TERMS.find((t) => t.label === calc.loanTerm);
    const termMonths = term ? term.months : 0;

    let rateLow: number | null = null;
    let rateHigh: number | null = null;
    if (baseRate !== null) {
      rateLow = +(baseRate - 0.5).toFixed(2);
      rateHigh = +(baseRate + 0.5).toFixed(2);
    }

    let monthlyPayment: number | null = null;
    if (baseRate !== null && loanAmount > 0 && termMonths > 0) {
      monthlyPayment =
        (loanAmount * (baseRate / 100)) / 12 + loanAmount / termMonths;
    }

    let ltv: number | null = null;
    if (loanAmount > 0 && propertyValue > 0) {
      ltv = (loanAmount / propertyValue) * 100;
    }

    let ltvColor = "text-white";
    if (ltv !== null) {
      if (ltv < 65) ltvColor = "text-green-300";
      else if (ltv <= 70) ltvColor = "text-yellow-300";
      else ltvColor = "text-red-300";
    }

    let approval = "—";
    if (ltv !== null) {
      if (ltv < 60) approval = "Strong";
      else if (ltv <= 70) approval = "Moderate";
      else approval = "Talk to a Specialist";
    }

    return {
      baseRate,
      rateLow,
      rateHigh,
      monthlyPayment,
      ltv,
      ltvColor,
      approval,
    };
  }, [calc]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      ...calc,
      ...contact,
      name: contact.fullName,
      desiredAmount: calc.loanAmount,
      estimatedRate: computed.baseRate,
      estimatedRateRange:
        computed.rateLow !== null && computed.rateHigh !== null
          ? `${computed.rateLow}% - ${computed.rateHigh}%`
          : null,
      estimatedLTV: computed.ltv,
      estimatedMonthlyPayment: computed.monthlyPayment,
      approvalLikelihood: computed.approval,
      sourcePage: "Rate Quote",
    };

    try {
      if (typeof window !== "undefined") {
        const existing = JSON.parse(
          localStorage.getItem("pcg_leads") || "[]"
        );
        existing.push({ ...payload, createdAt: new Date().toISOString() });
        localStorage.setItem("pcg_leads", JSON.stringify(existing));
      }

      const res = await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const firstName = contact.fullName.trim().split(" ")[0] || "";

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-8 px-4 sm:py-12">
      <a
        href="tel:8556659774"
        className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#3d9b3d] px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-[#2d7a2d] transition-colors"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.7 2.8a2 2 0 01-.45 1.95L8.09 10.91a11 11 0 005 5l1.645-1.38a2 2 0 011.95-.45l2.8.7A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span className="hidden sm:inline">Call Now</span>
      </a>

      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="bg-[#3d9b3d] px-6 py-8 text-center sm:px-10">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Quick Rate Quote
            </h1>
            <p className="mt-2 text-sm text-green-50 sm:text-base">
              Get an instant rate estimate for your loan
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Left column — Calculator form */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loan Type
                  </label>
                  <select
                    name="loanType"
                    value={calc.loanType}
                    onChange={handleCalcChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  >
                    <option value="">Select loan type...</option>
                    {LOAN_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={calc.propertyType}
                    onChange={handleCalcChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  >
                    <option value="">Select property type...</option>
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Property Value
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="propertyValue"
                    value={
                      calc.propertyValue ? formatDollars(calc.propertyValue) : ""
                    }
                    onChange={handleCalcChange}
                    placeholder="$0"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Desired Loan Amount
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="loanAmount"
                    value={
                      calc.loanAmount ? formatDollars(calc.loanAmount) : ""
                    }
                    onChange={handleCalcChange}
                    placeholder="$0"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loan Term
                  </label>
                  <select
                    name="loanTerm"
                    value={calc.loanTerm}
                    onChange={handleCalcChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  >
                    <option value="">Select term...</option>
                    {LOAN_TERMS.map((t) => (
                      <option key={t.label} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right column — Live Result Panel */}
              <div className="rounded-xl bg-gradient-to-br from-[#3d9b3d] to-[#2d7a2d] p-6 text-white shadow-lg">
                <h2 className="text-lg font-semibold uppercase tracking-wide text-green-50">
                  Live Estimate
                </h2>
                <p className="mt-1 text-xs text-green-100">
                  Updates as you fill in the form
                </p>

                <div className="mt-6 space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-green-100">
                      Estimated Rate Range
                    </p>
                    <p className="mt-1 text-3xl font-bold sm:text-4xl">
                      {computed.rateLow !== null && computed.rateHigh !== null
                        ? `${computed.rateLow.toFixed(2)}% - ${computed.rateHigh.toFixed(2)}%`
                        : "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-green-100">
                      Estimated Monthly Payment
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {computed.monthlyPayment !== null
                        ? formatMoney(computed.monthlyPayment)
                        : "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-green-100">
                      Estimated LTV
                    </p>
                    <p
                      className={`mt-1 text-2xl font-bold ${computed.ltvColor}`}
                    >
                      {computed.ltv !== null
                        ? `${computed.ltv.toFixed(1)}%`
                        : "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-green-100">
                      Approval Likelihood
                    </p>
                    <p className="mt-1 text-xl font-semibold">
                      {computed.approval}
                    </p>
                  </div>
                </div>

                <p className="mt-8 border-t border-green-400/40 pt-4 text-xs text-green-100">
                  Final rate determined after review by Garik Hadjinian
                </p>
              </div>
            </div>

            {/* Lead Capture Section */}
            <div className="mt-10">
              {success ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                  <p className="text-lg font-semibold text-[#2d7a2d]">
                    Thank you {firstName}! Garik will review your rate quote
                    request and reach out within 24 hours. In the meantime you
                    can reach him directly at (818) 384-8544.
                  </p>
                </div>
              ) : !showContact ? (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowContact(true)}
                    className="w-full rounded-md bg-[#3d9b3d] px-4 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#2d7a2d] sm:text-lg"
                  >
                    Get My Official Quote From Garik
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Almost done — where should Garik send your official quote?
                  </h3>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={contact.fullName}
                        onChange={handleContactChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={contact.phone}
                          onChange={handleContactChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={contact.email}
                          onChange={handleContactChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-sm text-[#b22222]">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-md bg-[#3d9b3d] px-4 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#2d7a2d] disabled:opacity-60"
                    >
                      {submitting ? "Submitting..." : "Send My Quote Request"}
                    </button>

                    <p className="text-center text-xs text-gray-500">
                      🔒 Privacy and Security Guaranteed — Your information is
                      encrypted and never shared.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
