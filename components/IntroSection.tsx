"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IntroSection() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const bannerImages = [
    {
      src: "/3d-steel-frame-zoomout-1.jpg",
      alt: "Auzie Steel Precision 3D Light Gauge Steel House Framing Structure",
      caption: "3D HIGH-TENSILE FRAMING",
      subcaption: "100% Australian BlueScope Truecore® Steel",
    },
    {
      src: "/3d-steel-frame-zoomout-2.jpg",
      alt: "Auzie Steel Architectural 3D Steel Frame Trusses & Joists",
      caption: "ARCHITECTURAL PRECISION",
      subcaption: "Engineered Wall Cassettes & High-Span Trusses",
    },
    {
      src: "/hero-steel-frame-3d.jpg",
      alt: "Standing 3D Steel Frame Domestic Building Structure",
      caption: "PRECISION CAD / BIM",
      subcaption: "Non-Combustible, Termite-Proof & 100% Recyclable",
    },
    {
      src: "/who-we-are-steelwork.jpg",
      alt: "Auzie Steel High-Tensile Structural Steelwork Assembly",
      caption: "STRUCTURAL INTEGRITY",
      subcaption: "Manufactured for Complete Architectural Freedom",
    },
  ];

  // Auto-play interval: advances slide smoothly every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, bannerImages.length]);

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % bannerImages.length);
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const whoWeAreRef = useRef<HTMLHeadingElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            labelRef.current,
            whoWeAreRef.current,
            headlineLine1Ref.current,
            headlineLine2Ref.current,
            headlineLine3Ref.current,
            subheadRef.current,
            bodyRef.current,
            ctaRef.current,
          ],
          {
            opacity: 1,
            y: 0,
          }
        );
        return;
      }

      // Initial state
      gsap.set(
        [
          whoWeAreRef.current,
          labelRef.current,
          headlineLine1Ref.current,
          headlineLine2Ref.current,
          headlineLine3Ref.current,
        ],
        {
          y: "115%",
          opacity: 0,
        }
      );
      gsap.set([subheadRef.current, bodyRef.current, ctaRef.current], { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
        defaults: { ease: "power3.out" },
      });

      // Coordinated sequence - Preserving original animations completely
      tl.to(whoWeAreRef.current, { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" })
        .to(labelRef.current, { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" }, "-=0.4")
        .to(headlineLine1Ref.current, { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" }, "-=0.7")
        .to(headlineLine2Ref.current, { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" }, "-=0.7")
        .to(headlineLine3Ref.current, { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" }, "-=0.7")
        .to(subheadRef.current, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .to(bodyRef.current, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

      // Architectural Tilted Parallelogram Image Mask Reveal
      if (imageMaskRef.current) {
        gsap.fromTo(
          imageMaskRef.current,
          {
            clipPath: "polygon(8.5% 0, 8.5% 0, 0 100%, 0 100%)",
            opacity: 0.5,
          },
          {
            clipPath: "polygon(8.5% 0%, 100% 0%, 91.5% 100%, 0% 100%)",
            opacity: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.1 },
          {
            scale: 1.0,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-[#EEF0F2]/40 text-[#0F1114] overflow-hidden border-y border-[#C9CED4]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Centered Section Header: WHO WE ARE */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="overflow-hidden pb-1">
            <h2
              ref={whoWeAreRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-tight will-change-transform"
            >
              WHO WE ARE
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Slanted Parallelogram Banner Image (Matching Reference Screenshot 1) */}
          <div className="lg:col-span-5 relative order-1">
            <div
              ref={imageMaskRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] overflow-hidden group shadow-none"
              style={{
                clipPath: "polygon(9% 0%, 100% 0%, 91% 100%, 0% 100%)",
              }}
            >
              {/* Background 3D Zoomed-Out Steel Frame Image (Smooth Auto-play Crossfade) */}
              <div ref={imageInnerRef} className="relative w-full h-full will-change-transform bg-transparent">
                {bannerImages.map((image, idx) => (
                  <div
                    key={image.src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === currentImgIndex
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Left Circular Navigation Button */}
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous slide"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 text-[#0F1114] hover:bg-[#1E63D8] hover:text-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shrink-0 z-30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Right Circular Navigation Button */}
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next slide"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 text-[#0F1114] hover:bg-[#1E63D8] hover:text-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shrink-0 z-30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Slide Indicator Dashes */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F1114]/60 backdrop-blur-md">
                {bannerImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImgIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImgIndex
                        ? "w-6 bg-white"
                        : "w-2 bg-white/40 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 relative order-2 pl-0 lg:pl-4">
            {/* Foreground Content (Preserving All Original Animation Refs) */}
            <div className="relative z-10 space-y-6 sm:space-y-8">
              
              {/* Secondary Headline (With Integrated Exclusive Distributorship) */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-sans font-semibold uppercase tracking-tight text-[#0F1114] leading-[1.2]">
                <span className="block overflow-hidden pb-1">
                  <span
                    ref={labelRef}
                    className="block text-[#1E63D8] font-bold will-change-transform"
                  >
                    EXCLUSIVE DISTRIBUTORSHIP FOR SA &amp; NT
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span
                    ref={headlineLine1Ref}
                    className="block will-change-transform"
                  >
                    OUR COMPREHENSIVE,
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span
                    ref={headlineLine2Ref}
                    className="block will-change-transform"
                  >
                    DESIGN TO DELIVERY SERVICE
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span
                    ref={headlineLine3Ref}
                    className="block text-[#1E63D8] font-bold will-change-transform"
                  >
                    IS WHAT SETS US APART.
                  </span>
                </span>
              </h3>

              {/* Subheading in Sentence Case with Full Bold Weight */}
              <p
                ref={subheadRef}
                className="text-sm sm:text-base md:text-lg font-bold tracking-wide text-[#0F1114] leading-snug max-w-2xl"
              >
                Auzie Steel is the leading manufacturer of customisable steel frames for the local building industry. Based in Adelaide, we rely on the latest technologies to produce housing frames made from light gauge steel.
              </p>

              {/* Supporting Paragraph */}
              <p
                ref={bodyRef}
                className="text-xs sm:text-sm md:text-base text-[#8A929B] leading-relaxed max-w-xl font-normal"
              >
                We take care of every aspect of steel frame construction, from manufacturing the frame to delivery directly to site, to keep your project moving. We understand the importance of precision, efficiency and budget in every domestic building project.
              </p>

              {/* Call-to-action Button */}
              <div ref={ctaRef} className="pt-2 flex items-center gap-6">
                <Link href="/contact" className="btn-circle-arrow group">
                  <span>EXPLORE OUR PROJECTS</span>
                  <span className="circle-icon">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Architectural CAD Blueprint Watermark (Directly in Bottom-Right Corner of the Section) */}
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[420px] md:w-[500px] lg:w-[560px] pointer-events-none opacity-20 select-none z-0">
        <Image
          src="/blueprint-floorplan.svg"
          alt="Architectural Framing Blueprint Drawing"
          width={700}
          height={600}
          className="w-full h-auto object-contain object-right-bottom"
        />
      </div>
    </section>
  );
}
