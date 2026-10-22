'use client';

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  Info, 
  Check, 
  Coins, 
  ExternalLink,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/lib/auth-context';
import { NotificationItem } from './NotificationCenter';

/**
 * Helper to check if a popup notification has already been shown to this user/browser.
 * Each popup notification should ONLY BE SHOWN ONCE.
 */
function isPopupAlreadyShown(id: string): boolean {
  if (typeof window === 'undefined' || !id) return false;
  try {
    const shown: string[] = JSON.parse(localStorage.getItem('bk_shown_popup_ids') || '[]');
    const dismissed: string[] = JSON.parse(localStorage.getItem('bk_dismissed_popups') || '[]');
    return shown.includes(id) || dismissed.includes(id);
  } catch {
    return false;
  }
}

/**
 * Record that a popup notification has been displayed once in this browser.
 */
function markPopupAsShown(id: string) {
  if (typeof window === 'undefined' || !id) return;
  try {
    const shown: string[] = JSON.parse(localStorage.getItem('bk_shown_popup_ids') || '[]');
    if (!shown.includes(id)) {
      shown.push(id);
      localStorage.setItem('bk_shown_popup_ids', JSON.stringify(shown));
    }
  } catch (e) {
    console.warn('Error marking popup as shown:', e);
  }
}

export function UserPopupWarningModal() {
  const { user, refreshTokens } = useAuth();
  const [activePopup, setActivePopup] = useState<NotificationItem | null>(null);
  const [isDismissing, setIsDismissing] = useState(false);

  // Check for pending popup on load (supports authenticated & guest)
  const checkPendingPopup = async () => {
    try {
      const url = user?.id
        ? `/api/notifications?userId=${encodeURIComponent(user.id)}&_t=${Date.now()}`
        : `/api/notifications?_t=${Date.now()}`;

      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      if (data.success && data.pendingPopup) {
        const popup = data.pendingPopup as NotificationItem;

        // CRITICAL: If this popup was ALREADY shown or dismissed -> DO NOT SHOW AGAIN!
        if (isPopupAlreadyShown(popup.id)) {
          return;
        }

        // Mark as shown immediately so even an instant page refresh will not show it again
        markPopupAsShown(popup.id);
        setActivePopup(popup);

        // If it's a token gift or success, trigger confetti
        if (popup.type === 'success' || (popup.tokens_granted && popup.tokens_granted > 0)) {
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          } catch (e) {}
        }
      }
    } catch (err) {
      console.warn('Error checking pending popup:', err);
    }
  };

  // 1. Initial check on mount
  useEffect(() => {
    const t = setTimeout(checkPendingPopup, 800);
    return () => clearTimeout(t);
  }, [user?.id]);

  // 2. Realtime listener for live dispatched popup notifications (e.g. from WebSocket INSERT)
  useEffect(() => {
    const handleLivePopup = (e: any) => {
      if (e.detail && e.detail.id) {
        const popup = e.detail as NotificationItem;
        // Check if already shown once
        if (isPopupAlreadyShown(popup.id)) return;

        // Mark as shown immediately
        markPopupAsShown(popup.id);
        setActivePopup(popup);

        if (popup.type === 'success' || (popup.tokens_granted && popup.tokens_granted > 0)) {
          try {
            confetti({ particleCount: 80, spread: 65, origin: { y: 0.6 } });
          } catch (err) {}
        }
      }
    };

    window.addEventListener('bk:new_popup_notification', handleLivePopup);
    return () => window.removeEventListener('bk:new_popup_notification', handleLivePopup);
  }, []);

  // Handle dismiss / acknowledge
  const handleAcknowledge = async () => {
    if (!activePopup) return;
    const popupId = activePopup.id;

    // Immediately record into dismissed lists so it never shows again
    markPopupAsShown(popupId);
    if (typeof window !== 'undefined') {
      try {
        const dismissedGuests: string[] = JSON.parse(localStorage.getItem('bk_dismissed_popups') || '[]');
        if (!dismissedGuests.includes(popupId)) {
          dismissedGuests.push(popupId);
          localStorage.setItem('bk_dismissed_popups', JSON.stringify(dismissedGuests));
        }
      } catch (e) {}
    }

    setIsDismissing(true);
    try {
      if (user?.id) {
        await fetch('/api/notifications/read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            notificationId: popupId,
            dismissPopup: true,
          }),
        });
      }

      // Refresh user tokens if any bonus was granted
      refreshTokens();
      setActivePopup(null);
    } catch (err) {
      console.warn('Error dismissing popup:', err);
      setActivePopup(null);
    } finally {
      setIsDismissing(false);
    }
  };

  if (!activePopup) return null;

  const isUrgent = activePopup.type === 'urgent';
  const isWarning = activePopup.type === 'warning';
  const isSuccess = activePopup.type === 'success';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6"
      >
        {/* Top-Right Quick Close Button */}
        <button
          type="button"
          onClick={handleAcknowledge}
          aria-label="Tutup notifikasi"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Top Glow */}
        {isUrgent ? (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-600 to-rose-500" />
        ) : isWarning ? (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />
        ) : isSuccess ? (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400" />
        ) : (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
        )}

        {/* Modal Header */}
        <div className="flex items-start gap-4 pr-6">
          <div className="shrink-0">
            {isUrgent ? (
              <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-inner">
                <ShieldAlert className="w-7 h-7" />
              </div>
            ) : isWarning ? (
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
                <AlertTriangle className="w-7 h-7" />
              </div>
            ) : isSuccess ? (
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                <Sparkles className="w-7 h-7" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
                <Info className="w-7 h-7" />
              </div>
            )}
          </div>

          <div className="space-y-1 flex-1">
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block ${
                isUrgent
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                  : isWarning
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                  : isSuccess
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
              }`}
            >
              {isUrgent
                ? 'Peringatan Teguran Penting'
                : isWarning
                ? 'Pemberitahuan Sistem'
                : isSuccess
                ? 'Hadiah & Bonus Token'
                : 'Informasi Resmi'}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {activePopup.title}
            </h3>
          </div>
        </div>

        {/* Message Body */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
          <p>{activePopup.message}</p>

          {/* Token Gift Highlight if available */}
          {activePopup.tokens_granted && activePopup.tokens_granted > 0 ? (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-emerald-800 dark:text-emerald-200 font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Bonus Masuk ke Saldo:
              </span>
              <strong className="text-emerald-600 dark:text-emerald-300 text-sm">
                +{activePopup.tokens_granted} Token
              </strong>
            </div>
          ) : null}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          {activePopup.action_url && (
            <a
              href={activePopup.action_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <span>Buka Tautan Terkait</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={handleAcknowledge}
            disabled={isDismissing}
            className={`w-full sm:w-auto py-3.5 px-6 rounded-2xl text-xs font-extrabold shadow-lg transition active:scale-98 flex items-center justify-center gap-2 ${
              isUrgent
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : isWarning
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Saya Mengerti &amp; Konfirmasi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
