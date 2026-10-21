"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";
import { getCookieDomain } from "@/lib/session";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check cross-subdomain cookie first
    const hasCookieConsent =
      typeof document !== "undefined" &&
      document.cookie.match(/(?:^|;\s*)bk_consent=([^;]+)/);
    const hasLocalConsent =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("bikinkilat_cookie_consent");

    if (!hasCookieConsent && !hasLocalConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (level: "all" | "essential") => {
    const domain = getCookieDomain();
    const domainStr = domain ? `; Domain=${domain}` : "";
    const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
    const secureStr = isSecure ? "; Secure" : "";
    const maxAge = 60 * 60 * 24 * 365;

    if (typeof document !== "undefined") {
      document.cookie = `bk_consent=${level}; Path=/; Max-Age=${maxAge}; SameSite=Lax${domainStr}${secureStr}`;
    }
    try {
      localStorage.setItem("bikinkilat_cookie_consent", level);
      localStorage.setItem("bikinkilat_cookie_consent_date", new Date().toISOString());
    } catch (e) {}

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Pemberitahuan Persetujuan Cookie"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-50 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-slate-950/50 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Privasi & Cookie</h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  UU PDP No. 27/2022
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Kepatuhan Perlindungan Data Pribadi Indonesia
              </p>
            </div>
          </div>

          <button
            onClick={() => saveConsent("essential")}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition min-h-[32px] min-w-[32px] flex items-center justify-center"
            aria-label="Tutup pemberitahuan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="text-xs text-slate-300 leading-relaxed space-y-2">
          <p>
            BikinKilat.web.id menggunakan cookie esensial agar sesi akun Anda tetap aman dan saldo token tersinkronisasi otomatis saat berpindah antar layanan.
          </p>

          {showPreferences ? (
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 mt-2 text-[11px]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Cookie Esensial (Wajib)</span>
                  <span className="text-slate-400">Diperlukan untuk keamanan login dan saldo token.</span>
                </div>
                <span className="text-emerald-400 font-bold">Selalu Aktif</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="font-bold text-white block">Cookie Preferensi</span>
                  <span className="text-slate-400">Mengingat setelan mode gelap/terang di seluruh layanan.</span>
                </div>
                <span className="text-indigo-400 font-bold">Aktif</span>
              </div>
            </div>
          ) : null}

          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] pt-1">
            <Link
              href="/kebijakan-privasi"
              className="text-indigo-400 hover:text-indigo-300 underline font-medium"
            >
              Kebijakan Privasi
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/syarat-ketentuan"
              className="text-indigo-400 hover:text-indigo-300 underline font-medium"
            >
              Syarat & Ketentuan
            </Link>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="text-slate-400 hover:text-slate-200 underline font-medium"
            >
              {showPreferences ? "Sembunyikan Rincian" : "Atur Preferensi"}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-col sm:flex-row gap-2 pt-1">
          <button
            type="button"
            onClick={() => saveConsent("all")}
            className="w-full sm:flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Terima Semua</span>
          </button>

          <button
            type="button"
            onClick={() => saveConsent("essential")}
            className="w-full sm:w-auto min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition"
          >
            Hanya Esensial
          </button>
        </div>
      </div>
    </aside>
  );
}
