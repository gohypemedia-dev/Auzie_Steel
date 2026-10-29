"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ServiceItem {
  step: string;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  keyPoints: string[];
  ctaText: string;
  ctaHref: string;
  imageOnLeft: boolean;
}

const serviceItems: ServiceItem[] = [
  {
    step: "01",
    category: "DESIGN & ENGINEERING",
    title: "CUSTOM DESIGNS",
    description:
      "Our computer-controlled machinery manufactures bespoke light gauge steel frames directly from CAD/BIM models with extreme millimeter accuracy. Build cantilevers, double-height ceiling voids, and expansive open-plan spans with complete structural confidence.",
    imageSrc: "/what-we-do-custom-designs.jpg",
    imageAlt: "Custom light gauge steel home framing design",
    keyPoints: [
      "Precision 3D CAD & BIM digital detailing",
      "Full flexibility for bespoke residential plans",
      "Millimeter roll-forming accuracy from slab to truss",
    ],
    ctaText: "LEARN MORE ABOUT CUSTOM STEEL",
    ctaHref: "/steel-frames",
    imageOnLeft: false, // Card on Left, Image on Right
  },
  {
    step: "02",
    category: "MANUFACTURING & FABRICATION",
    title: "FABRICATIONS",
    description:
      "Manufactured with high-tensile BlueScope Truecore® steel, our structural framing will not rot, warp, twist, shrink or sag over decades of building life. 100% immune to termite infestation, moisture, and fungal decay.",
    imageSrc: "/what-we-do-fabrications.jpg",
    imageAlt: "Automated light gauge steel frame fabrication facility",
    keyPoints: [
      "Manufactured from high-tensile BlueScope Truecore® steel",
      "Automated roll-forming minimizes site delays & waste",
      "Engineered tough: 100% termite-proof & non-combustible",
    ],
    ctaText: "EXPLORE OUR FABRICATIONS",
    ctaHref: "/steel-frames",
    imageOnLeft: true, // Image on Left, Card on Right
  },
  {
    step: "03",
    category: "SITE ASSEMBLY",
    title: "INSTALLATIONS",
    description:
      "Our lightweight steel framing packs arrive directly to site in sequenced, colour-coded bundles. Installation requires significantly less crane time, smaller onsite crews, and minimal manual lifting, keeping your construction weeks ahead of schedule.",
    imageSrc: "/what-we-do-installations.jpg",
    imageAlt: "Easy installation of light gauge steel frames on site",
    keyPoints: [
      "Significantly lighter than traditional timber framing",
      "Pre-punched service holes for rapid plumbing & electricals",
      "Straight, true members make fixing plasterboard seamless",
    ],
    ctaText: "DISCOVER EASY INSTALLATION",
    ctaHref: "/steel-frames",
    imageOnLeft: false, // Card on Left, Image on Right
  },
  {
    step: "04",
    category: "GUARANTEED DELIVERY",
    title: "OUR PROMISE",
    description:
      "Our design to delivery service gives you the opportunity to have your next project designed, manufactured and delivered on site in efficient timeframes so your build stays on schedule and on budget.",
    imageSrc: "/what-we-do-our-promise.jpg",
    imageAlt: "On-time direct to site steel frame delivery",
    keyPoints: [
      "Complete design-to-site crane truck logistics",
      "Guaranteed delivery schedules to keep projects on track",
      "Dedicated technical and engineering support on call",
    ],
    ctaText: "CONTACT US TODAY",
    ctaHref: "/contact",
    imageOnLeft: true, // Image on Left, Card on Right
  },
];

// Interactive Information Card (Restored from previous design with 12px radius, 3D tilt & glare)
function ServiceInfoCard({ item }: { item: ServiceItem }) {
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
    const rotateX = -((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTiltStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`
    );
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.1,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)");
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tiltStyle || "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: tiltStyle ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
      className="relative overflow-hidden p-7 sm:p-9 lg:p-10 bg-white border border-slate-200/90 hover:border-[#1E63D8]/40 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#1E63D8]/10 transition-all duration-300 rounded-[12px] group w-full"
    >
      {/* Subtle Radial Shine on Mouse Hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[12px] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(30, 99, 216, ${glarePosition.opacity}), transparent 70%)`,
        }}
      />

      {/* Step Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl sm:text-3xl font-heading font-black text-[#C9CED4] group-hover:text-[#1E63D8] transition-colors">
          {item.step}
        </span>
      </div>

      {/* Card Title (Dash Removed) */}
      <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#0F1114] tracking-tight mb-3">
        {item.title}
      </h3>

      {/* Card Description */}
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
        {item.description}
      </p>

      {/* Key Feature Highlights */}
      <ul className="space-y-3 mb-8 pt-5 border-t border-slate-100">
        {item.keyPoints.map((point, idx) => (
          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
            <span className="w-5 h-5 rounded-full bg-[#1E63D8]/10 text-[#1E63D8] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </span>
            <span className="font-medium">{point}</span>
          </li>
        ))}
      </ul>

      {/* Action Button (Arrow Removed) */}
      <div className="pt-2">
        <Link
          href={item.ctaHref}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-xs sm:text-sm font-bold font-label tracking-wider uppercase text-white bg-slate-950 hover:bg-slate-900 border border-slate-800 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {item.ctaText}
        </Link>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);

  // 1. Loader Refs (Scoped strictly inside WhatWeDo banner)
  const loaderCurtainRef = useRef<HTMLDivElement>(null);
  const counterNumberRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hasTriggeredLoaderRef = useRef<boolean>(false);

  // 2. Banner Stage Refs (Zero-gap curtain reveal)
  const bannerContainerRef = useRef<HTMLDivElement>(null);
  const bannerContentRef = useRef<HTMLDivElement>(null);

  // 3. Services Header & Row Refs
  const servicesHeaderRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------
      // PHASE 1: PRELOADER (000 -> 100) & ARCHITECTURAL DOME CURTAIN SWEEP UP
      // -----------------------------------------------------------------
      const counterObj = { val: 0 };
      const counterEl = counterNumberRef.current;
      const progressEl = progressBarRef.current;
      const curtainEl = loaderCurtainRef.current;

      const runLoaderSequence = () => {
        if (hasTriggeredLoaderRef.current) return;
        hasTriggeredLoaderRef.current = true;

        if (prefersReducedMotion) {
          if (curtainEl) curtainEl.style.display = "none";
          return;
        }

        const loaderTl = gsap.timeline();

        // 1. Counter counts up smoothly 000 -> 100 over a comfortable 2.2 seconds
        loaderTl.to(counterObj, {
          val: 100,
          duration: 2.2,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counterEl) {
              const current = Math.floor(counterObj.val);
              counterEl.textContent = current < 10 ? `00${current}` : current < 100 ? `0${current}` : "100";
            }
            if (progressEl) {
              progressEl.style.width = `${counterObj.val}%`;
            }
          },
        });

        // 2. Comfortable dwell time at 100 (0.4s)
        loaderTl.to({}, { duration: 0.4 });

        // 3. Curtain smoothly sweeps UP with architectural dome curve
        loaderTl.to(curtainEl, {
          yPercent: -105,
          duration: 1.4,
          ease: "power3.inOut",
          onComplete: () => {
            if (curtainEl) {
              curtainEl.style.display = "none";
            }
          },
        });
      };

      // Trigger loader when user arrives at WhatWeDo banner
      ScrollTrigger.create({
        trigger: bannerContainerRef.current,
        start: "top 35%",
        once: true,
        onEnter: runLoaderSequence,
      });

      // Fallback check on load
      const checkInitialVisibility = () => {
        if (bannerContainerRef.current) {
          const rect = bannerContainerRef.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom > 0) {
            runLoaderSequence();
          }
        }
      };
      const fallbackTimer = setTimeout(checkInitialVisibility, 300);

      // -----------------------------------------------------------------
      // PHASE 2 & 3: BANNER PIN WITH SEAMLESS CURTAIN REVEAL (NO BLACK VOID!)
      // Pin banner for 100vh with pinSpacing: false so OUR SERVICES smoothly slides up over it
      // -----------------------------------------------------------------
      if (bannerContainerRef.current && bannerContentRef.current) {
        ScrollTrigger.create({
          id: "whatWeDoBannerPin",
          trigger: bannerContainerRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(bannerContentRef.current, {
          y: -80,
          opacity: 0.15,
          scale: 0.95,
          ease: "power1.out",
          scrollTrigger: {
            trigger: bannerContainerRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1.2,
          },
        });
      }

      // -----------------------------------------------------------------
      // PHASE 4: SERVICES HEADER: STAGGERED LINE REVEAL
      // -----------------------------------------------------------------
      if (servicesHeaderRef.current) {
        const headerLines = servicesHeaderRef.current.querySelectorAll(".service-header-line");
        gsap.fromTo(
          headerLines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: servicesHeaderRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // -----------------------------------------------------------------
      // 4 ALTERNATING CARDS: OPPOSING SLOW SLIDE-IN
      // -----------------------------------------------------------------
      // For each row: Info Card slides in from ONE side, Image slides in from the OPPOSITE side
      // with slow, graceful glide (95px offset, scrub 2.2)
      rowsRef.current.forEach((row, idx) => {
        if (!row) return;

        const textCol = row.querySelector(".service-text-col");
        const imageCol = row.querySelector(".service-image-col");
        const isImageOnLeft = serviceItems[idx].imageOnLeft;

        // Dynamic Opposing Horizontal Offsets
        const textStartX = isImageOnLeft ? 95 : -95;
        const imageStartX = isImageOnLeft ? -95 : 95;

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 95%",
            end: "bottom 60%",
            scrub: 2.2,
          },
        });

        // 1. Info Card slides in slowly from its side
        if (textCol) {
          rowTl.fromTo(
            textCol,
            { x: textStartX, opacity: 0 },
            { x: 0, opacity: 1, ease: "power1.out" },
            0
          );
        }

        // 2. Image slides in slowly from the OPPOSITE side
        if (imageCol) {
          rowTl.fromTo(
            imageCol,
            { x: imageStartX, opacity: 0, scale: 0.96 },
            { x: 0, opacity: 1, scale: 1, ease: "power1.out" },
            0
          );
        }
      });

      return () => {
        clearTimeout(fallbackTimer);
      };
    }, sectionRef);

    return () => {
      ScrollTrigger.getById("whatWeDoBannerPin")?.kill(true);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-[#0F1114] overflow-hidden border-b border-[#CBD5E1]"
    >
      {/* ===================================================================
          PHASE 1 & 2: ARCHITECTURAL BANNER + SCOPED PRELOADER CURTAIN
          (DESIGN TO DELIVERY & LIGHT GAUGE STEEL FRAMING PILL COMPLETELY REMOVED!)
          =================================================================== */}
      <div
        ref={bannerContainerRef}
        className="relative w-full h-screen min-h-[640px] max-h-[1000px] overflow-hidden bg-[#0F1114]"
      >
        {/* Architectural Background Photography */}
        <Image
          src="/ani3-hero-curved-building.jpg"
          alt="Auzie Steel High Tensile Architectural Framing Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.52] will-change-transform"
        />

        {/* Luxury Studio Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/75 pointer-events-none" />

        {/* Banner Main Typography & Information */}
        <div
          ref={bannerContentRef}
          className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 will-change-transform"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black uppercase text-white tracking-tight leading-[1.05]">
            MANUFACTURING EXCELLENCE <br />
            <span className="text-[#60A5FA]">THAT SETS US APART</span>
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal">
            From automated roll-forming machinery to site-delivered cassettes and trusses, explore our complete structural framing services below.
          </p>

          <div className="pt-4 flex flex-col items-center justify-center gap-2 text-white/80 font-mono text-xs uppercase tracking-widest animate-bounce">
            <span>SCROLL TO EXPLORE SERVICES</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        {/* PHASE 1: Scoped Preloader Curtain (Sweeps Up 000 -> 100) */}
        <div
          ref={loaderCurtainRef}
          className="absolute inset-0 z-30 bg-[#FAF9F6] flex flex-col items-center justify-center select-none will-change-transform shadow-2xl"
          style={{
            clipPath: "ellipse(150% 100% at 50% 0%)",
          }}
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Brand Architectural Monogram & Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#0F1114] flex items-center justify-center font-heading font-black text-lg text-[#0F1114]">
                A
              </div>
              <span className="font-heading font-black text-2xl tracking-widest text-[#0F1114] uppercase">
                AUZIE STEEL
              </span>
            </div>

            {/* Dynamic Gold/Black Progress Line */}
            <div className="w-56 h-[3px] bg-[#CBD5E1] rounded-full overflow-hidden relative">
              <div
                ref={progressBarRef}
                className="absolute inset-y-0 left-0 bg-[#0F1114] transition-all duration-75"
                style={{ width: "0%" }}
              />
            </div>

            {/* Dynamic Counter Number: 000 -> 100 */}
            <div className="text-4xl sm:text-5xl font-mono font-bold tracking-widest text-[#0F1114]">
              <span ref={counterNumberRef}>000</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          PHASE 3 & 4: "OUR SERVICES" & CARDS WITH OPPOSING SIDE SLIDE-IN
          (Smooth White Curtain Over Banner - ZERO Black Void!)
          =================================================================== */}
      <div className="relative z-20 w-full bg-white shadow-[0_-30px_70px_rgba(0,0,0,0.22)]">
        <div className="py-24 sm:py-36 md:py-44 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services Section Header */}
        <div ref={servicesHeaderRef} className="mb-16 sm:mb-24 md:mb-28">
          <div className="overflow-hidden pb-2">
            <h2 className="service-header-line text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-tight will-change-transform">
              OUR SERVICES
            </h2>
          </div>
        </div>

        {/* 4 Alternating Zigzag Cards with Opposing Slide-in Animation */}
        <div className="space-y-40 sm:space-y-52 md:space-y-64">
          {serviceItems.map((item, idx) => {
            return (
              <div
                key={item.step}
                ref={(el) => {
                  rowsRef.current[idx] = el;
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center overflow-hidden py-6"
              >
                {/* --------------------------------------------------------
                    INFORMATION CARD COLUMN (Slides in from Left or Right)
                    Restored polished card container with 12px radius & 3D tilt
                    -------------------------------------------------------- */}
                <div
                  className={`service-text-col ${
                    item.imageOnLeft
                      ? "lg:col-span-6 lg:order-2"
                      : "lg:col-span-6 lg:order-1"
                  } flex flex-col justify-center will-change-transform`}
                >
                  <ServiceInfoCard item={item} />
                </div>

                {/* --------------------------------------------------------
                    IMAGE COLUMN (Slides in from the OPPOSITE side)
                    Clean 12px card, all wireframes/outline numbers/chips removed!
                    -------------------------------------------------------- */}
                <div
                  className={`service-image-col relative ${
                    item.imageOnLeft
                      ? "lg:col-span-6 lg:order-1"
                      : "lg:col-span-6 lg:order-2"
                  } flex items-center justify-center will-change-transform`}
                >
                  <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-500 group bg-slate-100">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Learn More CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/steel-frames"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-xs sm:text-sm font-bold font-label tracking-widest uppercase text-white bg-slate-950 hover:bg-slate-900 border border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            LEARN MORE
          </Link>
        </div>

      </div>
    </div>
  </section>
);
}
