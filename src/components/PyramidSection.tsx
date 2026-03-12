"use client";

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

export default function PyramidSection() {
  return (
    <div
      id="pyramid"
      className="overflow-hidden pl-4 pr-0 pb-10 sm:pl-6 sm:pb-14 md:pl-12 lg:pl-16 lg:pb-12"
    >
      <div className="grid grid-cols-[minmax(0,14rem)_1fr] items-start gap-4 sm:grid-cols-[minmax(0,17rem)_1fr] sm:gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
        <div className="pt-2 sm:pt-4 lg:pt-6">
          <Accordion items={categories} defaultOpen={0} compact />
        </div>

        <motion.div
          className="ml-auto -mt-4 w-full max-w-[16rem] sm:-mt-6 sm:max-w-[20rem] lg:-mt-8 lg:max-w-[26rem]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Image
            src="/images/pyramid-full.png"
            alt="Food pyramid: protein and healthy fats at top, vegetables and fruit in the middle, whole grains at the bottom"
            width={630}
            height={815}
            className="block h-auto w-full"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
