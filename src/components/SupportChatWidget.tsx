'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  MessageSquare,
  Headphones,
  X,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Plus
} from 'lucide-react';

interface SupportMessage {
  id: string;
  ticket_id: string;
  sender_type: 'user' | 'admin' | 'system';
  sender_name: string;
  message: string;
  created_at: string;
}

interface SupportTicket {
  id: string;
  ticket_number: string;
  user_id?: string | null;
  user_name: string;
  user_email?: string | null;
  user_phone?: string | null;
  category: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: string;
  created_at: string;
  updated_at: string;
  messages?: SupportMessage[];
}

const CATEGORIES = [
  'Kendala Saldo & Top-up QRIS',
  'Pertanyaan Layanan & Fitur',
  'Kendala Teknis / Bug Dokumen',
  'Bantuan Akun & Akses Masuk',
  'Kerjasama & Kebutuhan Khusus',
];

export function SupportChatWidget() {
  const { user, profile } = useAuth();
  const isLoggedIn = !!user;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'lookup'>('chat');

  // Form State
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [subject, setSubject] = useState('');
  const [initialMessage, setInitialMessage] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  // Active Ticket State
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasCopiedTicket, setHasCopiedTicket] = useState(false);

  // Lookup State
  const [lookupTicketNumber, setLookupTicketNumber] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [myTickets, setMyTickets] = useState<SupportTicket[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pre-fill user data when logged in
  useEffect(() => {
    if (user || profile) {
      const displayName = profile?.name || (user?.user_metadata?.full_name as string) || (user?.user_metadata?.name as string) || (user?.email ? user.email.split('@')[0] : '');
      if (displayName && !userName) setUserName(displayName);
      if (user?.email && !userEmail) setUserEmail(user.email);
    }
  }, [user, profile]);

  // Load active ticket from localStorage on mount
  useEffect(() => {
    const savedTicketNum = localStorage.getItem('bk_active_support_ticket');
    if (savedTicketNum) {
      fetchTicketByNumber(savedTicketNum);
    }
  }, []);

  // Listen for hash #bantuan or URL query ?ticket=...
  useEffect(() => {
    const checkHashAndQuery = () => {
      const url = new URL(window.location.href);
      const ticketParam = url.searchParams.get('ticket');
      if (window.location.hash === '#bantuan' || ticketParam) {
        setIsOpen(true);
        if (ticketParam) {
          fetchTicketByNumber(ticketParam);
        }
      }
    };

    checkHashAndQuery();
    window.addEventListener('hashchange', checkHashAndQuery);
    return () => window.removeEventListener('hashchange', checkHashAndQuery);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen && activeTicket) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTicket?.messages, isOpen]);

  // Polling for updates every 6 seconds when ticket is active and modal is open
  useEffect(() => {
    if (!isOpen || !activeTicket) return;

    const interval = setInterval(() => {
      fetchTicketByNumber(activeTicket.ticket_number, true);
    }, 6000);

    return () => clearInterval(interval);
  }, [isOpen, activeTicket?.ticket_number]);

  // Fetch ticket by ticket number
  const fetchTicketByNumber = async (ticketNum: string, silent = false) => {
    if (!silent) setIsRefreshing(true);
    try {
      const res = await fetch(`/api/support/tickets?ticketNumber=${encodeURIComponent(ticketNum.trim())}`);
      const data = await res.json();
      if (data.success && data.ticket) {
        setActiveTicket(data.ticket);
        localStorage.setItem('bk_active_support_ticket', data.ticket.ticket_number);
        setLookupError(null);
      } else if (!silent) {
        setLookupError('Nomor tiket tidak ditemukan. Pastikan format benar.');
      }
    } catch {
      if (!silent) setLookupError('Gagal memuat tiket bantuan.');
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  };

  // Fetch user's list of tickets
  const fetchMyTickets = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/support/tickets?userId=${encodeURIComponent(user.id)}`);
      const data = await res.json();
      if (data.success && data.tickets) {
        setMyTickets(data.tickets);
      }
    } catch (err) {
      console.warn('Failed to load user tickets:', err);
    }
  };

  useEffect(() => {
    if (isLoggedIn && user?.id && activeTab === 'lookup') {
      fetchMyTickets();
    }
  }, [activeTab, isLoggedIn, user?.id]);

  // Handle new ticket submission
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !initialMessage.trim()) return;

    setIsSubmittingTicket(true);
    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id || null,
          user_name: userName.trim(),
          user_email: userEmail.trim() || null,
          user_phone: userPhone.trim() || null,
          category,
          subject: subject.trim() || `${category} - ${userName.trim()}`,
          message: initialMessage.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.ticket) {
        const fullTicket: SupportTicket = {
          ...data.ticket,
          messages: [data.message],
        };
        setActiveTicket(fullTicket);
        localStorage.setItem('bk_active_support_ticket', data.ticket.ticket_number);
        setInitialMessage('');
        setSubject('');
      } else {
        alert(data.error || 'Gagal mengirim tiket bantuan.');
      }
    } catch {
      alert('Terjadi kesalahan koneksi saat mengirim tiket.');
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  // Handle send follow-up reply
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyMessage.trim() || isSendingReply) return;

    const messageText = replyMessage.trim();
    setReplyMessage('');
    setIsSendingReply(true);

    try {
      const res = await fetch('/api/support/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket_id: activeTicket.id,
          sender_name: activeTicket.user_name || 'Pengguna',
          message: messageText,
        }),
      });

      const data = await res.json();
      if (data.success && data.message) {
        setActiveTicket((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            status: 'open',
            messages: [...(prev.messages || []), data.message],
          };
        });
      } else {
        setReplyMessage(messageText);
        alert(data.error || 'Gagal mengirim pesan balasan.');
      }
    } catch {
      setReplyMessage(messageText);
      alert('Gagal mengirim pesan balasan.');
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleCopyTicketNumber = () => {
    if (!activeTicket) return;
    navigator.clipboard.writeText(activeTicket.ticket_number);
    setHasCopiedTicket(true);
    setTimeout(() => setHasCopiedTicket(false), 2000);
  };

  const handleResetActiveTicket = () => {
    setActiveTicket(null);
    localStorage.removeItem('bk_active_support_ticket');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return {
          label: 'Menunggu CS',
          cls: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800',
        };
      case 'in_progress':
        return {
          label: 'Sedang Ditangani',
          cls: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800',
        };
      case 'resolved':
      case 'closed':
        return {
          label: 'Dibalas / Selesai',
          cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
        };
      default:
        return {
          label: status,
          cls: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300',
        };
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 transition-all duration-300 active:scale-95 border border-indigo-400/30 min-h-[44px]"
          aria-label="Pusat Bantuan & Live CS"
        >
          <div className="relative">
            <Headphones className="w-4 h-4 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-900 animate-pulse" />
          </div>
          <span className="hidden sm:inline font-black tracking-wide">Bantuan &amp; Live CS</span>
          <span className="sm:hidden font-black">Bantuan</span>
        </button>
      </div>

      {/* Support Chat Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full sm:max-w-md h-[88vh] sm:h-[620px] max-h-[92vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-250"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
                  <Headphones className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-white">Layanan Bantuan BikinKilat</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-300">Respons CS Terverifikasi • Nomor Tiket Resmi</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {activeTicket && (
                  <button
                    type="button"
                    onClick={() => fetchTicketByNumber(activeTicket.ticket_number)}
                    disabled={isRefreshing}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Segarkan Obrolan"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Tutup Jendela Bantuan"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 px-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{activeTicket ? 'Obrolan Tiket Aktif' : 'Buat Tiket Bantuan'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('lookup')}
                className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'lookup'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Lacak &amp; Riwayat Tiket</span>
              </button>
            </div>

            {/* TAB 1: CHAT & TICKET */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                {!activeTicket ? (
                  /* Form to Create New Ticket */
                  <form onSubmit={handleCreateTicket} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                    <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 space-y-1">
                      <p className="font-extrabold text-indigo-900 dark:text-indigo-300">
                        Punya kendala token, pembayaran, atau fitur?
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                        Kirimkan pesan Anda. Anda akan mendapatkan <strong>Nomor Tiket</strong> otomatis yang langsung dipantau oleh tim Customer Support BikinKilat.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300 block">Kategori Kendala:</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300 block">Nama Lengkap:</label>
                        <input
                          type="text"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Nama Anda"
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300 block">WhatsApp / Email:</label>
                        <input
                          type="text"
                          value={userPhone || userEmail}
                          onChange={(e) => {
                            setUserPhone(e.target.value);
                            setUserEmail(e.target.value);
                          }}
                          placeholder="0812... / email@..."
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300 block">Subjek Permasalahan:</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Contoh: Konfirmasi Saldo Token Top-Up QRIS"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300 block">Pesan / Detail Masalah:</label>
                      <textarea
                        required
                        rows={4}
                        value={initialMessage}
                        onChange={(e) => setInitialMessage(e.target.value)}
                        placeholder="Jelaskan kendala Anda secara rinci agar admin dapat memberikan solusi tercepat..."
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingTicket || !userName.trim() || !initialMessage.trim()}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmittingTicket ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Menerbitkan Tiket Bantuan...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Kirim Tiket &amp; Mulai Obrolan</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Active Live Chat Thread */
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Active Ticket Banner */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shrink-0">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyTicketNumber}
                          className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1 hover:bg-indigo-100 transition-colors"
                          title="Klik untuk salin nomor tiket"
                        >
                          <span>#{activeTicket.ticket_number}</span>
                          {hasCopiedTicket ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-400" />
                          )}
                        </button>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(activeTicket.status).cls}`}>
                          {getStatusBadge(activeTicket.status).label}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleResetActiveTicket}
                        className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                        title="Buat tiket baru"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Tiket Baru</span>
                      </button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-100/50 dark:bg-slate-950/40">
                      <div className="text-center my-2">
                        <span className="text-[10px] font-semibold text-slate-400 px-3 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800">
                          {activeTicket.category} • Dibuat {new Date(activeTicket.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {(activeTicket.messages || []).map((msg) => {
                        const isAdmin = msg.sender_type === 'admin';
                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isAdmin ? 'items-start' : 'items-end'}`}
                          >
                            <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px]">
                              {isAdmin ? (
                                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                  <span>CS BikinKilat</span>
                                </span>
                              ) : (
                                <span className="font-semibold text-slate-500 dark:text-slate-400">
                                  {msg.sender_name || 'Anda'}
                                </span>
                              )}
                              <span className="text-slate-400">
                                {new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div
                              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                                isAdmin
                                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-slate-100 rounded-tl-xs shadow-xs'
                                  : 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                              }`}
                            >
                              <p className="whitespace-pre-line text-xs">{msg.message}</p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input Bar */}
                    <form onSubmit={handleSendReply} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
                      <input
                        type="text"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Ketik balasan Anda..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isSendingReply || !replyMessage.trim()}
                        className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition disabled:opacity-50"
                        title="Kirim pesan"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: LOOKUP & HISTORY */}
            {activeTab === 'lookup' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                <div className="space-y-2">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Lacak Status Tiket Bantuan</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                    Masukkan nomor tiket resmi (misal: <code>BK-7A9B1C</code>) yang Anda dapatkan saat mengajukan pesan.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={lookupTicketNumber}
                      onChange={(e) => setLookupTicketNumber(e.target.value.toUpperCase())}
                      placeholder="Contoh: BK-ABC123"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono uppercase text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => fetchTicketByNumber(lookupTicketNumber)}
                      disabled={isLookingUp || !lookupTicketNumber.trim()}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition disabled:opacity-50"
                    >
                      Lacak
                    </button>
                  </div>
                  {lookupError && (
                    <p className="text-rose-500 text-[11px] font-semibold">{lookupError}</p>
                  )}
                </div>

                {/* My Tickets List if Logged In */}
                {isLoggedIn && myTickets.length > 0 && (
                  <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <h5 className="font-bold text-slate-900 dark:text-white text-xs">Riwayat Tiket Saya ({myTickets.length})</h5>
                    <div className="space-y-2">
                      {myTickets.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            fetchTicketByNumber(t.ticket_number);
                            setActiveTab('chat');
                          }}
                          className="w-full text-left p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-indigo-500 transition-all flex items-center justify-between"
                        >
                          <div className="space-y-0.5 truncate max-w-[240px]">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                                #{t.ticket_number}
                              </span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${getStatusBadge(t.status).cls}`}>
                                {getStatusBadge(t.status).label}
                              </span>
                            </div>
                            <p className="text-slate-800 dark:text-slate-200 font-bold truncate text-xs">{t.subject}</p>
                            <span className="text-[10px] text-slate-400 block">{t.category}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct WhatsApp Channel Link */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                    <ExternalLink className="w-4 h-4" />
                    <span>Saluran WhatsApp Resmi BikinKilat</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Dapatkan pengumuman pembaruan sistem kilat, voucher token promo, dan informasi terkini di saluran WhatsApp resmi kami.
                  </p>
                  <a
                    href="https://whatsapp.com/channel/0029VbDptFyLSmbeRbuNpX3j"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                  >
                    <span>Buka Saluran WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SupportChatWidget;
