import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TERMS_OF_SERVICE, LEGAL_COMPANY_INFO } from "@/lib/legalContent";
import { ShieldCheck, ArrowLeft, FileText, Calendar } from "lucide-react";

export const metadata = {
  title: "Syarat dan Ketentuan Layanan • BikinKilat.web.id",
  description: "Syarat dan Ketentuan resmi penggunaan layanan ekosistem BikinKilat.web.id sesuai hukum Republik Indonesia.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <Link href="/" className="hover:text-indigo-600 transition flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800">Syarat dan Ketentuan</span>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Kepatuhan Hukum UU ITE No. 1/2024</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {TERMS_OF_SERVICE.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Pembaruan Terakhir: {TERMS_OF_SERVICE.lastUpdated}</span>
            </span>
            <span>•</span>
            <span>{LEGAL_COMPANY_INFO.name}</span>
          </div>
        </div>

        {/* Legal Sections */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          {TERMS_OF_SERVICE.sections.map((sec) => (
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

          {/* Contact Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Pertanyaan Mengenai Ketentuan Layanan?
            </h3>
            <p className="text-xs text-slate-600">
              Jika Anda memiliki pertanyaan hukum atau klarifikasi terkait Syarat dan Ketentuan ini, silakan hubungi tim hukum kami melalui email{" "}
              <a href={`mailto:${LEGAL_COMPANY_INFO.email}`} className="text-indigo-600 font-bold underline">
                {LEGAL_COMPANY_INFO.email}
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
