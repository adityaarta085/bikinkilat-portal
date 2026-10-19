'use client';

import React, { useEffect, useState } from 'react';
import { History, CheckCircle2, Clock, RefreshCw, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getOrCreateGuestId } from '@/lib/user-session';

export interface Transaction {
  id: string;
  package_name: string;
  amount_idr: number;
  tokens_added: number;
  status: string;
  created_at: string;
  payment_method?: string;
}

interface TransactionHistoryProps {
  lastUpdated: number;
}

export function TransactionHistory({ lastUpdated }: TransactionHistoryProps) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [lastUpdated]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Riwayat Transaksi Dompet</h3>
            <p className="text-xs text-slate-500">Tersinkronisasi otomatis dengan dompet akun Anda</p>
          </div>
        </div>
        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="p-2 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors"
          title="Segarkan riwayat"
          aria-label="Segarkan riwayat"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="py-8 text-center text-slate-500 text-sm">
          {loading ? 'Memuat data transaksi...' : 'Belum ada transaksi. Silakan coba isi token melalui kasir di atas.'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">Paket Transaksi</th>
                <th className="py-2.5 px-3">Nominal</th>
                <th className="py-2.5 px-3">Token</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 text-slate-500">
                    {new Date(tx.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 px-3 text-slate-900 font-semibold">
                    {tx.package_name}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    Rp {tx.amount_idr?.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-bold">
                    +{tx.tokens_added}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Berhasil
                    </span>
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
