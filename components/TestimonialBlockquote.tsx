"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  imageSrc: string;
  imageAlt: string;
}

const testimonials: Testimonial[] = [
  {
    id: "ammon-bingham",
    quote:
      "“Our industry and the relationships within our industry are complex, which can be frustrating, but can also be very rewarding. Working with Auzie Steel makes a tough business a little bit easier.”",
    author: "Ammon Bingham,",
    position: "Teton West Construction",
    imageSrc: "/builder-ammon-bingham.jpg",
    imageAlt: "Ammon Bingham of Teton West Construction",
  },
  {
    id: "ryan-klosterman",
    quote:
      "“Auzie Steel offers the best service and communication of any manufacturer that I've ever worked with. I can't find a better design build partner than them.”",
    author: "Ryan Klosterman,",
    position: "Image Building Systems",
    imageSrc: "/builder-ryan-klosterman.jpg",
    imageAlt: "Ryan Klosterman of Image Building Systems",
  },
  {
    id: "david-demaio",
    quote:
      "“It's a true partnership. Auzie Steel never shies away from a challenge. They find the right solution. Auzie Steel goes beyond steel and the value of precision engineering can't be matched.”",
    author: "David DeMaio,",
    position: "Pat Munger Construction Company",
    imageSrc: "/builder-david-demaio.jpg",
    imageAlt: "David DeMaio of Pat Munger Construction Company",
  },
];

export default function TestimonialBlockquote() {
  const [activeIdx, setActiveIdx] = useState(0); // Starts at Ammon Bingham (Slide 0)
  const [displayQuoteIdx, setDisplayQuoteIdx] = useState(0);
  const [isQuoteFading, setIsQuoteFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isTransitioningRef = useRef(false);

  // Smooth synchronized slide transition matching Varco Pruden cubic-bezier curves
  const changeSlide = (newIdx: number) => {
    if (newIdx === activeIdx || isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    // 1. Trigger quote text fade-out
    setIsQuoteFading(true);
    setActiveIdx(newIdx);

    // 2. Midway through image glide, switch quote text and fade-in
    setTimeout(() => {
      setDisplayQuoteIdx(newIdx);
      setIsQuoteFading(false);
    }, 220);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 650);
  };

  const handlePrev = () => {
    const nextIdx = (activeIdx - 1 + testimonials.length) % testimonials.length;
    changeSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % testimonials.length;
    changeSlide(nextIdx);
  };

  // Autoplay every 8 seconds, smoothly pauses when user hovers or interacts
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [activeIdx, isPaused]);

  return (
    <section
      className="relative w-full min-h-screen md:h-screen min-h-[100dvh] bg-white text-slate-900 select-none overflow-hidden flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full h-full flex-1 flex flex-col">
        {/* ===================================================================
            TWO-COLUMN FULL-WIDTH FULL-SCREEN BLOCKQUOTE (100vh Edge-to-Edge)
            =================================================================== */}
        <div className="relative flex flex-col-reverse md:flex-row items-stretch w-full h-full flex-1 min-h-[100dvh]">
          
          {/* ===================================================================
              LEFT COLUMN: Electric Blue Speech Bubble (#3168ff)
              Full-width 50% left half with full viewport height & centered quote
              =================================================================== */}
          <div className="relative w-full md:w-1/2 bg-[#3168ff] text-white p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 2xl:p-24 z-10 flex flex-col justify-between shadow-sm min-h-[360px] sm:min-h-[440px] md:min-h-0">
            
            {/* Top / Spacer */}
            <div className="hidden md:block" />

            {/* Main Blockquote (Smooth opacity crossfade matching VP .fade-in / .fade-out) */}
            <div className="relative my-auto py-4 sm:py-6 lg:py-10 flex items-center">
              <blockquote
                className="font-sans font-normal text-white text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[34px] 2xl:text-[38px] leading-[1.34] tracking-tight will-change-[opacity]"
                style={{
                  opacity: isQuoteFading ? 0 : 1,
                  transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                {testimonials[displayQuoteIdx].quote}
              </blockquote>
            </div>

            {/* Bottom Row: Hardhat Icon on Left, Sliding Attribution Wheel on Right */}
            <div className="pt-4 sm:pt-6 lg:pt-10 flex items-end justify-between gap-6 border-t border-white/15">
              
              {/* Builder Hardhat Icon */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 relative opacity-95">
                <Image
                  src="/builder-feedback-icon.svg"
                  alt="Builder Icon"
                  width={28}
                  height={28}
                  className="w-6 h-6 sm:w-7 sm:h-7"
                />
              </div>

              {/* Attribution Vertical Sliding Wheel (Exact Varco Pruden .list-quote-attribution-inner) */}
              <div className="overflow-hidden h-12 sm:h-14 relative text-right">
                <div
                  className="flex flex-col will-change-transform"
                  style={{
                    transform: `translateY(-${(activeIdx * 100) / testimonials.length}%)`,
                    transition: "transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="h-12 sm:h-14 flex flex-col justify-center text-right shrink-0"
                    >
                      <div className="font-sans font-medium text-white text-sm sm:text-base lg:text-lg leading-snug">
                        {t.author}
                      </div>
                      <div className="font-sans font-normal text-white/80 text-xs sm:text-sm leading-snug mt-0.5">
                        {t.position}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: Photographic Builder Portrait
              Full-width 50% right half, full viewport height (100vh)
              =================================================================== */}
          <div className="relative w-full md:w-1/2 min-h-[260px] sm:min-h-[340px] md:min-h-0 h-[280px] sm:h-[360px] md:h-auto overflow-hidden bg-slate-100">
            {/* Builder Portrait Images (Exact Varco Pruden translateY glide & opacity curve) */}
            {testimonials.map((t, idx) => {
              const isActive = idx === activeIdx;
              const isPast = idx < activeIdx;

              return (
                <div
                  key={t.id}
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateY(0%)"
                      : isPast
                      ? "translateY(-15%)"
                      : "translateY(25%)",
                    transition:
                      "opacity 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    zIndex: isActive ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={t.imageSrc}
                    alt={t.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority={idx === 0 || idx === 1}
                  />
                </div>
              );
            })}

            {/* Bottom-Right Floating Navigation Arrows (Clean floating pill, no cutouts on photo) */}
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2.5 sm:gap-3 bg-white/95 backdrop-blur-md px-3.5 sm:px-5 py-2 sm:py-3 rounded-full shadow-xl border border-slate-200/80">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-1 text-[#202020] hover:text-[#3168ff] transition-all hover:scale-110 active:scale-95 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M26 16H6M13 9L6 16l7 7" />
                </svg>
              </button>

              <div className="w-[1px] h-4 bg-slate-300" />

              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-1 text-[#202020] hover:text-[#3168ff] transition-all hover:scale-110 active:scale-95 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 16h20M19 9l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
