import FadeIn from "./FadeIn";

const steps = [
  {
    n: "01",
    title: "Free Consultation",
    desc: "We learn your business and identify exactly what you need.",
  },
  {
    n: "02",
    title: "Custom Build",
    desc: "We build your platform overnight using AI-powered development.",
  },
  {
    n: "03",
    title: "Review and Refine",
    desc: "You review the live demo and we make any changes you want.",
  },
  {
    n: "04",
    title: "Go Live",
    desc: "Your platform launches on your domain. You start getting leads.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="section"
      style={{ backgroundColor: "#f7f8fa" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-20 max-w-3xl mx-auto">
          <div
            className="text-xs uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "#3b6fe8" }}
          >
            How It Works
          </div>
          <h2
            className="font-bold mb-5"
            style={{
              color: "#0f1a2e",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
            }}
          >
            From Call to Live Platform in Days
          </h2>
          <p className="text-[#64748b] text-lg">
            A simple, proven process that gets you a working product in a fraction of the time.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 120} className="relative">
              <div className="relative flex flex-col items-center text-center">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="step-connector" aria-hidden="true" />
                )}

                {/* Numbered circle */}
                <div
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg mb-5"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b6fe8 0%, #5a8af0 100%)",
                    boxShadow: "0 12px 30px -10px rgba(59, 111, 232, 0.5)",
                    fontFamily: "var(--font-syne)",
                  }}
                >
                  {step.n}
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    color: "#0f1a2e",
                    fontFamily: "var(--font-syne)",
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-[#64748b] text-[15px] leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
