"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function GuidelinesCard() {
  return (
    <div className="flex flex-col items-center px-6 pt-4 pb-8 md:px-16 md:pt-6 md:pb-10">
      <motion.div
        className="relative"
        animate={{
          y: [0, -12, 0],
          rotate: [-8, -5, -8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Image
          src="/images/guidelines-icon.svg"
          alt="Food pyramid guidelines cover"
          width={200}
          height={200}
          className="h-auto w-48 md:w-56"
        />
      </motion.div>

      <motion.button
        type="button"
        disabled
        className="mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-sans text-sm font-medium text-white/50 backdrop-blur-sm"
        whileHover={{ scale: 1 }}
        aria-label="Download the guidelines (coming soon)"
      >
        <span>Download coming soon</span>
        <span className="inline-block">→</span>
      </motion.button>
    </div>
  );
}
