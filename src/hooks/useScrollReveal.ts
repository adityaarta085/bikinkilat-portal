'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delayMs?: number;
  once?: boolean;
}

/**
 * High-performance scroll reveal hook powered by IntersectionObserver.
 * Adheres to prefers-reduced-motion: if enabled, immediately sets isVisible to true.
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  delayMs = 0,
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              const timer = setTimeout(() => {
                setIsVisible(true);
              }, delayMs);
              if (once) observer.unobserve(entry.target);
              return () => clearTimeout(timer);
            } else {
              setIsVisible(true);
              if (once) observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, delayMs, once]);

  return { ref, isVisible };
}
