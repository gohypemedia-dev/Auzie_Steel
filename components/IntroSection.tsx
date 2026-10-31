"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Split doors & badge refs
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const doorsContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Revealed Who We Are content refs
  const whoWeAreContentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const textBlocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const card = cardRef.current;
    const doorLeft = doorLeftRef.current;
    const doorRight = doorRightRef.current;
    const doorsContainer = doorsContainerRef.current;
    const badge = badgeRef.current;
    const content = whoWeAreContentRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const textBlocks = textBlocksRef.current;

    if (!section || !pinWrapper || !card || !doorLeft || !doorRight) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      // 50% smaller initial card scale as requested (compact, centered floating card)
      const initialScale = isMobile ? 0.48 : 0.34;
      const initialRadius = isMobile ? "20px" : "28px";

      // 1. Initial Card State
      gsap.set(card, {
        scale: initialScale,
        borderRadius: initialRadius,
        boxShadow: "0 35px 100px -10px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.22)",
        transformOrigin: "center center",
      });

      // Split doors initial state: closed together at center
      gsap.set(doorLeft, { xPercent: 0 });
      gsap.set(doorRight, { xPercent: 0 });
      if (doorsContainer) gsap.set(doorsContainer, { opacity: 1, pointerEvents: "none" });
      if (badge) gsap.set(badge, { opacity: 1, scale: 1 });

      // Who We Are content initial state: hidden underneath
      if (content) gsap.set(content, { opacity: 0, scale: 0.96 });
      if (heading) gsap.set(heading, { y: 35, opacity: 0 });
      if (subheading) gsap.set(subheading, { y: 25, opacity: 0 });
      if (textBlocks) gsap.set(textBlocks, { y: 20, opacity: 0 });

      // Responsive, snappy scroll distance (1350px) so every scroll tick triggers fluid visual progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1350",
          pin: pinWrapper,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ==============================================================
      // PHASE 1: Immediate Zoom Response - Card Zooms from 50% to Fullscreen
      // ==============================================================
      tl.to(
        card,
        {
          scale: 1,
          borderRadius: "0px",
          boxShadow: "0 0 0 rgba(0,0,0,0), 0 0 0 0px rgba(255,255,255,0)",
          ease: "power2.out",
          duration: 0.8,
        },
        "zoom"
      );

      // Fade badge out smoothly as card expands
      if (badge) {
        tl.to(
          badge,
          { opacity: 0, scale: 0.85, duration: 0.35, ease: "power1.out" },
          "zoom+=0.1"
        );
      }

      // ==============================================================
      // PHASE 2: Center Split Doors Part Horizontally (Left & Right)
      // Flows seamlessly as the card reaches full screen
      // ==============================================================
      tl.to(
        doorLeft,
        {
          xPercent: -100,
          ease: "power2.inOut",
          duration: 0.85,
        },
        "split"
      );

      tl.to(
        doorRight,
        {
          xPercent: 100,
          ease: "power2.inOut",
          duration: 0.85,
        },
        "split"
      );

      // ==============================================================
      // PHASE 3: "Who We Are" Content Smoothly Revealed
      // ==============================================================
      if (content) {
        tl.to(
          content,
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            duration: 0.7,
          },
          "split+=0.1"
        );
      }

      if (heading) {
        tl.to(
          heading,
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.55,
          },
          "split+=0.2"
        );
      }

      if (subheading) {
        tl.to(
          subheading,
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.55,
          },
          "split+=0.3"
        );
      }

      if (textBlocks) {
        tl.to(
          textBlocks,
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.55,
          },
          "split+=0.4"
        );
      }

      // Brief comfortable dwell so user can view the revealed section before moving to partner strip
      tl.to({}, { duration: 0.25 });
    }, section);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-slate-950 select-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-slate-950"
      >
        {/* Floating Architectural Card */}
        <div
          ref={cardRef}
          style={{
            transform: "scale(0.34)",
            borderRadius: "28px",
            boxShadow: "0 35px 100px -10px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.18)",
            transformOrigin: "center center",
          }}
          className="relative w-full h-full overflow-hidden bg-white flex items-center will-change-transform transform-gpu"
        >
          {/* ================================================================
              SPLIT STEEL FRAME DOORS (Center Split Left & Right)
              ================================================================ */}
          <div
            ref={doorsContainerRef}
            className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
          >
            {/* Left Door Half (Width: 50%, slides to xPercent: -100) */}
            <div
              ref={doorLeftRef}
              className="absolute top-0 left-0 w-1/2 h-full overflow-hidden will-change-transform bg-slate-950"
            >
              <div className="relative w-[200%] h-full">
                <Image
                  src="/intro-steel-frame.jpg"
                  alt="Auzie Precision Steel Frame Structure"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center select-none"
                />
              </div>
              {/* Central Dividing Seam (Right edge of left door) */}
              <div className="absolute top-0 right-0 w-[1px] h-full bg-white/40 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
            </div>

            {/* Right Door Half (Width: 50%, slides to xPercent: 100) */}
            <div
              ref={doorRightRef}
              className="absolute top-0 right-0 w-1/2 h-full overflow-hidden will-change-transform bg-slate-950"
            >
              <div
                className="relative w-[200%] h-full"
                style={{ left: "-100%" }}
              >
                <Image
                  src="/intro-steel-frame.jpg"
                  alt="Auzie Precision Steel Frame Structure"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center select-none"
                />
              </div>
              {/* Central Dividing Seam (Left edge of right door) */}
              <div className="absolute top-0 left-0 w-[1px] h-full bg-white/40 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
            </div>

            {/* Floating Badge on Initial Small Card */}
            <div
              ref={badgeRef}
              className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 px-4 sm:px-5 py-2 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/20 text-white flex items-center space-x-2.5 shadow-2xl pointer-events-none whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#1E63D8] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
                AUZIE STEEL FRAMING
              </span>
            </div>
          </div>

          {/* ================================================================
              WHO WE ARE PAGE CONTENT (Revealed slow-slow behind split doors)
              ================================================================ */}
          {/* Background Architectural Steel Frame (Light Sky & Crisp Steel) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
              src="/who-we-are-light-hero.jpg"
              alt="Auzie Steel - Precision Light Gauge Steel Framing"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right-bottom select-none"
            />
            {/* Luminous Light Gradient Overlay to soften the background and keep text crisp */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 sm:via-white/70 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-white/10 z-[1]" />
          </div>

          {/* Foreground Information: Left-Aligned with ample padding for fixed navbar */}
          <div
            ref={whoWeAreContentRef}
            className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex flex-col justify-center pt-16 sm:pt-20 will-change-transform"
          >
            {/* Left Aligned Content Column */}
            <div className="max-w-xl xl:max-w-2xl text-left space-y-4 sm:space-y-5">
              {/* Main Heading: WHO WE ARE */}
              <h2
                ref={headingRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-heading font-black tracking-tight text-[#0F1114] uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)]"
              >
                WHO WE ARE
              </h2>

              {/* Secondary Heading: Black (#0F1114) and Blue (#1E63D8) */}
              <h3
                ref={subheadingRef}
                className="text-lg sm:text-xl md:text-2xl lg:text-[30px] font-heading font-black tracking-tight text-[#0F1114] leading-[1.18] drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]"
              >
                Our comprehensive,{" "}
                <span className="text-[#1E63D8]">design to delivery</span> service
                is what sets us apart.
              </h3>

              {/* Formatted Text Blocks */}
              <div
                ref={textBlocksRef}
                className="space-y-4 text-sm sm:text-base md:text-[16px] leading-relaxed"
              >
                <p className="font-medium text-[#0F1114]">
                  Auzie Steel is the leading manufacturer of customisable steel
                  frames for the local building industry. Based in Adelaide, we
                  rely on the latest technologies to produce housing frames made
                  from light gauge steel.
                </p>

                <p className="font-normal text-[#0F1114]">
                  We take care of every aspect of steel frame construction, from
                  manufacturing the frame to delivery directly to site, to keep
                  your project moving. We understand the importance of precision,
                  efficiency and budget in every domestic building project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
