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
}

export default function Accordion({
  items,
  defaultOpen = 0,
  onActiveChange,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  const toggle = (index: number) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
    onActiveChange?.(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `accordion-panel-${i}`;
        const buttonId = `accordion-button-${i}`;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
          >
            <button
              id={buttonId}
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="font-sans text-base font-semibold text-white md:text-lg">
                {item.title}
              </span>
              <motion.span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/30 text-white"
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
                  <div className="px-5 pb-5">
                    <p className="font-sans text-sm leading-relaxed text-white/80 md:text-base">
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
