"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Loader2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const SERVICES = [
  "Patio & Deck Construction",
  "Outdoor Kitchen & BBQ Islands",
  "Pergolas & Shade Structures",
  "Retaining Walls",
  "Fencing & Gates",
  "Concrete & Flatwork",
  "Other",
];

const TIMELINES = [
  "ASAP",
  "Within 1 Month",
  "Within 3 Months",
  "Just Getting Quotes",
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  city: string;
  zip: string;
  description: string;
  timeline: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  address: "",
  city: "",
  zip: "",
  description: "",
  timeline: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Save to localStorage as backup
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("vic_leads") || "[]");
        existing.push({ ...form, submittedAt: new Date().toISOString() });
        localStorage.setItem("vic_leads", JSON.stringify(existing));
      }

      // Send to API which handles SMS gateway + emails
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);
      setForm(INITIAL);
    } catch {
      setError("Something went wrong. Please call us directly at (818) 200-6274.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Hero */}
      <section
        className="relative bg-[#1a2744] py-24 lg:py-32 overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(232,112,46,0.05) 40px, rgba(232,112,46,0.05) 80px)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0f1a2e]/60" />
        <div className="relative mx-auto max-w-6xl px-4 lg:px-8 text-center">
          <h1
            className="text-white text-6xl md:text-8xl font-bold leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
          >
            GET A FREE QUOTE
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 lg:py-24 px-4 lg:px-8">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <AnimatedSection className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-10 border-l-4 border-[#e8702e]">
              <h2
                className="text-3xl md:text-4xl text-[#1a2744] mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
              >
                REQUEST YOUR FREE QUOTE
              </h2>
              <p className="text-gray-600 mb-8">All fields with * are required</p>

              {success ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
                  <CheckCircle2 className="w-16 h-16 text-[#3d9b3d] mx-auto mb-4" />
                  <h3
                    className="text-2xl text-[#1a2744] mb-3"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
                  >
                    THANK YOU!
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We&apos;ve received your request. A member of our team will contact you within 24 hours to schedule your free estimate.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Need to reach us sooner? Call us directly at{" "}
                    <a href="tel:8182006274" className="text-[#e8702e] font-bold">
                      (818) 200-6274
                    </a>
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-3 bg-[#1a2744] text-white rounded font-semibold hover:bg-[#0f1a2e] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#1a2744] mb-1">Full Name *</label>
                      <input
                        required name="name" value={form.name} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded text-[#1a2744] focus:outline-none focus:border-[#e8702e] focus:ring-2 focus:ring-[#e8702e]/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1a2744] mb-1">Phone *</label>
                      <input
                        required type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="(818) 555-1234"
                        className="w-full px-4 py-3 border border-gray-300 rounded text-[#1a2744] focus:outline-none focus:border-[#e8702e] focus:ring-2 focus:ring-[#e8702e]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1a2744] mb-1">Email *</label>
                    <input
                      required type="email" name="email" value={form.email} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded text-[#1a2744] focus:outline-none focus:border-[#e8702e] focus:ring-2 focus:ring-[#e8702e]/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1a2744] mb-1">Service Needed *</label>
                    <select
                      required name="service" value={form.service} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded text-[#1a2744] bg-white focus:outline-none focus:border-[#e8702e] focus:ring-2 focus:ring-[#e8702e]/20 transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1a2744] mb-1">Property Address *</label>
                    <input
                      required name="address" value={form.address} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded text-[#1a2744] focus:outline-none focus:border-[#e8702e] focus:ring-2 focus:ring-[#e8702e]/20 transition-colors"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#1a2744] mb-1">City *</label>
                      <input
                        required name="city" value={form.city} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded text-[#1a2744] focus:outline-none focus:border-[#e8702e] focus:ring-2 focus:ring-[#e8702e]/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1a2744] mb-1">Zip Code *</label>
                      <input
                        required name="zip" value={form.zip} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded text-[#1a2744] focus:outline-none focus:border-[#e8702e] focus:ring-2 focus:ring-[#e8702e]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1a2744] mb-1">Project Description *</label>
                    <textarea
                      required name="description" value={form.description} onChange={handleChange} rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 border border-gray-300 rounded text-[#1a2744] focus:outline-none focus:border-[#e8702e] focus:ring-2 focus:ring-[#e8702e]/20 transition-colors resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1a2744] mb-1">Timeline *</label>
                    <select
                      required name="timeline" value={form.timeline} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded text-[#1a2744] bg-white focus:outline-none focus:border-[#e8702e] focus:ring-2 focus:ring-[#e8702e]/20 transition-colors"
                    >
                      <option value="">Select timeline...</option>
                      {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {error && <p className="text-[#e8702e] text-sm font-semibold">{error}</p>}

                  <button
                    type="submit" disabled={submitting}
                    className="w-full px-6 py-4 bg-[#e8702e] text-white text-lg font-bold rounded hover:bg-[#d05f1f] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : "REQUEST MY FREE QUOTE"}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    🔒 Your information is secure and will never be shared.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Contact Info Sidebar */}
          <AnimatedSection className="space-y-6">
            <div className="bg-[#1a2744] rounded-lg p-6 text-white">
              <h3
                className="text-2xl mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
              >
                CALL US
              </h3>
              <a href="tel:8182006274" className="flex items-center gap-3 text-[#e8702e] hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span className="text-2xl font-bold">(818) 200-6274</span>
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border-l-4 border-[#e8702e]">
              <Mail className="w-6 h-6 text-[#e8702e] mb-2" />
              <h4 className="font-bold text-[#1a2744] mb-1">Email</h4>
              <p className="text-gray-600 text-sm">info@vicconstruction.com</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border-l-4 border-[#e8702e]">
              <MapPin className="w-6 h-6 text-[#e8702e] mb-2" />
              <h4 className="font-bold text-[#1a2744] mb-1">Service Area</h4>
              <p className="text-gray-600 text-sm">Los Angeles &amp; surrounding areas</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border-l-4 border-[#e8702e]">
              <Clock className="w-6 h-6 text-[#e8702e] mb-2" />
              <h4 className="font-bold text-[#1a2744] mb-1">Hours</h4>
              <p className="text-gray-600 text-sm">Mon - Sat: 7:00 AM - 7:00 PM</p>
              <p className="text-gray-600 text-sm">Sun: By Appointment</p>
            </div>

            <div className="bg-[#e8702e] rounded-lg p-6 text-white text-center">
              <p
                className="text-2xl mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
              >
                LICENSED &amp; INSURED
              </p>
              <p className="text-sm opacity-90">100% protected on every project</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
