"use client";

import { useState, FormEvent, ChangeEvent } from "react";

const PROPERTY_TYPES = [
  "SFR",
  "Townhouse",
  "Condo",
  "Multifamily",
  "Commercial",
  "Mixed-Use",
  "Raw Land",
];

const BEDROOMS = ["Studio", "1", "2", "3", "4", "5+"];
const BATHROOMS = ["1", "1.5", "2", "2.5", "3", "3.5", "4+"];
const CONDITIONS = ["Excellent", "Good", "Fair", "Needs Work"] as const;
type Condition = (typeof CONDITIONS)[number];

type PropertyForm = {
  propertyAddress: string;
  city: string;
  zipCode: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  yearBuilt: string;
  condition: string;
};

const INITIAL_PROPERTY: PropertyForm = {
  propertyAddress: "",
  city: "",
  zipCode: "",
  propertyType: "",
  bedrooms: "",
  bathrooms: "",
  squareFootage: "",
  yearBuilt: "",
  condition: "",
};

type LeadForm = {
  fullName: string;
  phone: string;
  email: string;
  hasLoan: "" | "Yes" | "No";
  loanBalance: string;
};

const INITIAL_LEAD: LeadForm = {
  fullName: "",
  phone: "",
  email: "",
  hasLoan: "",
  loanBalance: "",
};

type Estimate = {
  lowEstimate: number;
  highEstimate: number;
  estimatedValue: number;
  maxLoanAmount: number;
};

const formatDollars = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function PropertyValuePage() {
  const [property, setProperty] = useState<PropertyForm>(INITIAL_PROPERTY);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [lead, setLead] = useState<LeadForm>(INITIAL_LEAD);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedFirstName, setSubmittedFirstName] = useState("");
  const [error, setError] = useState("");

  const handlePropertyChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleEstimate = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const sqft = parseFloat(property.squareFootage);
    if (!sqft || sqft <= 0) {
      setError("Please enter a valid square footage.");
      return;
    }

    const basePerSqft = 450; // LA area default
    const conditionAdjustment: Record<Condition, number> = {
      Excellent: 1.15,
      Good: 1.05,
      Fair: 0.95,
      "Needs Work": 0.8,
    };

    const adjustment =
      conditionAdjustment[property.condition as Condition] ?? 1.0;
    const baseValue = sqft * basePerSqft * adjustment;
    const lowEstimate = Math.round(baseValue * 0.95);
    const highEstimate = Math.round(baseValue * 1.05);
    const estimatedValue = Math.round(baseValue);
    const maxLoanAmount = Math.round(estimatedValue * 0.7);

    setEstimate({ lowEstimate, highEstimate, estimatedValue, maxLoanAmount });

    if (typeof window !== "undefined") {
      setTimeout(() => {
        const el = document.getElementById("estimate-result");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const availableEquity =
    estimate && lead.hasLoan === "Yes" && lead.loanBalance
      ? estimate.estimatedValue - parseFloat(lead.loanBalance || "0")
      : null;

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!estimate) return;
    setSubmitting(true);
    setError("");

    const firstName = lead.fullName.trim().split(" ")[0] || "";

    const payload = {
      ...property,
      ...lead,
      name: lead.fullName,
      estimatedValue: estimate.estimatedValue,
      lowEstimate: estimate.lowEstimate,
      highEstimate: estimate.highEstimate,
      maxLoanAmount: estimate.maxLoanAmount,
      availableEquity,
      sourcePage: "Property Value Estimate",
    };

    try {
      const res = await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      if (typeof window !== "undefined") {
        try {
          const existing = JSON.parse(
            localStorage.getItem("pcg_leads") || "[]"
          );
          existing.push({ ...payload, submittedAt: new Date().toISOString() });
          localStorage.setItem("pcg_leads", JSON.stringify(existing));
        } catch {
          // ignore storage errors
        }
      }

      setSubmittedFirstName(firstName);
      setSuccess(true);
    } catch (err) {
      setError(
        "Something went wrong. Please try again or call us directly at (855) 665-9774."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]";
  const labelClass = "block text-sm font-medium text-gray-700";

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

      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="bg-[#3d9b3d] px-6 py-8 text-center sm:px-10">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Property Value Estimate
            </h1>
            <p className="mt-2 text-sm text-green-50 sm:text-base">
              Get an instant estimate of your property&apos;s worth
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <form onSubmit={handleEstimate} className="space-y-5">
              <div>
                <label className={labelClass}>Property Address</label>
                <input
                  required
                  type="text"
                  name="propertyAddress"
                  value={property.propertyAddress}
                  onChange={handlePropertyChange}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={property.city}
                    onChange={handlePropertyChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Zip Code</label>
                  <input
                    required
                    type="number"
                    name="zipCode"
                    value={property.zipCode}
                    onChange={handlePropertyChange}
                    placeholder="90001"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Property Type</label>
                <select
                  required
                  name="propertyType"
                  value={property.propertyType}
                  onChange={handlePropertyChange}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select property type...</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Bedrooms</label>
                  <select
                    required
                    name="bedrooms"
                    value={property.bedrooms}
                    onChange={handlePropertyChange}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="">Select...</option>
                    {BEDROOMS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Bathrooms</label>
                  <select
                    required
                    name="bathrooms"
                    value={property.bathrooms}
                    onChange={handlePropertyChange}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="">Select...</option>
                    {BATHROOMS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Square Footage</label>
                  <input
                    required
                    type="number"
                    name="squareFootage"
                    value={property.squareFootage}
                    onChange={handlePropertyChange}
                    placeholder="2000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Year Built</label>
                  <input
                    required
                    type="number"
                    name="yearBuilt"
                    value={property.yearBuilt}
                    onChange={handlePropertyChange}
                    placeholder="1985"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Current Condition</label>
                <select
                  required
                  name="condition"
                  value={property.condition}
                  onChange={handlePropertyChange}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select condition...</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {error && !success && (
                <p className="text-sm text-[#b22222]">{error}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-md bg-[#3d9b3d] px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-[#2d7a2d] transition-colors"
              >
                Estimate My Property Value
              </button>

              <p className="text-center text-xs text-gray-500">
                🔒 Privacy and Security Guaranteed — Your information is
                encrypted and never shared.
              </p>
            </form>
          </div>
        </div>

        {estimate && (
          <div
            id="estimate-result"
            className="mt-8 overflow-hidden rounded-xl bg-gradient-to-br from-[#2d7a2d] to-[#1f561f] p-8 text-white shadow-lg"
          >
            <h2 className="text-lg font-semibold uppercase tracking-wide text-green-100">
              Estimated Value Range
            </h2>
            <p className="mt-2 text-3xl font-bold sm:text-4xl">
              {formatDollars(estimate.lowEstimate)} —{" "}
              {formatDollars(estimate.highEstimate)}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-green-100">
                  Max Loan Amount PCG Could Offer
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {formatDollars(estimate.maxLoanAmount)}
                </p>
                <p className="mt-1 text-xs text-green-100">
                  Based on 70% LTV
                </p>
              </div>

              {availableEquity !== null && (
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-100">
                    Available Equity
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {formatDollars(availableEquity)}
                  </p>
                  <p className="mt-1 text-xs text-green-100">
                    Estimated value minus current loan
                  </p>
                </div>
              )}
            </div>

            <p className="mt-6 text-xs text-green-100">
              This is an estimate based on property details. Garik will order a
              full appraisal after application.
            </p>
          </div>
        )}

        {estimate && !success && (
          <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="bg-[#3d9b3d] px-6 py-5 sm:px-10">
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Get My Official Property Analysis From Garik
              </h2>
              <p className="mt-1 text-sm text-green-50">
                Garik will personally review your property and reach out within
                24 hours.
              </p>
            </div>

            <div className="px-6 py-8 sm:px-10">
              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={lead.fullName}
                    onChange={handleLeadChange}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={lead.phone}
                      onChange={handleLeadChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={lead.email}
                      onChange={handleLeadChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Do you have an existing loan on this property?
                  </label>
                  <div className="mt-2 flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="hasLoan"
                        value="Yes"
                        checked={lead.hasLoan === "Yes"}
                        onChange={handleLeadChange}
                        className="h-4 w-4 text-[#3d9b3d] focus:ring-[#3d9b3d]"
                        required
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="hasLoan"
                        value="No"
                        checked={lead.hasLoan === "No"}
                        onChange={handleLeadChange}
                        className="h-4 w-4 text-[#3d9b3d] focus:ring-[#3d9b3d]"
                      />
                      No
                    </label>
                  </div>
                </div>

                {lead.hasLoan === "Yes" && (
                  <div>
                    <label className={labelClass}>Current Loan Balance</label>
                    <input
                      required
                      type="number"
                      name="loanBalance"
                      value={lead.loanBalance}
                      onChange={handleLeadChange}
                      placeholder="250000"
                      className={inputClass}
                    />
                  </div>
                )}

                {error && (
                  <p className="text-sm text-[#b22222]">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-md bg-[#3d9b3d] px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-[#2d7a2d] transition-colors disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Get My Official Analysis"}
                </button>

                <p className="text-center text-xs text-gray-500">
                  🔒 Privacy and Security Guaranteed — Your information is
                  encrypted and never shared.
                </p>
              </form>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="px-6 py-10 text-center sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-7 w-7 text-[#2d7a2d]"
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
              <h2 className="mt-4 text-2xl font-bold text-[#2d7a2d]">
                Thank you{submittedFirstName ? `, ${submittedFirstName}` : ""}!
              </h2>
              <p className="mt-3 text-base text-gray-700">
                Garik will review your property estimate and reach out within
                24 hours. In the meantime you can reach him directly at{" "}
                <a
                  href="tel:8183848544"
                  className="font-semibold text-[#3d9b3d] hover:text-[#2d7a2d]"
                >
                  (818) 384-8544
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
