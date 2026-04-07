import Link from 'next/link';
import {
  Home,
  UtensilsCrossed,
  TreePine,
  Layers,
  Shield,
  Square,
  DollarSign,
  ThumbsUp,
  Phone,
  ArrowRight,
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CountUp from '@/components/CountUp';

const SERVICES = [
  {
    icon: Home,
    title: 'Patios & Decks',
    description:
      'Custom outdoor living spaces, wood and composite decking, and poured concrete patios built to weather the seasons.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Outdoor Kitchens',
    description:
      'Full kitchen builds, granite countertops, built-in grills, and custom stone work for unforgettable gatherings.',
  },
  {
    icon: TreePine,
    title: 'Pergolas & Shade',
    description:
      'Wood and aluminum pergolas, lattice covers, and attached or freestanding structures for year-round comfort.',
  },
  {
    icon: Layers,
    title: 'Retaining Walls',
    description:
      'Concrete block, natural stone, drainage solutions, and hillside stabilization engineered to last.',
  },
  {
    icon: Shield,
    title: 'Fencing & Gates',
    description:
      'Wood, vinyl, wrought iron, chain link, and automatic gate systems for privacy, security, and curb appeal.',
  },
  {
    icon: Square,
    title: 'Concrete & Flatwork',
    description:
      'Driveways, walkways, pool decks, stamped and stained concrete with lasting structural integrity.',
  },
];

const WHY_VIC = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description:
      'Fully bonded, licensed, and insured for your peace of mind on every project, large or small.',
  },
  {
    icon: DollarSign,
    title: 'Free Estimates',
    description:
      'No-pressure, no-obligation estimates with transparent, itemized pricing — always.',
  },
  {
    icon: ThumbsUp,
    title: 'Satisfaction Guaranteed',
    description:
      'We stand behind our craftsmanship with a workmanship warranty on every build we deliver.',
  },
];

const GALLERY = [
  {
    name: 'Modern Patio Build',
    location: 'Beverly Hills',
    gradient: 'linear-gradient(135deg, #3a4556 0%, #1a2744 100%)',
  },
  {
    name: 'Outdoor Kitchen',
    location: 'Encino',
    gradient: 'linear-gradient(135deg, #5c4a3a 0%, #2d2118 100%)',
  },
  {
    name: 'Custom Pergola',
    location: 'Studio City',
    gradient: 'linear-gradient(135deg, #4a5a4a 0%, #1f2a1f 100%)',
  },
  {
    name: 'Stone Retaining Wall',
    location: 'Pasadena',
    gradient: 'linear-gradient(135deg, #5a544a 0%, #2a2620 100%)',
  },
  {
    name: 'Wrought Iron Gates',
    location: 'Sherman Oaks',
    gradient: 'linear-gradient(135deg, #2a2a32 0%, #0f0f14 100%)',
  },
  {
    name: 'Stamped Concrete Driveway',
    location: 'Burbank',
    gradient: 'linear-gradient(135deg, #4a4a52 0%, #1f1f24 100%)',
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full diagonal-texture hero-clip flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center pt-20">
          <h1
            className="font-heading text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] mb-6"
            style={{ letterSpacing: '0.03em' }}
          >
            BUILT RIGHT.
            <br />
            BUILT TO LAST.
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium Outdoor Construction Across Los Angeles. Licensed, Insured, and
            Ready to Build.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/gallery" className="btn btn-outline w-full sm:w-auto">
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-[#0f1a2e] py-12 md:py-16 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div
                className="font-heading text-[#e8702e] text-5xl md:text-6xl mb-2"
                style={{ letterSpacing: '0.03em' }}
              >
                <CountUp end={15} suffix="+" />
              </div>
              <div className="text-white/80 text-sm md:text-base uppercase tracking-wider">
                Years Experience
              </div>
            </div>
            <div>
              <div
                className="font-heading text-[#e8702e] text-5xl md:text-6xl mb-2"
                style={{ letterSpacing: '0.03em' }}
              >
                <CountUp end={500} suffix="+" />
              </div>
              <div className="text-white/80 text-sm md:text-base uppercase tracking-wider">
                Projects Completed
              </div>
            </div>
            <div>
              <div
                className="font-heading text-[#e8702e] text-5xl md:text-6xl mb-2"
                style={{ letterSpacing: '0.03em' }}
              >
                <CountUp end={100} suffix="%" />
              </div>
              <div className="text-white/80 text-sm md:text-base uppercase tracking-wider">
                Licensed & Insured
              </div>
            </div>
            <div>
              <div
                className="font-heading text-[#e8702e] text-5xl md:text-6xl mb-2"
                style={{ letterSpacing: '0.03em' }}
              >
                5★
              </div>
              <div className="text-white/80 text-sm md:text-base uppercase tracking-wider">
                5-Star Rated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <AnimatedSection as="section" className="section-padding bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2
              className="font-heading text-[#1a2744] text-5xl md:text-6xl mb-4"
              style={{ letterSpacing: '0.03em' }}
            >
              OUR SERVICES
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Premium outdoor construction services across Los Angeles
            </p>
            <div className="h-1 w-20 bg-[#e8702e] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="card p-8">
                  <div className="mb-5">
                    <Icon className="h-12 w-12 text-[#e8702e]" strokeWidth={1.75} />
                  </div>
                  <h3
                    className="font-heading text-[#1a2744] text-2xl mb-3"
                    style={{ letterSpacing: '0.03em' }}
                  >
                    {service.title.toUpperCase()}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* WHY VIC */}
      <AnimatedSection as="section" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2
              className="font-heading text-[#1a2744] text-5xl md:text-6xl mb-4"
              style={{ letterSpacing: '0.03em' }}
            >
              WHY VIC
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A trusted Los Angeles builder with a reputation for excellence
            </p>
            <div className="h-1 w-20 bg-[#e8702e] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {WHY_VIC.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card p-8 text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#e8702e]/10 mb-5">
                    <Icon className="h-8 w-8 text-[#e8702e]" strokeWidth={1.75} />
                  </div>
                  <h3
                    className="font-heading text-[#1a2744] text-2xl mb-3"
                    style={{ letterSpacing: '0.03em' }}
                  >
                    {item.title.toUpperCase()}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* GALLERY PREVIEW */}
      <AnimatedSection as="section" className="section-padding bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2
              className="font-heading text-[#1a2744] text-5xl md:text-6xl mb-4"
              style={{ letterSpacing: '0.03em' }}
            >
              RECENT PROJECTS
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A glimpse at the craftsmanship we bring to every build
            </p>
            <div className="h-1 w-20 bg-[#e8702e] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((project) => (
              <div
                key={project.name}
                className="gallery-card aspect-[4/3] shadow-md"
                style={{ background: project.gradient }}
              >
                <div className="gallery-overlay">
                  <div
                    className="font-heading text-[#e8702e] text-2xl mb-1"
                    style={{ letterSpacing: '0.03em' }}
                  >
                    {project.name.toUpperCase()}
                  </div>
                  <div className="text-white/90 text-sm">{project.location}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery" className="btn btn-dark">
              View Full Gallery
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA BANNER */}
      <AnimatedSection as="section" className="relative diagonal-texture section-padding">
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
          <h2
            className="font-heading text-white text-5xl md:text-7xl mb-6"
            style={{ letterSpacing: '0.03em' }}
          >
            READY TO START YOUR PROJECT?
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Call us today for a free, no-obligation estimate. We will walk your
            property, listen to your vision, and deliver a detailed proposal.
          </p>
          <a
            href="tel:+18182006274"
            className="inline-flex items-center gap-3 text-white font-heading text-4xl md:text-5xl mb-8 hover:text-[#e8702e] transition-colors duration-200"
            style={{ letterSpacing: '0.04em' }}
          >
            <Phone className="h-8 w-8 md:h-10 md:w-10 text-[#e8702e]" />
            (818) 200-6274
          </a>
          <div className="flex justify-center">
            <Link href="/contact" className="btn btn-primary">
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
