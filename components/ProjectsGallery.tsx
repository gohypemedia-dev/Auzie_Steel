"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  columnOffsetClass: string;
}

const projects: ProjectItem[] = [
  {
    id: "bespoke-residence",
    category: "RESIDENTIAL FRAMING",
    title: "ADELAIDE HILLS BESPOKE RESIDENCE",
    description: "Complete light gauge steel frame engineered for multi-level sloping terrain and architectural cantilever spans.",
    imageSrc: "/hero-construction.webp",
    href: "/steel-frames",
    columnOffsetClass: "lg:translate-y-0",
  },
  {
    id: "alpha-floor-cassettes",
    category: "FLOOR SYSTEMS",
    title: "ALPHA FLOOR STRUCTURAL CASSETTES",
    description: "Engineered acoustic floor joist cassettes manufactured with pre-punched MEP service integration.",
    imageSrc: "/why-choose-customisable-main.jpg",
    href: "/alpha-floor",
    columnOffsetClass: "lg:translate-y-12",
  },
  {
    id: "engineered-roof-trusses",
    category: "ENGINEERED TRUSSES",
    title: "HIGH-SPAN ARCHITECTURAL ROOF TRUSSES",
    description: "Precision roll-formed Truecore® steel trusses designed to resist high wind loads and bushfire conditions.",
    imageSrc: "/what-we-do-fabrications.jpg",
    href: "/steel-frames",
    columnOffsetClass: "lg:translate-y-24",
  },
  {
    id: "modular-wall-framing",
    category: "CNC ROLL-FORMING",
    title: "AUTOMATED CNC WALL FRAMING SYSTEMS",
    description: "Rapid prefabrication with millimeter-accurate wall panels ready for immediate on-site crane or manual lift.",
    imageSrc: "/what-we-do-custom-designs.jpg",
    href: "/steel-frames",
    columnOffsetClass: "lg:translate-y-0",
  },
  {
    id: "fire-rated-framing",
    category: "FIRE RETARDANT",
    title: "NON-COMBUSTIBLE ASBESTOS REPLACEMENT",
    description: "100% non-combustible steel framing meeting AS 3959 BAL-FZ requirements for extreme fire zones.",
    imageSrc: "/why-choose-fire-main.jpg",
    href: "/steel-frames",
    columnOffsetClass: "lg:translate-y-12",
  },
  {
    id: "rapid-site-delivery",
    category: "SITE ASSEMBLY",
    title: "DIRECT-TO-SITE PACKAGED DELIVERY",
    description: "Sequenced bundle delivery mapped directly to building stages to minimize storage and jobsite delay.",
    imageSrc: "/what-we-do-installations.jpg",
    href: "/contact",
    columnOffsetClass: "lg:translate-y-24",
  },
];

export default function ProjectsGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      const titleLines = headingRef.current?.querySelectorAll(".gallery-title-line");
      if (titleLines && titleLines.length > 0) {
        gsap.fromTo(
          titleLines,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Staggered Project Cards with clipping mask animation
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length > 0) {
        cards.forEach((card) => {
          const imgMask = card.querySelector(".project-img-mask");
          const imgInner = card.querySelector(".project-img-inner");
          const textBlock = card.querySelector(".project-text-block");

          if (imgMask) {
            gsap.fromTo(
              imgMask,
              {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                opacity: 0.6,
              },
              {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                opacity: 1,
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          if (imgInner) {
            gsap.fromTo(
              imgInner,
              { scale: 1.12 },
              {
                scale: 1.0,
                duration: 1.4,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          if (textBlock) {
            gsap.fromTo(
              textBlock,
              { y: 25, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-white text-[#0F1114] overflow-hidden border-b border-[#C9CED4]/60"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Editorial Architecture Layout */}
        <div className="max-w-3xl mb-16 sm:mb-24 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF0F2] border border-[#C9CED4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114]">
              FEATURED PORTFOLIO
            </span>
          </div>

          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.08]"
          >
            <span className="block overflow-hidden pb-1">
              <span className="gallery-title-line block">
                PRECISION ARCHITECTURAL
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="gallery-title-line block text-[#1E63D8]">
                STEEL FRAME PROJECTS
              </span>
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-[#8A929B] font-normal max-w-xl leading-relaxed">
            A curated showcase of residential and commercial structural frameworks engineered to millimeter tolerances across South Australia.
          </p>
        </div>

        {/* 3-Column Staggered Waterfall Gallery (Matching Reference Video f_180.jpg) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-16"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card transition-all duration-300 ${project.columnOffsetClass}`}
            >
              <Link href={project.href} className="group block focus:outline-none">
                
                {/* Architectural Image Container with Mask Reveal & Hover Zoom */}
                <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-[#EEF0F2] shadow-md shadow-slate-200/80 group-hover:shadow-xl transition-shadow duration-500 border border-[#C9CED4]/50">
                  <div className="project-img-mask relative w-full h-full overflow-hidden">
                    <div className="project-img-inner relative w-full h-full will-change-transform">
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Card Editorial Information */}
                <div className="project-text-block pt-5 space-y-2">
                  <span className="block text-[11px] font-bold font-label tracking-[0.2em] text-[#1E63D8] uppercase">
                    {project.category}
                  </span>

                  <h3 className="text-base sm:text-lg font-heading uppercase tracking-tight text-[#0F1114] group-hover:text-[#1E63D8] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8A929B] leading-relaxed font-normal line-clamp-2">
                    {project.description}
                  </p>

                  <div className="pt-2">
                    <span className="btn-circle-arrow group-hover:text-[#1E63D8]">
                      <span>READ CASE STUDY</span>
                      <span className="circle-icon group-hover:border-[#1E63D8] group-hover:bg-[#1E63D8] group-hover:text-white">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>

              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Portfolio Link */}
        <div className="mt-12 pt-8 text-center border-t border-[#C9CED4]/60">
          <Link href="/steel-frames" className="btn-circle-arrow group inline-flex">
            <span>VIEW ALL STRUCTURAL CASE STUDIES</span>
            <span className="circle-icon">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
