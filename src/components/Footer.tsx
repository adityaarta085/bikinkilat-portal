'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Heart, ExternalLink, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                BikinKilat<span className="text-indigo-400">.com</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-4">
              Ekosistem otomasi cerdas dokumen, makalah akademik, presentasi, dan instrumen legal Indonesia dengan 1 dompet token terintegrasi.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Infrastruktur Berkecepatan Tinggi & Keamanan Terenkripsi 24 Jam</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Layanan Populer</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://slide.bikinkilat.com" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  <span>Slide & Makalah (.pptx & .docx)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://modul.bikinkilat.com" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  <span>Modul Kurikulum Merdeka</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://cv.bikinkilat.com" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  <span>CV ATS Friendly & Lamaran</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://rab.bikinkilat.com" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  <span>Kalkulator RAB Excel SNI</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Legal & Kepatuhan</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/syarat-ketentuan" className="hover:text-indigo-400 transition-colors">
                  Syarat & Ketentuan Layanan
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="hover:text-indigo-400 transition-colors">
                  Kebijakan Privasi (UU PDP)
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-pengembalian-dana" className="hover:text-indigo-400 transition-colors">
                  Kebijakan Pengembalian Dana
                </Link>
              </li>
              <li>
                <Link href="/etika-akademik" className="hover:text-indigo-400 transition-colors">
                  Integritas Akademik & Etika AI
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} BikinKilat.com. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1 text-slate-500">
            Dibuat untuk mempercepat produktivitas pelajar, guru, dan profesional di Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
