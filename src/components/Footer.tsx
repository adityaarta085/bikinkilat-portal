'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, Mail } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

const SOCIAL_LINKS = [
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@bikinkilat',
    handle: '@bikinkilat',
    badge: 'Video Edukasi',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/bikinkilat',
    handle: '@bikinkilat',
    badge: 'Tips Dokumen',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/p/Bikin-Kilat-61595246023213',
    handle: 'Bikin Kilat Official',
    badge: 'Halaman Resmi',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@bikinkilat-r3u',
    handle: '@bikinkilat-r3u',
    badge: 'Tutorial Lengkap',
  },
  {
    name: 'Discord Server',
    url: 'https://discord.gg/UGx6NzzQH4',
    handle: 'Komunitas Discord',
    badge: 'Diskusi & Bantuan',
  },
  {
    name: 'Saluran WhatsApp',
    url: 'https://whatsapp.com/channel/0029VbDptFyLSmbeRbuNpX3j',
    handle: 'Saluran Resmi BikinKilat',
    badge: 'Broadcast Kilat',
  },
];

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-16 pb-28 md:pb-16 border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Subtle Bottom Ambient Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-48 bg-gradient-to-t from-slate-100/50 dark:from-indigo-950/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-3">
            <div>
              <BrandLogo variant="horizontal" size="md" href="/" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed font-normal">
              Ekosistem otomasi cerdas dokumen, makalah akademik, presentasi, dan instrumen legal Indonesia dengan 1 dompet token terintegrasi.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Keamanan Terenkripsi & Akses Cepat Nasional</span>
            </div>
            <div className="pt-2">
              <a
                href="mailto:support@bikinkilat.web.id"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
              >
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Bantuan: support@bikinkilat.web.id</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Layanan Populer</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="https://slide.bikinkilat.web.id" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span>Slide & Makalah</span>
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
              <li>
                <a href="https://surat.bikinkilat.web.id" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span>Surat & Kontrak Bisnis</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Legal & Kepatuhan</h4>
            <ul className="space-y-2 text-xs font-medium">
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
                  <span>Catatan Rilis Pembaruan</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded">
                    Baru
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pengembang"
                  title="Profil Resmi Aditya Arta Putra - Founder BikinKilat.web.id"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400"
                >
                  <span>Aditya Arta Putra</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 px-1.5 py-0.2 rounded">
                    Pengembang
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Media Sosial & Komunitas</h4>
            <ul className="space-y-2 text-xs font-medium">
              {SOCIAL_LINKS.map((soc) => (
                <li key={soc.name}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{soc.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono group-hover:text-indigo-500 transition-colors">
                      {soc.badge}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Quick Bar */}
        <div className="pt-6 pb-6 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">Kanal Resmi BikinKilat:</span>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                >
                  <span>{soc.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} BikinKilat.web.id. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <span>Email Layanan Resmi:</span>
            <a href="mailto:support@bikinkilat.web.id" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              support@bikinkilat.web.id
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
