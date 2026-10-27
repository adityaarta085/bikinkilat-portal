'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Key,
  Mail,
  ChevronDown,
  ChevronUp,
  QrCode,
  Copy,
  Check,
  AlertTriangle,
  RefreshCw,
  X,
  Trash2,
  CheckCircle2,
  Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AccountSecuritySectionProps {
  user: User;
  onAccountDeleted: () => void;
}

export function AccountSecuritySection({ user, onAccountDeleted }: AccountSecuritySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [is2FaEnabled, setIs2FaEnabled] = useState(false);
  const [isLoading2FaStatus, setIsLoading2FaStatus] = useState(true);

  // Modal States
  const [showSetup2FaModal, setShowSetup2FaModal] = useState(false);
  const [showDisable2FaModal, setShowDisable2FaModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeletedNotice, setShowDeletedNotice] = useState(false);

  // Setup 2FA Data
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [totpSecret, setTotpSecret] = useState<string>('');
  const [setupCode, setSetupCode] = useState<string>('');
  const [disableCode, setDisableCode] = useState<string>('');
  const [isSubmitting2Fa, setIsSubmitting2Fa] = useState(false);
  const [errorMessage2Fa, setErrorMessage2Fa] = useState<string | null>(null);
  const [copiedSecret, setCopiedSecret] = useState(false);

  // Password Update Data
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Email Update Data
  const [newEmail, setNewEmail] = useState('');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailMsg, setEmailMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Delete Account Confirmation
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Fetch 2FA Status on Mount
  useEffect(() => {
    async function load2FaStatus() {
      try {
        setIsLoading2FaStatus(true);
        const res = await fetch(`/api/user/security?userId=${encodeURIComponent(user.id)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setIs2FaEnabled(!!data.twoFactorEnabled);
          }
        }
      } catch (err) {
        console.warn('Failed loading 2FA status:', err);
      } finally {
        setIsLoading2FaStatus(false);
      }
    }

    if (user?.id) {
      load2FaStatus();
    }
  }, [user?.id]);

  // Handle Open 2FA Setup
  const handleOpenSetup2Fa = async () => {
    setErrorMessage2Fa(null);
    setSetupCode('');
    setIsSubmitting2Fa(true);
    setShowSetup2FaModal(true);

    try {
      const res = await fetch('/api/user/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'setup_2fa',
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTotpSecret(data.secret);
        setQrCodeUrl(data.qrDataUrl);
      } else {
        setErrorMessage2Fa(data.message || 'Gagal memuat QR Code 2FA');
      }
    } catch (err: any) {
      setErrorMessage2Fa(err?.message || 'Gagal terhubung ke server');
    } finally {
      setIsSubmitting2Fa(false);
    }
  };

  // Verify and Activate 2FA
  const handleVerifyAndEnable2Fa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupCode || setupCode.trim().length !== 6) {
      setErrorMessage2Fa('Masukkan 6 digit angka dari aplikasi autentikator.');
      return;
    }

    setIsSubmitting2Fa(true);
    setErrorMessage2Fa(null);

    try {
      const res = await fetch('/api/user/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_and_enable_2fa',
          userId: user.id,
          userEmail: user.email,
          secret: totpSecret,
          token: setupCode.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIs2FaEnabled(true);
        setShowSetup2FaModal(false);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setErrorMessage2Fa(data.message || 'Kode verifikasi tidak sesuai.');
      }
    } catch (err: any) {
      setErrorMessage2Fa(err?.message || 'Terjadi kesalahan sistem.');
    } finally {
      setIsSubmitting2Fa(false);
    }
  };

  // Disable 2FA
  const handleDisable2Fa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disableCode || disableCode.trim().length !== 6) {
      setErrorMessage2Fa('Masukkan 6 digit kode dari aplikasi autentikator Anda.');
      return;
    }

    setIsSubmitting2Fa(true);
    setErrorMessage2Fa(null);

    try {
      const res = await fetch('/api/user/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'disable_2fa',
          userId: user.id,
          token: disableCode.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIs2FaEnabled(false);
        setShowDisable2FaModal(false);
        setDisableCode('');
      } else {
        setErrorMessage2Fa(data.message || 'Gagal menonaktifkan 2FA.');
      }
    } catch (err: any) {
      setErrorMessage2Fa(err?.message || 'Terjadi kesalahan sistem.');
    } finally {
      setIsSubmitting2Fa(false);
    }
  };

  // Handle Copy Secret Key
  const handleCopySecret = () => {
    if (totpSecret) {
      navigator.clipboard.writeText(totpSecret);
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    }
  };

  // Handle Update Password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Kata sandi minimal 6 karakter.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Konfirmasi kata sandi tidak cocok.' });
      return;
    }

    setIsSubmittingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setPasswordMsg({ type: 'error', text: error.message || 'Gagal memperbarui kata sandi.' });
      } else {
        setPasswordMsg({ type: 'success', text: 'Kata sandi berhasil diperbarui!' });
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setShowPasswordModal(false), 1800);
      }
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err?.message || 'Terjadi gangguan jaringan.' });
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  // Handle Update Email
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg(null);

    const clean = newEmail.trim().toLowerCase();
    if (!clean.endsWith('@gmail.com')) {
      setEmailMsg({ type: 'error', text: 'Hanya alamat email @gmail.com yang didukung.' });
      return;
    }

    setIsSubmittingEmail(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: clean,
      });

      if (error) {
        setEmailMsg({ type: 'error', text: error.message || 'Gagal mengirim konfirmasi email.' });
      } else {
        setEmailMsg({
          type: 'success',
          text: 'Tautan konfirmasi telah dikirim ke email baru Anda. Silakan periksa kotak masuk untuk menyelesaikan perubahan.',
        });
        setNewEmail('');
        setTimeout(() => setShowEmailModal(false), 3000);
      }
    } catch (err: any) {
      setEmailMsg({ type: 'error', text: err?.message || 'Terjadi kesalahan sistem.' });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  // Handle Delete Account Request
  const handleDeleteAccount = async () => {
    if (deleteConfirmationText !== 'HAPUS') {
      setDeleteError('Ketik "HAPUS" dengan huruf kapital untuk mengonfirmasi.');
      return;
    }

    setIsSubmittingDelete(true);
    setDeleteError(null);

    try {
      const res = await fetch('/api/user/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request_deletion',
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowDeleteModal(false);
        // Tampilkan notifikasi akun terhapus ke pengguna
        setShowDeletedNotice(true);
        // Otomatis keluar setelah 3 detik
        setTimeout(() => {
          onAccountDeleted();
        }, 3200);
      } else {
        setDeleteError(data.message || 'Gagal memproses penghapusan akun.');
        setIsSubmittingDelete(false);
      }
    } catch (err: any) {
      setDeleteError(err?.message || 'Terjadi kesalahan jaringan.');
      setIsSubmittingDelete(false);
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(15,23,42,0.02)] transition-colors">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
              <Shield className="w-5 h-5 fill-blue-600 dark:fill-blue-400 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Keamanan Akun & Otentikasi
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Kelola 2FA (MFA), kata sandi, dan alamat email akun
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={isExpanded ? 'Tutup Bagian' : 'Buka Bagian'}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-6 pt-6">
            {/* Card 1: 2FA (TOTP) - Sesuai Mockup Gambar Pengguna */}
            <div className="rounded-2xl p-5 sm:p-6 border border-amber-300 dark:border-amber-700/60 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      Verifikasi Dua Langkah (2FA - TOTP)
                    </h3>
                    {isLoading2FaStatus ? (
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Memeriksa...
                      </span>
                    ) : is2FaEnabled ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-black uppercase tracking-wider">
                        AKTIF
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/80 dark:text-amber-300 border border-amber-200 dark:border-amber-700 text-[10px] font-black uppercase tracking-wider">
                        BELUM AKTIF
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    Tingkatkan keamanan akun dengan mewajibkan kode 6 digit dari Google Authenticator saat masuk.
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto flex justify-end">
                {is2FaEnabled ? (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage2Fa(null);
                      setDisableCode('');
                      setShowDisable2FaModal(true);
                    }}
                    className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/60 text-slate-700 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-300 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>Nonaktifkan 2FA</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleOpenSetup2Fa}
                    className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4 fill-white" />
                    <span>Aktifkan 2FA</span>
                  </button>
                )}
              </div>
            </div>

            {/* Grid Baris 2: Kata Sandi & Alamat Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 2: Kata Sandi Akun */}
              <div className="rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Kata Sandi Akun
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Perbarui kata sandi secara berkala untuk menjaga akun tetap aman.
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setPasswordMsg(null);
                      setNewPassword('');
                      setConfirmPassword('');
                      setShowPasswordModal(true);
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition flex items-center gap-1.5"
                  >
                    <span>Ubah Kata Sandi</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Alamat Email */}
              <div className="rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Alamat Email
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Saat ini: <span className="font-semibold text-slate-700 dark:text-slate-300">{user.email}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEmailMsg(null);
                      setNewEmail('');
                      setShowEmailModal(true);
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition flex items-center gap-1.5"
                  >
                    <span>Ganti Email Akun</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: Zona Bahaya / Hapus Akun */}
            <div className="rounded-2xl p-5 border border-rose-200/80 dark:border-rose-950/60 bg-rose-50/30 dark:bg-rose-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-rose-900 dark:text-rose-200">
                    Hapus Akun Pengguna
                  </h3>
                  <p className="text-xs text-rose-700/80 dark:text-rose-300/70 mt-0.5 leading-relaxed">
                    Hapus akun Anda secara permanen. Seluruh sesi login perangkat Anda akan segera diakhiri.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmationText('');
                  setDeleteError(null);
                  setShowDeleteModal(true);
                }}
                className="shrink-0 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-xs font-bold transition shadow-2xs"
              >
                Hapus Akun Ini...
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* MODAL 1: SETUP 2FA (QR CODE + 6-DIGIT VERIFICATION)       */}
      {/* ========================================================= */}
      {showSetup2FaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-blue-600 fill-blue-600" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Aktifkan Verifikasi Dua Langkah (2FA)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSetup2FaModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage2Fa && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage2Fa}</span>
              </div>
            )}

            {/* QR Code Frame */}
            <div className="flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
              {qrCodeUrl ? (
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
                  <img src={qrCodeUrl} alt="QR Code 2FA" className="w-48 h-48 object-contain rounded-lg" />
                </div>
              ) : (
                <div className="w-48 h-48 rounded-2xl bg-white flex flex-col items-center justify-center border border-slate-200 p-4">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                  <span className="text-xs text-slate-500 font-semibold">Menyiapkan Kunci TOTP...</span>
                </div>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
                Pindai kode QR di atas menggunakan aplikasi <strong>Google Authenticator</strong> atau <strong>Microsoft Authenticator</strong> di ponsel Anda.
              </p>

              {/* Manual Secret Key */}
              {totpSecret && (
                <div className="w-full pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Atau Masukkan Kunci Manual:
                  </span>
                  <div className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold tracking-widest truncate">
                      {totpSecret}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySecret}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1 shrink-0"
                    >
                      {copiedSecret ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSecret ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6-Digit Code Input Form */}
            <form onSubmit={handleVerifyAndEnable2Fa} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Masukkan 6-Digit Kode Verifikasi:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Contoh: 123456"
                  value={setupCode}
                  onChange={(e) => setSetupCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-mono font-black text-xl tracking-widest text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSetup2FaModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting2Fa || setupCode.length !== 6}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting2Fa ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi...</span>
                    </>
                  ) : (
                    <span>Verifikasi & Aktifkan 2FA</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: NONAKTIFKAN 2FA                                  */}
      {/* ========================================================= */}
      {showDisable2FaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-600">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Nonaktifkan 2FA (TOTP)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDisable2FaModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMessage2Fa && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage2Fa}</span>
              </div>
            )}

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Untuk alasan keamanan, masukkan 6 digit kode dari aplikasi Google Authenticator Anda saat ini untuk menonaktifkan fitur verifikasi dua langkah.
            </p>

            <form onSubmit={handleDisable2Fa} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Kode 6-Digit Saat Ini:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={disableCode}
                  onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-mono font-black text-xl tracking-widest text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDisable2FaModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting2Fa || disableCode.length !== 6}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting2Fa ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <span>Nonaktifkan Sekarang</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: UBAH KATA SANDI                                  */}
      {/* ========================================================= */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-blue-600">
                <Key className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Ubah Kata Sandi Akun
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {passwordMsg && (
              <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                passwordMsg.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
              }`}>
                {passwordMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Kata Sandi Baru (Min. 6 Karakter):
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Konfirmasi Kata Sandi Baru:
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPassword || !newPassword || !confirmPassword}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmittingPassword ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>Simpan Kata Sandi</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: GANTI EMAIL AKUN                                 */}
      {/* ========================================================= */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-blue-600">
                <Mail className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Ganti Alamat Email Akun
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {emailMsg && (
              <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                emailMsg.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
              }`}>
                {emailMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />}
                <span>{emailMsg.text}</span>
              </div>
            )}

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Email saat ini: <span className="font-semibold text-slate-800 dark:text-slate-200">{user.email}</span>. Tautan verifikasi akan dikirimkan ke alamat email baru untuk mengonfirmasi kepemilikan akun.
            </p>

            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Alamat Email Baru (@gmail.com):
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="namaanda@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEmail || !newEmail}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmittingEmail ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Mengirim Tautan...</span>
                    </>
                  ) : (
                    <span>Kirim Tautan Konfirmasi</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: HAPUS AKUN (KONFIRMASI PENGGUNA)                 */}
      {/* ========================================================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-200 dark:border-rose-900/60 p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-base font-black text-rose-600 dark:text-rose-400">
                  Konfirmasi Hapus Akun
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {deleteError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{deleteError}</span>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 leading-relaxed space-y-2">
              <p className="font-bold">
                ⚠️ Peringatan: Tindakan ini permanen dan tidak dapat dibatalkan.
              </p>
              <p>
                Seluruh data profil, token yang tersisa, serta riwayat pekerjaan dokumen Anda akan segera dihapus dan sesi Anda akan diakhiri.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Ketik <span className="text-rose-600 font-mono">HAPUS</span> untuk konfirmasi:
              </label>
              <input
                type="text"
                placeholder="HAPUS"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isSubmittingDelete || deleteConfirmationText !== 'HAPUS'}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmittingDelete ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <span>Hapus Akun Saya</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 6: PEMBERITAHUAN SUKSES HAPUS AKUN                  */}
      {/* ========================================================= */}
      {showDeletedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Akun Anda Berhasil Dihapus
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              Seluruh data sesi Anda telah dibersihkan. Terima kasih telah menggunakan BikinKilat. Mengalihkan Anda ke beranda...
            </p>

            <div className="pt-2">
              <div className="w-8 h-8 mx-auto border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
