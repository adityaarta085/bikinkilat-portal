"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { setSharedSessionCookie } from "@/lib/session";
import type { User } from "@supabase/supabase-js";
import {
  Zap,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  ExternalLink,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Lock,
} from "lucide-react";

function getSafeReturnUrl(param: string | null): string {
  if (!param) return "/";
  try {
    const decoded = decodeURIComponent(param);
    if (decoded.startsWith("/") || decoded.includes("bikinkilat.web.id")) {
      return decoded;
    }
    return "/";
  } catch {
    return param.startsWith("/") ? param : "/";
  }
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error" | "2fa_challenge">("loading");
  const [message, setMessage] = useState("Menghubungkan akun BikinKilat Anda...");
  const [returnTarget, setReturnTarget] = useState<string>("/");

  // 2FA Challenge States
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [totpCode, setTotpCode] = useState("");
  const [isVerifyingTotp, setIsVerifyingTotp] = useState(false);
  const [totpError, setTotpError] = useState<string | null>(null);

  // Complete login after all checks (and 2FA if enabled) pass
  const finalizeLogin = async (u: User, targetReturn: string) => {
    const uEmail = u.email || "";
    const uName =
      u.user_metadata?.full_name ||
      u.user_metadata?.name ||
      uEmail.split("@")[0] ||
      "Pengguna BikinKilat";

    try {
      const res = await fetch(
        `/api/wallet?userId=${u.id}&email=${encodeURIComponent(uEmail)}&name=${encodeURIComponent(uName)}`
      );
      const walletData = await res.json();
      const tokens = typeof walletData.tokens === "number" ? walletData.tokens : 5;
      setSharedSessionCookie(u.id, tokens);
    } catch (syncErr) {
      console.warn("Wallet sync notice:", syncErr);
      setSharedSessionCookie(u.id, 5);
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem(`bikinkilat_2fa_verified_${u.id}`, "true");
    }

    setStatus("success");
    setMessage("Login berhasil! Mengalihkan ke ruang kerja...");
    setTimeout(() => {
      window.location.href = targetReturn;
    }, 1000);
  };

  // Process user: check if 2FA is required first
  const handleUserSession = async (u: User, resolvedReturn: string) => {
    try {
      const secRes = await fetch(`/api/user/security?userId=${encodeURIComponent(u.id)}`);
      if (secRes.ok) {
        const secData = await secRes.json();
        if (secData.twoFactorEnabled) {
          // 2FA is enabled: stop automatic login and show 2FA prompt
          setPendingUser(u);
          setStatus("2fa_challenge");
          setMessage("Verifikasi Keamanan Akun Diperlukan");
          return;
        }
      }
    } catch (secErr) {
      console.warn("Security check notice:", secErr);
    }

    // 2FA not enabled: finalize login directly
    await finalizeLogin(u, resolvedReturn);
  };

  useEffect(() => {
    let isMounted = true;

    async function handleAuth() {
      try {
        const rawReturn = searchParams.get("returnUrl");
        const resolvedReturn = getSafeReturnUrl(rawReturn);
        if (isMounted) setReturnTarget(resolvedReturn);

        // 1. Check for error parameters in URL query
        const urlError = searchParams.get("error");
        const urlErrorDesc = searchParams.get("error_description");
        if (urlError || urlErrorDesc) {
          const humanDesc = urlErrorDesc || urlError;
          if (humanDesc?.toLowerCase().includes("expired") || humanDesc?.toLowerCase().includes("invalid")) {
            throw new Error("Tautan verifikasi telah kedaluwarsa atau sudah digunakan. Silakan minta kode token baru atau masuk langsung.");
          }
          throw new Error(humanDesc || "Tautan otentikasi tidak valid.");
        }

        // 2. Check for PKCE authorization code
        const code = searchParams.get("code");
        if (code) {
          try {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeError) {
              console.warn("PKCE exchange notice:", exchangeError.message);
            }
          } catch (e) {
            console.warn("PKCE exchange caught:", e);
          }
        }

        // 3. Check for token_hash & type (email verification / magic link)
        const tokenHash = searchParams.get("token_hash");
        const otpType = searchParams.get("type");
        if (tokenHash && otpType) {
          try {
            const { error: otpError } = await supabase.auth.verifyOtp({
              token_hash: tokenHash,
              type: otpType as any,
            });
            if (otpError) {
              console.warn("Token hash verify notice:", otpError.message);
            }
          } catch (e) {
            console.warn("Token hash verify caught:", e);
          }
        }

        // 4. Retrieve established session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (session?.user) {
          if (isMounted) {
            await handleUserSession(session.user, resolvedReturn);
          }
        } else {
          // If no immediate session, give listener a brief window
          const timeout = setTimeout(() => {
            if (isMounted && status !== "2fa_challenge") {
              setStatus("error");
              setMessage(
                "Sesi login belum ditemukan atau tautan verifikasi telah kedaluwarsa. Silakan gunakan opsi masukkan kode token OTP atau masuk kembali."
              );
            }
          }, 3500);

          const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            if (newSession?.user && isMounted) {
              clearTimeout(timeout);
              await handleUserSession(newSession.user, resolvedReturn);
            }
          });

          return () => {
            clearTimeout(timeout);
            authListener.subscription.unsubscribe();
          };
        }
      } catch (err: any) {
        if (isMounted) {
          setStatus("error");
          const rawMsg = err?.message || "";
          if (rawMsg.toLowerCase().includes("malformed") || rawMsg.toLowerCase().includes("invalid")) {
            setMessage("Tautan verifikasi tidak sesuai atau telah kedaluwarsa. Silakan masukkan kode token OTP langsung di bawah.");
          } else {
            setMessage(rawMsg || "Gagal memproses otentikasi akun. Silakan coba kembali.");
          }
        }
      }
    }

    handleAuth();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  // Handle Submit 2FA Code
  const handleSubmit2Fa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingUser) return;

    const cleanCode = totpCode.trim().replace(/\s+/g, "");
    if (cleanCode.length !== 6) {
      setTotpError("Masukkan 6 digit angka dari aplikasi autentikator Anda.");
      return;
    }

    setIsVerifyingTotp(true);
    setTotpError(null);

    try {
      const res = await fetch("/api/user/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify_2fa",
          userId: pendingUser.id,
          token: cleanCode,
        }),
      });

      const data = await res.json();
      if (data.success && data.verified) {
        await finalizeLogin(pendingUser, returnTarget);
      } else {
        setTotpError(data.message || "Kode 2FA tidak valid atau kedaluwarsa. Periksa kembali aplikasi Anda.");
      }
    } catch (err: any) {
      setTotpError(err?.message || "Gagal memverifikasi kode 2FA ke server.");
    } finally {
      setIsVerifyingTotp(false);
    }
  };

  // Handle Cancel 2FA (Sign Out)
  const handleCancel2Fa = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Sign out err:", e);
    }
    window.location.href = `/auth?returnUrl=${encodeURIComponent(returnTarget)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* TOP ICON */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-100 dark:shadow-none">
          {status === "2fa_challenge" ? (
            <ShieldCheck className="w-7 h-7 text-emerald-300" />
          ) : (
            <Zap className="w-7 h-7 text-amber-300 fill-amber-300" />
          )}
        </div>

        {/* HEADER TEXT */}
        <div className="space-y-2">
          <h1 className="text-xl font-black text-slate-900 dark:text-white">
            {status === "loading" && "Memverifikasi Akun"}
            {status === "2fa_challenge" && "Verifikasi Dua Langkah (2FA)"}
            {status === "success" && "Otentikasi Berhasil"}
            {status === "error" && "Kendala Otentikasi"}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
            {status === "2fa_challenge"
              ? "Akun Anda dilindungi Verifikasi Dua Langkah. Buka Google Authenticator atau aplikasi autentikator Anda."
              : message}
          </p>
        </div>

        <div className="py-2 flex justify-center">
          {/* LOADING STATE */}
          {status === "loading" && (
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Menyiapkan ruang kerja Anda...</span>
            </div>
          )}

          {/* 2FA CHALLENGE FORM */}
          {status === "2fa_challenge" && (
            <form onSubmit={handleSubmit2Fa} className="w-full space-y-4 text-left">
              <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-xl text-xs text-indigo-800 dark:text-indigo-300 flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="truncate font-medium">{pendingUser?.email}</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Kode Autentikator 6-Digit
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  autoFocus
                  required
                  placeholder="000 000"
                  value={totpCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setTotpCode(val);
                  }}
                  className="w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-center text-2xl font-black tracking-[0.35em] placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {totpError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{totpError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifyingTotp || totpCode.trim().length !== 6}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                {isVerifyingTotp ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memverifikasi Kode...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Konfirmasi & Buka Ruang Kerja</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel2Fa}
                className="w-full py-2 px-3 text-center text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition"
              >
                Batalkan & Masuk dengan Akun Lain
              </button>
            </form>
          )}

          {/* SUCCESS STATE */}
          {status === "success" && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-in zoom-in-50">
              <CheckCircle2 className="w-5 h-5" />
              <span>Satu Akun, 9 Layanan Siap Digunakan</span>
            </div>
          )}

          {/* ERROR STATE */}
          {status === "error" && (
            <div className="space-y-3 w-full text-left">
              <div className="flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-semibold mb-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Verifikasi Tautan Belum Berhasil</span>
              </div>

              {/* Action 1: Open Gmail Quick Link */}
              <a
                href="https://mail.google.com/mail/u/0/#inbox"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Mail className="w-4 h-4 text-rose-600" />
                <span>Buka Gmail (mail.google.com)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              {/* Action 2: Enter OTP Token or Sign In on Auth Page */}
              <a
                href={`/auth?returnUrl=${encodeURIComponent(returnTarget)}`}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
              >
                <KeyRound className="w-4 h-4 text-amber-300" />
                <span>Kembali ke Halaman Masuk Akun</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {/* Action 3: Back to Home */}
              <a
                href="/"
                className="block text-center w-full py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition"
              >
                Kembali ke Beranda
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}