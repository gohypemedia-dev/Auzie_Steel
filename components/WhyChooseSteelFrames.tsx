"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureService {
  id: string;
  step: string;
  title: React.ReactNode;
  tagline: string;
  description: string;
  specs: string[];
  imageSrc: string;
  imageAlt: string;
  linkText: string;
  href: string;
}

const services: FeatureService[] = [
  {
    id: "customisable",
    step: "01",
    title: "Thinking beyond the expected",
    tagline: "Customisable: We manufacture any design created by an architect.",
    description:
      "Before anything gets drawn, locked in or priced, we sit down with the builder and the design team to work through what the project actually needs. We manufacture bespoke light gauge steel frames directly from CAD/BIM models with extreme millimeter accuracy. Build cantilevers, double-height ceiling voids, and expansive open-plan spans with complete structural confidence.",
    specs: ["Architectural Freedom", "CAD/BIM Direct", "Millimeter Precision"],
    imageSrc: "/why-choose-customisable-main.jpg",
    imageAlt: "Auzie Steel Customisable Steel Frames",
    linkText: "View Customisable Specs",
    href: "/steel-frames",
  },
  {
    id: "durable",
    step: "02",
    title: "Technology built into how we work",
    tagline: "Durable: Steel frames will not rot, warp, twist or attract termites.",
    description:
      "Proprietary digital roll-forming technology connects every stage from CAD engineering to automated fabrication. Manufactured from high-tensile BlueScope Truecore® steel, our structural framing will not rot, warp, twist, shrink or sag over decades of building life. 100% immune to termite infestation, moisture, and fungal decay.",
    specs: ["50-Year Warranty*", "Zero Wood Rot", "100% Termite Proof"],
    imageSrc: "/why-choose-durable-main.jpg",
    imageAlt: "Durable Termite Proof Steel Frames",
    linkText: "View Durability Specs",
    href: "/steel-frames",
  },
  {
    id: "fire-retardant",
    step: "03",
    title: "Built around what your project needs",
    tagline: "Fire retardant: Naturally non-combustible material for Australian builds.",
    description:
      "Steel is inherently non-combustible and will not ignite or fuel flames. It is the premier structural framing choice for Australian domestic builds, especially across bushfire-prone zones complying with strict Australian building regulations and AS 3959 BAL-FZ standards.",
    specs: ["Non-Combustible", "BAL-FZ FlameZone", "AS 3959 Compliant"],
    imageSrc: "/why-choose-fire-main.jpg",
    imageAlt: "Non Combustible Fire Retardant Framing",
    linkText: "View Fire Resistance Specs",
    href: "/steel-frames",
  },
  {
    id: "transportation",
    step: "04",
    title: "Pride built into every project",
    tagline: "Transportation: Easy to transport, minimal manpower, rapid erection.",
    description:
      "Sequenced, colour-coded framing packs arrive directly to site with complete crane-truck logistics. Installation requires significantly less crane time, smaller onsite crews, and minimal manual lifting, keeping your construction weeks ahead of schedule.",
    specs: ["Lightweight Packs", "Minimal Manual Labour", "Rapid Site Assembly"],
    imageSrc: "/why-choose-transport-main.jpg",
    imageAlt: "Lightweight High Speed Site Transportation",
    linkText: "View Transportation Specs",
    href: "/contact",
  },
];

export default function WhyChooseSteelFrames() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isProgrammaticScroll = useRef(false);

  const totalSlides = services.length;

  // Scroll to a specific slide smoothly
  const goToSlide = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(totalSlides - 1, index));
    setActiveIdx(clampedIndex);

    if (typeof window === "undefined" || !containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollDistance = container.offsetHeight - window.innerHeight;

    if (scrollDistance <= 0) return;

    // Target scroll position for the selected slide
    const targetScroll = containerTop + (clampedIndex / (totalSlides - 1)) * scrollDistance;

    isProgrammaticScroll.current = true;
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, opts?: Record<string, unknown>) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.0 });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1000);
  }, [totalSlides]);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      // Pinned timeline driving the Varco Pruden slide sync
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (isProgrammaticScroll.current) return;
          // Progress 0 to 1 maps to slides 0 to totalSlides - 1
          const progress = self.progress;
          const newIdx = Math.min(
            totalSlides - 1,
            Math.floor(progress * totalSlides)
          );
          setActiveIdx(newIdx);
        },
      });
    }, container);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [totalSlides]);

  const activeService = services[activeIdx];

  return (
    <section
      id="why-choose-steel-frames"
      ref={containerRef}
      className="relative z-20 w-full bg-[#3168ff] text-white select-none"
      style={{ height: "320vh" }}
    >
      {/* ===================================================================
          STICKY FULLSCREEN VIEWPORT (Exact Varco Pruden Container)
          =================================================================== */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 lg:px-14 xl:px-20 py-8 sm:py-12 lg:py-14"
      >
        {/* =================================================================
            1. MAIN SECTION HEADING
            ================================================================= */}
        <div className="w-full max-w-[1520px] mx-auto flex items-center justify-between z-20 pb-2 sm:pb-4">
          <h2
            className="text-[21px] sm:text-[25px] md:text-[32px] lg:text-[38px] font-sans font-[540] tracking-tight text-white leading-tight"
            style={{ fontWeight: 540 }}
          >
            Why choose steel frames for your next project
          </h2>
        </div>

        {/* =================================================================
            2. MAIN SLIDER BODY: 2 COLUMNS + CENTER VERTICAL PAGINATION
            ================================================================= */}
        <div className="w-full max-w-[1520px] mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center z-10">
          {/* LEFT COLUMN: Slide Content & Information (Col 1 to 6) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Slide Title with smooth transition (Slightly smaller than main heading) */}
            <div key={activeService.id} className="animate-fade-in-up">
              <h3 className="font-sans font-medium text-lg sm:text-xl md:text-2xl lg:text-[28px] text-white uppercase leading-[1.2] tracking-tight max-w-[560px] mb-3 sm:mb-4">
                {activeService.title}
              </h3>

              {/* Tagline / Subhead */}
              {activeService.tagline && (
                <p className="text-sm sm:text-base font-medium text-white/95 leading-snug mb-3 sm:mb-4">
                  {activeService.tagline}
                </p>
              )}

              {/* Description Paragraph (Exact font size & font weight from reference) */}
              <p className="text-sm sm:text-base lg:text-[16px] font-sans font-normal text-white/90 leading-[1.65] max-w-[560px] mb-6 sm:mb-8">
                {activeService.description}
              </p>

              {/* Action Link Button */}
              <div className="flex items-center gap-4">
                <Link
                  href={activeService.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#3168ff] hover:bg-white/90 font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md active:scale-95"
                >
                  <span>{activeService.linkText}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Vertical Pagination Bullets (Col 7 on XL / Hidden on small) */}
          <div className="hidden lg:flex lg:col-span-1 justify-center items-center">
            <div className="flex flex-col items-center gap-3 py-4">
              {services.map((service, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={service.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "w-[2.5px] h-16 bg-white shadow-md shadow-white/40"
                        : "w-[2.5px] h-3 bg-white/35 hover:bg-white/70"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Vertical Image Viewport Window (Col 8 to 12) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] aspect-square overflow-hidden relative bg-[#2555dc]">
              {/* Vertical Stack Track translating Y */}
              <div
                className="w-full h-full will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translate3d(0, -${activeIdx * 100}%, 0)`,
                }}
              >
                {services.map((service, idx) => (
                  <div key={service.id} className="relative w-full h-full">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 540px"
                      className="object-cover object-center"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          3. ASYMMETRIC BOTTOM SHELF EXTENSION (Exact Varco Pruden .fixed-headline-slider--bottom-notch:after)
          =================================================================== */}
      <div
        className="absolute -bottom-[60px] xl:-bottom-[80px] right-0 w-1/2 xl:w-[44.4%] h-[60px] xl:h-[80px] bg-[#3168ff] z-20 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
