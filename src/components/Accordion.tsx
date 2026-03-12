"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
  onActiveChange?: (index: number | null) => void;
  compact?: boolean;
}

export default function Accordion({
  items,
  defaultOpen = 0,
  onActiveChange,
  compact = false,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  const toggle = (index: number) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
    onActiveChange?.(next);
  };

  return (
    <div className={`flex flex-col ${compact ? "gap-2 sm:gap-3" : "gap-3"}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `accordion-panel-${i}`;
        const buttonId = `accordion-button-${i}`;
        return (
          <div
            key={i}
            className={`overflow-hidden bg-white/10 backdrop-blur-sm transition-colors duration-200 hover:bg-white/15 ${
              compact ? "rounded-xl sm:rounded-2xl" : "rounded-2xl"
            }`}
          >
            <button
              id={buttonId}
              onClick={() => toggle(i)}
              className={`flex w-full items-center justify-between text-left ${
                compact
                  ? "px-4 py-3 sm:px-5 sm:py-4"
                  : "px-5 py-4"
              }`}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span
                className={`font-sans font-semibold text-white ${
                  compact ? "text-sm sm:text-base md:text-lg" : "text-base md:text-lg"
                }`}
              >
                {item.title}
              </span>
              <motion.span
                className={`flex flex-shrink-0 items-center justify-center rounded-full border border-white/30 text-white ${
                  compact ? "h-5 w-5 text-xs sm:h-7 sm:w-7 sm:text-base" : "h-7 w-7"
                }`}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={true}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <div className={compact ? "px-3 pb-3 sm:px-5 sm:pb-5" : "px-5 pb-5"}>
                    <p
                      className={`font-sans leading-relaxed text-white/80 ${
                        compact
                          ? "text-xs sm:text-sm md:text-base"
                          : "text-sm md:text-base"
                      }`}
                    >
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
