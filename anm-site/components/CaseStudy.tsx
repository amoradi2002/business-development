import FadeIn from "./FadeIn";

export default function CaseStudy() {
  return (
    <section
      id="work"
      className="section relative overflow-hidden"
      style={{ backgroundColor: "#0f1a2e" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59, 111, 232, 0.15), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
          <div
            className="text-xs uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "#5a8af0" }}
          >
            Featured Work
          </div>
          <h2
            className="text-white font-bold mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Real Platforms We Have Built
          </h2>
          <p className="text-white/65 text-lg">
            Every build is custom. Every client owns their platform. Here is a recent project.
          </p>
        </FadeIn>

        <FadeIn>
          <div
            className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(22, 34, 54, 0.95) 0%, rgba(15, 26, 46, 0.95) 100%)",
              border: "1px solid rgba(59, 111, 232, 0.3)",
              boxShadow:
                "0 30px 80px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 111, 232, 0.15)",
            }}
          >
            {/* Accent corner */}
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(59, 111, 232, 0.25), transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative grid md:grid-cols-[1fr,auto] gap-10 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{
                      background: "rgba(245, 166, 35, 0.15)",
                      color: "#f5a623",
                      border: "1px solid rgba(245, 166, 35, 0.3)",
                    }}
                  >
                    Case Study
                  </div>
                  <div className="text-white/50 text-sm">
                    Private & Hard Money Lending
                  </div>
                </div>

                <h3
                  className="text-white font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)",
                  }}
                >
                  Prime Capital Group, Inc.
                </h3>

                <div className="text-white/60 mb-6 text-sm">
                  Burbank, California — Southern California's premier private & hard money lender
                </div>

                <p className="text-white/80 text-[15px] leading-relaxed mb-6 max-w-2xl">
                  <strong className="text-white">What we built:</strong> A full AI lending platform
                  featuring a cinematic public website, interactive loan calculator, AI chat
                  powered by Perplexity, investor portal, broker portal, admin dashboard, document
                  vault, and automated email notifications for every new lead.
                </p>

                <p className="text-white/80 text-[15px] leading-relaxed mb-8 max-w-2xl">
                  <strong className="text-white">Result:</strong> Complete digital transformation
                  from an outdated WordPress site to a full AI-powered business operating system
                  — delivered in days, not months.
                </p>

                <a
                  href="https://prime-capital-azure.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Live Site
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </a>
              </div>

              {/* Feature list */}
              <div className="md:min-w-[260px]">
                <div
                  className="text-xs uppercase tracking-[0.18em] font-semibold mb-5"
                  style={{ color: "#5a8af0" }}
                >
                  Included
                </div>
                <ul className="space-y-3">
                  {[
                    "Public website",
                    "Loan calculator",
                    "AI chat widget",
                    "Investor portal",
                    "Broker portal",
                    "Admin dashboard",
                    "Document vault",
                    "Email automation",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-white/85 text-sm"
                    >
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(59, 111, 232, 0.2)" }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#5a8af0"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="text-center mt-10 text-white/50 text-sm">
            More case studies coming soon. We are currently onboarding new clients.
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
