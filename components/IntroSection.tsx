"use client";

import Image from "next/image";
import Link from "next/link";

export default function IntroSection() {
  return (
    <section
      className="relative w-full min-h-[620px] md:min-h-[680px] lg:min-h-[740px] flex items-center overflow-hidden border-b border-stone-300"
      style={{ backgroundColor: "#dbd6ce" }}
    >
      {/* Background Architectural Steelwork Photography with seamless #dbd6ce blend */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-1/2 overflow-hidden pointer-events-none">
        <Image
          src="/who-we-are-steelwork.jpg"
          alt="Auzie Steel - Structural Steel Framing Innovation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-50 mix-blend-multiply"
        />
        {/* Soft Left-Sided Gradient Blend to seamlessly merge with solid #dbd6ce */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#dbd6ce] via-[#dbd6ce]/60 to-transparent" />
      </div>

      {/* Main Content Layout - Aligned with HeroSection left boundary */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-12 lg:pl-14 xl:pl-16 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-7 text-left">
          
          {/* Top Brand Tag - matching "STEELWORK INNOVATIONS" badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm border-2 border-slate-900 flex items-center justify-center shrink-0">
              <div className="w-3.5 h-3.5 border-t-2 border-b-2 border-slate-900" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-black tracking-widest text-slate-950 uppercase">
                WHO WE ARE
              </span>
              <span className="block text-[10px] font-bold tracking-widest text-slate-700 uppercase">
                STEELWORK INNOVATIONS
              </span>
            </div>
          </div>

          {/* Main Huge Condensed Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-medium uppercase tracking-tight text-slate-950 leading-[1.08]">
            OUR COMPREHENSIVE,<br />
            DESIGN TO DELIVERY SERVICE<br />
            IS WHAT SETS US APART.
          </h2>

          {/* Subheading in Bold Uppercase */}
          <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide text-slate-900 leading-snug max-w-2xl">
            Auzie Steel is the leading manufacturer of customisable steel frames for the local building industry. Based in Adelaide, we rely on the latest technologies to produce housing frames made from light gauge steel.
          </p>

          {/* Supporting Paragraph */}
          <p className="text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed max-w-xl font-normal">
            We take care of every aspect of steel frame construction, from manufacturing the frame to delivery directly to site, to keep your project moving. We understand the importance of precision, efficiency and budget in every domestic building project.
          </p>

          {/* Call-to-action Button */}
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#020618] hover:bg-[#1E63D8] shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
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
