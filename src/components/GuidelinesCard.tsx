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
          width={300}
          height={300}
          className="h-auto w-64 md:w-72"
        />
      </motion.div>
    </div>
  );
}
