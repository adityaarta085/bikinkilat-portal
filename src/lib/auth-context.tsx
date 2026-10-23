"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { setSharedSessionCookie, clearSharedSessionCookie, getSharedSessionCookie } from "@/lib/session";
import type { User, Session } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  tokens: number;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  tokens: number;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signInWithGoogle: (redirectTo?: string) => Promise<{ error: any }>;
  signInWithEmailOtp: (email: string, customRedirect?: string) => Promise<{ error: any; message?: string }>;
  verifyEmailOtp: (email: string, token: string) => Promise<{ error: any; message?: string }>;
  signOut: () => Promise<void>;
  setTokens: React.Dispatch<React.SetStateAction<number>>;
  refreshTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tokens, setTokens] = useState<number>(0); // Pengguna belum login WAJIB 0 token
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const syncUserProfile = useCallback(async (sbUser: User) => {
    try {
      const email = sbUser.email || "";
      const name = sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || email.split("@")[0] || "Pengguna BikinKilat";
      const avatar_url = sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture;

      // Sync with centralized wallet/users table
      const res = await fetch(`/api/wallet?userId=${sbUser.id}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
      const data = await res.json();

      const userTokens = typeof data.tokens === "number" ? data.tokens : 5;
      setTokens(userTokens);

      const p: UserProfile = {
        id: sbUser.id,
        email,
        name,
        tokens: userTokens,
        avatar_url,
      };
      setProfile(p);
      setSharedSessionCookie(sbUser.id, userTokens);
    } catch (err) {
      console.warn("Error syncing user profile:", err);
      // Fallback
      setTokens(5);
      setProfile({
        id: sbUser.id,
        email: sbUser.email || "",
        name: sbUser.user_metadata?.full_name || "Pengguna BikinKilat",
        tokens: 5,
        avatar_url: sbUser.user_metadata?.avatar_url,
      });
    }
  }, []);

  const refreshTokens = useCallback(async () => {
    if (!user) {
      setTokens(0);
      return;
    }
    await syncUserProfile(user);
  }, [user, syncUserProfile]);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted) {
          setUser(session.user);
          await syncUserProfile(session.user);
        } else if (typeof window !== "undefined" && window.localStorage.getItem("bikinkilat_auth_user")) {
          try {
            const cachedUser = JSON.parse(window.localStorage.getItem("bikinkilat_auth_user") || "null");
            if (cachedUser?.id && mounted) {
              setUser(cachedUser);
              await syncUserProfile(cachedUser);
            }
          } catch (e) {
            console.warn("Failed parsing cached auth user:", e);
          }
        } else {
          // Check shared cookie for cross-subdomain SSO session
          const shared = getSharedSessionCookie();
          if (shared.userId && mounted) {
            try {
              const res = await fetch(`/api/wallet?userId=${encodeURIComponent(shared.userId)}`);
              const data = await res.json();
              if (data.user && mounted) {
                setUser({
                  id: data.user.id,
                  email: data.user.email,
                  user_metadata: { full_name: data.user.name },
                } as any);
                setProfile({
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.name,
                  tokens: typeof data.tokens === "number" ? data.tokens : 5,
                });
                setTokens(typeof data.tokens === "number" ? data.tokens : 5);
              } else if (shared.cachedTokens !== null && mounted) {
                setTokens(shared.cachedTokens);
              }
            } catch (e) {
              if (mounted) setTokens(0);
            }
          } else if (mounted) {
            setTokens(0);
          }
        }
      } catch (err) {
        console.warn("Auth initialization error:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await syncUserProfile(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
        clearSharedSessionCookie();
        setTokens(0); // WAJIB 0 saat logout
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [syncUserProfile]);

  const signInWithGoogle = async (customRedirect?: string) => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://bikinkilat.web.id";
      const redirectUrl = `${origin}/auth/callback${customRedirect ? `?returnUrl=${encodeURIComponent(customRedirect)}` : ""}`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      return { error };
    } catch (err) {
      return { error: err };
    }
  };

  const signInWithEmailOtp = async (email: string, customRedirect?: string) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail.endsWith("@gmail.com")) {
        return {
          error: new Error("Hanya alamat email @gmail.com yang didukung."),
          message:
            "Hanya alamat email @gmail.com yang didukung. Mohon gunakan akun Gmail atau masuk langsung dengan Google.",
        };
      }

      const origin = typeof window !== "undefined" ? window.location.origin : "https://bikinkilat.web.id";
      const redirectUrl = `${origin}/auth/callback${customRedirect ? `?returnUrl=${encodeURIComponent(customRedirect)}` : ""}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });
      return {
        error,
        message: error
          ? error.message
          : "Tautan dan kode token masuk telah dikirim ke Gmail Anda!",
      };
    } catch (err: any) {
      return { error: err, message: err.message };
    }
  };

  const verifyEmailOtp = async (email: string, token: string) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanToken = token.trim();

      if (!cleanEmail || !cleanEmail.endsWith("@gmail.com")) {
        return {
          error: new Error("Hanya alamat email @gmail.com yang didukung."),
          message:
            "Hanya alamat email @gmail.com yang didukung. Mohon gunakan akun Gmail atau masuk langsung dengan Google.",
        };
      }

      if (!cleanToken) {
        return {
          error: new Error("Kode token OTP wajib diisi."),
          message: "Mohon masukkan kode token OTP dari email Gmail Anda.",
        };
      }

      // 1. Try 'email' type (standard email OTP)
      let { data, error } = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: cleanToken,
        type: "email",
      });

      // 2. Fallback: try 'signup' type (new user confirmation)
      if (error) {
        const signupRes = await supabase.auth.verifyOtp({
          email: cleanEmail,
          token: cleanToken,
          type: "signup",
        });
        if (!signupRes.error) {
          data = signupRes.data;
          error = null;
        }
      }

      if (error) {
        return {
          error,
          message: error.message || "Kode token OTP tidak valid atau telah kedaluwarsa.",
        };
      }

      if (data?.session?.user) {
        setUser(data.session.user);
        await syncUserProfile(data.session.user);
      }

      return {
        error: null,
        message: "Otentikasi berhasil! Mengalihkan ke akun Anda...",
      };
    } catch (err: any) {
      return { error: err, message: err?.message || "Gagal memverifikasi kode token." };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Sign out exception:", e);
    }
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("bikinkilat_auth_user");
    }
    clearSharedSessionCookie();
    setUser(null);
    setProfile(null);
    setTokens(0);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        tokens,
        isLoading,
        isAuthModalOpen,
        openAuthModal: () => {
          if (typeof window !== "undefined") {
            const current = window.location.pathname + window.location.search;
            window.location.href = `/auth?returnUrl=${encodeURIComponent(current)}`;
          }
        },
        closeAuthModal: () => setIsAuthModalOpen(false),
        signInWithGoogle,
        signInWithEmailOtp,
        verifyEmailOtp,
        signOut,
        setTokens,
        refreshTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
