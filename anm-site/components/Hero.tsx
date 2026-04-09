import CountUp from "./CountUp";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0f1a2e" }}
    >
      {/* Animated gradient mesh */}
      <div className="gradient-mesh-bg" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-40 text-center">
        {/* Eyebrow badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
          style={{
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#f5a623", boxShadow: "0 0 12px #f5a623" }}
          />
          <span className="text-white/90 text-xs font-medium tracking-wide uppercase">
            Now Booking New Clients
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-white font-bold mb-6"
          style={{
            fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
            lineHeight: "0.98",
          }}
        >
          We Build{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #3b6fe8 0%, #5a8af0 50%, #f5a623 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI Platforms
          </span>
          <br />
          That Grow Your Business
        </h1>

        {/* Subheadline */}
        <p
          className="text-white/75 max-w-2xl mx-auto mb-10"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}
        >
          Custom AI software for local businesses across every industry. Lead
          capture, automation, client portals, and AI chat — all built and
          delivered in days.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#work" className="btn btn-primary">
            See Our Work
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline">
            Book a Free Call
          </a>
        </div>

        {/* Floating stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="stat-card">
            <div
              className="text-4xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <CountUp end={200} suffix="+" />
            </div>
            <div className="text-white/60 text-sm">Business Types Served</div>
          </div>
          <div className="stat-card">
            <div
              className="text-4xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <CountUp end={14} />
            </div>
            <div className="text-white/60 text-sm">Services Available</div>
          </div>
          <div className="stat-card">
            <div
              className="text-4xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <span style={{ color: "#f5a623" }}>Days</span>
            </div>
            <div className="text-white/60 text-sm">Not Months to Live</div>
          </div>
        </div>
      </div>

      {/* Diagonal cut */}
      <div className="hero-diagonal-cut" aria-hidden="true" />
    </section>
  );
}
