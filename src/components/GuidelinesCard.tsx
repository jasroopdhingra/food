"use client";

import { motion } from "motion/react";
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
        <div className="w-48 overflow-hidden rounded-xl bg-white p-4 shadow-2xl md:w-56">
          <p className="mb-2 font-sans text-xs font-semibold leading-tight text-green-dark">
            United States
            <br />
            Dietary Guidelines For
            <br />
            Americans
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/guidelines-icon.svg"
                alt="Food pyramid guidelines cover"
                className="h-auto w-full"
              />
          <div className="mt-2 flex items-center gap-1">
            <div className="h-3 w-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="text-green-dark"
              >
                <rect x="3" y="3" width="7" height="4" fill="currentColor" />
                <rect x="3" y="9" width="18" height="2" fill="currentColor" />
                <rect x="3" y="13" width="18" height="2" fill="currentColor" />
                <rect x="3" y="17" width="18" height="2" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-sans text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Download the guidelines</span>
        <span className="inline-block">→</span>
      </motion.a>
    </div>
  );
}
