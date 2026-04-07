"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

const LOAN_TYPES = [
  { label: "Purchase", icon: "🏠" },
  { label: "Refinance", icon: "🔄" },
  { label: "Cash-Out", icon: "💵" },
  { label: "Fix and Flip", icon: "🔨" },
  { label: "Construction", icon: "🏗️" },
  { label: "Bridge Loan", icon: "🌉" },
];

const PROPERTY_TYPES = [
  { label: "Single Family", icon: "🏡" },
  { label: "Multi-Family", icon: "🏘️" },
  { label: "Commercial", icon: "🏢" },
  { label: "Land", icon: "🌄" },
];

const TIMELINES = [
  { label: "Immediately", icon: "⚡" },
  { label: "Within 30 Days", icon: "📅" },
  { label: "Within 90 Days", icon: "🗓️" },
  { label: "Just Exploring", icon: "🔍" },
];

const RATE_TABLE: Record<string, number> = {
  Purchase: 7.0,
  Refinance: 7.25,
  "Cash-Out": 7.25,
  "Fix and Flip": 11.5,
  Construction: 11.99,
  "Bridge Loan": 10.5,
};

const TOTAL_STEPS = 6;

type ContactInfo = {
  fullName: string;
  phone: string;
  email: string;
  propertyAddress: string;
};

const INITIAL_CONTACT: ContactInfo = {
  fullName: "",
  phone: "",
  email: "",
  propertyAddress: "",
};

function formatCurrency(value: number) {
  return "$" + value.toLocaleString();
}

export default function PreQualificationPage() {
  const [step, setStep] = useState(1);
  const [loanType, setLoanType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyValue, setPropertyValue] = useState(500000);
  const [loanAmount, setLoanAmount] = useState(300000);
  const [timeline, setTimeline] = useState("");
  const [contact, setContact] = useState<ContactInfo>(INITIAL_CONTACT);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const maxLoanAmount = Math.min(7000000, Math.floor(propertyValue * 0.7));
  const cappedLoanAmount = Math.min(loanAmount, maxLoanAmount);
  const ltv = propertyValue > 0 ? (cappedLoanAmount / propertyValue) * 100 : 0;
  const rate = RATE_TABLE[loanType] || 0;
  const monthlyPayment = (cappedLoanAmount * (rate / 100)) / 12;
  const isQualified = ltv <= 70;

  const ltvColor =
    ltv < 65
      ? "text-[#3d9b3d]"
      : ltv <= 70
      ? "text-yellow-600"
      : "text-[#b22222]";

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));
  const reset = () => {
    setStep(1);
    setLoanType("");
    setPropertyType("");
    setPropertyValue(500000);
    setLoanAmount(300000);
    setTimeline("");
    setContact(INITIAL_CONTACT);
    setError("");
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      ...contact,
      name: contact.fullName,
      loanType,
      propertyType,
      propertyValue,
      loanAmount: cappedLoanAmount,
      ltv: ltv.toFixed(2),
      estimatedRate: rate,
      estimatedMonthlyPayment: monthlyPayment.toFixed(2),
      timeline,
      status: isQualified
        ? "CONDITIONALLY PRE-QUALIFIED"
        : "SPEAK WITH GARIK",
      sourcePage: "Pre-Qualification",
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
        existing.push({ ...payload, submittedAt: new Date().toISOString() });
        localStorage.setItem("pcg_leads", JSON.stringify(existing));
      } catch {}

      setStep(7);
    } catch (err) {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(45, 122, 45);
    doc.rect(0, 0, 210, 35, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("PCG Pre-Qualification Letter", 20, 22);

    // Date
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Date: ${today}`, 20, 48);

    // Status badge
    if (isQualified) {
      doc.setFillColor(61, 155, 61);
    } else {
      doc.setFillColor(234, 179, 8);
    }
    doc.roundedRect(20, 55, 170, 14, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(
      isQualified ? "CONDITIONALLY PRE-QUALIFIED" : "SPEAK WITH GARIK",
      105,
      64,
      { align: "center" }
    );

    // Summary section
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Pre-Qualification Summary", 20, 85);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    const lines: [string, string][] = [
      ["Name:", contact.fullName],
      ["Phone:", contact.phone],
      ["Email:", contact.email],
      ["Property Address:", contact.propertyAddress || "N/A"],
      ["Loan Type:", loanType],
      ["Property Type:", propertyType],
      ["Property Value:", formatCurrency(propertyValue)],
      ["Requested Loan Amount:", formatCurrency(cappedLoanAmount)],
      ["LTV:", `${ltv.toFixed(2)}%`],
      ["Estimated Rate:", `${rate.toFixed(2)}%`],
      [
        "Estimated Monthly Payment:",
        formatCurrency(Math.round(monthlyPayment)),
      ],
      ["Timeline:", timeline],
    ];

    let y = 95;
    lines.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(value), 80, y);
      y += 7;
    });

    // Disclaimer
    y += 6;
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const disclaimer =
      "This is a conditional pre-qualification based on stated information. Final approval requires property appraisal and application review.";
    const wrapped = doc.splitTextToSize(disclaimer, 170);
    doc.text(wrapped, 20, y);
    y += wrapped.length * 5 + 8;

    // Contact info
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.text("Your Loan Officer", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Garik Hadjinian", 20, y);
    y += 5;
    doc.text("Prime Capital Group, Inc.", 20, y);
    y += 5;
    doc.text("Phone: (818) 384-8544", 20, y);
    y += 5;
    doc.text("Email: Garik@PrimeCapitalGroupInc.com", 20, y);
    y += 5;
    doc.text("DRE #01726567", 20, y);
    y += 5;
    doc.text("1010 W. Magnolia Blvd. Suite #202, Burbank, CA 91506", 20, y);

    // Footer bar
    doc.setFillColor(45, 122, 45);
    doc.rect(0, 285, 210, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(
      "Prime Capital Group, Inc. | PrimeCapitalGroupInc.com",
      105,
      292,
      { align: "center" }
    );

    doc.save("PCG-PreQualification.pdf");
  };

  const progressPct = Math.min((step / TOTAL_STEPS) * 100, 100);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Header */}
      <div className="bg-[#3d9b3d] px-6 py-10 text-center shadow-md">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Get Pre-Qualified in 60 Seconds
        </h1>
        <p className="mt-2 text-base text-green-50 sm:text-lg">
          Know exactly what you can borrow before you apply
        </p>
      </div>

      {/* Call Now Button */}
      <a
        href="tel:8556659774"
        className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2d7a2d] shadow-lg ring-2 ring-white hover:bg-[#f7f7f7] transition-colors"
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

      <div className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            {step <= TOTAL_STEPS && (
              <div className="border-b border-gray-100 px-6 pt-6 pb-4 sm:px-10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#2d7a2d]">
                    Step {step} of {TOTAL_STEPS}
                  </span>
                  <button
                    onClick={reset}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-[#3d9b3d] transition-all duration-500 ease-out"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}

            <div className="px-6 py-8 sm:px-10 sm:py-10">
              {/* Step 1: Loan Type */}
              {step === 1 && (
                <div>
                  <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                    What type of loan are you looking for?
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Select the option that best describes your need
                  </p>
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {LOAN_TYPES.map((type) => (
                      <button
                        key={type.label}
                        onClick={() => {
                          setLoanType(type.label);
                          goNext();
                        }}
                        className={`group flex items-center gap-3 rounded-xl border-2 p-5 text-left transition-all hover:border-[#3d9b3d] hover:bg-green-50 hover:shadow-md ${
                          loanType === type.label
                            ? "border-[#3d9b3d] bg-green-50 shadow-md"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <span className="font-semibold text-gray-900 group-hover:text-[#2d7a2d]">
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Property Type */}
              {step === 2 && (
                <div>
                  <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                    What is the property type?
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Choose the property you&apos;re financing
                  </p>
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {PROPERTY_TYPES.map((type) => (
                      <button
                        key={type.label}
                        onClick={() => {
                          setPropertyType(type.label);
                          goNext();
                        }}
                        className={`group flex items-center gap-3 rounded-xl border-2 p-5 text-left transition-all hover:border-[#3d9b3d] hover:bg-green-50 hover:shadow-md ${
                          propertyType === type.label
                            ? "border-[#3d9b3d] bg-green-50 shadow-md"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <span className="font-semibold text-gray-900 group-hover:text-[#2d7a2d]">
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Property Value */}
              {step === 3 && (
                <div>
                  <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                    What is the estimated property value?
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Slide to set your estimate
                  </p>
                  <div className="mt-10 text-center">
                    <div className="text-5xl font-bold text-[#2d7a2d] sm:text-6xl">
                      {formatCurrency(propertyValue)}
                    </div>
                  </div>
                  <div className="mt-8">
                    <input
                      type="range"
                      min={100000}
                      max={10000000}
                      step={50000}
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      className="w-full accent-[#3d9b3d]"
                    />
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>$100K</span>
                      <span>$10M</span>
                    </div>
                  </div>
                  <button
                    onClick={goNext}
                    className="mt-10 w-full rounded-xl bg-[#3d9b3d] px-6 py-4 text-lg font-bold text-white shadow-md transition-colors hover:bg-[#2d7a2d]"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Step 4: Loan Amount */}
              {step === 4 && (
                <div>
                  <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                    How much do you need to borrow?
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Capped at 70% of property value
                  </p>
                  <div className="mt-10 text-center">
                    <div className="text-5xl font-bold text-[#2d7a2d] sm:text-6xl">
                      {formatCurrency(cappedLoanAmount)}
                    </div>
                    <div className={`mt-3 text-xl font-bold ${ltvColor}`}>
                      LTV: {ltv.toFixed(1)}%
                    </div>
                  </div>
                  <div className="mt-8">
                    <input
                      type="range"
                      min={50000}
                      max={7000000}
                      step={25000}
                      value={cappedLoanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full accent-[#3d9b3d]"
                    />
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>$50K</span>
                      <span>Max: {formatCurrency(maxLoanAmount)}</span>
                    </div>
                  </div>
                  <button
                    onClick={goNext}
                    className="mt-10 w-full rounded-xl bg-[#3d9b3d] px-6 py-4 text-lg font-bold text-white shadow-md transition-colors hover:bg-[#2d7a2d]"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Step 5: Timeline */}
              {step === 5 && (
                <div>
                  <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                    What is your timeline?
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    When do you need funding?
                  </p>
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {TIMELINES.map((t) => (
                      <button
                        key={t.label}
                        onClick={() => {
                          setTimeline(t.label);
                          goNext();
                        }}
                        className={`group flex items-center gap-3 rounded-xl border-2 p-5 text-left transition-all hover:border-[#3d9b3d] hover:bg-green-50 hover:shadow-md ${
                          timeline === t.label
                            ? "border-[#3d9b3d] bg-green-50 shadow-md"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <span className="text-2xl">{t.icon}</span>
                        <span className="font-semibold text-gray-900 group-hover:text-[#2d7a2d]">
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Contact Info */}
              {step === 6 && (
                <div>
                  <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                    Your contact info
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Last step. We&apos;ll generate your result instantly.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
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
                        value={contact.phone}
                        onChange={handleContactChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
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
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Property Address{" "}
                        <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="propertyAddress"
                        value={contact.propertyAddress}
                        onChange={handleContactChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-[#b22222]">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-xl bg-[#3d9b3d] px-6 py-4 text-lg font-bold text-white shadow-md transition-colors hover:bg-[#2d7a2d] disabled:opacity-60"
                    >
                      {submitting
                        ? "Calculating..."
                        : "See My Pre-Qualification Result"}
                    </button>
                  </form>
                </div>
              )}

              {/* Step 7: Result */}
              {step === 7 && (
                <div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      Your Pre-Qualification Summary
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      Based on the information you provided
                    </p>
                  </div>

                  <div
                    className={`mt-6 rounded-xl px-6 py-5 text-center shadow-md ${
                      isQualified
                        ? "bg-[#3d9b3d]"
                        : "bg-yellow-500"
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                      Status
                    </div>
                    <div className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                      {isQualified
                        ? "CONDITIONALLY PRE-QUALIFIED"
                        : "SPEAK WITH GARIK"}
                    </div>
                  </div>

                  <div className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-[#f7f7f7]">
                    {[
                      ["Name", contact.fullName],
                      ["Loan Type", loanType],
                      ["Property Type", propertyType],
                      ["Property Value", formatCurrency(propertyValue)],
                      [
                        "Requested Amount",
                        formatCurrency(cappedLoanAmount),
                      ],
                      ["LTV", `${ltv.toFixed(2)}%`],
                      ["Estimated Rate", `${rate.toFixed(2)}%`],
                      [
                        "Est. Monthly Payment",
                        formatCurrency(Math.round(monthlyPayment)),
                      ],
                      ["Timeline", timeline],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between px-5 py-3"
                      >
                        <span className="text-sm font-medium text-gray-600">
                          {label}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-900">
                    This is a conditional pre-qualification based on stated
                    information. Final approval requires property appraisal
                    and application review.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      onClick={generatePDF}
                      className="rounded-xl border-2 border-[#3d9b3d] bg-white px-6 py-4 text-base font-bold text-[#2d7a2d] shadow-sm transition-colors hover:bg-green-50"
                    >
                      Download as PDF
                    </button>
                    <Link
                      href="/contact"
                      className="rounded-xl bg-[#3d9b3d] px-6 py-4 text-center text-base font-bold text-white shadow-md transition-colors hover:bg-[#2d7a2d]"
                    >
                      Schedule My Call With Garik
                    </Link>
                  </div>

                  <button
                    onClick={reset}
                    className="mt-4 w-full text-center text-sm font-medium text-gray-500 hover:text-[#2d7a2d]"
                  >
                    Start over
                  </button>
                </div>
              )}

              {/* Back button */}
              {step > 1 && step <= TOTAL_STEPS && (
                <button
                  onClick={goBack}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#2d7a2d]"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            🔒 Privacy and Security Guaranteed — Your information is encrypted
            and never shared.
          </p>
        </div>
      </div>
    </div>
  );
}
