import Link from "next/link";
import {
  Award,
  Clock,
  DollarSign,
  Sparkles,
  ShieldCheck,
  Phone,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";

export const metadata = {
  title: "About | VIC Construction, Inc.",
  description:
    "VIC Construction has been building premium outdoor spaces across Los Angeles since 2010. Licensed, insured, and committed to quality craftsmanship.",
};

type Value = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const values: Value[] = [
  {
    title: "Quality Craftsmanship",
    description:
      "Every project built to last with the finest materials and techniques.",
    icon: Award,
  },
  {
    title: "On-Time Delivery",
    description:
      "We respect your time and finish projects on schedule, every time.",
    icon: Clock,
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprises. Straightforward quotes you can trust.",
    icon: DollarSign,
  },
  {
    title: "Clean Worksite",
    description:
      "We leave your property cleaner than we found it. Every single day.",
    icon: Sparkles,
  },
];

export default function AboutPage() {
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
            About VIC
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-dm-sans)] text-lg text-white/80 md:text-xl">
            Building outdoor spaces since 2010
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.3em] text-[#e8702e]">
                  Our Story
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-bebas-neue)] text-4xl leading-tight text-[#1a2744] md:text-5xl lg:text-6xl">
                  From Small Team to LA&apos;s Trusted Builder
                </h2>
                <div className="mt-6 space-y-4 font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    VIC Construction was founded in Los Angeles in 2010 with
                    one simple goal: build outdoor spaces the right way.
                    What started as a small team of craftsmen working out of a
                    single truck has grown into one of LA&apos;s most trusted
                    outdoor construction companies.
                  </p>
                  <p>
                    Over the past 15 years we&apos;ve completed more than 500
                    projects across Beverly Hills, Pasadena, the San Fernando
                    Valley, and every neighborhood in between. From intimate
                    backyard patios to sprawling outdoor kitchens and
                    engineered hillside retaining walls, every job gets the
                    same meticulous attention to detail.
                  </p>
                  <p>
                    We still believe what we believed on day one: quality
                    craftsmanship never goes out of style. Every project is
                    built with the finest materials, proven techniques, and a
                    relentless commitment to getting it right the first time.
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-200 pt-8">
                  <div>
                    <div className="font-[family-name:var(--font-bebas-neue)] text-4xl text-[#e8702e] md:text-5xl">
                      <CountUp end={500} suffix="+" />
                    </div>
                    <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider text-gray-500 md:text-sm">
                      Projects Built
                    </p>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-bebas-neue)] text-4xl text-[#e8702e] md:text-5xl">
                      <CountUp end={15} suffix="+" />
                    </div>
                    <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider text-gray-500 md:text-sm">
                      Years in LA
                    </p>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-bebas-neue)] text-4xl text-[#e8702e] md:text-5xl">
                      <CountUp end={100} suffix="%" />
                    </div>
                    <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider text-gray-500 md:text-sm">
                      Licensed
                    </p>
                  </div>
                </div>
              </div>

              {/* Image placeholder */}
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2744] via-[#243555] to-[#0f1a2e] shadow-2xl">
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 14px)",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        "radial-gradient(ellipse at bottom right, rgba(232,112,46,0.4) 0%, transparent 60%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="h-1 w-16 bg-[#e8702e]" />
                    <p className="mt-4 font-[family-name:var(--font-bebas-neue)] text-3xl leading-tight text-white md:text-4xl">
                      Building outdoor spaces Angelenos love to come home to.
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm text-white/70">
                      Los Angeles, California
                    </p>
                  </div>
                </div>
                {/* Decorative offset block */}
                <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-[#e8702e]" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="text-center">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.3em] text-[#e8702e]">
                What We Stand For
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-bebas-neue)] text-4xl leading-tight text-[#1a2744] md:text-5xl lg:text-6xl">
                Our Values
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-dm-sans)] text-base text-gray-600 md:text-lg">
                The principles that guide every project we build.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title}>
                  <div
                    className="group relative h-full rounded-2xl border-l-4 border-transparent bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#e8702e] hover:shadow-2xl hover:shadow-[#e8702e]/20"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e8702e]/10 transition-colors group-hover:bg-[#e8702e]">
                      <Icon className="h-7 w-7 text-[#e8702e] transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mt-6 font-[family-name:var(--font-bebas-neue)] text-2xl leading-tight text-[#1a2744] md:text-3xl">
                      {value.title}
                    </h3>
                    <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-gray-600 md:text-base">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Licensed & Insured */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-[#1a2744] p-8 md:p-16">
              <div
                className="absolute inset-0 opacity-[0.06]"
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
                    "radial-gradient(ellipse at top right, rgba(232,112,46,0.3) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-[#e8702e]/10 ring-1 ring-[#e8702e]/30 md:h-48 md:w-48">
                    <div className="absolute inset-4 rounded-full bg-[#e8702e]/10 ring-1 ring-[#e8702e]/20" />
                    <ShieldCheck className="relative h-20 w-20 text-[#e8702e] md:h-24 md:w-24" />
                  </div>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.3em] text-[#e8702e]">
                    Protection You Can Trust
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-bebas-neue)] text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                    Fully Licensed & Insured
                  </h2>
                  <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-white/80 md:text-lg">
                    VIC Construction is fully licensed by the California State
                    License Board and carries comprehensive liability and
                    workers compensation insurance for every project. Your
                    property and our team are protected.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                      <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider text-[#e8702e]">
                        CSLB License
                      </p>
                      <p className="mt-2 font-[family-name:var(--font-bebas-neue)] text-2xl text-white">
                        Lic. #XXXXXX
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                      <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider text-[#e8702e]">
                        Liability Insurance
                      </p>
                      <p className="mt-2 font-[family-name:var(--font-bebas-neue)] text-2xl text-white">
                        State Farm
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                      <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider text-[#e8702e]">
                        Workers Comp
                      </p>
                      <p className="mt-2 font-[family-name:var(--font-bebas-neue)] text-2xl text-white">
                        Full Coverage
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[#0f1a2e] py-16 md:py-24">
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
            Ready to Work With Us?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-dm-sans)] text-lg text-white/80">
            Let&apos;s talk about your outdoor project and get you a free quote.
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
