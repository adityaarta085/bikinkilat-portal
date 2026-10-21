import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { REFUND_POLICY, LEGAL_COMPANY_INFO } from "@/lib/legalContent";
import { ArrowLeft, RefreshCw, Calendar, Mail } from "lucide-react";

export const metadata = {
  title: "Kebijakan Pengembalian Dana (Refund) • BikinKilat.web.id",
  description: "Ketentuan pengembalian dana dan rekonsiliasi transaksi pembayaran QRIS BikinKilat.web.id.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <Link href="/" className="hover:text-indigo-600 transition flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800">Kebijakan Pengembalian Dana</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
            <RefreshCw className="w-4 h-4 text-amber-600" />
            <span>Standar Transaksi QRIS Real-Time</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {REFUND_POLICY.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Pembaruan Terakhir: {REFUND_POLICY.lastUpdated}</span>
            </span>
            <span>•</span>
            <span>{LEGAL_COMPANY_INFO.name}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          {REFUND_POLICY.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="space-y-3 scroll-mt-20">
              <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">
                {sec.title}
              </h2>
              <div className="space-y-2.5 text-slate-600">
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-950 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600" />
              <span>Pusat Rekonsiliasi & Klaim Pembayaran</span>
            </h3>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Jika ada transaksi QRIS yang sudah terpotong namun token belum masuk, hubungi tim support operasional kami dengan menyertakan bukti transfer dan nomor pesanan ke{" "}
              <a href={`mailto:${LEGAL_COMPANY_INFO.email}`} className="font-bold underline text-indigo-700">
                {LEGAL_COMPANY_INFO.email}
              </a>
              . Kami siap membantu menyelesaikan dalam 1x24 jam kerja.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
