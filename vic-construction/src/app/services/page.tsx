import Link from "next/link";
import {
  Home,
  UtensilsCrossed,
  Sun,
  Layers,
  Shield,
  Square,
  CheckCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "Services | VIC Construction, Inc.",
  description:
    "Premium outdoor construction services across Los Angeles. Patios, decks, outdoor kitchens, pergolas, retaining walls, fencing, and concrete work.",
};

type Service = {
  number: string;
  name: string;
  description: string;
  included: string[];
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
};

const services: Service[] = [
  {
    number: "01",
    name: "Patio & Deck Construction",
    description:
      "Transform your backyard into a stunning outdoor living space. We build custom decks and patios that last for decades.",
    included: [
      "Custom outdoor living designs",
      "Wood and composite decking",
      "Concrete patios",
      "Stamped concrete",
      "Pavers and natural stone",
      "Built-in seating and lighting",
    ],
    icon: Home,
    gradient: "from-[#1a2744] via-[#243555] to-[#0f1a2e]",
  },
  {
    number: "02",
    name: "Outdoor Kitchen & BBQ Islands",
    description:
      "Bring your kitchen outside. We design and build full outdoor kitchens with everything you need for premium entertaining.",
    included: [
      "Full outdoor kitchen builds",
      "Granite and quartz countertops",
      "Built-in grills and smokers",
      "Custom stone work",
      "Refrigeration and storage",
      "Pizza ovens and bars",
    ],
    icon: UtensilsCrossed,
    gradient: "from-[#e8702e] via-[#c75a1f] to-[#8a3d12]",
  },
  {
    number: "03",
    name: "Pergolas & Shade Structures",
    description:
      "Add shade, style, and structure to your outdoor space with custom pergolas built to last.",
    included: [
      "Wood and aluminum pergolas",
      "Lattice covers",
      "Attached and freestanding designs",
      "Custom finishes and stains",
      "Integrated lighting",
      "Fan and electrical wiring",
    ],
    icon: Sun,
    gradient: "from-[#3d2817] via-[#6b4423] to-[#2a1a0d]",
  },
  {
    number: "04",
    name: "Retaining Walls",
    description:
      "Stabilize your hillside and add beautiful structure with engineered retaining walls.",
    included: [
      "Concrete block walls",
      "Natural stone walls",
      "Wood timber walls",
      "Drainage solutions",
      "Hillside stabilization",
      "Engineered for code compliance",
    ],
    icon: Layers,
    gradient: "from-[#4a4a4a] via-[#6b6b6b] to-[#2d2d2d]",
  },
  {
    number: "05",
    name: "Fencing & Gates",
    description:
      "Secure your property with quality fencing and automatic gate systems.",
    included: [
      "Wood and vinyl fencing",
      "Wrought iron fences",
      "Chain link installation",
      "Automatic gate systems",
      "Custom design and finishes",
      "Repair and replacement",
    ],
    icon: Shield,
    gradient: "from-[#1a2744] via-[#2d3e5c] to-[#0f1a2e]",
  },
  {
    number: "06",
    name: "Concrete & Flatwork",
    description:
      "Premium concrete work for driveways, walkways, pool decks, and more.",
    included: [
      "Driveways and approaches",
      "Walkways and pathways",
      "Pool decks",
      "Stamped concrete",
      "Stained and colored concrete",
      "Repair and resurfacing",
    ],
    icon: Square,
    gradient: "from-[#e8702e] via-[#d4641f] to-[#7a3810]",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#f7f7f7]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f1a2e] py-24 md:py-32">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 12px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(232,112,46,0.25) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="mb-4 font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.3em] text-[#e8702e]">
            Built Right. Built to Last.
          </p>
          <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl leading-none text-white md:text-7xl lg:text-8xl">
            Our Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-dm-sans)] text-lg text-white/80 md:text-xl">
            Premium outdoor construction across Los Angeles
          </p>
        </div>
      </section>

      {/* Services sections */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-16 md:space-y-28">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isImageLeft = index % 2 === 0;
              return (
                <AnimatedSection key={service.number}>
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Image/Visual side */}
                    <div
                      className={`${
                        isImageLeft ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div
                        className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${service.gradient} shadow-2xl`}
                      >
                        <div
                          className="absolute inset-0 opacity-[0.12]"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 14px)",
                          }}
                          aria-hidden="true"
                        />
                        <div className="absolute left-6 top-6 font-[family-name:var(--font-bebas-neue)] text-7xl text-white/20 md:text-8xl">
                          {service.number}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                            <Icon className="h-16 w-16 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="h-1 w-16 bg-[#e8702e]" />
                          <p className="mt-3 font-[family-name:var(--font-bebas-neue)] text-2xl text-white">
                            {service.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content side */}
                    <div
                      className={`${
                        isImageLeft ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="font-[family-name:var(--font-bebas-neue)] text-7xl leading-none text-[#e8702e]/20 md:text-8xl">
                        {service.number}
                      </div>
                      <h2 className="mt-2 font-[family-name:var(--font-bebas-neue)] text-4xl leading-tight text-[#1a2744] md:text-5xl">
                        {service.name}
                      </h2>
                      <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-gray-600 md:text-lg">
                        {service.description}
                      </p>

                      <div className="mt-6">
                        <h3 className="font-[family-name:var(--font-bebas-neue)] text-xl tracking-wide text-[#1a2744]">
                          What&apos;s Included
                        </h3>
                        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {service.included.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 font-[family-name:var(--font-dm-sans)] text-sm text-gray-700 md:text-base"
                            >
                              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#e8702e]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8">
                        <Link
                          href="/contact"
                          className="group inline-flex items-center gap-2 rounded-md bg-[#e8702e] px-6 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#e8702e]/30 transition-all hover:bg-[#d4641f] hover:shadow-xl hover:shadow-[#e8702e]/40"
                        >
                          Get a Quote
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA banner */}
      <section className="relative overflow-hidden bg-[#1a2744] py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 12px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(232,112,46,0.3) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl leading-none text-white md:text-7xl">
            Ready to Build?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-dm-sans)] text-lg text-white/80">
            Get a free quote today and let&apos;s start your outdoor project.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+18182006274"
              className="group inline-flex items-center gap-3 rounded-md border-2 border-white/20 bg-white/5 px-6 py-3 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-[#e8702e] hover:bg-white/10"
            >
              <Phone className="h-5 w-5 text-[#e8702e]" />
              (818) 200-6274
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-[#e8702e] px-8 py-3 font-[family-name:var(--font-dm-sans)] text-base font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#e8702e]/30 transition-all hover:bg-[#d4641f] hover:shadow-xl hover:shadow-[#e8702e]/40"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
