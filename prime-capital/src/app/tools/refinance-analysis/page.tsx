"use client";

import { useState, useMemo, FormEvent, ChangeEvent } from "react";

type FormState = {
  currentLoanBalance: string;
  currentInterestRate: string;
  currentMonthlyPayment: string;
  remainingTermMonths: string;
  propertyValue: string;
  newRate: string;
  newTermYears: string;
};

type LeadState = {
  fullName: string;
  phone: string;
  email: string;
};

const INITIAL_FORM: FormState = {
  currentLoanBalance: "",
  currentInterestRate: "",
  currentMonthlyPayment: "",
  remainingTermMonths: "360",
  propertyValue: "",
  newRate: "7.25",
  newTermYears: "30",
};

const INITIAL_LEAD: LeadState = {
  fullName: "",
  phone: "",
  email: "",
};

const REFI_COSTS = 3500;

function formatDollars(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString();
}

function stripDollars(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function stripRate(value: string) {
  return value.replace(/[^0-9.]/g, "");
}

function money(n: number) {
  if (!isFinite(n) || isNaN(n)) return "—";
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  return (
    sign +
    "$" +
    abs.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

const DOLLAR_FIELDS = new Set([
  "currentLoanBalance",
  "currentMonthlyPayment",
  "propertyValue",
]);

const RATE_FIELDS = new Set(["currentInterestRate", "newRate"]);

export default function RefinanceAnalysisPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [lead, setLead] = useState<LeadState>(INITIAL_LEAD);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (DOLLAR_FIELDS.has(name)) {
      setForm((prev) => ({ ...prev, [name]: stripDollars(value) }));
    } else if (RATE_FIELDS.has(name)) {
      setForm((prev) => ({ ...prev, [name]: stripRate(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLeadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const calc = useMemo(() => {
    const loanBalance = Number(form.currentLoanBalance);
    const currentRate = Number(form.currentInterestRate);
    const currentMonthlyPayment = Number(form.currentMonthlyPayment);
    const propertyValue = Number(form.propertyValue);
    const newRate = Number(form.newRate);
    const newTermYears = Number(form.newTermYears);

    const hasAll =
      loanBalance > 0 &&
      currentRate > 0 &&
      currentMonthlyPayment > 0 &&
      propertyValue > 0 &&
      newRate > 0 &&
      newTermYears > 0;

    if (!hasAll) {
      return {
        ready: false,
        newMonthlyPayment: NaN,
        monthlySavings: NaN,
        annualSavings: NaN,
        breakEvenMonths: NaN,
        totalSavings: NaN,
        newLTV: NaN,
      };
    }

    const r = newRate / 100 / 12;
    const n = newTermYears * 12;
    const newMonthlyPayment =
      (loanBalance * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    const annualSavings = monthlySavings * 12;
    const breakEvenMonths = monthlySavings > 0 ? REFI_COSTS / monthlySavings : NaN;
    const totalSavings = monthlySavings * n - REFI_COSTS;
    const newLTV = (loanBalance / propertyValue) * 100;

    return {
      ready: true,
      newMonthlyPayment,
      monthlySavings,
      annualSavings,
      breakEvenMonths,
      totalSavings,
      newLTV,
    };
  }, [form]);

  const ltvColor = (() => {
    if (!calc.ready) return "text-white";
    if (calc.newLTV < 65) return "text-green-300";
    if (calc.newLTV <= 70) return "text-yellow-300";
    return "text-red-300";
  })();

  const recommendation = (() => {
    if (!calc.ready) return null;
    if (calc.monthlySavings > 100) {
      return {
        text: "REFINANCING MAKES SENSE",
        bg: "bg-[#3d9b3d]",
        border: "border-green-300",
      };
    }
    if (calc.monthlySavings >= 0) {
      return {
        text: "SPEAK WITH GARIK FIRST",
        bg: "bg-yellow-500",
        border: "border-yellow-300",
      };
    }
    return {
      text: "NOT RECOMMENDED",
      bg: "bg-[#b22222]",
      border: "border-red-300",
    };
  })();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const [firstName, ...rest] = lead.fullName.trim().split(" ");
    const lastName = rest.join(" ");

    const payload = {
      name: lead.fullName,
      firstName,
      lastName,
      phone: lead.phone,
      email: lead.email,
      currentLoanBalance: form.currentLoanBalance,
      currentInterestRate: form.currentInterestRate,
      currentMonthlyPayment: form.currentMonthlyPayment,
      remainingTermMonths: form.remainingTermMonths,
      propertyValue: form.propertyValue,
      newRate: form.newRate,
      newTermYears: form.newTermYears,
      newMonthlyPayment: calc.ready ? Math.round(calc.newMonthlyPayment) : null,
      monthlySavings: calc.ready ? Math.round(calc.monthlySavings) : null,
      annualSavings: calc.ready ? Math.round(calc.annualSavings) : null,
      breakEvenMonths:
        calc.ready && isFinite(calc.breakEvenMonths)
          ? Math.round(calc.breakEvenMonths)
          : null,
      totalSavings: calc.ready ? Math.round(calc.totalSavings) : null,
      newLTV: calc.ready ? Math.round(calc.newLTV * 10) / 10 : null,
      sourcePage: "Refinance Analysis",
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      try {
        const existing = JSON.parse(
          localStorage.getItem("pcg_leads") || "[]"
        );
        existing.push(payload);
        localStorage.setItem("pcg_leads", JSON.stringify(existing));
      } catch {
        // ignore localStorage failures
      }

      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const firstName = lead.fullName.trim().split(" ")[0] || "";

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
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

      <div className="bg-[#3d9b3d] px-6 py-10 text-center sm:px-10 sm:py-14">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Refinance Analysis
        </h1>
        <p className="mt-2 text-base text-green-50 sm:text-lg">
          See if refinancing makes sense for your situation
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left column — Inputs */}
          <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Your Current Loan
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Loan Balance
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="currentLoanBalance"
                  value={
                    form.currentLoanBalance
                      ? formatDollars(form.currentLoanBalance)
                      : ""
                  }
                  onChange={handleFormChange}
                  placeholder="$0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Interest Rate
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    name="currentInterestRate"
                    value={form.currentInterestRate}
                    onChange={handleFormChange}
                    placeholder="0.00"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-8 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Monthly Payment
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="currentMonthlyPayment"
                  value={
                    form.currentMonthlyPayment
                      ? formatDollars(form.currentMonthlyPayment)
                      : ""
                  }
                  onChange={handleFormChange}
                  placeholder="$0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Remaining Term (months)
                </label>
                <select
                  name="remainingTermMonths"
                  value={form.remainingTermMonths}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                >
                  <option value="60">60 months (5 years)</option>
                  <option value="120">120 months (10 years)</option>
                  <option value="180">180 months (15 years)</option>
                  <option value="240">240 months (20 years)</option>
                  <option value="300">300 months (25 years)</option>
                  <option value="360">360 months (30 years)</option>
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
                    form.propertyValue ? formatDollars(form.propertyValue) : ""
                  }
                  onChange={handleFormChange}
                  placeholder="$0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                />
              </div>

              <hr className="border-gray-200" />

              <h2 className="text-xl font-bold text-gray-900">
                Proposed New Loan
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Desired New Rate
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    name="newRate"
                    value={form.newRate}
                    onChange={handleFormChange}
                    placeholder="7.25"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-8 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Loan Term
                </label>
                <select
                  name="newTermYears"
                  value={form.newTermYears}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                >
                  <option value="5">5 years</option>
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right column — Live Analysis Panel */}
          <div className="rounded-xl bg-gradient-to-br from-[#2d7a2d] to-[#1e5a1e] p-6 text-white shadow-lg sm:p-8">
            <h2 className="mb-6 text-xl font-bold">Live Refinance Analysis</h2>

            {/* Payment Comparison */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-green-100">
                  Current Payment
                </p>
                <p className="mt-1 text-2xl font-bold text-white">
                  {form.currentMonthlyPayment
                    ? money(Number(form.currentMonthlyPayment))
                    : "—"}
                  <span className="text-sm font-normal text-green-100">
                    /mo
                  </span>
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-green-100">
                  New Payment
                </p>
                <p className="mt-1 text-2xl font-bold text-[#7ee87e]">
                  {calc.ready ? money(calc.newMonthlyPayment) : "—"}
                  <span className="text-sm font-normal text-green-100">
                    /mo
                  </span>
                </p>
              </div>
            </div>

            {/* Monthly Savings */}
            <div className="mb-6 rounded-lg bg-white/10 p-5 text-center">
              <p className="text-xs uppercase tracking-wide text-green-100">
                Monthly Savings
              </p>
              <p
                className={`mt-2 text-4xl font-extrabold ${
                  !calc.ready
                    ? "text-white"
                    : calc.monthlySavings >= 0
                    ? "text-[#7ee87e]"
                    : "text-red-300"
                }`}
              >
                {calc.ready ? money(calc.monthlySavings) : "—"}
                {calc.ready && (
                  <span className="text-base font-normal text-green-100">
                    {" "}
                    /month
                  </span>
                )}
              </p>
            </div>

            {/* Stats grid */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-green-100">
                  Annual Savings
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  {calc.ready ? money(calc.annualSavings) : "—"}
                  {calc.ready && (
                    <span className="text-xs font-normal text-green-100">
                      {" "}
                      /yr
                    </span>
                  )}
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-green-100">
                  Break-Even
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  {calc.ready && isFinite(calc.breakEvenMonths)
                    ? `${Math.ceil(calc.breakEvenMonths)} mo`
                    : "—"}
                </p>
                <p className="mt-1 text-[10px] leading-tight text-green-100">
                  until savings cover refinancing costs
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-green-100">
                  Total Savings Over Term
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  {calc.ready ? money(calc.totalSavings) : "—"}
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-green-100">
                  New LTV
                </p>
                <p className={`mt-1 text-xl font-bold ${ltvColor}`}>
                  {calc.ready ? `${calc.newLTV.toFixed(1)}%` : "—"}
                </p>
              </div>
            </div>

            {/* Recommendation Badge */}
            {recommendation ? (
              <div
                className={`rounded-lg ${recommendation.bg} border-2 ${recommendation.border} px-4 py-5 text-center shadow-lg`}
              >
                <p className="text-lg font-extrabold tracking-wide text-white">
                  {recommendation.text}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-white/30 px-4 py-5 text-center">
                <p className="text-sm text-green-100">
                  Fill in the form to see your recommendation
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lead Capture */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-lg sm:p-8">
          {success ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <p className="text-lg font-semibold text-[#2d7a2d]">
                Thank you {firstName}! Garik will review your refinance
                analysis and reach out within 24 hours. In the meantime you
                can reach him directly at (818) 384-8544.
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Get Your Official Refinance Quote
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Garik will personally review your numbers and contact you with
                a tailored quote.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={lead.fullName}
                      onChange={handleLeadChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={lead.phone}
                      onChange={handleLeadChange}
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
                      value={lead.email}
                      onChange={handleLeadChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-[#b22222]">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-md bg-[#3d9b3d] px-4 py-4 text-base font-bold text-white shadow-md transition-colors hover:bg-[#2d7a2d] disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting..."
                    : "Get My Official Refinance Quote From Garik"}
                </button>

                <p className="text-center text-xs text-gray-500">
                  🔒 Privacy and Security Guaranteed — Your information is
                  encrypted and never shared.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
