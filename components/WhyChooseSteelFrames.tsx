"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  id: string;
  step: string;
  title: string;
  quote: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  linkText: string;
  href: string;
}

const features: FeatureItem[] = [
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
  },
];

export default function WhyChooseSteelFrames() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageScaleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!section || !pinWrapper) return;

    const ctx = gsap.context(() => {
      // 1. Initial State: Slide 0 active, Slides 1..3 hidden
      features.forEach((_, idx) => {
        const img = imageRefs.current[idx];
        const scale = imageScaleRefs.current[idx];
        const text = textRefs.current[idx];

        if (img) {
          gsap.set(img, {
            clipPath: idx === 0 ? "inset(-4px -4px -4px -4px)" : "inset(100% -4px -4px -4px)",
            zIndex: idx + 1,
          });
        }
        if (scale) {
          gsap.set(scale, { scale: 1.02 });
        }
        if (text) {
          gsap.set(text, {
            opacity: idx === 0 ? 1 : 0,
            y: idx === 0 ? 0 : 32,
            pointerEvents: idx === 0 ? "auto" : "none",
          });
        }
      });

      // 2. Master Scrubbed Timeline for 100% Buttery Smooth Scrolling Transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "whyChooseSteelFramesSmoothTrigger",
          trigger: pinWrapper,
          start: "top top",
          end: () => `+=${(features.length - 1) * window.innerHeight * 1.4}`,
          pin: pinWrapper,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.2, // Silk-smooth inertia damping
          snap: {
            snapTo: 1 / (features.length - 1),
            duration: { min: 0.35, max: 0.65 },
            delay: 0.2,
            ease: "power2.out",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentStep = Math.min(
              features.length - 1,
              Math.max(0, Math.round(self.progress * (features.length - 1)))
            );
            textRefs.current.forEach((t, i) => {
              if (t) {
                t.style.pointerEvents = i === currentStep ? "auto" : "none";
              }
            });
          },
        },
      });

      // 3. Build smooth sequential transition phases
      for (let i = 0; i < features.length - 1; i++) {
        const currentText = textRefs.current[i];
        const nextText = textRefs.current[i + 1];
        const nextImg = imageRefs.current[i + 1];
        const nextScale = imageScaleRefs.current[i + 1];

        // Hold current slide comfortably so user can read
        tl.to({}, { duration: 0.35 });

        // Smooth synchronized crossfade of text + upward wipe of image
        const stepTransition = gsap.timeline();

        if (currentText) {
          stepTransition.to(
            currentText,
            {
              opacity: 0,
              y: -32,
              duration: 0.65,
              ease: "power2.inOut",
            },
            0
          );
        }

        if (nextText) {
          stepTransition.fromTo(
            nextText,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
            },
            0.15
          );
        }

        if (nextImg) {
          stepTransition.fromTo(
            nextImg,
            { clipPath: "inset(100% -4px -4px -4px)" },
            {
              clipPath: "inset(-4px -4px -4px -4px)",
              duration: 0.95,
              ease: "power2.inOut",
            },
            0
          );
        }

        if (nextScale) {
          stepTransition.fromTo(
            nextScale,
            { scale: 1.07 },
            {
              scale: 1.02,
              duration: 0.95,
              ease: "power1.out",
            },
            0
          );
        }

        tl.add(stepTransition);
      }

      // Final hold on the last slide
      tl.to({}, { duration: 0.4 });
    }, section);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getById("whyChooseSteelFramesSmoothTrigger")?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="why-choose-steel-frames"
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F6] text-[#0F1114] select-none border-b border-[#E2E8F0]"
    >
      {/* =====================================================================
          1. INTRO HEADER (Clean Architecture Editorial Entrance - Generous Space)
          ===================================================================== */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-40 md:pt-48 lg:pt-56 pb-20 sm:pb-28 md:pb-36 lg:pb-44 text-center flex flex-col items-center justify-center overflow-hidden border-b border-[#E2E8F0]/60">
        <h2 className="font-sans font-medium uppercase tracking-tight text-[#0F1114] text-xl sm:text-3xl md:text-4xl lg:text-[44px] mb-3 sm:mb-5">
          WHY CHOOSE <span className="text-[#1E63D8]">STEEL FRAMING?</span>
        </h2>
        <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
          We manufacture custom light gauge steel framing with millimetre precision. Discover why South Australian builders choose Auzie Steel for complex cantilevers, 50-year TRUECORE® steel durability, BAL-FZ applications and rapid on-site logistics.
        </p>
      </div>

      {/* =====================================================================
          2. PINNED ZORGE-9 LUXURY STAGE
          Split Stage: Pinned Full-Screen Container (100% Fullscreen at Top)
          ===================================================================== */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-[#FAF9F6] flex items-center justify-center"
      >
        <div className="relative w-full h-full flex flex-col lg:flex-row items-stretch">

          {/* =================================================================
              LEFT: ARCHITECTURAL IMAGE STAGE (50% desktop + 1px subpixel overlap)
              Zorge 9 imageClipIn wipe reveal
              ================================================================= */}
          <div className="relative w-full lg:w-[calc(50%+1px)] lg:-mr-[1px] h-[45vh] lg:h-full overflow-hidden bg-transparent flex-none z-10">
            {features.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full will-change-[clip-path]"
                style={{
                  zIndex: idx + 1,
                  clipPath: idx === 0 ? "inset(-4px -4px -4px -4px)" : "inset(100% -4px -4px -4px)",
                }}
              >
                <div
                  ref={(el) => {
                    imageScaleRefs.current[idx] = el;
                  }}
                  className="w-full h-full relative will-change-transform scale-[1.02]"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    priority={idx === 0}
                    quality={90}
                    className="object-cover object-center will-change-transform"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* =================================================================
              RIGHT: ELECTRIC BLUE INFORMATION STAGE (50% desktop, full-height)
              Editorial Content: Category Kicker + Title + Quote + Description + CTA
              ================================================================= */}
          <div className="relative w-full lg:w-1/2 h-[55vh] lg:h-full bg-[#1E63D8] text-white flex flex-col justify-center items-center p-6 sm:p-10 lg:p-14 xl:p-16 2xl:p-20 box-border overflow-hidden z-20">
            {features.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  textRefs.current[idx] = el;
                }}
                className="absolute inset-0 p-6 sm:p-10 lg:p-14 xl:p-16 2xl:p-20 flex flex-col justify-center items-start gap-4 sm:gap-6 will-change-transform max-w-xl mx-auto lg:mx-0"
                style={{
                  zIndex: idx + 1,
                  pointerEvents: idx === 0 ? "auto" : "none",
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? "none" : "translateY(38px)",
                }}
              >

                {/* Title */}
                <h3 className="text-white font-sans font-medium uppercase tracking-tight text-[clamp(2.2rem,3.6vw,3.8rem)] leading-[1.06]">
                  {item.title}
                </h3>

                {/* Quote / Tagline */}
                <p className="text-white font-light text-[clamp(1.15rem,1.45vw,1.55rem)] leading-[1.38] max-w-[36ch]">
                  {item.quote}
                </p>

                {/* Detailed Description */}
                <p className="text-blue-50/90 font-light text-[clamp(14px,0.95vw,15.5px)] leading-[1.75] max-w-[48ch]">
                  {item.text}
                </p>

                {/* Action Button */}
                <div className="pt-2 sm:pt-4">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[10px] bg-white hover:bg-blue-50 text-[#1E63D8] hover:text-[#1650B5] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-black/15 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{item.linkText}</span>
                    <span aria-hidden="true" className="text-base font-bold">↗</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
