"use client";

import { useEffect, useRef } from "react";
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
            scrub: 0.6,
          },
        });
      }

      // Pause video when offscreen to preserve GPU memory & maximize scroll smoothness
      const video = videoRef.current;
      if (video && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          },
          { threshold: 0.05 }
        );
        observer.observe(video);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] h-screen overflow-hidden bg-slate-950 text-white select-none"
    >
      {/* Background High-Impact Video (Pure 1:1 Sharp Video, No Blur, No Scrim) */}
      <video
        ref={videoRef}
        src="/video/latest_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Hero Content Container */}
      <div
        ref={contentRef}
        className="relative z-20 w-full h-full flex flex-col justify-center pt-32 sm:pt-36 lg:pt-44"
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5 text-left mt-16 sm:mt-24 lg:mt-32">
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
              className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-xs sm:text-sm md:text-base font-normal text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
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
              className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pointer-events-auto w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#1E63D8] hover:bg-[#1551b8] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-center"
              >
                Get a Quote
              </Link>

              <Link
                href="/steel-frames"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-white bg-slate-900/80 hover:bg-slate-900 border border-white/20 backdrop-blur-md shadow-lg shadow-slate-950/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-center"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
