"use client";

import { AnimatePresence, motion } from "framer-motion";

import { WarningIcon, XIcon } from "@/components/Icons";

interface ErrorAlertProps {
  message: string;
  type?: "error" | "warning";
  onClose?: () => void;
}

export function ErrorAlert(
  { message, type = "error", onClose }: ErrorAlertProps,
) {
  const bgColor = type === "error" ? "bg-red-50" : "bg-yellow-50";
  const textColor = type === "error" ? "text-red-800" : "text-yellow-800";
  const iconColor = type === "error" ? "text-red-400" : "text-yellow-400";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`rounded-lg p-4 ${bgColor}`}
        >
          <div className="flex items-start gap-3">
            <WarningIcon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
            <div className={`text-sm ${textColor} flex-1`}>{message}</div>
            {onClose && (
              <button
                onClick={onClose}
                className={`${iconColor} hover:${textColor} transition-colors`}
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
