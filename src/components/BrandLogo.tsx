"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  variant?: "horizontal" | "icon" | "full";
  badge?: string;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  className?: string;
}

export function BrandLogo({
  variant = "horizontal",
  badge,
  size = "md",
  href = "/",
  className = "",
}: BrandLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Size mappings
  const heightClasses = {
    sm: "h-7",
    md: "h-9",
    lg: "h-11",
    xl: "h-16",
  };

  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 44,
    xl: 64,
  };

  const isColor = isHovered || isActive;

  const content = (
    <div
      className={`relative inline-flex items-center gap-2.5 cursor-pointer select-none transition-transform duration-200 ${
        isActive ? "scale-95" : isHovered ? "scale-[1.02]" : "scale-100"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
    >
      {/* 1. HORIZONTAL VARIANT (Icon + Text) */}
      {variant === "horizontal" && (
        <div className={`relative ${heightClasses[size]} w-auto aspect-[928/189] flex items-center`}>
          {/* Grayscale Base Image */}
          <Image
            src="/brand/logo-horizontal-bw.png"
            alt="Bikin Kilat Logo"
            width={464}
            height={95}
            priority
            className={`h-full w-auto object-contain transition-opacity duration-300 ${
              isColor ? "opacity-0" : "opacity-90 dark:opacity-75"
            }`}
          />

          {/* Color Overlay Image (Smooth Cross-fade) */}
          <Image
            src="/brand/logo-horizontal-color.png"
            alt="Bikin Kilat Logo"
            width={464}
            height={95}
            priority
            className={`absolute inset-0 h-full w-auto object-contain transition-all duration-300 ${
              isColor
                ? "opacity-100 drop-shadow-[0_4px_16px_rgba(99,102,241,0.35)]"
                : "opacity-0 pointer-events-none"
            }`}
          />
        </div>
      )}

      {/* 2. ICON ONLY VARIANT (Square icon mark) */}
      {variant === "icon" && (
        <div
          className="relative flex items-center justify-center rounded-2xl overflow-hidden transition-shadow duration-300"
          style={{ width: iconSizes[size], height: iconSizes[size] }}
        >
          {/* Grayscale Icon */}
          <Image
            src="/brand/logo-icon-bw.png"
            alt="Bikin Kilat Icon"
            width={iconSizes[size]}
            height={iconSizes[size]}
            priority
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              isColor ? "opacity-0" : "opacity-90 dark:opacity-75"
            }`}
          />

          {/* Color Icon */}
          <Image
            src="/brand/logo-icon-color.png"
            alt="Bikin Kilat Icon"
            width={iconSizes[size]}
            height={iconSizes[size]}
            priority
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ${
              isColor
                ? "opacity-100 drop-shadow-[0_4px_14px_rgba(99,102,241,0.4)]"
                : "opacity-0 pointer-events-none"
            }`}
          />
        </div>
      )}

      {/* 3. FULL VERTICAL VARIANT (Icon + Text stacked) */}
      {variant === "full" && (
        <div className="relative w-auto flex flex-col items-center justify-center aspect-[794/724]">
          <Image
            src="/brand/logo-full-bw.png"
            alt="Bikin Kilat Logo"
            width={397}
            height={362}
            priority
            className={`h-full w-auto max-h-40 object-contain transition-opacity duration-300 ${
              isColor ? "opacity-0" : "opacity-90 dark:opacity-75"
            }`}
          />
          <Image
            src="/brand/logo-full-color.png"
            alt="Bikin Kilat Logo"
            width={397}
            height={362}
            priority
            className={`absolute inset-0 h-full w-auto max-h-40 object-contain transition-all duration-300 ${
              isColor
                ? "opacity-100 drop-shadow-[0_6px_20px_rgba(99,102,241,0.35)]"
                : "opacity-0 pointer-events-none"
            }`}
          />
        </div>
      )}

      {/* Optional Subdomain / Context Badge */}
      {badge && (
        <span className="hidden sm:inline-block ml-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors">
          {badge}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="BikinKilat.web.id Beranda" className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
