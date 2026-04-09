"use client";

import { useState, FormEvent } from "react";
import FadeIn from "./FadeIn";

const businessTypes = [
  "Hard Money Lender",
  "Mortgage Broker",
  "Personal Injury Attorney",
  "Law Firm",
  "Med Spa",
  "Dental Office",
  "General Contractor",
  "Outdoor Construction",
  "Auto Dealership",
  "Real Estate Agency",
  "Property Management",
  "Insurance Agency",
  "Accounting Firm",
  "Chiropractor",
  "Physical Therapy",
  "Gym / Fitness",
  "Restaurant",
  "Event Planner",
  "Pet Services",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      id="contact"
      className="section"
      style={{ backgroundColor: "#f7f8fa" }}
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
          <div
            className="text-xs uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "#3b6fe8" }}
          >
            Let's Talk
          </div>
          <h2
            className="font-bold mb-5"
            style={{
              color: "#0f1a2e",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
            }}
          >
            Let's Build Something Together
          </h2>
          <p className="text-[#64748b] text-lg">
            Book a free 20 minute consultation. We will look at your business and show you exactly what we can build for you.
          </p>
        </FadeIn>

        <FadeIn>
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(15, 26, 46, 0.08)",
              boxShadow: "0 30px 80px -30px rgba(15, 26, 46, 0.2)",
            }}
          >
            {status === "success" ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b6fe8 0%, #5a8af0 100%)",
                  }}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#0f1a2e", fontFamily: "var(--font-syne)" }}
                >
                  Thank You!
                </h3>
                <p className="text-[#64748b] max-w-md mx-auto">
                  Aaron will reach out within 24 hours to schedule your consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="input"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="business">Business Name</label>
                    <input
                      id="business"
                      name="business"
                      type="text"
                      required
                      className="input"
                      placeholder="Acme Co."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="input"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="input"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="businessType">Business Type</label>
                  <select
                    id="businessType"
                    name="businessType"
                    required
                    className="select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your industry
                    </option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message">
                    Brief description of what you need
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="textarea"
                    placeholder="Tell us about your business and what you're looking to build..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary flex-1 sm:flex-initial"
                  >
                    {status === "sending"
                      ? "Sending..."
                      : "Book My Free Consultation"}
                  </button>
                  <p className="text-xs text-[#64748b]">
                    We will reach out within 24 hours. No spam ever.
                  </p>
                </div>

                {status === "error" && (
                  <div
                    className="text-sm p-3 rounded-lg"
                    style={{
                      background: "rgba(239, 68, 68, 0.08)",
                      color: "#dc2626",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                    }}
                  >
                    {errorMsg}
                  </div>
                )}
              </form>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
            <div>
              <div
                className="text-xs uppercase tracking-[0.15em] font-semibold mb-2"
                style={{ color: "#3b6fe8" }}
              >
                Email
              </div>
              <a
                href="mailto:anmdevlopmentservices@yahoo.com"
                className="text-[#0f1a2e] font-medium hover:underline break-all"
              >
                anmdevlopmentservices@yahoo.com
              </a>
            </div>
            <div>
              <div
                className="text-xs uppercase tracking-[0.15em] font-semibold mb-2"
                style={{ color: "#3b6fe8" }}
              >
                Phone
              </div>
              <a
                href="tel:8189309738"
                className="text-[#0f1a2e] font-medium hover:underline"
              >
                (818) 930-9738
              </a>
            </div>
            <div>
              <div
                className="text-xs uppercase tracking-[0.15em] font-semibold mb-2"
                style={{ color: "#3b6fe8" }}
              >
                Location
              </div>
              <div className="text-[#0f1a2e] font-medium">
                Glendale, CA — Serving Nationwide
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
