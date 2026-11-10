'use client';

import React, { useEffect, useState } from 'react';
import { 
  History, 
  CheckCircle2, 
  RefreshCw, 
  Trash2, 
  XCircle, 
  Clock, 
  Coins
} from 'lucide-react';
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
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingTxId, setCancellingTxId] = useState<string | null>(null);
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
      } else {
        alert(data.error || 'Gagal memproses transaksi.');
      }
    } catch (e: any) {
      alert(e.message || 'Terjadi gangguan jaringan.');
    } finally {
      setCancellingTxId(null);
    }
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
          {loading ? 'Memuat data alokasi...' : 'Belum ada riwayat transaksi. Seluruh layanan kini bebas biaya (Rp 0) dengan 20 kuota gratis harian.'}
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
    </div>
  );
}

export default TransactionHistory;
