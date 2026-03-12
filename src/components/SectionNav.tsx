"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "stats", label: "The Crisis" },
  { id: "manifesto", label: "The Mission" },
  { id: "pyramid", label: "New Pyramid" },
  { id: "guidelines", label: "Guidelines" },
  { id: "closing", label: "The Promise" },
];

export default function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(0);
  const lastIndex = useRef(0);
  const lastVisible = useRef(false);

  const update = useCallback(() => {
    const scrollY = window.scrollY;
    const nowVisible = scrollY > 200;

    if (nowVisible !== lastVisible.current) {
      lastVisible.current = nowVisible;
      setVisible(nowVisible);
    }

    const vh = window.innerHeight;
    let newIndex = 0;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= vh * 0.5) {
        newIndex = i;
        break;
      }
    }

    if (newIndex !== lastIndex.current) {
      lastIndex.current = newIndex;
      setActiveIndex(newIndex);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="fixed top-4 left-1/2 z-40 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          aria-label="Section navigation"
        >
          <div className="flex items-center gap-1.5 rounded-full border border-gray-200/60 bg-white-warm/90 px-4 py-2 shadow-sm backdrop-blur-md sm:gap-2 sm:px-5">
            {sections.map((section, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={section.id}
                  onClick={() => handleClick(section.id)}
                  className="relative flex items-center justify-center"
                  aria-label={section.label}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive ? (
                    <motion.span
                      className="whitespace-nowrap px-1.5 font-sans text-xs font-medium text-green-dark sm:text-sm"
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    >
                      {section.label}
                    </motion.span>
                  ) : (
                    <span
                      className="flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6"
                      aria-hidden="true"
                    >
                      <span className="block h-1.5 w-1.5 rounded-full bg-sage/60" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
