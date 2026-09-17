"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { getDaysUntilDue } from "@/lib/utils/dateUtils";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { Bell, X, AlertCircle } from "lucide-react";

export function DueDateReminderToast(): JSX.Element | null {
  const { debts, dismissedReminderIds, dismissReminder } = useDebtStore();

  // Cari cicilan yang jatuh tempo dalam H-3 s/d Hari ini yang belum di-dismiss
  const upcomingDueDebts = useMemo(() => {
    return debts
      .map((debt) => ({
        ...debt,
        daysUntil: getDaysUntilDue(debt.dueDay),
      }))
      .filter(
        (debt) =>
          debt.daysUntil >= 0 &&
          debt.daysUntil <= 3 &&
          !dismissedReminderIds.includes(debt.id)
      )
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [debts, dismissedReminderIds]);

  if (upcomingDueDebts.length === 0) return null;

  // Tampilkan pengingat untuk cicilan yang paling mendesak
  const targetDebt = upcomingDueDebts[0];
  const isToday = targetDebt.daysUntil === 0;

  return (
    <aside
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 sm:max-w-md z-40 pointer-events-auto"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={targetDebt.id}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className={`apple-card p-4 rounded-2xl shadow-2xl border backdrop-blur-xl relative overflow-hidden ${
            isToday
              ? "border-rose-500/40 bg-card/95"
              : "border-amber-500/40 bg-card/95"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                isToday
                  ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
                  : "bg-amber-500/15 border-amber-500/30 text-amber-300"
              }`}
            >
              {isToday ? (
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Bell className="w-4 h-4" aria-hidden="true" />
              )}
            </div>

            <div className="space-y-1 pr-4 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isToday
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  }`}
                >
                  {isToday ? "Jatuh Tempo Hari Ini" : `Jatuh Tempo H-${targetDebt.daysUntil}`}
                </span>
                <span className="text-xs text-muted-foreground">
                  (tgl {targetDebt.dueDay})
                </span>
              </div>

              <p className="text-xs text-foreground font-medium leading-relaxed">
                Cicilan <strong className="text-foreground">{targetDebt.name}</strong> sebesar{" "}
                <strong className="text-pelunas-300 finance-amount">
                  {formatRupiah(targetDebt.minimumPayment)}
                </strong>{" "}
                {isToday
                  ? "harus diselesaikan hari ini agar tidak terkena denda keterlambatan."
                  : `akan jatuh tempo dalam ${targetDebt.daysUntil} hari. Pastikan saldo sudah siap.`}
              </p>

              <div className="pt-1.5 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">
                  Pengingat otomatis lokal
                </span>
                <button
                  type="button"
                  onClick={() => dismissReminder(targetDebt.id)}
                  className="apple-pressable text-xs font-semibold px-2.5 py-1 rounded-lg bg-surface-subtle hover:bg-surface-subtle/80 text-foreground border border-surface-border transition-colors touch-target"
                >
                  Paham
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => dismissReminder(targetDebt.id)}
              aria-label={`Tutup pengingat jatuh tempo ${targetDebt.name}`}
              className="apple-pressable p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors -mr-1 -mt-1"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
