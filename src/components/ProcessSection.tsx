"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery & Vision",
    copy: "We listen first — to how you live, how light moves through your home, and what sanctuary means to you.",
  },
  {
    num: "02",
    title: "Bespoke Design",
    copy: "A tailored landscape concept balancing structure, planting, and materiality — refined until it feels unmistakably yours.",
  },
  {
    num: "03",
    title: "Careful Construction",
    copy: "Disciplined build sequences, protected finishes, and transparent communication while your garden takes shape.",
  },
  {
    num: "04",
    title: "Planting & Refinement",
    copy: "Layered planting, soil preparation, and the subtle details that transform a landscape from impressive to alive.",
  },
  {
    num: "05",
    title: "The Reveal",
    copy: "A composed handover — your outdoor sanctuary ready to be lived in, photographed, and cherished for years.",
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="process" ref={ref} className="lurra-section bg-lurra-off-black/50">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="lurra-label">Our Signature Process</p>
        <h2 className="lurra-display mt-4 max-w-3xl text-4xl font-medium text-lurra-cream md:text-5xl">
          Five considered steps along the garden path.
        </h2>
      </motion.div>

      <ol className="mt-16 space-y-0 border-l border-lurra-sage/30 pl-8 md:pl-12">
        {steps.map((step, i) => (
          <motion.li
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 * i }}
            className="relative pb-14 last:pb-0"
          >
            <span className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full border border-lurra-gold/40 bg-lurra-charcoal text-[10px] font-semibold tracking-widest text-lurra-gold md:-left-[3.35rem]">
              {step.num}
            </span>
            <h3 className="lurra-display text-2xl text-lurra-cream">{step.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-lurra-muted">{step.copy}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}