"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 340;
const SCROLL_DISTANCE = 5500; // 5500px pin distance ensures slow, smooth, buttery scrubbing without skipping

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/steel_structure_frames/frame_${padded}.png`;
}

const rotatingPhrases = [
  "Light Gauge Steel Manufacturer",
  "Steel Frame Manufacturer",
  "Precision CNC Roll-Forming",
  "High-Tensile Truecore® Framing",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typography animation refs
  const headingLine1Ref = useRef<HTMLHeadingElement>(null);
  const headingLine2Ref = useRef<HTMLHeadingElement>(null);
  const rotatingLineRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  // References for render loop & high performance
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);

  // Subtle rotating text ticker interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // High-Quality Canvas Draw Helper (Cover Fit)
  const drawImageCover = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;

    if (!imgW || !imgH) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const hRatio = canvasW / imgW;
    const vRatio = canvasH / imgH;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = imgW * ratio;
    const drawH = imgH * ratio;

    const offsetX = (canvasW - drawW) * 0.5;
    const offsetY = (canvasH - drawH) * 0.5;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Display specific frame immediately
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const clamped = Math.max(1, Math.min(TOTAL_FRAMES, frameIndex));
      currentFrameRef.current = clamped;

      const cached = imagesCacheRef.current.get(clamped);
      if (cached && cached.complete && cached.naturalWidth > 0) {
        drawImageCover(cached);
      } else {
        // If not in cache yet, load on demand and draw immediately
        const fresh = new Image();
        fresh.src = getFrameUrl(clamped);
        fresh.onload = () => {
          imagesCacheRef.current.set(clamped, fresh);
          if (currentFrameRef.current === clamped) {
            drawImageCover(fresh);
          }
        };
      }
    },
    [drawImageCover]
  );

  // 1. Preload pipeline: Frame 1 immediately, then the rest in concurrent batches
  useEffect(() => {
    let isCancelled = false;
    const cache = imagesCacheRef.current;

    // Load Frame 1 immediately for 0ms delay
    const frame1 = new Image();
    frame1.src = getFrameUrl(1);
    frame1.onload = () => {
      if (isCancelled) return;
      cache.set(1, frame1);
      setIsLoaded(true);
      drawImageCover(frame1);
      ScrollTrigger.refresh();
    };

    // Preload remaining frames in concurrent batches of 10
    const BATCH_SIZE = 10;
    let nextIndex = 2;

    const loadNextBatch = () => {
      if (isCancelled || nextIndex > TOTAL_FRAMES) return;

      const batchPromises: Promise<void>[] = [];
      const end = Math.min(nextIndex + BATCH_SIZE, TOTAL_FRAMES + 1);

      for (let i = nextIndex; i < end; i++) {
        const idx = i;
        if (cache.has(idx)) continue;

        const p = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFrameUrl(idx);
          img.onload = () => {
            if (!isCancelled) {
              cache.set(idx, img);
            }
            resolve();
          };
          img.onerror = () => resolve();
        });
        batchPromises.push(p);
      }

      nextIndex = end;

      Promise.all(batchPromises).then(() => {
        if (!isCancelled && nextIndex <= TOTAL_FRAMES) {
          setTimeout(loadNextBatch, 15);
        }
      });
    };

    const timer = setTimeout(loadNextBatch, 40);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [drawImageCover]);

  // 2. High-DPI Canvas resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);

      const currentImg = imagesCacheRef.current.get(currentFrameRef.current);
      if (currentImg && currentImg.complete) {
        drawImageCover(currentImg);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawImageCover]);

  // 3. GSAP ScrollTrigger Fullscreen Pin & Staggered Cinematic Heading Reveals
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Initial typography state: not too bold, clean subtle offset
    gsap.set(headingLine1Ref.current, { x: -110, opacity: 0 });
    gsap.set(headingLine2Ref.current, { y: 65, opacity: 0 });
    gsap.set(rotatingLineRef.current, { y: 45, opacity: 0 });
    gsap.set(buttonsRef.current, { y: 45, opacity: 0 });

    // Proxy object for GSAP to smoothly tween frame numbers
    const frameProxy = { frame: 1 };

    // Coordinated Timeline tied to scroll distance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${SCROLL_DISTANCE}`, // Pinned firmly for 5500px of scroll distance
        pin: true,
        pinSpacing: true,
        scrub: 1.2, // Smooth dampened scrub, preventing rapid jumping on single scroll tick
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: () => {
          const target = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(frameProxy.frame))
          );

          if (target !== currentFrameRef.current) {
            renderFrame(target);
          }
        },
      },
    });

    // 1. Frame scrub continuously from 0% to 100% of the pin
    tl.to(frameProxy, { frame: TOTAL_FRAMES, ease: "none", duration: 1 }, 0);

    // 2. Staggered arrivals on scroll (arrives in distinct stages, not all at once):
    // Stage 1: Heading Line 1 ("South Australia's") glides smoothly from the LEFT
    tl.to(
      headingLine1Ref.current,
      { x: 0, opacity: 1, duration: 0.18, ease: "power2.out" },
      0.12
    );

    // Stage 2: Heading Line 2 ("Premier Steel Frames") slides smoothly from the BOTTOM
    tl.to(
      headingLine2Ref.current,
      { y: 0, opacity: 1, duration: 0.18, ease: "power2.out" },
      0.32
    );

    // Stage 3: Rotating subheadline slides smoothly from the BOTTOM
    tl.to(
      rotatingLineRef.current,
      { y: 0, opacity: 1, duration: 0.16, ease: "power2.out" },
      0.52
    );

    // Stage 4: Buttons reveal smoothly from the BOTTOM
    tl.to(
      buttonsRef.current,
      { y: 0, opacity: 1, duration: 0.16, ease: "power2.out" },
      0.70
    );

    // Refresh after layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [renderFrame]);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-slate-950 text-white select-none"
    >
      {/* Fullscreen HTML5 High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover will-change-transform"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Fallback image shown during initial 0ms load */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getFrameUrl(1)})`,
          }}
        />
      )}

      {/* Left-Aligned Cinematic Editorial Typography Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center pt-14 sm:pt-20 lg:pt-24">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-14">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5 text-left translate-y-6 sm:translate-y-10 lg:translate-y-12">
            
            {/* 1. Main Heading (Heavy Bold Architectural Weight, Crisp & Bright) */}
            <div className="space-y-1">
              {/* Line 1 (Enters smoothly from LEFT on scroll) */}
              <div className="overflow-hidden pb-1">
                <h1
                  ref={headingLine1Ref}
                  className="text-2xl sm:text-4xl md:text-[46px] lg:text-[52px] font-heading font-bold tracking-tight text-white !text-white uppercase leading-[1.12] will-change-transform"
                  style={{ color: "#ffffff" }}
                >
                  SOUTH AUSTRALIA&apos;S
                </h1>
              </div>

              {/* Line 2 (Enters smoothly from BOTTOM on scroll) */}
              <div className="overflow-hidden pb-1">
                <h1
                  ref={headingLine2Ref}
                  className="text-2xl sm:text-4xl md:text-[46px] lg:text-[52px] font-heading font-bold tracking-tight text-white !text-white uppercase leading-[1.12] will-change-transform"
                  style={{ color: "#ffffff" }}
                >
                  <span className="text-[#3B82F6] font-heading font-bold">PREMIER STEEL</span>{" "}
                  <span className="text-white !text-white font-heading font-bold" style={{ color: "#ffffff" }}>
                    FRAMES
                  </span>
                </h1>
              </div>
            </div>

            {/* 3. Rotating line: Light Gauge Steel Manufacturer · Steel Frame Manufacturer */}
            <div
              ref={rotatingLineRef}
              className="flex flex-wrap items-center gap-2 pt-1 text-sm sm:text-base font-normal text-white tracking-wide will-change-transform"
            >
              <span className="text-white font-medium">
                Light Gauge Steel Manufacturer
              </span>
              <span className="text-white/60">·</span>
              <span className="text-white font-medium">
                Steel Frame Manufacturer
              </span>
            </div>

            {/* 4. Action Buttons (Enters smoothly from BOTTOM on scroll) */}
            <div
              ref={buttonsRef}
              className="pt-3 flex flex-wrap items-center gap-4 pointer-events-auto will-change-transform"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wider text-white bg-slate-950 hover:bg-slate-900 border border-slate-800 shadow-lg shadow-slate-950/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                Get a Quote
              </Link>

              <Link
                href="/steel-frames"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wider text-white bg-slate-950 hover:bg-slate-900 border border-slate-800 shadow-lg shadow-slate-950/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
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
