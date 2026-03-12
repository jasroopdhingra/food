"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";

const phrases = [
  "Three easy steps.",
  "A world of change.",
];

const CHARS = [...new Set(
  phrases.join("").split("").filter((c) => c !== " " && c !== ".")
)];
const INTERVAL_MS = 3500;
const SCRAMBLE_FPS = 30;
const RESOLVE_STAGGER_MS = 40;

function useScrambleText(text: string) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const resolvedCount = useRef(text.length);

  const scramble = useCallback((target: string) => {
    resolvedCount.current = 0;
    const len = target.length;

    const tick = () => {
      const resolved = resolvedCount.current;

      const chars = target.split("").map((char, i) => {
        if (i < resolved) return char;
        if (char === " " || char === ".") return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

      setDisplay(chars.join(""));

      if (resolved < len) {
        frameRef.current = window.setTimeout(() => {
          resolvedCount.current += 1;
          tick();
        }, RESOLVE_STAGGER_MS);
      }
    };

    const initialScramble = () => {
      const chars = target.split("").map((char) => {
        if (char === " " || char === ".") return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(chars.join(""));
    };

    let scrambleFrames = 0;
    const preScramble = () => {
      initialScramble();
      scrambleFrames++;
      if (scrambleFrames < 4) {
        frameRef.current = window.setTimeout(preScramble, 1000 / SCRAMBLE_FPS);
      } else {
        tick();
      }
    };

    preScramble();
  }, []);

  useEffect(() => {
    return () => clearTimeout(frameRef.current);
  }, []);

  return { display, scramble };
}

export default function ThreeSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const [index, setIndex] = useState(0);
  const { display, scramble } = useScrambleText(phrases[0]);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!isInView) return;

    if (!hasInitialized.current) {
      hasInitialized.current = true;
      scramble(phrases[0]);
    }

    const id = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % phrases.length;
        scramble(phrases[next]);
        return next;
      });
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [isInView, scramble]);

  return (
    <div
      ref={ref}
      className="px-4 pt-6 pb-8 sm:px-6 sm:pb-10 md:px-16 md:pt-8 md:pb-12"
    >
      <motion.h2
        className="max-w-xl font-serif text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        {display}
      </motion.h2>
    </div>
  );
}
