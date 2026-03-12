"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Accordion from "./Accordion";

const categories = [
  {
    title: "Protein & Healthy Fats",
    content:
      "Protein & Healthy Fats power strength, focus, and repair. For decades, they were pushed aside while cheap grains and sugar took center stage. The new Pyramid puts them back at the top where they belong.",
  },
  {
    title: "Vegetables & Fruit",
    content:
      "Vegetables and fruits are essential to real food nutrition. Eat a wide variety of whole, colorful, nutrient-dense vegetables and fruits in their original form, prioritizing freshness and minimal processing.",
  },
  {
    title: "Whole Grains",
    content:
      "Whole grains are encouraged. Refined carbohydrates are not. Prioritize fiber-rich whole grains and significantly reduce the consumption of highly processed, refined carbohydrates.",
  },
];

const tiers = [
  {
    src: "/images/PYRAMID_TOP.png",
    alt: "Protein and healthy fats",
    topPercent: 0,
  },
  {
    src: "/images/Pyramid-MIDDLE.png",
    alt: "Vegetables and fruit",
    topPercent: 25,
  },
  {
    src: "/images/PYRAMID-LAST.png",
    alt: "Whole grains",
    topPercent: 48,
  },
];

export default function PyramidSection() {
  const [activeCategory, setActiveCategory] = useState<number | null>(0);

  return (
    <div
      id="pyramid"
      className="overflow-hidden pl-4 pb-10 sm:pl-6 sm:pb-14 md:pl-12 lg:pl-16 lg:pb-12 pr-0"
    >
      <div className="grid grid-cols-[minmax(0,14rem)_1fr] items-start gap-4 sm:grid-cols-[minmax(0,17rem)_1fr] sm:gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
        {/* Accordion column */}
        <div className="pt-0">
          <Accordion
            items={categories}
            defaultOpen={0}
            onActiveChange={setActiveCategory}
            compact
          />
        </div>

        {/* Pyramid column */}
        <div className="relative ml-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <div style={{ paddingBottom: "129.4%" }}>
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                className="absolute inset-x-0"
                style={{ top: `${tier.topPercent}%` }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <motion.div
                  animate={{
                    filter:
                      activeCategory === null || activeCategory === i
                        ? "brightness(1)"
                        : "brightness(0.4)",
                    scale: activeCategory === i ? 1.03 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src={tier.src}
                    alt={tier.alt}
                    width={1700}
                    height={2200}
                    className="block h-auto w-full"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}