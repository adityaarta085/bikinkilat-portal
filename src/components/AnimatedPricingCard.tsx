'use client';

import React from 'react';
import { Coins, CheckCircle2, ArrowRight } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

export interface PublicPlanCardProps {
  pkg: {
    id: string;
    tokens: number;
    name: string;
    label: string;
    badge?: string;
    desc: string;
    features?: string[];
  };
  onSelect?: () => void;
  index?: number;
}

export function AnimatedPricingCard({ pkg, onSelect }: PublicPlanCardProps) {
  return (
    <div className="h-full relative overflow-visible pt-2">
      <SpotlightCard
        data-cursor={`KAPASITAS ${pkg.tokens} KUOTA`}
        spotlightColor="rgba(99, 102, 241, 0.1)"
        enableTilt={true}
        className="h-full rounded-2xl p-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between group overflow-visible shadow-xs hover:shadow-md"
      >
        {pkg.badge && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-[11px] font-bold shadow-xs tracking-wide flex items-center gap-1.5 z-30 ring-2 ring-white dark:ring-slate-950 whitespace-nowrap pointer-events-none">
            <span>{pkg.badge}</span>
          </span>
        )}

        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pkg.label}</h3>
            <span className="px-2.5 py-0.5 rounded-full font-bold text-[11px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Bebas Biaya (Rp 0)
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-medium min-h-[32px]">
            {pkg.desc}
          </p>

          <div className="space-y-1.5 mb-6 min-h-[50px] flex flex-col justify-end">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                {pkg.tokens} Kuota
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/ hari</span>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Otomatis Reset Pukul 00:00 WIB</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Berlaku di seluruh 9 subdomain layanan</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Unduh format asli (.pptx, .docx, .xlsx, .pdf)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Standar dokumen bersih tanpa tanda air</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSelect}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] active:scale-95 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-xs"
        >
          <span>Akses Layanan Publik</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </SpotlightCard>
    </div>
  );
}

export default AnimatedPricingCard;
