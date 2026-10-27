"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [activeLineIndex, setActiveLineIndex] = useState(0);

  // Smoothly alternate the capability line every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLineIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden bg-slate-950"
    >
      {/* High Quality Steel Framing Construction Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-construction.webp"
          alt="South Australia's Premier Light Gauge Steel Frames"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="object-cover object-[center_35%] scale-[1.02] transition-transform duration-1000"
        />
        {/* Cinematic dark gradients to give crystal-clear contrast to hero typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/25 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-12 lg:pl-14 xl:pl-16 pt-28 sm:pt-32 pb-16 pointer-events-auto">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-8">
          
          {/* 1. First Heading/Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/75 border border-white/20 backdrop-blur-md shadow-lg shadow-black/50">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-white">
              Exclusive Distributorship for SA &amp; NT
            </span>
          </div>

          {/* 2. Main Heading */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium uppercase tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              South Australia&apos;s Premier Steel Frames
            </h1>
          </div>

          {/* 3. Capability Dynamic Line & Sub-indicator */}
          <div className="space-y-3 pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-3">
              <span className="h-6 sm:h-8 w-1.5 bg-white rounded-full shadow-md shadow-white/30 shrink-0" />
              <div className="h-9 sm:h-11 flex items-center overflow-visible">
                <span className="whitespace-nowrap text-base sm:text-xl md:text-2xl lg:text-3xl font-light uppercase tracking-wide text-white transition-all duration-300">
                  {activeLineIndex === 0
                    ? "Light Gauge Steel Manufacturer"
                    : "Steel Frame Manufacturer"}
                </span>
              </div>
            </div>

            {/* Sub-indicator chips */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-light uppercase tracking-wider bg-black/75 backdrop-blur-md py-1.5 px-3.5 rounded-lg inline-flex border border-white/20 shadow-md whitespace-nowrap">
              <button
                type="button"
                onClick={() => setActiveLineIndex(0)}
                className={`transition-colors cursor-pointer ${
                  activeLineIndex === 0 ? "text-white font-normal" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Light Gauge Steel Manufacturer
              </button>
              <span className="text-slate-500">·</span>
              <button
                type="button"
                onClick={() => setActiveLineIndex(1)}
                className={`transition-colors cursor-pointer ${
                  activeLineIndex === 1 ? "text-white font-normal" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Steel Frame Manufacturer
              </button>
            </div>
          </div>

          {/* 4. Action CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-[#020618] hover:bg-[#071e4a] border border-white/30 shadow-2xl shadow-black hover:border-white/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center"
            >
              Get a Quote
            </Link>
            <Link
              href="/steel-frames"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-[#020618]/90 hover:bg-[#020618] border border-white/30 backdrop-blur-md hover:border-white/60 shadow-2xl shadow-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center"
            >
              Our Services
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
