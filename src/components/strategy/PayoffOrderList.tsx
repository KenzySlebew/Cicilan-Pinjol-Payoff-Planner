"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { calculatePayoffStrategy } from "@/lib/calculations/payoffEngine";
import { formatRupiah, formatPersen } from "@/lib/utils/formatRupiah";
import {
  CheckCircle2,
  Calendar,
  Flame,
  ArrowRight,
  ShieldCheck,
  Percent,
} from "lucide-react";

export function PayoffOrderList(): JSX.Element {
  const { debts, selectedStrategy, extraMonthlyBudget } = useDebtStore();

  const plan = useMemo(() => {
    return calculatePayoffStrategy(debts, selectedStrategy, extraMonthlyBudget);
  }, [debts, selectedStrategy, extraMonthlyBudget]);

  if (debts.length === 0) return <></>;

  const { milestones } = plan;

  return (
    <section className="space-y-4" aria-labelledby="payoff-order-heading">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2
              id="payoff-order-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
            >
              Urutan Prioritas Pelunasan
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pelunas-500/15 text-pelunas-300 border border-pelunas-500/30 capitalize">
              {selectedStrategy}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Langkah nyata pelunasan bertahap agar uangmu bekerja maksimal
          </p>
        </div>
      </div>

      <div className="grid gap-3.5">
        {milestones.map((item, index) => {
          const isPrimaryTarget = index === 0;

          return (
            <motion.div
              key={item.debtId}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, delay: index * 0.05 }}
              className={`apple-card p-5 sm:p-6 rounded-2xl relative transition-all ${
                isPrimaryTarget
                  ? "border-pelunas-500/50 bg-pelunas-500/[0.04] shadow-lg shadow-pelunas-500/5"
                  : "border-border/60 hover:border-border"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left side: Priority Badge + Name + Guidance */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 border ${
                      isPrimaryTarget
                        ? "bg-pelunas-500 text-pelunas-950 border-pelunas-400 font-extrabold shadow-md shadow-pelunas-500/30"
                        : "bg-surface-subtle text-muted-foreground border-surface-border"
                    }`}
                  >
                    #{item.orderIndex}
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base sm:text-lg text-foreground truncate">
                        {item.debtName}
                      </h3>
                      {isPrimaryTarget ? (
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pelunas-500/20 text-pelunas-300 border border-pelunas-500/40 animate-pulse whitespace-nowrap shrink-0">
                          <Flame className="w-3 h-3 text-pelunas-400" aria-hidden="true" />
                          FOKUS UTAMA SAAT INI
                        </span>
                      ) : (
                        <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-subtle text-muted-foreground border border-surface-border whitespace-nowrap shrink-0">
                          Prioritas #{item.orderIndex}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {isPrimaryTarget ? (
                        <span>
                          Alokasikan pembayaran minimum (<strong>{formatRupiah(item.minimumPayment)}</strong>) ditambah seluruh dana ekstra.
                        </span>
                      ) : (
                        <span>
                          Cukup bayar cicilan minimum (<strong>{formatRupiah(item.minimumPayment)}</strong>) tepat waktu. Jangan bayar lebih dulu sampai prioritas sebelumnya lunas.
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right side: Estimated Payoff Date & Financial Summary */}
                <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-3 sm:gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-surface-border/60 shrink-0">
                  <div className="p-2 sm:p-0 rounded-xl bg-surface-subtle/50 sm:bg-transparent text-left sm:text-right">
                    <span className="text-[10px] sm:text-[11px] text-muted-foreground block">
                      Target Lunas
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-extrabold text-foreground block truncate">
                      {item.payoffDateLabel}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      ({item.monthsToPayoff} bulan)
                    </span>
                  </div>

                  <div className="p-2 sm:p-0 rounded-xl bg-surface-subtle/50 sm:bg-transparent text-right">
                    <span className="text-[10px] sm:text-[11px] text-muted-foreground block">
                      Total Bunga
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-bold finance-amount text-pelunas-300 block truncate">
                      {formatRupiah(item.totalInterestPaid)}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      Bunga {formatPersen(item.interestRatePerMonth)}/bln
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
