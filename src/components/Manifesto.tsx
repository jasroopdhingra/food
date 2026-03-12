"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const manifestoText =
  "We\u2019re turning health on its head for Americans, uniting decades of science and wisdom to create a clear framework for living well. One with whole foods, at every level.";

export default function Manifesto() {
  const textRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll(".manifesto-word");

    words.forEach((word) => {
      const tween = gsap.fromTo(
        word,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: word,
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

  return (
    <section className="bg-white-warm px-4 py-10 sm:px-6 md:px-8 md:py-20">
      <p
        ref={textRef}
        className="mx-auto max-w-4xl text-center font-serif text-2xl font-bold leading-snug text-green-dark sm:text-3xl md:text-5xl md:leading-snug lg:text-6xl lg:leading-tight"
      >
        {manifestoText.split(" ").map((word, i) => (
          <span key={i} className="manifesto-word inline">
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
