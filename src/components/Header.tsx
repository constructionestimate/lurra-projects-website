"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.45);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-[#0F1110]/85 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#" className="flex items-center gap-3">
          <Image src="/lurra-logo-original.png" alt="Lurra Projects" width={36} height={36} className="rounded-lg" />
          <span className="lurra-display text-lg font-medium text-lurra-cream">Lurra Projects</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-lurra-muted md:flex">
          <a href="#experience" className="transition hover:text-lurra-cream">Experience</a>
          <a href="#process" className="transition hover:text-lurra-cream">Process</a>
          <a href="#gallery" className="transition hover:text-lurra-cream">Landscapes</a>
          <a href="#contact" className="transition hover:text-lurra-cream">Contact</a>
        </div>
        <a href="tel:0400810107" className="lurra-btn-secondary px-5 py-2 text-xs">
          0400 810 107
        </a>
      </nav>
    </motion.header>
  );
}