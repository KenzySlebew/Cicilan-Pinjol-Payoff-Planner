"use client";

import React from "react";
import { motion } from "framer-motion";
import { ListPlus, Cpu, PartyPopper, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    icon: ListPlus,
    title: "Catat Cicilanmu Tanpa Akun",
    description:
      "Masukkan nama pinjaman, sisa saldo pokok, bunga bulanan/tahunan, dan tanggal jatuh tempo. Data 100% aman dan hanya tersimpan di perangkatmu.",
    color: "from-pelunas-500/20 to-pelunas-500/5",
    border: "border-pelunas-500/30",
    iconColor: "text-pelunas-400",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Pilih Strategi Matematis",
    description:
      "Bandingkan metode Snowball (kemenangan psikologis tercepat) vs Avalanche (penghematan bunga maksimal). Algoritma kami menghitung urutan paling efisien.",
    color: "from-sky-500/20 to-sky-500/5",
    border: "border-sky-500/30",
    iconColor: "text-sky-400",
  },
  {
    step: "03",
    icon: PartyPopper,
    title: "Percepat Pelunasan & Rayakan",
    description:
      "Gunakan simulasi dana ekstra What-If untuk memangkas bulan pelunasan. Pantau pengingat jatuh tempo dan rayakan setiap utang yang berhasil lunas!",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
];

export function HowItWorks(): JSX.Element {
  return (
    <section id="cara-kerja" className="space-y-6 pt-6 scroll-mt-24" aria-labelledby="steps-heading">
      <div className="space-y-1 text-left">
        <h2
          id="steps-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground heading-display"
        >
          3 Langkah Menuju Kebebasan Finansial
        </h2>
        <p className="text-xs sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Dari rasa cemas akibat cicilan yang menumpuk menjadi rencana aksi pelunasan yang jelas dan terstruktur.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 relative">
        {STEPS.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <motion.div
              key={step.step}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className={`apple-card p-6 rounded-3xl relative overflow-hidden border ${step.border} shadow-lg flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${step.color} border ${step.border} flex items-center justify-center ${step.iconColor}`}
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/30 font-sans">
                    {step.step}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
