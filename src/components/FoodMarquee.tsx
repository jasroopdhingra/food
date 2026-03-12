"use client";

import FoodCard from "./FoodCard";

const marqueeItems = [
  {
    name: "Kiwi",
    category: "Vegetable and Fruit",
    image: "/images/KIWI-Picsart-BackgroundRemover.png",
    imageOffsetX: 4,
    imageOffsetY: 4,
  },
  {
    name: "Salmon",
    category: "Protein and Fats",
    image: "/images/SALMON-Picsart-BackgroundRemover.png",
  },
  {
    name: "Chicken Breast",
    category: "Protein and Fats",
    image: "/images/CHICKEN-Picsart-BackgroundRemover.png",
  },
  {
    name: "Beans",
    category: "Protein and Fats",
    image: "/images/BEANS-Picsart-BackgroundRemover.png",
    imageScale: 1.4,
    imageOffsetX: 3,
    imageOffsetY: -3,
  },
  {
    name: "Brown Rice",
    category: "Whole Grain",
    image: "/images/rice.png",
  },
  {
    name: "Broccoli",
    category: "Vegetable and Fruit",
    image: "/images/BROCCOLI-TRansparent.png",
    imageOffsetX: 4,
    imageOffsetY: 4,
  },
];

export default function FoodMarquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-container relative overflow-hidden bg-white-warm py-6 md:py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white-warm to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white-warm to-transparent sm:w-24" />

      <div className="marquee-track flex w-max gap-4">
        {items.map((card, i) => (
          <div key={`${card.name}-${i}`} className="flex-shrink-0">
            <FoodCard
              name={card.name}
              category={card.category}
              image={card.image}
              imageScale={card.imageScale}
              imageOffsetX={card.imageOffsetX}
              imageOffsetY={card.imageOffsetY}
              floatDuration={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
