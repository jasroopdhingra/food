"use client";

import { useState, useEffect, useCallback } from "react";
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
    blendBlack: true,
  },
  {
    src: "/images/tier-vegetables.png",
    alt: "Vegetables and fruit: artichoke, onion, cauliflower, eggplant, tomato",
    blendBlack: true,
  },
  {
    src: "/images/tier-grains.png",
    alt: "Whole grains: rice bowl, wheat, seeds, beans",
    blendBlack: false,
  },
];

export default function PyramidSection() {
  const [activeCategory, setActiveCategory] = useState<number | null>(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const checkDesktop = useCallback(() => {
    setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
  }, []);

  useEffect(() => {
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, [checkDesktop]);

  return (
    <div id="pyramid" className="py-6 md:py-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-0">
        <div className="w-full px-4 sm:px-6 md:px-12 lg:w-[40%] lg:pl-12 lg:pr-8 xl:pl-20 xl:pr-12">
          <Accordion
            items={categories}
            defaultOpen={0}
            onActiveChange={setActiveCategory}
          />
        </div>

        <div className="w-full px-4 sm:px-6 lg:w-[60%] lg:px-0">
          {/* Mobile: simple stack with gaps */}
          <div className="flex flex-col gap-3 lg:hidden">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <motion.div
                  animate={{
                    opacity:
                      activeCategory === null || activeCategory === i
                        ? 1
                        : 0.35,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tier.src}
                    alt={tier.alt}
                    className="block h-auto w-full rounded-xl"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: layered pyramid with negative margins */}
          <div className="relative hidden lg:block">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                className="relative"
                style={{
                  zIndex: 10 - i,
                  marginTop: i > 0 ? "-4px" : 0,
                }}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
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
                    style={
                      tier.blendBlack
                        ? { mixBlendMode: "lighten" }
                        : undefined
                    }
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
