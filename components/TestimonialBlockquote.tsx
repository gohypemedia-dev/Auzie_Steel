"use client";

import { useState, useEffect } from "react";
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
      "“Our industry and the relationships within our industry are complex, which can be frustrating, but can also be very rewarding. Working with Varco Pruden makes a tough business a little bit easier.”",
    author: "Ammon Bingham,",
    position: "Teton West Construction",
    imageSrc: "/builder-ammon-bingham.jpg",
    imageAlt: "Ammon Bingham of Teton West Construction",
  },
  {
    id: "ryan-klosterman",
    quote:
      "“VP offers the best service and communication of any manufacturer that I've ever worked with. I can't find a better design build partner than them.”",
    author: "Ryan Klosterman,",
    position: "Image Building Systems",
    imageSrc: "/builder-ryan-klosterman.jpg",
    imageAlt: "Ryan Klosterman of Image Building Systems",
  },
  {
    id: "david-demaio",
    quote:
      "“It's a true partnership. Varco Pruden never shies away from a challenge. They find the right solution. VP goes beyond steel and the value of VP technology can't be matched.”",
    author: "David DeMaio,",
    position: "Pat Munger Construction Company",
    imageSrc: "/builder-david-demaio.jpg",
    imageAlt: "David DeMaio of Pat Munger Construction Company",
  },
];

export default function TestimonialBlockquote() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const current = testimonials[activeIdx];

  const changeSlide = (newIdx: number) => {
    if (newIdx === activeIdx) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIdx(newIdx);
      setIsFading(false);
    }, 250);
  };

  const handlePrev = () => {
    const nextIdx = (activeIdx - 1 + testimonials.length) % testimonials.length;
    changeSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % testimonials.length;
    changeSlide(nextIdx);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [activeIdx]);

  return (
    <section className="relative w-full bg-[#3168ff] text-white py-16 sm:py-20 lg:py-24 select-none overflow-hidden">
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          
          {/* ===================================================================
              LEFT COLUMN (Col 1 to 7): Large Blockquote + Builder Feedback Icon + Attribution
              =================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[360px] sm:min-h-[400px]">
            {/* Quote content with smooth fade transition */}
            <div
              className={`transition-opacity duration-300 ${
                isFading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
              }`}
            >
              <blockquote className="font-sans font-normal text-white text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] leading-[1.25] tracking-tight">
                {current.quote}
              </blockquote>
            </div>

            {/* Author Attribution, Hardhat Icon & Slider Controls */}
            <div className="pt-10 sm:pt-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/20 mt-8">
              
              {/* Builder Icon + Author Name */}
              <div className="flex items-center gap-4">
                {/* Yellow Builder Hardhat Icon (Exact Varco Pruden Icon) */}
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0 p-2.5">
                  <Image
                    src="/builder-feedback-icon.svg"
                    alt="Builder Feedback"
                    width={28}
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div
                  className={`transition-opacity duration-300 ${
                    isFading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="block font-sans font-bold text-base sm:text-lg text-white leading-tight">
                    {current.author}
                  </span>
                  <span className="block font-sans font-normal text-xs sm:text-sm text-white/85 mt-0.5">
                    {current.position}
                  </span>
                </div>
              </div>

              {/* Slider Controls (Exact Varco Pruden Circle Arrows + Step Indicator) */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/70 mr-1 tracking-wider">
                  0{activeIdx + 1} / 0{testimonials.length}
                </span>

                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full border border-white/35 hover:border-white hover:bg-white hover:text-[#3168ff] flex items-center justify-center transition-all active:scale-95 text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full border border-white/35 hover:border-white hover:bg-white hover:text-[#3168ff] flex items-center justify-center transition-all active:scale-95 text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN (Col 8 to 12): Photographic Builder Headshot
              =================================================================== */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[6px] overflow-hidden bg-blue-900/40 border border-white/20 shadow-2xl">
              {testimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === activeIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={t.imageSrc}
                    alt={t.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-top"
                    priority={idx === 0}
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

