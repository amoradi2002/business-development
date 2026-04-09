export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        backgroundColor: "#0a1220",
        borderTop: "1px solid rgba(59, 111, 232, 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #3b6fe8 0%, #5a8af0 100%)",
                  boxShadow: "0 8px 24px -8px rgba(59, 111, 232, 0.6)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 20L12 4L20 20"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 14H17"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="11" r="1.5" fill="white" />
                </svg>
              </div>
              <div>
                <div
                  className="text-white font-bold text-lg leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  ANM
                </div>
                <div className="text-[10px] text-blue-200 uppercase tracking-widest leading-none mt-0.5">
                  Software Solutions
                </div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              We build AI platforms for local businesses — delivered in days, owned forever.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div
              className="text-xs uppercase tracking-[0.15em] font-semibold mb-4"
              style={{ color: "#5a8af0" }}
            >
              Quick Links
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Case Study
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Industries
                </a>
              </li>
              <li>
                <a
                  href="#why"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Why ANM
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-xs uppercase tracking-[0.15em] font-semibold mb-4"
              style={{ color: "#5a8af0" }}
            >
              Contact
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:anmdevlopmentservices@yahoo.com"
                  className="text-white/70 hover:text-white transition-colors break-all"
                >
                  anmdevlopmentservices@yahoo.com
                </a>
              </li>
              <li>
                <a
                  href="tel:8189309738"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  (818) 930-9738
                </a>
              </li>
              <li className="text-white/70">
                Glendale, CA
                <br />
                <span className="text-white/50 text-xs">
                  Serving Businesses Nationwide
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div
          className="mt-12 pt-6 border-t"
          style={{ borderColor: "rgba(59, 111, 232, 0.2)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div>
              © 2026 ANM Software Solutions. All Rights Reserved.
            </div>
            <div>We Build AI Platforms for Local Businesses</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
