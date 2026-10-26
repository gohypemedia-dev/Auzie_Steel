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
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);

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

    // Center image on the screen
    const offsetX = (canvasW - drawW) * 0.5;
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

      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

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
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [drawImageCover]);

  // Active dynamic line based on frame sequence progress
  const activeLineIndex = scrollProgress < 0.5 ? 0 : 1;

  // Step 1: Reveal first badge from left after 5 scrolls (scrollProgress >= 0.10)
  const isBadgeVisible = scrollProgress >= 0.10;

  // Step 2: Reveal main heading from bottom 5 scrolls after first heading (scrollProgress >= 0.20)
  const isMainHeadingVisible = scrollProgress >= 0.20;

  // Step 3: Reveal capability line from left 5 scrolls after main heading (scrollProgress >= 0.30)
  const isCapabilityLineVisible = scrollProgress >= 0.30;

  // Step 4: Reveal CTA buttons from bottom 5 scrolls after capability line (scrollProgress >= 0.40)
  const isButtonsVisible = scrollProgress >= 0.40;

  return (
    // Outer scroll wrapper: 320vh height provides ample smooth scroll travel for 317 frames
    <div id="hero-section" ref={containerRef} className="relative w-full h-[320vh] bg-slate-950">
      
      {/* Sticky Fullscreen Viewport pinned during scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* Canvas Background Frame Player with crisp sub-pixel rendering */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover z-0"
          style={{
            imageRendering: "-webkit-optimize-contrast",
            filter: "contrast(1.02) saturate(1.02)",
          }}
        />

        {/* Instant Fallback image if canvas is initializing */}
        {!isFirstFrameReady && (
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${getFrameUrl(1)})` }}
          />
        )}


        {/* Main Hero Content */}
        <div className="relative z-20 w-full px-6 sm:px-10 md:px-12 lg:pl-14 xl:pl-16 pt-20 sm:pt-24 pointer-events-auto">
          <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-8">
            
            {/* 1. First Heading/Badge - Slides in from LEFT after 5 scrolls */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/80 border border-white/20 backdrop-blur-md shadow-lg shadow-black/50 transition-all duration-700 ease-out"
              style={{
                opacity: isBadgeVisible ? 1 : 0,
                transform: isBadgeVisible ? "translateX(0px)" : "translateX(-80px)",
                pointerEvents: isBadgeVisible ? "auto" : "none",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs sm:text-sm font-light font-[300] uppercase tracking-widest text-white">
                Exclusive Distributorship for SA &amp; NT
              </span>
            </div>

            {/* 2. Main Heading - Slides in from BOTTOM 5 scrolls after first heading */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isMainHeadingVisible ? 1 : 0,
                transform: isMainHeadingVisible ? "translateY(0px)" : "translateY(50px)",
                pointerEvents: isMainHeadingVisible ? "auto" : "none",
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium font-[500] uppercase tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                South Australia&apos;s Premier Steel Frames
              </h1>
            </div>

            {/* 3. Capability Dynamic Line & Sub-indicator - Slides in from LEFT 5 scrolls after main heading */}
            <div
              className="space-y-3 pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out"
              style={{
                opacity: isCapabilityLineVisible ? 1 : 0,
                transform: isCapabilityLineVisible ? "translateX(0px)" : "translateX(-80px)",
                pointerEvents: isCapabilityLineVisible ? "auto" : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="h-6 sm:h-8 w-1.5 bg-white rounded-full shadow-md shadow-white/30 shrink-0" />
                <div className="h-9 sm:h-11 flex items-center overflow-visible">
                  <span className="whitespace-nowrap text-base sm:text-xl md:text-2xl lg:text-3xl font-light font-[300] uppercase tracking-wide text-white transition-all duration-300">
                    {activeLineIndex === 0
                      ? "Light Gauge Steel Manufacturer"
                      : "Steel Frame Manufacturer"}
                  </span>
                </div>
              </div>

              {/* Sub-indicator */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-light font-[300] uppercase tracking-wider pl-4 bg-black/75 backdrop-blur-md py-1.5 px-3 rounded-lg inline-flex border border-white/20 shadow-md whitespace-nowrap">
                <span className={activeLineIndex === 0 ? "text-white font-[400]" : "text-slate-400 font-[300]"}>
                  Light Gauge Steel Manufacturer
                </span>
                <span className="text-slate-400 font-[300]">·</span>
                <span className={activeLineIndex === 1 ? "text-white font-[400]" : "text-slate-400 font-[300]"}>
                  Steel Frame Manufacturer
                </span>
              </div>
            </div>

            {/* 4. Action CTA Buttons - Slides in from BOTTOM 3 scrolls after capability line */}
            <div
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-700 ease-out"
              style={{
                opacity: isButtonsVisible ? 1 : 0,
                transform: isButtonsVisible ? "translateY(0px)" : "translateY(50px)",
                pointerEvents: isButtonsVisible ? "auto" : "none",
              }}
            >
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

      </div>
    </div>
  );
}
