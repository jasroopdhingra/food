"use client";

import { motion } from "motion/react";

export default function ThreeSteps() {
  return (
    <div className="px-4 pt-6 pb-2 sm:px-6 md:px-16 md:pt-8 md:pb-4">
      <motion.h2
        className="max-w-lg font-serif text-2xl font-normal leading-snug text-white sm:text-3xl md:text-4xl md:leading-snug"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0 }}
      >
        <span className="block">Three easy steps.</span>
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          A world of change.
        </motion.span>
      </motion.h2>
    </div>
  );
}
