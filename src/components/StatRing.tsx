"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const stats = [
  {
    target: 50,
    description: "of Americans have prediabetes or diabetes",
  },
  {
    target: 60,
    description:
      "of American adults live with at least one chronic disease",
  },
  {
    target: 90,
    description:
      "of U.S. healthcare spending goes to treating chronic disease",
  },
];

const noopSubscribe = () => () => {};

function useReducedMotion() {
  return useSyncExternalStore(
    noopSubscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function StatRingItem({
  target,
  description,
  delay,
  reducedMotion,
}: {
  target: number;
  description: string;
  delay: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [count, setCount] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (!ref.current || !circleRef.current || reducedMotion) return;

    const circle = circleRef.current;
    circle.style.strokeDasharray = `${CIRCUMFERENCE}`;
    circle.style.strokeDashoffset = `${CIRCUMFERENCE}`;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.8,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        const current = Math.round(obj.val);
        setCount(current);
        const offset =
          CIRCUMFERENCE - (obj.val / 100) * CIRCUMFERENCE;
        circle.style.strokeDashoffset = `${offset}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, delay, reducedMotion]);

  useEffect(() => {
    if (!circleRef.current || !reducedMotion) return;
    const circle = circleRef.current;
    circle.style.strokeDasharray = `${CIRCUMFERENCE}`;
    const offset = CIRCUMFERENCE - (target / 100) * CIRCUMFERENCE;
    circle.style.strokeDashoffset = `${offset}`;
  }, [target, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52 md:h-60 md:w-60">
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
            strokeWidth="6"
          />
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="var(--color-green-dark)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-serif text-4xl font-normal text-green-dark sm:text-5xl md:text-6xl">
          {count}%
        </span>
      </div>
      <p className="mt-4 max-w-[18rem] font-sans text-sm leading-relaxed text-gray-600 md:text-base">
        {description}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="stats" className="bg-white-warm px-4 py-20 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-14 sm:grid-cols-3 sm:gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <StatRingItem
            key={stat.target}
            target={stat.target}
            description={stat.description}
            delay={i * 0.15}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <a
          href="#pyramid"
          className="group inline-block font-sans text-base font-medium text-golden transition-colors hover:text-green-dark"
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
