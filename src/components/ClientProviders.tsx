"use client";

import React from "react";
import { ThemeProvider } from "@/lib/theme-context";
import { AuthProvider } from "@/lib/auth-context";
import CookieBanner from "@/components/CookieBanner";
import { UserPopupWarningModal } from "@/components/UserPopupWarningModal";
import { SupportChatWidget } from "@/components/SupportChatWidget";
import { AuthModal } from "@/components/AuthModal";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <AuthModal />
        <CookieBanner />
        <UserPopupWarningModal />
        <SupportChatWidget />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default ClientProviders;
