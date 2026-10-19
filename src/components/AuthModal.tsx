"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Zap, X, Mail, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Loader2 } from "lucide-react";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, signInWithGoogle, signInWithEmailOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    setIsSubmittingGoogle(true);
    setErrorMessage(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message || "Gagal menghubungkan ke layanan Google. Silakan coba kembali atau gunakan email.");
        setIsSubmittingGoogle(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kendala saat login dengan Google.");
      setIsSubmittingGoogle(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Mohon masukkan alamat email yang valid.");
      return;
    }

    setIsSubmittingEmail(true);
    setErrorMessage(null);
    setEmailSuccess(null);

    try {
      const res = await signInWithEmailOtp(email);
      if (res.error) {
        setErrorMessage(res.error.message || "Gagal mengirim tautan masuk. Silakan coba beberapa saat lagi.");
      } else {
        setEmailSuccess(res.message || "Tautan verifikasi masuk telah dikirim ke kotak masuk email Anda!");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kendala pengiriman email.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200 transition-colors">
        {/* Decorative Top Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-600 via-sky-500 to-amber-400" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Tutup jendela login"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-100 dark:shadow-none">
              <Zap className="w-6 h-6 text-amber-300 fill-amber-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Masuk ke BikinKilat<span className="text-indigo-600 dark:text-indigo-400">.com</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              Satu akun terpadu untuk 9 layanan otomasi cerdas dokumen, makalah, dan presentasi Indonesia.
            </p>
          </div>

          {/* Welcome Promo Badge */}
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-amber-950 dark:text-amber-200 block">Bonus Pengguna Baru</span>
              <span className="text-amber-800 dark:text-amber-300">Dapatkan langsung 5 Token Gratis saat pertama kali masuk!</span>
            </div>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email Success Alert */}
          {emailSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{emailSuccess}</span>
            </div>
          )}

          {/* Google Sign-In Button */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={isSubmittingGoogle}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm shadow-sm flex items-center justify-center gap-3 transition active:scale-[0.99] disabled:opacity-70"
            >
              {isSubmittingGoogle ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                  <span>Menghubungkan ke Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Lanjutkan dengan Akun Google</span>
                </>
              )}
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                atau via email
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            {/* Email OTP Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-70"
              >
                {isSubmittingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirim Tautan...</span>
                  </>
                ) : (
                  <>
                    <span>Kirim Tautan Masuk Cepat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Legal Compliance Footer */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
            Dengan melanjutkan, Anda menyetujui{" "}
            <Link
              href="/syarat-ketentuan"
              onClick={closeAuthModal}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Syarat & Ketentuan
            </Link>
            ,{" "}
            <Link
              href="/kebijakan-privasi"
              onClick={closeAuthModal}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Kebijakan Privasi
            </Link>
            , serta{" "}
            <Link
              href="/etika-akademik"
              onClick={closeAuthModal}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Pedoman Etika AI
            </Link>{" "}
            kami.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
