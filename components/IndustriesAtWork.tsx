"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface IndustryItem {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
}

const industries: IndustryItem[] = [
  {
    id: "distribution-warehouse",
    title: "Distribution & Warehouse",
    imageSrc: "/industry-warehouse.jpg",
    href: "/steel-frames",
  },
  {
    id: "hangars-aviation",
    title: "Hangars & Aviation",
    imageSrc: "/industry-hangars.jpg",
    href: "/steel-frames",
  },
  {
    id: "sports-recreation",
    title: "Sports & Recreation",
    imageSrc: "/industry-sports.jpg",
    href: "/steel-frames",
  },
  {
    id: "breweries-wineries",
    title: "Breweries & Wineries",
    imageSrc: "/industry-breweries.jpg",
    href: "/steel-frames",
  },
  {
    id: "retail-dining",
    title: "Retail & Dining",
    imageSrc: "/industry-retail.jpg",
    href: "/steel-frames",
  },
  {
    id: "education",
    title: "Education",
    imageSrc: "/industry-education.jpg",
    href: "/steel-frames",
  },
];

export default function IndustriesAtWork() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive itemsPerView detection (matches Varco Pruden swiper breakpoints)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, industries.length - itemsPerView);

  // Clamp currentIndex if window resize alters maxIndex
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Continuous Autoplay (advances every 3.8s, pauses smoothly when hovered or touched)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);

    return () => clearInterval(interval);
  }, [maxIndex, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch Swipe Support for Mobile & Tablet
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Mathematically precise translation offset with responsive gaps
  // 3 items: gap 40px, offset = currentIndex * (100% + 40px) / 3
  // 2 items: gap 24px, offset = currentIndex * (100% + 24px) / 2
  // 1 item:  gap 16px, offset = currentIndex * (100% + 16px)
  const getTranslateStyle = () => {
    if (itemsPerView === 3) {
      return `calc(-1 * ${currentIndex} * ((100% + 40px) / 3))`;
    }
    if (itemsPerView === 2) {
      return `calc(-1 * ${currentIndex} * ((100% + 24px) / 2))`;
    }
    return `calc(-1 * ${currentIndex} * (100% + 16px))`;
  };

  return (
    <section className="relative w-full bg-[#323232] text-white pt-12 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 lg:pb-28 select-none">


      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* ===================================================================
            1. SECTION HEADLINE & "VIEW ALL PROJECTS" (Exact Varco Pruden)
            =================================================================== */}
        <div className="flex items-center justify-between gap-6 mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium tracking-tight leading-tight">
            Industries at work.
          </h2>

          <Link
            href="/steel-frames"
            className="text-white hover:opacity-75 font-sans font-medium text-base sm:text-lg lg:text-[20px] flex items-center gap-2 group transition-opacity shrink-0"
          >
            <span>View All Projects</span>
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* ===================================================================
            2. INTERACTIVE SLIDER VIEWPORT (Exact 4:5 Aspect Ratio Cards + Autoplay)
            =================================================================== */}
        <div
          className="overflow-hidden w-full"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(${getTranslateStyle()})`,
              gap: itemsPerView === 3 ? "40px" : itemsPerView === 2 ? "24px" : "16px",
            }}
          >
            {industries.map((item) => (
              <div
                key={item.id}
                style={{
                  width:
                    itemsPerView === 3
                      ? "calc((100% - 80px) / 3)"
                      : itemsPerView === 2
                      ? "calc((100% - 24px) / 2)"
                      : "100%",
                }}
                className="shrink-0"
              >
                <Link
                  href={item.href}
                  className="group block relative focus:outline-none"
                >
                  {/* Image Container with 4:5 Aspect Ratio (200/250 in VP) */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2px] bg-[#242424] shadow-md">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Corner Action Button (Positioned at Bottom-Right, slides up into view on hover) */}
                    <div className="absolute bottom-0 right-0 w-14 h-14 lg:w-20 lg:h-20 bg-[#323232] text-white flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 pointer-events-none shadow-md">
                      <svg
                        className="w-5 h-5 lg:w-6 lg:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7H9M17 7V15" />
                      </svg>
                    </div>
                  </div>

                  {/* Clean Title Only (Exact Varco Pruden Style - No description subtitles) */}
                  <div className="pt-6 lg:pt-8">
                    <h3 className="font-sans font-medium text-xl sm:text-2xl text-white tracking-tight group-hover:text-white/80 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            3. SLIDER CONTROLS AT BOTTOM RIGHT (Exact Varco Pruden Nav Arrows)
            =================================================================== */}
        <div className="flex items-center gap-6 ml-auto mt-8 sm:mt-12 lg:mt-14 w-fit">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-0 border-0 bg-transparent text-white opacity-85 hover:opacity-100 active:scale-95 transition-all cursor-pointer"
          >
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M26 16H6M13 9L6 16l7 7" />
            </svg>
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="p-0 border-0 bg-transparent text-white opacity-85 hover:opacity-100 active:scale-95 transition-all cursor-pointer"
          >
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 16h20M19 9l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
