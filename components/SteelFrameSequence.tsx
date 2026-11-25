"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 340;
const SCROLL_DISTANCE = 3600; // Smooth, balanced scrub distance

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/steel_structure_frames/frame_${padded}.png`;
}

export default function SteelFrameSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // High performance cache & frame tracking
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);

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

  // 1. Preload pipeline: Frame 1 immediately, then the rest progressively in batches
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
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

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

  // 3. GSAP ScrollTrigger Pinning & Scrubbing Timeline (Pin inner wrapper to avoid mutating section DOM node)
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!section || !pinWrapper) return;

    const frameProxy = { frame: 1 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "steelFrameSequenceTrigger",
          trigger: section,
          start: "top top",
          end: `+=${SCROLL_DISTANCE}`,
          pin: pinWrapper, // Pin inner wrapper to protect React DOM reconciliation on <section>
          pinSpacing: true,
          scrub: 0.8,
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

      // Frame scrub across the entire pinned scroll distance
      tl.to(frameProxy, { frame: TOTAL_FRAMES, ease: "none", duration: 1 }, 0);
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [renderFrame]);

  return (
    <section
      id="steel-structure-sequence"
      ref={sectionRef}
      className="relative w-full bg-slate-950 text-white select-none overflow-hidden"
    >
      {/* Pinned Inner Stage: Protected from React root unmount issues */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden bg-slate-950 flex items-center justify-center"
      >
        {/* Fullscreen HTML5 High-Performance Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover will-change-transform"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Fallback image shown during initial 0ms load (CSS opacity transition to prevent React DOM removal) */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 pointer-events-none ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(${getFrameUrl(1)})`,
          }}
        />
      </div>
    </section>
  );
}
