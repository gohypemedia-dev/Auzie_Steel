"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ServiceItem {
  step: string;
  category: string;
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  keyPoints: string[];
  ctaText: string;
  ctaHref: string;
}

const serviceItems: ServiceItem[] = [
  {
    step: "01",
    category: "DESIGN & BIM",
    tag: "3D CAD PRECISION",
    title: "CUSTOM DESIGNS",
    description:
      "Engineered bespoke light gauge steel frames generated directly from CAD/BIM models with millimeter tolerances. Build cantilevers, double-height voids, and expansive open-plan spans with complete structural confidence.",
    imageSrc: "/what-we-do-custom-designs.jpg",
    imageAlt: "Custom light gauge steel home framing design",
    keyPoints: [
      "Precision 3D CAD & BIM digital detailing",
      "Full flexibility for bespoke residential plans",
      "Millimeter roll-forming accuracy from slab to truss",
    ],
    ctaText: "LEARN MORE ABOUT CUSTOM STEEL",
    ctaHref: "/steel-frames",
  },
  {
    step: "02",
    category: "FABRICATION",
    tag: "BLUESCOPE TRUECORE®",
    title: "FABRICATIONS",
    description:
      "Automated CNC roll-formed using high-tensile BlueScope Truecore® steel. Will not rot, warp, twist, shrink or sag over decades of building life. 100% immune to termite infestation, moisture, and fire hazards.",
    imageSrc: "/what-we-do-fabrications.jpg",
    imageAlt: "Automated light gauge steel frame fabrication facility",
    keyPoints: [
      "Manufactured from high-tensile BlueScope Truecore® steel",
      "Automated roll-forming minimizes site delays & waste",
      "Engineered tough: 100% termite-proof & non-combustible",
    ],
    ctaText: "EXPLORE OUR FABRICATIONS",
    ctaHref: "/steel-frames",
  },
  {
    step: "03",
    category: "ASSEMBLY",
    tag: "RAPID SITE ERECTION",
    title: "INSTALLATIONS",
    description:
      "Sequenced, colour-coded framing packs arrive ready for rapid onsite erection. Requires significantly less crane time, smaller onsite crews, and minimal manual lifting, keeping construction weeks ahead of schedule.",
    imageSrc: "/what-we-do-installations.jpg",
    imageAlt: "Easy installation of light gauge steel frames on site",
    keyPoints: [
      "Significantly lighter than traditional timber framing",
      "Pre-punched service holes for rapid plumbing & electricals",
      "Straight, true members make fixing plasterboard seamless",
    ],
    ctaText: "DISCOVER EASY INSTALLATION",
    ctaHref: "/steel-frames",
  },
  {
    step: "04",
    category: "LOGISTICS",
    tag: "ON-TIME GUARANTEE",
    title: "OUR PROMISE",
    description:
      "End-to-end design to delivery crane-truck logistics. We ensure your light gauge steel framing is engineered, fabricated, and delivered on site in efficient timeframes so your build stays strictly on schedule and on budget.",
    imageSrc: "/what-we-do-our-promise.jpg",
    imageAlt: "On-time direct to site steel frame delivery",
    keyPoints: [
      "Complete design-to-site crane truck logistics",
      "Guaranteed delivery schedules to keep projects on track",
      "Dedicated technical and engineering support on call",
    ],
    ctaText: "CONTACT US TODAY",
    ctaHref: "/contact",
  },
];

// Precision Engineering Dial SVG (120 radial tick marks, drafting dots, concentric circles)
function EngineeringDial() {
  const numTicks = 120;
  const cx = 450;
  const cy = 450;
  const rTickStart = 370;
  const rTickEnd = 405;
  const rDots = 352;
  const rMajorTickStart = 358;

  const ticks = useMemo(() => {
    const items = [];
    for (let i = 0; i < numTicks; i++) {
      const angleDeg = (i / numTicks) * 360;
      const angleRad = (angleDeg * Math.PI) / 180;
      const isMajor = i % 10 === 0;
      const isDot = i % 2 === 0;

      const start = isMajor ? rMajorTickStart : rTickStart;
      const x1 = cx + start * Math.cos(angleRad);
      const y1 = cy + start * Math.sin(angleRad);
      const x2 = cx + rTickEnd * Math.cos(angleRad);
      const y2 = cy + rTickEnd * Math.sin(angleRad);

      let dotX = 0;
      let dotY = 0;
      if (isDot) {
        dotX = cx + rDots * Math.cos(angleRad);
        dotY = cy + rDots * Math.sin(angleRad);
      }

      items.push({
        x1,
        y1,
        x2,
        y2,
        isMajor,
        isDot,
        dotX,
        dotY,
      });
    }
    return items;
  }, []);

  return (
    <svg
      viewBox="0 0 900 900"
      className="w-[620px] h-[620px] sm:w-[780px] sm:h-[780px] lg:w-[920px] lg:h-[920px] select-none pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer subtle guide circle */}
      <circle cx={cx} cy={cy} r={425} stroke="#E2E8F0" strokeWidth="1" opacity={0.6} />

      {/* Primary dotted drafting circle */}
      <circle
        cx={cx}
        cy={cy}
        r={rDots}
        stroke="#CBD5E1"
        strokeWidth="1.2"
        strokeDasharray="4 6"
        opacity={0.7}
      />

      {/* Inner boundary circle */}
      <circle cx={cx} cy={cy} r={310} stroke="#E2E8F0" strokeWidth="1" opacity={0.4} />

      {/* Radial Ticks & Dots */}
      {ticks.map((t, idx) => (
        <g key={idx}>
          <line
            x1={t.x1.toFixed(1)}
            y1={t.y1.toFixed(1)}
            x2={t.x2.toFixed(1)}
            y2={t.y2.toFixed(1)}
            stroke={t.isMajor ? "#64748B" : "#CBD5E1"}
            strokeWidth={t.isMajor ? 1.8 : 1.1}
            strokeLinecap="round"
          />
          {t.isDot && (
            <circle
              cx={t.dotX.toFixed(1)}
              cy={t.dotY.toFixed(1)}
              r={t.isMajor ? 2.2 : 1.4}
              fill={t.isMajor ? "#64748B" : "#94A3B8"}
            />
          )}
        </g>
      ))}

      {/* Subtle Cardinal Crosshairs */}
      <line x1={cx - 40} y1={cy} x2={cx + 40} y2={cy} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" opacity={0.4} />
      <line x1={cx} y1={cy - 40} x2={cx} y2={cy + 40} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" opacity={0.4} />
    </svg>
  );
}

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const centerTitleRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    const dial = dialRef.current;
    const centerTitle = centerTitleRef.current;
    const cardsTrack = cardsTrackRef.current;
    const bgImage = bgImageRef.current;

    if (!container || !pinSection || !cardsTrack) return;

    const isMobile = window.innerWidth < 768;

    // Mobile fallback: let native horizontal scroll-snap handle with light GSAP fade
    if (isMobile) {
      const ctxMobile = gsap.context(() => {
        if (bgImage) {
          gsap.to(bgImage, {
            opacity: 0,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "top -25%",
              scrub: 0.5,
            },
          });
        }

        gsap.to(dial, {
          rotate: 180,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, container);
      return () => ctxMobile.revert();
    }

    // Desktop/Tablet: Signature Pinned Orbital Scroll Animation
    const ctx = gsap.context(() => {
      // Calculate total horizontal travel distance for cards
      const trackWidth = cardsTrack.scrollWidth;
      const windowWidth = window.innerWidth;
      // Start with cards off to the right, end when last card is past center
      const travelDistance = trackWidth + windowWidth * 0.2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3000",
          pin: pinSection,
          scrub: 1.25,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Compute active card (0 to 3) during cards phase (0.15 to 0.85)
            if (p < 0.25) setActiveCardIndex(0);
            else if (p < 0.45) setActiveCardIndex(1);
            else if (p < 0.68) setActiveCardIndex(2);
            else setActiveCardIndex(3);
          },
        },
      });

      // Phase 1: Center Title & Intro Background Image Fade Out (0% -> 22%)
      tl.to(
        centerTitle,
        {
          opacity: 0,
          scale: 0.9,
          y: -20,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0
      );

      if (bgImage) {
        tl.to(
          bgImage,
          {
            opacity: 0,
            scale: 1.05,
            duration: 0.22,
            ease: "power2.inOut",
          },
          0
        );
      }

      // Dial Continuous Smooth Rotation across entire scroll
      tl.to(
        dial,
        {
          rotate: 220,
          duration: 1,
          ease: "none",
        },
        0
      );

      // Phase 2: Cards Glide Across Orbital Wave (10% -> 95%)
      tl.fromTo(
        cardsTrack,
        { x: windowWidth * 0.75 },
        {
          x: -(trackWidth - windowWidth * 0.35),
          duration: 0.85,
          ease: "power1.inOut",
        },
        0.1
      );

      // Individual Card Organic Tilt/Elevation as they glide (Hardware accelerated, zero CSS conflict)
      cardElementsRef.current.forEach((card, idx) => {
        if (!card) return;
        const isOdd = idx % 2 === 1;
        const baseY = isOdd ? 28 : -24;
        tl.fromTo(
          card,
          {
            y: baseY,
            rotate: isOdd ? 2 : -2,
          },
          {
            y: baseY + (isOdd ? -10 : 10),
            rotate: isOdd ? -1.5 : 1.5,
            duration: 0.85,
            ease: "sine.inOut",
          },
          0.1
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="services-section"
      className="relative w-full bg-[#FAF9F6] text-[#0F1114] border-b border-[#E2E8F0] overflow-hidden"
    >
      {/* ===================================================================
          PINNED STAGE (Viewport View Container)
          =================================================================== */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen min-h-[680px] max-h-[1080px] flex flex-col justify-center overflow-hidden py-6 sm:py-8"
      >
        {/* ===============================================================
            INTRO BACKGROUND IMAGE (Smoothly fades out on scroll along with Center Title)
            =============================================================== */}
        <div
          ref={bgImageRef}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform"
        >
          <Image
            src="/who-we-are-steel-banner-pure.jpg"
            alt="Auzie Steel Services - Precision Structural Steel Framing"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center select-none"
          />
          {/* Subtle architectural tint to harmonize with #FAF9F6 and keep text crystal-clear */}
          <div className="absolute inset-0 bg-[#FAF9F6]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/60 via-transparent to-[#FAF9F6]/85" />
        </div>

        {/* Center Canvas: Circular Precision Dial + Cards Stream */}
        <div className="relative z-10 flex-1 w-full flex items-center justify-center overflow-hidden">
          {/* ===============================================================
              ROTATING BACKGROUND PRECISION DIAL
              =============================================================== */}
          <div
            ref={dialRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none transition-transform will-change-transform"
          >
            <EngineeringDial />
          </div>

          {/* ===============================================================
              PHASE 1: CENTER EDITORIAL TITLE (Fades out smoothly on scroll)
              =============================================================== */}
          <div
            ref={centerTitleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center max-w-xl sm:max-w-2xl px-6 pointer-events-none will-change-transform"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-heading font-black tracking-tight text-[#0F1114] leading-[1.12] mb-3 drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]">
              Our Services
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-lg mx-auto font-medium leading-relaxed drop-shadow-[0_1px_8px_rgba(255,255,255,0.95)]">
              From precision CAD/BIM detailing to high-tensile BlueScope Truecore® roll-forming and direct site delivery across South Australia.
            </p>
          </div>

          {/* ===============================================================
              PHASE 2: ORBITAL CARDS STREAM (Glides across circular gauge)
              =============================================================== */}
          <div
            ref={cardsTrackRef}
            className="relative z-20 flex items-center gap-6 sm:gap-8 md:gap-10 px-6 sm:px-12 md:px-20 will-change-transform overflow-x-auto md:overflow-visible no-scrollbar py-8"
          >
            {serviceItems.map((item, idx) => {
              const isActive = activeCardIndex === idx;

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    cardElementsRef.current[idx] = el;
                  }}
                  className={`shrink-0 w-[300px] sm:w-[340px] md:w-[380px] bg-white rounded-[6px] overflow-hidden flex flex-col justify-between border transform-gpu will-change-transform [backface-visibility:hidden] transition-[border-color,box-shadow] duration-500 ease-out ${isActive
                      ? "border-[#1E63D8]/50 shadow-[0_20px_45px_rgba(30,99,216,0.12)]"
                      : "border-[#E2E8F0] shadow-[0_12px_32px_rgba(15,17,20,0.06)] hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,17,20,0.09)]"
                    }`}
                >
                  {/* Card Visual / Image Container (Flush Edge-to-Edge: Zero Top/Left/Right Padding) */}
                  <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100 group/img border-b border-[#E2E8F0]">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 768px) 300px, 380px"
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Body Content (Title, Description, Highlights, Button) */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    {/* Card Title & Description */}
                    <div className="space-y-2 mb-4">
                      <h3 className="text-lg sm:text-[20px] font-sans font-bold tracking-tight text-[#0F1114] uppercase">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-2 pt-3 border-t border-slate-100 mb-5">
                      {item.keyPoints.slice(0, 2).map((point, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                          <span className="font-medium truncate">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Card CTA Button */}
                    <Link
                      href={item.ctaHref}
                      className="w-full inline-flex items-center justify-center py-3 px-5 rounded-[6px] text-xs font-bold font-label tracking-wider uppercase text-white bg-slate-950 hover:bg-[#1E63D8] shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                    >
                      <span>{item.ctaText}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
