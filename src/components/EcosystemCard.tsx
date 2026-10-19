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
  Sparkles 
} from 'lucide-react';
import { EcosystemApp } from '@/lib/ecosystem';

interface EcosystemCardProps {
  app: EcosystemApp;
}

export function EcosystemCard({ app }: EcosystemCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Presentation': return <Presentation className="w-6 h-6 text-emerald-600" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-blue-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-cyan-600" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-amber-600" />;
      case 'Scale': return <Scale className="w-6 h-6 text-rose-600" />;
      case 'GitFork': return <GitFork className="w-6 h-6 text-teal-600" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-purple-600" />;
      case 'Camera': return <Camera className="w-6 h-6 text-orange-600" />;
      default: return <LayoutGrid className="w-6 h-6 text-indigo-600" />;
    }
  };

  // For localhost testing, point slide to port 3000
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname.includes('localhost');
  const targetUrl = isLocalhost && app.id === '02-slide' ? 'http://localhost:3000' : app.url;

  return (
    <div className="group relative bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:border-slate-300 rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ring-1 ring-slate-900/[0.02]">
      <div>
        {/* Header row: Icon + Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-50/50 transition-all duration-200 shadow-2xs">
            {getIcon(app.iconName)}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${app.badgeColor}`}>
              {app.category}
            </span>
            {app.status === 'live' ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Live
              </span>
            ) : (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Beta
              </span>
            )}
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
            {app.name}
          </h3>
          <p className="text-xs font-semibold text-indigo-600 mb-1.5">{app.subdomain}</p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {app.tagline}
          </p>
        </div>

        {/* Feature bullets */}
        <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-100">
          {app.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer row: Token cost + Formats + Launch button */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{app.tokenCost === 0 ? 'Gratis' : `${app.tokenCost} Token / File`}</span>
          </div>
          <div className="flex items-center gap-1">
            {app.outputFormats.map((fmt, i) => (
              <span key={i} className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                {fmt}
              </span>
            ))}
          </div>
        </div>

        <a
          href={targetUrl}
          target={app.id === '01-portal' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-900 active:bg-black text-slate-800 hover:text-white border border-slate-200/80 hover:border-slate-900 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-2xs"
        >
          <span>{app.id === '01-portal' ? 'Buka Dashboard' : 'Buka Aplikasi'}</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
