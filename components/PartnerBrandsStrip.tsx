"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PartnerBrandsStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Guaranteed GSAP infinite continuous horizontal autoplay marquee (Smooth & leisurely pace)
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 65,
      ease: "none",
      repeat: -1,
    });
    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  // Verified South Australian & Adelaide light-gauge steel ecosystem brands
  const localBrands = [
    {
      id: "bluescope",
      name: "BlueScope Steel",
      subtitle: "Australian Steel Producer",
      logo: (
        <svg viewBox="0 0 160 50" className="h-10 sm:h-11 md:h-12 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <g fill="#ffffff">
            <path d="M14 26 C20 18, 28 18, 34 23 C40 28, 48 28, 54 20 L50 16 C45 22, 39 22, 34 18 C27 13, 19 14, 12 21 Z" fill="rgba(255,255,255,0.75)" />
            <path d="M18 21 C24 13, 32 13, 38 18 C44 23, 52 23, 58 15 L54 11 C49 17, 43 17, 38 13 C31 8, 23 9, 16 16 Z" fill="rgba(255,255,255,0.9)" />
            <path d="M22 16 C28 8, 36 8, 42 13 C48 18, 56 18, 62 10 L58 6 C53 12, 47 12, 42 8 C35 3, 27 4, 20 11 Z" fill="#ffffff" />
            <text x="36" y="44" textAnchor="middle" fontFamily="var(--font-montserrat), sans-serif" fontWeight="900" fontSize="12" letterSpacing="0.06em" fill="#ffffff">BLUESCOPE</text>
          </g>
        </svg>
      ),
    },
    {
      id: "truecore",
      name: "TRUECORE® Steel",
      subtitle: "High-Tensile Framing Steel",
      logo: (
        <svg viewBox="0 0 170 50" className="h-10 sm:h-11 md:h-12 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <g fill="#ffffff">
            <text x="8" y="34" fontFamily="var(--font-inter), sans-serif" fontWeight="900" fontSize="27" letterSpacing="-0.03em" fill="#ffffff">Truecore</text>
            <circle cx="104" cy="25" r="4.2" fill="rgba(255,255,255,0.9)" />
            <text x="146" y="20" fontFamily="sans-serif" fontWeight="800" fontSize="11" fill="#ffffff">®</text>
            <text x="10" y="44" fontFamily="var(--font-montserrat), sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.2em" fill="rgba(255,255,255,0.75)">BY BLUESCOPE</text>
          </g>
        </svg>
      ),
    },
    {
      id: "fielders",
      name: "Fielders Steel",
      subtitle: "Adelaide Born & Established",
      logo: (
        <svg viewBox="0 0 165 50" className="h-10 sm:h-11 md:h-12 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <g fill="#ffffff">
            <path d="M12 32 L23 13 L34 32 L29 32 L23 20 L17 32 Z" fill="#ffffff" />
            <text x="38" y="32" fontFamily="var(--font-archivo-black), sans-serif" fontWeight="900" fontSize="20" letterSpacing="-0.02em" fill="#ffffff">FIELDERS</text>
            <text x="39" y="42" fontFamily="var(--font-montserrat), sans-serif" fontWeight="800" fontSize="7" letterSpacing="0.18em" fill="rgba(255,255,255,0.75)">SOUTH AUSTRALIA</text>
          </g>
        </svg>
      ),
    },
    {
      id: "stratco",
      name: "Stratco",
      subtitle: "Founded in Adelaide (1948)",
      logo: (
        <svg viewBox="0 0 160 50" className="h-10 sm:h-11 md:h-12 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <g fill="#ffffff">
            <text x="10" y="32" fontFamily="var(--font-archivo-black), sans-serif" fontWeight="900" fontSize="23" letterSpacing="0.04em" fill="#ffffff">STRATCO</text>
            <rect x="10" y="37" width="126" height="3" fill="rgba(255,255,255,0.85)" rx="1" />
            <text x="11" y="46" fontFamily="var(--font-montserrat), sans-serif" fontWeight="800" fontSize="6.5" letterSpacing="0.22em" fill="rgba(255,255,255,0.75)">HOW TO. MADE EASY.</text>
          </g>
        </svg>
      ),
    },
    {
      id: "lysaght",
      name: "Lysaght SA",
      subtitle: "Port Adelaide / Gillman Facility",
      logo: (
        <svg viewBox="0 0 160 50" className="h-10 sm:h-11 md:h-12 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <g fill="#ffffff">
            <text x="10" y="31" fontFamily="var(--font-archivo-black), sans-serif" fontWeight="900" fontSize="21" letterSpacing="0.08em" fill="#ffffff">LYSAGHT</text>
            <text x="11" y="42" fontFamily="var(--font-montserrat), sans-serif" fontWeight="800" fontSize="7" letterSpacing="0.24em" fill="rgba(255,255,255,0.75)">STEEL FOR AUSTRALIA</text>
          </g>
        </svg>
      ),
    },
    {
      id: "orrcon",
      name: "Orrcon Steel",
      subtitle: "Adelaide Regional Supply",
      logo: (
        <svg viewBox="0 0 165 50" className="h-10 sm:h-11 md:h-12 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="6" y="9" width="148" height="33" rx="16.5" fill="none" stroke="#ffffff" strokeWidth="2.4" />
            <circle cx="24" cy="25.5" r="7" fill="#ffffff" />
            <path d="M21 28 L27 23" stroke="#1E63D8" strokeWidth="2" strokeLinecap="round" />
            <text x="86" y="32" textAnchor="middle" fontFamily="var(--font-archivo-black), sans-serif" fontWeight="900" fontSize="13.5" fill="#ffffff" letterSpacing="0.02em">Orrcon Steel</text>
          </g>
        </svg>
      ),
    },
    {
      id: "framecad",
      name: "FRAMECAD",
      subtitle: "Precision Roll-Forming Technology",
      logo: (
        <svg viewBox="0 0 170 50" className="h-10 sm:h-11 md:h-12 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle cx="20" cy="25" r="13" fill="none" stroke="#ffffff" strokeWidth="3" />
            <circle cx="20" cy="25" r="7" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="42" y="32" fontFamily="var(--font-archivo-black), sans-serif" fontWeight="900" fontSize="19" fill="#ffffff" letterSpacing="0.07em">FRAMECAD</text>
          </g>
        </svg>
      ),
    },
  ];

  // Repeat for continuous seamless infinite marquee without gaps
  const loopItems = [...localBrands, ...localBrands, ...localBrands, ...localBrands];

  return (
    <section className="relative w-full bg-[#1E63D8] border-y border-[#1855BF] overflow-hidden select-none py-2 sm:py-2.5 z-20 shadow-md">
      {/* Marquee Container with GSAP Infinite Autoplay */}
      <div
        className="flex overflow-hidden"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div
          ref={trackRef}
          className="flex items-center will-change-transform"
          style={{ width: "max-content" }}
        >
          {loopItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="shrink-0 h-16 sm:h-20 px-6 sm:px-8 md:px-10 flex items-center justify-center border-r border-white/20 group hover:bg-white/10 transition-colors duration-200"
            >
              <div className="relative flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {brand.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
