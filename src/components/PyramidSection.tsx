"use client";

import { useState } from "react";
import { motion } from "motion/react";
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
    src: "/images/tier-protein.png",
    alt: "Protein and healthy fats: steak, salmon, avocado, shrimp, nuts",
  },
  {
    src: "/images/tier-vegetables.png",
    alt: "Vegetables and fruit: artichoke, onion, cauliflower, eggplant, tomato",
  },
  {
    src: "/images/tier-grains.png",
    alt: "Whole grains: rice bowl, wheat, seeds, beans",
  },
];

export default function PyramidSection() {
  const [activeCategory, setActiveCategory] = useState<number | null>(0);

  return (
    <div id="pyramid" className="py-4 md:py-6">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-8">
        <div className="w-full px-4 sm:px-6 md:px-12 lg:w-[42%] lg:pl-12 lg:pr-4 xl:pl-20 xl:pr-8">
          <Accordion
            items={categories}
            defaultOpen={0}
            onActiveChange={setActiveCategory}
          />
        </div>

        <div className="w-full px-4 sm:px-6 lg:w-[58%] lg:px-8">
          <div className="mx-auto max-w-xs sm:max-w-sm lg:max-w-sm">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                className="-mt-1 first:mt-0"
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
                    opacity:
                      activeCategory === null || activeCategory === i
                        ? 1
                        : 0.35,
                    scale: activeCategory === i ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tier.src}
                    alt={tier.alt}
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
