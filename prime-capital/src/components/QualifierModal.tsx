"use client";

import { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  Home,
  RefreshCw,
  DollarSign,
  Hammer,
  Building,
  Building2,
  Mountain,
  Zap,
  Calendar,
  Clock,
  Eye,
  CheckCircle,
  Phone,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";

interface QualifierModalProps {
  open: boolean;
  onClose: () => void;
}

interface CardOption {
  label: string;
  icon?: LucideIcon;
}

interface StepConfig {
  title: string;
  options: CardOption[];
}

const steps: StepConfig[] = [
  {
    title: "What are you looking to do?",
    options: [
      { label: "Purchase a Property", icon: Home },
      { label: "Refinance Existing Loan", icon: RefreshCw },
      { label: "Cash Out Equity", icon: DollarSign },
      { label: "Fix and Flip", icon: Hammer },
    ],
  },
  {
    title: "What type of property?",
    options: [
      { label: "Single Family Home", icon: Home },
      { label: "Multi-Family", icon: Building },
      { label: "Commercial Property", icon: Building2 },
      { label: "Land or Lot", icon: Mountain },
    ],
  },
  {
    title: "What is the estimated property value?",
    options: [
      { label: "Under $500,000" },
      { label: "$500,000 to $1,000,000" },
      { label: "$1,000,000 to $2,000,000" },
      { label: "Over $2,000,000" },
    ],
  },
  {
    title: "How soon are you looking to move forward?",
    options: [
      { label: "Immediately", icon: Zap },
      { label: "Within 30 Days", icon: Calendar },
      { label: "Within 90 Days", icon: Clock },
      { label: "Just Exploring Options", icon: Eye },
    ],
  },
];

interface Answers {
  goal?: string;
  propertyType?: string;
  propertyValue?: string;
  timeline?: string;
}

interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
}

const TOTAL_STEPS = 5;

export default function QualifierModal({ open, onClose }: QualifierModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<ContactInfo>({
    fullName: "",
    phone: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Reset state when opening
      setStep(1);
      setAnswers({});
      setContact({ fullName: "", phone: "", email: "" });
      setSubmitting(false);
      setSubmitted(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open && !mounted) return null;
  if (!open) return null;

  const answerKeys: (keyof Answers)[] = [
    "goal",
    "propertyType",
    "propertyValue",
    "timeline",
  ];

  const handleCardClick = (value: string) => {
    const key = answerKeys[step - 1];
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      ...answers,
      ...contact,
      source: "Qualifier",
      sourcePage: "Qualifier Funnel",
      createdAt: new Date().toISOString(),
    };

    try {
      // Save to localStorage
      if (typeof window !== "undefined") {
        const existingRaw = localStorage.getItem("pcg_leads");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = Array.isArray(existing)
          ? [...existing, payload]
          : [payload];
        localStorage.setItem("pcg_leads", JSON.stringify(updated));
      }
    } catch (err) {
      console.error("Failed to save lead to localStorage", err);
    }

    try {
      await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to notify lead", err);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const progressPct = (step / TOTAL_STEPS) * 100;
  const currentStepConfig = step <= 4 ? steps[step - 1] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-[fadeIn_200ms_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted && (
          <>
            {/* Progress bar */}
            <div className="px-6 pt-6 sm:px-8 sm:pt-8">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3d9b3d]">
                  Step {step} of {TOTAL_STEPS}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {Math.round(progressPct)}% complete
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#3d9b3d] transition-all duration-300 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div
              key={step}
              className="px-6 pb-8 pt-6 sm:px-8 animate-[slideUp_250ms_ease-out]"
            >
              {/* Back button */}
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-[#2d7a2d]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              )}

              {/* Steps 1-4 */}
              {currentStepConfig && (
                <>
                  <h2 className="pr-8 font-playfair text-2xl font-bold text-[#2d7a2d] sm:text-3xl">
                    {currentStepConfig.title}
                  </h2>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                    {currentStepConfig.options.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleCardClick(option.label)}
                          className="group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:border-[#3d9b3d] hover:shadow-lg"
                        >
                          {Icon && (
                            <Icon className="h-12 w-12 text-[#3d9b3d] transition-transform group-hover:scale-110" />
                          )}
                          <span className="text-base font-semibold text-gray-900 sm:text-lg">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Step 5 - Contact form */}
              {step === 5 && (
                <>
                  <h2 className="pr-8 font-playfair text-2xl font-bold text-[#2d7a2d] sm:text-3xl">
                    Last step &mdash; how can Garik reach you?
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Enter your details and we&apos;ll call you within 24 hours.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label
                        htmlFor="qf-fullName"
                        className="mb-1.5 block text-sm font-semibold text-gray-700"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          id="qf-fullName"
                          type="text"
                          required
                          value={contact.fullName}
                          onChange={(e) =>
                            setContact((p) => ({
                              ...p,
                              fullName: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border-2 border-gray-200 bg-white py-3 pl-10 pr-3 text-base text-gray-900 outline-none transition-colors focus:border-[#3d9b3d]"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="qf-phone"
                        className="mb-1.5 block text-sm font-semibold text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          id="qf-phone"
                          type="tel"
                          required
                          value={contact.phone}
                          onChange={(e) =>
                            setContact((p) => ({
                              ...p,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border-2 border-gray-200 bg-white py-3 pl-10 pr-3 text-base text-gray-900 outline-none transition-colors focus:border-[#3d9b3d]"
                          placeholder="(818) 555-0123"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="qf-email"
                        className="mb-1.5 block text-sm font-semibold text-gray-700"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          id="qf-email"
                          type="email"
                          required
                          value={contact.email}
                          onChange={(e) =>
                            setContact((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border-2 border-gray-200 bg-white py-3 pl-10 pr-3 text-base text-gray-900 outline-none transition-colors focus:border-[#3d9b3d]"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 w-full rounded-lg bg-[#d4af37] px-6 py-4 text-base font-bold text-gray-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#c29e2d] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? "Submitting..." : "Get My Free Consultation"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </>
        )}

        {/* Success state */}
        {submitted && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-8 animate-[slideUp_250ms_ease-out]">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#3d9b3d]/10">
              <CheckCircle className="h-12 w-12 text-[#3d9b3d]" />
            </div>
            <h2 className="font-playfair text-3xl font-bold text-[#2d7a2d]">
              Thank you!
            </h2>
            <p className="mt-3 max-w-md text-base text-gray-600">
              Garik will call you within 24 hours to discuss your financing
              options.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-lg bg-[#3d9b3d] px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#2d7a2d]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
