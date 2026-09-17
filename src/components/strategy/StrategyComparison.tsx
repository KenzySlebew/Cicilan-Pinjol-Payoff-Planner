"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { compareStrategies } from "@/lib/calculations/compareStrategies";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import {
  Coins,
  Calendar,
  Zap,
  TrendingDown,
  Sparkles,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export function StrategyComparison(): JSX.Element {
  const { debts, selectedStrategy, extraMonthlyBudget, setStrategy } = useDebtStore();

  const comparison = useMemo(() => {
    return compareStrategies(debts, extraMonthlyBudget);
  }, [debts, extraMonthlyBudget]);

  if (debts.length === 0) return <></>;

  const { snowball, avalanche, interestSavedByAvalanche, monthsDifference } = comparison;

  return (
    <section className="space-y-4" aria-labelledby="comparison-heading">
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="comparison-heading"
            className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
          >
            Perbandingan Hasil Simulasi
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Periksa selisih waktu bebas utang dan total bunga yang keluar
          </p>
        </div>
      </div>

      {/* Highlight Banner: Hemat Bunga */}
      {interestSavedByAvalanche > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl bg-pelunas-500/15 border border-pelunas-500/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-pelunas-500/5"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pelunas-500/20 border border-pelunas-500/40 flex items-center justify-center text-pelunas-300 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-bold text-foreground">
                Potensi Penghematan Bunga:{" "}
                <span className="text-pelunas-300 font-extrabold finance-amount text-sm sm:text-base">
                  {formatRupiah(interestSavedByAvalanche)}
                </span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dengan memilih metode <strong>Avalanche</strong>, kamu terhindar dari bunga pinjol/paylater yang tinggi dan menyelesaikan seluruh cicilan{" "}
                {monthsDifference > 0
                  ? `${monthsDifference} bulan lebih awal.`
                  : "pada waktu yang sama."}
              </p>
            </div>
          </div>

          {selectedStrategy !== "avalanche" && (
            <button
              type="button"
              onClick={() => setStrategy("avalanche")}
              className="apple-pressable h-10 px-4 rounded-xl bg-pelunas-500 text-pelunas-950 font-bold text-xs shrink-0 hover:bg-pelunas-400 transition-colors touch-target self-start sm:self-auto"
            >
              Gunakan Avalanche
            </button>
          )}
        </motion.div>
      ) : debts.length > 1 ? (
        <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border text-xs text-muted-foreground flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-pelunas-400 shrink-0" aria-hidden="true" />
          <span>
            Kedua strategi menghasilkan total biaya yang hampir sama karena tingkat bunga cicilanmu berimbang.
          </span>
        </div>
      ) : null}

      {/* Side by Side Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Avalanche Card */}
        <div
          className={`apple-card p-5 sm:p-6 rounded-3xl space-y-4 relative transition-all ${
            selectedStrategy === "avalanche"
              ? "border-pelunas-500/50 shadow-xl shadow-pelunas-500/10"
              : "border-border/60 opacity-85 hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pelunas-500/15 border border-pelunas-500/30 flex items-center justify-center text-pelunas-300">
                <TrendingDown className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-foreground">
                  Metode Avalanche
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  Fokus bunga tertinggi
                </span>
              </div>
            </div>
            {interestSavedByAvalanche > 0 && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-pelunas-500/20 text-pelunas-300 border border-pelunas-500/35">
                Paling Hemat
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/40">
            <div>
              <span className="text-[11px] text-muted-foreground block">
                Estimasi Bebas Utang
              </span>
              <span className="text-base sm:text-lg font-extrabold text-foreground block">
                {avalanche.payoffDateLabel}
              </span>
              <span className="text-[11px] text-muted-foreground">
                ({avalanche.totalMonths} bulan)
              </span>
            </div>

            <div>
              <span className="text-[11px] text-muted-foreground block">
                Total Bunga Dibayar
              </span>
              <span className="text-base sm:text-lg font-extrabold finance-amount text-pelunas-300 block">
                {formatRupiah(avalanche.totalInterestPaid)}
              </span>
              <span className="text-[11px] text-muted-foreground">
                Total keluar: {formatRupiah(avalanche.totalPaid)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-subtle border border-surface-border text-xs text-muted-foreground">
            <strong>Cocok jika:</strong> Kamu ingin menghemat rupiah sebanyak mungkin dan disiplin membayar tanpa perlu melihat utang cepat tercoret.
          </div>
        </div>

        {/* Snowball Card */}
        <div
          className={`apple-card p-5 sm:p-6 rounded-3xl space-y-4 relative transition-all ${
            selectedStrategy === "snowball"
              ? "border-amber-500/50 shadow-xl shadow-amber-500/10"
              : "border-border/60 opacity-85 hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Zap className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-foreground">
                  Metode Snowball
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  Fokus saldo terkecil
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/35">
              Motivasi Cepat
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/40">
            <div>
              <span className="text-[11px] text-muted-foreground block">
                Estimasi Bebas Utang
              </span>
              <span className="text-base sm:text-lg font-extrabold text-foreground block">
                {snowball.payoffDateLabel}
              </span>
              <span className="text-[11px] text-muted-foreground">
                ({snowball.totalMonths} bulan)
              </span>
            </div>

            <div>
              <span className="text-[11px] text-muted-foreground block">
                Total Bunga Dibayar
              </span>
              <span className="text-base sm:text-lg font-extrabold finance-amount text-amber-300 block">
                {formatRupiah(snowball.totalInterestPaid)}
              </span>
              <span className="text-[11px] text-muted-foreground">
                Total keluar: {formatRupiah(snowball.totalPaid)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-subtle border border-surface-border text-xs text-muted-foreground">
            <strong>Keuntungan:</strong> Utang pertama (<strong>{snowball.firstDebtPaidName}</strong>) lunas dalam <strong>{snowball.firstDebtPaidMonths} bulan</strong>, memberi kelegaan mental lebih dini.
          </div>
        </div>
      </div>
    </section>
  );
}
