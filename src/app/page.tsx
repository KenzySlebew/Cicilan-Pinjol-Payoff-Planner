"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { InteractiveDemoPreview } from "@/components/landing/InteractiveDemoPreview";
import { ProblemStatement } from "@/components/landing/ProblemStatement";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DueDateFeatureShowcase } from "@/components/landing/DueDateFeatureShowcase";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/shared/Footer";

export default function LandingPage(): JSX.Element {
  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300 pb-16">
      {/* Hero Section */}
      <section className="relative space-y-6 pt-4 sm:pt-8 text-left">
        {/* Floating pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pelunas-500/15 border border-pelunas-500/30 text-pelunas-300 text-xs font-semibold backdrop-blur-md shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
          <span>Solusi Pelunasan Utang Bebas Iklan & 100% Offline</span>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 max-w-3xl"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground heading-display leading-[1.12]">
            Kapan kamu bisa benar-benar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pelunas-300 via-emerald-400 to-teal-300">
              bebas dari cicilan?
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed font-normal">
            Catat cicilan paylater, kartu kredit, dan pinjamanmu. Algoritma Snowball & Avalanche menghitung urutan pelunasan paling hemat secara matematis dan privat.
          </p>
        </motion.div>

        {/* Action Buttons: Primary App CTA & Secondary Preview CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
        >
          <Link
            href="/app"
            className="apple-pressable inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-pelunas-500 hover:bg-pelunas-400 text-pelunas-950 font-black text-sm sm:text-base shadow-xl shadow-pelunas-500/30 transition-all touch-target"
          >
            <span>Mulai Hitung Sekarang</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <a
            href="#preview"
            className="apple-pressable inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-surface-subtle hover:bg-surface-subtle/80 text-foreground border border-surface-border font-semibold text-xs sm:text-sm transition-colors touch-target"
          >
            <span>Coba Simulasi</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 flex-wrap pt-2 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle border border-surface-border text-foreground font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-pelunas-400" />
            100% Gratis & Tanpa Akun
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle border border-surface-border text-foreground font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Data Tersimpan di HP Anda
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle border border-surface-border text-foreground font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Bebas Iklan Penjualan Pinjol Baru
          </span>
        </motion.div>
      </section>

      {/* Live Interactive Preview Teaser */}
      <InteractiveDemoPreview />

      {/* Problem Statement & Indonesian Financial Context */}
      <ProblemStatement />

      {/* 3 Step Workflow */}
      <HowItWorks />

      {/* Clarification of Due Date Reminders (Menjawab Arahan Mentor) */}
      <DueDateFeatureShowcase />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* FAQ Accordion */}
      <FAQSection />

      {/* High-Impact Bottom Call to Action */}
      <section className="pt-6">
        <motion.div
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="apple-card p-6 sm:p-10 rounded-3xl border border-pelunas-500/30 bg-gradient-to-b from-card to-pelunas-950/20 text-center space-y-5 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-pelunas-500/5 blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground heading-display">
              Ambil Kendali Finansialmu Hari Ini
            </h2>
            <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
              Tidak ada data yang diserahkan, tidak ada biaya langganan tersembunyi. Buka aplikasi dan buat peta jalan pelunasanmu dalam 2 menit.
            </p>
          </div>

          <div className="pt-2 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/app"
              className="apple-pressable w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-pelunas-500 hover:bg-pelunas-400 text-pelunas-950 font-black text-sm sm:text-base shadow-xl shadow-pelunas-500/30 transition-all touch-target"
            >
              <span>Buka Aplikasi Pelunas</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="text-[11px] text-muted-foreground relative z-10">
            Dibuat untuk masyarakat Indonesia yang ingin merdeka dari jeratan bunga pinjaman.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
