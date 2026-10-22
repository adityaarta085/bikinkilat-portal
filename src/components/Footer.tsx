'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-16 pb-28 md:pb-16 border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Subtle Bottom Ambient Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-48 bg-gradient-to-t from-slate-100/50 dark:from-indigo-950/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="mb-3">
              <BrandLogo variant="horizontal" size="md" href="/" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-4 font-normal">
              Ekosistem otomasi cerdas dokumen, makalah akademik, presentasi, dan instrumen legal Indonesia dengan 1 dompet token terintegrasi.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Keamanan Terenkripsi & Akses Cepat Nasional</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Layanan Populer</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="https://slide.bikinkilat.web.id" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span>Slide & Makalah (.pptx & .docx)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://modul.bikinkilat.web.id" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span>Modul Kurikulum Merdeka</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cv.bikinkilat.web.id" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span>CV ATS Friendly & Lamaran</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://rab.bikinkilat.web.id" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span>Kalkulator RAB Excel SNI</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Legal & Kepatuhan</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/syarat-ketentuan" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Syarat & Ketentuan Layanan
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Kebijakan Privasi (UU PDP)
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-pengembalian-dana" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Kebijakan Pengembalian Dana
                </Link>
              </li>
              <li>
                <Link href="/etika-akademik" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Integritas Akademik & Etika AI
                </Link>
              </li>
              <li>
                <Link href="/catatan-rilis" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <span>Catatan Rilis & Log Pembaruan</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded">
                    Baru
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} BikinKilat.web.id. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
            Dibuat untuk akselerasi produktivitas pelajar, guru, dan profesional di Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
