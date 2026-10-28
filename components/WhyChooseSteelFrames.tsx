"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FeatureService {
  id: string;
  step: string;
  pill: string;
  title: string;
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
    pill: "ARCHITECTURAL FREEDOM",
    title: "Customisable",
    tagline: "We can manufacture any design created by an architect.",
    description:
      "We manufacture bespoke light gauge steel frames directly from CAD/BIM models with extreme millimeter accuracy. Build cantilevers, double-height ceiling voids, and expansive open-plan spans with complete structural confidence.",
    specs: ["Architectural Freedom", "CAD/BIM Direct", "Millimeter Precision"],
    imageSrc: "/why-choose-customisable-main.jpg",
    imageAlt: "Auzie Steel Customisable Steel Frames",
    linkText: "View Customisable Specs",
    href: "/steel-frames",
  },
  {
    id: "durable",
    step: "02",
    pill: "PERMANENT INTEGRITY",
    title: "Durable",
    tagline: "Our steel frames will not rot, warp, twist or attract termites.",
    description:
      "Manufactured from high-tensile BlueScope Truecore® steel, our structural framing will not rot, warp, twist, shrink or sag over decades of building life. 100% immune to termite infestation, moisture, and fungal decay.",
    specs: ["50-Year Warranty*", "Zero Wood Rot", "100% Termite Proof"],
    imageSrc: "/why-choose-durable-main.jpg",
    imageAlt: "Durable Termite Proof Steel Frames",
    linkText: "View Durability Specs",
    href: "/steel-frames",
  },
  {
    id: "fire-retardant",
    step: "03",
    pill: "BUSHFIRE PROTECTION",
    title: "Fire retardant",
    tagline: "Steel is a naturally non-combustible material, ideal for housing frames, especially in fire-prone areas.",
    description:
      "Steel is inherently non-combustible and will not ignite or fuel flames. It is the premier structural framing choice for Australian domestic builds, especially across bushfire-prone zones complying with strict Australian building regulations.",
    specs: ["Non-Combustible", "BAL-FZ FlameZone", "AS 3959 Compliant"],
    imageSrc: "/why-choose-fire-main.jpg",
    imageAlt: "Non Combustible Fire Retardant Framing",
    linkText: "View Fire Resistance Specs",
    href: "/steel-frames",
  },
  {
    id: "transportation",
    step: "04",
    pill: "RAPID DEPLOYMENT",
    title: "Transportation",
    tagline: "Our lightweight steel frames are easy to transport, and installation needs less manpower and minimal manual labour.",
    description:
      "Our lightweight steel framing packs arrive directly to site in sequenced, colour-coded bundles. Installation requires significantly less crane time, smaller onsite crews, and minimal manual lifting, keeping your construction weeks ahead of schedule.",
    specs: ["Lightweight Packs", "Minimal Manual Labour", "Rapid Site Assembly"],
    imageSrc: "/why-choose-transport-main.jpg",
    imageAlt: "Lightweight High Speed Site Transportation",
    linkText: "View Transportation Specs",
    href: "/contact",
  },
];

export default function WhyChooseSteelFrames() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const section = sectionRef.current;
      const pinWrapper = pinWrapperRef.current;
      if (cards.length === 0 || !section || !pinWrapper) return;

      const totalCards = cards.length;

      // Card 0 starts in place; Cards 1, 2, 3 start pushed 100% down
      gsap.set(cards[0], { yPercent: 0, scale: 1, autoAlpha: 1, zIndex: 10 });
      cards.slice(1).forEach((card, idx) => {
        gsap.set(card, {
          yPercent: 100,
          scale: 1,
          autoAlpha: 1,
          zIndex: 10 + idx + 1,
        });
      });

      // Master Pinned Stacking Timeline with buttery momentum smoothing
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "whyChooseSteelFramesStackTrigger",
          trigger: section,
          start: "top top",
          end: () => `+=${(totalCards - 1) * 1100}`,
          pin: pinWrapper,
          pinSpacing: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stacking transitions: each card glides up smoothly with comfortable dwell time
      for (let i = 1; i < totalCards; i++) {
        const prevCard = cards[i - 1];
        const currCard = cards[i];

        // 1. Dwell time on current state before next card begins to slide in
        tl.to({}, { duration: 0.35 });

        const stepLabel = `step_${i}`;
        tl.addLabel(stepLabel);

        // 2. Current card glides up from bottom with smooth linear-organic curve
        tl.to(
          currCard,
          {
            yPercent: 0,
            ease: "power1.inOut",
            duration: 1.2,
          },
          stepLabel
        );

        // 3. Previous card gracefully recedes into background depth
        tl.to(
          prevCard,
          {
            scale: 0.95,
            yPercent: -3,
            opacity: 0.6,
            ease: "power1.inOut",
            duration: 1.2,
          },
          stepLabel
        );

        // If there is an even older card, push it further back
        if (i >= 2) {
          const olderCard = cards[i - 2];
          tl.to(
            olderCard,
            {
              scale: 0.90,
              yPercent: -6,
              opacity: 0.25,
              ease: "power1.inOut",
              duration: 1.2,
            },
            stepLabel
          );
        }
      }

      // Final dwell time at the last card so it stays comfortably in view before unpinning
      tl.to({}, { duration: 0.4 });
    }, sectionRef);

    return () => {
      ScrollTrigger.getById("whyChooseSteelFramesStackTrigger")?.kill(true);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F6] text-[#0F1114] border-b border-[#E2E8F0] select-none"
    >
      {/* Pinned Inner Wrapper */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-[760px] max-h-[1020px] flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Architectural Dot Pattern Background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Top Fixed Header Bar (Clears fixed 80px navbar with ample padding) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-4 sm:pb-5 flex flex-col items-center text-center border-b border-[#E2E8F0]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CBD5E1] shadow-sm mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
              WHY AUZIE STEEL
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
            WHY CHOOSE STEEL FRAMES FOR YOUR NEXT PROJECT
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#64748B] max-w-2xl font-normal">
            Precision cold-formed Truecore® steel framing engineered for architectural freedom, generational durability, and rapid assembly.
          </p>
        </div>

        {/* Center Stacking Cards Deck Area (Slide Up Animation with Clean White Cards) */}
        <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 overflow-hidden flex items-center justify-center">
          <div className="relative w-full h-[65vh] sm:h-[68vh] lg:h-[70vh] max-h-[640px]">
            {services.map((service, idx) => (
              <div
                key={service.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full bg-white rounded-[24px] sm:rounded-[30px] border border-[#CBD5E1] shadow-[0_-15px_40px_rgba(15,17,20,0.06),0_15px_35px_rgba(15,17,20,0.05)] overflow-hidden flex flex-col justify-between p-5 sm:p-7 lg:p-9 transform-gpu will-change-transform [backface-visibility:hidden]"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#1E63D8] via-[#60A5FA] to-[#1E63D8] pointer-events-none" />

                {/* Card Sub-header */}
                <div className="flex items-center justify-between border-b border-[#F1F3F5] pb-2.5 sm:pb-3 mb-2.5 sm:mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#1E63D8]" />
                    <span className="text-xs font-mono font-bold text-[#1E63D8] tracking-widest uppercase">
                      STAGE {service.step} · {service.pill}
                    </span>
                  </div>
                  <span className="text-xs font-label uppercase text-[#8A929B] font-semibold tracking-wider hidden sm:inline-block">
                    LIGHT GAUGE STEEL FRAMING
                  </span>
                </div>

                {/* Main Card Content (2-Column Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center flex-1 overflow-hidden">
                  
                  {/* Left Column: Bold Typography & Tagline */}
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase text-[#0F1114] tracking-tight leading-[1.1]">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 text-sm sm:text-base font-semibold text-[#1E63D8] leading-snug">
                        {service.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xl font-normal">
                      {service.description}
                    </p>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {service.specs.map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFD] border border-[#CBD5E1] text-xs font-semibold text-[#0F1114]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Action Link */}
                    <div className="pt-1.5">
                      <Link
                        href={service.href}
                        className="group inline-flex items-center gap-3 text-sm font-bold text-[#0F1114] hover:text-[#1E63D8] transition-colors duration-300"
                      >
                        <span className="h-[2px] w-7 bg-[#0F1114] group-hover:w-14 group-hover:bg-[#1E63D8] transition-all duration-300 rounded-full" />
                        <span className="tracking-wide uppercase font-label text-xs sm:text-sm">
                          {service.linkText}
                        </span>
                        <span className="text-[#1E63D8] group-hover:translate-x-1.5 transition-transform duration-300 font-black">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Tall Image Card */}
                  <div className="lg:col-span-5 h-full flex items-center justify-center">
                    <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[360px] rounded-[18px] sm:rounded-[22px] overflow-hidden border border-[#CBD5E1] shadow-lg group bg-slate-100">
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-white/95 backdrop-blur-md border border-[#CBD5E1] rounded-xl px-3 py-2 flex items-center justify-between text-[11px] shadow-md">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
                          <span className="font-bold text-[#0F1114] tracking-wider uppercase font-label">
                            100% BLUESCOPE TRUECORE®
                          </span>
                        </div>
                        <span className="font-mono text-[#64748B] font-semibold hidden sm:inline">
                          AUZIE STEEL
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Micro-Footer */}
                <div className="pt-2.5 border-t border-[#F1F3F5] flex items-center justify-between text-[11px] text-[#8A929B] font-mono">
                  <span className="font-semibold text-[#64748B]">AUZIE STEEL CAPABILITIES</span>
                  <span>AUSTRALIAN STANDARDS COMPLIANT · AS/NZS 4600</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
