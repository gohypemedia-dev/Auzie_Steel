"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitFeature {
  id: string;
  step: string;
  title: string;
  quote: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  linkText: string;
  href: string;
  reverse: boolean;
}

const features: SplitFeature[] = [
  {
    id: "customisable",
    step: "01",
    title: "CUSTOMISABLE",
    quote: "We can manufacture any design created by an architect.",
    text: "Before anything gets drawn, locked in or priced, we work closely with your builder and design team to fabricate custom light gauge steel frames directly from CAD/BIM models with millimetre accuracy — enabling cantilevers, double-height ceiling voids, and expansive open-plan spans with complete structural confidence.",
    imageSrc: "/why-choose-customisable-main.jpg",
    imageAlt: "Auzie Steel Customisable Steel Framing",
    linkText: "View Custom Specs",
    href: "/steel-frames",
    reverse: false,
  },
  {
    id: "durable",
    step: "02",
    title: "DURABLE",
    quote: "Our steel frames will not rot, warp, twist or attract termites.",
    text: "Manufactured exclusively from premium high-tensile BlueScope TRUECORE® steel, our structural framing will not shrink or sag over decades of building life, providing 100% immunity to moisture, termite infestation, and fungal decay.",
    imageSrc: "/why-choose-durable-main.jpg",
    imageAlt: "Durable termite-proof steel frames",
    linkText: "View Durability Specs",
    href: "/steel-frames",
    reverse: true,
  },
  {
    id: "fire-retardant",
    step: "03",
    title: "FIRE RETARDANT",
    quote: "Steel is a naturally non-combustible material, ideal for housing frames, especially in fire-prone areas.",
    text: "Inherently non-combustible, it will not ignite or fuel flames, making it the premier structural framing choice for Australian domestic builds complying with strict AS 3959 BAL-FZ standards.",
    imageSrc: "/why-choose-fire-main.jpg",
    imageAlt: "Non-combustible steel framing",
    linkText: "View Fire Resistance Specs",
    href: "/steel-frames",
    reverse: false,
  },
  {
    id: "transportation",
    step: "04",
    title: "TRANSPORTATION",
    quote: "Our lightweight steel frames are easy to transport and need less manual labour to install.",
    text: "Sequenced, colour-coded framing packs arrive directly to site with complete crane-truck logistics, keeping your construction weeks ahead of schedule and eliminating on-site cutting waste.",
    imageSrc: "/why-choose-transport-main.jpg",
    imageAlt: "Transporting lightweight steel frames to site",
    linkText: "View Transportation Specs",
    href: "/contact",
    reverse: true,
  },
];

function SplitStoryItem({ item }: { item: SplitFeature }) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = itemRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =====================================================================
      // 1. MOBILE RESPONSIVE ANIMATION (<960px)
      // =====================================================================
      mm.add("(max-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
        const media = section.querySelector(".split__media");
        const textCol = section.querySelector(".split__text");
        const textElements = section.querySelectorAll(".split__text > *");

        if (media) {
          gsap.fromTo(
            media,
            { xPercent: item.reverse ? 100 : -100 },
            {
              xPercent: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 95%",
                once: true,
              },
            }
          );
        }

        if (textCol && textElements.length > 0) {
          gsap.fromTo(
            textElements,
            {
              x: item.reverse ? -28 : 28,
              y: 20,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: textCol,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // =====================================================================
      // 2. DESKTOP ANIMATION (min-width: 961px): Smooth Reveal (No Scroll Trapping)
      // =====================================================================
      mm.add("(min-width: 961px) and (prefers-reduced-motion: no-preference)", () => {
        const media = section.querySelector(".split__media");
        const img = section.querySelector(".split__img");
        const textCol = section.querySelector(".split__text");
        const textChildren = section.querySelectorAll(".split__text > *");

        // 1. Media clip-path unmask scrub (wipes open gracefully respecting alternating direction)
        if (media) {
          gsap.fromTo(
            media,
            { clipPath: item.reverse ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 25%",
                scrub: 0.6,
              },
            }
          );
        }

        // 2. Parallax image subtle drift
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: 6, scale: 1.05 },
            {
              yPercent: -6,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // 3. Stagger information elements into view with slide & fade (visible in-screen reveal)
        if (textCol && textChildren.length > 0) {
          gsap.fromTo(
            textChildren,
            {
              x: item.reverse ? -50 : 50,
              y: 28,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textCol,
                start: "center 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [item.reverse]);

  return (
    <div
      ref={itemRef}
      className={`split relative w-full min-h-[100svh] flex flex-col lg:flex-row items-stretch bg-[#FAF9F6] overflow-hidden select-none border-b border-[#E2E8F0] ${
        item.reverse ? "split--rev" : ""
      }`}
    >
      {/* ===================================================================
          1. MEDIA COLUMN (50% desktop, full width mobile)
          Alternates left / right across features
          =================================================================== */}
      <div
        className={`split__media will-change-[clip-path] relative w-full lg:w-1/2 h-[50vh] lg:h-auto min-h-[300px] lg:min-h-[100svh] overflow-hidden bg-[#EEF0F2] flex-none z-10 ${
          item.reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="split__img absolute inset-0 lg:inset-[-8%_0] w-full h-full lg:h-[116%] will-change-transform">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 960px) 100vw, 50vw"
            priority={true}
            quality={90}
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* ===================================================================
          2. TEXT COLUMN (Information background is Blue everywhere, left or right)
          Feature Title -> Tagline -> Paragraph -> Pill CTA
          When on the left (item.reverse), padding-left matches Navbar logo alignment
          =================================================================== */}
      <div
        className={`split__text relative z-10 w-full lg:w-1/2 min-h-auto lg:min-h-[100svh] flex flex-col justify-center items-start gap-4 sm:gap-5 lg:gap-6 py-12 sm:py-16 lg:py-0 box-border bg-[#1E63D8] text-white ${
          item.reverse
            ? "lg:order-1 pl-4 sm:pl-6 lg:pl-10 xl:pl-12 2xl:pl-16 pr-6 sm:pr-10 lg:pr-12 xl:pr-16"
            : "lg:order-2 pl-6 sm:pl-10 lg:pl-14 xl:pl-16 2xl:pl-20 pr-4 sm:pr-6 lg:pr-10 xl:pr-12 2xl:pr-16"
        }`}
      >
        {/* Feature Heading */}
        <h3 className="title text-white font-sans font-medium uppercase tracking-tight text-[clamp(2.1rem,3.2vw,3.4rem)] leading-[1.08]">
          {item.title}
        </h3>

        {/* Lead-in Tagline (clean, no quotation marks) */}
        <p className="quote text-white font-light text-[clamp(1.18rem,1.55vw,1.6rem)] leading-[1.35] max-w-[34ch]">
          {item.quote}
        </p>

        {/* Detailed Explanation Paragraph */}
        <p className="para text-blue-50/90 font-light text-[clamp(14px,0.98vw,15.5px)] leading-[1.75] max-w-[48ch]">
          {item.text}
        </p>

        {/* Signature Rounded CTA Button (Clean White on Blue) */}
        <div className="split__action pt-2">
          <Link
            href={item.href}
            className="pill inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[10px] bg-white hover:bg-blue-50 text-[#1E63D8] hover:text-[#1650B5] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-black/15 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{item.linkText}</span>
            <span aria-hidden="true" className="text-base font-bold">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseSteelFrames() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const offset = window.innerWidth <= 768 ? "12vw" : "18vw";

      // 1. Intro Title: slides in from left (-18vw)
      gsap.fromTo(
        ".why-intro .why-title",
        { x: `-${offset}`, opacity: 0 },
        {
          x: "0vw",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-intro",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Intro Paragraph: slides in from right (+18vw)
      gsap.fromTo(
        ".why-intro .why-para",
        { x: offset, opacity: 0 },
        {
          x: "0vw",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-intro",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, container);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="why-choose-steel-frames"
      ref={containerRef}
      className="story-stack relative w-full bg-[#FAF9F6]"
    >
      {/* ===================================================================
          1. INTRO HEADER (Matching "OUR SERVICES" slide-in animation & generous spacing)
          =================================================================== */}
      <div className="why-intro w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 text-center flex flex-col items-center overflow-hidden border-b border-[#E2E8F0]/60">
        <h2 className="why-title font-sans font-medium uppercase tracking-tight text-[#0F1114] text-xl sm:text-3xl md:text-4xl lg:text-[44px] mb-3 sm:mb-6">
          WHY CHOOSE <span className="text-[#1E63D8]">STEEL FRAMING?</span>
        </h2>
        <p className="why-para text-slate-600 text-xs sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
          We manufacture custom light gauge steel framing with millimetre precision. Discover why South Australian builders choose Auzie Steel for complex cantilevers, 50-year TRUECORE® steel durability, BAL-FZ applications and rapid on-site logistics.
        </p>
      </div>

      {/* ===================================================================
          2. THE 4 STORY STACK SECTIONS (Alternating Royal Rising Split Cards)
          =================================================================== */}
      {features.map((item) => (
        <SplitStoryItem key={item.id} item={item} />
      ))}
    </section>
  );
}
