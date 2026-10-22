'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Presentation, 
  BookOpen, 
  FileText, 
  Calculator, 
  Scale, 
  GitFork, 
  TrendingUp, 
  Camera, 
  Coins, 
  ShieldCheck, 
  Zap,
  ArrowUpRight
} from 'lucide-react';

interface MarqueeItem {
  label: string;
  sub: string;
  href: string;
  icon: any;
  tag: string;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  {
    label: 'Slide Presentasi PPTX',
    sub: 'Widescreen 16:9 + Speaker Notes',
    href: 'https://slide.bikinkilat.web.id',
    icon: Presentation,
    tag: 'Akademik & Bisnis'
  },
  {
    label: 'Modul Ajar Kurikulum Merdeka',
    sub: 'RPP, LKPD & Asesmen Kemendikbud',
    href: 'https://modul.bikinkilat.web.id',
    icon: BookOpen,
    tag: 'Pendidikan'
  },
  {
    label: 'Resume & CV ATS Global',
    sub: 'Format Single Column Lolos HRD',
    href: 'https://cv.bikinkilat.web.id',
    icon: FileText,
    tag: 'Karier'
  },
  {
    label: 'RAB Konstruksi SNI',
    sub: 'Formula Excel Dinamis PU-PR 2024',
    href: 'https://rab.bikinkilat.web.id',
    icon: Calculator,
    tag: 'Teknik'
  },
  {
    label: 'Kontrak Hukum & Perjanjian',
    sub: 'KUHPerdata 14 Pasal Siap Meterai',
    href: 'https://surat.bikinkilat.web.id',
    icon: Scale,
    tag: 'Legal'
  },
  {
    label: 'Hitung Waris Faraidh',
    sub: 'KHI Inpres No. 1/1991 Akurat',
    href: 'https://waris.bikinkilat.web.id',
    icon: GitFork,
    tag: 'Syariah'
  },
  {
    label: 'Proposal Riset & Skripsi',
    sub: 'BAB 1-3 Standar Dikti & Kampus',
    href: 'https://proposal.bikinkilat.web.id',
    icon: TrendingUp,
    tag: 'Akademik'
  },
  {
    label: 'Pasfoto Resmi SSCASN',
    sub: 'Standar Kalibrasi BKN CPNS/PPPK',
    href: 'https://pasfoto.bikinkilat.web.id',
    icon: Camera,
    tag: 'Kedinasan'
  },
  {
    label: '1 Dompet Token Terpadu',
    sub: 'Sinkronisasi Otomatis 9 Subdomain',
    href: '/kasir',
    icon: Coins,
    tag: 'Sistem Terpusat'
  }
];

export function InfiniteMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-slate-200/80 dark:border-slate-800 bg-slate-900 dark:bg-black text-white py-3.5 select-none group">
      {/* Edge gradient masks for seamless fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-900 dark:from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-900 dark:from-black to-transparent z-10 pointer-events-none" />

      {/* Marquee Track (Repeated twice for seamless loop) */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] will-change-transform">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-6 sm:px-8 py-1 group/item hover:text-indigo-400 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 dark:bg-slate-800/80 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-indigo-600 transition-all duration-200">
                <Icon className="w-4 h-4 text-white" />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold tracking-tight whitespace-nowrap text-white group-hover/item:text-indigo-300 transition-colors">
                    {item.label}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/10 text-slate-300 border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                  {item.sub}
                </span>
              </div>

              {/* Dot divider */}
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/80 ml-4 shrink-0" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default InfiniteMarquee;
