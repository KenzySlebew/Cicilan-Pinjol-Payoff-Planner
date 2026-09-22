"use client";

import React from "react";
import { Check, X, Shield, Sparkles } from "lucide-react";

export function ComparisonTable(): JSX.Element {
  return (
    <section className="space-y-4 pt-6 scroll-mt-24" aria-labelledby="compare-heading">
      <div className="space-y-1 text-left">
        <h2
          id="compare-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground heading-display"
        >
          Perbandingan dengan Cara Tradisional
        </h2>
        <p className="text-xs sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Dibangun khusus untuk ketenangan pikiranmu, tanpa iklan yang mengganggu dan tanpa mengorbankan privasi.
        </p>
      </div>

      <div className="apple-card rounded-3xl border border-surface-border overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-surface-border bg-surface-subtle/50 text-foreground">
                <th className="p-4 sm:p-5 font-bold">Fitur & Privasi</th>
                <th className="p-4 sm:p-5 font-bold text-pelunas-400 bg-pelunas-500/10 border-x border-pelunas-500/20">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    Pelunas
                  </span>
                </th>
                <th className="p-4 sm:p-5 font-semibold text-muted-foreground">Spreadsheet Excel</th>
                <th className="p-4 sm:p-5 font-semibold text-muted-foreground">Aplikasi Finansial Umum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              <tr>
                <td className="p-4 sm:p-5 font-medium text-foreground">
                  Privasi 100% Offline (Tanpa Akun)
                </td>
                <td className="p-4 sm:p-5 bg-pelunas-500/5 border-x border-pelunas-500/20 font-bold text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Ya (di browser)</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Ya (file lokal)</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-rose-400">
                  <div className="flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Tidak (Wajib KTP/Email)</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-medium text-foreground">
                  Algoritma Snowball & Avalanche Otomatis
                </td>
                <td className="p-4 sm:p-5 bg-pelunas-500/5 border-x border-pelunas-500/20 font-bold text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Otomatis Seketika</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-rose-400">
                  <div className="flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Rumus manual rumit</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Terbatas / Berbayar</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-medium text-foreground">
                  Pengingat Jatuh Tempo Tanpa Spam
                </td>
                <td className="p-4 sm:p-5 bg-pelunas-500/5 border-x border-pelunas-500/20 font-bold text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>In-App & Ekspor Kalender HP</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-rose-400">
                  <div className="flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Tidak ada notifikasi</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-rose-400">
                  <div className="flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Spam email & WhatsApp</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-medium text-foreground">
                  Simulator What-If Interaktif
                </td>
                <td className="p-4 sm:p-5 bg-pelunas-500/5 border-x border-pelunas-500/20 font-bold text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Slider Real-Time</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-rose-400">
                  <div className="flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Hitung manual</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-muted-foreground">Jarang tersedia</td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-medium text-foreground">
                  Bebas Iklan & Penawaran Pinjaman Lain
                </td>
                <td className="p-4 sm:p-5 bg-pelunas-500/5 border-x border-pelunas-500/20 font-bold text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>100% Bersih & Etis</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Bebas iklan</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-rose-400">
                  <div className="flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Banyak iklan pinjol baru</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
