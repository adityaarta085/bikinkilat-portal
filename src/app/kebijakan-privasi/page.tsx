import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRIVACY_POLICY, LEGAL_COMPANY_INFO } from "@/lib/legalContent";
import { ShieldCheck, ArrowLeft, Lock, Calendar, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi & Perlindungan Data Pribadi • BikinKilat.web.id",
  description: "Kebijakan Privasi resmi ekosistem BikinKilat.web.id sesuai UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP).",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <Link href="/" className="hover:text-indigo-600 transition flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800">Kebijakan Privasi</span>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Kepatuhan UU PDP No. 27 Tahun 2022</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {PRIVACY_POLICY.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Pembaruan Terakhir: {PRIVACY_POLICY.lastUpdated}</span>
            </span>
            <span>•</span>
            <span>{LEGAL_COMPANY_INFO.name} ({LEGAL_COMPANY_INFO.address})</span>
          </div>
        </div>

        {/* Legal Sections */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          {PRIVACY_POLICY.sections.map((sec) => (
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

          {/* DPO Contact Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Petugas Pelindungan Data Pribadi (DPO) &amp; Pengaduan</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Untuk mengajukan permohonan akses data, koreksi informasi, atau penghapusan data akun Anda secara permanen, Anda dapat menghubungi petugas DPO kami melalui kanal resmi berikut (SLA respons maksimal 7 hari kerja):
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <a
                href={`mailto:${LEGAL_COMPANY_INFO.privacyEmail}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-indigo-600 font-bold hover:border-indigo-300 transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email: {LEGAL_COMPANY_INFO.privacyEmail}</span>
              </a>
              <a
                href={LEGAL_COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-100 transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp DPO: {LEGAL_COMPANY_INFO.whatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
