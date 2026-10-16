'use client';

import React from 'react';
import { Zap, Shield, Heart } from 'lucide-react';

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
                BikinKilat<span className="text-indigo-400">.id</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-4">
              Ekosistem otomasi cerdas dokumen, makalah akademik, presentasi, dan instrumen legal Indonesia dengan 1 dompet token terintegrasi.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Infrastruktur Berkecepatan Tinggi & Keamanan Terenkripsi 24 Jam</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Layanan Populer</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://slide.bikinkilat.id" className="hover:text-indigo-400 transition-colors">Slide BikinKilat (.pptx & .docx)</a></li>
              <li><a href="https://modul.bikinkilat.id" className="hover:text-indigo-400 transition-colors">Modul Kurikulum Merdeka</a></li>
              <li><a href="https://cv.bikinkilat.id" className="hover:text-indigo-400 transition-colors">CV ATS Friendly & Lamaran</a></li>
              <li><a href="https://rab.bikinkilat.id" className="hover:text-indigo-400 transition-colors">Kalkulator RAB Excel SNI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Legal & Keamanan</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#kebijakan-privasi" className="hover:text-indigo-400 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#syarat-ketentuan" className="hover:text-indigo-400 transition-colors">Syarat & Ketentuan Layanan</a></li>
              <li><a href="#keamanan" className="hover:text-indigo-400 transition-colors">Keamanan Data & Webhook</a></li>
              <li><a href="#kontak" className="hover:text-indigo-400 transition-colors">Bantuan WhatsApp / Email</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} BikinKilat.id. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1 text-slate-500">
            Dibuat untuk mempercepat produktivitas pelajar, guru, dan profesional di Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
