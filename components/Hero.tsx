"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

interface HeroSlide {
  id: string;
  badge: string;
  tagline: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
}

const slides: HeroSlide[] = [
  {
    id: "steel-framing",
    badge: "EXCLUSIVE DISTRIBUTORSHIP · SA & NT",
    tagline: "ARCHITECTURAL CAPABILITY",
    titleLine1: "SOUTH AUSTRALIA'S",
    titleLine2: "PREMIER STEEL FRAMES",
    description:
      "Auzie Steel delivers precision-engineered light gauge steel wall frames and trusses. Manufactured with advanced CNC automation for architectural freedom, high structural integrity, and rapid delivery.",
    imageSrc: "/hero-construction.webp",
    imageAlt: "South Australia Premier Light Gauge Steel Framing Construction",
    ctaText: "EXPLORE PROJECTS",
    ctaHref: "/steel-frames",
  },
  {
    id: "alpha-floor",
    badge: "ENGINEERED FLOOR CASSETTES",
    tagline: "STRUCTURAL INNOVATION",
    titleLine1: "HIGH SPAN STRENGTH",
    titleLine2: "ALPHA FLOOR SYSTEMS",
    description:
      "State-of-the-art acoustic and structural flooring solutions. Zero squeak, high load-bearing capacity, termite-proof, and designed for multi-residential and architectural construction.",
    imageSrc: "/why-choose-customisable-main.jpg",
    imageAlt: "Alpha Floor High Strength Steel Framing System",
    ctaText: "DISCOVER ALPHA FLOOR",
    ctaHref: "/alpha-floor",
  },
  {
    id: "custom-engineering",
    badge: "STATE-OF-THE-ART CAD / BIM",
    tagline: "DESIGN TO DELIVERY",
    titleLine1: "END-TO-END",
    titleLine2: "CUSTOM FABRICATIONS",
    description:
      "From architectural takeoff and BIM digital detailing to precision roll-forming and direct site delivery across South Australia and the Northern Territory.",
    imageSrc: "/who-we-are-steelwork.jpg",
    imageAlt: "Precision Architectural Light Gauge Steelwork Fabrication",
    ctaText: "VIEW SERVICES",
    ctaHref: "/steel-frames",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLSpanElement>(null);
  const textLine2Ref = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageInnerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      gsap.to(imageInnerRef.current, {
        x,
        y,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Cinematic GSAP entrance animation whenever activeSlide changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([badgeRef.current, textLine1Ref.current, textLine2Ref.current, descRef.current, ctaRef.current, tabsRef.current], {
          opacity: 1,
          y: 0,
        });
        if (imageWrapperRef.current) {
          imageWrapperRef.current.style.clipPath = "ellipse(115% 100% at 88% 100%)";
        }
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Text elements initial positions
      gsap.set([textLine1Ref.current, textLine2Ref.current], { y: "110%", opacity: 0 });
      gsap.set(badgeRef.current, { y: 20, opacity: 0 });
      gsap.set(descRef.current, { y: 25, opacity: 0 });
      gsap.set(ctaRef.current, { y: 20, opacity: 0 });

      // 2. Architectural curved mask reveal
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          {
            clipPath: "ellipse(40% 60% at 100% 100%)",
            opacity: 0.8,
          },
          {
            clipPath: "ellipse(118% 105% at 88% 100%)",
            opacity: 1,
            duration: 1.6,
            ease: "expo.out",
          }
        );
      }

      // 3. Inner image subtle scale from 1.08 to 1.0
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.08 },
          { scale: 1.0, duration: 1.8, ease: "power2.out" }
        );
      }

      // 4. Staggered typography reveal
      tl.to(badgeRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.2)
        .to(textLine1Ref.current, { y: "0%", opacity: 1, duration: 1.1, ease: "power4.out" }, 0.3)
        .to(textLine2Ref.current, { y: "0%", opacity: 1, duration: 1.1, ease: "power4.out" }, 0.42)
        .to(descRef.current, { y: 0, opacity: 1, duration: 0.9 }, 0.6)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.75);
    }, containerRef);

    return () => ctx.revert();
  }, [activeSlide]);

  const slide = slides[activeSlide];

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full min-h-screen bg-white text-slate-900 overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-10"
    >
      {/* Background Architectural Grid Lines (Clean luxury editorial texture) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Main Two-Column Hero Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 my-auto">
        
        {/* Left Editorial Content Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 sm:space-y-7 z-20">
          
          {/* Badge & Category Line */}
          <div ref={badgeRef} className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold font-label tracking-[0.22em] text-[#1E63D8] uppercase">
              {slide.badge}
            </span>
          </div>

          {/* Main Huge Headline with Vertical Text Clipping Mask */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-[62px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.05]">
              <span className="block overflow-hidden pb-1">
                <span ref={textLine1Ref} className="block will-change-transform">
                  {slide.titleLine1}
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span ref={textLine2Ref} className="block text-[#1E63D8] will-change-transform">
                  {slide.titleLine2}
                </span>
              </span>
            </h1>
          </div>

          {/* Editorial Supporting Description */}
          <p
            ref={descRef}
            className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-xl"
          >
            {slide.description}
          </p>

          {/* Action CTAs - Featuring Reference Video's Iconic Circle-Arrow */}
          <div ref={ctaRef} className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8">
            <Link href="/contact" className="btn-circle-arrow group">
              <span>GET A FAST QUOTE</span>
              <span className="circle-icon">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>

            <Link
              href={slide.ctaHref}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-bold font-label tracking-wider text-white bg-[#0F1114] hover:bg-[#1E63D8] shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {slide.ctaText}
            </Link>
          </div>

          {/* Slide Switcher Controls (Matching Reference Video's Minimal Tab Switcher) */}
          <div ref={tabsRef} className="pt-6 border-t border-[#EEF0F2] flex items-center gap-6 text-xs font-bold font-label uppercase tracking-widest text-[#8A929B]">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSlide(idx)}
                className={`relative pb-1.5 transition-all cursor-pointer ${
                  activeSlide === idx
                    ? "text-[#0F1114] font-extrabold"
                    : "hover:text-[#0F1114]"
                }`}
              >
                <span>0{idx + 1} {s.id.replace("-", " ")}</span>
                {activeSlide === idx && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E63D8] rounded-full" />
                )}
              </button>
            ))}
          </div>

        </div>

        {/* Right Architectural Image Column with Curved Mask Reveal */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] max-w-xl lg:max-w-none">
            
            {/* The Curved Architectural Mask Container */}
            <div
              ref={imageWrapperRef}
              className="relative w-full h-full overflow-hidden hero-curved-mask shadow-2xl shadow-slate-300/60 bg-[#EEF0F2] border border-[#C9CED4]"
            >
              <div ref={imageInnerRef} className="relative w-full h-full will-change-transform">
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={92}
                  className="object-cover object-center"
                />
                {/* Soft Architectural Highlight & Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Subtle Architectural Dimension Tag (Float on bottom-left of curve) */}
            <div className="absolute -bottom-4 -left-3 sm:bottom-4 sm:left-4 z-30 bg-white/95 backdrop-blur-md border border-[#C9CED4] px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EEF0F2] text-[#1E63D8] border border-[#C9CED4] flex items-center justify-center font-bold text-xs font-label">
                AU
              </div>
              <div className="leading-tight">
                <span className="block text-[10px] font-bold font-label tracking-widest text-[#8A929B] uppercase">
                  STRUCTURAL ACCREDITED
                </span>
                <span className="block text-xs font-extrabold font-label text-[#0F1114] uppercase">
                  AS/NZS 4600 &amp; NCC 2022
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Architectural Metadata Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400 gap-4">
        <div className="flex items-center gap-6">
          <span>LOCATION: ADELAIDE, SA</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">PRECISION ROLL-FORMING</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">BLUESCOPE TRUECORE® STEEL</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>SCROLL TO EXPLORE</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>

    </section>
  );
}
