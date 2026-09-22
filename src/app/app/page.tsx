"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
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
import { DueDateReminderCenter } from "@/components/reminder/DueDateReminderCenter";
import {
  TrendingDown,
  CreditCard,
  CalendarCheck,
  Plus,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AppWorkspacePage(): JSX.Element {
  const {
    debts,
    selectedStrategy,
    extraMonthlyBudget,
    hasHydrated,
    setHasHydrated,
    openAddForm,
  } = useDebtStore();

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
          Memuat ruang kerja finansialmu...
        </p>
      </div>
    );
  }

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minimumPayment, 0);

  return (
    <div className="space-y-7 sm:space-y-9 animate-in fade-in duration-300 pb-20 sm:pb-12">
      {/* Top Breadcrumb & Contextual Navigation */}
      <nav
        aria-label="Navigasi Aplikasi"
        className="flex items-center justify-between gap-3 pt-1 text-xs"
      >
        <Link
          href="/"
          className="apple-pressable inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-subtle hover:bg-surface-subtle/80 text-muted-foreground hover:text-foreground border border-surface-border transition-colors font-semibold touch-target"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            Workspace Privat & 100% Offline
          </span>
        </div>
      </nav>

      {/* Page Title & Status Header */}
      <section className="space-y-1 text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground heading-display">
          Ruang Kerja Pelunasan
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Simulasikan percepatan cicilanmu dengan data riil, pilih strategi paling hemat, dan pantau jatuh tempo tanpa denda.
        </p>
      </section>

      {/* 3 Interactive Metric Cards */}
      <section
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
        aria-label="Ringkasan Metrik Finansial"
      >
        {/* Total Utang Pokok */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
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
          whileHover={{ y: -3, scale: 1.01 }}
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
          whileHover={{ y: -3, scale: 1.01 }}
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

      {/* In-App Due Date Reminder Center (Menjawab Mentor: Pengingat 100% In-App + Ekspor Kalender HP) */}
      <DueDateReminderCenter />

      {/* What-If Acceleration Simulator */}
      <WhatIfSimulator />

      {/* Visual Amortization Area Chart */}
      <PayoffTimeline />

      {/* Strategy Selector (Snowball vs Avalanche) */}
      <StrategySelector />

      {/* Strategy Comparison Cards */}
      <StrategyComparison />

      {/* Step-by-Step Priority Order Queue */}
      <PayoffOrderList />

      {/* Main List Section: Daftar Utang with Filter, Sort, Progress Ring */}
      <DebtList />

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

      {/* Due Date Reminder Floating Banner / Toast */}
      <DueDateReminderToast />

      {/* Celebration Confetti */}
      <MilestoneConfetti />
    </div>
  );
}
