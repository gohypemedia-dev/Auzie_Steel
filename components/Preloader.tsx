"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Defensive check: ensure DOM elements exist before running GSAP
    if (
      !containerRef.current ||
      !topPanelRef.current ||
      !bottomPanelRef.current ||
      !centerRef.current ||
      !progressBarRef.current
    ) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      // Hardware GPU acceleration hints
      gsap.set([topPanelRef.current, bottomPanelRef.current], {
        force3D: true,
        backfaceVisibility: "hidden",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          document.body.style.overflow = originalOverflow;
        },
      });

      // 1. Progress bar smoothly fills to 100% over 1.6s with gentle deceleration
      tl.to(
        progressBarRef.current,
        {
          width: "100%",
          duration: 1.6,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Seamless continuous motion: As progress completes, center logo & dots
      // dissolve with a subtle upward float (no static pause!)
      tl.to(
        centerRef.current,
        {
          opacity: 0,
          y: -18,
          scale: 0.96,
          duration: 0.5,
          ease: "power2.inOut",
        },
        1.55
      );

      // 3. Split Curtain Shutter Reveal:
      // Glides open with ultra-smooth "power4.inOut" (silk-like acceleration & deceleration)
      // Begins just 70ms into the dissolve so the motion feels unified & continuous
      tl.to(
        topPanelRef.current,
        {
          yPercent: -100,
          duration: 1.35,
          ease: "power4.inOut",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        },
        1.62
      );

      tl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 1.35,
          ease: "power4.inOut",
          boxShadow: "0 -25px 50px -12px rgba(0, 0, 0, 0.15)",
        },
        1.62
      );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Only remove from DOM after the entire animation completes
  if (isComplete) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes sc-loader-pulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%       { transform: scale(1.18); opacity: 0.12; }
        }
        @keyframes sc-loader-logo-in {
          0%   { opacity: 0; transform: translateY(14px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sc-loader-dot {
          0%, 80%, 100% { transform: scaleY(0.45); opacity: 0.3; }
          40%            { transform: scaleY(1);    opacity: 1; }
        }
      `}</style>

      {/* Main Preloader Viewport Overlay */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none"
        role="progressbar"
        aria-label="Loading Auzie Steel"
      >
        {/* ===================================================================
            TOP CURTAIN PANEL (Ultra Butter-Smooth Slide UP)
            height: 50.5% eliminates subpixel center seam gap
            =================================================================== */}
        <div
          ref={topPanelRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "50.5%",
            backgroundColor: "#ffffff",
            transform: "translate3d(0, 0, 0)",
            willChange: "transform",
            borderBottom: "1px solid rgba(30, 99, 216, 0.08)",
            zIndex: 1,
          }}
        />

        {/* ===================================================================
            BOTTOM CURTAIN PANEL (Ultra Butter-Smooth Slide DOWN)
            height: 50.5% eliminates subpixel center seam gap
            =================================================================== */}
        <div
          ref={bottomPanelRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "50.5%",
            backgroundColor: "#ffffff",
            transform: "translate3d(0, 0, 0)",
            willChange: "transform",
            borderTop: "1px solid rgba(30, 99, 216, 0.08)",
            zIndex: 1,
          }}
        />

        {/* ===================================================================
            CENTER BRANDING & LOADER (Fades upward smoothly during split reveal)
            =================================================================== */}
        <div
          ref={centerRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform, opacity",
          }}
        >
          {/* Subtle Radial Pulsing Glow in Auzie Steel Brand Blue */}
          <div
            style={{
              position: "absolute",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(30, 99, 216, 0.15) 0%, transparent 70%)",
              animation: "sc-loader-pulse 2s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          {/* Brand Logo & Name with Entrance Animation */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              animation: "sc-loader-logo-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              opacity: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            <div className="relative w-44 sm:w-56 h-16 sm:h-20 flex items-center justify-center">
              <Image
                src="/auzie-steel-3d-logo.png"
                alt="AUZIE STEEL"
                width={220}
                height={90}
                priority
                className="max-h-full w-auto object-contain select-none drop-shadow-sm"
              />
            </div>

            <div className="mt-2.5 text-center flex flex-col items-center">
              <span className="text-sm sm:text-base font-bold tracking-[0.22em] text-[#0F1114] uppercase font-sans">
                AUZIE STEEL
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] text-[#1E63D8] font-bold uppercase mt-0.5 font-sans">
                LIGHT GAUGE STEEL
              </span>
            </div>
          </div>

          {/* 3 Animated Pulsating Equalizer Bars */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "1.75rem",
              zIndex: 1,
            }}
          >
            <span
              style={{
                display: "block",
                width: "5px",
                height: "20px",
                borderRadius: "3px",
                backgroundColor: "#1E63D8",
                animation: "sc-loader-dot 1s ease-in-out 0s infinite",
              }}
            />
            <span
              style={{
                display: "block",
                width: "5px",
                height: "20px",
                borderRadius: "3px",
                backgroundColor: "#1E63D8",
                animation: "sc-loader-dot 1s ease-in-out 0.15s infinite",
              }}
            />
            <span
              style={{
                display: "block",
                width: "5px",
                height: "20px",
                borderRadius: "3px",
                backgroundColor: "#1E63D8",
                animation: "sc-loader-dot 1s ease-in-out 0.3s infinite",
              }}
            />
          </div>

          {/* Bottom Progress Bar (Track & Animated Fill) */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              backgroundColor: "rgba(30, 99, 216, 0.12)",
            }}
          >
            <div
              ref={progressBarRef}
              style={{
                height: "100%",
                width: "0%",
                backgroundColor: "#1E63D8",
                borderRadius: "0 2px 2px 0",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
