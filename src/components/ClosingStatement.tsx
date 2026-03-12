"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const closingText =
  "With a focus on real, simple ingredients over additives and marketing claims, the New Pyramid restores honesty, strength, and clear science to the way America eats.";

const CHUNK_SIZE = 4;

function chunkWords(text: string): string[][] {
  const words = text.split(" ");
  const chunks: string[][] = [];
  for (let i = 0; i < words.length; i += CHUNK_SIZE) {
    chunks.push(words.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
}

export default function ClosingStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const chunks = sectionRef.current.querySelectorAll(".closing-chunk");

    chunks.forEach((chunk) => {
      const tween = gsap.fromTo(
        chunk,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chunk,
            start: "top 85%",
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

  const chunks = chunkWords(closingText);

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="flex min-h-[40vh] items-center bg-white-warm px-4 py-12 sm:px-6 md:min-h-[50vh] md:px-8 md:py-16"
    >
      <p
        className="mx-auto max-w-4xl text-center font-serif text-2xl font-bold leading-snug sm:text-3xl md:text-5xl md:leading-snug lg:text-6xl lg:leading-tight"
        style={{ textWrap: "balance" }}
      >
        {chunks.map((words, i) => (
          <span key={i} className="closing-chunk inline">
            {words.join(" ")}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
