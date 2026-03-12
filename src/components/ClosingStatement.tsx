"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const closingText =
  "With a focus on real, simple ingredients over additives and marketing claims, the New Pyramid restores honesty, strength, and clear science to the way America eats.";

export default function ClosingStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const words = sectionRef.current.querySelectorAll(".closing-word");

    words.forEach((word, i) => {
      const totalWords = words.length;
      const startOpacity = Math.max(0.15, 1 - (i / totalWords) * 0.85);

      const tween = gsap.fromTo(
        word,
        { color: `rgba(45, 58, 46, ${startOpacity * 0.3})` },
        {
          color: `rgba(45, 58, 46, ${startOpacity})`,
          ease: "power2.out",
          scrollTrigger: {
            trigger: word,
            start: "top 90%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );
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
      className="flex min-h-[50vh] items-center bg-white-warm px-4 py-12 sm:px-6 md:min-h-[60vh] md:px-8 md:py-24"
    >
      <p
        className="mx-auto max-w-4xl text-center font-serif text-2xl font-bold leading-snug sm:text-3xl md:text-5xl md:leading-snug lg:text-6xl lg:leading-tight"
        style={{ textWrap: "balance" }}
      >
        {closingText.split(" ").map((word, i) => (
          <span key={i} className="closing-word inline">
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
