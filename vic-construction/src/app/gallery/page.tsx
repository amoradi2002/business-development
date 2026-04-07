"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

type Project = {
  id: number;
  title: string;
  location: string;
  category: string;
  gradient: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Patio Build",
    location: "Beverly Hills",
    category: "patios",
    gradient: "from-[#1a2744] via-[#2d3e5c] to-[#0f1a2e]",
  },
  {
    id: 2,
    title: "Composite Deck",
    location: "Studio City",
    category: "patios",
    gradient: "from-[#3d2817] via-[#6b4423] to-[#2a1a0d]",
  },
  {
    id: 3,
    title: "Stamped Concrete Patio",
    location: "Encino",
    category: "patios",
    gradient: "from-[#5a5a5a] via-[#7a7a7a] to-[#3a3a3a]",
  },
  {
    id: 4,
    title: "Outdoor Kitchen with Pizza Oven",
    location: "Sherman Oaks",
    category: "outdoor-kitchens",
    gradient: "from-[#e8702e] via-[#c75a1f] to-[#8a3d12]",
  },
  {
    id: 5,
    title: "BBQ Island",
    location: "Pasadena",
    category: "outdoor-kitchens",
    gradient: "from-[#b45c24] via-[#8a4218] to-[#4a240d]",
  },
  {
    id: 6,
    title: "Aluminum Pergola",
    location: "Burbank",
    category: "pergolas",
    gradient: "from-[#2a3b5c] via-[#3d5278] to-[#1a2744]",
  },
  {
    id: 7,
    title: "Wood Pergola with Lattice",
    location: "Glendale",
    category: "pergolas",
    gradient: "from-[#6b4423] via-[#8a5a2c] to-[#3d2817]",
  },
  {
    id: 8,
    title: "Stone Retaining Wall",
    location: "Hollywood Hills",
    category: "retaining-walls",
    gradient: "from-[#4a4a4a] via-[#6b6b6b] to-[#2d2d2d]",
  },
  {
    id: 9,
    title: "Concrete Block Wall",
    location: "Calabasas",
    category: "retaining-walls",
    gradient: "from-[#7a7a7a] via-[#9a9a9a] to-[#4a4a4a]",
  },
  {
    id: 10,
    title: "Wrought Iron Gate",
    location: "Bel Air",
    category: "fencing",
    gradient: "from-[#0f1a2e] via-[#1a2744] to-[#000000]",
  },
  {
    id: 11,
    title: "Wood Privacy Fence",
    location: "Tarzana",
    category: "fencing",
    gradient: "from-[#5a3817] via-[#7a4a1f] to-[#2a1a0d]",
  },
  {
    id: 12,
    title: "Stamped Concrete Driveway",
    location: "Brentwood",
    category: "concrete",
    gradient: "from-[#8a6b3d] via-[#a6844b] to-[#5c4728]",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Patios", value: "patios" },
  { label: "Outdoor Kitchens", value: "outdoor-kitchens" },
  { label: "Pergolas", value: "pergolas" },
  { label: "Retaining Walls", value: "retaining-walls" },
  { label: "Fencing", value: "fencing" },
  { label: "Concrete", value: "concrete" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
            Our Work
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-dm-sans)] text-lg text-white/80 md:text-xl">
            Recent projects across Los Angeles
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-md px-4 py-2 font-[family-name:var(--font-dm-sans)] text-sm font-semibold uppercase tracking-wider transition-all md:px-6 md:py-3 md:text-base ${
                    isActive
                      ? "bg-[#e8702e] text-white shadow-lg shadow-[#e8702e]/30"
                      : "bg-white text-[#1a2744] hover:bg-[#1a2744] hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#e8702e] hover:shadow-2xl hover:shadow-[#e8702e]/30"
              >
                {/* Gradient placeholder */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-110`}
                >
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 14px)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a2e] via-[#0f1a2e]/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95" />

                {/* Project info */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="translate-y-2 transform transition-all duration-500 group-hover:translate-y-0">
                    <div className="mb-2 h-1 w-10 bg-[#e8702e] transition-all duration-500 group-hover:w-20" />
                    <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl leading-tight text-white md:text-3xl">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm text-[#e8702e]">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="mt-16 text-center font-[family-name:var(--font-dm-sans)] text-gray-500">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
