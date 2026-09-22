"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Target, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";

/**
 * Feature & Problem Breakdown
 * Inspired by the clean, empathetic 3-column storytelling of thebudgeting.app
 */
export function ProblemStatement(): JSX.Element {
  return (
    <section id="masalah" className="space-y-5 pt-6 scroll-mt-24" aria-labelledby="problem-heading">
      <div className="space-y-1 text-left">
        <h2
          id="problem-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground heading-display"
        >
          Punya beberapa cicilan aktif? Mana yang harus dilunasi duluan?
        </h2>
        <p className="text-xs sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Banyak pekerja muda memiliki 2 hingga 4 cicilan aktif sekaligus (PayLater e-commerce, kartu kredit, pinjaman online). Tanpa urutan prioritas yang terukur, gaji bulanan sering kali habis hanya untuk membayar bunga berjalan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        {/* Card 1: Jebakan Bunga */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="apple-card p-6 rounded-3xl space-y-3 border border-white/[0.08] hover:border-rose-500/40 transition-all shadow-lg group relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-300 shadow-sm group-hover:scale-105 transition-transform">
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground tracking-tight">
              Jebakan Bunga Bulanan
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Bunga paylater 2.95%/bulan terlihat kecil, tetapi setara dengan <strong className="text-foreground">35% per tahun</strong>. Tanpa strategi terarah, sebagian besar uangmu hanya terpakai untuk bunga.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Rollover Momentum */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="apple-card p-6 rounded-3xl space-y-3 border border-white/[0.08] hover:border-pelunas-500/40 transition-all shadow-lg group relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-2xl bg-pelunas-500/10 border border-pelunas-500/25 flex items-center justify-center text-pelunas-300 shadow-sm group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground tracking-tight">
              Kekuatan Rollover Cicilan
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Saat satu cicilan berhasil lunas, alokasinya dialihkan ke utang berikutnya. Efek bola salju ini mempercepat kebebasan finansialmu secara eksponensial.
            </p>
          </div>
        </motion.div>

        {/* Card 3: 100% Offline & Privat */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="apple-card p-6 rounded-3xl space-y-3 border border-white/[0.08] hover:border-sky-500/40 transition-all shadow-lg group relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-300 shadow-sm group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground tracking-tight">
              100% Tenang & Tanpa Akun
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tidak perlu nomor KTP, email, atau password. Rencana keuanganmu tersimpan privat di dalam browser perangkatmu sendiri tanpa terlacak siapa pun.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
