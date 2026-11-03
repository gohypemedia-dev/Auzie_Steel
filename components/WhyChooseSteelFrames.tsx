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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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
      lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 850);
  }, [totalSlides]);

  // Touch Swipe Gesture Support for mobile phones
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // If swipe is horizontal and greater than 35px threshold
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swipe left -> next slide
        if (activeIdx < totalSlides - 1) {
          goToSlide(activeIdx + 1);
        }
      } else {
        // Swipe right -> prev slide
        if (activeIdx > 0) {
          goToSlide(activeIdx - 1);
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      // Pinned timeline driving the slide sync
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          if (isProgrammaticScroll.current) return;
          const progress = self.progress;
          // Smooth progressive index mapping with hysteresis
          const newIdx = Math.max(
            0,
            Math.min(totalSlides - 1, Math.round(progress * (totalSlides - 1)))
          );
          setActiveIdx((prev) => (prev !== newIdx ? newIdx : prev));
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
        className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 lg:px-14 xl:px-20 py-4 sm:py-8 lg:py-14"
      >
        {/* =================================================================
            1. MAIN SECTION HEADING
            ================================================================= */}
        <div className="w-full max-w-[1520px] mx-auto flex items-center justify-between z-20 pb-2 sm:pb-3">
          <h2
            className="text-[19px] sm:text-[25px] md:text-[32px] lg:text-[38px] font-sans font-[540] tracking-tight text-white uppercase leading-tight"
            style={{ fontWeight: 540 }}
          >
            WHY CHOOSE STEEL FRAME
          </h2>
        </div>

        {/* =================================================================
            2. MAIN SLIDER BODY: Responsive 2 Columns + Center Pagination
            On mobile (< lg): Compact image on top, text below, no vertical overflow
            Touch swipe enabled for butter-smooth mobile navigation
            ================================================================= */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="w-full max-w-[1520px] mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-12 xl:gap-16 items-center z-10 touch-pan-y"
        >
          
          {/* MOBILE IMAGE / DESKTOP RIGHT COLUMN (Order 1 on mobile, Order 2 on desktop) */}
          <div className="lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] aspect-[16/9] sm:aspect-[16/10] lg:aspect-square overflow-hidden relative bg-[#2555dc] rounded-md lg:rounded-none shadow-md">
              {/* Vertical Stack Track translating Y */}
              <div
                className="w-full h-full will-change-transform transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translate3d(0, -${activeIdx * 100}%, 0)`,
                }}
              >
                {services.map((service) => (
                  <div key={service.id} className="relative w-full h-full">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 540px"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Vertical Pagination Bullets (Desktop only) */}
          <div className="hidden lg:flex lg:order-2 lg:col-span-1 justify-center items-center">
            <div className="flex flex-col items-center gap-3 py-4">
              {services.map((service, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={service.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                      isActive
                        ? "w-[2.5px] h-16 bg-white shadow-md shadow-white/40"
                        : "w-[2.5px] h-3 bg-white/35 hover:bg-white/70"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* LEFT COLUMN: Slide Content & Information with Smooth Crossfade */}
          <div className="lg:order-1 lg:col-span-6 flex flex-col justify-center">
            {/* Stable Crossfade Container: All slides exist in DOM for smooth transition */}
            <div className="relative min-h-[160px] sm:min-h-[190px] lg:min-h-[240px]">
              {services.map((service, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <div
                    key={service.id}
                    className={`transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive
                        ? "opacity-100 translate-y-0 relative z-10 pointer-events-auto"
                        : "opacity-0 translate-y-3 absolute inset-0 pointer-events-none"
                    }`}
                  >
                    <h3 className="font-sans font-medium text-base sm:text-xl md:text-2xl lg:text-[28px] text-white uppercase leading-[1.2] tracking-tight max-w-[560px] mb-1 sm:mb-3">
                      {service.title}
                    </h3>

                    {/* Tagline / Subhead */}
                    {service.tagline && (
                      <p className="text-xs sm:text-sm md:text-base font-medium text-white/95 leading-snug mb-1.5 sm:mb-3">
                        {service.tagline}
                      </p>
                    )}

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm lg:text-[16px] font-sans font-normal text-white/90 leading-[1.55] sm:leading-[1.65] max-w-[560px] mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none">
                      {service.description}
                    </p>

                    {/* Action Link Button */}
                    <div className="pt-0.5">
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-[#3168ff] hover:bg-white/90 font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md active:scale-95"
                      >
                        <span>{service.linkText}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Horizontal Bullets: Positioned stably below the content */}
            <div className="flex lg:hidden items-center justify-end gap-2 pt-3">
              {services.map((service, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={service.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? "w-7 h-2 bg-white shadow-sm"
                        : "w-2.5 h-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </div>


    </section>
  );
}
