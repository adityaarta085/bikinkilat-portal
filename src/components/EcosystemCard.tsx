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
  Check,
  Users,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { EcosystemApp } from '@/lib/ecosystem';

interface EcosystemCardProps {
  app: EcosystemApp;
}

export function EcosystemCard({ app }: EcosystemCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Presentation': return <Presentation className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Scale': return <Scale className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'GitFork': return <GitFork className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'Camera': return <Camera className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      default: return <LayoutGrid className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const isLocalhost = typeof window !== 'undefined' && window.location.hostname.includes('localhost');
  const targetUrl = isLocalhost && app.id === '02-slide' 
    ? 'http://localhost:3000' 
    : app.id === '01-portal' 
      ? '/dashboard' 
      : app.url;

  const isExternalTarget = app.id !== '01-portal' && (!isLocalhost || app.id !== '02-slide');

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/60 dark:hover:border-indigo-400/60 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header row: Icon + Category + Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 transition-all duration-200">
            {getIcon(app.iconName)}
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${app.badgeColor}`}>
              {app.category}
            </span>
            {app.status === 'live' ? (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Aktif
              </span>
            ) : (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                Beta
              </span>
            )}
          </div>
        </div>

        {/* Title, Subdomain & Target Audience */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {app.name}
          </h3>
          <p className="text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 mb-2">{app.subdomain}</p>
          
          {app.targetAudience && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 font-medium mb-2.5">
              <Users className="w-3 h-3 text-slate-500 dark:text-slate-400 shrink-0" />
              <span>Untuk: {app.targetAudience}</span>
            </div>
          )}

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            {app.tagline}
          </p>
        </div>

        {/* Deliverable highlight badge */}
        {app.deliverableHighlight && (
          <div className="mb-3 p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-[11px] font-semibold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>{app.deliverableHighlight}</span>
          </div>
        )}

        {/* Compliance Standard Badge */}
        {app.complianceStandard && (
          <div className="mb-3 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Standar: {app.complianceStandard}</span>
          </div>
        )}

        {/* Feature bullets */}
        <div className="space-y-1.5 mb-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {app.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" strokeWidth={2.5} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Concrete Use Case Example */}
        {app.exampleUseCase && (
          <div className="mb-4 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
            <strong className="text-slate-700 dark:text-slate-300">Contoh Praktis:</strong> {app.exampleUseCase}
          </div>
        )}
      </div>

      {/* Footer row: Token cost + Formats + Launch button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{app.tokenCost === 0 ? 'Termasuk (Rp 0)' : `${app.tokenCost} Kuota / Dokumen`}</span>
          </div>
          <div className="flex items-center gap-1">
            {app.turnaroundTime && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                <Clock className="w-2.5 h-2.5" />
                {app.turnaroundTime}
              </span>
            )}
            {app.outputFormats.map((fmt, i) => (
              <span key={i} className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700">
                {fmt}
              </span>
            ))}
          </div>
        </div>

        <a
          href={targetUrl}
          target={isExternalTarget ? '_blank' : '_self'}
          rel={isExternalTarget ? 'noopener noreferrer' : undefined}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:active:bg-indigo-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all duration-150 flex items-center justify-center gap-1.5 group/btn"
        >
          <span>{app.id === '01-portal' ? 'Buka Dashboard Akun' : `Buka Studio ${app.name.split(' ')[0]}`}</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default EcosystemCard;
