"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface IndustryItem {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  href: string;
}

const industries: IndustryItem[] = [
  {
    id: "distribution-warehouse",
    title: "Distribution & Warehouse",
    category: "Industrial Logistics & Bulk Storage",
    imageSrc: "/industry-warehouse.jpg",
    href: "/steel-frames",
  },
  {
    id: "hangars-aviation",
    title: "Hangars & Aviation",
    category: "Wide Clear-Span Aircraft Facilities",
    imageSrc: "/industry-hangars.jpg",
    href: "/steel-frames",
  },
  {
    id: "sports-recreation",
    title: "Sports & Recreation",
    category: "Arenas, Gyms & Community Hubs",
    imageSrc: "/industry-sports.jpg",
    href: "/steel-frames",
  },
  {
    id: "breweries-wineries",
    title: "Breweries & Wineries",
    category: "Bespoke Hospitality & Production Sheds",
    imageSrc: "/industry-breweries.jpg",
    href: "/steel-frames",
  },
  {
    id: "retail-dining",
    title: "Retail & Dining",
    category: "Modern Commercial Showrooms & Dining",
    imageSrc: "/industry-retail.jpg",
    href: "/steel-frames",
  },
  {
    id: "education",
    title: "Education",
    category: "Schools, Lecture Theatres & Campuses",
    imageSrc: "/industry-education.jpg",
    href: "/steel-frames",
  },
];

export default function IndustriesAtWork() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, industries.length - 3);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / 3;
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / 3;
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#323232] text-white py-20 sm:py-24 lg:py-28 overflow-hidden select-none">
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* ===================================================================
            1. SECTION HEADLINE & "VIEW ALL PROJECTS" BUTTON
            =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 pb-4 border-b border-white/15">
          <div>
            <h2 className="text-white text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium tracking-tight leading-tight">
              Industries at work.
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-normal mt-2 max-w-xl">
              Engineered light gauge steel structural framing solutions built for the unique demands of modern Australian industry.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <Link
              href="/steel-frames"
              className="text-white hover:text-white/80 font-sans font-medium text-sm sm:text-base flex items-center gap-2 group transition-colors"
            >
              <span>View All Projects</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true">
                →
              </span>
            </Link>

            {/* Slider Navigation Arrows (Desktop) */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous slide"
                className={`w-11 h-11 rounded-full border border-white/30 flex items-center justify-center transition-all ${
                  currentIndex === 0
                    ? "opacity-35 cursor-not-allowed"
                    : "hover:bg-white hover:text-[#323232] hover:border-white active:scale-95"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next slide"
                className={`w-11 h-11 rounded-full border border-white/30 flex items-center justify-center transition-all ${
                  currentIndex >= maxIndex
                    ? "opacity-35 cursor-not-allowed"
                    : "hover:bg-white hover:text-[#323232] hover:border-white active:scale-95"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================================
            2. 6 INDUSTRY CARDS GRID / SLIDER
            =================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {industries.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block relative focus:outline-none"
            >
              {/* Image Container with 16:10 Ratio & Hover Zoom */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[4px] bg-[#242424] border border-white/10 shadow-lg">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Corner Action Button Overlay (Exact Varco Pruden .btn--white--charcoal) */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-[2px] bg-white text-[#323232] flex items-center justify-center shadow-md opacity-90 group-hover:opacity-100 group-hover:bg-[#3168ff] group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
                  </svg>
                </div>

                {/* Subtle bottom shadow vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Title & Category Details Below Image */}
              <div className="pt-4 space-y-1">
                <h3 className="font-sans font-medium text-xl sm:text-2xl text-white tracking-tight group-hover:text-[#3168ff] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm font-normal">
                  {item.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

