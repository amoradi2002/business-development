import FadeIn from "./FadeIn";

const industries = [
  "Hard Money Lenders",
  "Mortgage Brokers",
  "Personal Injury Attorneys",
  "Law Firms",
  "Med Spas",
  "Dental Offices",
  "General Contractors",
  "Outdoor Construction",
  "Auto Dealerships",
  "Real Estate Agencies",
  "Property Management",
  "Insurance Agencies",
  "Accounting Firms",
  "Chiropractors",
  "Physical Therapy",
  "Gyms & Fitness",
  "Restaurants",
  "Catering Companies",
  "Event Planners",
  "Wedding Planners",
  "Pet Services",
  "Veterinary Clinics",
  "Tutoring Centers",
  "Driving Schools",
  "Hair Salons",
  "Barbershops",
  "Cleaning Services",
  "Roofing Companies",
  "Solar Companies",
  "And 170 more",
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="section"
      style={{ backgroundColor: "#f7f8fa" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-14 max-w-3xl mx-auto">
          <div
            className="text-xs uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "#3b6fe8" }}
          >
            Industries We Serve
          </div>
          <h2
            className="font-bold mb-5"
            style={{
              color: "#0f1a2e",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
            }}
          >
            We Build for Every Industry
          </h2>
          <p className="text-[#64748b] text-lg">
            Hundreds of business types across the country — if you have customers, we can build for you.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {industries.map((industry) => (
              <span key={industry} className="industry-pill">
                {industry}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
