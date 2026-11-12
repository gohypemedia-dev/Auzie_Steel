"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Lock body scrolling while the preloader is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress bar takes 2.0s to fill to 100%
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Fade transition takes 500ms (0.5s)
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      document.body.style.overflow = originalOverflow;
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!mounted || isComplete) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes sc-loader-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.18); opacity: 0.15; }
        }
        @keyframes sc-loader-progress {
          0%   { width: 0%; }
          80%  { width: 90%; }
          100% { width: 100%; }
        }
        @keyframes sc-loader-logo-in {
          0%   { opacity: 0; transform: translateY(14px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sc-loader-dot {
          0%, 80%, 100% { transform: scaleY(0.5); opacity: 0.35; }
          40%            { transform: scaleY(1);   opacity: 1; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: isFading ? 0 : 1,
          transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: isFading ? "none" : "all",
        }}
        aria-hidden={isFading}
        role="progressbar"
        aria-label="Loading Auzie Steel"
      >
        {/* Subtle Radial Pulsing Glow in Auzie Steel Brand Blue */}
        <div
          style={{
            position: "absolute",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(30, 99, 216, 0.16) 0%, transparent 70%)",
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

        {/* Bottom Horizontal Progress Bar */}
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
            style={{
              height: "100%",
              backgroundColor: "#1E63D8",
              animation: "sc-loader-progress 2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>
      </div>
    </>
  );
}
