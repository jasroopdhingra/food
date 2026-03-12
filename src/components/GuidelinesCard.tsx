"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function GuidelinesCard() {
  return (
    <div
      id="guidelines"
      className="sticky bottom-0 px-4 pt-10 pb-14 sm:px-6 md:px-16 md:pt-16 md:pb-20"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-14">
        <motion.a
          href="/DGA.pdf"
          download="Dietary-Guidelines-for-Americans.pdf"
          className="group relative flex-shrink-0 cursor-pointer"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.08,
            rotate: -3,
            y: -16,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute -inset-4 rounded-3xl bg-white/0 transition-colors duration-300 group-hover:bg-white/5" />
          <Image
            src="/images/guidlines.png"
            alt="Download the Dietary Guidelines for Americans"
            width={400}
            height={500}
            className="relative h-auto w-72 drop-shadow-lg transition-[filter] duration-300 group-hover:drop-shadow-2xl sm:w-80 md:w-96"
          />
        </motion.a>

        <motion.div
          className="text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-serif text-3xl font-normal text-white md:text-4xl">
            Resources
          </h3>
          <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-white/60 md:text-base">
            Explore the research and guidance that shape the Dietary Guidelines
            for Americans.
          </p>
          <a
            href="/DGA.pdf"
            download="Dietary-Guidelines-for-Americans.pdf"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Download the guidelines
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
