"use client";

import React from "react";
import { ThemeProvider } from "@/lib/theme-context";
import { AuthProvider } from "@/lib/auth-context";
import CookieBanner from "@/components/CookieBanner";
import { UserPopupWarningModal } from "@/components/UserPopupWarningModal";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <CookieBanner />
        <UserPopupWarningModal />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default ClientProviders;
