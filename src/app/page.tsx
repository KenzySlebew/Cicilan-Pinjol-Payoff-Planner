"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { calculatePayoffStrategy } from "@/lib/calculations/payoffEngine";
import { DebtList } from "@/components/debt/DebtList";
import { DebtForm } from "@/components/debt/DebtForm";
import { DeleteConfirmDialog } from "@/components/debt/DeleteConfirmDialog";
import { StrategySelector } from "@/components/strategy/StrategySelector";
import { StrategyComparison } from "@/components/strategy/StrategyComparison";
import { PayoffOrderList } from "@/components/strategy/PayoffOrderList";
import { PayoffTimeline } from "@/components/timeline/PayoffTimeline";
import { MilestoneConfetti } from "@/components/celebration/MilestoneConfetti";
import { WhatIfSimulator } from "@/components/whatif/WhatIfSimulator";
import { DueDateReminderToast } from "@/components/reminder/DueDateReminderToast";
import { ProblemStatement } from "@/components/landing/ProblemStatement";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/shared/Footer";
import {
  TrendingDown,
  CreditCard,
  Sparkles,
  CalendarCheck,
  Plus,
} from "lucide-react";

export default function HomePage(): JSX.Element {
  const { debts, selectedStrategy, extraMonthlyBudget, hasHydrated, setHasHydrated, openAddForm } =
    useDebtStore();

  useEffect(() => {
    setHasHydrated(true);
  }, [setHasHydrated]);

  const payoffPlan = useMemo(() => {
    return calculatePayoffStrategy(debts, selectedStrategy, extraMonthlyBudget);
  }, [debts, selectedStrategy, extraMonthlyBudget]);

  if (!hasHydrated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3.5">
        <div className="w-9 h-9 rounded-full border-2 border-pelunas-500/20 border-t-pelunas-500 animate-spin" />
        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
          Memuat perencana finansialmu...
        </p>
      </div>
    );
  }

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minimumPayment, 0);

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300 pb-16 sm:pb-8">
      {/* Hero Overview - thebudgeting.app inspired Typography & Value Props */}
      <section className="relative space-y-4 pt-2 text-left">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pelunas-500/15 border border-pelunas-500/30 text-pelunas-300 text-xs font-semibold backdrop-blur-md shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
          <span>Perencana Finansial Bebas Iklan • 100% Offline</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground heading-display leading-[1.15]">
            Kapan kamu bisa benar-benar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pelunas-300 via-emerald-400 to-teal-300">
              bebas cicilan?
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed font-normal">
            Catat cicilan paylater, kartu kredit, dan pinjamanmu dalam hitungan detik. Kami hitung urutan pelunasan paling hemat secara matematis, transparan, dan tanpa penghakiman.
          </p>
        </motion.div>

        {/* thebudgeting.app style feature trust pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 flex-wrap pt-1 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle border border-surface-border text-foreground font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-pelunas-400" />
            Bebas Iklan & Tanpa Akun
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle border border-surface-border text-foreground font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            100% Berjalan di HP Kamu
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle border border-surface-border text-foreground font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Strategi Snowball & Avalanche
          </span>
        </motion.div>
      </section>

      {/* 3 Interactive Metric Cards - Smooth Hover & Elevated Polish */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5" aria-label="Ringkasan Finansial">
        {/* Total Utang Pokok */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="apple-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-pelunas-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground font-medium mb-1.5">
            <span>Total Pokok Utang</span>
            <div className="w-8 h-8 rounded-xl bg-pelunas-500/10 border border-pelunas-500/25 flex items-center justify-center text-pelunas-400 group-hover:scale-110 transition-transform">
              <TrendingDown className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black finance-amount tracking-tight text-foreground">
            {formatRupiah(totalDebt)}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 font-medium">
            Dari {debts.length} pinjaman aktif
          </p>
        </motion.div>

        {/* Cicilan Bulanan Wajib */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="apple-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-sky-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground font-medium mb-1.5">
            <span>Beban Cicilan Bulanan</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black finance-amount tracking-tight text-foreground">
            {formatRupiah(totalMinPayment)}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 font-medium">
            {extraMonthlyBudget > 0
              ? `+ ${formatRupiah(extraMonthlyBudget)} dana ekstra`
              : "Wajib dibayar per bulan"}
          </p>
        </motion.div>

        {/* Target Bebas Utang Realistis */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="apple-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors shadow-lg"
        >
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground font-medium mb-1.5">
            <span>Estimasi Bebas Utang</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-foreground tracking-tight truncate mt-1 font-sans">
            {debts.length > 0 ? payoffPlan.payoffDateLabel : "-"}
          </div>
          <p className="text-xs text-pelunas-300 mt-1 font-semibold flex items-center gap-1">
            {debts.length > 0
              ? `${payoffPlan.totalMonths} bulan dengan ${selectedStrategy}`
              : "Belum ada cicilan"}
          </p>
        </motion.div>
      </section>

      {/* What-If Acceleration Simulator (Fase 4) */}
      <WhatIfSimulator />

      {/* Visual Amortization Area Chart (Fase 3) */}
      <PayoffTimeline />

      {/* Strategy Selector (Fase 2) */}
      <StrategySelector />

      {/* Strategy Comparison Cards (Fase 2) */}
      <StrategyComparison />

      {/* Step-by-Step Priority Order Queue (Fase 2) */}
      <PayoffOrderList />

      {/* Main List Section: Daftar Utang (Fase 1 & Fase 3 Progress Ring) */}
      <DebtList />

      {/* Problem Statement & Indonesian Financial Context (Fase 5) */}
      <ProblemStatement />

      {/* FAQ Accordion (Fase 5) */}
      <FAQSection />

      {/* Reassurance & Privacy Guarantee Footer (Fase 5) */}
      <Footer />

      {/* Floating Mobile Quick Add Button */}
      <div className="fixed bottom-5 right-5 sm:hidden z-30">
        <button
          type="button"
          onClick={openAddForm}
          aria-label="Tambah cicilan baru"
          className="apple-pressable w-14 h-14 rounded-full bg-pelunas-500 text-pelunas-950 shadow-xl shadow-pelunas-500/30 flex items-center justify-center font-bold"
        >
          <Plus className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Modals & Dialogs */}
      <DebtForm />
      <DeleteConfirmDialog />

      {/* Due Date Reminder Floating Banner / Toast (Fase 5) */}
      <DueDateReminderToast />

      {/* Celebration Confetti (Fase 3) */}
      <MilestoneConfetti />
    </div>
  );
}
