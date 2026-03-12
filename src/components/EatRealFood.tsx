"use client";

import { motion } from "motion/react";

export default function EatRealFood() {
  return (
    <section id="cta" className="bg-dark-section px-4 py-16 md:py-24">
      <motion.h2
        className="text-center font-serif text-5xl font-normal leading-none text-white sm:text-7xl md:text-8xl lg:text-9xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Eat Real Food.
      </motion.h2>
    </section>
  );
}
