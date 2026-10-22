'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Coins, CheckCircle2, QrCode } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

interface AnimatedPricingCardProps {
  pkg: {
    id: string;
    tokens: number;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    discountBadge?: string;
    pricePerToken: number;
    name: string;
    label: string;
    badge?: string;
    popular?: boolean;
    desc: string;
  };
  onSelect: () => void;
  index: number;
}

export function AnimatedPricingCard({ pkg, onSelect, index }: AnimatedPricingCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isStruck, setIsStruck] = useState(false);
  const [isPricePopped, setIsPricePopped] = useState(false);
  const [isBadgePopped, setIsBadgePopped] = useState(false);

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    let timeout1: any;
    let timeout2: any;
    let timeout3: any;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Stagger slightly per card based on index
          const baseDelay = 200 + index * 120;

          timeout1 = setTimeout(() => {
            setIsStruck(true);
          }, baseDelay);

          timeout2 = setTimeout(() => {
            setIsPricePopped(true);
          }, baseDelay + 250);

          timeout3 = setTimeout(() => {
            setIsBadgePopped(true);
          }, baseDelay + 400);

          observer.unobserve(cardEl);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(cardEl);

    return () => {
      observer.disconnect();
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [index]);

  const handleMouseEnter = () => {
    // Replay quick stroke animation on hover for tactile feedback
    setIsStruck(false);
    setTimeout(() => setIsStruck(true), 50);
  };

  return (
    <div ref={cardRef} className="h-full relative overflow-visible pt-2">
      <SpotlightCard
        data-cursor={`PAKET ${pkg.tokens} TOKEN`}
        onMouseEnter={handleMouseEnter}
        spotlightColor={pkg.popular ? "rgba(99, 102, 241, 0.12)" : "rgba(148, 163, 184, 0.08)"}
        enableTilt={true}
        className={`h-full rounded-2xl p-7 bg-white dark:bg-slate-900 border transition-all duration-300 flex flex-col justify-between group overflow-visible ${
          pkg.popular
            ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg'
            : 'border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md'
        }`}
      >
        {/* Top Badge (Paling Populer) - z-30 and overflow-visible ensures it is NEVER clipped */}
        {pkg.popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-[11px] font-bold shadow-xs tracking-wide flex items-center gap-1.5 z-30 ring-2 ring-white dark:ring-slate-950 whitespace-nowrap pointer-events-none">
            <span>{pkg.badge}</span>
          </span>
        )}

        <div>
          {/* Header Title & Discount Badge */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pkg.label}</h3>
            {pkg.discountPercent && (
              <span
                className={`px-2.5 py-0.5 rounded-full font-black text-[11px] border shadow-2xs transition-all duration-500 transform ${
                  isBadgePopped
                    ? 'bg-rose-500/10 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400 border-rose-200/80 dark:border-rose-900 scale-100 opacity-100'
                    : 'bg-rose-500/5 text-transparent border-transparent scale-75 opacity-0'
                }`}
              >
                Diskon {pkg.discountPercent}%
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-medium min-h-[32px]">
            {pkg.desc}
          </p>

          {/* Pricing Area with Animated Strike-through */}
          <div className="space-y-1.5 mb-6 min-h-[64px] flex flex-col justify-end">
            {pkg.originalPrice && (
              <div className="flex items-center gap-2">
                {/* Strike-through Wrapper */}
                <div className="relative inline-block select-none">
                  <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-bold font-mono transition-colors duration-300">
                    Rp {pkg.originalPrice.toLocaleString('id-ID')}
                  </span>
                  {/* The Animated "Kejoret" Red Slash Line */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2.5px] rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 pointer-events-none -rotate-3 transition-all duration-500 ease-out shadow-[0_1px_3px_rgba(244,63,94,0.4)] ${
                      isStruck ? 'w-[108%] opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </div>

                {/* Discount Tag */}
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-black uppercase transition-all duration-300 ${
                    isPricePopped
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 opacity-100 scale-100'
                      : 'opacity-0 scale-75'
                  }`}
                >
                  Hemat {pkg.discountPercent}%
                </span>
              </div>
            )}

            {/* New Discounted Price */}
            <div
              className={`flex items-baseline gap-1.5 transition-all duration-500 transform ${
                isPricePopped
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-40 translate-y-1 scale-95'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                Rp {pkg.price.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/ paket</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Coins className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:rotate-12 transition-transform" />
              <span>{pkg.tokens} Token Terkredit Instan</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Berlaku permanen tanpa batas kedaluwarsa</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Bisa digunakan di seluruh 9 subdomain</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Download format asli (.pptx, .docx, .xlsx, .pdf)</span>
            </div>
          </div>
        </div>

        {/* Button CTA */}
        <button
          type="button"
          onClick={onSelect}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] active:scale-95 ${
            pkg.popular
              ? 'bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-xs hover:shadow-md'
              : 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Pilih Paket {pkg.tokens} Token</span>
        </button>
      </SpotlightCard>
    </div>
  );
}

export default AnimatedPricingCard;
