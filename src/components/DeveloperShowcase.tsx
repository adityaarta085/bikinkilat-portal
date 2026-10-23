'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Phone,
  ArrowRight,
  GraduationCap,
  Award,
  Terminal,
  ExternalLink,
} from 'lucide-react';

export function DeveloperShowcase() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-slate-100/60 to-transparent dark:via-slate-900/40 relative overflow-hidden transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200/90 dark:border-indigo-900/60 shadow-xl overflow-hidden relative">
          {/* Subtle Ambient Aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/15 via-violet-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-10 lg:p-12 items-center">
            {/* Foto Aditya Arta Putra (Prominent) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-[280px] sm:max-w-[320px]">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-600 via-violet-500 to-teal-400 rounded-3xl blur-md opacity-60 group-hover:opacity-90 transition duration-500" />
                
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl aspect-[3/4]">
                  <img
                    src="/developer/aditya-arta.jpg"
                    alt="Aditya Arta Putra - Founder & Solo Engineer BikinKilat.web.id"
                    title="Aditya Arta Putra - Founder BikinKilat.web.id"
                    className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 pt-16 pb-3 px-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent text-white">
                    <p className="text-sm font-black tracking-tight">Aditya Arta Putra</p>
                    <p className="text-[11px] text-slate-300">
                      Siswa 11 TJKT A • SMK Muhammadiyah Bandongan
                    </p>
                  </div>
                </div>

                <div className="absolute -top-3 -right-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md rounded-xl px-2.5 py-1 flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                  <span>Pengembang Resmi</span>
                </div>
              </div>
            </div>

            {/* Narasi & Konten Pengembang */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Sosok Pengembang di Balik BikinKilat.web.id</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Karya Nyata Anak Bangsa: Aditya Arta Putra
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Founder & Solo Engineer • Siswa Kelas 11 TJKT A SMK Muhammadiyah Bandongan
                </p>
              </div>

              {/* Motto Box */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
                <div className="text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider mb-0.5 flex items-center gap-1.5 justify-center lg:justify-start">
                  <Terminal className="w-3 h-3" />
                  <span>Motto Pengembang</span>
                </div>
                <p className="text-sm sm:text-base font-bold italic text-slate-800 dark:text-slate-200">
                  “Biarkan dunia melihat karyaku.”
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                BikinKilat.web.id dibangun dari dedikasi mendalam seorang siswa kejuruan, <strong>Aditya Arta Putra</strong>, yang berani membuktikan bahwa usia sekolah mampu merekayasa ekosistem web modern berskala nasional. Aditya Arta Putra juga merupakan Project Leader di balik pembangunan Portal Resmi Desa Ngawonggo (ngawonggo.web.id).
              </p>

              {/* Badges Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-base font-black text-indigo-600 dark:text-indigo-400">9 SaaS</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Subdomain Otomasi</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-base font-black text-emerald-600 dark:text-emerald-400">100% Solo</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Arsitektur Hulu-Hilir</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-base font-black text-violet-600 dark:text-violet-400">Lead Dev</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Portal Desa Ngawonggo</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-base font-black text-amber-600 dark:text-amber-400">11 TJKT A</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">SMK Muhammadiyah</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/pengembang"
                  title="Profil dan Portofolio Lengkap Aditya Arta Putra"
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Lihat Profil & Portofolio Aditya Arta Putra</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/6285136436577?text=Halo%20Aditya%20Arta%20Putra%2C%20saya%20melihat%20karya%20Anda%20di%20BikinKilat.web.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>Hubungi via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeveloperShowcase;
