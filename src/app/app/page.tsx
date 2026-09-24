"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
import { UpcomingDueWidget } from "@/components/reminder/UpcomingDueWidget";
import { QuickDebtWidget } from "@/components/debt/QuickDebtWidget";
import {
  TrendingDown,
  CreditCard,
  CalendarCheck,
  Plus,
  ArrowLeft,
  ShieldCheck,
  BarChart3,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

type DashboardTab = "cockpit" | "debts" | "schedule";

export default function AppWorkspacePage(): JSX.Element {
  const {
    debts,
    selectedStrategy,
    extraMonthlyBudget,
    hasHydrated,
    setHasHydrated,
    openAddForm,
  } = useDebtStore();

  const [activeTab, setActiveTab] = useState<DashboardTab>("cockpit");

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
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-20 sm:pb-12">
      {/* Top Breadcrumb & Status Navigation */}
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

      {/* Page Title & Dashboard Summary */}
      <section className="space-y-1 text-left">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground heading-display">
            Dashboard Pelunasan Utang
          </h1>
          <button
            type="button"
            onClick={openAddForm}
            className="apple-pressable inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-pelunas-500 text-pelunas-950 font-bold text-xs hover:bg-pelunas-400 transition-colors shadow-sm touch-target"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Tambah Cicilan</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Pusat kendali pelunasan: pantau pokok utang, atur strategi Snowball & Avalanche, simulasikan percepatan, dan cek jadwal jatuh tempo.
        </p>
      </section>

      {/* 3 Interactive KPI Metric Cards (Always in sight) */}
      <section
        className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4.5"
        aria-label="Ringkasan Metrik Finansial"
      >
        {/* Total Utang Pokok */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="apple-card p-5 rounded-3xl relative overflow-hidden group hover:border-pelunas-500/40 transition-colors shadow-lg"
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
          className="apple-card p-5 rounded-3xl relative overflow-hidden group hover:border-sky-500/40 transition-colors shadow-lg"
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
          className="apple-card p-5 rounded-3xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors shadow-lg"
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

      {/* Segmented Dashboard Tabs Navigation */}
      <section aria-label="Menu Tampilan Dashboard">
        <div className="flex items-center justify-center sm:justify-start">
          <div
            role="tablist"
            className="p-1 rounded-2xl bg-surface-subtle border border-surface-border inline-flex items-center gap-1 shadow-inner max-w-full overflow-x-auto no-scrollbar"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "cockpit"}
              onClick={() => setActiveTab("cockpit")}
              className={`apple-pressable relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 touch-target shrink-0 ${
                activeTab === "cockpit"
                  ? "bg-pelunas-500 text-pelunas-950 shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="w-4 h-4" aria-hidden="true" />
              <span>Cockpit & Simulasi</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "debts"}
              onClick={() => setActiveTab("debts")}
              className={`apple-pressable relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 touch-target shrink-0 ${
                activeTab === "debts"
                  ? "bg-pelunas-500 text-pelunas-950 shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CreditCard className="w-4 h-4" aria-hidden="true" />
              <span>Kelola Cicilan</span>
              <span
                className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === "debts"
                    ? "bg-pelunas-950/20 text-pelunas-950"
                    : "bg-surface-subtle text-foreground border border-surface-border"
                }`}
              >
                {debts.length}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "schedule"}
              onClick={() => setActiveTab("schedule")}
              className={`apple-pressable relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 touch-target shrink-0 ${
                activeTab === "schedule"
                  ? "bg-pelunas-500 text-pelunas-950 shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Jadwal Jatuh Tempo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Panels */}
      <main>
        {/* TAB 1: Cockpit & Simulasi (2-Column Dashboard on Desktop) */}
        {activeTab === "cockpit" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: What-If + Payoff Curve Chart */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                {/* What-If Acceleration Simulator */}
                <WhatIfSimulator />

                {/* Visual Amortization Area Chart (Immediately responds to slider) */}
                <PayoffTimeline />

                {/* Strategy Selector (Snowball vs Avalanche) */}
                <StrategySelector />

                {/* Strategy Comparison Cards */}
                <StrategyComparison />
              </div>

              {/* Right Column: Due Date Widget + Quick Debt Access (Sticky on desktop) */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-20">
                {/* Upcoming Due Date Spotlight Widget */}
                <UpcomingDueWidget
                  onViewAllClick={() => setActiveTab("schedule")}
                />

                {/* Quick Debt Access Widget */}
                <QuickDebtWidget
                  onManageClick={() => setActiveTab("debts")}
                />
              </div>
            </div>

            {/* Full-Width Section: Step-by-Step Priority Execution Queue */}
            <div>
              <PayoffOrderList />
            </div>
          </div>
        )}

        {/* TAB 2: Kelola Cicilan (Dedicated Debt Management Workspace) */}
        {activeTab === "debts" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <DebtList />
          </div>
        )}

        {/* TAB 3: Jadwal Jatuh Tempo (Dedicated Calendar & Reminder Center) */}
        {activeTab === "schedule" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <DueDateReminderCenter />
          </div>
        )}
      </main>

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
