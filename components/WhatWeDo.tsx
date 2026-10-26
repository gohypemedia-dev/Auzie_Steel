"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import WhatWeDo3DViewer from "@/components/WhatWeDo3DViewer";

interface WhatWeDoItem {
  step: string;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badgeLabel: string;
  keyPoints: string[];
  ctaText: string;
  ctaHref: string;
  imageOnLeft: boolean;
  parallaxSpeed: number; // Parallax multiplier for depth
  modelType: "custom-designs" | "fabrications" | "installations" | "our-promise";
}

const items: WhatWeDoItem[] = [
  {
    step: "01",
    category: "DESIGN & ENGINEERING",
    title: "Custom designs",
    description:
      "Our machinery is state of the art and can customise steel frames to suit any home design.",
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
    imageOnLeft: true,
    parallaxSpeed: -0.35,
    modelType: "custom-designs",
  },
  {
    step: "02",
    category: "MANUFACTURING & FABRICATION",
    title: "Fabrications",
    description:
      "Our prefabricated frames are designed tough and last forever, while minimising manufacturing times to keep your project on time and on budget.",
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
    imageOnLeft: false,
    parallaxSpeed: -0.55,
    modelType: "fabrications",
  },
  {
    step: "03",
    category: "SITE ASSEMBLY",
    title: "Installations",
    description:
      "As our frames are made from light gauge steel, they can be installed easily and with minimal effort.",
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
    imageOnLeft: true,
    parallaxSpeed: -0.4,
    modelType: "installations",
  },
  {
    step: "04",
    category: "GUARANTEED DELIVERY",
    title: "Our promise",
    description:
      "Our design to delivery service gives you the opportunity to have your next project designed, manufactured and delivered on site in efficient timeframes.",
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
    imageOnLeft: false,
    parallaxSpeed: -0.5,
    modelType: "our-promise",
  },
];

const modelStudioTheme = {
  bgGradient: "bg-gradient-to-b from-[#F8FAFD] via-[#EDF4FB] to-[#E1EDFA]",
  border: "border-slate-200/90 hover:border-[#1E63D8]/40",
  shadow: "shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#1E63D8]/10",
  accentDot: "bg-[#1E63D8]",
  accentText: "text-slate-700",
  badgeBg: "bg-white/95",
  badgeBorder: "border-slate-200/90",
};

interface ParallaxCardProps {
  item: WhatWeDoItem;
  scrollYOffset: number;
}

function ParallaxCard({ item, scrollYOffset }: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState("");
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTiltStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`
    );
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)");
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const scrollTranslateY = scrollYOffset * item.parallaxSpeed;

  return (
    <div
      style={{
        transform: `translateY(${scrollTranslateY.toFixed(1)}px)`,
        transition: "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className="will-change-transform"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: tiltStyle || "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          transition: tiltStyle ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
        }}
        className="relative overflow-hidden p-8 sm:p-10 lg:p-12 bg-white/95 border border-slate-200/90 hover:border-[#1E63D8]/40 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#1E63D8]/10 transition-all duration-300 rounded-[12px] group"
      >
        {/* Subtle Radial Shine on Mouse Hover */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[12px] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(30, 99, 216, ${glarePosition.opacity}), transparent 70%)`,
          }}
        />

        {/* Step & Category Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E63D8]/10 border border-[#1E63D8]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1E63D8]">
              {item.category}
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-slate-300 group-hover:text-[#1E63D8]/40 transition-colors">
            {item.step}
          </span>
        </div>

        {/* Card Title in Bold Deep Navy (#020618) */}
        <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#020618] tracking-wide mb-3">
          {item.title}
        </h3>

        {/* Card Description */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-normal">
          {item.description}
        </p>

        {/* Key Feature Highlights */}
        <ul className="space-y-3 mb-8 pt-5 border-t border-slate-100">
          {item.keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="w-5 h-5 rounded-full bg-[#1E63D8]/10 text-[#1E63D8] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✓
              </span>
              <span className="font-medium">{point}</span>
            </li>
          ))}
        </ul>

        {/* Action Button in Midnight Navy #0F172B (No color change on hover) */}
        <div>
          <Link
            href={item.ctaHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0F172B] hover:bg-[#0F172B] shadow-md shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-transform group/btn"
          >
            <span>{item.ctaText}</span>
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollYOffset, setScrollYOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            if (rect.top < windowH && rect.bottom > 0) {
              const progress = (windowH - rect.top) / (windowH + rect.height);
              setScrollYOffset((progress - 0.5) * 90);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-white text-slate-800 overflow-hidden border-b border-slate-200"
    >

      {/* Ambient Dark Blue Subtle Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[#071e4a]/[0.035] rounded-full blur-3xl pointer-events-none will-change-transform"
        style={{
          transform: `translate(-50%, calc(-50% + ${(scrollYOffset * 0.2).toFixed(1)}px))`,
          transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E63D8]/10 border border-[#1E63D8]/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E63D8]">
              WHAT WE DO
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black uppercase tracking-tight text-[#020618] leading-[1.12]">
            END-TO-END LIGHT GAUGE STEEL CAPABILITIES
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From precision roll-forming to direct site delivery, our four-stage structural framing solution ensures exceptional speed, durability, and cost efficiency.
          </p>
        </div>

        {/* 4 Alternating Zigzag Rows */}
        <div className="space-y-20 sm:space-y-28 lg:space-y-32">
          {items.map((item) => {
            return (
              <div
                key={item.step}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* INTERACTIVE 3D ANIMATED STEEL MODEL WITH CLEAN LIGHT STUDIO BACKGROUND (NO GRID) */}
                <div
                  className={`relative group ${
                    item.imageOnLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Clean Light Studio Card Container with 12px border radius */}
                  <div
                    className={`relative w-full rounded-[12px] overflow-hidden ${modelStudioTheme.bgGradient} border ${modelStudioTheme.border} ${modelStudioTheme.shadow} transition-all duration-500`}
                  >
                    {/* Soft Radial Center Illumination (Spotlight on Model, completely grid-free) */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.95)_0%,rgba(235,243,252,0.5)_65%,transparent_100%)]" />

                    {/* Subtle Ethereal Sky Ambient Glow (Soft, non-dark, zero muddy colors) */}
                    <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-sky-400/12 blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />

                    {/* 3D WebGL Three.js interactive canvas container */}
                    <WhatWeDo3DViewer
                      type={item.modelType}
                      badgeLabel={item.badgeLabel}
                      step={item.step}
                    />
                  </div>
                </div>

                {/* PARALLAX CARD with 12px border radius */}
                <div className={item.imageOnLeft ? "lg:order-2" : "lg:order-1"}>
                  <ParallaxCard item={item} scrollYOffset={scrollYOffset} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-20 pt-8 text-center border-t border-slate-200">
          <Link
            href="/steel-frames"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0F172B] hover:bg-[#0F172B] shadow-md shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-transform group"
          >
            <span>LEARN MORE</span>
            <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
