"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { calculatePayoffStrategy } from "@/lib/calculations/payoffEngine";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { AnimatedNumber } from "./AnimatedNumber";
import { Zap, TrendingDown, CalendarCheck, Clock, ArrowRight, Sparkles } from "lucide-react";

export function ImpactPreview(): JSX.Element {
  const { debts, selectedStrategy, extraMonthlyBudget } = useDebtStore();

  const baselinePlan = useMemo(() => {
    return calculatePayoffStrategy(debts, selectedStrategy, 0);
  }, [debts, selectedStrategy]);

  const acceleratedPlan = useMemo(() => {
    return calculatePayoffStrategy(debts, selectedStrategy, extraMonthlyBudget);
  }, [debts, selectedStrategy, extraMonthlyBudget]);

  if (debts.length === 0) return <></>;

  const monthsSaved = Math.max(0, baselinePlan.totalMonths - acceleratedPlan.totalMonths);
  const interestSavedExtra = Math.max(
    0,
    Math.round(baselinePlan.totalInterestPaid - acceleratedPlan.totalInterestPaid)
  );

  const hasExtra = extraMonthlyBudget > 0;

  return (
    <div className="space-y-3.5 pt-2">
      <AnimatePresence mode="wait">
        {!hasExtra ? (
          <motion.div
            key="empty-impact"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-4 rounded-2xl bg-surface-subtle border border-surface-border text-xs text-muted-foreground flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-pelunas-400 shrink-0" aria-hidden="true" />
            <p className="leading-relaxed">
              Geser slider atau pilih tombol di atas untuk melihat bagaimana tambahan sedikit dana bulanan dapat memangkas durasi cicilan dan menghemat bunga secara nyata.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="active-impact"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3.5"
          >
            {/* Impact Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 1: Months Saved */}
              <div className="p-4 rounded-2xl bg-pelunas-500/10 border border-pelunas-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                  <span>Waktu Terpangkas</span>
                  <Clock className="w-4 h-4 text-pelunas-400" aria-hidden="true" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-pelunas-300 flex items-center gap-1">
                  <AnimatedNumber
                    value={monthsSaved}
                    formatAsRupiah={false}
                    suffix=" Bulan"
                    className="text-pelunas-300"
                  />
                  <span className="text-xs font-bold text-pelunas-400 uppercase tracking-wider">
                    Lebih Cepat
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Dari {baselinePlan.totalMonths} bln menjadi {acceleratedPlan.totalMonths} bln
                </p>
              </div>

              {/* Card 2: Interest Saved Extra */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                  <span>Ekstra Hemat Bunga</span>
                  <TrendingDown className="w-4 h-4 text-amber-400" aria-hidden="true" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-300 flex items-center">
                  <AnimatedNumber
                    value={interestSavedExtra}
                    formatAsRupiah={true}
                    className="text-amber-300"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Uang yang tetap aman di kantongmu
                </p>
              </div>

              {/* Card 3: Target Tanggal Baru */}
              <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border space-y-1 sm:col-span-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                  <span>Target Tanggal Baru</span>
                  <CalendarCheck className="w-4 h-4 text-sky-400" aria-hidden="true" />
                </div>
                <div className="text-base sm:text-lg font-bold text-foreground truncate mt-0.5">
                  {acceleratedPlan.payoffDateLabel}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Sebelumnya: {baselinePlan.payoffDateLabel}
                </p>
              </div>
            </div>

            {/* Motivational Takeaway */}
            <div className="p-3.5 rounded-xl bg-pelunas-500/15 border border-pelunas-500/35 text-xs text-foreground flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-pelunas-400 shrink-0" aria-hidden="true" />
              <p className="leading-relaxed">
                Komitmen tambahan <strong>{formatRupiah(extraMonthlyBudget)}/bulan</strong> membebaskanmu dari utang{" "}
                <strong>{monthsSaved > 0 ? `${monthsSaved} bulan lebih awal` : "lebih efisien"}</strong> dengan total hemat bunga{" "}
                <strong>{formatRupiah(interestSavedExtra)}</strong>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
