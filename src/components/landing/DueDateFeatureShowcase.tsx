"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, ShieldCheck, Smartphone, CheckCircle2 } from "lucide-react";

export function DueDateFeatureShowcase(): JSX.Element {
  return (
    <section
      id="pengingat"
      className="space-y-6 pt-6 scroll-mt-24"
      aria-labelledby="reminder-showcase-heading"
    >
      <div className="space-y-1 text-left">
        <h2
          id="reminder-showcase-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground heading-display"
        >
          Pengingat Jatuh Tempo: Di Mana dan Bagaimana Cara Kerjanya?
        </h2>
        <p className="text-xs sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Kami menolak sistem tradisional yang meminta email atau nomor telepon pengguna hanya untuk mengirimkan spam pengingat. Pelunas menggunakan pendekatan <strong className="text-foreground">In-App dan Kalender Ponsel</strong> yang 100% privat.
        </p>
      </div>

      {/* Asymmetric Bento Layout: Hero Card (7 cols) + Two Stacked Value Cards (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Main Spotlight Card: In-App + Calendar Sync */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="lg:col-span-7 apple-card p-6 sm:p-7 rounded-3xl border border-surface-border shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pelunas-500/15 border border-pelunas-500/30 flex items-center justify-center text-pelunas-400">
                <Calendar className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-base text-foreground tracking-tight">
                  Sinkron Kalender Ponsel (.ics)
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  Google Calendar • Apple Calendar • Outlook
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Cukup unduh jadwal via tombol ekspor, alarm bawaan HP kamu akan otomatis berdering tiap tanggal jatuh tempo tanpa perlu koneksi internet atau login akun.
            </p>
          </div>

          {/* Interactive Mockup Banner inside Spotlight Card */}
          <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400">
                <Bell className="w-3.5 h-3.5" aria-hidden="true" />
                Jatuh Tempo H-2
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">Tgl 25 Setiap Bulan</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-surface-border/50">
              <span className="text-foreground font-semibold">Spaylater</span>
              <span className="font-mono font-bold text-pelunas-400">Rp 450.000</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Pengingat in-app ini otomatis aktif di perangkat saat kamu membuka ruang kerja aplikasi.
            </p>
          </div>
        </motion.div>

        {/* Side Stack: Two Privacy & Zero-Spam Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Card 1: Zero Spam */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="apple-card p-5 sm:p-6 rounded-3xl border border-surface-border shadow-lg flex-1 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-foreground tracking-tight">
                  Tanpa Spam Email dan WhatsApp
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tidak ada pesan teror WhatsApp dan tidak ada kotak masuk yang dipenuhi email penagihan.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Bebas risiko kebocoran database</span>
            </div>
          </motion.div>

          {/* Card 2: 100% Offline */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="apple-card p-5 sm:p-6 rounded-3xl border border-surface-border shadow-lg flex-1 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                <Smartphone className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-foreground tracking-tight">
                  Berjalan di Perangkatmu Sendiri
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Perhitungan dan tanggal jatuh tempo tersimpan di storage browser lokal (localStorage).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1">
              <span>Bekerja tanpa perlu sinyal internet konstan</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
