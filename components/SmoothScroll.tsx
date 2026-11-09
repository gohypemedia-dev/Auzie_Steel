"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Manual scroll restoration prevents browser scroll position conflict
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // 2. High-Performance Butter-Smooth Lenis configuration (Exact Royal Rising physics: lerp 0.085)
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      smoothWheel: true,
      autoResize: true,
    });

    lenisRef.current = lenis;
    (window as unknown as { lenis: Lenis; __lenis: Lenis }).lenis = lenis;
    (window as unknown as { lenis: Lenis; __lenis: Lenis }).__lenis = lenis;

    // 3. Connect Lenis to ScrollTrigger update
    lenis.on("scroll", ScrollTrigger.update);

    // 4. Connect Lenis to GSAP Ticker with exact Royal Rising lagSmoothing(0) for zero lag desync
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 5. Anchor link smooth scrolling with exact Royal Rising quartic ease
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      const targetPos = href === "#top" ? 0 : href;
      lenis.scrollTo(targetPos, {
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };
    document.addEventListener("click", handleAnchorClick);

    // 6. Refresh triggers once Lenis is bound and on window resize/load
    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleRefresh);
    window.addEventListener("resize", handleRefresh);

    const refreshTimer = setTimeout(handleRefresh, 200);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("load", handleRefresh);
      window.removeEventListener("resize", handleRefresh);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Reset scroll to top on route change smoothly
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}

