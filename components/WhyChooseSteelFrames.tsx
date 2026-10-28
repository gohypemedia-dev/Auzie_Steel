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
  const [activeStep, setActiveStep] = useState(0);

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

      // Master Pinned Stacking Timeline (Pinning inner wrapper to avoid React unmount DOM crashes)
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "whyChooseSteelFramesStackTrigger",
          trigger: section,
          start: "top top",
          end: () => `+=${(totalCards - 1) * 115}%`,
          pin: pinWrapper,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const currentIdx = Math.min(
              totalCards - 1,
              Math.floor(p * totalCards + 0.05)
            );
            setActiveStep(currentIdx);
          },
        },
      });

      // Stacking transitions: each card slides up from below directly over previous card
      for (let i = 1; i < totalCards; i++) {
        const prevCard = cards[i - 1];
        const currCard = cards[i];
        const stepLabel = `step_${i}`;

        tl.addLabel(stepLabel);

        // Current card slides up from bottom
        tl.to(
          currCard,
          {
            yPercent: 0,
            ease: "power2.inOut",
            duration: 1,
          },
          stepLabel
        );

        // Previous card scales down slightly and recedes gracefully in light mode
        tl.to(
          prevCard,
          {
            scale: 0.96,
            yPercent: -2,
            opacity: 0.65,
            filter: "brightness(0.95)",
            ease: "power2.inOut",
            duration: 1,
          },
          stepLabel
        );
      }
    }, sectionRef);

    return () => {
      ScrollTrigger.getById("whyChooseSteelFramesStackTrigger")?.kill(true);
      ctx.revert();
    };
  }, []);

  const handleStepJump = (idx: number) => {
    const st = ScrollTrigger.getById("whyChooseSteelFramesStackTrigger");
    if (!st) return;
    const scrollDistance = st.end - st.start;
    const targetScroll = st.start + (idx / (services.length - 1)) * scrollDistance;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F6] text-[#0F1114] border-b border-[#E2E8F0] select-none"
    >
      {/* Pinned Inner Wrapper */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-[720px] max-h-[960px] flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Architectural Dot Pattern Background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Top Fixed Header Bar */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBD5E1] shadow-sm mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
              <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
                WHY AUZIE STEEL
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-tight">
              WHY CHOOSE STEEL FRAMES FOR YOUR NEXT PROJECT
            </h2>
          </div>

          {/* Dynamic Step Counter & Segmented Progress Bars */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#0F1114] tracking-tight">
                0{activeStep + 1}
              </span>
              <span className="text-sm font-mono text-[#8A929B]">/ 04</span>
            </div>

            {/* Interactive Progress Tabs */}
            <div className="flex items-center gap-1.5">
              {services.map((svc, i) => (
                <button
                  key={svc.id}
                  onClick={() => handleStepJump(i)}
                  aria-label={`Jump to ${svc.title}`}
                  className="group relative py-2 cursor-pointer focus:outline-none"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeStep
                        ? "w-8 bg-[#1E63D8] shadow-sm shadow-[#1E63D8]/30"
                        : i < activeStep
                        ? "w-4 bg-[#0F1114]/50"
                        : "w-4 bg-[#CBD5E1] hover:bg-[#8A929B]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Stacking Cards Deck Area (Slide Up Animation) */}
        <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-hidden flex items-center justify-center">
          <div className="relative w-full h-[74vh] sm:h-[76vh] lg:h-[78vh] max-h-[740px]">
            {services.map((service, idx) => (
              <div
                key={service.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full bg-white rounded-[24px] sm:rounded-[30px] border border-[#CBD5E1] shadow-[0_-20px_50px_rgba(15,17,20,0.08),0_20px_40px_rgba(15,17,20,0.06)] overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-12 transition-colors duration-300"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#1E63D8] via-[#60A5FA] to-[#1E63D8] pointer-events-none" />

                {/* Card Sub-header */}
                <div className="flex items-center justify-between border-b border-[#F1F3F5] pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-3">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 overflow-hidden">
                  
                  {/* Left Column: Bold Typography & Tagline */}
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
                    <div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-[#0F1114] tracking-tight leading-[1.08]">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-base sm:text-lg font-semibold text-[#1E63D8] leading-snug">
                        {service.tagline}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl font-normal">
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
                    <div className="pt-2">
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
                    <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[420px] rounded-[18px] sm:rounded-[22px] overflow-hidden border border-[#CBD5E1] shadow-xl group">
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-white/95 backdrop-blur-md border border-[#CBD5E1] rounded-xl px-3.5 py-2 flex items-center justify-between text-[11px] shadow-lg">
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
                <div className="pt-3 border-t border-[#F1F3F5] flex items-center justify-between text-[11px] text-[#8A929B] font-mono">
                  <span className="font-semibold text-[#64748B]">AUZIE STEEL CAPABILITIES</span>
                  <span>AUSTRALIAN STANDARDS COMPLIANT · AS/NZS 4600</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-xs text-[#64748B] font-mono flex items-center justify-between border-t border-[#E2E8F0]">
          <span className="flex items-center gap-1.5 font-semibold text-[#0F1114]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
            SCROLL TO EXPLORE STAGES
          </span>
          <span className="font-bold text-[#0F1114]">
            {activeStep + 1} OF {services.length} ACTIVE
          </span>
        </div>
      </div>
    </section>
  );
}
