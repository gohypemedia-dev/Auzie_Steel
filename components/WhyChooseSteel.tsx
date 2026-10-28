"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface WhySteelItem {
  id: string;
  step: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  icon: React.ReactNode;
}

const items: WhySteelItem[] = [
  {
    id: "transport",
    step: "01",
    title: "Easy to transport",
    description:
      "Light to carry and easy to install and bolt down with our solutions.",
    imageSrc: "/why-choose-transport-main.jpg",
    imageAlt: "Easy to transport sequenced light gauge steel packs",
    tag: "LOGISTICS & SPEED",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.75m0 3.75a3 3 0 013 3v4.5m-3-7.5H4.875c-.621 0-1.125.504-1.125 1.125v6.75" />
      </svg>
    ),
  },
  {
    id: "seal",
    step: "02",
    title: "Easy to seal houses",
    description:
      "Precise cuts and a lack of bends in steel make for a well-sealed home.",
    imageSrc: "/hero-construction.jpg",
    imageAlt: "Precise weather-sealed light gauge domestic building frame",
    tag: "WEATHERTIGHT INTEGRITY",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    id: "custom",
    step: "03",
    title: "Creative and custom designs",
    description:
      "Architects and designers have more flexibility with steel frames due to their durability.",
    imageSrc: "/why-choose-customisable-main.jpg",
    imageAlt: "Creative custom architectural steel framing spans",
    tag: "ARCHITECTURAL FLEXIBILITY",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: "durable",
    step: "04",
    title: "Durable",
    description:
      "No rotting, termites or warping that comes with wood frames.",
    imageSrc: "/why-choose-durable-main.jpg",
    imageAlt: "Durable non-rotting termite proof Truecore steel",
    tag: "PERMANENT DEFENCE",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: "fire",
    step: "05",
    title: "Fire resistant",
    description:
      "There may be cheaper builder's insurance for houses built with cold formed steel.",
    imageSrc: "/why-choose-fire-main.jpg",
    imageAlt: "Non-combustible fire resistant steel structure",
    tag: "AS 3959 BAL-FZ COMPLIANT",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 3.75 3.75 0 001.43 3.921z" />
      </svg>
    ),
  },
  {
    id: "recyclable",
    step: "06",
    title: "Recyclable",
    description:
      "Steel can be melted down after use and used for something else afterwards.",
    imageSrc: "/what-we-do-fabrications.jpg",
    imageAlt: "100% recyclable environmentally sustainable steel",
    tag: "SUSTAINABLE CIRCULAR STEEL",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
];

export default function WhyChooseSteel() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const centerHeroCardRef = useRef<HTMLDivElement>(null);
  const splitLeftRef = useRef<HTMLDivElement>(null);
  const splitRightRef = useRef<HTMLDivElement>(null);
  const centerTypographyRef = useRef<HTMLDivElement>(null);
  const leftStreamRef = useRef<HTMLDivElement>(null);
  const rightStreamRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Left Stream contains items 0, 2, 4
  const leftItems = [items[0], items[2], items[4]];
  // Right Stream contains items 1, 3, 5
  const rightItems = [items[1], items[3], items[5]];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (>1024px): Center Entrance + Seam Split + Dual Parallax Stream from ani4.mp4
      mm.add("(min-width: 1024px)", () => {
        const leftStream = leftStreamRef.current;
        const rightStream = rightStreamRef.current;
        const centerHeroCard = centerHeroCardRef.current;
        const splitLeft = splitLeftRef.current;
        const splitRight = splitRightRef.current;
        const centerTypography = centerTypographyRef.current;
        const pinWrapper = pinWrapperRef.current;
        const section = sectionRef.current;

        if (
          !section ||
          !pinWrapper ||
          !leftStream ||
          !rightStream ||
          !centerHeroCard ||
          !splitLeft ||
          !splitRight ||
          !centerTypography
        )
          return;

        const isWide = window.innerWidth >= 1280;
        const splitDistance = isWide ? 420 : 350;

        // 1. Initial State:
        // Center card starts below/scaled down ("pahle center me kuch aa raha tha")
        gsap.set(centerHeroCard, {
          scale: 0.65,
          y: 90,
          opacity: 0,
        });

        gsap.set(splitLeft, { x: 0, rotate: 0, opacity: 1 });
        gsap.set(splitRight, { x: 0, rotate: 0, opacity: 1 });

        // Center headline behind card is initially hidden
        gsap.set(centerTypography, {
          scale: 0.88,
          opacity: 0,
        });

        // Left & Right Streams start tucked inward & hidden
        gsap.set(leftStream, {
          x: "80px",
          y: "8%",
          opacity: 0,
          scale: 0.92,
        });

        gsap.set(rightStream, {
          x: "-80px",
          y: "24%",
          opacity: 0,
          scale: 0.92,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "whySteelDualStreamTrigger",
            trigger: section,
            start: "top top",
            end: "+=3600",
            pin: pinWrapper, // Pin inner wrapper to prevent DOM tree mutation on section
            pinSpacing: true,
            scrub: 1.15,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const current = Math.min(items.length - 1, Math.floor(p * items.length));
              setActiveIdx(current);
            },
          },
        });

        // =========================================================
        // STEP 1: ENTRANCE INTO CENTER (0.00 to 0.22)
        // "pahle center me kuch aa raha tha"
        // =========================================================
        tl.to(
          centerHeroCard,
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.22,
            ease: "power2.out",
          },
          0
        );

        // =========================================================
        // STEP 2: THE CARD SPLITS OUTWARD (0.26 to 0.48)
        // "uske baad card split ho raha tha"
        // =========================================================

        // Left half splits and moves to left column position
        tl.to(
          splitLeft,
          {
            x: -splitDistance,
            rotate: -3.5,
            opacity: 0,
            duration: 0.22,
            ease: "power3.inOut",
          },
          0.26
        );

        // Right half splits and moves to right column position
        tl.to(
          splitRight,
          {
            x: splitDistance,
            rotate: 3.5,
            opacity: 0,
            duration: 0.22,
            ease: "power3.inOut",
          },
          0.26
        );

        // The Center Typography BEHIND the splitting card is revealed
        tl.to(
          centerTypography,
          {
            scale: 1,
            opacity: 1,
            duration: 0.20,
            ease: "power2.out",
          },
          0.28
        );

        // Left Stream smoothly takes over at the left column
        tl.to(
          leftStream,
          {
            x: "0px",
            opacity: 1,
            scale: 1,
            duration: 0.22,
            ease: "power3.out",
          },
          0.28
        );

        // Right Stream smoothly takes over at the right column
        tl.to(
          rightStream,
          {
            x: "0px",
            opacity: 1,
            scale: 1,
            duration: 0.22,
            ease: "power3.out",
          },
          0.28
        );

        // =========================================================
        // STEP 3: DUAL-STREAM VERTICAL PARALLAX SCROLL (0.48 to 1.00)
        // "baki sab sahi hai animation me"
        // =========================================================
        tl.to(
          leftStream,
          {
            y: "-58%",
            ease: "none",
            duration: 0.52,
          },
          0.48
        );

        tl.to(
          rightStream,
          {
            y: "-46%",
            ease: "none",
            duration: 0.52,
          },
          0.48
        );
      });

      // Mobile (<1024px): Smooth in-place entrance reveal without pinning
      mm.add("(max-width: 1023px)", () => {
        const cards = sectionRef.current?.querySelectorAll(".why-steel-card-mobile");
        cards?.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => {
      ScrollTrigger.getById("whySteelDualStreamTrigger")?.kill(true);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F6] text-[#0F1114] border-b border-[#E2E8F0] select-none"
    >
      {/* 4 Subtle Architectural Guideline Columns (Exact from ani4.mp4 Reference) */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:grid grid-cols-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-r border-[#E2E8F0]/80 h-full" />
        <div className="border-r border-[#E2E8F0]/80 h-full" />
        <div className="border-r border-[#E2E8F0]/80 h-full" />
        <div className="h-full" />
      </div>

      {/* ============================================================
          DESKTOP ONLY: PINNED WRAPPER (Pinned via inner wrapper to avoid root reparenting)
          ============================================================ */}
      <div
        ref={pinWrapperRef}
        className="hidden lg:block relative w-full h-screen overflow-hidden"
      >
        <div className="relative z-10 w-full h-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
          
          {/* 1. Left Stream of Floating Architectural Cards (Slightly larger, flush edge-to-edge) */}
          <div
            ref={leftStreamRef}
            className="absolute left-2 xl:left-4 w-[350px] xl:w-[395px] z-20 flex flex-col gap-10 xl:gap-14 will-change-transform"
          >
            {leftItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl xl:rounded-3xl border border-[#E2E8F0] shadow-[0_12px_32px_rgba(15,17,20,0.06)] hover:shadow-[0_20px_44px_rgba(30,99,216,0.14)] hover:border-[#1E63D8]/40 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Visual Image with Flush Edge-to-Edge Ratio (No outer margin/padding) */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1280px) 350px, 395px"
                  />
                  {/* Subtle Top-Right Icon Badge */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/95 backdrop-blur-md text-[#1E63D8] border border-white/60 shadow-md flex items-center justify-center">
                    {item.icon}
                  </div>
                  {/* Step Chip */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-[#0F1114]/85 backdrop-blur-sm text-white text-[11px] font-mono font-bold tracking-wider shadow-sm">
                    {item.step}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading font-black text-sm xl:text-base uppercase tracking-tight text-[#0F1114] group-hover:text-[#1E63D8] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[#1E63D8] font-black text-sm group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Pinned Center Stage: Split Card Entrance + Center Split + Revealed Headline */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10 text-center px-4">
            
            {/* The Center Split Card: Enters center first, then splits outwards into two halves */}
            <div
              ref={centerHeroCardRef}
              className="absolute z-30 w-[360px] sm:w-[400px] xl:w-[440px] aspect-[4/5] flex items-center justify-center will-change-transform pointer-events-auto select-none"
            >
              {/* Left Half of Split Card */}
              <div
                ref={splitLeftRef}
                className="relative w-1/2 h-full overflow-hidden rounded-l-2xl xl:rounded-l-3xl border-y border-l border-[#CBD5E1] bg-white shadow-[-12px_24px_48px_rgba(15,17,20,0.12)] will-change-transform"
              >
                <div className="absolute top-0 left-0 w-[360px] sm:w-[400px] xl:w-[440px] h-full flex flex-col justify-between overflow-hidden">
                  <div className="relative w-full h-[64%] overflow-hidden bg-slate-100">
                    <Image
                      src="/why-choose-customisable-main.jpg"
                      alt="Auzie Steel Light Gauge Framing"
                      fill
                      className="object-cover"
                      sizes="440px"
                      priority
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-[#1E63D8] shadow-sm">
                      AUZIE STEEL
                    </div>
                  </div>

                  <div className="text-left p-4 space-y-1">
                    <span className="text-[10px] font-bold font-label tracking-widest text-[#1E63D8] uppercase">
                      6 ADVANTAGES
                    </span>
                    <h3 className="font-heading font-black text-sm xl:text-base uppercase text-[#0F1114] leading-tight">
                      Why Light Gauge Steel?
                    </h3>
                    <p className="text-[11px] text-[#64748B] line-clamp-2">
                      Cold-formed Truecore® precision framing.
                    </p>
                  </div>

                </div>
              </div>

              {/* Right Half of Split Card */}
              <div
                ref={splitRightRef}
                className="relative w-1/2 h-full overflow-hidden rounded-r-2xl xl:rounded-r-3xl border-y border-r border-[#CBD5E1] bg-white shadow-[12px_24px_48px_rgba(15,17,20,0.12)] will-change-transform"
              >
                <div className="absolute top-0 -left-[180px] sm:-left-[200px] xl:-left-[220px] w-[360px] sm:w-[400px] xl:w-[440px] h-full flex flex-col justify-between overflow-hidden">
                  <div className="relative w-full h-[64%] overflow-hidden bg-slate-100">
                    <Image
                      src="/why-choose-customisable-main.jpg"
                      alt="Auzie Steel Light Gauge Framing"
                      fill
                      className="object-cover"
                      sizes="440px"
                      priority
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-[#0F1114]/80 text-white text-[11px] font-mono font-bold">
                      01 / 06
                    </div>
                  </div>

                  <div className="text-left p-4 space-y-1">
                    <span className="text-[10px] font-bold font-label tracking-widest text-[#1E63D8] uppercase">
                      6 ADVANTAGES
                    </span>
                    <h3 className="font-heading font-black text-sm xl:text-base uppercase text-[#0F1114] leading-tight">
                      Why Light Gauge Steel?
                    </h3>
                    <p className="text-[11px] text-[#64748B] line-clamp-2">
                      Cold-formed Truecore® precision framing.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Revealed Center Typography (Sits behind the split card, revealed as the card splits) */}
            <div
              ref={centerTypographyRef}
              className="max-w-md xl:max-w-lg space-y-4 will-change-transform"
            >
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CBD5E1] shadow-sm pointer-events-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
                <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
                  WHY LIGHT GAUGE STEEL
                </span>
              </div>

              {/* Center Main Editorial Heading */}
              <h2 className="text-4xl xl:text-5xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.08]">
                Why light
                <br />
                <span className="text-[#1E63D8]">gauge steel?</span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-sm mx-auto font-normal">
                Precision cold-formed Truecore® framing engineered for higher tolerances, rapid site assembly, and generational durability.
              </p>

              {/* Minimal Center Circle Badge (Matching Reference ani4.mp4 circular CTA) */}
              <div className="pt-2 flex justify-center pointer-events-auto">
                <Link
                  href="/steel-frames"
                  className="w-24 h-24 rounded-full border border-[#CBD5E1] hover:border-[#1E63D8] bg-white/70 hover:bg-white backdrop-blur-sm shadow-sm flex flex-col items-center justify-center text-center p-2 transition-all duration-300 hover:scale-105 group"
                >
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#0F1114] uppercase group-hover:text-[#1E63D8]">
                    6 CORE
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-[#64748B] uppercase">
                    ADVANTAGES
                  </span>
                  <span className="text-xs text-[#1E63D8] mt-0.5 group-hover:translate-y-0.5 transition-transform">
                    ↓
                  </span>
                </Link>
              </div>

            </div>
          </div>

          {/* 3. Right Stream of Floating Architectural Cards (Slightly larger, flush edge-to-edge) */}
          <div
            ref={rightStreamRef}
            className="absolute right-4 xl:right-8 w-[350px] xl:w-[395px] z-20 flex flex-col gap-10 xl:gap-14 will-change-transform"
          >
            {rightItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl xl:rounded-3xl border border-[#E2E8F0] shadow-[0_12px_32px_rgba(15,17,20,0.06)] hover:shadow-[0_20px_44px_rgba(30,99,216,0.14)] hover:border-[#1E63D8]/40 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Visual Image with Flush Edge-to-Edge Ratio (No outer margin/padding) */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1280px) 350px, 395px"
                  />
                  {/* Subtle Top-Right Icon Badge */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/95 backdrop-blur-md text-[#1E63D8] border border-white/60 shadow-md flex items-center justify-center">
                    {item.icon}
                  </div>
                  {/* Step Chip */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-[#0F1114]/85 backdrop-blur-sm text-white text-[11px] font-mono font-bold tracking-wider shadow-sm">
                    {item.step}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading font-black text-sm xl:text-base uppercase tracking-tight text-[#0F1114] group-hover:text-[#1E63D8] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[#1E63D8] font-black text-sm group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>



        </div>
      </div>

      {/* ============================================================
          MOBILE & TABLET: CLEAN STAGGERED ACCESSIBLE GRID (< 1024px)
          ============================================================ */}
      <div className="block lg:hidden relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        
        {/* Mobile Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CBD5E1] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
              WHY LIGHT GAUGE STEEL
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
            Why light <span className="text-[#1E63D8]">gauge steel?</span>
          </h2>

          <p className="text-sm text-[#64748B] leading-relaxed">
            Explore the 6 core structural and environmental advantages that set light gauge steel apart.
          </p>
        </div>

        {/* Mobile 2-Column Responsive Card Grid (Flush edge-to-edge images) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="why-steel-card-mobile group bg-white rounded-2xl border border-[#E2E8F0] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/95 backdrop-blur-md text-[#1E63D8] shadow-md flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-[#0F1114]/85 backdrop-blur-sm text-white text-[11px] font-mono font-bold shadow-sm">
                  {item.step}
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2">
                <h3 className="font-heading font-black text-base uppercase text-[#0F1114]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
