"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const manifestoText =
  "We\u2019re turning health on its head for Americans, uniting decades of science and wisdom to create a clear framework for living well. One with whole foods, at every level.";

const CHUNK_SIZE = 4;

function chunkWords(text: string): string[][] {
  const words = text.split(" ");
  const chunks: string[][] = [];
  for (let i = 0; i < words.length; i += CHUNK_SIZE) {
    chunks.push(words.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
}

export default function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const chunks = textRef.current.querySelectorAll(".manifesto-chunk");

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

  const chunks = chunkWords(manifestoText);

  return (
    <section className="bg-white-warm px-4 py-10 sm:px-6 md:px-8 md:py-20">
      <p
        ref={textRef}
        className="mx-auto max-w-4xl text-center font-serif text-2xl font-bold leading-snug text-green-dark sm:text-3xl md:text-5xl md:leading-snug lg:text-6xl lg:leading-tight"
        style={{ textWrap: "balance" }}
      >
        {chunks.map((words, i) => (
          <span key={i} className="manifesto-chunk inline">
            {words.join(" ")}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
