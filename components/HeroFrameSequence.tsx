"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 317;
const TARGET_FPS = 24; // Smooth cinematic 24fps
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const HOLD_END_MS = 2500; // Hold completed frame for 2.5s before looping

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/Steel_Shack_2_Frames_HQ/Steel_Shack_2_Frames/frame_${padded}.jpg`;
}

export default function HeroFrameSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);

  // References for animation state across re-renders
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const isPlayingRef = useRef<boolean>(true);
  const lastDrawTimeRef = useRef<number>(0);
  const isHoldingAtEndRef = useRef<boolean>(false);
  const holdStartTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number>(0);

  // Keep isPlayingRef in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

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

    // Enable high-quality smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const hRatio = canvasW / imgW;
    const vRatio = canvasH / imgH;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = imgW * ratio;
    const drawH = imgH * ratio;

    // Center horizontally and vertically (slight bias towards the center-right to highlight the house)
    const offsetX = (canvasW - drawW) * 0.55;
    const offsetY = (canvasH - drawH) * 0.5;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Preload frames in chunks
  useEffect(() => {
    let isCancelled = false;
    const cache = imagesCacheRef.current;

    // 1. Immediately load Frame 1 and draw it so there's zero initial blank wait
    const frame1 = new Image();
    frame1.src = getFrameUrl(1);
    frame1.onload = () => {
      if (isCancelled) return;
      cache.set(1, frame1);
      setIsLoaded(true);
      drawImageCover(frame1);
    };

    // 2. Progressive background preloader
    // Load the rest in small concurrent batches so we don't choke the network
    const BATCH_SIZE = 8;
    let nextIndexToLoad = 2;

    const loadNextBatch = () => {
      if (isCancelled || nextIndexToLoad > TOTAL_FRAMES) return;

      const batchPromises: Promise<void>[] = [];
      const batchEnd = Math.min(nextIndexToLoad + BATCH_SIZE, TOTAL_FRAMES + 1);

      for (let i = nextIndexToLoad; i < batchEnd; i++) {
        const frameIdx = i;
        if (cache.has(frameIdx)) continue;

        const p = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFrameUrl(frameIdx);
          img.onload = () => {
            if (!isCancelled) cache.set(frameIdx, img);
            resolve();
          };
          img.onerror = () => {
            resolve(); // Don't block queue on single error
          };
        });
        batchPromises.push(p);
      }

      nextIndexToLoad = batchEnd;

      Promise.all(batchPromises).then(() => {
        if (!isCancelled && nextIndexToLoad <= TOTAL_FRAMES) {
          // Slight delay between batches to keep main thread and network responsive
          setTimeout(loadNextBatch, 25);
        }
      });
    };

    // Start background preloading shortly after first frame
    const preloadTimer = setTimeout(loadNextBatch, 80);

    return () => {
      isCancelled = true;
      clearTimeout(preloadTimer);
    };
  }, [drawImageCover]);

  // Handle canvas sizing for responsive high-DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      // Re-draw current frame
      const currentImg = imagesCacheRef.current.get(currentFrameRef.current);
      if (currentImg) {
        drawImageCover(currentImg);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawImageCover]);

  // Main 60fps / 24fps requestAnimationFrame playback loop
  useEffect(() => {
    let isCancelled = false;

    const renderLoop = (timestamp: number) => {
      if (isCancelled) return;

      if (!lastDrawTimeRef.current) {
        lastDrawTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastDrawTimeRef.current;

      if (isPlayingRef.current) {
        // If we are currently holding at the end (completed steel house frame)
        if (isHoldingAtEndRef.current) {
          if (timestamp - holdStartTimeRef.current >= HOLD_END_MS) {
            isHoldingAtEndRef.current = false;
            currentFrameRef.current = 1;
            lastDrawTimeRef.current = timestamp;

            const img = imagesCacheRef.current.get(1);
            if (img) {
              drawImageCover(img);
              setCurrentFrameNum(1);
            }
          }
        } else if (elapsed >= FRAME_INTERVAL) {
          lastDrawTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);

          const nextFrame = currentFrameRef.current + 1;

          if (nextFrame > TOTAL_FRAMES) {
            // Reached the end! Pause on the completed house frame
            isHoldingAtEndRef.current = true;
            holdStartTimeRef.current = timestamp;
          } else {
            const nextImg = imagesCacheRef.current.get(nextFrame);
            if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
              currentFrameRef.current = nextFrame;
              drawImageCover(nextImg);
              // Only update React state occasionally to avoid excessive re-renders
              if (nextFrame % 4 === 0 || nextFrame === TOTAL_FRAMES) {
                setCurrentFrameNum(nextFrame);
              }
            }
            // If next frame is not yet loaded, we keep showing current frame smoothly without stuttering
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isCancelled = false;
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [drawImageCover]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const restart = () => {
    currentFrameRef.current = 1;
    isHoldingAtEndRef.current = false;
    const img = imagesCacheRef.current.get(1);
    if (img) drawImageCover(img);
    setCurrentFrameNum(1);
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950">
      {/* HTML5 High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Fallback image shown while initial frame loads */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getFrameUrl(1)})`,
          }}
        />
      )}

      {/* Subtle Bottom-Right Timelapse Badge & Mini Play/Pause Controller */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg text-white text-[11px] font-bold uppercase tracking-wider select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Assembly Timelapse</span>
          <span className="text-white/60 font-medium">
            {Math.round((currentFrameNum / TOTAL_FRAMES) * 100)}%
          </span>
          <button
            onClick={togglePlay}
            className="ml-1 p-1 hover:text-sky-300 transition-colors"
            title={isPlaying ? "Pause Timelapse" : "Play Timelapse"}
            type="button"
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            onClick={restart}
            className="p-1 hover:text-sky-300 transition-colors"
            title="Restart Timelapse"
            type="button"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
