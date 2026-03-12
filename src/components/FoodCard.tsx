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
  imageScale?: number;
  imageOffsetX?: number;
  imageOffsetY?: number;
  compact?: boolean;
}

export default function FoodCard({
  name,
  category,
  image,
  floatDuration = 3,
  floatDelay = 0,
  imageScale = 1,
  imageOffsetX = 0,
  imageOffsetY = 0,
  compact = false,
}: FoodCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const shouldFloat = floatDuration > 0;

  return (
    <motion.div
      ref={shouldFloat ? ref : undefined}
      animate={shouldFloat && isInView ? { y: [0, -8, 0] } : undefined}
      transition={
        shouldFloat
          ? {
              duration: floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: floatDelay,
            }
          : undefined
      }
    >
      <motion.div
        className={`flex items-center rounded-2xl bg-card-bg shadow-sm transition-shadow ${
          compact ? "gap-2 px-3 py-2" : "gap-3 px-4 py-3"
        }`}
        whileHover={{
          scale: 1.05,
          boxShadow:
            "0 14px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className={`relative flex-shrink-0 ${compact ? "h-14 w-14" : "h-20 w-20"}`}>
          <div className={`absolute inset-0 m-auto rounded-xl bg-[#E8E1D9] ${compact ? "h-10 w-10" : "h-14 w-14"}`} />
          <Image
            src={image}
            alt={name}
            width={128}
            height={128}
            className={`absolute inset-0 z-10 m-auto object-contain ${compact ? "h-14 w-14" : "h-20 w-20"}`}
            style={
              imageScale !== 1 || imageOffsetX !== 0 || imageOffsetY !== 0
                ? {
                    transform: `scale(${imageScale}) translate(${imageOffsetX}px, ${imageOffsetY}px)`,
                  }
                : undefined
            }
          />
        </div>
        <div className="min-w-0">
          <p className={`font-sans font-semibold text-green-dark ${compact ? "truncate text-xs" : "text-sm"}`}>
            {name}
          </p>
          <p className={`font-sans text-golden ${compact ? "truncate text-[10px]" : "text-xs"}`}>{category}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
