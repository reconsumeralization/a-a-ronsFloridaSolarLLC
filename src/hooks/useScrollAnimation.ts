"use client";

import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation({
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
}: ScrollAnimationOptions = {}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, hasAnimated, delay]);

  return {
    ref,
    isVisible: hasAnimated,
    inView,
  };
}
