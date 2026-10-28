"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 340;
const BASE_FPS = 24; // Smooth cinematic 24fps
const HOLD_END_MS = 2500; // Hold completed frame for 2.5s before looping

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/steel_structure_frames/frame_${padded}.png`;
}

interface HeroFrameSequenceProps {
  className?: string;
  onExpandToggle?: (expanded: boolean) => void;
}

export default function HeroFrameSequence({ className = "" }: HeroFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFrameNum, setCurrentFrameNum] = useState<number>(1);
  const [bufferedCount, setBufferedCount] = useState<number>(1);
  const [speed, setSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // References to preserve state in 60fps render loop without triggering re-renders
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const isPlayingRef = useRef<boolean>(true);
  const speedRef = useRef<number>(1);
  const lastDrawTimeRef = useRef<number>(0);
  const isHoldingAtEndRef = useRef<boolean>(false);
  const holdStartTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  // Keep refs in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // High-Quality Canvas Draw Helper
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

    // Enable high-quality smoothing for ultra-crisp lines
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const hRatio = canvasW / imgW;
    const vRatio = canvasH / imgH;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = imgW * ratio;
    const drawH = imgH * ratio;

    // Center horizontally and vertically
    const offsetX = (canvasW - drawW) * 0.5;
    const offsetY = (canvasH - drawH) * 0.5;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Frame Preloader: Progressive Sequential Streamer
  useEffect(() => {
    let isCancelled = false;
    const cache = imagesCacheRef.current;

    // 1. Immediately load Frame 1 and draw it so there's ZERO wait
    const frame1 = new Image();
    frame1.src = getFrameUrl(1);
    frame1.onload = () => {
      if (isCancelled) return;
      cache.set(1, frame1);
      setIsLoaded(true);
      drawImageCover(frame1);
    };

    // 2. Load all remaining 339 frames sequentially in concurrent batches
    const BATCH_SIZE = 6;
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
            if (!isCancelled) {
              cache.set(frameIdx, img);
              setBufferedCount(cache.size);
            }
            resolve();
          };
          img.onerror = () => {
            resolve(); // Don't hang the queue on network hiccup
          };
        });
        batchPromises.push(p);
      }

      nextIndexToLoad = batchEnd;

      Promise.all(batchPromises).then(() => {
        if (!isCancelled && nextIndexToLoad <= TOTAL_FRAMES) {
          // Slight 15ms breathing room to maintain smooth main thread responsiveness
          setTimeout(loadNextBatch, 15);
        }
      });
    };

    const preloadTimer = setTimeout(loadNextBatch, 60);

    return () => {
      isCancelled = true;
      clearTimeout(preloadTimer);
    };
  }, [drawImageCover]);

  // Handle canvas sizing for responsive high-DPI (Retina / 4K support)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      // Re-draw current frame immediately
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

  // Render Frame function - strict, never loses any frame
  const showFrame = useCallback(
    (frameIndex: number) => {
      const clamped = Math.max(1, Math.min(TOTAL_FRAMES, frameIndex));
      currentFrameRef.current = clamped;
      setCurrentFrameNum(clamped);

      const img = imagesCacheRef.current.get(clamped);
      if (img && img.complete) {
        drawImageCover(img);
      } else {
        // If not in cache, load on demand and draw immediately
        const freshImg = new Image();
        freshImg.src = getFrameUrl(clamped);
        freshImg.onload = () => {
          imagesCacheRef.current.set(clamped, freshImg);
          if (currentFrameRef.current === clamped) {
            drawImageCover(freshImg);
          }
        };
      }
    },
    [drawImageCover]
  );

  // Main Playback Loop (Without Skipping Any Frame)
  useEffect(() => {
    let isCancelled = false;

    const renderLoop = (timestamp: number) => {
      if (isCancelled) return;

      if (!lastDrawTimeRef.current) {
        lastDrawTimeRef.current = timestamp;
      }

      const currentSpeed = speedRef.current;
      const frameInterval = 1000 / (BASE_FPS * currentSpeed);
      const elapsed = timestamp - lastDrawTimeRef.current;

      if (isPlayingRef.current && !isDraggingRef.current) {
        // Holding at end (completed structural building)
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
        } else if (elapsed >= frameInterval) {
          lastDrawTimeRef.current = timestamp - (elapsed % frameInterval);

          const nextFrame = currentFrameRef.current + 1;

          if (nextFrame > TOTAL_FRAMES) {
            // Reached frame 340!
            isHoldingAtEndRef.current = true;
            holdStartTimeRef.current = timestamp;
          } else {
            const nextImg = imagesCacheRef.current.get(nextFrame);
            // STRICT NO-FRAME-LOSS: only advance if nextImg is ready, otherwise wait
            if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
              currentFrameRef.current = nextFrame;
              drawImageCover(nextImg);
              // Throttle state update to keep React lightweight while canvas runs at full rate
              if (nextFrame % 2 === 0 || nextFrame === TOTAL_FRAMES || nextFrame === 1) {
                setCurrentFrameNum(nextFrame);
              }
            }
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

  // Controls
  const togglePlay = () => {
    if (isHoldingAtEndRef.current) {
      isHoldingAtEndRef.current = false;
      showFrame(1);
    }
    setIsPlaying((prev) => !prev);
  };

  const restart = () => {
    isHoldingAtEndRef.current = false;
    showFrame(1);
    setIsPlaying(true);
  };

  const stepFrame = (delta: number) => {
    setIsPlaying(false);
    isHoldingAtEndRef.current = false;
    showFrame(currentFrameRef.current + delta);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    isHoldingAtEndRef.current = false;
    showFrame(val);
  };

  const handleSliderMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleSliderMouseUp = () => {
    isDraggingRef.current = false;
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.5, 2, 0.5];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  // Keyboard shortcut support in fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === "Escape") {
        setIsFullscreen(false);
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepFrame(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stepFrame(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const progressPercent = Math.round((currentFrameNum / TOTAL_FRAMES) * 100);
  const bufferPercent = Math.round((bufferedCount / TOTAL_FRAMES) * 100);

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[#0F1114] border border-[#C9CED4] shadow-2xl shadow-slate-900/15 select-none ${className}`}
      >
        {/* High-Performance Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Fallback image shown while initial frame 1 loads */}
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getFrameUrl(1)})`,
            }}
          />
        )}

        {/* Top Header Floating Badge Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white shadow-lg pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[#1E63D8] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold font-label tracking-widest uppercase">
              3D STEEL STRUCTURE
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-white/60">
              · {TOTAL_FRAMES} FRAMES
            </span>
          </div>

          {/* Quality Indicator & Fullscreen Button */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold font-label tracking-wider text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              1080P HD
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white hover:text-[#1E63D8] hover:border-[#1E63D8] transition-colors cursor-pointer"
              title="Expand to Fullscreen"
              type="button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Bottom Interactive Playback Deck */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-5 flex flex-col gap-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${
            isHovered || !isPlaying ? "opacity-100" : "opacity-90 sm:opacity-95"
          }`}
        >
          {/* Scrubber Progress Bar with Buffer Line */}
          <div className="relative w-full flex items-center group cursor-pointer">
            {/* Background Track */}
            <div className="w-full h-1.5 sm:h-2 rounded-full bg-white/20 overflow-hidden relative">
              {/* Buffer progress */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-white/30 rounded-full transition-all duration-300"
                style={{ width: `${bufferPercent}%` }}
              />
              {/* Active playback progress */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-[#1E63D8] rounded-full"
                style={{ width: `${(currentFrameNum / TOTAL_FRAMES) * 100}%` }}
              />
            </div>

            {/* Hidden Native Range Input for Smooth Scrubbing */}
            <input
              type="range"
              min={1}
              max={TOTAL_FRAMES}
              value={currentFrameNum}
              onChange={handleSliderChange}
              onMouseDown={handleSliderMouseDown}
              onMouseUp={handleSliderMouseUp}
              onTouchStart={handleSliderMouseDown}
              onTouchEnd={handleSliderMouseUp}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              title={`Scrub Frame (Current: ${currentFrameNum} / ${TOTAL_FRAMES})`}
            />
          </div>

          {/* Controls Bar: Play/Pause, Frame Stepper, Counter, Speed, Restart */}
          <div className="flex items-center justify-between text-white text-xs font-label">
            
            {/* Left Controls: Play/Pause, Frame Steppers, Restart */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Play / Pause Button */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white text-[#0F1114] hover:bg-[#1E63D8] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                type="button"
              >
                {isPlaying ? (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Step Back 1 Frame */}
              <button
                onClick={() => stepFrame(-1)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Previous Frame (Left Arrow)"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Step Forward 1 Frame */}
              <button
                onClick={() => stepFrame(1)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Next Frame (Right Arrow)"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Restart Button */}
              <button
                onClick={restart}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Restart Assembly"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>

            {/* Center: Frame Number & Assembly Progress */}
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
              <span className="font-bold text-white tracking-wider">
                FRAME {String(currentFrameNum).padStart(3, "0")}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-white/60">{TOTAL_FRAMES}</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-sans font-bold text-[#1E63D8]">
                {progressPercent}%
              </span>
            </div>

            {/* Right Controls: Playback Speed */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={cycleSpeed}
                className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white tracking-wider transition-colors cursor-pointer"
                title="Toggle Playback Speed"
                type="button"
              >
                {speed}x
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/15">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E63D8] animate-pulse" />
              <h3 className="font-heading uppercase tracking-tight text-lg sm:text-xl">
                AUZIE STEEL · 3D STRUCTURAL ASSEMBLY
              </h3>
              <span className="text-xs font-mono text-white/50 hidden sm:inline">
                (1920x1080 Ultra-HD Sequence · {TOTAL_FRAMES} Frames)
              </span>
            </div>

            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close Fullscreen (Esc)"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Fullscreen Canvas Centerpiece */}
          <div className="flex-1 flex items-center justify-center my-4 overflow-hidden relative">
            <img
              src={getFrameUrl(currentFrameNum)}
              alt={`Steel Structure Frame ${currentFrameNum}`}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Fullscreen Bottom Deck */}
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-3 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            {/* Scrubber */}
            <div className="relative w-full flex items-center">
              <input
                type="range"
                min={1}
                max={TOTAL_FRAMES}
                value={currentFrameNum}
                onChange={handleSliderChange}
                className="w-full accent-[#1E63D8] cursor-pointer"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between text-white text-xs font-label">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="px-4 py-2 rounded-full bg-white text-[#0F1114] hover:bg-[#1E63D8] hover:text-white font-bold flex items-center gap-2 transition-all cursor-pointer"
                  type="button"
                >
                  {isPlaying ? "PAUSE" : "PLAY"}
                </button>
                <button
                  onClick={() => stepFrame(-1)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  type="button"
                >
                  ◀ -1 Frame
                </button>
                <button
                  onClick={() => stepFrame(1)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  type="button"
                >
                  +1 Frame ▶
                </button>
                <button
                  onClick={restart}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  type="button"
                >
                  ↺ Restart
                </button>
              </div>

              <div className="font-mono text-sm">
                FRAME <span className="font-bold text-[#1E63D8]">{String(currentFrameNum).padStart(3, "0")}</span> / {TOTAL_FRAMES} ({progressPercent}%)
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={cycleSpeed}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-bold"
                  type="button"
                >
                  {speed}x SPEED
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
