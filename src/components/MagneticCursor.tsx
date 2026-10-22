'use client';

import React, { useEffect, useState, useRef } from 'react';

/**
 * MagneticCursor (Emotion Agency Style)
 * A buttery-smooth, spring-interpolated custom cursor follower.
 * Detects interactive elements and dynamically expands with context labels.
 * Automatically disabled on touch screens and if user prefers reduced motion.
 */
export function MagneticCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse)
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over an element with data-cursor or clickable element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorHolder = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorHolder) {
        const label = cursorHolder.getAttribute('data-cursor');
        setCursorLabel(label || null);
        setIsHovered(true);
        return;
      }

      const isClickable = target.closest('button, a, input[type="range"]');
      if (isClickable) {
        setCursorLabel(null);
        setIsHovered(true);
      } else {
        setCursorLabel(null);
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // 60fps lerp loop (smooth damping like Emotion Agency)
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.18);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.18);

      setCursorPos({
        x: Math.round(currentPos.current.x * 10) / 10,
        y: Math.round(currentPos.current.y * 10) / 10,
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-opacity duration-200"
      style={{
        left: `${cursorPos.x}px`,
        top: `${cursorPos.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {cursorLabel ? (
        // Expanded Context Pill
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-lg backdrop-blur-md border border-white/20 scale-100 transition-all duration-200">
          <span>{cursorLabel}</span>
        </div>
      ) : (
        // Minimalist Ambient Ring
        <div
          className={`rounded-full border transition-all duration-200 ${
            isHovered
              ? 'w-10 h-10 border-indigo-500/80 bg-indigo-500/10 backdrop-blur-[1px] scale-110 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
              : 'w-4 h-4 border-indigo-400/60 bg-indigo-400/20 scale-100'
          }`}
        />
      )}
    </div>
  );
}

export default MagneticCursor;
