"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FoodCard from "./FoodCard";

const headlineWords = [
  "A",
  "Radical",
  "New",
  "Approach",
  "To",
  "Health",
  "In",
  "America",
];

const foodCards = [
  {
    name: "Kiwi",
    category: "Vegetable and Fruit",
    image: "/images/kiwi.png",
    position: "left-[10%] top-[52%]",
    floatDuration: 3.2,
    floatDelay: 0,
  },
  {
    name: "Salmon",
    category: "Protein and Fats",
    image: "/images/salmon.png",
    position: "right-[8%] top-[50%]",
    floatDuration: 3.8,
    floatDelay: 0.5,
  },
  {
    name: "Beans",
    category: "Vegetable and Fruit",
    image: "/images/beans.png",
    position: "right-[25%] top-[65%]",
    floatDuration: 3.5,
    floatDelay: 1.0,
  },
  {
    name: "Chicken Breast",
    category: "Protein and Fats",
    image: "/images/chicken.png",
    position: "left-[5%] top-[74%]",
    floatDuration: 4.0,
    floatDelay: 0.3,
  },
  {
    name: "Brown Rice",
    category: "Whole Grain",
    image: "/images/rice.png",
    position: "left-[30%] top-[80%]",
    floatDuration: 3.6,
    floatDelay: 0.8,
  },
  {
    name: "Broccoli",
    category: "Vegetable and Fruit",
    image: "/images/broccoli.png",
    position: "right-[5%] top-[78%]",
    floatDuration: 3.3,
    floatDelay: 1.2,
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!cardsContainerRef.current || !sectionRef.current) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const cards =
      cardsContainerRef.current.querySelectorAll(".food-card-wrapper");

    cards.forEach((card, i) => {
      const speed = 50 + i * 30;
      const tween = gsap.to(card, {
        y: -speed,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      if (tween.scrollTrigger) {
        triggersRef.current.push(tween.scrollTrigger);
      }
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white-warm min-h-[100vh] md:min-h-[120vh]"
    >
      <div className="flex flex-col items-center pt-16 pb-8 md:pt-32 md:pb-24">
        <h1 className="max-w-4xl px-6 text-center font-serif text-4xl leading-tight font-normal tracking-tight text-green-dark sm:text-5xl md:text-7xl md:leading-[1.1] lg:text-8xl lg:leading-[1.05]">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.a
          href="#pyramid"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-olive px-6 py-3 font-sans text-sm font-medium text-white transition-shadow hover:shadow-lg md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Explore the New Pyramid</span>
          <span className="inline-block">→</span>
        </motion.a>
      </div>

      {/* Mobile: horizontal scrolling row */}
      <div className="hide-scrollbar mt-4 overflow-x-auto px-4 pb-8 md:hidden">
        <div className="flex w-max gap-3">
          {foodCards.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <FoodCard
                name={card.name}
                category={card.category}
                image={card.image}
                floatDuration={card.floatDuration}
                floatDelay={card.floatDelay}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop: scattered absolute-positioned cards with parallax */}
      <div
        ref={cardsContainerRef}
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        {foodCards.map((card, i) => (
          <motion.div
            key={card.name}
            className={`food-card-wrapper pointer-events-auto absolute ${card.position}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.6 + i * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <FoodCard
              name={card.name}
              category={card.category}
              image={card.image}
              floatDuration={card.floatDuration}
              floatDelay={card.floatDelay}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
