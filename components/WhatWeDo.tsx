"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhatWeDo3DViewer from "@/components/WhatWeDo3DViewer";

interface WhatWeDoItem {
  step: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badgeLabel: string;
  keyPoints: string[];
  ctaText: string;
  ctaHref: string;
  modelType: "custom-designs" | "fabrications" | "installations" | "our-promise";
}

const items: WhatWeDoItem[] = [
  {
    step: "01",
    category: "DESIGN & ENGINEERING",
    title: "Custom designs",
    tagline: "Precision 3D CAD & BIM digital detailing for any architectural design.",
    description:
      "Our computer-controlled machinery manufactures bespoke light gauge steel frames directly from CAD/BIM models with millimeter accuracy. Create cantilevers, double-height ceiling voids, and open-plan spans with complete structural confidence.",
    imageSrc: "/what-we-do-custom-designs.jpg",
    imageAlt: "Custom light gauge steel home framing design",
    badgeLabel: "BESPOKE ARCHITECTURAL CAD",
    keyPoints: [
      "Precision 3D CAD & BIM digital detailing",
      "Full flexibility for any architectural residential plan",
      "Millimeter-accurate tolerances from foundation to roof",
    ],
    ctaText: "LEARN MORE ABOUT CUSTOM STEEL",
    ctaHref: "/steel-frames",
    modelType: "custom-designs",
  },
  {
    step: "02",
    category: "MANUFACTURING & FABRICATION",
    title: "Fabrications",
    tagline: "Automated roll-forming minimizes site delays with zero timber waste.",
    description:
      "Manufactured with high-tensile BlueScope Truecore® steel, our structural framing will not rot, warp, twist, shrink or sag over decades of building life. 100% immune to termite infestation, moisture, and fungal decay.",
    imageSrc: "/what-we-do-fabrications.jpg",
    imageAlt: "Automated light gauge steel frame fabrication facility",
    badgeLabel: "CNC AUTOMATED ROLL-FORMING",
    keyPoints: [
      "Manufactured with high-tensile BlueScope Truecore® steel",
      "Automated roll-forming minimizes site delays & waste",
      "Engineered tough: 100% termite-proof & non-combustible",
    ],
    ctaText: "EXPLORE OUR FABRICATIONS",
    ctaHref: "/steel-frames",
    modelType: "fabrications",
  },
  {
    step: "03",
    category: "SITE ASSEMBLY",
    title: "Installations",
    tagline: "Lightweight sequenced packs for effortless, rapid site assembly.",
    description:
      "Our lightweight steel framing packs arrive directly to site in sequenced, colour-coded bundles. Installation requires significantly less crane time, smaller onsite crews, and minimal manual lifting, keeping your construction weeks ahead of schedule.",
    imageSrc: "/what-we-do-installations.jpg",
    imageAlt: "Easy installation of light gauge steel frames on site",
    badgeLabel: "LIGHTWEIGHT & EFFORTLESS ASSEMBLY",
    keyPoints: [
      "Significantly lighter than traditional timber framing",
      "Pre-punched service holes for rapid plumbing & electricals",
      "Straight, true members make fixing plasterboard seamless",
    ],
    ctaText: "DISCOVER EASY INSTALLATION",
    ctaHref: "/steel-frames",
    modelType: "installations",
  },
  {
    step: "04",
    category: "GUARANTEED DELIVERY",
    title: "Our promise",
    tagline: "End-to-end crane truck delivery schedules you can depend on.",
    description:
      "Our design-to-delivery service guarantees your framing is engineered, roll-formed, quality checked, and delivered to your jobsite in exact construction stages so your project stays on schedule and on budget.",
    imageSrc: "/what-we-do-our-promise.jpg",
    imageAlt: "On-time direct to site steel frame delivery",
    badgeLabel: "DIRECT TO SITE LOGISTICS",
    keyPoints: [
      "Complete design-to-site crane truck logistics",
      "Guaranteed delivery schedules to keep projects on track",
      "Dedicated technical and engineering support on call",
    ],
    ctaText: "CONTACT US TODAY",
    ctaHref: "/contact",
    modelType: "our-promise",
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const infoRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP & TABLET (>1024px): Pinned Signature "services.mp4" Architecture
      mm.add("(min-width: 1024px)", () => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        const infos = infoRef.current.filter(Boolean) as HTMLDivElement[];
        const section = sectionRef.current;
        const pinWrapper = pinWrapperRef.current;

        if (cards.length === 0 || !section || !pinWrapper) return;

        const totalStages = items.length;

        // Position coordinates matching services.mp4:
        // Center Main Stage: x: 0, y: 0, scale: 1
        // Top-Left Thumbnail Slot (Previous Completed Stage): x: -380, y: -220, scale: 0.28
        // Bottom-Right Thumbnail Slot (Next Upcoming Stage): x: 380, y: 220, scale: 0.28

        // Initial setup:
        // Card 0: in Center Main Stage
        gsap.set(cards[0], {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
          zIndex: 20,
        });

        // Cards 1, 2, 3 start in Bottom-Right thumbnail queue
        cards.slice(1).forEach((card, idx) => {
          gsap.set(card, {
            xPercent: 120,
            yPercent: 75,
            scale: idx === 0 ? 0.32 : 0.22,
            opacity: idx === 0 ? 1 : 0,
            zIndex: 10 - idx,
          });
        });

        // Info blocks: Info 0 visible, others hidden
        gsap.set(infos[0], { y: 0, opacity: 1 });
        infos.slice(1).forEach((info) => {
          gsap.set(info, { y: 40, opacity: 0 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "whatWeDoServicesTrigger",
            trigger: section,
            start: "top top",
            end: () => `+=${(totalStages - 1) * 1300}`,
            pin: pinWrapper,
            pinSpacing: true,
            scrub: 1.15,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const current = Math.min(
                totalStages - 1,
                Math.floor(p * totalStages + 0.05)
              );
              setActiveStage(current);
            },
          },
        });

        // Signature Choreography from services.mp4:
        // For each stage transition:
        // 1. Current main card shrinks & moves to Top-Left slot (becoming past thumbnail)
        // 2. Next card in Bottom-Right expands & glides to Center Stage (becoming active main card)
        // 3. Right-hand Info block smoothly cross-fades
        // 4. Upcoming thumbnail fades into Bottom-Right slot
        for (let i = 1; i < totalStages; i++) {
          const prevCard = cards[i - 1];
          const currCard = cards[i];
          const prevInfo = infos[i - 1];
          const currInfo = infos[i];
          const nextCard = i + 1 < totalStages ? cards[i + 1] : null;

          // Comfortable dwell time to read and rotate 3D model
          tl.to({}, { duration: 0.35 });

          const stepLabel = `stage_${i}`;
          tl.addLabel(stepLabel);

          // 1. Previous card shrinks into Top-Left completed thumbnail
          tl.to(
            prevCard,
            {
              xPercent: -120,
              yPercent: -75,
              scale: 0.30,
              opacity: 0.85,
              zIndex: 15,
              ease: "power2.inOut",
              duration: 1.2,
            },
            stepLabel
          );

          // If there was an older card in top-left, gracefully fade it off
          if (i >= 2) {
            const olderCard = cards[i - 2];
            tl.to(
              olderCard,
              {
                opacity: 0,
                scale: 0.18,
                duration: 0.8,
                ease: "power2.inOut",
              },
              stepLabel
            );
          }

          // 2. Current card in Bottom-Right expands and glides to Center Stage
          tl.to(
            currCard,
            {
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              opacity: 1,
              zIndex: 25,
              ease: "power2.inOut",
              duration: 1.2,
            },
            stepLabel
          );

          // 3. Information block cross-fade
          tl.to(
            prevInfo,
            {
              y: -30,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
            },
            stepLabel
          );

          tl.to(
            currInfo,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
            },
            `${stepLabel}+=0.35`
          );

          // 4. Next card in queue prepares in Bottom-Right slot
          if (nextCard) {
            tl.to(
              nextCard,
              {
                scale: 0.32,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              `${stepLabel}+=0.4`
            );
          }
        }

        // Final hold time at stage 4 before unpinning
        tl.to({}, { duration: 0.45 });
      });

      // MOBILE (<1024px): Responsive Interactive Cards with Smooth Reveal
      mm.add("(max-width: 1023px)", () => {
        const mobileCards = sectionRef.current?.querySelectorAll(".what-we-do-mobile-card");
        mobileCards?.forEach((card) => {
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
                start: "top 85%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => {
      ScrollTrigger.getById("whatWeDoServicesTrigger")?.kill(true);
      ctx.revert();
    };
  }, []);

  const handleStepJump = (idx: number) => {
    const st = ScrollTrigger.getById("whatWeDoServicesTrigger");
    if (!st) return;
    const scrollDistance = st.end - st.start;
    const targetScroll = st.start + (idx / (items.length - 1)) * scrollDistance;
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
      {/* ============================================================
          DESKTOP & TABLET: PINNED SERVICES.MP4 ANIMATION CHOREOGRAPHY
          ============================================================ */}
      <div
        ref={pinWrapperRef}
        className="hidden lg:flex relative w-full h-screen min-h-[760px] max-h-[1020px] flex-col justify-between overflow-hidden"
      >
        {/* Subtle Architectural Dot Pattern Background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Top Fixed Header Bar with Stage Selector */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-3 flex items-center justify-between border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBD5E1] shadow-sm mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
              <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
                WHAT WE DO · SERVICES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-tight">
              END-TO-END LIGHT GAUGE STEEL CAPABILITIES
            </h2>
          </div>

          {/* Interactive Stage Indicator Pills */}
          <div className="flex items-center gap-2">
            {items.map((item, idx) => (
              <button
                key={item.step}
                onClick={() => handleStepJump(idx)}
                className={`group px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                  idx === activeStage
                    ? "bg-[#1E63D8] text-white border-[#1E63D8] shadow-md shadow-[#1E63D8]/20 scale-105"
                    : "bg-white text-[#64748B] border-[#CBD5E1] hover:border-[#1E63D8] hover:text-[#0F1114]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    idx === activeStage ? "bg-white animate-pulse" : "bg-[#1E63D8]"
                  }`}
                />
                <span>0{idx + 1}</span>
                <span className="font-sans font-semibold text-[11px] uppercase hidden xl:inline">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================
            MAIN INTERACTIVE STAGE ARENA
            ============================================================ */}
        <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center overflow-visible">
          
          {/* Main Card Stage Center Anchor */}
          <div className="relative w-[440px] xl:w-[480px] h-[520px] xl:h-[560px] flex items-center justify-center">
            
            {/* The 4 Staging Cards (Glide between Center, Top-Left, Bottom-Right) */}
            {items.map((item, idx) => (
              <div
                key={item.step}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full rounded-[28px] bg-white border border-[#CBD5E1] shadow-[0_20px_50px_rgba(15,17,20,0.12)] overflow-hidden flex flex-col justify-between p-4 xl:p-5 transform-gpu will-change-transform"
                style={{
                  transformOrigin: "center center",
                }}
              >
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#1E63D8] via-[#60A5FA] to-[#1E63D8] pointer-events-none" />

                {/* Card Top Pill Badge */}
                <div className="flex items-center justify-between border-b border-[#F1F3F5] pb-2.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1E63D8]" />
                    <span className="text-xs font-mono font-bold text-[#1E63D8] tracking-widest uppercase">
                      STAGE {item.step} · {item.badgeLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8A929B] font-semibold">
                    AUZIE STEEL
                  </span>
                </div>

                {/* 3D WebGL Interactive Model Viewer (Rotates in 3D with mouse / touch) */}
                <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#F8FAFD] via-[#EDF4FB] to-[#E1EDFA] border border-slate-200/90 shadow-inner group">
                  
                  {/* Subtle Studio Spotlight Glow */}
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.95)_0%,rgba(235,243,252,0.5)_65%,transparent_100%)]" />

                  {/* Three.js Interactive 3D Model with real-time rotation */}
                  <WhatWeDo3DViewer
                    type={item.modelType}
                    badgeLabel={item.badgeLabel}
                    step={item.step}
                  />

                  {/* 3D Interactive Rotate Hint Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#CBD5E1] text-[10px] font-mono font-bold text-[#1E63D8] shadow-sm pointer-events-none flex items-center gap-1.5">
                    <span className="text-xs">⟳</span>
                    <span>DRAG TO ROTATE 3D</span>
                  </div>
                </div>

                {/* Bottom Luxury Specification Strip */}
                <div className="pt-2.5 border-t border-[#F1F3F5] flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-[#0F1114] tracking-wider uppercase font-label">
                    100% BLUESCOPE TRUECORE®
                  </span>
                  <span className="text-[#64748B] font-semibold">
                    AS/NZS 4600 CERTIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ============================================================
              RIGHT INFORMATION DECK (Cross-fades smoothly beside the card)
              ============================================================ */}
          <div className="absolute right-4 xl:right-12 w-[340px] xl:w-[420px] h-[520px] xl:h-[560px] pointer-events-none flex items-center">
            {items.map((item, idx) => (
              <div
                key={item.step}
                ref={(el) => {
                  infoRef.current[idx] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center space-y-4 pointer-events-auto will-change-transform"
              >
                {/* Stage Tag */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#1E63D8] tracking-widest uppercase">
                    STAGE {item.step} · {item.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-3xl xl:text-4xl font-heading font-black uppercase text-[#0F1114] tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm xl:text-base font-semibold text-[#1E63D8] leading-snug">
                    {item.tagline}
                  </p>
                </div>

                {/* Detailed Description */}
                <p className="text-xs xl:text-sm text-[#475569] leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* 3 Key Points */}
                <div className="space-y-2 pt-1">
                  {item.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#0F1114] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Action Button */}
                <div className="pt-2">
                  <Link
                    href={item.ctaHref}
                    className="group inline-flex items-center gap-3 text-sm font-bold text-[#0F1114] hover:text-[#1E63D8] transition-colors duration-300"
                  >
                    <span className="h-[2px] w-7 bg-[#0F1114] group-hover:w-12 group-hover:bg-[#1E63D8] transition-all duration-300 rounded-full" />
                    <span className="tracking-wide uppercase font-label text-xs sm:text-sm">
                      {item.ctaText}
                    </span>
                    <span className="text-[#1E63D8] group-hover:translate-x-1.5 transition-transform duration-300 font-black">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ============================================================
              UPCOMING STAGE PREVIEW THUMBNAIL (Bottom-Right Corner)
              ============================================================ */}
          {activeStage < items.length - 1 && (
            <div
              onClick={() => handleStepJump(activeStage + 1)}
              className="absolute right-4 xl:right-10 bottom-4 xl:bottom-6 z-30 group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="relative w-[110px] xl:w-[125px] h-[130px] xl:h-[150px] rounded-2xl overflow-hidden bg-white border border-[#CBD5E1] shadow-xl">
                <Image
                  src={items[activeStage + 1].imageSrc}
                  alt={items[activeStage + 1].imageAlt}
                  fill
                  className="object-cover"
                  sizes="125px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Next Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#1E63D8] text-white text-[9px] font-mono font-bold uppercase shadow-sm">
                  NEXT · 0{activeStage + 2}
                </div>

                <div className="absolute bottom-2 inset-x-2 text-white">
                  <p className="text-[10px] font-mono uppercase font-bold truncate">
                    {items[activeStage + 1].title}
                  </p>
                  <span className="text-[9px] text-white/80 font-mono">
                    Click to view →
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              PREVIOUS STAGE THUMBNAIL (Top-Left Corner)
              ============================================================ */}
          {activeStage > 0 && (
            <div
              onClick={() => handleStepJump(activeStage - 1)}
              className="absolute left-4 xl:left-10 top-28 xl:top-32 z-30 group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="relative w-[100px] xl:w-[115px] h-[120px] xl:h-[135px] rounded-2xl overflow-hidden bg-white border border-[#CBD5E1] shadow-lg opacity-90 hover:opacity-100">
                <Image
                  src={items[activeStage - 1].imageSrc}
                  alt={items[activeStage - 1].imageAlt}
                  fill
                  className="object-cover"
                  sizes="115px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Prev Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0F1114]/90 text-white text-[9px] font-mono font-bold uppercase shadow-sm">
                  PREV · 0{activeStage}
                </div>

                <div className="absolute bottom-2 inset-x-2 text-white">
                  <p className="text-[10px] font-mono uppercase font-bold truncate">
                    {items[activeStage - 1].title}
                  </p>
                  <span className="text-[9px] text-white/80 font-mono">
                    ← Revisit
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Minimal Status Bar */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-[#64748B] font-mono flex items-center justify-between border-t border-[#E2E8F0]">
          <span className="flex items-center gap-1.5 font-semibold text-[#0F1114]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
            SCROLL TO EXPLORE SERVICES · 3D INTERACTIVE MODELS
          </span>
          <span className="font-bold text-[#0F1114]">
            STAGE 0{activeStage + 1} OF 0{items.length} ACTIVE
          </span>
        </div>
      </div>

      {/* ============================================================
          MOBILE & TABLET: RESPONSIVE INTERACTIVE CARDS (< 1024px)
          ============================================================ */}
      <div className="block lg:hidden relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Mobile Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CBD5E1] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114] uppercase">
              WHAT WE DO · SERVICES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
            END-TO-END LIGHT GAUGE STEEL CAPABILITIES
          </h2>

          <p className="text-sm text-[#64748B] leading-relaxed">
            From precision roll-forming to direct site delivery, explore our 4 core structural framing services with interactive 3D models.
          </p>
        </div>

        {/* Mobile Card Stack */}
        <div className="space-y-10">
          {items.map((item) => (
            <div
              key={item.step}
              className="what-we-do-mobile-card bg-white rounded-3xl border border-[#CBD5E1] shadow-lg overflow-hidden flex flex-col"
            >
              {/* 3D Model Card */}
              <div className="relative w-full h-[320px] bg-gradient-to-b from-[#F8FAFD] via-[#EDF4FB] to-[#E1EDFA] border-b border-[#CBD5E1] overflow-hidden">
                <WhatWeDo3DViewer
                  type={item.modelType}
                  badgeLabel={item.badgeLabel}
                  step={item.step}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 text-[10px] font-mono font-bold text-[#1E63D8] shadow-sm">
                  STAGE {item.step} · {item.badgeLabel}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/75 text-white text-[9px] font-mono font-bold">
                  ⟳ DRAG TO ROTATE 3D
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-bold font-label tracking-widest text-[#1E63D8] uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-black text-2xl uppercase text-[#0F1114] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#1E63D8] mt-1">
                    {item.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  {item.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-[#0F1114]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={item.ctaHref}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1E63D8] hover:underline"
                  >
                    <span>{item.ctaText}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
