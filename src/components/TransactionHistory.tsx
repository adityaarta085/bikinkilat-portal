'use client';

import React, { useEffect, useState } from 'react';
import { 
  History, 
  CheckCircle2, 
  RefreshCw, 
  QrCode, 
  Trash2, 
  XCircle, 
  Clock, 
  Copy, 
  Check, 
  X,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/lib/auth-context';
import { getOrCreateGuestId } from '@/lib/user-session';

export interface Transaction {
  id: string;
  package_name: string;
  raw_package_name?: string;
  amount_idr: number;
  tokens_added: number;
  status: string;
  created_at: string;
  payment_method?: string;
  qris_id?: string | null;
  qris_image_url?: string | null;
  checkout_url?: string | null;
}

interface TransactionHistoryProps {
  lastUpdated?: number;
}

export function TransactionHistory({ lastUpdated }: TransactionHistoryProps) {
  const { user, refreshTokens } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingTxId, setCancellingTxId] = useState<string | null>(null);
  const [activeQrisModal, setActiveQrisModal] = useState<Transaction | null>(null);
  const [modalCountdown, setModalCountdown] = useState<number>(900);
  const [hasCopiedModalAmount, setHasCopiedModalAmount] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const activeUid = user?.id || (typeof window !== 'undefined' ? getOrCreateGuestId() : '');
      const res = await fetch(`/api/transactions?userId=${encodeURIComponent(activeUid)}`);
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions || []);
      }
    } catch (e) {
      console.error('Failed to fetch transactions', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [lastUpdated, user?.id]);

  // Polling for QRIS modal if opened
  useEffect(() => {
    if (!activeQrisModal || !user?.id) return;

    setModalCountdown(900);
    const timer = setInterval(() => {
      setModalCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    const qrisIdToCheck = activeQrisModal.qris_id;
    let pollInterval: any = null;

    if (qrisIdToCheck) {
      pollInterval = setInterval(async () => {
        try {
          const endpoint = `/api/payment/qris/${qrisIdToCheck}/status?userId=${encodeURIComponent(user.id)}&txId=${activeQrisModal.id}`;
          const res = await fetch(endpoint);
          if (!res.ok) return;
          const result = await res.json();
          if (result.status === 'success' && result.data?.payment_status === 'paid') {
            clearInterval(pollInterval);
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
            });
            await refreshTokens();
            await fetchTransactions();
            setActiveQrisModal(null);
          }
        } catch (e) {}
      }, 3000);
    }

    return () => {
      clearInterval(timer);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [activeQrisModal, user?.id]);

  const handleCancelOrDelete = async (txId: string, action: 'cancel' | 'delete') => {
    if (!user?.id) return;
    const confirmPrompt = action === 'cancel'
      ? 'Apakah Anda yakin ingin membatalkan transaksi pembayaran QRIS ini?'
      : 'Apakah Anda yakin ingin menghapus transaksi ini dari riwayat?';

    if (!window.confirm(confirmPrompt)) return;

    setCancellingTxId(txId);
    setActionNotice(null);
    try {
      const res = await fetch('/api/transactions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: txId,
          userId: user.id,
          action,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice(data.message || (action === 'delete' ? 'Transaksi berhasil dihapus.' : 'Transaksi berhasil dibatalkan.'));
        setTimeout(() => setActionNotice(null), 5000);
        await fetchTransactions();
        if (activeQrisModal?.id === txId) {
          setActiveQrisModal(null);
        }
      } else {
        alert(data.error || 'Gagal memproses transaksi.');
      }
    } catch (e: any) {
      alert(e.message || 'Terjadi gangguan jaringan.');
    } finally {
      setCancellingTxId(null);
    }
  };

  const copyModalAmount = (amount: number | string) => {
    navigator.clipboard.writeText(amount.toString());
    setHasCopiedModalAmount(true);
    setTimeout(() => setHasCopiedModalAmount(false), 2000);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,23,42,0.02)] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/60 dark:border-indigo-800">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Riwayat Transaksi Dompet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tersinkronisasi otomatis dengan dompet akun Anda</p>
          </div>
        </div>
        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          title="Segarkan riwayat"
          aria-label="Segarkan riwayat"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {actionNotice && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between gap-2">
          <span>{actionNotice}</span>
          <button onClick={() => setActionNotice(null)} className="underline text-xs">Tutup</button>
        </div>
      )}

      {transactions.length === 0 ? (
        <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
          {loading ? 'Memuat data transaksi...' : 'Belum ada transaksi. Silakan coba isi token melalui kasir di atas.'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">Paket Transaksi</th>
                <th className="py-2.5 px-3">Nominal</th>
                <th className="py-2.5 px-3">Token</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {new Date(tx.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 px-3 text-slate-900 dark:text-white font-semibold">
                    {tx.package_name}
                  </td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-mono whitespace-nowrap">
                    Rp {tx.amount_idr?.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-3 text-amber-600 dark:text-amber-400 font-bold whitespace-nowrap">
                    +{tx.tokens_added}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      tx.status === 'paid' || tx.status === 'success' || tx.status === 'completed'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : tx.status === 'pending'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {tx.status === 'paid' || tx.status === 'success' || tx.status === 'completed' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Sukses</span>
                        </>
                      ) : tx.status === 'pending' ? (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>Menunggu Bayar</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>Dibatalkan</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    {tx.status === 'pending' ? (
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          type="button"
                          onClick={() => setActiveQrisModal(tx)}
                          className="px-2.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-xs transition flex items-center gap-1 min-h-[30px]"
                          title="Buka / Tampilkan QRIS"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Buka QRIS</span>
                        </button>

                        <button
                          type="button"
                          disabled={cancellingTxId === tx.id}
                          onClick={() => handleCancelOrDelete(tx.id, 'cancel')}
                          className="px-2 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-bold text-[11px] transition flex items-center gap-1 min-h-[30px] disabled:opacity-50"
                          title="Batalkan Transaksi Ini"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Batalkan</span>
                        </button>

                        <button
                          type="button"
                          disabled={cancellingTxId === tx.id}
                          onClick={() => handleCancelOrDelete(tx.id, 'delete')}
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/60 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition min-h-[30px] min-w-[30px] flex items-center justify-center disabled:opacity-50"
                          title="Hapus dari Riwayat"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : tx.status === 'cancelled' ? (
                      <div className="inline-flex items-center gap-1 justify-end">
                        <button
                          type="button"
                          disabled={cancellingTxId === tx.id}
                          onClick={() => handleCancelOrDelete(tx.id, 'delete')}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/60 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 font-bold text-[11px] transition flex items-center gap-1 min-h-[30px]"
                          title="Hapus dari Riwayat"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[11px] font-medium">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Active QRIS Display Modal */}
      {activeQrisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Pembayaran QRIS Resmi
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {activeQrisModal.package_name || 'Isi Ulang Token'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveQrisModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QRIS Image Frame */}
            <div className="flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              {activeQrisModal.qris_image_url || activeQrisModal.qris_id ? (
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 max-w-[240px]">
                  <img
                    src={activeQrisModal.qris_image_url || `https://api.qrispy.id/api/public/qris/${activeQrisModal.qris_id}/image`}
                    alt="Kode QRIS Pembayaran"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 rounded-2xl bg-white flex flex-col items-center justify-center border border-slate-200 p-4 text-center">
                  <QrCode className="w-24 h-24 text-slate-800 mb-2" />
                  <span className="text-[10px] text-slate-500 font-semibold">QRIS Dinamis Terdaftar</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                <Clock className="w-3.5 h-3.5" />
                <span>Sisa Waktu: {formatTimer(modalCountdown)}</span>
              </div>
            </div>

            {/* Nominal Card */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Nominal Transfer Persis:
                </span>
                <span className="text-xl font-black text-indigo-700 dark:text-indigo-300 font-mono">
                  Rp {(activeQrisModal.amount_idr || 0).toLocaleString('id-ID')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => copyModalAmount(activeQrisModal.amount_idr || 0)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 transition hover:bg-indigo-50"
              >
                {hasCopiedModalAmount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{hasCopiedModalAmount ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>

            {/* Polling live feedback */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 py-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              <span>Mengecek pembayaran otomatis setiap 3 detik...</span>
            </div>

            {/* Action buttons inside modal */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={cancellingTxId === activeQrisModal.id}
                onClick={() => handleCancelOrDelete(activeQrisModal.id, 'cancel')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition disabled:opacity-50 flex items-center gap-1.5 min-h-[40px]"
              >
                <XCircle className="w-4 h-4" />
                <span>Batalkan Transaksi Ini</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveQrisModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition min-h-[40px]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
