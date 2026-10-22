'use client';

import React, { useRef, useState } from 'react';

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * MagneticButton (Emotion Agency Interaction)
 * Pulls the button slightly toward the mouse cursor on hover.
 */
export function MagneticButton({
  children,
  strength = 18,
  className = '',
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setOffset({
      x: deltaX * strength,
      y: deltaY * strength,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`
          : 'translate3d(0, 0, 0)',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default MagneticButton;
