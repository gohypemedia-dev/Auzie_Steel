"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 840;

// High-Definition cropped & sharpened WebP frames (1440x1008)
function getFramePath(index: number): string {
  const padded = String(index + 1).padStart(4, "0");
  return `/anii33_hd/frame_${padded}.webp`;
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const isRenderingRef = useRef(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Draw frame to canvas with pristine crispness in Light Theme
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Retrieve requested frame or nearest available frame for zero-flicker scrubbing
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let closestImg: HTMLImageElement | null = null;
      for (let offset = 1; offset < 50; offset++) {
        const left = frameIndex - offset;
        const right = frameIndex + offset;
        if (left >= 0 && imagesRef.current[left]?.complete && imagesRef.current[left]!.naturalWidth > 0) {
          closestImg = imagesRef.current[left];
          break;
        }
        if (right < TOTAL_FRAMES && imagesRef.current[right]?.complete && imagesRef.current[right]!.naturalWidth > 0) {
          closestImg = imagesRef.current[right];
          break;
        }
      }
      img = closestImg || imagesRef.current[0];
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const iWidth = img.naturalWidth;
    const iHeight = img.naturalHeight;

    // Full-screen COVER scaling to cleanly fill the viewport without black bars
    const scale = Math.max(cWidth / iWidth, cHeight / iHeight);
    const drawWidth = iWidth * scale;
    const drawHeight = iHeight * scale;
    const offsetX = (cWidth - drawWidth) / 2;
    const offsetY = (cHeight - drawHeight) / 2;

    // Clean pure light theme background fill
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, cWidth, cHeight);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    currentFrameRef.current = frameIndex;

    if (counterRef.current) {
      counterRef.current.textContent = `${String(frameIndex + 1).padStart(3, "0")} / ${TOTAL_FRAMES}`;
    }
  }, []);

  // Handle Full-Screen Canvas Sizing with high-DPI scaling
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Preload and progressive stream of all 840 HD frames
  useEffect(() => {
    let isCancelled = false;

    // Prioritize initial 30 frames and key milestone frames
    const priorityIndices: number[] = [];
    for (let i = 0; i < 30; i++) priorityIndices.push(i);
    for (let i = 30; i < TOTAL_FRAMES; i += 6) priorityIndices.push(i);

    function loadSingleImage(idx: number): Promise<void> {
      return new Promise((resolve) => {
        if (imagesRef.current[idx]) {
          resolve();
          return;
        }
        const img = new window.Image();
        img.src = getFramePath(idx);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[idx] = img;
            loadedCountRef.current++;
            if (idx === 0) {
              setInitialLoaded(true);
              renderFrame(0);
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    }

    async function preloadAll() {
      // Step A: Load first 8 frames immediately
      for (let i = 0; i < Math.min(8, priorityIndices.length); i++) {
        if (isCancelled) return;
        await loadSingleImage(priorityIndices[i]);
      }

      if (!isCancelled) {
        setInitialLoaded(true);
        handleResize();
      }

      // Step B: Load milestone priority frames
      for (let i = 8; i < priorityIndices.length; i++) {
        if (isCancelled) return;
        loadSingleImage(priorityIndices[i]);
      }

      // Step C: Progressively stream in all 840 frames
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        if (!imagesRef.current[i]) {
          loadSingleImage(i);
        }
        if (i % 25 === 0) {
          await new Promise((r) => setTimeout(r, 10));
        }
      }
    }

    preloadAll();
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, renderFrame]);

  // GSAP ScrollTrigger Pinned Frame Scrubbing
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const pinWrapper = pinWrapperRef.current;
      const progressLine = progressLineRef.current;

      if (!section || !pinWrapper) return;

      ScrollTrigger.create({
        id: "whatWeDoCanvasSequenceTrigger",
        trigger: section,
        start: "top top",
        end: "+=4600",
        pin: pinWrapper,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          if (progressLine) {
            progressLine.style.width = `${(p * 100).toFixed(1)}%`;
          }

          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(p * TOTAL_FRAMES))
          );

          if (!isRenderingRef.current) {
            isRenderingRef.current = true;
            window.requestAnimationFrame(() => {
              renderFrame(targetFrame);
              isRenderingRef.current = false;
            });
          }
        },
      });
    }, sectionRef);

    return () => {
      ScrollTrigger.getById("whatWeDoCanvasSequenceTrigger")?.kill(true);
      ctx.revert();
    };
  }, [renderFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F8FAFC] text-slate-900 select-none overflow-hidden"
    >
      {/* 100% Full-Screen Pinned Viewport in Pure Light Theme */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-white"
      >
        {/* Full-bleed High-Quality HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />

        {/* Crisp Light-Theme Loading Indicator */}
        {!initialLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-700 text-sm font-mono gap-3 z-10 bg-white/90 backdrop-blur-sm">
            <div className="w-8 h-8 border-2 border-[#1E63D8] border-t-transparent rounded-full animate-spin" />
            <span className="tracking-wider uppercase text-xs font-semibold text-slate-800">
              Loading High-Definition Sequence...
            </span>
          </div>
        )}

        {/* Floating Light Theme HUD: Top Bar */}
        <div className="absolute top-6 inset-x-0 max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between pointer-events-none z-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E63D8] shadow-[0_0_8px_rgba(30,99,216,0.6)] animate-pulse" />
            <span className="text-[11px] font-bold font-label tracking-widest text-slate-900 uppercase">
              WHAT WE DO
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-[10px] font-mono tracking-wider text-slate-600 uppercase font-medium">
              CAPABILITIES SHOWCASE
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 text-xs font-mono shadow-md text-slate-700">
            <span className="text-slate-400 text-[10px] uppercase font-semibold">FRAME</span>
            <span ref={counterRef} className="font-bold text-slate-900 tracking-wider">
              001 / {TOTAL_FRAMES}
            </span>
          </div>
        </div>

        {/* Floating Light Theme HUD: Bottom Progress Bar */}
        <div className="absolute bottom-6 inset-x-0 max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-3 bg-white/85 backdrop-blur-md border border-slate-200/90 px-4 py-2 rounded-full shadow-md">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
              SCROLL SCRUB
            </span>
            <div className="w-32 sm:w-56 h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                ref={progressLineRef}
                className="h-full bg-gradient-to-r from-[#1E63D8] to-[#60A5FA] transition-all duration-75 rounded-full"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-md border border-slate-200/90 px-4 py-2 rounded-full text-slate-600 text-[10px] font-mono shadow-md font-medium">
            <span>SCROLL ↓ TO PLAY SEQUENCE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
