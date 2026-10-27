import Link from "next/link";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import WhatWeDo from "@/components/WhatWeDo";
import ProjectsGallery from "@/components/ProjectsGallery";
import WhyChooseSteel from "@/components/WhyChooseSteel";

export default function Home() {
  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      {/* 1. Hero Section with Cinematic Typography & Curved Mask */}
      <Hero />

      {/* 2. Intro Section with Line-by-Line Reveals & Architectural Mask */}
      <IntroSection />

      {/* 3. Services / Capabilities (4 Interactive Zigzag Stages) */}
      <WhatWeDo />

      {/* 4. Projects & Image Gallery (Staggered Waterfall Columns from Reference Video) */}
      <ProjectsGallery />

      {/* 5. Why Choose Steel Frames (Interactive Benefit Cards) */}
      <WhyChooseSteel />

      {/* 6. Flagship Systems Section (Minimal White Architectural Luxury Aesthetic) */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#C9CED4]/60">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF0F2] border border-[#C9CED4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-[11px] font-bold font-label tracking-widest text-[#0F1114]">
              OUR CORE INNOVATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-[#0F1114] leading-[1.12]">
            BUILT FOR BUILDERS WHO DEMAND PRECISION
          </h2>
          
          <p className="text-[#8A929B] mt-3 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-normal">
            From precision roll-formed wall framing to high-load acoustic Alpha Floor systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Steel Frames */}
          <div className="rounded-[16px] bg-white border border-[#C9CED4] hover:border-[#1E63D8] p-8 sm:p-10 flex flex-col justify-between shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#1E63D8]/10 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EEF0F2] text-[#1E63D8] border border-[#C9CED4] flex items-center justify-center mb-6">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <h3 className="text-2xl font-heading uppercase text-[#0F1114] mb-3 tracking-tight">
                STEEL FRAMES
              </h3>

              <p className="text-[#8A929B] leading-relaxed mb-6 font-normal">
                Computer-aided CNC manufactured wall frames, floor cassettes, and roof trusses using high-tensile BlueScope Truecore® steel. Unmatched structural precision for residential homes and commercial developments.
              </p>

              <ul className="space-y-3 text-sm text-slate-700 mb-8 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
                  Pre-punched service holes for rapid plumbing &amp; electrical rough-in
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
                  Non-combustible fire-rated structural performance
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
                  Custom engineered to exact architectural designs
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link href="/steel-frames" className="btn-circle-arrow group">
                <span>LEARN MORE ABOUT STEEL FRAMES</span>
                <span className="circle-icon">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Card 2: Alpha Floor */}
          <div className="rounded-[16px] bg-white border border-[#C9CED4] hover:border-[#1E63D8] p-8 sm:p-10 flex flex-col justify-between shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#1E63D8]/10 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EEF0F2] text-[#1E63D8] border border-[#C9CED4] flex items-center justify-center mb-6">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>

              <h3 className="text-2xl font-heading uppercase text-[#0F1114] mb-3 tracking-tight">
                ALPHA FLOOR
              </h3>

              <p className="text-[#8A929B] leading-relaxed mb-6 font-normal">
                The revolutionary engineered steel floor joist system. Designed for ultra-long clear spans, squeak-free floors, exceptional acoustic dampening, and streamlined installation.
              </p>

              <ul className="space-y-3 text-sm text-slate-700 mb-8 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
                  Superior load capacity and clear spans up to 7+ meters
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
                  Guaranteed squeak-free structural floor integrity
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8]" />
                  Large service duct cutouts for HVAC and major piping
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link href="/alpha-floor" className="btn-circle-arrow group">
                <span>LEARN MORE ABOUT ALPHA FLOOR</span>
                <span className="circle-icon">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call to Action Banner (Minimalist Clean Architectural Layout) */}
      <section className="bg-[#0F1114] text-white py-20 sm:py-28 relative overflow-hidden">
        {/* Subtle grid accent */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-[11px] font-bold font-label tracking-widest text-[#EEF0F2]">
              START YOUR PROJECT
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-white leading-[1.12]">
            READY TO BUILD SMARTER WITH AUZIE STEEL?
          </h2>

          <p className="text-[#C9CED4] max-w-xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
            Send us your architectural plans for a comprehensive engineering takeoff estimate and manufacturer-direct pricing.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs sm:text-sm font-bold font-label tracking-wider text-[#0F1114] bg-white hover:bg-[#EEF0F2] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              REQUEST A TAKEOFF QUOTE
            </Link>
            <a
              href="tel:1300647833"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs sm:text-sm font-bold font-label tracking-wider text-white border border-[#C9CED4]/40 hover:bg-white/10 transition-all"
            >
              CALL 1300 647 833
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
