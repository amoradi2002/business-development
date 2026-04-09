import FadeIn from "./FadeIn";

const services = [
  {
    title: "AI Website",
    desc: "Premium cinematic websites with AI chat that answers customer questions 24/7 and captures leads automatically.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="2" y1="8" x2="22" y2="8" />
        <circle cx="6" cy="5.5" r="0.6" fill="currentColor" />
        <path d="M8 13l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Lead Automation",
    desc: "Instant text and email notifications the moment a customer fills out a form. Never miss a lead again.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "AI Voice Caller",
    desc: "AI calls back every new lead within 60 seconds. Qualifies them and books appointments automatically.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Client Portals",
    desc: "Give your clients, investors, or partners their own private login to see their status in real time.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Admin Dashboard",
    desc: "Full CRM with lead pipeline, AI scoring, document vault, and morning and evening email reports.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
  {
    title: "AI Document Vault",
    desc: "Clients upload documents by camera or drag and drop. AI classifies and organizes everything automatically.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section relative"
      style={{ backgroundColor: "#0f1a2e" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
          <div className="text-blue-anm text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: "#5a8af0" }}>
            What We Build
          </div>
          <h2
            className="text-white font-bold mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Everything Your Business Needs to Grow
          </h2>
          <p className="text-white/65 text-lg">
            From premium websites to AI automation — we build the systems that turn visitors into customers.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 80} className="h-full">
              <div className="service-card h-full">
                <div className="icon">{s.icon}</div>
                <h3
                  className="text-white text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {s.title}
                </h3>
                <p className="text-white/65 text-[15px] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
