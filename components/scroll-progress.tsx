"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-14 z-40 h-[2px] origin-left bg-signal"
      style={{ scaleX }}
    />
  );
}
