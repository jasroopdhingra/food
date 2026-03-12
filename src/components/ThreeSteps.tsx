"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Calligraph } from "calligraph";

const phrases = [
  "Three easy steps.",
  "A world of change.",
  "Real food. Real health.",
];

const INTERVAL_MS = 3000;

export default function ThreeSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [isInView]);

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
        <Calligraph animation="smooth" initial>
          {phrases[index]}
        </Calligraph>
      </motion.h2>
    </div>
  );
}
