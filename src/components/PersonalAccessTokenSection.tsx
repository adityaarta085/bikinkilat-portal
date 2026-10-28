'use client';

import React, { useState, useEffect } from 'react';
import {
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Coins,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { User } from '@supabase/supabase-js';

interface PersonalAccessTokenSectionProps {
  user: User;
}

export function PersonalAccessTokenSection({ user }: PersonalAccessTokenSectionProps) {
  const [token, setToken] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [lastUsedAt, setLastUsedAt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showConfirmResetModal, setShowConfirmResetModal] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  // Ambil token saat komponen dimuat
  useEffect(() => {
    async function loadToken() {
      if (!user?.id) return;
      try {
        setIsLoading(true);
        const res = await fetch(`/api/user/token?userId=${encodeURIComponent(user.id)}&email=${encodeURIComponent(user.email || '')}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.token) {
            setToken(data.token);
            setCreatedAt(data.createdAt);
            setLastUsedAt(data.lastUsedAt);
          }
        }
      } catch (err) {
        console.warn('Gagal memuat kunci akses:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadToken();
  }, [user?.id, user?.email]);

  const handleCopy = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToken = async () => {
    setIsResetting(true);
    setResetError(null);
    try {
      const res = await fetch('/api/user/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset',
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setToken(data.token);
        setCreatedAt(data.createdAt);
        setLastUsedAt(null);
        setShowConfirmResetModal(false);
        setShowToken(true);

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
          });
        } catch {}
      } else {
        setResetError(data.error || 'Gagal meriset kunci akses.');
      }
    } catch (err: any) {
      setResetError(err?.message || 'Terjadi gangguan jaringan.');
    } finally {
      setIsResetting(false);
    }
  };

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return '-';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const maskedToken = token
    ? `${token.slice(0, 10)}${'•'.repeat(24)}`
    : 'Memuat kunci akses rahasia...';

  return (
    <>
      <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(15,23,42,0.02)] transition-colors space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-xs">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Kunci Akses Layanan &amp; Alat Bantu Tambahan
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Akses Terpadu
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Kunci akses pribadi Anda untuk masuk ke berbagai alat bantu dan layanan otomasi cerdas BikinKilat.
              </p>
            </div>
          </div>

          <a
            href="https://modul.bikinkilat.web.id"
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Buka Generator Perangkat Ajar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Info Pemotongan Token (Jelas & Ramah Konsumen) */}
        <div className="rounded-2xl p-4 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
            <Coins className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-indigo-950 dark:text-indigo-200 uppercase tracking-wide">
              Biaya Penggunaan: 1 Token Saldo per Sesi Masuk
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Setiap kali Anda memasukkan Kunci Akses ini untuk membuka layanan tambahan (seperti <em>Generator Perangkat Ajar</em>), saldo akun BikinKilat Anda akan otomatis <strong>terpotong 1 Token</strong>. Pastikan saldo Anda mencukupi sebelum masuk.
            </p>
          </div>
        </div>

        {/* Security Warning Banner */}
        <div className="rounded-2xl p-4 bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wide">
              PERATURAN PENTING: DILARANG MEMPERJUALBELIKAN ATAU MEMBAGIKAN KUNCI INI
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Kunci akses ini bersifat rahasia dan terikat langsung ke akun serta saldo Anda. Siapapun yang memiliki kunci ini dapat menggunakan saldo token Anda. Jika mendeteksi kunci Anda bocor, segera tekan tombol <strong>Reset Kunci</strong> di bawah.
            </p>
          </div>
        </div>

        {/* Token Card */}
        <div className="rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Kunci Akses Pribadi Akun Anda
            </span>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span>Dibuat: <strong className="text-slate-700 dark:text-slate-300">{formatDate(createdAt)}</strong></span>
              <span>•</span>
              <span>Terakhir Dipakai: <strong className="text-slate-700 dark:text-slate-300">{lastUsedAt ? formatDate(lastUsedAt) : 'Belum pernah'}</strong></span>
            </div>
          </div>

          {/* Token Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between font-mono text-xs text-slate-800 dark:text-slate-200 shadow-inner">
              <span className="truncate select-all">
                {isLoading ? (
                  <span className="inline-flex items-center gap-2 text-slate-400">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Memuat kunci akses...
                  </span>
                ) : showToken ? (
                  token
                ) : (
                  maskedToken
                )}
              </span>

              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                disabled={isLoading || !token}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition shrink-0 ml-2"
                title={showToken ? 'Sembunyikan' : 'Tampilkan'}
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              disabled={isLoading || !token}
              className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shrink-0 shadow-xs active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin!' : 'Salin Kunci'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setResetError(null);
                setShowConfirmResetModal(true);
              }}
              disabled={isLoading || !token}
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition shrink-0 shadow-xs"
              title="Cabut dan ganti kunci dengan yang baru"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Kunci</span>
            </button>
          </div>
        </div>
      </section>

      {/* MODAL CONFIRM RESET TOKEN */}
      {showConfirmResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Riset Kunci Akses?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Kunci yang sekarang akan <strong>langsung dibatalkan</strong> dan tidak bisa digunakan lagi di layanan tambahan manapun. Anda akan mendapatkan kunci acak baru.
              </p>
            </div>

            {resetError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs">
                {resetError}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmResetModal(false)}
                disabled={isResetting}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleResetToken}
                disabled={isResetting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-rose-600/30"
              >
                {isResetting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>Ya, Riset Sekarang</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
