"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 0.2,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full",
    bottom: "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full",
    left: "-left-2 top-1/2 -translate-x-full -translate-y-1/2",
    right: "-right-2 top-1/2 translate-x-full -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, delay }}
            className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-nowrap ${
              positionStyles[position]
            }`}
          >
            {content}
            <div
              className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                position === "top"
                  ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                  : position === "bottom"
                  ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  : position === "left"
                  ? "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
                  : "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
