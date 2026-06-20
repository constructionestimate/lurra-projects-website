"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const signals = [
  "Direct access to Lachie throughout your project",
  "Transparent timelines and considered material selections",
  "Residential focus — no commercial shortcuts",
  "Design and construction under one accountable team",
  "Gardens built to mature beautifully, not just photograph well",
];

export function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="lurra-section border-t border-white/6 bg-gradient-to-b from-transparent to-lurra-off-black/40">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="lurra-label">Why Melbourne Homeowners Choose Lurra</p>
          <h2 className="lurra-display mt-4 text-4xl font-medium text-lurra-cream md:text-5xl">
            Because the experience of building your garden should feel as refined as the result.
          </h2>
          <p className="mt-6 text-lg leading-8 text-lurra-muted">
            Homeowners choose Lurra when they expect personal attention, meticulous finishes, and a garden they are proud to show neighbours, architects, and family — for decades, not just the reveal day.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-4"
        >
          {signals.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-5 py-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-lurra-gold" strokeWidth={1.75} />
              <span className="text-sm leading-7 text-lurra-cream">{item}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}