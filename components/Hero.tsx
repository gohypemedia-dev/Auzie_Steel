"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const TOTAL_FRAMES = 317;

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/Steel_Shack_2_Frames_HQ/Steel_Shack_2_Frames/frame_${padded}.jpg`;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);

  // Rotating text banner
  const rotatingLines = [
    "Light Gauge Steel Manufacturer",
    "Steel Frame Manufacturer",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rotatingLines.length);
        setIsFading(false);
      }, 300);
    }, 2800);

    return () => clearInterval(interval);
  }, [rotatingLines.length]);

  // Image cache and animation refs
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number>(0);
  const isMountedRef = useRef<boolean>(true);

  // Helper to draw an image centered with "cover" aspect ratio onto the canvas
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

    // Center image on the screen, slightly biased to center-right for architectural prominence
    const offsetX = (canvasW - drawW) * 0.52;
    const offsetY = (canvasH - drawH) * 0.5;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // 1. Preload frame 1 immediately, then background-buffer remaining frames
  useEffect(() => {
    isMountedRef.current = true;
    const cache = imagesCacheRef.current;

    // Load Frame 1 immediately
    const frame1 = new Image();
    frame1.src = getFrameUrl(1);
    frame1.onload = () => {
      if (!isMountedRef.current) return;
      cache.set(1, frame1);
      setIsFirstFrameReady(true);
      drawImageCover(frame1);
    };

    // Background preloader in small non-blocking batches
    const BATCH_SIZE = 10;
    let nextIndex = 2;

    const loadNextBatch = () => {
      if (!isMountedRef.current || nextIndex > TOTAL_FRAMES) return;

      const batchPromises: Promise<void>[] = [];
      const batchEnd = Math.min(nextIndex + BATCH_SIZE, TOTAL_FRAMES + 1);

      for (let i = nextIndex; i < batchEnd; i++) {
        const idx = i;
        if (cache.has(idx)) continue;

        const p = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFrameUrl(idx);
          img.onload = () => {
            if (isMountedRef.current) cache.set(idx, img);
            resolve();
          };
          img.onerror = () => resolve();
        });
        batchPromises.push(p);
      }

      nextIndex = batchEnd;

      Promise.all(batchPromises).then(() => {
        if (isMountedRef.current && nextIndex <= TOTAL_FRAMES) {
          setTimeout(loadNextBatch, 20);
        }
      });
    };

    const preloadTimer = setTimeout(loadNextBatch, 60);

    return () => {
      isMountedRef.current = false;
      clearTimeout(preloadTimer);
    };
  }, [drawImageCover]);

  // 2. High-DPI Canvas Sizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      // Re-draw current active frame
      const currentIdx = Math.round(currentFrameRef.current);
      const img = imagesCacheRef.current.get(currentIdx) || imagesCacheRef.current.get(1);
      if (img) {
        drawImageCover(img);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawImageCover]);

  // 3. Scroll Event Listener to drive Target Frame
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / scrollDistance));

      setScrollProgress(progress);

      // Calculate target frame from 1 to TOTAL_FRAMES based on scroll progress
      const targetFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(1 + progress * (TOTAL_FRAMES - 1)))
      );
      targetFrameRef.current = targetFrame;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 4. Smooth Lerp Animation Loop (Apple-style buttery frame scrubbing)
  useEffect(() => {
    let lastRenderedFrame = 0;

    const renderLoop = () => {
      if (!isMountedRef.current) return;

      // Smooth exponential interpolation (lerp factor 0.22)
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.22;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(currentFrameRef.current))
      );

      if (frameToDraw !== lastRenderedFrame) {
        lastRenderedFrame = frameToDraw;

        const cache = imagesCacheRef.current;
        let img = cache.get(frameToDraw);

        // Fallback to closest available frame if this specific frame is still downloading
        if (!img || !img.complete || img.naturalWidth === 0) {
          let closestDist = Infinity;
          let closestIdx = 1;

          for (const key of cache.keys()) {
            const dist = Math.abs(key - frameToDraw);
            if (dist < closestDist) {
              closestDist = dist;
              closestIdx = key;
            }
          }
          img = cache.get(closestIdx);
        }

        if (img && img.complete && img.naturalWidth > 0) {
          drawImageCover(img);
          setCurrentFrameNum(frameToDraw);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [drawImageCover]);

  // Stage text based on scroll progress
  let currentStageText = "Stage 01: Concrete Slab & Ground Floor Wall Framing";
  if (scrollProgress > 0.75) {
    currentStageText = "Stage 04: Roof Truss Pitch & Structural Lock-Up Complete";
  } else if (scrollProgress > 0.5) {
    currentStageText = "Stage 03: Second Storey Framing & Structural Wind Bracing";
  } else if (scrollProgress > 0.25) {
    currentStageText = "Stage 02: Alpha Floor Joist Cassette & Mid-Floor Erection";
  }

  // Fade out hero headline when user scrolls beyond 35% so they enjoy full building view
  const heroContentOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.12) / 0.25));

  return (
    // Outer scroll wrapper: 320vh height provides ample smooth scroll travel for 317 frames
    <div ref={containerRef} className="relative w-full h-[320vh] bg-slate-950">
      
      {/* Sticky Fullscreen Viewport pinned during scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* Canvas Background Frame Player */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover z-0"
        />

        {/* Instant Fallback image if canvas is initializing */}
        {!isFirstFrameReady && (
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${getFrameUrl(1)})` }}
          />
        )}

        {/* Directional gradient overlay on the left to guarantee crystal clear text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none z-10 transition-opacity duration-300"
          style={{ opacity: Math.max(0.3, heroContentOpacity) }}
        />

        {/* 1. Main Hero Content (Headline, Rotating Lines, Buttons) - Smoothly fades out as frame scrubs */}
        <div
          className="relative z-20 w-full px-6 sm:px-10 md:px-12 lg:pl-14 xl:pl-16 py-12 transition-all duration-200"
          style={{
            opacity: heroContentOpacity,
            transform: `translateY(${(1 - heroContentOpacity) * -24}px)`,
            pointerEvents: heroContentOpacity < 0.2 ? "none" : "auto",
          }}
        >
          <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-8">
            {/* Small text badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/80 border border-white/20 backdrop-blur-md shadow-lg shadow-black/50">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                Exclusive Distributorship for SA &amp; NT
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black uppercase tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              South Australia&apos;s Premier Steel Frames
            </h1>

            {/* Rotating line */}
            <div className="space-y-2 pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-3">
                <span className="h-6 sm:h-8 w-1.5 bg-white rounded-full shadow-md shadow-white/30 shrink-0" />
                <div className="h-9 sm:h-11 flex items-center overflow-visible">
                  <span
                    className={`whitespace-nowrap text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold uppercase tracking-wide text-white transition-all duration-300 transform ${
                      isFading ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
                    }`}
                  >
                    {rotatingLines[currentIndex]}
                  </span>
                </div>
              </div>

              {/* Sub-indicator */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider pl-4 bg-black/75 backdrop-blur-md py-1.5 px-3 rounded-lg inline-flex border border-white/20 shadow-md whitespace-nowrap">
                <span className={currentIndex === 0 ? "text-white font-bold" : "text-slate-400"}>
                  Light Gauge Steel Manufacturer
                </span>
                <span className="text-slate-400 font-bold">·</span>
                <span className={currentIndex === 1 ? "text-white font-bold" : "text-slate-400"}>
                  Steel Frame Manufacturer
                </span>
              </div>
            </div>

            {/* Buttons */}
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

        {/* 2. Interactive Scroll-Down Instruction Pill (Visible at the start) */}
        {scrollProgress < 0.25 && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/25 shadow-xl text-white text-xs sm:text-sm font-bold uppercase tracking-wider animate-bounce">
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>Scroll Down to Build Steel Frame</span>
            </div>
          </div>
        )}

        {/* 3. Live Construction Progress HUD (Visible as user scrolls and builds) */}
        <div
          className="absolute bottom-8 left-6 sm:left-10 md:left-14 z-30 pointer-events-none transition-all duration-500"
          style={{
            opacity: scrollProgress > 0.05 ? 1 : 0,
            transform: `translateY(${scrollProgress > 0.05 ? 0 : 16}px)`,
          }}
        >
          <div className="inline-flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl max-w-sm sm:max-w-md">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                Live Assembly Progress
              </span>
              <span className="text-xs font-mono font-bold text-white/80">
                Frame {currentFrameNum} / {TOTAL_FRAMES} ({Math.round(scrollProgress * 100)}%)
              </span>
            </div>

            {/* Dynamic Construction Stage Title */}
            <p className="text-xs sm:text-sm font-extrabold text-white leading-snug">
              {currentStageText}
            </p>

            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-[#1E63D8] rounded-full transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4. Complete indicator at 100% */}
        {scrollProgress > 0.96 && (
          <div className="absolute bottom-8 right-6 sm:right-10 z-30 pointer-events-none animate-pulse">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/30">
              <span>✓ Structure Complete • Continue Scrolling ↓</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
