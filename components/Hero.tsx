"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);

  // GSAP Entrance and Parallax Scroll Effect
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial entrance animations on page load
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        );

      // Subtle Parallax fade on scroll down towards Intro Section
      if (containerRef.current && contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -20,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-slate-950 text-white select-none"
    >
      {/* Background High-Impact Video (Pure 1:1 Sharp Video, No Blur, No Scrim) */}
      <video
        ref={videoRef}
        src="/video/latest_video.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Hero Content Container */}
      <div
        ref={contentRef}
        className="relative z-20 w-full h-full flex flex-col justify-center pt-20 sm:pt-24 lg:pt-28"
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-14">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5 text-left">
            {/* Main Editorial Headline (Reduced Font Size, Clean & Sharp) */}
            <h1
              ref={headingRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-sans font-medium tracking-tight text-white uppercase leading-[1.14] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            >
              SOUTH AUSTRALIA&apos;S <br className="hidden sm:inline" />
              <span className="text-[#3B82F6] font-medium">PREMIER STEEL</span>{" "}
              <span className="text-white font-medium">FRAMES</span>
            </h1>

            {/* Subheadline: Clean & Balanced */}
            <div
              ref={subtitleRef}
              className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm md:text-base font-normal text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              <span className="text-white font-medium">
                Light Gauge Steel Manufacturer
              </span>
              <span className="text-white/60">·</span>
              <span className="text-white font-medium">
                Steel Frame Manufacturer
              </span>
            </div>

            {/* Call-to-Action Buttons */}
            <div
              ref={buttonsRef}
              className="pt-2 sm:pt-3 flex flex-wrap items-center gap-4 pointer-events-auto"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#1E63D8] hover:bg-[#1551b8] shadow-lg shadow-blue-600/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                Get a Quote
              </Link>

              <Link
                href="/steel-frames"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-white bg-slate-900/80 hover:bg-slate-900 border border-white/20 backdrop-blur-md shadow-lg shadow-slate-950/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Mute/Unmute Toggle Button */}
      <button
        onClick={toggleSound}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute bottom-8 right-6 sm:right-10 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group"
      >
        {isMuted ? (
          <svg
            className="w-5 h-5 text-white/80 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-blue-400 group-hover:text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center pointer-events-none opacity-70">
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300 mb-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          Scroll to explore
        </span>
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center p-1 drop-shadow-md">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
