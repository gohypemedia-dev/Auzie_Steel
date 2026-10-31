"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceSlide {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const services: ServiceSlide[] = [
  {
    id: "custom-designs",
    number: "01",
    title: "Custom Designs",
    tagline: "3D CAD & BIM Digital Precision",
    description:
      "Engineered bespoke light gauge steel frames generated directly from CAD/BIM models with extreme millimeter accuracy.",
    imageSrc: "/what-we-do-custom-designs.jpg",
    imageAlt: "Custom light gauge steel home framing design",
    href: "/steel-frames",
  },
  {
    id: "fabrications",
    number: "02",
    title: "Fabrications",
    tagline: "High-Tensile BlueScope Truecore®",
    description:
      "Automated CNC roll-formed structural steel that will never rot, warp, twist, shrink or sag over decades of building life.",
    imageSrc: "/what-we-do-fabrications.jpg",
    imageAlt: "Automated light gauge steel frame fabrication facility",
    href: "/steel-frames",
  },
  {
    id: "installations",
    number: "03",
    title: "Installations",
    tagline: "Rapid Site Assembly & Erection",
    description:
      "Sequenced, colour-coded framing packs arrive ready for rapid onsite erection with minimal crane time and manual labour.",
    imageSrc: "/what-we-do-installations.jpg",
    imageAlt: "Easy installation of light gauge steel frames on site",
    href: "/steel-frames",
  },
  {
    id: "our-promise",
    number: "04",
    title: "Our Promise",
    tagline: "On-Time Guaranteed Direct Logistics",
    description:
      "End-to-end crane-truck logistics delivering precision engineered steel framing directly to site strictly on schedule.",
    imageSrc: "/what-we-do-our-promise.jpg",
    imageAlt: "On-time direct to site steel frame delivery",
    href: "/contact",
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const svcRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const svc = svcRef.current;
    const view = viewRef.current;
    const track = trackRef.current;

    if (!section || !svc || !view || !track) return;

    const count = services.length;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          phone: "(max-width: 640px)",
          larger: "(min-width: 641px)",
        },
        (context) => {
          const isPhone = !!context.conditions?.phone;
          const offset = window.innerWidth <= 768 ? "12vw" : "18vw";

          // 1. Intro Title: slides in from left (-18vw)
          gsap.fromTo(
            ".svc-intro .title",
            { x: `-${offset}`, opacity: 0 },
            {
              x: "0vw",
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".svc-intro",
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // 2. Intro Paragraph: slides in from right (+18vw)
          gsap.fromTo(
            ".svc-intro .para",
            { x: offset, opacity: 0 },
            {
              x: "0vw",
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".svc-intro",
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // 3. Main Horizontal Pinned Stage (Exact Royal Rising Architecture)
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: svc,
              start: isPhone ? "center center" : "top top",
              end: () => `+=${window.innerHeight * (count + 0.6)}`,
              pin: true,
              scrub: isPhone ? true : 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const t = self.progress * (count + 0.2) - 1;
                setActiveIdx(Math.max(0, Math.min(count - 1, Math.round(t))));
              },
            },
          });

          // Phase A: Scale up viewport from 0.55 into fullscreen
          tl.fromTo(
            view,
            {
              scale: isPhone ? 1 : 0.55,
              borderRadius: isPhone ? "0px" : "28px",
            },
            {
              scale: 1,
              borderRadius: "0px",
              duration: 1,
              ease: "power1.inOut",
            },
            0
          );

          // Phase B: Content & counter reveal
          tl.fromTo(
            ".svc__label p, .svc__count",
            { opacity: isPhone ? 1 : 0 },
            { opacity: 1, duration: 0.35 },
            0.7
          );

          // Phase C: Horizontal pan across the track
          tl.fromTo(
            track,
            { xPercent: 0 },
            {
              xPercent: (-100 * (count - 1)) / count,
              duration: count - 1,
            },
            1
          );

          tl.to({}, { duration: 0.2 });
        }
      );
    }, section);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const count = services.length;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services relative w-full bg-[#FAF9F6] text-[#0F1114] select-none border-b border-[#CBD5E1]"
    >
      {/* ===================================================================
          1. INTRO HEADER (Royal Rising Split Slide-in Animation)
          =================================================================== */}
      <div className="svc-intro w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 text-center flex flex-col items-center overflow-hidden">
        <h2 className="title font-heading font-black uppercase tracking-tight text-[#0F1114] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 sm:mb-6">
          OUR <span className="text-[#1E63D8]">SERVICES</span>
        </h2>
        <p className="para text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
          Working across disciplines of light gauge steel architecture, precision CAD/BIM engineering,
          automated roll-forming, and rapid on-site logistics, the dedicated team at Auzie Steel
          conceives, details, and delivers robust structural framing projects under one roof.
        </p>
      </div>

      {/* ===================================================================
          2. PINNED HORIZONTAL STAGE (Exact Royal Rising .svc & .svc__view)
          =================================================================== */}
      <div
        ref={svcRef}
        className="svc relative w-full h-screen overflow-hidden bg-[#FAF9F6]"
      >
        <div
          ref={viewRef}
          className="svc__view absolute inset-0 overflow-hidden will-change-transform bg-slate-950 shadow-2xl"
          style={{ transformOrigin: "50% 50%" }}
        >
          {/* Horizontal Pan Track */}
          <div
            ref={trackRef}
            className="svc__track h-full flex will-change-transform"
            style={{ width: `${100 * count}%` }}
          >
            {services.map((service) => (
              <article
                key={service.id}
                className="svc__slide relative h-full flex-1 overflow-hidden group"
              >
                {/* Background Architectural Image */}
                <div className="svc__img absolute inset-0">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority={service.id === "custom-designs"}
                  />
                </div>

                {/* Cinematic Tint / Dark Shade */}
                <div className="svc__shade absolute inset-0 bg-slate-950/50 transition-colors duration-300 group-hover:bg-slate-950/40" />

                {/* Floating Centered Service Card Information */}
                <div className="svc__label absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 gap-4 sm:gap-6 text-white">
                  {/* Circular Arrow Badge */}
                  <Link
                    href={service.href}
                    className="svc__arrow w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/70 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110 hover:bg-[#1E63D8] hover:border-transparent hover:text-white shadow-xl"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    →
                  </Link>

                  {/* Title */}
                  <h3 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white max-w-4xl leading-[1.05] drop-shadow-lg">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed drop-shadow-md">
                    {service.description}
                  </p>

                  {/* View Details Link */}
                  <Link
                    href={service.href}
                    className="mt-2 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-white/80 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    Explore {service.title} →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Floating Live Slide Counter at Bottom-Right */}
          <div
            className="svc__count absolute bottom-8 right-6 sm:bottom-10 sm:right-12 z-20 font-mono text-xs sm:text-sm tracking-widest text-white/90 bg-slate-950/70 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-xl pointer-events-none"
            aria-hidden="true"
          >
            {String(activeIdx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}
