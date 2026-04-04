"use client";

import { useState, FormEvent } from "react";
import {
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  User,
  FileText,
  Send,
  Clock,
  Building2,
  Printer,
  Shield,
} from "lucide-react";

const loanTypeOptions = [
  "Purchase",
  "Refinance",
  "Cash-Out Refinance",
  "Bridge Loan",
  "Construction Loan",
  "Rehab / Fix & Flip",
  "Commercial Loan",
  "Second Mortgage",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    propertyAddress: "",
    loanType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const existing = JSON.parse(
      localStorage.getItem("pcg_contact_leads") || "[]"
    );
    existing.push({ ...form, submittedAt: new Date().toISOString() });
    localStorage.setItem("pcg_contact_leads", JSON.stringify(existing));
    setSubmitted(true);
    setForm({
      name: "",
      phone: "",
      email: "",
      propertyAddress: "",
      loanType: "",
      message: "",
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
            CONTACT US
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            Get in touch with our team to discuss your financing needs
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left: Form (3 cols) */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
                <h2 className="font-playfair text-2xl font-bold text-pcg-dark md:text-3xl">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-gray-600">
                  Fill out the form below and a member of our team will get back
                  to you promptly.
                </p>

                {submitted && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-800">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                      Thank you! Your message has been submitted successfully.
                      We will be in touch shortly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Full name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                      />
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
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                        />
                      </div>
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
                        placeholder="123 Main St, City, CA 91502"
                        value={form.propertyAddress}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Loan Type
                    </label>
                    <select
                      name="loanType"
                      required
                      value={form.loanType}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                    >
                      <option value="">Select a loan type</option>
                      {loanTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us about your financing needs..."
                        value={form.message}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm transition-colors focus:border-pcg-green focus:outline-none focus:ring-2 focus:ring-pcg-green/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-pcg-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-pcg-dark-green hover:shadow-xl"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Contact Info (2 cols) */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Contact Person */}
                <div className="rounded-2xl bg-pcg-light p-6">
                  <h3 className="font-playfair text-xl font-bold text-pcg-dark">
                    Garik Hadjinian
                  </h3>
                  <p className="mt-1 text-sm font-medium text-pcg-green">
                    President / Principal Broker
                  </p>
                </div>

                {/* Phone Numbers */}
                <div className="rounded-2xl bg-pcg-light p-6">
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Phone
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-pcg-green" />
                      <div>
                        <p className="text-xs text-gray-500">Office</p>
                        <a
                          href="tel:8556659774"
                          className="font-medium text-pcg-dark hover:text-pcg-green"
                        >
                          (855) 665-9774
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-pcg-green" />
                      <div>
                        <p className="text-xs text-gray-500">Direct</p>
                        <a
                          href="tel:8184684300"
                          className="font-medium text-pcg-dark hover:text-pcg-green"
                        >
                          (818) 468-4300
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Printer className="h-5 w-5 text-pcg-green" />
                      <div>
                        <p className="text-xs text-gray-500">Fax</p>
                        <p className="font-medium text-pcg-dark">
                          (818) 468-4301
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl bg-pcg-light p-6">
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Email
                  </h4>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-pcg-green" />
                    <a
                      href="mailto:info@primecapitalgrp.com"
                      className="font-medium text-pcg-dark hover:text-pcg-green"
                    >
                      info@primecapitalgrp.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="rounded-2xl bg-pcg-light p-6">
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Office Address
                  </h4>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-pcg-green" />
                    <div>
                      <p className="font-medium text-pcg-dark">
                        Prime Capital Group, Inc.
                      </p>
                      <p className="text-gray-600">150 N. Santa Anita Ave.</p>
                      <p className="text-gray-600">Suite 300</p>
                      <p className="text-gray-600">Arcadia, CA 91006</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="rounded-2xl bg-pcg-light p-6">
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Business Hours
                  </h4>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-pcg-green" />
                    <div>
                      <p className="font-medium text-pcg-dark">
                        Monday &ndash; Friday
                      </p>
                      <p className="text-gray-600">9:00 AM &ndash; 5:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* License */}
                <div className="rounded-2xl bg-pcg-light p-6">
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    License
                  </h4>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-pcg-green" />
                    <div>
                      <p className="text-sm text-gray-500">
                        California DRE Broker License
                      </p>
                      <p className="font-medium text-pcg-dark">#01932702</p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="overflow-hidden rounded-2xl bg-pcg-dark-green p-8 text-center">
                  <MapPin className="mx-auto h-10 w-10 text-white/60" />
                  <p className="mt-4 font-playfair text-lg font-bold text-white">
                    Prime Capital Group, Inc.
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    150 N. Santa Anita Ave., Suite 300
                  </p>
                  <p className="text-sm text-white/80">Arcadia, CA 91006</p>
                  <a
                    href="https://maps.google.com/?q=150+N+Santa+Anita+Ave+Suite+300+Arcadia+CA+91006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
