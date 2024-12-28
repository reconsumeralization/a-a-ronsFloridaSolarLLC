"use client";

import { motion } from "framer-motion";

import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState(
  { message = "Loading...", fullScreen }: LoadingStateProps,
) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50" : "py-12"
      }`}
    >
      <LoadingSpinner size="lg" />
      <p className="text-gray-600 animate-pulse">{message}</p>
    </motion.div>
  );
}
