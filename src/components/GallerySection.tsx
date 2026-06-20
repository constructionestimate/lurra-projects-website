"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  { name: "Mentone Courtyard", location: "Mentone", gradient: "from-[#2a3d32] via-[#1a2420] to-[#0f1110]" },
  { name: "Brighton Coastal Garden", location: "Brighton", gradient: "from-[#3d4a38] via-[#2a3228] to-[#141716]" },
  { name: "Toorak Terrace", location: "Toorak", gradient: "from-[#4a4035] via-[#2e2820] to-[#0f1110]" },
  { name: "Sandringham Retreat", location: "Sandringham", gradient: "from-[#354238] via-[#243028] to-[#101412]" },
  { name: "Black Rock Entertaining", location: "Black Rock", gradient: "from-[#3a3530] via-[#252220] to-[#0f1110]" },
  { name: "Beaumaris Native Planting", location: "Beaumaris", gradient: "from-[#3d4e3a] via-[#283328] to-[#121614]" },
];

export function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="gallery" ref={ref} className="lurra-section">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="lurra-label">Signature Landscapes</p>
        <h2 className="lurra-display mt-4 text-4xl font-medium text-lurra-cream md:text-5xl">
          Gardens shaped for Melbourne living.
        </h2>
        <p className="mt-4 max-w-2xl text-lurra-muted">
          Placeholder imagery — replace with your project photography when ready. Each card is structured for a future lightbox.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.figure
            key={project.name}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.06 * i }}
            className={`group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(179,139,94,0.18),transparent_55%)]" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="lurra-display text-xl text-lurra-cream">{project.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-lurra-gold">{project.location}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}