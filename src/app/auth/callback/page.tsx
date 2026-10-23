"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { setSharedSessionCookie, safeDecodeURIComponent } from "@/lib/session";
import { Zap, Loader2, CheckCircle2, AlertCircle, Mail, ExternalLink, KeyRound, ArrowRight } from "lucide-react";

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
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Menghubungkan akun BikinKilat Anda...");
  const [returnTarget, setReturnTarget] = useState<string>("/");

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
          const user = session.user;
          const email = user.email || "";
          const name =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            email.split("@")[0] ||
            "Pengguna BikinKilat";

          // Sync to centralized wallet with 5 initial tokens
          try {
            const res = await fetch(
              `/api/wallet?userId=${user.id}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`
            );
            const walletData = await res.json();
            const tokens = typeof walletData.tokens === "number" ? walletData.tokens : 5;
            setSharedSessionCookie(user.id, tokens);
          } catch (syncErr) {
            console.warn("Wallet sync notice:", syncErr);
            setSharedSessionCookie(user.id, 5);
          }

          if (isMounted) {
            setStatus("success");
            setMessage("Login berhasil! Mengalihkan ke ruang kerja...");
            setTimeout(() => {
              window.location.href = resolvedReturn;
            }, 1000);
          }
        } else {
          // If no immediate session, give listener a brief window
          const timeout = setTimeout(() => {
            if (isMounted) {
              setStatus("error");
              setMessage(
                "Sesi login belum ditemukan atau tautan verifikasi telah kedaluwarsa. Silakan gunakan opsi masukkan kode token OTP atau masuk kembali."
              );
            }
          }, 3500);

          const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            if (newSession?.user) {
              clearTimeout(timeout);
              const u = newSession.user;
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
              } catch (e) {
                setSharedSessionCookie(u.id, 5);
              }

              if (isMounted) {
                setStatus("success");
                setMessage("Login berhasil! Mengalihkan...");
                setTimeout(() => {
                  window.location.href = resolvedReturn;
                }, 1000);
              }
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-100 dark:shadow-none">
          <Zap className="w-7 h-7 text-amber-300 fill-amber-300" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-black text-slate-900 dark:text-white">
            {status === "loading" && "Memverifikasi Akun"}
            {status === "success" && "Otentikasi Berhasil"}
            {status === "error" && "Kendala Otentikasi"}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
            {message}
          </p>
        </div>

        <div className="py-2 flex justify-center">
          {status === "loading" && (
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Menyiapkan ruang kerja Anda...</span>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-in zoom-in-50">
              <CheckCircle2 className="w-5 h-5" />
              <span>Satu Akun, 9 Layanan Siap Digunakan</span>
            </div>
          )}

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
                <span>Masukkan Kode Token OTP di Halaman Masuk</span>
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
