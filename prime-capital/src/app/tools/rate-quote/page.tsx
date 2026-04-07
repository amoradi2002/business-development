"use client";

import { useState, FormEvent, ChangeEvent } from "react";

const LOAN_TYPES = [
  "Hard Money Bridge",
  "HELOC",
  "Cash-Out Refinance",
  "Purchase",
  "Rehab",
  "Construction",
  "Second Mortgage",
  "Other",
];

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  loanType: string;
  propertyValue: string;
  loanAmount: string;
  zipCode: string;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  loanType: "",
  propertyValue: "",
  loanAmount: "",
  zipCode: "",
};

function formatDollars(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString();
}

function stripDollars(value: string) {
  return value.replace(/[^0-9]/g, "");
}

export default function RateQuotePage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "propertyValue" || name === "loanAmount") {
      setForm((prev) => ({ ...prev, [name]: stripDollars(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      ...form,
      name: `${form.firstName} ${form.lastName}`.trim(),
      desiredAmount: form.loanAmount,
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
      setForm(INITIAL);
    } catch (err) {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

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

      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="bg-[#3d9b3d] px-6 py-8 text-center sm:px-10">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Get Your Free Rate Quote
            </h1>
            <p className="mt-2 text-sm text-green-50 sm:text-base">
              See what you qualify for in under a minute
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10">
            {success ? (
              <div className="rounded-lg bg-green-50 border border-green-200 p-6 text-center">
                <p className="text-lg font-semibold text-[#2d7a2d]">
                  Thank you! Garik will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
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
                      value={form.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loan Type
                  </label>
                  <select
                    required
                    name="loanType"
                    value={form.loanType}
                    onChange={handleChange}
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
                    Property Value
                  </label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    name="propertyValue"
                    value={form.propertyValue ? formatDollars(form.propertyValue) : ""}
                    onChange={handleChange}
                    placeholder="$0"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loan Amount
                  </label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    name="loanAmount"
                    value={form.loanAmount ? formatDollars(form.loanAmount) : ""}
                    onChange={handleChange}
                    placeholder="$0"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    name="zipCode"
                    value={form.zipCode}
                    onChange={handleChange}
                    maxLength={10}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[#3d9b3d] focus:outline-none focus:ring-1 focus:ring-[#3d9b3d]"
                  />
                </div>

                {error && (
                  <p className="text-sm text-[#b22222]">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-md bg-[#3d9b3d] px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-[#2d7a2d] transition-colors disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Get My Free Rate Quote"}
                </button>

                <p className="text-center text-xs text-gray-500">
                  🔒 Privacy and Security Guaranteed - Your information is encrypted and never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
