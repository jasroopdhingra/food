"use client";

import { motion } from "motion/react";

export default function DarkSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white-warm px-0">
      <motion.div
        className="overflow-hidden rounded-2xl bg-dark-section md:rounded-3xl"
        initial={{ opacity: 0.9, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
