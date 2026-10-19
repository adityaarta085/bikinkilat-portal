"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth-context";
import { AuthModal } from "@/components/AuthModal";
import CookieBanner from "@/components/CookieBanner";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
      <CookieBanner />
    </AuthProvider>
  );
}
