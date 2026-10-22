'use client';

import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number; // ms
  decimals?: number;
  enabled?: boolean;
}

/**
 * Smooth 60fps numerical count-up hook using requestAnimationFrame and easeOutExpo.
 * Automatically respects prefers-reduced-motion.
 */
export function useCountUp({
  start = 0,
  end,
  duration = 1400,
  decimals = 0,
  enabled = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!enabled) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // easeOutExpo curve for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (end - start) * easeProgress;

      setValue(Number(current.toFixed(decimals)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [start, end, duration, decimals, enabled]);

  return value;
}
