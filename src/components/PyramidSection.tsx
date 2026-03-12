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
    alt: "Protein and healthy fats: steak, salmon, avocado, shrimp, nuts",
  },
  {
    src: "/images/Pyramid-MIDDLE.png",
    alt: "Vegetables and fruit: artichoke, onion, cauliflower, eggplant, tomato",
  },
  {
    src: "/images/PYRAMID-LAST.png",
    alt: "Whole grains: rice bowl, wheat, seeds, beans",
  },
];

export default function PyramidSection() {
  const [activeCategory, setActiveCategory] = useState<number | null>(0);

  return (
    <div
      id="pyramid"
      className="relative overflow-hidden px-4 pt-2 pb-14 sm:px-6 sm:pb-20 md:px-12 lg:px-16 lg:pt-4 lg:pb-12"
    >
      <div className="relative min-h-[32rem] sm:min-h-[38rem] lg:grid lg:min-h-[42rem] lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start lg:gap-12">
        <div className="relative z-20 w-[min(55vw,17rem)] max-w-[17rem] pt-8 sm:w-[17rem] sm:max-w-[17rem] sm:pt-12 lg:w-full lg:max-w-md lg:pt-6">
          <Accordion
            items={categories}
            defaultOpen={0}
            onActiveChange={setActiveCategory}
            compact
          />
        </div>

        <div className="pointer-events-none absolute top-0 right-0 z-10 flex w-[32rem] flex-col items-end sm:w-[36rem] lg:top-2 lg:w-[55%] lg:max-w-none">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`w-full ${i > 0 ? "-mt-4 sm:-mt-6" : ""}`}
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
                      : "brightness(0.4)",
                  scale: activeCategory === i ? 1.03 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={tier.src}
                  alt={tier.alt}
                  width={800}
                  height={500}
                  className="block h-auto w-full"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
