"use client";

import Image from "next/image";
import Link from "next/link";

export default function IntroSection() {
  return (
    <section className="relative w-full min-h-[620px] md:min-h-[680px] lg:min-h-[740px] flex items-center overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Background Architectural Steelwork Photography */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/who-we-are-steelwork.jpg"
          alt="Auzie Steel - Structural Steel Framing Innovation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] md:object-center"
        />
        {/* Soft Left-Sided Vignette Gradient for Crystal Clear Text Legibility (as in reference image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent w-full md:w-5/6 lg:w-3/5 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>

      {/* Main Content Layout - Aligned with HeroSection left boundary */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-12 lg:pl-14 xl:pl-16 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-7 text-left">
          
          {/* Top Brand Tag - matching "STEELWORK INNOVATIONS" badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm border-2 border-white/80 flex items-center justify-center shrink-0">
              <div className="w-3.5 h-3.5 border-t-2 border-b-2 border-white" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-black tracking-widest text-white uppercase">
                WHO WE ARE
              </span>
              <span className="block text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                STEELWORK INNOVATIONS
              </span>
            </div>
          </div>

          {/* Main Huge Condensed Headline - matching "MODERN. ROBUST. BUILT TO LAST." */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-black uppercase tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            OUR COMPREHENSIVE,<br />
            DESIGN TO DELIVERY SERVICE<br />
            IS WHAT SETS US APART.
          </h2>

          {/* Subheading in Bold Uppercase - matching "ELEVATING ARCHITECTURE THROUGH PRECISION STEEL FABRICATION." */}
          <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] leading-snug max-w-2xl">
            Auzie Steel is the leading manufacturer of customisable steel frames for the local building industry. Based in Adelaide, we rely on the latest technologies to produce housing frames made from light gauge steel.
          </p>

          {/* Supporting Paragraph - matching "From complex structures to custom solutions..." */}
          <p className="text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed max-w-xl font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]">
            We take care of every aspect of steel frame construction, from manufacturing the frame to delivery directly to site, to keep your project moving. We understand the importance of precision, efficiency and budget in every domestic building project.
          </p>

          {/* Call-to-action Button - Blue #1E63D8 Pill with Arrow */}
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#1E63D8] hover:bg-[#1650b5] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
            >
              <span>EXPLORE OUR PROJECTS</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
