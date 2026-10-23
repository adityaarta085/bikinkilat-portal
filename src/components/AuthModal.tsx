"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { BrandLogo } from "@/components/BrandLogo";
import {
  Zap,
  X,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Loader2,
  KeyRound,
  ExternalLink,
} from "lucide-react";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, signInWithGoogle, signInWithEmailOtp, verifyEmailOtp } =
    useAuth();

  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [authMode, setAuthMode] = useState<"send_code" | "enter_token">("send_code");

  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [isSubmittingToken, setIsSubmittingToken] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    setIsSubmittingGoogle(true);
    setErrorMessage(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(
          error.message || "Gagal menghubungkan ke layanan Google. Silakan coba kembali atau gunakan email @gmail.com."
        );
        setIsSubmittingGoogle(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kendala saat login dengan Google.");
      setIsSubmittingGoogle(false);
    }
  };

  const handleSendEmailCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    // Enforce @gmail.com strictly
    if (!cleanEmail.endsWith("@gmail.com")) {
      setErrorMessage(
        "Hanya alamat email @gmail.com yang didukung. Mohon gunakan akun Gmail Anda atau masuk langsung dengan Google."
      );
      return;
    }

    setIsSubmittingEmail(true);
    setErrorMessage(null);
    setEmailSuccess(null);

    try {
      const res = await signInWithEmailOtp(cleanEmail);
      if (res.error) {
        setErrorMessage(res.error.message || "Gagal mengirim kode token. Silakan coba beberapa saat lagi.");
      } else {
        setEmailSuccess(
          res.message || "Kode token 6-digit dan tautan masuk telah dikirim ke kotak masuk Gmail Anda!"
        );
        // Automatically switch to token input mode
        setAuthMode("enter_token");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kendala pengiriman email.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleVerifyOtpToken = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanToken = otpToken.trim();

    if (!cleanEmail.endsWith("@gmail.com")) {
      setErrorMessage(
        "Hanya alamat email @gmail.com yang didukung. Mohon gunakan akun Gmail Anda atau masuk langsung dengan Google."
      );
      return;
    }

    if (!cleanToken) {
      setErrorMessage("Mohon masukkan kode token OTP (biasanya 6-digit) yang ada di Gmail Anda.");
      return;
    }

    setIsSubmittingToken(true);
    setErrorMessage(null);

    try {
      const res = await verifyEmailOtp(cleanEmail, cleanToken);
      if (res.error) {
        setErrorMessage(
          res.error.message || "Kode token tidak valid atau telah kedaluwarsa. Silakan periksa kembali Gmail Anda."
        );
      } else {
        setEmailSuccess("Otentikasi berhasil! Mengalihkan ke ruang kerja...");
        setTimeout(() => {
          closeAuthModal();
        }, 1000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kendala saat verifikasi kode token.");
    } finally {
      setIsSubmittingToken(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200 transition-colors max-h-[90vh] overflow-y-auto">
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

        <div className="p-6 sm:p-8 space-y-5">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <BrandLogo variant="icon" size="xl" href="" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Masuk ke BikinKilat<span className="text-indigo-600 dark:text-indigo-400">.web.id</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              Satu akun terpadu untuk 9 layanan otomasi cerdas dokumen, makalah, dan presentasi Indonesia.
            </p>
          </div>

          {/* Welcome Promo Badge */}
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 flex items-center gap-3">
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
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Email Success Alert & Quick Gmail Button */}
          {emailSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 space-y-2.5 animate-in fade-in">
              <div className="flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{emailSuccess}</span>
              </div>
              <a
                href="https://mail.google.com/mail/u/0/#inbox"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                <span>Buka Kotak Masuk Gmail</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
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
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                atau via email @gmail.com
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("send_code");
                  setErrorMessage(null);
                }}
                className={`py-1.5 px-2 rounded-lg transition text-center ${
                  authMode === "send_code"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Kirim Kode Masuk
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("enter_token");
                  setErrorMessage(null);
                }}
                className={`py-1.5 px-2 rounded-lg transition text-center flex items-center justify-center gap-1 ${
                  authMode === "enter_token"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <KeyRound className="w-3 h-3" />
                <span>Isi Kode Token</span>
              </button>
            </div>

            {/* Form Mode 1: Send Code */}
            {authMode === "send_code" && (
              <form onSubmit={handleSendEmailCode} className="space-y-2.5">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@gmail.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 pl-1">
                  * Khusus akun <strong className="text-indigo-600 dark:text-indigo-400">@gmail.com</strong>
                </p>

                <button
                  type="submit"
                  disabled={isSubmittingEmail}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-70"
                >
                  {isSubmittingEmail ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim Kode...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Kode Token ke Gmail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Form Mode 2: Verify Token */}
            {authMode === "enter_token" && (
              <form onSubmit={handleVerifyOtpToken} className="space-y-2.5">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@gmail.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition"
                  />
                </div>

                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={otpToken}
                    onChange={(e) => setOtpToken(e.target.value)}
                    placeholder="Kode Token (Contoh: 123456)"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-xs font-mono tracking-widest text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingToken}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-70"
                >
                  {isSubmittingToken ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi...</span>
                    </>
                  ) : (
                    <>
                      <span>Verifikasi & Masuk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <a
                  href="https://mail.google.com/mail/u/0/#inbox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <Mail className="w-3 h-3 text-rose-500" />
                  <span>Buka Tab Gmail</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </form>
            )}
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
