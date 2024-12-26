"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "scale" | "custom";
  delay?: number;
  duration?: number;
  custom?: any;
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
};

export function AnimateOnScroll({
  children,
  className,
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
  custom,
}: AnimateOnScrollProps) {
  const { ref, isVisible } = useScrollAnimation({ delay });

  const selectedAnimation = custom || animations[animation];

  return (
    <motion.div
      ref={ref}
      initial={selectedAnimation.initial}
      animate={isVisible
        ? selectedAnimation.animate
        : selectedAnimation.initial}
      transition={{ duration, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
