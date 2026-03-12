"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafCallbackRef = useRef<((time: number) => void) | null>(null);

  const handleAnchorClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a[href^='#']");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    e.preventDefault();

    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: 0, duration: 1.2 });
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.addEventListener("click", handleAnchorClick);
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    rafCallbackRef.current = rafCallback;
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [handleAnchorClick]);

  return <>{children}</>;
}
