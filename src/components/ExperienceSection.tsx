"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Hammer, HeartHandshake, MapPin } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Thoughtful Design",
    copy: "Every planting, path, and material is chosen to feel inevitable — as though the garden has always belonged to your home.",
  },
  {
    icon: Hammer,
    title: "Flawless Execution",
    copy: "Precision construction, clean detailing, and disciplined site management. The finish is never an afterthought.",
  },
  {
    icon: HeartHandshake,
    title: "Lasting Relationships",
    copy: "We guide you through each decision with clarity and care. Your experience matters as much as the outcome.",
  },
  {
    icon: MapPin,
    title: "Melbourne Craftsmanship",
    copy: "Built for our climate, our soils, and the way Melbourne families actually live outdoors.",
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="lurra-section border-t border-white/6">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <p className="lurra-label">The Lurra Experience</p>
        <h2 className="lurra-display mt-4 text-4xl font-medium text-lurra-cream md:text-5xl">
          Premium landscaping begins with how you feel throughout the journey.
        </h2>
        <p className="mt-6 text-lg leading-8 text-lurra-muted">
          Lurra Projects is for homeowners who refuse to compromise — on communication, on craftsmanship, or on the quiet
          confidence of a garden finished properly. We prioritise your experience from first conversation to final reveal.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {benefits.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="lurra-card p-8"
            >
              <div className="inline-flex rounded-xl bg-lurra-sage/15 p-3 text-lurra-gold">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="lurra-display mt-5 text-2xl text-lurra-cream">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-lurra-muted">{item.copy}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}