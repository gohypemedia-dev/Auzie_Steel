"use client";

import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="relative w-full min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] bg-slate-100 overflow-hidden flex items-center py-20 sm:py-24 lg:py-28 border-b border-slate-200">
      {/* ===================================================================
          BACKGROUND ARCHITECTURAL STEEL FRAME (High-Quality, Clean Negative Space)
          =================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/who-we-are-clean-hero.jpg"
          alt="Auzie Steel - Precision Light Gauge Steel Framing"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </div>

      {/* ===================================================================
          FOREGROUND INFORMATION (Left-Aligned in Clean Open Sky Zone)
          =================================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex flex-col justify-center">
        
        {/* Left Aligned Content Column */}
        <div className="max-w-xl xl:max-w-2xl text-left space-y-4 sm:space-y-5">
          
          {/* Main Heading: WHO WE ARE (Left-Aligned, Bold, Refined Font Size) */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-heading font-black tracking-tight text-[#0F1114] uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)]">
            WHO WE ARE
          </h2>

          {/* Secondary Heading: Black (#0F1114) and Blue (#1E63D8) */}
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[30px] font-heading font-black tracking-tight text-[#0F1114] leading-[1.18] drop-shadow-[0_1px_4px_rgba(255,255,255,0.85)]">
            Our comprehensive, <span className="text-[#1E63D8]">design to delivery</span> service is what sets us apart.
          </h3>

          {/* Formatted Text Blocks (Left Aligned, Clean Crisp Black) */}
          <div className="space-y-4 text-sm sm:text-base md:text-[16px] leading-relaxed">
            <p className="font-medium text-[#0F1114]">
              Auzie Steel is the leading manufacturer of customisable steel frames for the local building industry. Based in Adelaide, we rely on the latest technologies to produce housing frames made from light gauge steel.
            </p>

            <p className="font-normal text-[#0F1114]">
              We take care of every aspect of steel frame construction, from manufacturing the frame to delivery directly to site, to keep your project moving. We understand the importance of precision, efficiency and budget in every domestic building project.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
