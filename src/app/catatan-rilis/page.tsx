'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  Wrench, 
  Zap, 
  ExternalLink, 
  Search, 
  GitCommit, 
  ArrowLeft, 
  Clock, 
  Tag, 
  Github, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RELEASES, ReleaseNote, ChangeItem } from '@/lib/changelog';

export default function CatatanRilisPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = [
    'Semua',
    'Slide',
    'Mobile UX',
    'Portal',
    'Tema & Kontras',
    'AI Engine',
    'Dompet Token',
  ];

  const filteredReleases = RELEASES.filter((rel) => {
    const matchCategory =
      selectedCategory === 'Semua' ||
      rel.categories.includes(selectedCategory) ||
      rel.impactedServices.some((s) => s.name.toLowerCase().includes(selectedCategory.toLowerCase()));

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchCategory;

    const matchSearch =
      rel.version.toLowerCase().includes(q) ||
      rel.title.toLowerCase().includes(q) ||
      rel.summary.toLowerCase().includes(q) ||
      rel.changes.some((c) => c.text.toLowerCase().includes(q)) ||
      rel.impactedServices.some((s) => s.name.toLowerCase().includes(q) || s.subdomain.toLowerCase().includes(q));

    return matchCategory && matchSearch;
  });

  const getChangeTypeIcon = (type: ChangeItem['type']) => {
    switch (type) {
      case 'added':
        return <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />;
      case 'fixed':
        return <Wrench className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />;
      case 'improved':
        return <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />;
    }
  };

  const getChangeTypeBadge = (type: ChangeItem['type']) => {
    switch (type) {
      case 'added':
        return (
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            Baru
          </span>
        );
      case 'fixed':
        return (
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100/80 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
            Perbaikan
          </span>
        );
      case 'improved':
        return (
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100/80 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            Optimasi
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-10">
        {/* Header Breadcrumb & Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Portal</span>
          </Link>

          <a
            href="https://github.com/adityaarta085"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Repositori GitHub Resmi</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
            <GitCommit className="w-3.5 h-3.5" />
            <span>Changelog &amp; Riwayat Rilis Publik</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Catatan Pembaruan Sistem
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Transparansi penuh untuk setiap rilis fitur baru, perbaikan bug dokumen, peningkatan UX mobile, dan optimasi mesin AI di seluruh 9 subdomain ekosistem BikinKilat.web.id.
          </p>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Versi Saat Ini</span>
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
              {RELEASES[0]?.version || 'v2.4.0'}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Rilis</span>
            <span className="text-xl font-black text-slate-900 dark:text-white mt-1 block">
              {RELEASES.length} Versi Terbit
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Cakupan Layanan</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              9 Subdomain
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Audit Kode</span>
            <span className="text-xl font-black text-slate-900 dark:text-white mt-1 block">
              GitHub Sync
            </span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pembaruan (misal: pptx, widescreen, dark mode, mobile, token, ai)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2 px-1"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline of Release Notes */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 before:hidden md:before:block">
          {filteredReleases.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Clock className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Tidak ada riwayat pembaruan yang cocok
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Coba gunakan kata kunci pencarian yang berbeda atau pilih filter kategori "Semua".
              </p>
            </div>
          ) : (
            filteredReleases.map((release, rIdx) => (
              <div
                key={release.version}
                className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-sm transition hover:border-slate-300 dark:hover:border-slate-700 space-y-5"
              >
                {/* Header: Version, Badge & Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono">
                      {release.version}
                    </span>
                    <span
                      className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        release.badgeColor === 'emerald'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                          : release.badgeColor === 'amber'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                          : release.badgeColor === 'sky'
                          ? 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
                      }`}
                    >
                      {release.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{release.date}</span>
                  </div>
                </div>

                {/* Title & Summary */}
                <div className="space-y-1.5">
                  <h2 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                    {release.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {release.summary}
                  </p>
                </div>

                {/* Impacted Services Chips */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Layanan Terdampak:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {release.impactedServices.map((srv) => (
                      <a
                        key={srv.subdomain}
                        href={srv.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
                      >
                        <span>{srv.name}</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Detail Changes List */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Rincian Perubahan &amp; Penyesuaian:
                  </span>
                  <ul className="space-y-2">
                    {release.changes.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                      >
                        {getChangeTypeIcon(item.type)}
                        <div className="space-y-0.5">
                          <span className="mr-2 inline-block">{getChangeTypeBadge(item.type)}</span>
                          <span>{item.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* GitHub Commit Link */}
                {release.githubCommitUrl && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Audit komit terverifikasi:</span>
                    <a
                      href={release.githubCommitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Lihat Riwayat Komit di GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* GitHub Repositories Index Section */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                <Github className="w-4 h-4" />
                <span>Repositori Sumber Terbuka</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Daftar Repositori GitHub Ekosistem
              </h3>
            </div>
            <a
              href="https://github.com/adityaarta085"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-100 transition shrink-0"
            >
              <span>Profil Organisasi GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Setiap repositori layanan dikelola secara mandiri dengan pipeline continuous deployment ke edge Vercel. Anda dapat memeriksa struktur kode, log komit, dan riwayat perbaikan secara transparan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {[
              { name: 'Portal Utama', repo: 'bikinkilat-portal', domain: 'bikinkilat.web.id' },
              { name: 'Slide & Makalah', repo: 'bikinkilat-slide', domain: 'slide.bikinkilat.web.id' },
              { name: 'Modul Merdeka', repo: 'bikinkilat-modul', domain: 'modul.bikinkilat.web.id' },
              { name: 'CV ATS Score', repo: 'bikinkilat-cv', domain: 'cv.bikinkilat.web.id' },
              { name: 'Kalkulator RAB', repo: 'bikinkilat-rab', domain: 'rab.bikinkilat.web.id' },
              { name: 'Surat & Kontrak', repo: 'bikinkilat-surat', domain: 'surat.bikinkilat.web.id' },
              { name: 'Kalkulator Waris', repo: 'bikinkilat-waris', domain: 'waris.bikinkilat.web.id' },
              { name: 'Proposal Skripsi', repo: 'bikinkilat-proposal', domain: 'proposal.bikinkilat.web.id' },
              { name: 'Pas Foto SSCASN', repo: 'bikinkilat-pasfoto', domain: 'pasfoto.bikinkilat.web.id' },
            ].map((item) => (
              <a
                key={item.repo}
                href={`https://github.com/adityaarta085/${item.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-indigo-300 transition">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {item.repo}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition" />
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
