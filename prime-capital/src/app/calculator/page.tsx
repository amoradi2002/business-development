"use client";

import { useState, useCallback, useEffect, useRef } from "react";

/* ────────────────────────────────────────────
   CONSTANTS
   ──────────────────────────────────────────── */

const LOAN_TYPES = [
  "Hard Money Bridge Loan",
  "HELOC",
  "Cash-Out Refinance",
  "Purchase",
  "Rehab Loan",
  "Construction Loan",
  "Second Mortgage",
  "Acquisition and Development",
] as const;

type LoanType = (typeof LOAN_TYPES)[number];

const PROPERTY_TYPES = [
  "Single Family",
  "Townhouse",
  "Condo",
  "Multifamily",
  "Office",
  "Warehouse",
  "Self Storage",
  "Retail",
  "Hospitality",
  "Church",
  "Mobile Home",
  "Mixed-Use",
  "Raw Land",
  "Other",
] as const;

const LOAN_TERMS = [
  "6 months",
  "12 months",
  "24 months",
  "5yr",
  "10yr",
  "15yr",
  "20yr",
  "30yr",
  "40yr",
] as const;

const MAX_LTV: Record<LoanType, number> = {
  "Hard Money Bridge Loan": 0.7,
  HELOC: 0.85,
  "Cash-Out Refinance": 0.7,
  Purchase: 0.7,
  "Rehab Loan": 0.65,
  "Construction Loan": 0.7,
  "Second Mortgage": 0.7,
  "Acquisition and Development": 0.7,
};

const BASE_RATE: Record<LoanType, number> = {
  "Hard Money Bridge Loan": 10.5,
  HELOC: 8.75,
  "Cash-Out Refinance": 7.25,
  Purchase: 7.0,
  "Rehab Loan": 11.5,
  "Construction Loan": 11.99,
  "Second Mortgage": 9.5,
  "Acquisition and Development": 10.99,
};

const LOAN_PURPOSES = [
  "Purchasing a home I've already found",
  "Purchasing a home that I haven't located yet",
  "Refinance my existing loan balance",
  "Construction",
  "Other",
] as const;

/* ────────────────────────────────────────────
   HELPERS
   ──────────────────────────────────────────── */

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function fmtDollar(n: number): string {
  return "$" + fmt(n);
}

function parseDollar(s: string): number {
  const cleaned = s.replace(/[^0-9.]/g, "");
  const v = parseFloat(cleaned);
  return isNaN(v) ? 0 : v;
}

function termToMonths(term: string): number {
  if (term.endsWith("months")) return parseInt(term);
  const yr = parseInt(term);
  return yr * 12;
}

/* ────────────────────────────────────────────
   PAGE COMPONENT
   ──────────────────────────────────────────── */

export default function CalculatorPage() {
  // -- Calculator state --
  const [loanType, setLoanType] = useState<LoanType>("Hard Money Bridge Loan");
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0]);
  const [propertyValueRaw, setPropertyValueRaw] = useState("500000");
  const [loanBalanceRaw, setLoanBalanceRaw] = useState("0");
  const [desiredAmount, setDesiredAmount] = useState(250000);
  const [term, setTerm] = useState<string>("12 months");

  // -- Contact form visibility --
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // -- Contact form state --
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyCity, setPropertyCity] = useState("");
  const [propertyZip, setPropertyZip] = useState("");
  const [coBorrower, setCoBorrower] = useState<"yes" | "no">("no");
  const [loanPurpose, setLoanPurpose] = useState(LOAN_PURPOSES[0]);
  const [baseIncome, setBaseIncomeRaw] = useState("");
  const [notes, setNotes] = useState("");

  // -- Derived values --
  const propertyValue = parseDollar(propertyValueRaw);
  const loanBalance = parseDollar(loanBalanceRaw);
  const rate = BASE_RATE[loanType];
  const maxLtv = MAX_LTV[loanType];
  const maxLoan = Math.max(0, propertyValue * maxLtv);

  // Clamp desired amount when max changes
  useEffect(() => {
    setDesiredAmount((prev) => Math.min(prev, maxLoan));
  }, [maxLoan]);

  const ltv = propertyValue > 0 ? desiredAmount / propertyValue : 0;
  const monthlyPayment = desiredAmount * (rate / 100) / 12;
  const months = termToMonths(term);
  const totalInterest = monthlyPayment * months;
  const availableEquity = propertyValue - loanBalance;

  const ltvColor = ltv <= 0.65 ? "text-green-600" : ltv <= 0.7 ? "text-yellow-500" : "text-red-600";
  const ltvBadgeBg = ltv <= 0.65 ? "bg-green-100 border-green-300" : ltv <= 0.7 ? "bg-yellow-50 border-yellow-300" : "bg-red-50 border-red-300";
  const approvalLabel =
    ltv < 0.6 ? "Strong" : ltv <= 0.7 ? "Moderate" : "Talk to a Specialist";
  const approvalColor =
    ltv < 0.6 ? "text-green-700 bg-green-100" : ltv <= 0.7 ? "text-yellow-700 bg-yellow-50" : "text-red-700 bg-red-50";

  // -- Scroll to form on open --
  useEffect(() => {
    if (showForm && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [showForm]);

  // -- Dollar input handler factory --
  const dollarHandler = useCallback(
    (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      setter(raw);
    },
    []
  );

  const displayDollar = (raw: string) => {
    const n = parseInt(raw);
    if (isNaN(n) || n === 0) return "";
    return "$" + n.toLocaleString("en-US");
  };

  // -- Submit --
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lead = {
      firstName,
      lastName,
      phone,
      email,
      propertyAddress,
      propertyCity,
      propertyZip,
      propertyState: "California",
      coBorrower,
      loanPurpose,
      loanAmount: desiredAmount,
      propertyValue,
      baseMonthlyIncome: parseDollar(baseIncome),
      notes,
      calculator: {
        loanType,
        propertyType,
        propertyValue,
        loanBalance,
        desiredAmount,
        term,
        rate,
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        ltv: Math.round(ltv * 10000) / 100,
        timestamp: new Date().toISOString(),
      },
    };

    try {
      const existing = JSON.parse(localStorage.getItem("pcg_leads") || "[]");
      existing.push(lead);
      localStorage.setItem("pcg_leads", JSON.stringify(existing));
    } catch {
      // storage full or unavailable — still show success
    }

    setSubmitted(true);
  };

  const resetAll = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPropertyAddress("");
    setPropertyCity("");
    setPropertyZip("");
    setCoBorrower("no");
    setLoanPurpose(LOAN_PURPOSES[0]);
    setBaseIncomeRaw("");
    setNotes("");
    setSubmitted(false);
    setShowForm(false);
  };

  /* ─── Shared input styles ─── */
  const inputCls =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-pcg-dark placeholder-gray-400 shadow-sm transition focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/30 text-sm";
  const labelCls = "block text-sm font-semibold text-pcg-dark mb-1.5";
  const selectCls =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-pcg-dark shadow-sm transition focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/30 text-sm appearance-none cursor-pointer";

  /* ─── RENDER ─── */
  return (
    <div className="min-h-screen bg-pcg-light font-inter">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-pcg-dark-green to-pcg-dark py-20 text-center text-white">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Loan Calculator
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-green-100/90 md:text-xl">
          See what you qualify for in seconds
        </p>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="mx-auto -mt-10 max-w-6xl px-4 pb-20">
        <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
          {/* inner grid */}
          <div className="grid lg:grid-cols-5">
            {/* ── LEFT: inputs ── */}
            <div className="lg:col-span-3 p-8 md:p-10 space-y-6">
              <h2 className="font-playfair text-2xl font-bold text-pcg-dark">
                Configure Your Loan
              </h2>

              {/* Loan Type */}
              <div>
                <label className={labelCls}>Loan Type</label>
                <div className="relative">
                  <select
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value as LoanType)}
                    className={selectCls}
                  >
                    {LOAN_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className={labelCls}>Property Type</label>
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className={selectCls}
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </div>

              {/* Property Value & Loan Balance side by side */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Property Value</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={displayDollar(propertyValueRaw)}
                    onChange={dollarHandler(setPropertyValueRaw)}
                    placeholder="$500,000"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    Current Loan Balance
                    <span className="ml-1 text-xs font-normal text-gray-400">
                      (0 if purchase)
                    </span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={displayDollar(loanBalanceRaw)}
                    onChange={dollarHandler(setLoanBalanceRaw)}
                    placeholder="$0"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Desired Loan Amount — slider */}
              <div>
                <label className={labelCls}>
                  Desired Loan Amount:{" "}
                  <span className="text-pcg-green font-bold">
                    {fmtDollar(desiredAmount)}
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={maxLoan}
                  step={1000}
                  value={desiredAmount}
                  onChange={(e) => setDesiredAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-pcg-green bg-gray-200"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>$0</span>
                  <span>
                    Max {fmtDollar(maxLoan)}{" "}
                    <span className="text-gray-300">
                      ({Math.round(maxLtv * 100)}% LTV)
                    </span>
                  </span>
                </div>
              </div>

              {/* Loan Term & Interest Rate */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Loan Term</label>
                  <div className="relative">
                    <select
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className={selectCls}
                    >
                      {LOAN_TERMS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Interest Rate</label>
                  <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-pcg-dark">
                    <svg
                      className="mr-2 h-4 w-4 text-pcg-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    {rate.toFixed(2)}%
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      (starting)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                Rates range from 6.49% to 12.99% — final rate determined after
                review. California properties only.
              </p>
            </div>

            {/* ── RIGHT: output panel ── */}
            <div className="lg:col-span-2 bg-gradient-to-b from-pcg-dark to-gray-900 text-white p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="font-playfair text-2xl font-bold mb-8">
                  Your Estimate
                </h2>

                {/* Monthly Payment — hero stat */}
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-widest text-green-300/70 mb-1">
                    Est. Monthly Payment
                  </p>
                  <p className="font-playfair text-4xl md:text-5xl font-bold tracking-tight">
                    {fmtDollar(Math.round(monthlyPayment))}
                  </p>
                </div>

                <div className="space-y-5">
                  <OutputRow
                    label="Total Interest Over Term"
                    value={fmtDollar(Math.round(totalInterest))}
                  />
                  <OutputRow
                    label="Available Equity"
                    value={fmtDollar(Math.round(availableEquity))}
                  />

                  {/* LTV */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Loan-to-Value (LTV)
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">
                        {(ltv * 100).toFixed(1)}%
                      </span>
                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${ltvBadgeBg} ${ltvColor}`}
                      >
                        {ltv <= 0.65
                          ? "Low Risk"
                          : ltv <= 0.7
                          ? "Moderate"
                          : "High"}
                      </span>
                    </div>
                    {/* bar */}
                    <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          ltv <= 0.65
                            ? "bg-green-500"
                            : ltv <= 0.7
                            ? "bg-yellow-400"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${Math.min(ltv * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Approval Likelihood */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Approval Likelihood
                    </p>
                    <span
                      className={`inline-block rounded-lg px-4 py-1.5 text-sm font-bold ${approvalColor}`}
                    >
                      {approvalLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA button */}
              <button
                onClick={() => {
                  setShowForm(true);
                }}
                className="mt-10 w-full rounded-xl bg-pcg-green py-4 text-center text-lg font-bold text-white shadow-lg transition hover:bg-pcg-dark-green hover:shadow-xl active:scale-[.98]"
              >
                I&rsquo;m Interested — Contact Me About This Loan
              </button>
            </div>
          </div>
        </div>

        {/* ── CONTACT FORM ── */}
        <div
          ref={formRef}
          className={`transition-all duration-700 ease-out overflow-hidden ${
            showForm
              ? "max-h-[3000px] opacity-100 mt-10"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          {submitted ? (
            /* ── Success ── */
            <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-10 md:p-14 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-10 w-10 text-pcg-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-pcg-dark">
                Thank You!
              </h2>
              <p className="mx-auto mt-4 max-w-md text-gray-600 leading-relaxed">
                Garik will reach out within 24 hours.
                <br />
                <span className="mt-2 inline-block text-sm text-gray-400">
                  DRE #01726567
                </span>
              </p>
              <button
                onClick={resetAll}
                className="mt-8 rounded-xl border-2 border-pcg-green px-8 py-3 text-sm font-bold text-pcg-green transition hover:bg-pcg-green hover:text-white"
              >
                Start a New Estimate
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-8 md:p-10"
            >
              <h2 className="font-playfair text-2xl font-bold text-pcg-dark mb-2">
                Almost There — Tell Us About Yourself
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                All fields required unless marked optional.
              </p>

              <div className="space-y-6">
                {/* Name */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>First Name</label>
                    <input
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputCls}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Last Name</label>
                    <input
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputCls}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                {/* Phone / Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls}
                      placeholder="(818) 555-0100"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Property Address */}
                <div>
                  <label className={labelCls}>Property Address</label>
                  <input
                    required
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    className={inputCls}
                    placeholder="123 Main St"
                  />
                </div>

                {/* City / Zip */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Property City</label>
                    <input
                      required
                      value={propertyCity}
                      onChange={(e) => setPropertyCity(e.target.value)}
                      className={inputCls}
                      placeholder="Burbank"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Property Zip Code</label>
                    <input
                      required
                      value={propertyZip}
                      onChange={(e) => setPropertyZip(e.target.value)}
                      className={inputCls}
                      placeholder="91502"
                      maxLength={5}
                    />
                  </div>
                </div>

                {/* State — fixed */}
                <div>
                  <label className={labelCls}>Property State</label>
                  <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-pcg-dark">
                    California
                    <span className="ml-2 text-xs text-gray-400">
                      (We only fund California properties)
                    </span>
                  </div>
                </div>

                {/* Co-borrower */}
                <div>
                  <label className={labelCls}>
                    Will there be a co-borrower?
                  </label>
                  <div className="flex gap-6 mt-1">
                    {(["yes", "no"] as const).map((val) => (
                      <label
                        key={val}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="coBorrower"
                          value={val}
                          checked={coBorrower === val}
                          onChange={() => setCoBorrower(val)}
                          className="h-4 w-4 accent-pcg-green"
                        />
                        <span className="text-sm text-pcg-dark capitalize">
                          {val}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Loan Purpose */}
                <div>
                  <label className={labelCls}>Loan Purpose</label>
                  <div className="relative">
                    <select
                      value={loanPurpose}
                      onChange={(e) => setLoanPurpose(e.target.value as typeof loanPurpose)}
                      className={selectCls}
                    >
                      {LOAN_PURPOSES.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </div>

                {/* Pre-filled from calculator */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Loan Amount</label>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-pcg-dark">
                      {fmtDollar(desiredAmount)}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Property Value</label>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-pcg-dark">
                      {fmtDollar(propertyValue)}
                    </div>
                  </div>
                </div>

                {/* Base Monthly Income */}
                <div>
                  <label className={labelCls}>Base Monthly Income</label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    value={displayDollar(baseIncome.replace(/[^0-9]/g, ""))}
                    onChange={(e) => setBaseIncomeRaw(e.target.value)}
                    className={inputCls}
                    placeholder="$8,000"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className={labelCls}>
                    Additional Notes{" "}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className={`${inputCls} resize-none`}
                    placeholder="Anything else we should know about your situation..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-xl bg-pcg-green py-4 text-center text-lg font-bold text-white shadow-lg transition hover:bg-pcg-dark-green hover:shadow-xl active:scale-[.98]"
              >
                Request a Call From Garik
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────────────────────
   SUB-COMPONENTS
   ──────────────────────────────────────────── */

function OutputRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
