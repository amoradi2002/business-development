import FadeIn from "./FadeIn";

const features = [
  {
    title: "Built Overnight",
    desc: "Most agencies take 3-6 months. We deliver your complete AI platform in days using the most advanced AI development tools available.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Custom for Your Business",
    desc: "No templates. No generic layouts. Every platform is built specifically for your business, your industry, and your customers.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "You Own Everything",
    desc: "Full source code. Your domain. Your data. We build it, you own it. No vendor lock-in ever.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M6 7V5a4 4 0 0 1 8 0v2" />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function WhyAnm() {
  return (
    <section
      id="why"
      className="section relative overflow-hidden"
      style={{ backgroundColor: "#0f1a2e" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245, 166, 35, 0.2), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
          <div
            className="text-xs uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "#f5a623" }}
          >
            Why ANM
          </div>
          <h2
            className="text-white font-bold mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Why Local Businesses Choose ANM
          </h2>
          <p className="text-white/65 text-lg">
            Fast delivery. Custom builds. You own it all. That is the ANM difference.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 120} className="h-full">
              <div
                className="h-full p-8 md:p-10 rounded-2xl transition-all duration-300 hover:-translate-y-2"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(22, 34, 54, 0.9) 0%, rgba(15, 26, 46, 0.9) 100%)",
                  border: "1px solid rgba(245, 166, 35, 0.2)",
                  borderTop: "3px solid #f5a623",
                  boxShadow: "0 20px 50px -20px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(245, 166, 35, 0.15), rgba(245, 166, 35, 0.05))",
                    border: "1px solid rgba(245, 166, 35, 0.3)",
                    color: "#f5a623",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  className="text-white text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {f.title}
                </h3>
                <p className="text-white/70 leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
