"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IntroSection() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const bannerImages = [
    {
      src: "/who-we-are-steelwork.jpg",
      alt: "Auzie Steel Structural Steelwork Innovation",
      caption: "PRECISION ROLL-FORMING",
      subcaption: "100% Australian BlueScope Truecore® Steel",
    },
    {
      src: "/what-we-do-fabrications.jpg",
      alt: "Light Gauge Steel Frame Production & Assembly",
      caption: "AUTOMATED CNC PRODUCTION",
      subcaption: "Millimeter-Tolerant Prefabricated Wall Panels",
    },
    {
      src: "/why-choose-customisable-main.jpg",
      alt: "Packaged Steel Frames Staged for Direct Delivery",
      caption: "DIRECT ON-SITE DELIVERY",
      subcaption: "Sequenced Palletized Bundles for Builders",
    },
    {
      src: "/hero-construction.webp",
      alt: "Standing Steel Frame Structural Assembly",
      caption: "RAPID STRUCTURAL ASSEMBLY",
      subcaption: "Fast, Durable, Straight & Termite-Proof",
    },
  ];

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % bannerImages.length);
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
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
      gsap.set([headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current], {
        y: "115%",
        opacity: 0,
      });
      gsap.set(labelRef.current, { y: 20, opacity: 0 });
      gsap.set([subheadRef.current, bodyRef.current, ctaRef.current], { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // Coordinated sequence - Preserving original animations completely
      tl.to(labelRef.current, { y: 0, opacity: 1, duration: 0.6 })
        .to(headlineLine1Ref.current, { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" }, "-=0.3")
        .to(headlineLine2Ref.current, { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" }, "-=0.7")
        .to(headlineLine3Ref.current, { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" }, "-=0.7")
        .to(subheadRef.current, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .to(bodyRef.current, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

      // Architectural Tilted Image Mask Reveal with subtle zoom
      if (imageMaskRef.current) {
        gsap.fromTo(
          imageMaskRef.current,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            opacity: 0.5,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
            opacity: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Tilted Banner Image with Carousel Controls (Matching Reference Screenshot) */}
          <div className="lg:col-span-5 relative order-1">
            <div
              ref={imageMaskRef}
              className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] overflow-hidden shadow-2xl shadow-slate-300/70 border border-[#C9CED4] rounded-[16px] lg:rounded-none group"
              style={{
                clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
              }}
            >
              <div ref={imageInnerRef} className="relative w-full h-full will-change-transform bg-[#EEF0F2]">
                <Image
                  src={bannerImages[currentImgIndex].src}
                  alt={bannerImages[currentImgIndex].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Circular Prev/Next Arrow Controls on Banner */}
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0F1114] shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next slide"
                className="absolute right-7 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0F1114] shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-5 left-4 right-10 sm:left-5 sm:right-12 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-[#C9CED4] shadow-md">
                <span className="text-[10px] font-bold font-label tracking-widest text-[#1E63D8] uppercase block">
                  {bannerImages[currentImgIndex].caption}
                </span>
                <span className="text-xs font-extrabold font-label text-[#0F1114] uppercase block mt-0.5">
                  {bannerImages[currentImgIndex].subcaption}
                </span>
              </div>
            </div>
          </div>

          {/* Right Text Content with Blueprint Schematic Watermark in Background (Matching Reference) */}
          <div className="lg:col-span-7 relative order-2 pl-0 lg:pl-4">
            
            {/* Architectural CAD Blueprint Watermark (Bottom Right Background) */}
            <div className="absolute -bottom-16 -right-16 sm:-bottom-20 sm:-right-10 w-[360px] sm:w-[480px] lg:w-[540px] pointer-events-none opacity-20 select-none rotate-[-6deg] z-0">
              <Image
                src="/blueprint-floorplan.svg"
                alt="Architectural Framing Blueprint Drawing"
                width={700}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Foreground Content (Preserving All Original Animation Refs) */}
            <div className="relative z-10 space-y-6 sm:space-y-8">
              
              {/* Top Brand Tag */}
              <div ref={labelRef} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm border-2 border-[#0F1114] flex items-center justify-center shrink-0">
                  <div className="w-3.5 h-3.5 border-t-2 border-b-2 border-[#0F1114]" />
                </div>
                <div className="leading-tight">
                  <span className="block text-xs font-bold font-label tracking-widest text-[#1E63D8] uppercase">
                    WHO WE ARE
                  </span>
                  <span className="block text-[10px] font-bold font-label tracking-widest text-[#8A929B] uppercase">
                    STEELWORK INNOVATIONS
                  </span>
                </div>
              </div>

              {/* Main Huge Condensed Headline with Line-by-line Reveal */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-heading font-medium uppercase tracking-tight text-[#0F1114] leading-[1.12]">
                <span className="block overflow-hidden pb-1">
                  <span ref={headlineLine1Ref} className="block will-change-transform">
                    OUR COMPREHENSIVE,
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span ref={headlineLine2Ref} className="block will-change-transform">
                    DESIGN TO DELIVERY SERVICE
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span ref={headlineLine3Ref} className="block text-[#1E63D8] will-change-transform">
                    IS WHAT SETS US APART.
                  </span>
                </span>
              </h2>

              {/* Subheading in Bold Uppercase */}
              <p
                ref={subheadRef}
                className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide text-[#0F1114] leading-snug max-w-2xl"
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
    </section>
  );
}
