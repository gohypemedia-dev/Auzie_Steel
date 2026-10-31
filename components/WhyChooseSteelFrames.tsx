"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

interface FeatureService {
  id: string;
  step: string;
  pill: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  imageSrc: string;
  imageAlt: string;
  linkText: string;
  href: string;
}

const services: FeatureService[] = [
  {
    id: "customisable",
    step: "01",
    pill: "ARCHITECTURAL FREEDOM",
    title: "Customisable",
    tagline: "We can manufacture any design created by an architect.",
    description:
      "We manufacture bespoke light gauge steel frames directly from CAD/BIM models with extreme millimeter accuracy. Build cantilevers, double-height ceiling voids, and expansive open-plan spans with complete structural confidence.",
    specs: ["Architectural Freedom", "CAD/BIM Direct", "Millimeter Precision"],
    imageSrc: "/why-choose-customisable-main.jpg",
    imageAlt: "Auzie Steel Customisable Steel Frames",
    linkText: "View Customisable Specs",
    href: "/steel-frames",
  },
  {
    id: "durable",
    step: "02",
    pill: "PERMANENT INTEGRITY",
    title: "Durable",
    tagline: "Our steel frames will not rot, warp, twist or attract termites.",
    description:
      "Manufactured from high-tensile BlueScope Truecore® steel, our structural framing will not rot, warp, twist, shrink or sag over decades of building life. 100% immune to termite infestation, moisture, and fungal decay.",
    specs: ["50-Year Warranty*", "Zero Wood Rot", "100% Termite Proof"],
    imageSrc: "/why-choose-durable-main.jpg",
    imageAlt: "Durable Termite Proof Steel Frames",
    linkText: "View Durability Specs",
    href: "/steel-frames",
  },
  {
    id: "fire-retardant",
    step: "03",
    pill: "BUSHFIRE PROTECTION",
    title: "Fire retardant",
    tagline: "Steel is a naturally non-combustible material, ideal for housing frames, especially in fire-prone areas.",
    description:
      "Steel is inherently non-combustible and will not ignite or fuel flames. It is the premier structural framing choice for Australian domestic builds, especially across bushfire-prone zones complying with strict Australian building regulations.",
    specs: ["Non-Combustible", "BAL-FZ FlameZone", "AS 3959 Compliant"],
    imageSrc: "/why-choose-fire-main.jpg",
    imageAlt: "Non Combustible Fire Retardant Framing",
    linkText: "View Fire Resistance Specs",
    href: "/steel-frames",
  },
  {
    id: "transportation",
    step: "04",
    pill: "RAPID DEPLOYMENT",
    title: "Transportation",
    tagline: "Our lightweight steel frames are easy to transport, and installation needs less manpower and minimal manual labour.",
    description:
      "Our lightweight steel framing packs arrive directly to site in sequenced, colour-coded bundles. Installation requires significantly less crane time, smaller onsite crews, and minimal manual lifting, keeping your construction weeks ahead of schedule.",
    specs: ["Lightweight Packs", "Minimal Manual Labour", "Rapid Site Assembly"],
    imageSrc: "/why-choose-transport-main.jpg",
    imageAlt: "Lightweight High Speed Site Transportation",
    linkText: "View Transportation Specs",
    href: "/contact",
  },
];

export default function WhyChooseSteelFrames() {
  return (
    <section
      id="why-choose-steel-frames"
      className="relative w-full bg-[#FAF9F6] text-[#0F1114] border-b border-[#CBD5E1] select-none"
    >
      {/* Background Subtle Radial Architectural Dots */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ===================================================================
          SECTION HEADER
          =================================================================== */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-12 sm:pb-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.14] max-w-4xl mx-auto">
          WHY CHOOSE STEEL FRAMES FOR{" "}
          <span className="text-[#1E63D8]">YOUR NEXT PROJECT</span>
        </h2>

        <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Engineered for precision, permanence, and compliance with the most stringent Australian standards.
        </p>
      </div>

      {/* ===================================================================
          STACKING CARDS WRAPPER (Large Panoramic Cards with 12px Radius)
          =================================================================== */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        <div className="relative">
          {services.map((service, idx) => {
            const isLast = idx === services.length - 1;

            return (
              <Fragment key={service.id}>
                {/* Sticky Card - identical top (96px) and identical height on all cards so each new card 100% covers the previous card with zero visible peek-through */}
                <div
                  className="sticky w-full mb-0"
                  style={{
                    top: "96px",
                    zIndex: 10 + idx,
                  }}
                >
                  <div className="w-full bg-white rounded-[12px] border border-[#CBD5E1] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[480px] sm:min-h-[520px] lg:h-[580px]">
                    {/* Left Column: Information & Specs (50% on Desktop) */}
                    <div className="lg:col-span-6 p-6 sm:p-9 lg:p-11 xl:p-12 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-[34px] text-[#0F1114] uppercase leading-tight mb-3">
                          {service.title}
                        </h3>

                        {/* Tagline / Subhead */}
                        <p className="font-semibold text-sm sm:text-base text-slate-800 leading-snug mb-3">
                          {service.tagline}
                        </p>

                        {/* Detailed Description */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                          {service.description}
                        </p>

                        {/* Technical Specs Pill Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                          {service.specs.map((spec, sIdx) => (
                            <div
                              key={sIdx}
                              className="px-3 py-2 rounded-[8px] bg-[#FAF9F6] border border-[#E2E8F0] text-center"
                            >
                              <span className="text-xs font-mono font-bold text-[#0F1114] block">
                                {spec}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Status & Scroll Down Indicator (Exact Smile Concepts Pattern) */}
                      <div className="mt-6 pt-4 border-t border-[#F0ECE4] flex items-center justify-between text-xs sm:text-[13px] font-mono">
                        <span className="text-slate-500 font-bold">
                          {idx + 1} of {services.length} • {service.title}
                        </span>

                        {!isLast ? (
                          <span className="text-[#1E63D8] font-bold flex items-center gap-1">
                            Scroll down for {services[idx + 1].title} ↓
                          </span>
                        ) : (
                          <Link
                            href={service.href}
                            className="text-[#1E63D8] hover:underline font-bold flex items-center gap-1"
                          >
                            View All Framing Solutions →
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Architectural Image (50% on Desktop) */}
                    <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-slate-100">
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </div>

                {/* In-flow spacer between cards so each card docks smoothly one by one without tedious scroll */}
                {!isLast ? (
                  <div className="h-[32vh] sm:h-[35vh] pointer-events-none" aria-hidden="true" />
                ) : (
                  /* Trailing spacer so Card 4 stays docked in full view for reading before the whole deck scrolls away together */
                  <div className="h-[40vh] sm:h-[45vh] pointer-events-none" aria-hidden="true" />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
