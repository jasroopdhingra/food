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
    src: "/pyramid/PYRAMID-TOP.png",
    alt: "Protein and healthy fats: steak, salmon, avocado, shrimp, nuts",
    width: 800,
    height: 400,
    sizeClass: "w-[76%] lg:w-[68%]",
  },
  {
    src: "/pyramid/PYRAMID-MID.png",
    alt: "Vegetables and fruit: artichoke, onion, cauliflower, eggplant, tomato",
    width: 800,
    height: 400,
    sizeClass: "w-[95%] lg:w-[86%]",
  },
  {
    src: "/pyramid/PYRAMID-BOTTOM.png",
    alt: "Whole grains: rice bowl, wheat, seeds, beans",
    width: 800,
    height: 400,
    sizeClass: "w-[70%] lg:w-[62%]",
  },
];

export default function PyramidSection() {
  const [activeCategory, setActiveCategory] = useState<number | null>(0);

  return (
    <div
      id="pyramid"
      className="relative overflow-hidden px-4 pt-2 pb-14 sm:px-6 sm:pb-20 md:px-12 lg:px-16 lg:pt-4 lg:pb-12"
    >
      <div className="relative min-h-[30rem] sm:min-h-[35rem] lg:grid lg:min-h-[34rem] lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-center lg:gap-8">
        <div className="relative z-20 w-[min(44vw,13rem)] max-w-[13rem] pt-24 sm:w-[13.5rem] sm:max-w-[13.5rem] sm:pt-28 lg:w-full lg:max-w-sm lg:pt-0">
          <Accordion
            items={categories}
            defaultOpen={0}
            onActiveChange={setActiveCategory}
            compact
          />
        </div>

        <div className="pointer-events-none absolute top-0 right-[-8.5rem] z-10 flex w-[28rem] flex-col items-end sm:right-[-6.5rem] sm:w-[31rem] lg:relative lg:right-auto lg:ml-auto lg:w-[38rem] xl:w-[42rem]">
          <div className="w-full">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                className={`${tier.sizeClass} ml-auto ${i === 0 ? "" : "-mt-4 sm:-mt-6 lg:-mt-8"}`}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <motion.div
                  animate={{
                    filter:
                      activeCategory === null || activeCategory === i
                        ? "brightness(1)"
                        : "brightness(0.35)",
                    scale: activeCategory === i ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src={tier.src}
                    alt={tier.alt}
                    width={tier.width}
                    height={tier.height}
                    className="block h-auto w-full"
                    style={{ mixBlendMode: "lighten" }}
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
