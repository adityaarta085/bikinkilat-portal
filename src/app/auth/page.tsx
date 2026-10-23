"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Zap,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Coins,
  KeyRound,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

function AuthFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const {
    user,
    profile,
    tokens,
    signInWithGoogle,
    signInWithEmailOtp,
    verifyEmailOtp,
    signOut,
    isLoading: isAuthLoading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [authMode, setAuthMode] = useState<"send_code" | "enter_token">("send_code");

  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [isSubmittingToken, setIsSubmittingToken] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect after short delay
  useEffect(() => {
    if (user && !isAuthLoading) {
      const timer = setTimeout(() => {
        if (returnUrl && returnUrl !== "/auth") {
          window.location.href = returnUrl;
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user, isAuthLoading, returnUrl]);

  const handleGoogleLogin = async () => {
    setIsSubmittingGoogle(true);
    setErrorMessage(null);
    try {
      const { error } = await signInWithGoogle(returnUrl);
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
      const res = await signInWithEmailOtp(cleanEmail, returnUrl);
      if (res.error) {
        setErrorMessage(
          res.error.message || "Gagal mengirim kode token. Silakan coba beberapa saat lagi."
        );
      } else {
        setEmailSuccess(
          res.message || "Kode token 6-digit dan tautan masuk telah dikirim ke kotak masuk Gmail Anda!"
        );
        // Automatically switch to token entry mode
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
          window.location.href = returnUrl;
        }, 1000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kendala saat verifikasi kode token.");
    } finally {
      setIsSubmittingToken(false);
    }
  };

  // If already authenticated
  if (user && !isAuthLoading) {
    const displayName =
      profile?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Pengguna";
    return (
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Sudah Masuk
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Anda saat ini telah masuk sebagai <strong className="text-slate-900 dark:text-white">{displayName}</strong> ({user.email}).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Saldo Token Aktif</span>
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-extrabold text-sm">
            <Coins className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{tokens} Token</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href={returnUrl}
            className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <span>Lanjutkan ke Layanan</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => signOut()}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition"
          >
            Keluar Akun
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all">
      {/* Decorative Top Accent */}
      <div className="h-2.5 w-full bg-gradient-to-r from-indigo-600 via-sky-500 to-amber-400" />

      <div className="p-6 sm:p-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <BrandLogo variant="horizontal" size="lg" href="/" badge="Portal Resmi" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Masuk ke BikinKilat<span className="text-indigo-600 dark:text-indigo-400">.web.id</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Satu akun resmi terpadu untuk 9 platform otomasi dokumen, presentasi, makalah, dan pasfoto Indonesia.
          </p>
        </div>

        {/* Welcome Promo Badge */}
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-xs leading-snug">
            <span className="font-bold text-amber-950 dark:text-amber-200 block">Bonus Pengguna Baru</span>
            <span className="text-amber-800 dark:text-amber-300">
              Dapatkan langsung <strong>5 Token Gratis</strong> saat pertama kali masuk akun!
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 flex items-start gap-3 text-xs text-rose-800 dark:text-rose-300 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Email Success Alert & Quick Gmail Button */}
        {emailSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 space-y-3 animate-in fade-in">
            <div className="flex items-start gap-3 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Email Masuk Terkirim!</p>
                <p className="mt-0.5 leading-relaxed">{emailSuccess}</p>
              </div>
            </div>

            {/* Quick Link to Gmail */}
            <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Mail className="w-4 h-4 text-rose-500" />
              <span>Buka Kotak Masuk Gmail Anda</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        )}

        {/* Option 1: Google Sign-In Button */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={isSubmittingGoogle}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm shadow-sm flex items-center justify-center gap-3 transition active:scale-[0.99] disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isSubmittingGoogle ? (
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
            ) : (
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
            )}
            <span>{isSubmittingGoogle ? "Menghubungkan ke Google..." : "Masuk dengan Google"}</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase shrink-0">
              atau via email @gmail.com
            </span>
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          </div>

          {/* Mode Tabs: Kirim Kode vs Isi Kode Token */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthMode("send_code");
                setErrorMessage(null);
              }}
              className={`py-2 px-3 rounded-xl transition text-center ${
                authMode === "send_code"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Kirim Kode / Tautan
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("enter_token");
                setErrorMessage(null);
              }}
              className={`py-2 px-3 rounded-xl transition text-center flex items-center justify-center gap-1.5 ${
                authMode === "enter_token"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Isi Kode Token</span>
            </button>
          </div>

          {/* Form Mode 1: Kirim Kode OTP / Tautan Masuk ke Gmail */}
          {authMode === "send_code" && (
            <form onSubmit={handleSendEmailCode} className="space-y-3.5 animate-in fade-in duration-150">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                  Alamat Gmail Resmi:
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@gmail.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition font-medium"
                  />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 pl-1">
                  * Khusus akun <strong className="text-indigo-600 dark:text-indigo-400">@gmail.com</strong>
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmittingEmail}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {isSubmittingEmail ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Kirim Kode Token ke Gmail</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Form Mode 2: Masukkan Kode Token OTP (dari Gmail) */}
          {authMode === "enter_token" && (
            <form onSubmit={handleVerifyOtpToken} className="space-y-3.5 animate-in fade-in duration-150">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                  Alamat Gmail Anda:
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@gmail.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                    Masukkan Kode Token OTP:
                  </label>
                  <a
                    href="https://mail.google.com/mail/u/0/#inbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                  >
                    <span>Cek di Gmail</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={otpToken}
                    onChange={(e) => setOtpToken(e.target.value)}
                    placeholder="Contoh: 123456"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-mono tracking-widest text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={isSubmittingToken}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {isSubmittingToken ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Verifikasi & Masuk Akun</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Secondary Action: Quick Gmail Button */}
                <a
                  href="https://mail.google.com/mail/u/0/#inbox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Mail className="w-3.5 h-3.5 text-rose-500" />
                  <span>Buka Tab Gmail</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Legal & Trust Footnote */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
            Dengan melanjutkan, Anda menyetujui{" "}
            <Link href="/syarat-ketentuan" className="underline hover:text-slate-600 dark:hover:text-slate-300">
              Syarat & Ketentuan
            </Link>
            ,{" "}
            <Link href="/kebijakan-privasi" className="underline hover:text-slate-600 dark:hover:text-slate-300">
              Kebijakan Privasi
            </Link>
            , serta{" "}
            <Link href="/etika-akademik" className="underline hover:text-slate-600 dark:hover:text-slate-300">
              Pedoman Etika AI
            </Link>{" "}
            kami.
          </p>
        </div>

        {/* Ecosystem Subdomain Badges */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>1 Akun Resmi Berlaku di 9 Subdomain:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">slide.bikinkilat.web.id</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">cv.bikinkilat.web.id</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">modul.bikinkilat.web.id</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">pasfoto.bikinkilat.web.id</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">rab.bikinkilat.web.id</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">surat.bikinkilat.web.id</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">waris.bikinkilat.web.id</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">proposal.bikinkilat.web.id</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Top Navbar */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content Box */}
      <main className="flex-1 flex items-center justify-center py-6">
        <Suspense
          fallback={
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center min-h-[400px]">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          }
        >
          <AuthFormContent />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full text-center pt-4 text-xs text-slate-400 dark:text-slate-600">
        © {new Date().getFullYear()} BikinKilat.web.id. Hak Cipta Dilindungi Undang-Undang.
      </footer>
    </div>
  );
}
