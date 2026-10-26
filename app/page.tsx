import Link from "next/link";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import WhatWeDo from "@/components/WhatWeDo";
import WhyChooseSteel from "@/components/WhyChooseSteel";

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <Hero />

      {/* 2. Intro Section */}
      <IntroSection />

      {/* 3. What We Do (4 Cards) */}
      <WhatWeDo />

      {/* 4. Why Choose Steel Frames (Interactive Section) */}
      <WhyChooseSteel />

      {/* Flagship Systems Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">OUR CORE INNOVATIONS</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wide">
            BUILT FOR BUILDERS WHO DEMAND PRECISION
          </p>
          <p className="text-slate-400 mt-3 text-base">
            From precision roll-formed wall framing to high-load acoustic Alpha Floor systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Steel Frames */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-600 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 uppercase">STEEL FRAMES</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Computer-aided CNC manufactured wall frames, floor cassettes, and roof trusses using high-tensile BlueScope Truecore® steel. Unmatched structural precision for residential homes and commercial developments.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Pre-punched service holes for rapid plumbing &amp; electrical rough-in
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Non-combustible fire-rated structural performance
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Custom engineered to exact architectural designs
                </li>
              </ul>
            </div>
            <Link
              href="/steel-frames"
              className="inline-flex items-center font-bold text-white hover:text-slate-300 group uppercase tracking-wider text-sm"
            >
              LEARN MORE ABOUT STEEL FRAMES
              <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Card 2: Alpha Floor */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-600 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 uppercase">ALPHA FLOOR</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                The revolutionary engineered steel floor joist system. Designed for ultra-long clear spans, squeak-free floors, exceptional acoustic dampening, and streamlined installation.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Superior load capacity and clear spans up to 7+ meters
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Guaranteed squeak-free structural floor integrity
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Large service duct cutouts for HVAC and major piping
                </li>
              </ul>
            </div>
            <Link
              href="/alpha-floor"
              className="inline-flex items-center font-bold text-white hover:text-slate-300 group uppercase tracking-wider text-sm"
            >
              LEARN MORE ABOUT ALPHA FLOOR
              <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action banner */}
      <section className="bg-slate-900 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wide">
            READY TO BUILD SMARTER WITH AUZIE STEEL?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto">
            Send us your plans for a free consultation and prompt engineering takeoff estimate.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wider text-white bg-[#1E63D8] hover:bg-[#1650b5] border border-[#1E63D8] shadow-2xl shadow-[#1E63D8]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              GET IN TOUCH TODAY
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
