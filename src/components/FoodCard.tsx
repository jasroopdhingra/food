"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

interface FoodCardProps {
  name: string;
  category: string;
  image: string;
  floatDuration?: number;
  floatDelay?: number;
}

export default function FoodCard({
  name,
  category,
  image,
  floatDuration = 3,
  floatDelay = 0,
}: FoodCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      animate={isInView ? { y: [0, -8, 0] } : { y: 0 }}
      transition={{
        duration: floatDuration,
        repeat: isInView ? Infinity : 0,
        ease: "easeInOut",
        delay: floatDelay,
      }}
    >
      <motion.div
        className="flex items-center gap-3 rounded-2xl bg-card-bg px-4 py-3 shadow-sm"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center">
          <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#E8E1D9]" />
          <Image
            src={image}
            alt={name}
            width={128}
            height={128}
            className="relative z-10 h-full w-full object-contain"
          />
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-green-dark">
            {name}
          </p>
          <p className="font-sans text-xs text-golden">{category}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
