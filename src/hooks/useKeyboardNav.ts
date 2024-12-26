"use client";

import { useCallback, useEffect } from "react";

interface KeyboardNavOptions {
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export function useKeyboardNav({
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onEnter,
  onEscape,
  enabled = true,
}: KeyboardNavOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          onArrowUp?.();
          break;
        case "ArrowDown":
          event.preventDefault();
          onArrowDown?.();
          break;
        case "ArrowLeft":
          event.preventDefault();
          onArrowLeft?.();
          break;
        case "ArrowRight":
          event.preventDefault();
          onArrowRight?.();
          break;
        case "Enter":
          event.preventDefault();
          onEnter?.();
          break;
        case "Escape":
          event.preventDefault();
          onEscape?.();
          break;
      }
    },
    [
      enabled,
      onArrowUp,
      onArrowDown,
      onArrowLeft,
      onArrowRight,
      onEnter,
      onEscape,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
