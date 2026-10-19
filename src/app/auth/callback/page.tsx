"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { setSharedSessionCookie } from "@/lib/session";
import { Zap, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Menghubungkan akun BikinKilat Anda...");

  useEffect(() => {
    let isMounted = true;

    async function handleAuth() {
      try {
        // 1. Check existing session or exchange auth code
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (session?.user) {
          const user = session.user;
          const email = user.email || "";
          const name = user.user_metadata?.full_name || user.user_metadata?.name || email.split("@")[0] || "Pengguna BikinKilat";

          // 2. Sync to centralized users table with 5 initial tokens
          try {
            const res = await fetch(`/api/wallet?userId=${user.id}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
            const walletData = await res.json();
            const tokens = typeof walletData.tokens === "number" ? walletData.tokens : 5;
            setSharedSessionCookie(user.id, tokens);
          } catch (syncErr) {
            console.warn("Wallet sync notice:", syncErr);
            setSharedSessionCookie(user.id, 5);
          }

          if (isMounted) {
            setStatus("success");
            setMessage("Login berhasil! Mengalihkan Anda...");
            
            const returnUrl = searchParams.get("returnUrl") || "/";
            setTimeout(() => {
              window.location.href = returnUrl;
            }, 1200);
          }
        } else {
          // If no immediate session, give auth listener 2 seconds before timing out
          const timeout = setTimeout(() => {
            if (isMounted) {
              setStatus("error");
              setMessage("Sesi login tidak ditemukan atau telah kedaluwarsa. Silakan coba masuk kembali.");
            }
          }, 3500);

          const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            if (newSession?.user) {
              clearTimeout(timeout);
              const u = newSession.user;
              const uEmail = u.email || "";
              const uName = u.user_metadata?.full_name || uEmail.split("@")[0] || "Pengguna BikinKilat";
              
              try {
                const res = await fetch(`/api/wallet?userId=${u.id}&email=${encodeURIComponent(uEmail)}&name=${encodeURIComponent(uName)}`);
                const walletData = await res.json();
                const tokens = typeof walletData.tokens === "number" ? walletData.tokens : 5;
                setSharedSessionCookie(u.id, tokens);
              } catch (e) {
                setSharedSessionCookie(u.id, 5);
              }

              if (isMounted) {
                setStatus("success");
                setMessage("Login berhasil! Mengalihkan Anda...");
                const returnUrl = searchParams.get("returnUrl") || "/";
                setTimeout(() => {
                  window.location.href = returnUrl;
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
          setMessage(err.message || "Gagal memproses otentikasi akun. Silakan coba kembali.");
        }
      }
    }

    handleAuth();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-100">
          <Zap className="w-7 h-7 text-amber-300 fill-amber-300" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-black text-slate-900">
            {status === "loading" && "Memverifikasi Akun"}
            {status === "success" && "Otentikasi Berhasil"}
            {status === "error" && "Kendala Otentikasi"}
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            {message}
          </p>
        </div>

        <div className="py-2 flex justify-center">
          {status === "loading" && (
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Menyiapkan ruang kerja Anda...</span>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold animate-in zoom-in-50">
              <CheckCircle2 className="w-5 h-5" />
              <span>Satu Akun, 9 Layanan Siap Digunakan</span>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-center gap-2 text-rose-600 text-xs font-semibold">
                <AlertCircle className="w-5 h-5" />
                <span>Verifikasi Gagal</span>
              </div>
              <a
                href="/"
                className="inline-block w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
