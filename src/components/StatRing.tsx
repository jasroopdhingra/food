"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TARGET_PERCENT = 60;

const noopSubscribe = () => () => {};

function useReducedMotion() {
  return useSyncExternalStore(
    noopSubscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export default function StatRing() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [displayPercent, setDisplayPercent] = useState(
    reducedMotion ? TARGET_PERCENT : 0,
  );
  const [textVisible, setTextVisible] = useState(reducedMotion);

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current) return;

    const circle = circleRef.current;

    if (reducedMotion) {
      const offset =
        CIRCUMFERENCE - (TARGET_PERCENT / 100) * CIRCUMFERENCE;
      circle.style.strokeDasharray = `${CIRCUMFERENCE}`;
      circle.style.strokeDashoffset = `${offset}`;
      return;
    }

    circle.style.strokeDasharray = `${CIRCUMFERENCE}`;
    circle.style.strokeDashoffset = `${CIRCUMFERENCE}`;

    const tween = gsap.to(
      {},
      {
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center center",
          scrub: 1,
          onUpdate: (self) => {
            const current = Math.round(self.progress * TARGET_PERCENT);
            setDisplayPercent(current);
            const offset =
              CIRCUMFERENCE -
              (self.progress * TARGET_PERCENT / 100) * CIRCUMFERENCE;
            circle.style.strokeDashoffset = `${offset}`;

            if (self.progress > 0.5) {
              setTextVisible(true);
            }
          },
        },
      }
    );

    if (tween.scrollTrigger) {
      triggerRef.current = tween.scrollTrigger;
    }

    return () => {
      triggerRef.current?.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center bg-white-warm px-4 py-16 md:py-28"
    >
      <div className="relative flex h-40 w-40 items-center justify-center sm:h-52 sm:w-52 md:h-64 md:w-64">
        <svg
          className="-rotate-90"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="var(--color-green-dark)"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-serif text-4xl font-normal text-green-dark sm:text-5xl md:text-6xl">
          {displayPercent}%
        </span>
      </div>

      <motion.div
        className="mt-8 max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="font-sans text-base leading-relaxed text-gray-700 md:text-lg">
          Over half of American adults now live with at least one chronic disease
          despite decades of federal nutrition guidance.
        </p>
        <a
          href="#pyramid"
          className="group mt-4 inline-block font-sans text-base font-medium text-golden transition-colors hover:text-green-dark"
        >
          <span className="relative">
            Let&apos;s Fix this
            <span className="absolute bottom-0 left-0 h-px w-0 bg-green-dark transition-all duration-300 group-hover:w-full" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
