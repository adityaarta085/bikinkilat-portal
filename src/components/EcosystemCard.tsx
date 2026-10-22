'use client';

import React from 'react';
import { 
  Presentation, 
  BookOpen, 
  FileText, 
  Calculator, 
  Scale, 
  GitFork, 
  TrendingUp, 
  Camera, 
  LayoutGrid, 
  ArrowUpRight, 
  Coins, 
  Check 
} from 'lucide-react';
import { EcosystemApp } from '@/lib/ecosystem';

interface EcosystemCardProps {
  app: EcosystemApp;
}

export function EcosystemCard({ app }: EcosystemCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Presentation': return <Presentation className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'FileText': return <FileText className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'Scale': return <Scale className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      case 'GitFork': return <GitFork className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      case 'Camera': return <Camera className="w-6 h-6 text-orange-600 dark:text-orange-400" />;
      default: return <LayoutGrid className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const isLocalhost = typeof window !== 'undefined' && window.location.hostname.includes('localhost');
  const targetUrl = isLocalhost && app.id === '02-slide' ? 'http://localhost:3000' : app.url;

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header row: Icon + Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center transition-colors shadow-2xs">
            {getIcon(app.iconName)}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${app.badgeColor}`}>
              {app.category}
            </span>
            {app.status === 'live' ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                Aktif
              </span>
            ) : (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                Segera
              </span>
            )}
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
            {app.name}
          </h3>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{app.subdomain}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            {app.tagline}
          </p>
        </div>

        {/* Feature bullets */}
        <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-100 dark:border-slate-800">
          {app.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <Check className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer row: Token cost + Formats + Launch button */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{app.tokenCost === 0 ? 'Gratis' : `${app.tokenCost} Token / File`}</span>
          </div>
          <div className="flex items-center gap-1">
            {app.outputFormats.map((fmt, i) => (
              <span key={i} className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700">
                {fmt}
              </span>
            ))}
          </div>
        </div>

        <a
          href={targetUrl}
          target={isLocalhost && app.id === '02-slide' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-xs shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
        >
          <span>Buka Studio {app.name.split(' ')[0]}</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default EcosystemCard;
